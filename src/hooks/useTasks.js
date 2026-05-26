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
 * タスクの追加・編集・完了・並び替えを管理するカスタムフック
 */
export function useTasks(onDataChange) {
  const [tasks, setTasks] = useState(() => normalizeTasks(loadTasks()))
  const [todayKey, setTodayKey] = useState(() => getTodayKey())

  const displayTasks = useMemo(() => sortTasksForDisplay(tasks), [tasks])

  useEffect(() => {
    saveTasks(tasks)
    onDataChange?.()
  }, [tasks, onDataChange])

  useEffect(() => {
    const checkDayChange = () => {
      const currentKey = getTodayKey()
      if (currentKey !== todayKey) {
        setTodayKey(currentKey)
        setTasks(normalizeTasks(loadTasks()))
        onDataChange?.()
      }
    }

    const intervalId = setInterval(checkDayChange, 60_000)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') checkDayChange()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [todayKey, onDataChange])

  const addTask = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return false

    setTasks((prev) => [...prev, createTaskWithOrder(trimmed, prev)])
    return true
  }, [])

  /** 完了切り替えのみ（order は変更しない） */
  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }, [])

  const updateTask = useCallback((id, text) => {
    const trimmed = text.trim()
    if (!trimmed) {
      setTasks((prev) => prev.filter((t) => t.id !== id))
      return
    }
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: trimmed } : task)),
    )
  }, [])

  const reorderTasks = useCallback((activeId, overId) => {
    setTasks((prev) => reorderTasksByOrder(prev, activeId, overId))
  }, [])

  const activeCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks],
  )

  return {
    tasks: displayTasks,
    activeCount,
    totalCount: tasks.length,
    addTask,
    toggleTask,
    updateTask,
    reorderTasks,
  }
}
