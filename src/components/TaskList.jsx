import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { EmptyState } from './EmptyState'
import { TaskItem } from './TaskItem'

/**
 * ドラッグ並び替え対応のタスク一覧
 */
export function TaskList({ tasks, onToggle, onUpdate, onReorder }) {
  const [editingId, setEditingId] = useState(null)
  const [activeId, setActiveId] = useState(null)

  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 280, tolerance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 320, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const activeTask = useMemo(
    () => (activeId ? tasks.find((t) => t.id === activeId) : null),
    [activeId, tasks],
  )

  const handleDragStart = (event) => {
    setEditingId(null)
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id))
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isEditing={editingId === task.id}
              onToggle={onToggle}
              onStartEdit={setEditingId}
              onEndEdit={() => setEditingId(null)}
              onSave={onUpdate}
            />
          ))}
        </ul>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 160, easing: 'ease-out' }}>
        {activeTask ? (
          <div className="flex items-start gap-3.5 rounded-xl bg-[var(--color-surface)] px-4 py-3.5 shadow-md ring-1 ring-[var(--color-border)]">
            <span
              className={`mt-1 flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full border ${
                activeTask.completed
                  ? 'border-[var(--color-checkbox)] bg-[var(--color-checkbox)]'
                  : 'border-[var(--color-border)]'
              }`}
            />
            <span className="text-[1rem] leading-relaxed text-[var(--color-text)]">
              {activeTask.text}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
