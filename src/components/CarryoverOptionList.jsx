import { CARRYOVER_MODE } from '../constants/carryover'

const OPTIONS = [
  {
    value: CARRYOVER_MODE.RESET,
    label: '毎日リセットする',
    description: '前日のタスクは引き継ぎません',
  },
  {
    value: CARRYOVER_MODE.CARRYOVER,
    label: '未完了タスクを引き継ぐ',
    description: '未完了のタスクだけ翌日に表示します',
  },
]

/**
 * 引き継ぎ設定の選択肢（オンボーディング・設定画面で共用）
 */
export function CarryoverOptionList({ value, onChange }) {
  return (
    <ul className="flex flex-col gap-2">
      {OPTIONS.map((option) => {
        const selected = value === option.value
        return (
          <li key={option.value}>
            <button
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-full rounded-2xl border px-4 py-3.5 text-left transition active:scale-[0.99] ${
                selected
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
              aria-pressed={selected}
            >
              <span className="block text-[0.9375rem] font-medium text-[var(--color-title)]">
                {option.label}
              </span>
              <span className="mt-0.5 block text-[0.8125rem] text-[var(--color-text-muted)]">
                {option.description}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
