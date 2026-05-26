import { CARRYOVER_MODE } from '../constants/carryover'
import { CarryoverOptionList } from '../components/CarryoverOptionList'

/**
 * 設定画面（引き継ぎ設定の変更）
 */
export function SettingsPage({ carryoverMode, onCarryoverChange }) {
  const currentMode = carryoverMode ?? CARRYOVER_MODE.RESET

  return (
    <div>
      <section>
        <h2 className="text-[0.8125rem] font-medium tracking-wide text-[var(--color-text-muted)]">
          タスクの引き継ぎ
        </h2>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--color-text)]">
          日付が変わったとき、未完了のタスクをどうするか選べます。
        </p>

        <div className="mt-4">
          <CarryoverOptionList value={currentMode} onChange={onCarryoverChange} />
        </div>

        <p className="mt-4 text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
          設定からいつでも変更できます
        </p>
      </section>
    </div>
  )
}
