import * as PIXI from "pixi.js";
import DraggableObject from "../Interactions/DraggableObject";
import SpriteRenderer from "../Renderers/SpriteRenderer";
import AppManager from "../Systems/AppManager";
import MathUtils from "../Utils/MathUtils";
import GridContainer from "./GridContainer";
import GridInventory from "./GridInventory";

class GridItem extends GridContainer {

	private id: number;
	private static lastId: number = -1;

	private static allItems: GridItem[] = [];
	private lastItemsInPlace: GridItem[];

	private sprite: SpriteRenderer;
	
	private gridInventory: GridInventory;
	private draggable: DraggableObject;

	private spritePath: string;

	private isbutton: boolean;
	private inLimbo: boolean;

	private limboPosition: PIXI.Point;

	private container: PIXI.Container;

	constructor(
		x: number,
		y: number,
		_gridWidth: number,
		_gridHeight: number,
		slotSize: number,
		padding: number,
		gridInventory: GridInventory,
		spritePath: string,
		slotPoints: PIXI.Point[]
	)
	{
		//#region Grid initialization 
		
		
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
		//#endregion

		//#region Properties initialization
		GridItem.lastId++;
		this.id = GridItem.lastId;

		this.limboPosition = new PIXI.Point(100, 100);

		this.slotSize = slotSize;
		this.padding = padding;
		this.spritePath = spritePath;

		this.isbutton = true;

		this.inLimbo = false;

		this.gridInventory = gridInventory;

		this.usedSlotsPoints = [];
		this.usedSlotsPoints = slotPoints;

		this.lastItemsInPlace = [];

		this.setSlotsStatus(this.id, true);
		this.centerPivots();

		this.container = new PIXI.Container;
		this.container.width = this.pixiInstance.width;
		this.container.height = this.pixiInstance.height;
		this.container.pivot.x = this.container.width / 2;
		this.container.pivot.y = this.container.height / 2;
		this.container.position.set(this.pixiInstance.position.x, this.pixiInstance.position.y);
		//#endregion

		//#region Settings for sprite rendering 
		
		AppManager.addStageChild(this.container);

		this.pixiInstance.setParent(this.container);
		this.pixiInstance.position.set(0,0);

		this.sprite = new SpriteRenderer(0, 0, spritePath);
		this.sprite.width = this.container.width;
		this.sprite.height = this.container.height;
		this.sprite.pixiInstance.position.set(0, 0);
		this.sprite.pixiInstance.setParent(this.container);
		this.sprite.pixiInstance.interactive = false;
		//#endregion


		//#region Interactive settings and initialization 
		this.draggable = new DraggableObject(this.pixiInstance, this.container, true, 30);

		this.draggable.movePointerEvent.addListener(this.duplicate, this);
		this.draggable.downPointerEvent.addListener(this.clearOnclick, this);
		this.draggable.downPointerEvent.addListener(this.draggable.dragStart, this.draggable);
		this.draggable.movePointerEvent.addListener(this.draggable.dragMove, this.draggable);
		this.draggable.movePointerEvent.addListener(this.validateSlotsFeedback, this);
		this.draggable.upPointerEvent.addListener(this.dragEnd, this);
		this.draggable.upOutsidePointerEvent.addListener(this.dragEnd, this);
		//#endregion

		GridItem.allItems.push(this);

		//this.rotate();
	}

	//#region Automatic movements 
	duplicate(){
		if(this.isbutton  && this.draggable.dragging/*&& this.allowbutton*/){
			let copy = new GridItem(this.container.x, this.container.y, this.gridWidth, this.gridHeight, this.slotSize, this.padding, this.gridInventory, this.spritePath, this.usedSlotsPoints);
			this.isbutton = false;
		}
	}

	goToLimbo() {
		this.setInventorySlots(-1);
		this.container.position = this.limboPosition;
		this.inLimbo = true;
		this.setColor(0xffffff);
	}

	destroy(){
		this.container.visible = false;
		this.setInventorySlots(-1);
	}

	/*rotate(){
		for(let i = 0; i < this.usedSlotsPoints.length; i++){
			let x = this.usedSlotsPoints[i].x;
			let y = this.usedSlotsPoints[i].y;

			this.usedSlotsPoints[i].set(y, -x);

		}

		for (var i = 0; i < this.usedSlotsPoints.length; i++) {
			if (this.usedSlotsPoints[i].x + 1 > this.gridWidth) {
				this._gridWidth = this.usedSlotsPoints[i].x + 1;
			}
			if (this.usedSlotsPoints[i].y + 1 > this.gridHeight) {
				this._gridHeight = this.usedSlotsPoints[i].y + 1;
			}
		}

		this.resetSlots();

		this.setSlotsStatus(this.id, true);
	}*/
	//#endregion

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

	setColorInAll(items: GridItem[], color: number){
		for(let i = 0; i < items.length; i++){
			items[i].setColor(color);
		}
	}

