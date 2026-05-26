import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getTodayKey } from '../utils/date'
import { loadTasks, saveTasks } from '../utils/storage'

function findLastActiveIndex(tasks) {
  for (let i = tasks.length - 1; i >= 0; i -= 1) {
    if (!tasks[i].completed) return i
  }
  return -1
}

function findFirstDoneIndex(tasks) {
  return tasks.findIndex((t) => t.completed)
}

/**
 * タスクの追加・編集・完了・並び替えを管理するカスタムフック
 */
export function useTasks(onDataChange) {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [todayKey, setTodayKey] = useState(() => getTodayKey())

  useEffect(() => {
    saveTasks(tasks)
    onDataChange?.()
  }, [tasks, onDataChange])

  useEffect(() => {
    const checkDayChange = () => {
      const currentKey = getTodayKey()
      if (currentKey !== todayKey) {
        setTodayKey(currentKey)
        setTasks(loadTasks())
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

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    }

    setTasks((prev) => {
      const firstDone = findFirstDoneIndex(prev)
      if (firstDone === -1) return [newTask, ...prev]
      return [...prev.slice(0, firstDone), newTask, ...prev.slice(firstDone)]
    })
    return true
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id)
      if (index === -1) return prev

      const task = prev[index]
      const updated = { ...task, completed: !task.completed }
      const rest = prev.filter((t) => t.id !== id)

      if (updated.completed) {
        const firstDone = findFirstDoneIndex(rest)
        if (firstDone === -1) return [...rest, updated]
        return [...rest.slice(0, firstDone), updated, ...rest.slice(firstDone)]
      }

      const lastActive = findLastActiveIndex(rest)
      if (lastActive === -1) return [updated, ...rest]
      return [...rest.slice(0, lastActive + 1), updated, ...rest.slice(lastActive + 1)]
    })
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
    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId)
      const newIndex = prev.findIndex((t) => t.id === overId)
      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev
      if (prev[oldIndex].completed !== prev[newIndex].completed) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }, [])

  const activeCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks],
  )

  return {
    tasks,
    activeCount,
    totalCount: tasks.length,
    addTask,
    toggleTask,
    updateTask,
    reorderTasks,
  }
}
