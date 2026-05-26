/**
 * 未完了タスクの翌日引き継ぎ処理
 */

/** 前日の未完了タスクを当日用に複製 */
export function buildCarriedOverTasks(yesterdayTasks) {
  if (!Array.isArray(yesterdayTasks)) return []

  return yesterdayTasks
    .filter((task) => !task.completed)
    .map((task) => ({
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: Date.now(),
    }))
}
