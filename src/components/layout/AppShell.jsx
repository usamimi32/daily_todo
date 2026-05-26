import { NavMenu } from './NavMenu'
import { ThemePicker } from '../ThemePicker'

/**
 * 共通レイアウト（ハンバーガー · タイトル · テーマ）
 */
export function AppShell({
  children,
  title,
  currentView,
  menuOpen,
  themeId,
  themes,
  onMenuOpen,
  onMenuClose,
  onNavigate,
  onThemeChange,
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-[var(--color-bg)] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[1.25rem] text-[var(--color-title)] transition active:bg-[var(--color-accent-soft)]"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          ≡
        </button>

        <div className="min-w-0 flex-1">{title}</div>

        <ThemePicker themeId={themeId} themes={themes} onChange={onThemeChange} />
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <NavMenu
        open={menuOpen}
        currentView={currentView}
        onClose={onMenuClose}
        onNavigate={onNavigate}
      />
    </div>
  )
}
