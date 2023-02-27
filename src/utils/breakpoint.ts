// @constants
import { DEFAULT_THRESHOLDS } from './constants';
// @types
import type { BreakpointName, Threshold } from '../types';
import { Ref } from 'vue-demi';

/**
 * @class
 */
export class Breakpoint {
  /**
   * @property {boolean} isXs
   * @default false
   * @private
   */
  private isXs = false;

  /**
   * @property {boolean} isSm
   * @default false
   * @private
   */
  private isSm = false;

  /**
   * @property {boolean} isMd
   * @default false
   * @private
   */
  private isMd = false;

  /**
   * @property {boolean} isLg
   * @default false
   * @private
   */
  private isLg = false;

  /**
   * @property {boolean} isXl
   * @default false
   * @private
   */
  private isXl = false;

  /**
   * @property {boolean} _width
   * @default false
   * @private
   */
  private _width = 0;

  /**
   * @property {boolean} thresholds
   * @private
   */
  private thresholds: Threshold;

  /**
   * create a new Breakpoint object
   *
   * @param {!Threshold=} thresholds
   *
   * @constructor
   */
  public constructor(thresholds?: Threshold) {
    this.thresholds = thresholds ?? DEFAULT_THRESHOLDS;
  }

  /**
   * Whether current threshold represents very small devices
   *
   * @return {boolean}
   * @public
   */
  public get xs(): boolean {
    return this.isXs;
  }
  /**
   * @param {boolean} newValue
   * @private
   */
  private set xs(newValue: boolean) {
    this.isXs = newValue;
  }

  /**
   * Whether current threshold represents small devices
   *
   * @return {boolean}
   * @public
   */
  public get sm(): boolean {
    return this.isSm;
  }

  /**
   * @param {boolean} newValue
   * @private
   */
  private set sm(newValue: boolean) {
    this.isSm = newValue;
  }

  /**
   * Whether current threshold represents medium devices (e.g: tablet)
   *
   * @return {boolean}
   * @public
   */
  public get md(): boolean {
    return this.isMd;
  }

  /**
   * @param {boolean} newValue
   * @private
   */
  private set md(newValue: boolean) {
    this.isMd = newValue;
  }

  /**
   * Whether current threshold represents large devices (e.g: laptop)
   *
   * @return {boolean}
   * @public
   */
  public get lg(): boolean {
    return this.isLg;
  }

  /**
   * @param {boolean} newValue
   * @private
   */
  private set lg(newValue: boolean) {
    this.isLg = newValue;
  }

  /**
   * Whether current threshold represents very large devices (e.g: desktop)
   *
   * @return {boolean}
   * @public
   */
  public get xl(): boolean {
    return this.isXl;
  }

  /**
   * @param {boolean} newValue
   * @private
   */
  private set xl(newValue: boolean) {
    this.isXl = newValue;
  }

  /**
   * Current viewport width
   *
   * @return {number}
   * @public
   */
  public get width(): number {
    return this._width;
  }

  /**
   * @param {number} newWidth
   * @private
   */
  private set width(newWidth: number) {
    this._width = newWidth;
  }

  /**
   * Current threshold name
   *
   * @return {BreakpointName}
   * @public
   */
  public get name(): BreakpointName {
    switch (true) {
      case this.xs:
        return 'xs';
      case this.sm:
        return 'sm';
      case this.md:
        return 'md';
      case this.lg:
        return 'lg';
      default:
        return 'xs';
    }
  }

  /**
   * Initialize and detect the current viewport threshold according to the device width
   *
   * @param {number} width - viewport width
   * @return {void}
   */
  // TODO : change it to refreshBreakpoint (get current window width)
  public setBreakpoints(width: number): void {
    this.width = width;
    this.xs = width < this.thresholds.xs;
    this.sm = width < this.thresholds.sm && !this.xs;
    this.md = width < this.thresholds.md && !(this.sm || this.xs);
    this.lg = width < this.thresholds.lg && !(this.md || this.sm || this.xs);
    this.xl = width >= this.thresholds.lg;
  }
}
