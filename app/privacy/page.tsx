import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "결제·핀테크 엔지니어링 브리핑의 개인정보처리방침 — 방문자 데이터 수집·쿠키·광고 게재 관련 안내입니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="prose-post">
      <h1 className="text-2xl font-bold">개인정보처리방침</h1>
      <p className="mt-3 text-xs text-[var(--muted)]">시행일: 2026년 9월 20일</p>

      <h2>1. 수집하는 정보</h2>
      <p>
        이 사이트는 회원가입이나 로그인을 요구하지 않으며, 이름·이메일 등
        개인을 식별할 수 있는 정보를 직접 수집하지 않습니다. 다만 다음과
        같은 방식으로 방문 통계·광고 관련 정보가 자동으로 수집될 수
        있습니다.
      </p>
      <ul>
        <li>
          <strong>방문 통계</strong>: Vercel Analytics를 통해 페이지 조회수,
          접속 국가·기기 종류 등 비식별 통계 정보를 수집합니다. 개인을
          특정할 수 있는 정보는 포함되지 않습니다.
        </li>
        <li>
          <strong>광고 서비스</strong>: 이 사이트는 Google AdSense를 통해
          광고를 게재하며, 이 과정에서 Google이 쿠키를 사용해 관심 기반
          맞춤 광고를 제공할 수 있습니다.
        </li>
      </ul>

      <h2>2. Google 광고 쿠키 관련 안내</h2>
      <p>
        Google을 포함한 제3자 광고 사업자는 쿠키를 사용해 이 사이트 및 다른
        사이트 방문 기록을 바탕으로 맞춤 광고를 게재할 수 있습니다.
        이용자는 아래 방법으로 맞춤 광고 수신을 거부할 수 있습니다.
      </p>
      <ul>
        <li>
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 광고 설정
          </a>
          에서 맞춤 광고 비활성화
        </li>
        <li>
          <a
            href="https://optout.aboutads.info/"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
          에서 참여 업체별 옵트아웃
        </li>
      </ul>

      <h2>3. 정보의 이용 목적</h2>
      <p>
        수집된 비식별 통계 정보는 콘텐츠 개선과 사이트 운영 현황 파악
        목적으로만 사용하며, 광고 관련 정보는 Google의 광고 정책에 따라
        광고 게재 및 최적화 목적으로 사용됩니다.
      </p>

      <h2>4. 제3자 제공</h2>
      <p>
        이 사이트는 수집한 정보를 직접 판매하거나 제3자에게 제공하지
        않습니다. 다만 Google AdSense·Vercel Analytics 등 이 사이트가
        이용하는 서비스 제공업체는 각자의 개인정보처리방침에 따라 별도로
        정보를 처리할 수 있습니다.
      </p>

      <h2>5. 문의</h2>
      <p>
        이 방침에 대해 문의할 사항이 있으면{" "}
        <a href="mailto:babadung@gmail.com">babadung@gmail.com</a>으로
        연락해 주세요.
      </p>

      <h2>6. 방침의 변경</h2>
      <p>
        이 방침은 관련 법령이나 서비스 변경에 따라 수정될 수 있으며, 변경
        시 이 페이지를 통해 고지합니다.
      </p>
    </article>
  );
}
