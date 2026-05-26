import { useCallback, useState } from 'react'
import { loadAllDailyData } from '../utils/storage'

/**
 * カレンダー表示用の全日付データ
 */
export function useDailyRecords() {
  const [records, setRecords] = useState(() => loadAllDailyData())

  const refresh = useCallback(() => {
    setRecords(loadAllDailyData())
  }, [])

  return { records, refresh }
}
