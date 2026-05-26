import { useCallback, useEffect, useState } from 'react'
import { THEMES } from '../constants/themes'
import { loadThemeId, saveThemeId } from '../utils/storage'

/**
 * テーマの選択と CSS 変数の適用を管理するカスタムフック
 */
export function useTheme() {
  const [themeId, setThemeId] = useState(() => loadThemeId())

  // テーマが変わったら CSS 変数と meta theme-color を更新
  useEffect(() => {
    const theme = THEMES[themeId]
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // PWA / Safari のステータスバー色
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme.vars['--color-bg'])
    }
  }, [themeId])

  const changeTheme = useCallback((nextId) => {
    if (!THEMES[nextId]) return
    setThemeId(nextId)
    saveThemeId(nextId)
  }, [])

  return {
    themeId,
    theme: THEMES[themeId],
    themes: THEMES,
    changeTheme,
  }
}
