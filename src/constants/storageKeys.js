/**
 * LocalStorage に保存するキー名をまとめた定数
 */
export const STORAGE_KEYS = {
  /** 日付単位の達成データ（tasks は当日のみ保持） */
  DAILY_DATA: 'daily-todo-data',
  /** 旧形式（マイグレーション用） */
  TASKS_LEGACY: 'daily-todo-tasks',
  /** 選択中のテーマ */
  THEME: 'daily-todo-theme',
  /** 未完了タスクの引き継ぎ設定（reset | carryover） */
  CARRYOVER_MODE: 'daily-todo-carryover-mode',
}
