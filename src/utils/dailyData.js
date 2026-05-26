/**
 * 日付単位の達成データを扱うユーティリティ
 */

/** @typedef {{ completed: number, total: number, tasks?: Array<{ id: string, text: string, completed: boolean }> }} DayRecord */

/** タスク配列から達成数を算出 */
export function computeStats(tasks) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  return { completed, total }
}

/** 達成率（0〜1）。タスクがなければ null */
export function getCompletionRate(record) {
  if (!record || record.total === 0) return null
  return record.completed / record.total
}
