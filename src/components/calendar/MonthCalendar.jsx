import { motion } from 'framer-motion'
import { getAchievementStyle } from '../../utils/achievementColor'
import { getMonthCalendarCells } from '../../utils/calendar'
import { getCompletionRate } from '../../utils/dailyData'
import { getTodayKey } from '../../utils/date'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

/**
 * 月表示カレンダー（達成率で色付け）
 */
export function MonthCalendar({
  year,
  monthIndex,
  records,
  selectedDateKey,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  monthLabel,
}) {
  const cells = getMonthCalendarCells(year, monthIndex)
  const todayKey = getTodayKey()

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevMonth}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-title)] transition active:bg-[var(--color-accent-soft)]"
          aria-label="前の月"
        >
          ‹
        </button>
        <h2 className="text-[1rem] font-medium text-[var(--color-title)]">{monthLabel}</h2>
        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-title)] transition active:bg-[var(--color-accent-soft)]"
          aria-label="次の月"
        >
          ›
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-1 text-center text-[0.6875rem] text-[var(--color-text-muted)]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateKey, index) => {
          if (!dateKey) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const record = records[dateKey]
          const hasData = record && record.total > 0
          const rate = getCompletionRate(record) ?? 0
          const isToday = dateKey === todayKey
          const isSelected = dateKey === selectedDateKey
          const dayNum = Number(dateKey.split('-')[2])

          return (
            <motion.button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.1 }}
              style={getAchievementStyle(rate, hasData)}
              className={`relative flex aspect-square items-center justify-center rounded-xl text-[0.875rem] transition ${
                isSelected
                  ? 'ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-bg)]'
                  : ''
              } ${isToday ? 'font-semibold text-[var(--color-title)]' : 'text-[var(--color-text)]'}`}
              aria-label={`${dayNum}日${hasData ? `、${record.completed}/${record.total}件完了` : ''}`}
              aria-pressed={isSelected}
            >
              {dayNum}
              {isToday && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-accent)]" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
