import type { Threshold } from "../types"

/**
 * @constant
 * @type {Threshold} breakpoint limits
 */
export const DEFAULT_THRESHOLDS: Threshold = {
  xs: 320,
  sm: 768,
  md: 1200,
  lg: 1500,
  xl: 1920,
}

/**
 * @constant
 * @type {number} The maximum time (in milliseconds)  allowed to delay the resize callback.
 */
export const DEFAULT_DELAY: number = 300
