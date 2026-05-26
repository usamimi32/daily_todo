import { useState } from 'react'
import { DayDetail } from '../components/calendar/DayDetail'
import { MonthCalendar } from '../components/calendar/MonthCalendar'
import { formatMonthYear } from '../utils/date'

/**
 * Calendar 画面（過去の達成確認）
 */
export function CalendarPage({ records, onNavigate, onChangeDate }) {
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

  // 🟢 「編集」ボタン押下時の処理（確実に日付を変えてからホームへ飛ばす！）
  const handleEditSelectedDay = () => {
    if (!selectedDateKey) return
    
    if (typeof onChangeDate === 'function') {
      onChangeDate(selectedDateKey) // 先にホーム画面の日付を選択した日に書き換える
    }
    if (typeof onNavigate === 'function') {
      onNavigate('today') // そのあとホーム画面（today）にジャンプ！
    }
    setSelectedDateKey(null)
  }

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
        closeButtonText="編集" // ボタンの文字を編集にする
        onClose={handleEditSelectedDay} // クリックされたら上のワープ処理を実行
      />

      <p className="mt-10 text-center text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
        色が濃いほど達成率が高い日です
      </p>
    </div>
  )
}