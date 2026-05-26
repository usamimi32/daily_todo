/**
 * パステル系テーマの定義（色相順）
 * 柔らかさを保ちつつ、少し鮮やかめのパステルで視認性を確保
 */

/** テーマピッカー表示順 */
export const THEME_ORDER = [
  'turquoise',
  'mutedBlue',
  'navyGray',
  'sageGreen',
  'cream',
  'paleOrange',
  'paleRed',
  'gray',
]

export const THEMES = {
  paleRed: {
    id: 'paleRed',
    label: 'ペールレッド',
    swatch: '#e89090',
    vars: {
      '--color-bg': '#fcf2f2',
      '--color-surface': '#fff9f9',
      '--color-accent': '#e88a8a',
      '--color-accent-soft': '#fce4e4',
      '--color-accent-hover': '#d47070',
      '--color-text': '#6b4a4a',
      '--color-title': '#5a3e3e',
      '--color-text-muted': '#a88080',
      '--color-border': '#f0cccc',
      '--color-checkbox': '#d47070',
      '--color-shadow': 'rgba(212, 112, 112, 0.14)',
    },
  },
  paleOrange: {
    id: 'paleOrange',
    label: 'ペールオレンジ',
    swatch: '#e8a870',
    vars: {
      '--color-bg': '#fcf6f0',
      '--color-surface': '#fffbf7',
      '--color-accent': '#e8a068',
      '--color-accent-soft': '#fce8d8',
      '--color-accent-hover': '#d08848',
      '--color-text': '#6b5240',
      '--color-title': '#5a4534',
      '--color-text-muted': '#a89078',
      '--color-border': '#f0dcc8',
      '--color-checkbox': '#d08848',
      '--color-shadow': 'rgba(208, 136, 72, 0.14)',
    },
  },
  cream: {
    id: 'cream',
    label: 'クリーム',
    swatch: '#dcc878',
    vars: {
      '--color-bg': '#fcfaf2',
      '--color-surface': '#fffdf7',
      '--color-accent': '#d8b868',
      '--color-accent-soft': '#f8f0d8',
      '--color-accent-hover': '#c0a050',
      '--color-text': '#6b5e40',
      '--color-title': '#5a5034',
      '--color-text-muted': '#a89870',
      '--color-border': '#ece4c8',
      '--color-checkbox': '#c0a050',
      '--color-shadow': 'rgba(192, 160, 80, 0.14)',
    },
  },
  sageGreen: {
    id: 'sageGreen',
    label: 'セージグリーン',
    swatch: '#90b890',
    vars: {
      '--color-bg': '#f4f8f4',
      '--color-surface': '#fafcfa',
      '--color-accent': '#88b088',
      '--color-accent-soft': '#e4f0e4',
      '--color-accent-hover': '#689868',
      '--color-text': '#465a48',
      '--color-title': '#3a4c3c',
      '--color-text-muted': '#849488',
      '--color-border': '#d0e4d0',
      '--color-checkbox': '#689868',
      '--color-shadow': 'rgba(104, 152, 104, 0.14)',
    },
  },
  turquoise: {
    id: 'turquoise',
    label: 'ターコイズブルー',
    swatch: '#68c0c0',
    vars: {
      '--color-bg': '#f0f8f8',
      '--color-surface': '#f7fdfd',
      '--color-accent': '#58b8b8',
      '--color-accent-soft': '#d8f0f0',
      '--color-accent-hover': '#409898',
      '--color-text': '#3e5a5a',
      '--color-title': '#344c4c',
      '--color-text-muted': '#789090',
      '--color-border': '#c8e8e8',
      '--color-checkbox': '#409898',
      '--color-shadow': 'rgba(64, 152, 152, 0.14)',
    },
  },
  mutedBlue: {
    id: 'mutedBlue',
    label: 'くすみブルー',
    swatch: '#88a8c8',
    vars: {
      '--color-bg': '#f2f6fa',
      '--color-surface': '#f9fbfd',
      '--color-accent': '#78a0c8',
      '--color-accent-soft': '#e0ecf6',
      '--color-accent-hover': '#5880a8',
      '--color-text': '#445668',
      '--color-title': '#384858',
      '--color-text-muted': '#8090a0',
      '--color-border': '#ccd8e8',
      '--color-checkbox': '#5880a8',
      '--color-shadow': 'rgba(88, 128, 168, 0.14)',
    },
  },
  navyGray: {
    id: 'navyGray',
    label: 'ネイビーグレー',
    swatch: '#7888a0',
    vars: {
      '--color-bg': '#f0f2f6',
      '--color-surface': '#f8f9fb',
      '--color-accent': '#687890',
      '--color-accent-soft': '#e0e4ec',
      '--color-accent-hover': '#505c70',
      '--color-text': '#424a58',
      '--color-title': '#383e4a',
      '--color-text-muted': '#7c8490',
      '--color-border': '#ccd0d8',
      '--color-checkbox': '#505c70',
      '--color-shadow': 'rgba(80, 92, 112, 0.14)',
    },
  },
  gray: {
    id: 'gray',
    label: 'グレー',
    swatch: '#a0a0a0',
    vars: {
      '--color-bg': '#f4f4f4',
      '--color-surface': '#fafafa',
      '--color-accent': '#909090',
      '--color-accent-soft': '#eaeaea',
      '--color-accent-hover': '#707070',
      '--color-text': '#505050',
      '--color-title': '#444444',
      '--color-text-muted': '#909090',
      '--color-border': '#d8d8d8',
      '--color-checkbox': '#707070',
      '--color-shadow': 'rgba(112, 112, 112, 0.12)',
    },
  },
  mauvePink: {
    id: 'mauvePink',
    label: 'モーヴピンク',
    swatch: '#c098b0',
    vars: {
      '--color-bg': '#f8f4f7',
      '--color-surface': '#fdf9fc',
      '--color-accent': '#b888a8',
      '--color-accent-soft': '#f0e4ec',
      '--color-accent-hover': '#9c7090',
      '--color-text': '#5c4a56',
      '--color-title': '#4e3e48',
      '--color-text-muted': '#948898',
      '--color-border': '#e8d8e2',
      '--color-checkbox': '#9c7090',
      '--color-shadow': 'rgba(156, 112, 144, 0.14)',
    },
  },
}

/** デフォルトテーマ（初回起動・未保存時） */
export const DEFAULT_THEME_ID = 'turquoise'

/** 旧テーマ ID → 新テーマ ID（LocalStorage 互換） */
export const LEGACY_THEME_MAP = {
  pink: 'mauvePink',
  mint: 'sageGreen',
  lavender: 'mauvePink',
  sky: 'mutedBlue',
}

/** テーマ ID の一覧 */
export const THEME_IDS = THEME_ORDER
