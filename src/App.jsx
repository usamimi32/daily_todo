import { useCallback, useEffect, useState } from 'react'
import { CarryoverOnboardingModal } from './components/CarryoverOnboardingModal'
import { AppShell } from './components/layout/AppShell'
import { DateHeader } from './components/DateHeader'
import { useCarryoverPreference } from './hooks/useCarryoverPreference'
import { useDailyRecords } from './hooks/useDailyRecords'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'
import { CalendarPage } from './pages/CalendarPage'
import { SettingsPage } from './pages/SettingsPage'
import { TodayPage } from './pages/TodayPage'

/**
 * アプリのルートコンポーネント
 */
function App() {
  const [view, setView] = useState('today')
  const [menuOpen, setMenuOpen] = useState(false)
  const { themeId, themes, changeTheme } = useTheme()
  const { records, refresh } = useDailyRecords()
  const { mode: carryoverMode, showOnboarding, setPreference } = useCarryoverPreference()

  const handleDataChange = useCallback(() => {
    refresh()
  }, [refresh])

  const { tasks, activeCount, totalCount, addTask, toggleTask, updateTask, reorderTasks, reloadTasks } =
    useTasks(handleDataChange)

  useEffect(() => {
    if (view === 'calendar') refresh()
  }, [view, refresh])

  const handleCarryoverSelect = useCallback(
    (selectedMode) => {
      setPreference(selectedMode)
      reloadTasks()
    },
    [setPreference, reloadTasks],
  )

  const handleSettingsCarryoverChange = useCallback(
    (selectedMode) => {
      setPreference(selectedMode)
    },
    [setPreference],
  )

  const title =
    view === 'today' ? (
      <DateHeader />
    ) : view === 'calendar' ? (
      <h1 className="text-[1.35rem] font-medium leading-snug tracking-wide text-[var(--color-title)]">
        Calendar
      </h1>
    ) : (
      <h1 className="text-[1.35rem] font-medium leading-snug tracking-wide text-[var(--color-title)]">
        Setting
      </h1>
    )

  return (
    <>
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
        {view === 'today' && (
          <TodayPage
            tasks={tasks}
            activeCount={activeCount}
            totalCount={totalCount}
            onAdd={addTask}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onReorder={reorderTasks}
          />
        )}
        {view === 'calendar' && <CalendarPage records={records} />}
        {view === 'settings' && (
          <SettingsPage
            carryoverMode={carryoverMode}
            onCarryoverChange={handleSettingsCarryoverChange}
          />
        )}
      </AppShell>

      <CarryoverOnboardingModal open={showOnboarding} onSelect={handleCarryoverSelect} />
    </>
  )
}

export default App
