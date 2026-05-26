import { motion, AnimatePresence } from 'framer-motion'
import { getCompletionRate } from '../../utils/dailyData'
import { formatDateKeyLabel, getTodayKey } from '../../utils/date'

/**
 * 選択した日付の達成データ
 */
export function DayDetail({ dateKey, record, onClose, closeButtonText }) {
  const rate = getCompletionRate(record)
  const isToday = dateKey === getTodayKey()
  const hasData = record && record.total > 0

  return (
    <AnimatePresence>
      {dateKey && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="mt-6 rounded-2xl bg-[var(--color-surface)] px-5 py-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.9375rem] font-medium text-[var(--color-title)]">
                {formatDateKeyLabel(dateKey)}
                {isToday && (
                  <span className="ml-2 text-[0.8125rem] font-normal text-[var(--color-text-muted)]">
                    今日
                  </span>
                )}
              </p>

              {hasData ? (
                <p className="mt-2 text-[1.5rem] font-medium tabular-nums text-[var(--color-title)]">
                  {record.completed}
                  <span className="text-[1rem] text-[var(--color-text-muted)]">
                    {' '}
                    / {record.total}
                  </span>
                </p>
              ) : (
                <p className="mt-2 text-[0.9375rem] text-[var(--color-text-muted)]">
                  タスクなし
                </p>
              )}

              {hasData && rate !== null && (
                <p className="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">
                  達成率 {Math.round(rate * 100)}%
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg px-2 py-1 text-[0.8125rem] text-[var(--color-text-muted)] transition active:bg-[var(--color-accent-soft)]"
              aria-label={closeButtonText || '閉じる'}
            >
              {closeButtonText || '閉じる'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
