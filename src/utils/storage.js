import { CARRYOVER_MODE } from '../constants/carryover'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { DEFAULT_THEME_ID, LEGACY_THEME_MAP, THEMES } from '../constants/themes'
import { buildCarriedOverTasks } from './carryoverTasks'
import { computeStats } from './dailyData'
import { getTodayKey, getYesterdayKey } from './date'
import { normalizeTasks } from './taskOrder'

/**
 * LocalStorage の読み書き
 * 形式: { "2026-05-26": { completed: 3, total: 5, tasks?: [...] } }
 */

let legacyMigrated = false

/** 全日付データを読み込む */
export function loadAllDailyData() {
  if (!legacyMigrated) {
    migrateLegacyStorage()
    legacyMigrated = true
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_DATA)
    if (!raw) return {}
    const data = JSON.parse(raw)
    return typeof data === 'object' && data !== null ? data : {}
  } catch {
    return {}
  }
}

/** 全日付データを保存 */
function saveAllDailyData(data) {
  localStorage.setItem(STORAGE_KEYS.DAILY_DATA, JSON.stringify(data))
}

/** 指定日のレコードを取得 */
export function getDayRecord(dateKey) {
  const data = loadAllDailyData()
  return data[dateKey] ?? null
}

/** 引き継ぎ設定を読み込む（未設定なら null） */
export function loadCarryoverMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CARRYOVER_MODE)
    if (saved === CARRYOVER_MODE.RESET || saved === CARRYOVER_MODE.CARRYOVER) {
      return saved
    }
  } catch {
    // 未設定扱い
  }
  return null
}

/** 初回オンボーディングが必要か（設定未保存） */
export function needsCarryoverOnboarding() {
  return loadCarryoverMode() === null
}

/** 引き継ぎ設定を保存 */
export function saveCarryoverMode(mode) {
  localStorage.setItem(STORAGE_KEYS.CARRYOVER_MODE, mode)
}

function isCarryoverEnabled() {
  return loadCarryoverMode() === CARRYOVER_MODE.CARRYOVER
}

/** 当日のタスク一覧を読み込む（引き継ぎ設定に応じて前日分を復元） */
export function loadTasks() {
  const todayKey = getTodayKey()
  const record = getDayRecord(todayKey)

  if (record?.tasks && Array.isArray(record.tasks) && record.tasks.length > 0) {
    return record.tasks.map((task) => ({ ...task }))
  }

  if (!isCarryoverEnabled()) {
    return []
  }

  const yesterdayKey = getYesterdayKey()
  const yesterday = getDayRecord(yesterdayKey)
  if (!yesterday?.tasks?.length) {
    return []
  }

  return normalizeTasks(buildCarriedOverTasks(yesterday.tasks))
}

/** 当日のタスクを保存（達成数も同時更新） */
export function saveTasks(tasks) {
  const data = loadAllDailyData()
  const todayKey = getTodayKey()
  const { completed, total } = computeStats(tasks)

  const cleaned = {}

  const yesterdayKey = getYesterdayKey()
  const keepYesterdayTasks = isCarryoverEnabled()

  Object.entries(data).forEach(([key, record]) => {
    if (!record) return
    if (key === todayKey) return

    const base = {
      completed: record.completed ?? 0,
      total: record.total ?? 0,
    }

    if (keepYesterdayTasks && key === yesterdayKey && Array.isArray(record.tasks)) {
      cleaned[key] = { ...base, tasks: record.tasks }
    } else {
      cleaned[key] = base
    }
  })

  cleaned[todayKey] = { completed, total, tasks }

  saveAllDailyData(cleaned)
}

/** 旧形式から新形式へマイグレーション */
function migrateLegacyStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS_LEGACY)
    if (!raw) return

    const legacy = JSON.parse(raw)

    let data = {}
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.DAILY_DATA)
      if (existing) data = JSON.parse(existing)
    } catch {
      data = {}
    }

    if (legacy.date && Array.isArray(legacy.tasks)) {
      const { completed, total } = computeStats(legacy.tasks)
      const todayKey = getTodayKey()

      if (!data[legacy.date]) {
        data[legacy.date] =
          legacy.date === todayKey
            ? { completed, total, tasks: legacy.tasks }
            : { completed, total }
      }
    }

    saveAllDailyData(data)
    localStorage.removeItem(STORAGE_KEYS.TASKS_LEGACY)
  } catch {
    localStorage.removeItem(STORAGE_KEYS.TASKS_LEGACY)
  }
}

export function loadThemeId() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME)
    if (saved && THEMES[saved]) return saved
    if (saved && LEGACY_THEME_MAP[saved]) return LEGACY_THEME_MAP[saved]
  } catch {
    // デフォルトへ
  }
  return DEFAULT_THEME_ID
}

export function saveThemeId(themeId) {
  localStorage.setItem(STORAGE_KEYS.THEME, themeId)
}
