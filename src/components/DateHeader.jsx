import { useState } from 'react'
import { formatTitleDate, getTodayKey } from '../utils/date'

/**
 * 画面上部のタイトルと日付切り替え
 */
export function DateHeader({ selectedDate, onChangeDate }) {
  const todayKey = getTodayKey()
  const isToday = selectedDate === todayKey
  const dateObj = new Date(selectedDate)

  // マウスが乗っているかどうかを管理する状態
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="min-w-0 flex-1 flex flex-col items-center">
      <div className="flex items-center gap-3">
        {/* 前の日へ */}
        <button
          type="button"
          onClick={() => onChangeDate(-1)}
          aria-label="前の日へ"
          className="px-2 py-1 text-xl text-[var(--color-title)] hover:opacity-80 active:opacity-60 select-none"
        >
          &lt;
        </button>

        <h1 className="text-[1.35rem] font-medium leading-snug tracking-wide text-[var(--color-title)] min-w-0 text-center px-1">
          {formatTitleDate(dateObj)}
        </h1>

        {/* 次の日へ */}
        <button
          type="button"
          onClick={() => onChangeDate(1)}
          aria-label="次の日へ"
          className="px-2 py-1 text-xl text-[var(--color-title)] hover:opacity-80 active:opacity-60 select-none"
        >
          &gt;
        </button>
      </div>

      {/* 今日以外を表示している時だけ「Back to Today」を表示 */}
      {!isToday && (
        <button
          type="button"
          onClick={() => onChangeDate(todayKey)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-1 text-[10px] font-bold tracking-wider uppercase rounded-full border px-3 py-0.5 transition-all duration-150 active:scale-95"
          // 🚨 日付の文字色（color-title）に完全にシンクロさせる！
          style={{
            borderColor: 'var(--color-title)',
            backgroundColor: isHovered ? 'var(--color-title)' : 'transparent',
            color: isHovered ? 'var(--color-surface)' : 'var(--color-title)', // 背景色（surface）と反転させて絶対に読めるようにする
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0.7, // 通常時は少しだけ馴染ませる
          }}
        >
          Back to Today
        </button>
      )}
    </header>
  )
}