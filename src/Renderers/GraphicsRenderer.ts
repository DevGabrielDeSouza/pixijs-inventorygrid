import * as PIXI from "pixi.js";
import PixiRenderer from "./PixiRenderer";

class GraphicsRenderer extends PixiRenderer{
	protected graphics: PIXI.Graphics;
	
	protected drawColor: number;

	private _widthDraw: number;
	private _heightDraw: number;

	public get widthDraw(): number {
		return this._widthDraw;
	}
	/*public set widthDraw(value: number | undefined) {
		this._widthDraw = value;
	}*/

	public get heightDraw(): number {
		return this._heightDraw;
	}
	/*public set heightDraw(value: number | undefined) {
		this._heightDraw = value;
	}*/
	
	constructor(x: number, y: number, drawWidth: number, drawHeight: number, color: number, parentContainer?: PIXI.Container, graphicsContainer?: PIXI.Graphics){
		
		
		if (graphicsContainer != undefined) {
			super(x, y, graphicsContainer, parentContainer);
			this.graphics = graphicsContainer;
		} else {
			let graphics = new PIXI.Graphics;
			super(x, y, graphics, parentContainer);
			this.graphics = graphics;
		}

		this._widthDraw = drawWidth;
		this._heightDraw = drawHeight;
			
		this.drawColor = color;
	}

	setColor(tintColor: number){
		this.graphics.tint = tintColor;
	}

	//#region Drawning methods 
	protected draw() {
		this.beginDraw();
		this.drawSteps();
		this.endDraw();
		this.centerPivots();
	}

	protected beginDraw() {
		this.graphics.beginFill(this.drawColor);
	}

	protected drawSteps() { }

	protected endDraw() {
		this.graphics.endFill();
	}
	//#endregion
}

export default GraphicsRenderer;