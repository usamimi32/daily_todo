import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { DragHandle } from './DragHandle'

/**
 * 1件のタスク行（dnd-kit 本体 + 打ち消し線のみ Framer Motion）
 */
export function TaskItem({
  task,
  isEditing,
  onToggle,
  onStartEdit,
  onEndEdit,
  onSave,
}) {
  const inputRef = useRef(null)
  const [draft, setDraft] = useState(task.text)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: isEditing,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
    touchAction: isEditing ? 'auto' : 'manipulation',
    opacity: isDragging ? 0.35 : 1,
  }

  useEffect(() => {
    if (!isEditing) return undefined
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
    return () => cancelAnimationFrame(frame)
  }, [isEditing])

  const saveEdit = () => {
    onSave(task.id, draft)
    onEndEdit()
  }

  const cancelEdit = () => {
    setDraft(task.text)
    onEndEdit()
  }

  const handleTextClick = () => {
    if (isDragging || isEditing) return
    setDraft(task.text)
    onStartEdit(task.id)
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`list-none ${isDragging ? 'relative' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div
        className={`flex w-full items-center gap-3 rounded-xl bg-[var(--color-surface)] px-4 py-3.5 ${
          isDragging ? 'ring-1 ring-[var(--color-border)]' : ''
        }`}
      >
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            onToggle(task.id)
          }}
          className="mt-1 shrink-0"
          aria-pressed={task.completed}
          aria-label={task.completed ? '未完了に戻す' : '完了にする'}
        >
          <span
            className={`flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border transition-colors ${
              task.completed
                ? 'border-[var(--color-checkbox)] bg-[var(--color-checkbox)]'
                : 'border-[var(--color-border)] bg-transparent'
            }`}
          >
            {task.completed && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 520, damping: 30 }}
                className="h-3 w-3 text-white/95"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </span>
        </button>

        <div className="relative min-w-0 flex-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="textarea"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  saveEdit()
                } else if (e.key === 'Escape') {
                  e.preventDefault()
                  cancelEdit()
                }
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-full bg-transparent text-[1rem] leading-relaxed text-[var(--color-text)] outline-none"
              aria-label="タスクを編集"
            />
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleTextClick()
              }}
              className="w-full text-left"
              aria-label={`編集: ${task.text}`}
            >
              <span className="relative block min-w-0">
                <span
                  className={`block break-words text-[1rem] leading-relaxed text-[var(--color-text)] transition-opacity duration-150 ${
                    task.completed ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  {task.text}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-[54%] h-px w-full origin-left bg-[var(--color-text-muted)]/60"
                  initial={false}
                  animate={{ scaleX: task.completed ? 1 : 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                />
              </span>
            </button>
          )}
        </div>

        {/* 並び替えハンドル（表示のみ）— 将来 dragListeners={listeners} を渡して li 側の listeners を外す */}
        <DragHandle className="min-h-[2.75rem] min-w-[2rem] -mr-1" />
      </div>
    </li>
  )
}
