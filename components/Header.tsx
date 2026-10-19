import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-lg font-bold tracking-tight">
          결제·핀테크 엔지니어링 브리핑
        </Link>
        <Link
          href="/about"
          className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
        >
          소개
        </Link>
      </div>
    </header>
  );
}
