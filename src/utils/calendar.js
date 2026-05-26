import { getTodayKey } from './date'

/**
 * カレンダー表示用のユーティリティ
 */

/** 月のカレンダーグリッド用セル（null は空白） */
export function getMonthCalendarCells(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const startPadding = firstDay.getDay()

  const cells = []

  for (let i = 0; i < startPadding; i += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(getTodayKey(new Date(year, monthIndex, day)))
  }

  return cells
}
