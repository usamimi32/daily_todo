import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { THEME_ORDER } from '../constants/themes'

/**
 * 色アイコンのみ表示するテーマ切り替え（色相順）
 */
export function ThemePicker({ themeId, themes, onChange }) {
  const [open, setOpen] = useState(false)
  const themeList = THEME_ORDER.map((id) => themes[id]).filter(Boolean)
  const current = themes[themeId]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition active:scale-95"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`テーマを変更（現在: ${current?.label}）`}
      >
        <span
          className="h-7 w-7 rounded-full ring-2 ring-[var(--color-surface)] ring-offset-1 ring-offset-[var(--color-bg)]"
          style={{ backgroundColor: current?.swatch }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-[var(--color-text)]/10"
              onClick={() => setOpen(false)}
              aria-label="閉じる"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="テーマを選択"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 38 }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg rounded-t-[1.75rem] bg-[var(--color-surface)] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5"
            >
              <div className="mx-auto mb-5 h-0.5 w-8 rounded-full bg-[var(--color-border)]" />

              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 px-1">
                {themeList.map((theme) => {
                  const selected = theme.id === themeId
                  return (
                    <li key={theme.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(theme.id)
                          setOpen(false)
                        }}
                        aria-label={theme.label}
                        aria-current={selected ? 'true' : undefined}
                        className="rounded-full p-0.5 transition active:scale-95"
                      >
                        <span
                          className={`block h-8 w-8 rounded-full transition ${
                            selected
                              ? 'ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-surface)]'
                              : 'opacity-80'
                          }`}
                          style={{ backgroundColor: theme.swatch }}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
