/**
 * 達成率に応じたカレンダー用の背景色
 * 0% → ごく薄いテーマ色、100% → 濃いテーマカラー
 */

/** 達成率から color-mix 用の背景スタイルを返す */
export function getAchievementStyle(rate, hasData) {
  if (!hasData) {
    return { backgroundColor: 'var(--color-surface)' }
  }

  // 0% でもわずかに色が分かるよう最小 6%、100% でフル accent
  const mixPercent = Math.round(6 + rate * 94)

  return {
    backgroundColor: `color-mix(in srgb, var(--color-accent) ${mixPercent}%, var(--color-bg))`,
  }
}
