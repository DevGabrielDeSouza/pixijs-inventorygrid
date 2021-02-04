import * as PIXI from "pixi.js";
import PixiRenderer from "../Renderers/PixiRenderer";
import SlotRenderer from "../Renderers/SlotRenderer";

class GridContainer extends PixiRenderer{
	private _gridWidth: number;
	public get gridWidth(): number {
		return this._gridWidth;
	}
	private _gridHeight: number;
	public get gridHeight(): number {
		return this._gridHeight;
	}
	protected slotSize: number;
	protected padding: number;
	private slotRadius: number;

	private _slotsStatus: number[][];
	public get slotsStatus(): number[][] {
		return this._slotsStatus;
	}
	private _slotsRenderers: SlotRenderer[][];
	public get slotsRenderers(): SlotRenderer[][] {
		return this._slotsRenderers;
	}

	protected graphicsContainer: PIXI.Graphics;

	protected usedSlotsPoints: PIXI.Point[];

	constructor(x: number, y: number, gridWidth: number, gridHeight: number, slotSize: number, padding: number, slotRadius: number){
		super(0,0, new PIXI.Container);

		this._gridWidth = gridWidth;
		this._gridHeight = gridHeight;
		this.slotSize = slotSize;
		this.padding = padding;
		this.slotRadius = slotRadius;

		this._slotsStatus = [];
		this.usedSlotsPoints = [];
		this._slotsRenderers = [];

		this.graphicsContainer = new PIXI.Graphics;

		this.initializeSlots();
		this.centerPivots();

		this.pixiInstance.x = x;
		this.pixiInstance.y = y;
	}

	initializeSlots(){
		for (let i = 0; i < this.gridWidth; i++) {
			this._slotsRenderers[i] = [];
			this._slotsStatus[i] = [];
			for (let j = 0; j < this.gridHeight; j++) {
				this.usedSlotsPoints.push(new PIXI.Point(i, j));
				this._slotsRenderers[i][j] = new SlotRenderer(
					i * (this.slotSize + this.padding) + this.slotSize / 2,
					j * (this.slotSize + this.padding) + this.slotSize / 2,
					this.slotSize,
					this.slotRadius,
					this.pixiInstance
				);
				this._slotsRenderers[i][j].visible = false;
				this._slotsStatus[i][j] = -1;
			}
		}
	}

	setColor(tintColor: number){
		for (let i = 0; i < this.gridWidth; i++) {
			for (let j = 0; j < this.gridHeight; j++) {
				this._slotsRenderers[i][j].setColor(tintColor);
			}
		}
	}

	getSizeBounds() {
		return new PIXI.Point(this.gridWidth * (this.slotSize + this.padding) - this.padding,
			this.gridHeight * (this.slotSize + this.padding) - this.padding);
	}

	slotPointToGlobalPosition(slotPoint: PIXI.Point) {
		return new PIXI.Point(
			slotPoint.x * (this.slotSize + + this.padding) + this.slotSize / 2 + this.pixiInstance.position.x - this.pixiInstance.width / 2,
			slotPoint.y * (this.slotSize + this.padding) + this.slotSize / 2 + this.pixiInstance.position.y - this.pixiInstance.height / 2,
		);
	}

	globalPositionToSlotPoint(globalPosition: PIXI.Point) {
		return new PIXI.Point(
			Math.floor(((globalPosition.x - this.pixiInstance.position.x + this.pixiInstance.width / 2)) / (this.slotSize + this.padding)),
			Math.floor(((globalPosition.y - this.pixiInstance.position.y + this.pixiInstance.height / 2)) / (this.slotSize + this.padding))
		);
	}

	setSlotsStatus(slotStatus: number, slotVisible: boolean) {

		for (var i = 0; i < this.usedSlotsPoints.length; i++) {
			this._slotsStatus[this.usedSlotsPoints[i].x][this.usedSlotsPoints[i].y] = slotStatus;

			this.slotsRenderers[this.usedSlotsPoints[i].x][this.usedSlotsPoints[i].y].visible = slotVisible;
		}
	}
}

export default GridContainer;