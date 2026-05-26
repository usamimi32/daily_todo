import { TaskInput } from '../components/TaskInput'
import { TaskList } from '../components/TaskList'
import { TaskSummary } from '../components/TaskSummary'

/**
 * Today 画面（当日の ToDo）
 */
export function TodayPage({
  tasks,
  activeCount,
  totalCount,
  onAdd,
  onToggle,
  onUpdate,
  onReorder,
  onDelete,
}) {
  return (
    <>
      <TaskInput onAdd={onAdd} />
      <TaskSummary activeCount={activeCount} totalCount={totalCount} />
      <TaskList
        tasks={tasks}
        onToggle={onToggle}
        onUpdate={onUpdate}
        onReorder={onReorder}
        onDelete={onDelete}
      />
    </>
  )
}
