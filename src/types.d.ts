///////////////////////
//                   //
//       TYPES       //
//                   //
///////////////////////

export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl"
export type Threshold = {
  [key in BreakpointName]: number
}

export type SeuilConfig = {
  thresholds?: Threshold
  debounceDelay?: number
}

export type BreakpointState = {
  name: BreakpointName
  width: number
  xs: boolean
  sm: boolean
  smAndDown: boolean
  smAndUp: boolean
  md: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lg: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  xl: boolean
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $breakpoints: BreakpointState
  }
}

export * from "./index"
