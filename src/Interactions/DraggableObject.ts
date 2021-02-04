import * as PIXI from "pixi.js";
import AppManager from "../Systems/AppManager";
import Movements from "../Systems/Movements";
import MathUtils from "../Utils/MathUtils";
import InteractableObject from "./InteractableObject";

class DraggableObject extends InteractableObject {

	private interactionData?: PIXI.InteractionData;

	private _positionBeforeDrag: PIXI.Point = new PIXI.Point;
	public get positionBeforeDrag(): PIXI.Point {
		return this._positionBeforeDrag;
	}
	public set positionBeforeDrag(value: PIXI.Point) {
		this._positionBeforeDrag = value;
	}

	private _initialPosition: PIXI.Point = new PIXI.Point;
	public get initialPosition(): PIXI.Point {
		return this._initialPosition;
	}
	
	private pointerOffset: PIXI.Point = new PIXI.Point(0,0);

	private minimumMove: number = 0;

	private _touched: boolean = false;
	public get touched(): boolean {
		return this._touched;
	}
	private _dragging: boolean = false;
	public get dragging(): boolean {
		return this._dragging;
	}

	private _keepPointerOffset: boolean = false;
	public get keepPointerOffset(): boolean {
		return this._keepPointerOffset;
	}
	public set keepPointerOffset(value: boolean) {
		this._keepPointerOffset = value;
	}

	constructor(pixiInstance: PIXI.Container, keepPointerOffset: boolean, minimumMove?: number) {
		super(pixiInstance);
		this._keepPointerOffset = keepPointerOffset;
		/*this.downPointerEvent.addListener(this.dragStart, this);
		this.movePointerEvent.addListener(this.dragMove, this);
		this.upPointerEvent.addListener(this.dragEnd, this);
		this.upOutsidePointerEvent.addListener(this.dragEnd, this);*/

		this._positionBeforeDrag.set(this.pixiInstance.position.x, this.pixiInstance.position.y);

		this._initialPosition.set(this.pixiInstance.position.x, this.pixiInstance.position.y);

		if(minimumMove != undefined){
			this.minimumMove = minimumMove;
		}
	}

	dragStart(event: PIXI.InteractionEvent){
		this.interactionData = event.data;

		this._positionBeforeDrag.set(this.pixiInstance.position.x, this.pixiInstance.position.y);

		let targetPosition = this.interactionData?.getLocalPosition(this.pixiInstance.parent);

		/*if(this._initialPosition == undefined){
			this._initialPosition = this._positionBeforeDrag;
		}*/

		if (this._keepPointerOffset && targetPosition != undefined){
			this.pointerOffset?.set(this.pixiInstance.position.x - targetPosition.x, this.pixiInstance.position.y - targetPosition.y);
		}

		this._touched = true;
		this._dragging = false;
	}

	dragMove() {
		let targetPosition = this.interactionData?.getLocalPosition(this.pixiInstance.parent);
		if (this._touched && targetPosition != undefined){
			targetPosition.x += this.pointerOffset.x;
			targetPosition.y += this.pointerOffset.y;
			if(this._dragging){
				Movements.moveToPositionWithBoundaries(this.pixiInstance, targetPosition, new PIXI.Point(0,0), AppManager.bounds);

			}else{
				if(MathUtils.distanceBetweenPoints(this._positionBeforeDrag, targetPosition) > this.minimumMove){
					this._dragging = true;
				}
			}
		}
	}

	dragEnd(){
		if(this._touched /*&& this._dragging*/){
			this.resetOnRelease();
		}
	}

	resetOnRelease(){
		this._touched = false;
		this._dragging = false;
	}
}

export default DraggableObject;