	validateSlotsFeedback() {
		this.setColorInAll(this.lastItemsInPlace, 0xffffff);
		if(this.draggable.dragging){
			let itemsInPlace: GridItem[] = [];

			for (var i = 0; i < this.usedSlotsPoints.length; i++) {
				var currentPoint = this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(this.usedSlotsPoints[i]));

				//console.log(currentPoint);

				//let currentInventoryStatus = this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y];

				if (currentPoint.x < 0 ||
					currentPoint.x >= this.gridInventory.gridWidth ||
					currentPoint.y < 0 ||
					currentPoint.y >= this.gridInventory.gridHeight
				) {
					this.setColor(0xffffff);

					this.lastItemsInPlace = itemsInPlace;

					return null;
				} else if (this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y] > -1) {
					let currentItemInPlace = GridItem.allItems[this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y]];
					if (!itemsInPlace.includes(currentItemInPlace)) {
						itemsInPlace.push(currentItemInPlace);
					}
				}
			}

			if (itemsInPlace.length > 1) {
				this.setColor(0xff0000);
				this.setColorInAll(itemsInPlace, 0xff0000);

				this.lastItemsInPlace = itemsInPlace;

				return null;
			} else if (itemsInPlace.length == 1) {
				this.setColor(0xffff00);
				this.setColorInAll(itemsInPlace, 0xffff00);

				this.lastItemsInPlace = itemsInPlace;

				return null;
			}
			this.setColor(0x00ff00);
		}
	}

	validateSlots(checkStatus: boolean) {

		let itemsInPlace: GridItem[] = [];

		for (var i = 0; i < this.usedSlotsPoints.length; i++) {
			var currentPoint = this.gridInventory.globalPositionToSlotPoint(this.slotPointToGlobalPosition(this.usedSlotsPoints[i]));

			//console.log(currentPoint);

			//let currentInventoryStatus = this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y];

			if (currentPoint.x < 0 ||
				currentPoint.x >= this.gridInventory.gridWidth ||
				currentPoint.y < 0 ||
				currentPoint.y >= this.gridInventory.gridHeight
			) {
				return false;
			} else if (checkStatus && this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y] > -1) {
				let currentItemInPlace = GridItem.allItems[this.gridInventory.slotsStatus[currentPoint.x][currentPoint.y]];
				if (!itemsInPlace.includes(currentItemInPlace)){
					itemsInPlace.push(currentItemInPlace);
				}
			}
		}

		if (itemsInPlace.length > 1){
			return false;
		} else if (itemsInPlace.length == 1){
			//itemsInPlace[0].destroy();
			itemsInPlace[0].goToLimbo();

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
		this.container.position.x += distance.x;
		this.container.position.y += distance.y;
	}
	//#endregion

	//#region Custom specifics interactions 
	clearOnclick() {
		if (this.validateSlots(false)) {
			this.setInventorySlots(-1);
		}
	}

	dragEnd() {
		if (this.draggable.dragging) {
			this.setColorInAll(this.lastItemsInPlace, 0xffffff);
			this.lastItemsInPlace = [];
			if (this.validateSlots(true)) {
				this.moveToInventory();
				//this.draggable.positionBeforeDrag = this.position;
				this.setInventorySlots(this.id);
				
				this.draggable.positionBeforeDrag.set(this.container.position.x, this.container.position.y);
				this.inLimbo = false;
				this.setColor(0xffffff);
			} else {
				//this.draggable.positionBeforeDrag.set(this.container.position.x, this.container.position.y);
				if (!this.inLimbo) {
					if (MathUtils.aabbCollision(this.container, this.gridInventory.pixiInstance)) {
						this.goToLimbo();
						this.setColor(0xffffff);
					}else{
						this.destroy();
						this.setColor(0xffffff);
					}
				} else if (MathUtils.aabbCollision(this.container, this.gridInventory.pixiInstance)){
					this.container.position = this.draggable.positionBeforeDrag;
					this.setColor(0xffffff);
				}
				/*if(!MathUtils.aabbCollision(this.container, this.gridInventory.pixiInstance)){
					this.draggable.positionBeforeDrag.set(this.container.position.x, this.container.position.y);
					this.container.visible = false;
					console.log("sumiu");
				}else{
					this.container.position = this.draggable.positionBeforeDrag;
					if (this.validateSlots(true)) {
						this.setInventorySlots(this.id);
					}
				}*/
			}
		}else{
			this.setInventorySlots(this.id);
		}
		this.draggable.resetOnRelease();

		//this.gridInventory.debug();
	}
	//#endregion

	//#region Adapted grid math 
	slotPointToGlobalPosition(slotPoint: PIXI.Point) {
		
		return new PIXI.Point(
			slotPoint.x * (this.slotSize + + this.padding) + this.slotSize / 2 + this.container.position.x - this.container.width / 2,
			slotPoint.y * (this.slotSize + this.padding) + this.slotSize / 2 + this.container.position.y - this.container.height / 2,
		);
	}

	globalPositionToSlotPoint(globalPosition: PIXI.Point) {
		return new PIXI.Point(
			Math.floor(((globalPosition.x - this.container.position.x + this.container.width / 2)) / (this.slotSize + this.padding)),
			Math.floor(((globalPosition.y - this.container.position.y + this.container.height / 2)) / (this.slotSize + this.padding))
		);
	}
	//#endregion
}
export default GridItem;