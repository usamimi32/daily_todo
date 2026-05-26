import { AnimatePresence, motion } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'today', label: 'Today' },
  { id: 'calendar', label: 'Calendar' },
]

/**
 * ハンバーガーメニューから開くナビゲーション
 */
export function NavMenu({ open, currentView, onClose, onNavigate }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-[var(--color-text)]/12"
            onClick={onClose}
            aria-label="メニューを閉じる"
          />

          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 38 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-surface)] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] shadow-lg"
            aria-label="メインメニュー"
          >
            <p className="mb-6 text-[0.8125rem] font-medium tracking-wide text-[var(--color-text-muted)]">
              メニュー
            </p>

            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = currentView === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(item.id)
                        onClose()
                      }}
                      className={`w-full rounded-xl px-4 py-3.5 text-left text-[1rem] transition active:scale-[0.99] ${
                        active
                          ? 'bg-[var(--color-accent-soft)] font-medium text-[var(--color-title)]'
                          : 'text-[var(--color-text)]'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
