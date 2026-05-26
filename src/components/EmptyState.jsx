/**
 * タスクが0件のとき（装飾なし・静かな案内）
 */
export function EmptyState() {
  return (
    <p className="py-20 text-center text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">
      タスクはありません
    </p>
  )
}
