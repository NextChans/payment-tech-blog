import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-4 py-5">
        <Link href="/" className="text-lg font-bold tracking-tight">
          결제·핀테크 엔지니어링 브리핑
        </Link>
      </div>
    </header>
  );
}
