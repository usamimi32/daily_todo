import { useCallback, useEffect, useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { DateHeader } from './components/DateHeader'
import { useDailyRecords } from './hooks/useDailyRecords'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'
import { CalendarPage } from './pages/CalendarPage'
import { TodayPage } from './pages/TodayPage'

/**
 * アプリのルートコンポーネント
 */
function App() {
  const [view, setView] = useState('today')
  const [menuOpen, setMenuOpen] = useState(false)

  const { themeId, themes, changeTheme } = useTheme()
  const { records, refresh } = useDailyRecords()

  const handleDataChange = useCallback(() => {
    refresh()
  }, [refresh])

  const { tasks, activeCount, totalCount, addTask, toggleTask, updateTask, reorderTasks } =
    useTasks(handleDataChange)

  useEffect(() => {
    if (view === 'calendar') refresh()
  }, [view, refresh])

  const title =
    view === 'today' ? (
      <DateHeader />
    ) : (
      <h1 className="text-[1.35rem] font-medium leading-snug tracking-wide text-[var(--color-title)]">
        Calendar
      </h1>
    )

  return (
    <AppShell
      title={title}
      currentView={view}
      menuOpen={menuOpen}
      themeId={themeId}
      themes={themes}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
      onNavigate={setView}
      onThemeChange={changeTheme}
    >
      {view === 'today' ? (
        <TodayPage
          tasks={tasks}
          activeCount={activeCount}
          totalCount={totalCount}
          onAdd={addTask}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onReorder={reorderTasks}
        />
      ) : (
        <CalendarPage records={records} />
      )}
    </AppShell>
  )
}

export default App
