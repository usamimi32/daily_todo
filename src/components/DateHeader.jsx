import { formatTitleDate } from '../utils/date'

/**
 * 画面上部のタイトル（◯月◯日(曜) ToDo）
 */
export function DateHeader() {
  const now = new Date()

  return (
    <header className="min-w-0 flex-1">
      <h1 className="text-[1.35rem] font-medium leading-snug tracking-wide text-[var(--color-title)]">
        {formatTitleDate(now)}
      </h1>
    </header>
  )
}
