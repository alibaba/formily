export enum EComponentSize {
  SMALL = "small",
  MEDIUM = "medium",
  MIDDLE = "middle",
  LARGE = "large"
}
export enum ELineHeightPx {
  "small" = 20,
  "medium" = 28,
  "middle" = 28,
  "large" = 40
}
export enum EFontSizePx {
  "small" = 12,
  "medium" = 14,
  "middle" = 14,
  "large" = 16
}
export enum EPxType {
  Font = "font",
  Line = "lineHeight"
}
export type PxValue = ELineHeightPx | EFontSizePx