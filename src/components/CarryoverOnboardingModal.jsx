import { AnimatePresence, motion } from 'framer-motion'
import { CarryoverOptionList } from './CarryoverOptionList'

/**
 * 初回のみ表示する引き継ぎ設定モーダル
 */
export function CarryoverOnboardingModal({ open, onSelect }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[var(--color-text)]/15"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="carryover-onboarding-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full max-w-sm rounded-3xl bg-[var(--color-surface)] px-5 py-6 shadow-lg"
            >
              <h2
                id="carryover-onboarding-title"
                className="text-center text-[1.0625rem] font-medium leading-snug text-[var(--color-title)]"
              >
                未完了タスクの扱い
              </h2>
              <p className="mt-2 text-center text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
                翌日にどうするか選んでください
              </p>

              <div className="mt-5">
                <CarryoverOptionList
                  value={null}
                  onChange={(mode) => onSelect(mode)}
                />
              </div>

              <p className="mt-4 text-center text-[0.75rem] text-[var(--color-text-muted)]">
                設定からいつでも変更できます
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
