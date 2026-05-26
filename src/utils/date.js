/**
 * 日付関連のユーティリティ
 */

/** ローカル日付を YYYY-MM-DD 形式で返す */
export function getTodayKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** タイトル用（例: 5月26日(月) ToDo） */
export function formatTitleDate(date = new Date()) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = formatWeekday(date)
  return `${month}月${day}日(${weekday}) ToDo`
}

/** 曜日（例: 火） */
export function formatWeekday(date = new Date()) {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  return weekdays[date.getDay()]
}

/** 年月表示（例: 2026年5月） */
export function formatMonthYear(year, monthIndex) {
  return `${year}年${monthIndex + 1}月`
}

/** 日付キーの表示（例: 5月26日(月)） */
export function formatDateKeyLabel(dateKey) {
  const date = dateKeyToLocalDate(dateKey)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日(${formatWeekday(date)})`
}

/** 日付キー → ローカル Date */
export function dateKeyToLocalDate(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(y, m - 1, d)
}
