import { useState } from 'react'
import { DayDetail } from '../components/calendar/DayDetail'
import { MonthCalendar } from '../components/calendar/MonthCalendar'
import { formatMonthYear } from '../utils/date'

/**
 * Calendar 画面（過去の達成確認）
 */
export function CalendarPage({ records }) {
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [selectedDateKey, setSelectedDateKey] = useState(null)

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
    setSelectedDateKey(null)
  }

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
    setSelectedDateKey(null)
  }

  const selectedRecord = selectedDateKey ? records[selectedDateKey] : null

  return (
    <div>
      <MonthCalendar
        year={viewYear}
        monthIndex={viewMonth}
        records={records}
        selectedDateKey={selectedDateKey}
        onSelectDate={setSelectedDateKey}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
        monthLabel={formatMonthYear(viewYear, viewMonth)}
      />

      <DayDetail
        dateKey={selectedDateKey}
        record={selectedRecord}
        onClose={() => setSelectedDateKey(null)}
      />

      <p className="mt-10 text-center text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
        色が濃いほど達成率が高い日です
      </p>
    </div>
  )
}
