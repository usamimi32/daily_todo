import { arrayMove } from '@dnd-kit/sortable'

const ORDER_STEP = 10

/**
 * タスクの order 管理
 * - 表示: 未完了（order昇順）→ 完了（order昇順）
 * - 完了切り替えでは order を変えない（未完了に戻すと元の位置に復帰）
 */

/** 未完了 → 完了の順で order ソート */
export function sortTasksForDisplay(tasks) {
  const actives = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.order - b.order)
  const completed = tasks
    .filter((t) => t.completed)
    .sort((a, b) => a.order - b.order)
  return [...actives, ...completed]
}

/** 読み込み時: order が無いタスクに付与（既存の並びを維持） */
export function normalizeTasks(tasks) {
  if (!tasks.length) return []

  const hasMissingOrder = tasks.some((t) => typeof t.order !== 'number')
  if (!hasMissingOrder) {
    return tasks.map((t) => ({ ...t }))
  }

  return tasks.map((task, index) => ({
    ...task,
    order: typeof task.order === 'number' ? task.order : index * ORDER_STEP,
  }))
}

/** 新規タスクを未完了の先頭へ（order を最小より小さく） */
export function createTaskWithOrder(text, existingTasks) {
  const actives = existingTasks.filter((t) => !t.completed)
  const minOrder = actives.length
    ? Math.min(...actives.map((t) => t.order))
    : ORDER_STEP

  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    order: minOrder - ORDER_STEP,
    createdAt: Date.now(),
  }
}

/** 同じ完了グループ内で並び替え、order を更新 */
export function reorderTasksByOrder(tasks, activeId, overId) {
  const activeTask = tasks.find((t) => t.id === activeId)
  const overTask = tasks.find((t) => t.id === overId)
  if (!activeTask || !overTask) return tasks
  if (activeTask.completed !== overTask.completed) return tasks

  const isCompleted = activeTask.completed
  const group = tasks
    .filter((t) => t.completed === isCompleted)
    .sort((a, b) => a.order - b.order)
  const others = tasks.filter((t) => t.completed !== isCompleted)

  const oldIndex = group.findIndex((t) => t.id === activeId)
  const newIndex = group.findIndex((t) => t.id === overId)
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return tasks

  const moved = arrayMove([...group], oldIndex, newIndex)
  const baseOrder = Math.min(...group.map((t) => t.order))

  const updatedGroup = moved.map((task, index) => ({
    ...task,
    order: baseOrder + index * ORDER_STEP,
  }))

  return [...others, ...updatedGroup]
}
