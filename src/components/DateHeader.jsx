import { useState } from 'react'
import { getTodayKey } from '../utils/date'

/**
 * 🚨 最初の1文字だけ大文字の形式（Wed, Tue...）に変更！
 */
const ENG_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * 日本語の「(水)」を消して「5月27日」だけにするヘルパー関数
 */
function formatCleanDate(dateObj) {
  const month = dateObj.getMonth() + 1
  const date = dateObj.getDate()
  return `${month}月${date}日`
}

export function DateHeader({ selectedDate, onChangeDate }) {
  const todayKey = getTodayKey()
  const isToday = selectedDate === todayKey

  // 1. 選択されている日付から正確にDateオブジェクトを作る
  const dateObj = new Date(selectedDate + 'T00:00:00')

  // 2. 選択されている日を基準にして「前の日」と「次の日」を動的に計算
  const prevDateObj = new Date(dateObj)
  prevDateObj.setDate(dateObj.getDate() - 1)

  const nextDateObj = new Date(dateObj)
  nextDateObj.setDate(dateObj.getDate() + 1)

  // 3. それぞれの日の正確な曜日を取得（これも自動で「Tue」「Thu」になるよ）
  const currentDayEng = ENG_DAYS[dateObj.getDay()]
  const prevDayEng = ENG_DAYS[prevDateObj.getDay()]
  const nextDayEng = ENG_DAYS[nextDateObj.getDay()]

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex flex-col items-center justify-center w-[290px] h-10 select-none mx-auto">
      
      {/* 前の日へ（前の日の曜日：頭文字だけ大文字） */}
      <button
        type="button"
        onClick={() => onChangeDate(-1)}
        aria-label="前の日へ"
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-xs font-bold tracking-wider text-[var(--color-title)] opacity-60 hover:opacity-100 active:opacity-40 transition-all"
      >
        {prevDayEng}
      </button>

      {/* 🟢 中央のタイトル：「5月27日」と「Wed」を半角スペース1個分空けて1行で並べる！ */}
      <div className="flex items-center justify-center gap-1">
        <h1 className="text-[1.35rem] font-medium tracking-wide text-[var(--color-title)] whitespace-nowrap">
          {formatCleanDate(dateObj)}
        </h1>
        {/* 🚨 uppercaseクラスを消して、頭文字だけ大文字をキープ */}
        <span className="text-[1.35rem] font-bold tracking-wide text-[var(--color-title)] opacity-90">
          {currentDayEng}
        </span>
      </div>

      {/* 次の日へ（次の日の曜日：頭文字だけ大文字） */}
      <button
        type="button"
        onClick={() => onChangeDate(1)}
        aria-label="次の日へ"
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-xs font-bold tracking-wider text-[var(--color-title)] opacity-60 hover:opacity-100 active:opacity-40 transition-all"
      >
        {nextDayEng}
      </button>

      {/* 今日以外を表示している時だけ、下部に「Back to Today」を表示 */}
      {!isToday && (
        <button
          type="button"
          onClick={() => onChangeDate(todayKey)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute -bottom-6 text-[10px] font-bold tracking-wider uppercase rounded-full border px-3 py-0.5 transition-all duration-150 active:scale-95 whitespace-nowrap"
          style={{
            borderColor: 'var(--color-title)',
            backgroundColor: isHovered ? 'var(--color-title)' : 'transparent',
            color: isHovered ? 'var(--color-surface)' : 'var(--color-title)',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          Back to Today
        </button>
      )}
    </div>
  )
}