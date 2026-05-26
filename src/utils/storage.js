import { CARRYOVER_MODE } from '../constants/carryover'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { DEFAULT_THEME_ID, LEGACY_THEME_MAP, THEMES } from '../constants/themes'
import { buildCarriedOverTasks } from './carryoverTasks'
import { computeStats } from './dailyData'
import { getTodayKey, getYesterdayKey } from './date'
import { normalizeTasks } from './taskOrder'

/**
 * LocalStorage の読み書き
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

/** 引き継ぎ設定を読み込む */
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

/** 初回オンボーディングが必要か */
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

/** 🚨 修正：useTasks.js が求めている「保存データそのもの（オブジェクト）」をそのまま返す */
export function loadTasks() {
  return loadAllDailyData()
}

/** 🚨 修正：useTasks.js から送られてくるオブジェクト形式のデータを正しく解析して保存する */
export function saveTasks(allTasks) {
  // セーフティ：もし古い形式の配列が来たら当日に割り当てる
  if (Array.isArray(allTasks)) {
    const todayKey = getTodayKey()
    const { completed, total } = computeStats(allTasks)
    const currentData = loadAllDailyData()
    currentData[todayKey] = { completed, total, tasks: allTasks }
    saveAllDailyData(currentData)
    return
  }

  const cleaned = {}
  const yesterdayKey = getYesterdayKey()
  const keepYesterdayTasks = isCarryoverEnabled()

  // allTasks の中身をループして、それぞれの統計（completed, total）を再計算して整形
  Object.entries(allTasks).forEach(([dateKey, value]) => {
    if (!value) return

    // value が直接タスク配列の場合と、{ tasks: [...] } オブジェクトの場合の両方に対応
    const tasksArray = Array.isArray(value) ? value : value.tasks || []
    const { completed, total } = computeStats(tasksArray)

    cleaned[dateKey] = {
      completed,
      total,
      tasks: tasksArray,
    }
  })

  // データの欠落を防ぐため、既存のレコードで cleaned にないものも維持する
  const existingData = loadAllDailyData()
  Object.entries(existingData).forEach(([key, record]) => {
    if (!record || cleaned[key]) return

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