import * as PIXI from "pixi.js";
import DraggableObject from "../Interactions/DraggableObject";
import MathUtils from "../Utils/MathUtils";
import GridContainer from "./GridContainer";
import GridInventory from "./GridInventory";

class GridItem extends GridContainer {

	private id: number;
	private static lastId: number = 0;
	
	private gridInventory: GridInventory;
	private draggable: DraggableObject;
	constructor(
		x: number,
		y: number,
		_gridWidth: number,
		_gridHeight: number,
		slotSize: number,
		padding: number,
		gridInventory: GridInventory,
		slotPoints: PIXI.Point[]
	)
	{

		var gridWidth = 0;
		var gridHeight = 0;

		for (var i = 0; i < slotPoints.length; i++) {
			if (slotPoints[i].x + 1 > gridWidth) {
				gridWidth = slotPoints[i].x + 1;
			}
			if (slotPoints[i].y + 1 > gridHeight) {
				gridHeight = slotPoints[i].y + 1;
			}
		}

		super(x, y, gridWidth, gridHeight, slotSize, padding, 0);

		GridItem.lastId++;
		this.id = GridItem.lastId;

		this.gridInventory = gridInventory;
		this.draggable = new DraggableObject(this.pixiInstance, true, 30);

		this.draggable.downPointerEvent.addListener(this.clearOnclick, this);
		this.draggable.downPointerEvent.addListener(this.draggable.dragStart, this.draggable);
		this.draggable.movePointerEvent.addListener(this.draggable.dragMove, this.draggable);
		this.draggable.upPointerEvent.addListener(this.dragEnd, this);
		this.draggable.upOutsidePointerEvent.addListener(this.dragEnd, this);

		this.usedSlotsPoints = [];
		this.usedSlotsPoints = slotPoints;

		this.setSlotsStatus(this.id, true);
		this.centerPivots();
	}

	//#region Calculate inventory slots info 
	distanceToInventory(pointSlot: PIXI.Point, pointItem: PIXI.Point) {
		return MathUtils.pointDistance(
			this.gridInventory.slotPointToGlobalPosition(pointSlot),
			this.slotPointToGlobalPosition(pointItem)
		);
	}

	slotPosUnderPoint(pointItem: PIXI.Point) {
		//console.log(this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(pointItem)));
		return this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(pointItem));
	}
	//#endregion

	//#region Validate drag release 
	validatePosition() {
		for (var i = 0; i < this.usedSlotsPoints.length; i++) {
			var currentPoint = this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(this.usedSlotsPoints[i]));

			if (currentPoint.x < 0 ||
				currentPoint.x >= this.gridInventory.gridWidth ||
				currentPoint.y < 0 ||
				currentPoint.y >= this.gridInventory.gridHeight
			) {
				return false;
			}
		}
		return true;
	}

	validateSlots(checkStatus: boolean) {
		for (var i = 0; i < this.usedSlotsPoints.length; i++) {
			var currentPoint = this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(this.usedSlotsPoints[i]));

			//console.log(currentPoint);

			if (currentPoint.x < 0 ||
				currentPoint.x >= this.gridInventory.gridWidth ||
				currentPoint.y < 0 ||
				currentPoint.y >= this.gridInventory.gridHeight
			) {
				return false;
			} else if (checkStatus && this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y] != -1) {
				return false;
			}
		}

		return true;
	}
	//#endregion

	//#region Set coordinates values in inventory array 
	setInventorySlots(status: number) {
		for (var i = 0; i < this.usedSlotsPoints.length; i++) {
			var currentPoint = this.usedSlotsPoints[i];

			var currentInventoryPoint = this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(currentPoint));

			//console.log(currentInventoryPoint);

			if (currentInventoryPoint.x >= 0 &&
				currentInventoryPoint.x < this.gridInventory.gridWidth &&
				currentInventoryPoint.y >= 0 &&
				currentInventoryPoint.y < this.gridInventory.gridHeight
			) {
				let currentInventoryState = this.gridInventory.slotsStatus[currentInventoryPoint.x][currentInventoryPoint.y];
				if(currentInventoryState == -1 || currentInventoryState == this.id){
					this.gridInventory.slotsStatus[currentInventoryPoint.x][currentInventoryPoint.y] = status;
				}

			}
		}
	}

	moveToInventory() { 
		var distance = this.distanceToInventory(this.slotPosUnderPoint(new PIXI.Point(0, 0)), new PIXI.Point(0, 0));
		this.position.x += distance.x;
		this.position.y += distance.y;
	}
	//#endregion

	//#region Interactions 
	clearOnclick() {
		if (this.validateSlots(false)) {
			this.setInventorySlots(-1);
		}
	}

	dragEnd() {
		if (this.draggable.dragging) {
			if (this.validateSlots(true)) {
				this.moveToInventory();
				//this.draggable.positionBeforeDrag = this.position;
				this.setInventorySlots(this.id);
				
				this.draggable.positionBeforeDrag.set(this.pixiInstance.position.x, this.pixiInstance.position.y);
			} else {
				if(!MathUtils.aabbCollision(this.pixiInstance, this.gridInventory.pixiInstance)){
					this.draggable.positionBeforeDrag.set(this.pixiInstance.position.x, this.pixiInstance.position.y);
					//this.pixiInstance.visible = false;
				}else{
					this.position = this.draggable.positionBeforeDrag;
					if (this.validateSlots(true)) {
						this.setInventorySlots(this.id);
					}
				}
			}
		}

		this.draggable.resetOnRelease();
		//this.gridInventory.debug();
	}
	//#endregion
}
export default GridItem;