// @packages
import {
  getCurrentInstance,
  onUnmounted,
  reactive,
  type UnwrapNestedRefs,
} from "vue-demi"
import _ from "lodash"

// @constants
import { DEFAULT_DELAY, DEFAULT_THRESHOLDS } from "./constants"

// @types
import { Breakpoint } from "./breakpoint"
import type { BreakpointName, BreakpointState, Threshold } from "../types"

/**
 * @class
 */
export class Seuil {
  /**
   * The maximum time (in milliseconds) is allowed to be delay the resize callback
   *
   * @property {number} debounceDelay
   * @private
   */
  private debounceDelay = DEFAULT_DELAY

  /**
   * @property {UnwrapNestedRefs<Breakpoint>}
   * @private
   */
  private breakpoint: UnwrapNestedRefs<Breakpoint>

  /**
   * List of callbacs to be called whenever the viewport size changes
   *
   * @property Array<(state?: BreakpointState) => void>
   * @private
   */
  private handlers: Array<(state?: BreakpointState) => void> = []

  /**
   * The one and only instance of Seuil
   *
   * @static
   * @private
   */
  private static instance: Seuil

  /**
   * Create a new Seuil instance internally
   *
   * @param {!Threshold=} thresholds
   * @param {!number=} debounceDelay
   * @constructor
   * @private
   */
  private constructor(
    thresholds: Threshold | undefined,
    debounceDelay: number | undefined
  ) {
    this.breakpoint = reactive(new Breakpoint(thresholds ?? DEFAULT_THRESHOLDS))
    this.debounceDelay = debounceDelay ?? DEFAULT_DELAY

    // get initial breakpoints
    this.breakpoint.setBreakpoints(window.innerWidth)

    //
    this.onResize()
  }

  /**
   * Create one and only instance to be used by the application
   *
   * @param {!Threshold=} thresholds
   * @param {!number=} debounceDelay
   * @returns {Seuil}
   */
  public static getInstance(
    thresholds?: Threshold,
    debounceDelay?: number
  ): Seuil {
    if (!Seuil.instance) {
      Seuil.instance = new Seuil(
        thresholds ?? DEFAULT_THRESHOLDS,
        debounceDelay ?? DEFAULT_DELAY
      )
    }
    return Seuil.instance
  }

  /**
   *
   *
   * @returns {BreakpointState}
   * @public
   */
  public get state(): BreakpointState {
    return {
      width: this.width,
      name: this.name,
      xs: this.xs,
      sm: this.sm,
      smAndDown: this.smAndDown,
      smAndUp: this.smAndUp,
      md: this.md,
      mdAndDown: this.mdAndDown,
      mdAndUp: this.mdAndUp,
      lg: this.lgAndDown,
      lgAndDown: this.lgAndDown,
      lgAndUp: this.lgAndUp,
      xl: this.xl,
    }
  }

  /**
   * Current breakpoint name
   *
   * @return {BreakpointName}
   * @private
   */
  public get name(): BreakpointName {
    return this.breakpoint.name
  }

  /**
   * @return {number}
   */
  public get width(): number {
    return this.breakpoint.width
  }

  /**
   * @return {boolean}
   */
  public get xs(): boolean {
    return this.breakpoint.xs
  }

  /**
   * @return {boolean}
   */
  public get sm(): boolean {
    return this.breakpoint.sm
  }

  /**
   * @return {boolean}
   */
  public get md(): boolean {
    return this.breakpoint.md
  }

  /**
   * @return {boolean}
   */
  public get lg(): boolean {
    return this.breakpoint.lg
  }

  /**
   * @return {boolean}
   */
  public get xl(): boolean {
    return this.breakpoint.xl
  }

  /**
   * @return {boolean}
   */
  public get smAndDown(): boolean {
    return (
      (this.breakpoint.xs || this.breakpoint.sm) &&
      !(this.breakpoint.md || this.breakpoint.lg || this.breakpoint.xl)
    )
  }

  /**
   * @return {boolean}
   */
  public get smAndUp(): boolean {
    return (
      !this.breakpoint.xs &&
      (this.breakpoint.sm ||
        this.breakpoint.md ||
        this.breakpoint.lg ||
        this.breakpoint.xl)
    )
  }

  /**
   * @return {boolean}
   */
  public get mdAndDown(): boolean {
    return (
      (this.breakpoint.xs || this.breakpoint.sm || this.breakpoint.md) &&
      !(this.breakpoint.lg || this.breakpoint.xl)
    )
  }

  /**
   * @return {boolean}
   */
  public get mdAndUp(): boolean {
    return (
      !(this.breakpoint.xs || this.breakpoint.sm) &&
      (this.breakpoint.md || this.breakpoint.lg || this.breakpoint.xl)
    )
  }

  /**
   * @return {boolean}
   */
  public get lgAndDown(): boolean {
    return (
      (this.breakpoint.xs ||
        this.breakpoint.sm ||
        this.breakpoint.md ||
        this.breakpoint.lg) &&
      !this.breakpoint.xl
    )
  }

  /**
   * @return {boolean}
   */
  public get lgAndUp(): boolean {
    return (
      !(this.breakpoint.xs || this.breakpoint.sm || this.breakpoint.md) &&
      (this.breakpoint.lg || this.breakpoint.xl)
    )
  }

  /**
   * watch viwport size changes
   *
   * @returns {void}
   */
  private onResize(): void {
    if (!window) return

    window.addEventListener("resize", this.handleResize.bind(this), {
      passive: true,
    })
  }

  /**
   * Debounce viewport size updates
   */
  private handleResize = _.debounce(() => {
    this.breakpoint.setBreakpoints(window.innerWidth)
    // call handlers
    this.triggerHandlers()
  }, this.debounceDelay)

  /**
   * Notifies watcher with the new information
   */
  private triggerHandlers() {
    this.handlers.forEach((handler) => {
      handler(this.state)
    })
  }

  /**
   * Setups a callback/handler to be called whenever the viewport size changes
   *
   * It will be automatically cleaned up when the component gets unmounted
   *
   * @param handler
   * @returns {Function} - Function to remove the watcher
   */
  public watch(handler: (state?: BreakpointState) => void): Function {
    /* avoid watching twice */
    if (!this.handlers.includes(handler)) this.handlers.push(handler)

    /**
     * Remove the watcher from handlers list
     *
     * @return {void}
     */
    const unwatch = (): void => {
      const idx = this.handlers.indexOf(handler)
      if (idx > -1) {
        this.handlers.splice(idx, 1)
      }
    }

    if (getCurrentInstance()) {
      onUnmounted(unwatch)
    }

    return unwatch
  }
}
