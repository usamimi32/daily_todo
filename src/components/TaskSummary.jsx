/**
 * 残り件数（必要最小限の情報のみ）
 */
export function TaskSummary({ activeCount, totalCount }) {
  if (totalCount === 0 || activeCount === 0) return null

  return (
    <p className="mb-4 text-[0.8125rem] text-[var(--color-text-muted)]">
      残り {activeCount} 件
    </p>
  )
}
