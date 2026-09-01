# 결제·핀테크 엔지니어링 브리핑

PG/간편결제/전자금융 규제 동향을 백엔드 엔지니어 관점에서 분석하는 SEO 블로그. Next.js 14 App Router + TypeScript + Tailwind, 콘텐츠는 `content/posts`의 마크다운 파일로 관리한다.

## 로컬 실행

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # 프로덕션 빌드 검증
```

빌드는 이미 한 번 검증됨(타입체크 통과, 정적 페이지 생성 확인).

## 배포 (Vercel 기준, 5분)

1. 이 폴더를 GitHub 리포지토리로 push
2. [vercel.com](https://vercel.com)에서 New Project → 해당 리포 선택 → 기본 설정 그대로 Deploy
3. 커스텀 도메인 연결 후 `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`의 `SITE_URL`을 실제 도메인으로 교체 후 재배포
4. Vercel은 무료 티어로 충분 (개인 블로그 트래픽 기준)

## 새 글 작성

```bash
npm run new-post -- "글 제목"
```

`content/posts/YYYY-MM-DD-slug.md`가 생성된다. frontmatter(title/description/date/tags/keywords)를 채우고 본문을 마크다운으로 작성하면 끝.

## 수익화 체크리스트

- **애드센스**: 글 10~15편, 각 1,000자 이상의 순수 오리지널 콘텐츠가 쌓인 뒤 신청하는 걸 권장 (콘텐츠 부족 상태에서 신청 시 반려 확률 높음). 승인 전까지 `components/AdSlot.tsx`가 자리만 잡아둠. 승인 후 해당 컴포넌트를 실제 `<ins class="adsbygoogle">` 태그로 교체.
- **제휴/스폰서**: PG사·핀테크 SaaS(정산 자동화 툴, 결제 모니터링 SaaS 등) 대상 스폰서 콘텐츠. 니치가 좁고 타겟(핀테크 개발자·PM)이 명확해서 애드센스보다 단가가 높을 가능성이 큼.
- **뉴스레터 전환**: 트래픽이 붙으면 이메일 수집 폼을 추가해 스티비 등으로 뉴스레터 병행 — 같은 콘텐츠를 재사용 가능.

## SEO 키워드 전략

"핀테크 뉴스" 같은 광범위 키워드는 경쟁이 세서 승산이 없다. 대신 실무자가 검색하는 롱테일 키워드를 노린다:

- "PG 정산자금 외부관리", "전자금융거래법 개정 PG업"
- "간편결제 수수료 공시", "PG사 수수료 비교 2026"
- "다단계 PG 구조 규제", "전자금융업 등록 요건"
- "PG 백엔드 아키텍처", "정산 배치 멱등성"

각 글의 frontmatter `keywords` 필드에 타겟 키워드를 채워두면 메타데이터에 반영된다.

## 콘텐츠 캘린더 (다음 후보)

1. ✅ 정산자금 외부관리 의무화 — 개정 전금법과 PG 백엔드 대응 (발행됨)
2. ✅ 다단계 PG 규제, 10월 시행 하위 PG사 분기 평가 의무 (초안/PR)
3. ✅ 결제수수료 공시 확대 — PG사는 공시 데이터를 어떻게 자동 생성할 것인가 (초안/PR)
4. 국내 PG사 수수료 구조 실측 비교 — 신용카드/간편결제/해외결제 기준

매주 발행 기준으로 위 순서대로 진행하면 한 달 분량 확보됨. 다음 회차부터는 그 주의 실제 뉴스(금융위/법제처 공시, 업계 보도자료)를 리서치한 뒤 이 목록에서 소재를 골라 작성하는 방식을 권장 — 소재가 항상 최신이어야 "양산형 AI 콘텐츠"로 분류되지 않는다.

## 자동 발행 파이프라인 (GitHub Actions)

`.github/workflows/weekly-post-draft.yml`이 매주 수요일 09:00 KST(UTC 00:00)에 실행되어 최신 뉴스를 리서치하고 초안을 작성한 뒤, **main에 직접 push하지 않고** `weekly-draft/YYYY-MM-DD` 브랜치로 PR을 연다. 발행 여부는 항상 PR을 머지하는 사람이 결정한다.

### 최초 설정 (한 번만)

1. Claude GitHub App 설치: https://github.com/apps/claude → 이 저장소에 설치
2. 인증 방식 선택 (저장소 Settings → Secrets and variables → Actions):
   - **Pro/Max 구독이 있으면(권장, 별도 과금 없음)**: 로컬 터미널에서 `claude setup-token` 실행 → 나오는 토큰을 `CLAUDE_CODE_OAUTH_TOKEN` 시크릿으로 등록
   - 구독이 없으면: [console.anthropic.com](https://console.anthropic.com)에서 API 키 발급 → `ANTHROPIC_API_KEY` 시크릿으로 등록하고, 워크플로우 파일의 `claude_code_oauth_token` 줄을 `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}`로 교체
3. Actions 탭 → "Weekly Fintech Blog Draft" → "Run workflow"로 한 번 수동 실행해서 정상 동작 확인

### 리뷰 워크플로우

매주 자동으로 열리는 PR을 열어서 Vercel이 만들어주는 프리뷰 배포 링크로 내용을 확인하고, 문제없으면 머지 → main 반영 → 프로덕션 자동 배포.

> **참고**: Cowork에도 동일한 역할을 하는 주간 스케줄 작업(`weekly-fintech-blog-draft`)이 별도로 등록되어 있다. 두 파이프라인을 동시에 켜두면 매주 초안이 두 번(PR + 로컬 파일) 생기니, 이 GitHub Actions 파이프라인으로 넘어왔다면 Cowork 쪽 스케줄 작업은 꺼두는 걸 권장한다.

## 왜 이 구조인가 (설계 노트)

- MDX 대신 순수 마크다운 + `gray-matter` + `remark-html`: 의존성 최소화, 빌드 안정성 우선
- 각 포스트는 로컬 markdown 파일 — CMS 없이 git 커밋만으로 발행 이력 관리됨
- `AdSlot` 컴포넌트는 애드센스 승인 전/후 전환이 컴포넌트 교체 한 줄로 끝나도록 분리해둠
