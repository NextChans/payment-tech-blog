// 애드센스 승인 전에는 자리만 잡아두는 플레이스홀더.
// 승인 후: <ins className="adsbygoogle" ... /> + 아래 script를 layout.tsx head에 추가하고
// 이 컴포넌트 내부를 실제 ins 태그로 교체하면 됨.
export default function AdSlot({ label = "Sponsored" }: { label?: string }) {
  return (
    <div
      className="my-8 flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-[var(--border)] text-xs text-[var(--muted)]"
      data-ad-slot-placeholder="true"
    >
      {label} slot
    </div>
  );
}
