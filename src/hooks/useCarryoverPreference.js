import { useCallback, useState } from 'react'
import { loadCarryoverMode, needsCarryoverOnboarding, saveCarryoverMode } from '../utils/storage'

/**
 * 未完了タスクの引き継ぎ設定
 */
export function useCarryoverPreference() {
  const [mode, setMode] = useState(() => loadCarryoverMode())
  const [showOnboarding, setShowOnboarding] = useState(() => needsCarryoverOnboarding())

  const setPreference = useCallback((nextMode) => {
    saveCarryoverMode(nextMode)
    setMode(nextMode)
    setShowOnboarding(false)
  }, [])

  return {
    mode,
    showOnboarding,
    setPreference,
  }
}
