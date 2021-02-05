import * as PIXI from "pixi.js";
import InteractiveEvent from "./InteractiveEvent";

class InteractableObject {

	private _pixiInstance: PIXI.Container;
	protected get pixiInstance(): PIXI.Container {
		return this._pixiInstance;
	}

	//#region Pointer Events 
	private _downPointerEvent: InteractiveEvent /*| undefined*/;
	public get downPointerEvent(): InteractiveEvent /*| undefined*/ {
		return this._downPointerEvent;
	}

	private _upPointerEvent: InteractiveEvent /*| undefined*/;
	public get upPointerEvent(): InteractiveEvent /*| undefined*/ {
		return this._upPointerEvent;
	}

	private _upOutsidePointerEvent: InteractiveEvent /*| undefined*/;
	public get upOutsidePointerEvent(): InteractiveEvent /*| undefined*/ {
		return this._upOutsidePointerEvent;
	}

	private _movePointerEvent: InteractiveEvent /*| undefined*/;
	public get movePointerEvent(): InteractiveEvent /*| undefined*/ {
		return this._movePointerEvent;
	}

	private _overPointerEvent: InteractiveEvent /*| undefined*/;
	public get overPointerEvent(): InteractiveEvent /*| undefined*/ {
		return this._overPointerEvent;
	}

	private _outPointerEvent: InteractiveEvent /*| undefined*/;
	public get outPointerEvent(): InteractiveEvent /*| undefined*/ {
		return this._outPointerEvent;
	}
	//#endregion

	constructor(pixiInstance: PIXI.Container) {
		this._pixiInstance = pixiInstance;

		this._downPointerEvent = new InteractiveEvent("pointerdown", this.pixiInstance);
		this._upPointerEvent = new InteractiveEvent("pointerup", this.pixiInstance);
		this._upOutsidePointerEvent = new InteractiveEvent("pointerupoutside", this.pixiInstance);
		this._movePointerEvent = new InteractiveEvent("pointermove", this.pixiInstance);
		this._overPointerEvent = new InteractiveEvent("pointerover", this.pixiInstance);
		this._outPointerEvent = new InteractiveEvent("pointerout", this.pixiInstance);

	}
}

export default InteractableObject;