import { useCallback, useEffect, useMemo, useState } from 'react'
import { getTodayKey } from '../utils/date'
import {
  createTaskWithOrder,
  normalizeTasks,
  reorderTasksByOrder,
  sortTasksForDisplay,
} from '../utils/taskOrder'
import { loadTasks, saveTasks } from '../utils/storage'

/**
 * 日付ごとのタスクの追加・編集・完了・削除・並び替えを管理するカスタムフック
 */
export function useTasks(onDataChange) {
  // 全ての日付のタスクを保持するオブジェクト形式のデータ構造にする
  // 例: { "2026-05-27": [タスク一覧], "2026-05-28": [] }
  const [allTasks, setAllTasks] = useState(() => {
    const loaded = loadTasks()
    // 過去のデータが配列だった場合の互換性ケア
    if (Array.isArray(loaded)) {
      return { [getTodayKey()]: normalizeTasks(loaded) }
    }
    return loaded || {}
  })

  // 現在表示・編集している日付（初期値は今日）
  const [selectedDate, setSelectedDate] = useState(() => getTodayKey())

  // 選択されている日付のタスク配列を取得（なければ空配列）
  const currentTasks = useMemo(() => {
    return normalizeTasks(allTasks[selectedDate] || [])
  }, [allTasks, selectedDate])

  // 画面表示用にソートされたタスク
  const displayTasks = useMemo(() => sortTasksForDisplay(currentTasks), [currentTasks])

  // データが変更されたらローカルストレージに保存
  useEffect(() => {
    saveTasks(allTasks)
    onDataChange?.()
  }, [allTasks, onDataChange])

  // 外部からのリロード用
  const reloadTasks = useCallback((nextTasks) => {
    setAllTasks(nextTasks ?? loadTasks() ?? {})
  }, [])

  // 🚨 修正ポイント：引数が文字列（今日の日付など）なら直接ジャンプ、数値ならずらす
  const changeDate = useCallback((daysOffset) => {
    if (typeof daysOffset === 'string') {
      setSelectedDate(daysOffset)
      return
    }

    setSelectedDate((prev) => {
      const date = new Date(prev)
      date.setDate(date.getDate() + daysOffset)
      // YYYY-MM-DD 形式にフォーマット
      return date.toISOString().split('T')[0]
    })
  }, [])

  // 特定の日付に直接ジャンプする関数（カレンダー用）
  const goToDate = useCallback((dateStr) => {
    setSelectedDate(dateStr)
  }, [])

  // タスクの追加
  const addTask = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return false

    setAllTasks((prev) => {
      const dayTasks = normalizeTasks(prev[selectedDate] || [])
      return {
        ...prev,
        [selectedDate]: [...dayTasks, createTaskWithOrder(trimmed, dayTasks)],
      }
    })
    return true
  }, [selectedDate])

  // 完了切り替え
  const toggleTask = useCallback((id) => {
    setAllTasks((prev) => {
      const dayTasks = normalizeTasks(prev[selectedDate] || [])
      return {
        ...prev,
        [selectedDate]: dayTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      }
    })
  }, [selectedDate])

  // タスクの削除（×ボタン用）
  const deleteTask = useCallback((id) => {
    setAllTasks((prev) => {
      const dayTasks = normalizeTasks(prev[selectedDate] || [])
      return {
        ...prev,
        [selectedDate]: dayTasks.filter((task) => task.id !== id),
      }
    })
  }, [selectedDate])

  // タスクのテキスト更新（空欄なら削除）
  const updateTask = useCallback((id, text) => {
    const trimmed = text.trim()
    if (!trimmed) {
      deleteTask(id)
      return
    }
    setAllTasks((prev) => {
      const dayTasks = normalizeTasks(prev[selectedDate] || [])
      return {
        ...prev,
        [selectedDate]: dayTasks.map((task) =>
          task.id === id ? { ...task, text: trimmed } : task,
        ),
      }
    })
  }, [selectedDate, deleteTask])

  // 並び替え（ドラッグ＆ドロップ）
  const reorderTasks = useCallback((activeId, overId) => {
    setAllTasks((prev) => {
      const dayTasks = normalizeTasks(prev[selectedDate] || [])
      return {
        ...prev,
        [selectedDate]: reorderTasksByOrder(dayTasks, activeId, overId),
      }
    })
  }, [selectedDate])

  const activeCount = useMemo(
    () => currentTasks.filter((t) => !t.completed).length,
    [currentTasks],
  )

  return {
    tasks: displayTasks,
    selectedDate, // 現在選ばれている日付（UIに表示する用）
    activeCount,
    totalCount: currentTasks.length,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,    // 新しく追加
    reorderTasks,
    reloadTasks,
    changeDate,   // 新しく追加（左右ボタン用）
    goToDate,     // 新しく追加（カレンダー用）
  }
}