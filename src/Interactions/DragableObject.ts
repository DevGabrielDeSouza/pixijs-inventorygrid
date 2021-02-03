import * as PIXI from "pixi.js";
import AppManager from "../Systems/AppManager";
import Movements from "../Systems/Movements";
import MathUtils from "../Utils/MathUtils";
import InteractableObject from "./InteractableObject";

class DragableObject extends InteractableObject {

	private interactionData?: PIXI.InteractionData;

	private positionBeforeDrag: PIXI.Point;
	private initialPosition: PIXI.Point;
	private pointerOffset: PIXI.Point = new PIXI.Point(0,0);

	private minimumMove: number = 0;

	private touched: boolean = false;
	private dragging: boolean = false;

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
		this.downPointerEvent.addListener(this.dragStart);
		this.movePointerEvent.addListener(this.dragMove);
		this.upPointerEvent.addListener(this.dragEnd);
		this.upOutsidePointerEvent.addListener(this.dragEnd);

		this.initialPosition = this.positionBeforeDrag = this.pixiInstance.position;

		if(minimumMove != undefined){
			this.minimumMove = minimumMove;
		}
	}

	dragStart(event: any){
		this.interactionData = event.data;
		this.positionBeforeDrag = this.pixiInstance.position;

		let targetPosition = this.interactionData?.getLocalPosition(this.pixiInstance.parent);

		if(this.initialPosition == undefined){
			this.initialPosition = this.positionBeforeDrag;
		}

		if (this._keepPointerOffset && targetPosition != undefined){
			this.pointerOffset?.set(this.pixiInstance.position.x - targetPosition.x, this.pixiInstance.position.y - targetPosition.y);
		}

		this.touched = true;
		this.dragging = false;
	}

	dragMove() {
		let targetPosition = this.interactionData?.getLocalPosition(this.pixiInstance.parent);
		if (this.touched && targetPosition != undefined){
			targetPosition.x += this.pointerOffset.x;
			targetPosition.y += this.pointerOffset.y;
			if(this.dragging){
				Movements.moveToPositionWithBoundaries(this.pixiInstance, targetPosition, new PIXI.Point(0,0), AppManager.bounds);

			}else{
				if(MathUtils.distanceBetweenPoints(this.positionBeforeDrag, targetPosition) > this.minimumMove){
					this.dragging = true;
				}
			}
		}
	}

	dragEnd(){
		if(this.touched /*&& this.dragging*/){
			this.touched = false;
			this.dragging = false;
		}
	}
}

export default DragableObject;