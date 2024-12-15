export interface ExpiryOption {
  label: string
  value: number // 过期时间（毫秒）
}

export const EXPIRY_OPTIONS: ExpiryOption[] = [
  { label: '1小时', value: 1000 * 60 * 60 },
  { label: '24小时', value: 1000 * 60 * 60 * 24 },
  { label: '3天', value: 1000 * 60 * 60 * 24 * 3 }
]
