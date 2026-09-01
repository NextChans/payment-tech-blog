---
title: "AWS 기반 결제 인프라 설계 — 국내 리전 제약 안에서 가용성·재해복구 확보하기"
description: "전자금융감독규정의 국내 리전 강제와 RTO 요건 안에서 RDS Multi-AZ, Aurora Global Database 같은 AWS 가용성 도구를 어떻게 조합해야 하는지 정리합니다."
date: "2026-08-11"
tags: ["AWS", "가용성", "재해복구", "PG"]
keywords: ["PG AWS 인프라 설계", "결제 시스템 재해복구", "RDS Multi-AZ 결제", "Aurora Global Database 금융", "전자금융감독규정 RTO"]
---

[클라우드 이용 절차 글](/posts/2026-07-28-pg-cloud-service-usage-reporting)에서 다룬 것처럼, 고유식별정보·개인신용정보를 처리하는 워크로드는 국내(서울) 리전 밖으로 못 나간다. 그런데 AWS의 표준 재해복구 패턴은 대부분 "다른 리전으로 복제"를 전제로 한다. 이 글은 그 전제가 성립하지 않는 도메인에서 AWS 가용성 도구를 어떻게 조합해야 하는지를 다룬다.

## 규제가 요구하는 기준선

전자금융감독규정은 주요 전산장비의 이중화·예비장치 확보를 요구하고, 재해복구센터를 주전산센터와 일정 거리 이상 떨어진 안전한 장소에 구축·운용하도록 하며, 복구목표시간(RTO)을 3시간 이내(일부 금융기관은 24시간)로 규정한다. 전산실을 신규 설치·이전하거나 재해복구센터를 구축할 때는 금융감독원장에게 보안성 심의도 받아야 한다. 이 숫자를 기준선으로 놓고 AWS 옵션들을 비교해보면, 기술적으로는 이미 규제 기준을 훨씬 상회하는 속도를 낼 수 있다는 게 드러난다 — 병목은 대개 기술이 아니라 조직 프로세스다.

## 아키텍처 옵션과 트레이드오프

**1. RDS Multi-AZ — 인스턴스 배포 vs DB 클러스터 배포**
같은 리전(서울, AZ 4개 — ap-northeast-2a/b/c/d) 안에서의 이중화만 놓고 봐도 두 배포 방식의 차이가 크다. 전통적인 Multi-AZ 인스턴스 배포는 failover에 통상 60~120초가 걸리는 반면, 여러 개의 읽기 가능한 스탠바이를 두는 Multi-AZ DB 클러스터 배포는 35초 미만으로 줄어든다. 후자는 읽기 확장까지 덤으로 얻지만 지원 엔진·버전 제약이 있어 기존 워크로드를 그대로 옮기지 못할 수 있다 — 신규 서비스라면 처음부터 DB 클러스터 배포로 시작하는 걸 검토할 가치가 있다.

**2. Aurora Global Database — 매력적이지만 이 도메인에서는 절반만 쓸 수 있다**
Aurora Global Database는 RPO 약 1초, 리전 간 승격도 1분 내외로 이뤄지는 강력한 옵션이다. 문제는 정확히 이 기능이 전제하는 "다른 리전으로의 비동기 복제"가, 개인신용정보를 포함한 워크로드에는 애초에 허용되지 않는다는 점이다. 결과적으로 이 옵션은 결제·정산·원장처럼 개인신용정보가 섞인 데이터에는 못 쓰고, 비식별화된 로그 집계·정적 콘텐츠·분석용 데이터 같은 비개인정보 워크로드에만 제한적으로 쓸 수 있다. 처음부터 "이 테이블은 리전 간 복제 가능/불가능"을 데이터 분류 단계에서 태깅해두지 않으면, 나중에 Global Database를 도입하려다가 개인정보가 섞여 있어 통째로 못 쓰는 상황을 만난다.

**3. 리전 자체 장애 대비 — AZ 분산만으로 규정을 충족하는가**
전자금융감독규정이 요구하는 재해복구센터는 "주전산센터와 일정 거리 이상 떨어진 안전한 장소"다. 같은 리전 내 AZ들은 물리적으로 분리돼 있지만(서울 리전 기준 4개 AZ), 이게 규정이 말하는 "재해복구센터"의 물리적 이격 기준을 충족하는지는 보안성 심의 단계에서 법무·보안팀과 별도로 확인해야 한다. 리전 자체가 마비되는 극단적 시나리오까지 대비하려면 국내에 소재한 별도 사업자의 데이터센터로 백업·복제 스토리지를 이원화하는 방안도 검토 대상이 되는데, 이 경우 운영 복잡도가 크게 늘어난다 — 실무적으로는 "AWS 서울 리전 내 AZ 이중화 + 별도 물리적 위치의 백업 스토리지"로 절충하는 경우가 많다.

**4. 기술적 RTO와 실제 RTO의 격차 — 훈련이 없으면 숫자는 의미가 없다**
RDS Multi-AZ든 Aurora든, AWS 네이티브 failover는 초~분 단위로 끝난다. 규정이 요구하는 3시간(또는 24시간)에 비하면 기술적으로는 여유가 크다. 그런데 실제 장애 상황에서는 "장애 감지 → 원인 판단 → failover 트리거 결정 → 실행"까지의 사람이 개입하는 구간이 전체 RTO를 지배한다. 자동 failover를 신뢰할 수 있는 시나리오는 미리 자동화해두고, 수동 개입이 필요한 시나리오는 정기적인 DR 훈련으로 실제 소요 시간을 측정해둬야 한다 — 측정 없이 "기술적으로는 몇 분이면 된다"고만 말하는 건 감사 대응에서 통하지 않는다.

## 체크리스트

- [ ] 개인신용정보를 포함한 테이블/워크로드가 Aurora Global Database 등 해외 리전 복제 대상에 잘못 섞여 있지 않은지, 데이터 분류 단계에서 리전 간 복제 가능 여부를 태깅했는지
- [ ] RDS Multi-AZ 배포 방식(인스턴스 vs DB 클러스터)에 따른 failover 시간 차이를 인지하고 서비스 SLA에 반영했는지
- [ ] 재해복구센터가 규정이 요구하는 물리적 이격 기준을 충족하는지 보안성 심의 전에 법무·보안팀과 확인했는지
- [ ] RTO 3시간(또는 24시간) 기준 대비, 실제 DR 훈련에서 측정한 RTO가 있는지, 훈련 주기가 정해져 있는지
- [ ] 장애 감지부터 failover 트리거까지의 수동 개입 구간을 자동화했는지, 남겨뒀다면 그 이유가 문서화돼 있는지

## 참고자료

- [Failing over a Multi-AZ DB instance for Amazon RDS – AWS 공식 문서](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html)
- [Using switchover or failover in Amazon Aurora Global Database – AWS 공식 문서](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html)
- [REL10-BP01 Deploy the workload to multiple locations – AWS Well-Architected Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_fault_isolation_multiaz_region_system.html)
- [AWS Regions and Availability Zones – AWS 공식 문서](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html)
- [전자금융감독규정 – 국가법령정보센터](https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EC%A0%84%EC%9E%90%EA%B8%88%EC%9C%B5%EA%B0%90%EB%8F%85%EA%B7%9C%EC%A0%95)
