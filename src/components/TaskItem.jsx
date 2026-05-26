import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * 1件のタスク行
 * - チェックボックス: 完了切り替え
 * - テキスト: タップで編集
 * - 長押し: ドラッグ並び替え（dnd-kit）
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
    transition: isDragging ? transition : transition ?? undefined,
    zIndex: isDragging ? 10 : undefined,
    touchAction: isEditing ? 'auto' : 'none',
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
    <motion.li
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: isDragging ? 0.4 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.12 } }}
      className={`list-none ${isDragging ? 'scale-[1.02] shadow-sm' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div
        className={`flex w-full items-start gap-3.5 rounded-xl bg-[var(--color-surface)] px-4 py-3.5 ${
          isDragging ? 'ring-1 ring-[var(--color-border)]' : ''
        }`}
      >
        {/* チェックボックスのみ完了切り替え */}
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

        {/* テキスト: タップで編集 */}
        <div className="relative min-w-0 flex-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
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
                <motion.span
                  animate={{ opacity: task.completed ? 0.45 : 1 }}
                  transition={{ duration: 0.18 }}
                  className="block break-words text-[1rem] leading-relaxed text-[var(--color-text)]"
                >
                  {task.text}
                </motion.span>
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
      </div>
    </motion.li>
  )
}
