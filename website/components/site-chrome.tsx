import Link from "next/link";

import { NewlyAttribution } from "@/components/ui/newly-attribution";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/app-icon.png" alt="" width={36} height={36} className="rounded-[10px] shadow-sm" />
          <span className="font-display text-xl font-bold tracking-tight">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/#como-funciona" className="hidden transition-colors hover:text-foreground sm:inline">
            Cómo funciona
          </Link>
          <Link href="/#tarifas" className="hidden transition-colors hover:text-foreground sm:inline">
            Tarifas
          </Link>
          <Link href="/soporte" className="transition-colors hover:text-foreground">
            Soporte
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <div className="flex items-center gap-3">
            <img src="/app-icon.png" alt="" width={32} height={32} className="rounded-[9px]" />
            <span className="font-display text-lg font-bold">{site.name}</span>
          </div>
          <p className="text-sm leading-relaxed text-[hsl(var(--ink-foreground)/0.65)]">
            Precios orientativos. El precio final lo fija cada plataforma o el taxímetro en el momento del viaje.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
          <Link href="/soporte" className="text-[hsl(var(--ink-foreground)/0.8)] hover:text-white">Soporte</Link>
          <Link href="/privacidad" className="text-[hsl(var(--ink-foreground)/0.8)] hover:text-white">Privacidad</Link>
          <Link href="/terminos" className="text-[hsl(var(--ink-foreground)/0.8)] hover:text-white">Términos de uso</Link>
          <Link href="/#tarifas" className="text-[hsl(var(--ink-foreground)/0.8)] hover:text-white">Tarifas</Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pb-8 text-xs text-[hsl(var(--ink-foreground)/0.5)]">
        <span>© 2026 {site.name}</span>
        <NewlyAttribution className="text-[hsl(var(--ink-foreground)/0.5)] hover:text-white" />
      </div>
    </footer>
  );
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--brand-strong))]">
          Actualizado el {site.updatedAt}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">{title}</h1>
        <div className="legal mt-10 space-y-6 text-[15px] leading-relaxed text-foreground/85">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
