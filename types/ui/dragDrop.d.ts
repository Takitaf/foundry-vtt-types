/**
 * A controller class for managing drag and drop workflows within an Application instance.
 * The controller manages the following actions: dragstart, dragover, drop
 * @see {@link Application}
 *
 * @example
 * ```typescript
 * const dragDrop = new DragDrop({
 *   dragSelector: ".item",
 *   dropSelector: ".items",
 *   permissions: { dragstart: this._canDragStart.bind(this), drop: this._canDragDrop.bind(this) }
 *   callbacks: { dragstart: this._onDragStart.bind(this), drop: this._onDragDrop.bind(this) }
 * });
 * dragDrop.bind(html);
 * ```
 */
declare class DragDrop<S extends string | null = null, T extends string | null = null> {
  /**
   * @param dragSelector - The CSS selector used to target draggable elements.
   * @param dropSelector - The CSS selector used to target viable drop targets.
   * @param permissions  - An object of permission test functions for each action
   * @param callbacks    - An object of callback functions for each action
   */
  constructor({
    dragSelector,
    dropSelector,
    permissions,
    callbacks
  }?: {
    dragSelector?: S;
    dropSelector?: T;
    permissions?: DragDrop<S, T>['permissions'];
    callbacks?: DragDrop<S, T>['callbacks'];
  });

  /**
   * The HTML selector which identifies draggable elements
   * @defaultValue `null`
   */
  dragSelector: S;

  /**
   * The HTML selector which identifies drop targets
   * @defaultValue `null`
   */
  dropSelector: T;

  /**
   * A set of permission checking functions for each action of the Drag and Drop workflow
   * @defaultValue `{}`
   */
  permissions: Record<string, (selector: S | T) => boolean>;

  /**
   * A set of callback functions for each action of the Drag and Drop workflow
   * @defaultValue `{}`
   */
  callbacks: Record<string, (event: DragEvent) => unknown>;

  /**
   * Bind the DragDrop controller to an HTML application
   * @param html - The HTML element to which the handler is bound
   */
  bind(html: HTMLElement): this;

  /**
   * Execute a callback function associated with a certain action in the workflow
   * @param event  - The drag event being handled
   * @param action - The action being attempted
   */
  callback(event: DragEvent, action: string): unknown;

  /**
   * Test whether the current user has permission to perform a step of the workflow
   * @param action   - The action being attempted
   * @param selector - The selector being targeted
   * @returns Can the action be performed?
   */
  can(action: string, selector: S | T): boolean;

  /**
   * Handle the start of a drag workflow
   * @param event - The drag event being handled
   */
  protected _handleDragStart(event: DragEvent): void;

  /**
   * Handle a dragged element over a droppable target
   * @param event - The drag event being handled
   */
  protected _handleDragOver(event: DragEvent): false;

  /**
   * Handle a dragged element dropped on a droppable target
   * @param event - The drag event being handled
   */
  protected _handleDrop(event: DragEvent): unknown;

  static createDragImage(img: HTMLImageElement, width: number, height: number): HTMLDivElement | HTMLElement;
}
