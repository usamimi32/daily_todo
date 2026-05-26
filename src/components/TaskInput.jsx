import { useState } from 'react'

/**
 * タスク追加（Keep 風のシンプルな入力欄）
 */
export function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const added = onAdd(text)
    if (added) setText('')
  }

  const hasText = Boolean(text.trim())

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="今日は何をする？"
          enterKeyHint="done"
          autoComplete="off"
          className="min-h-[3.25rem] flex-1 rounded-xl bg-[var(--color-surface)] px-4 text-[1rem] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]/75 focus:bg-[var(--color-accent-soft)]/50"
          aria-label="新しいタスク"
        />
        <button
          type="submit"
          disabled={!hasText}
          className={`min-h-[3.25rem] shrink-0 rounded-xl px-5 text-[0.9375rem] font-medium transition active:scale-[0.98] ${
            hasText
              ? 'bg-[var(--color-accent-soft)] text-[var(--color-title)]'
              : 'bg-[var(--color-accent-soft)]/40 text-[var(--color-text-muted)]'
          }`}
          aria-label="追加"
        >
          追加
        </button>
      </div>
    </form>
  )
}
