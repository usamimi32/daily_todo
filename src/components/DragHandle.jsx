/**
 * 並び替え用ドラッグハンドル（≡）
 *
 * 将来ハンドルのみでドラッグする場合:
 * - 親の <li> から {...listeners} を外す
 * - このコンポーネントに dragListeners を渡す
 */
export function DragHandle({ dragListeners, dragAttributes, className = '' }) {
  const isHandleActive = Boolean(dragListeners)

  return (
    <span
      className={`flex shrink-0 items-center justify-center self-center ${className}`}
      {...(isHandleActive ? dragListeners : {})}
      {...(isHandleActive ? dragAttributes : {})}
      role={isHandleActive ? 'button' : undefined}
      tabIndex={isHandleActive ? 0 : undefined}
      aria-label={isHandleActive ? '並び替え' : undefined}
      aria-hidden={!isHandleActive ? true : undefined}
    >
      <span
        className={`select-none text-[0.875rem] leading-none tracking-tighter text-[var(--color-text-muted)] ${
          isHandleActive ? 'opacity-70' : 'pointer-events-none opacity-45'
        }`}
        aria-hidden="true"
      >
        ≡
      </span>
    </span>
  )
}
