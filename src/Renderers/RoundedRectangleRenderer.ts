import * as PIXI from "pixi.js";
import AppManager from "../Systems/AppManager";
import GraphicsRenderer from "./GraphicsRenderer";

class RoundedRectangleRenderer extends GraphicsRenderer{

	radiusDraw: number;

	constructor(	
		x: number,
		y: number,
		width: number,
		height: number,
		color: number,
		radius: number,
		parentContainer?: PIXI.Container, 
		graphicsContainer?: PIXI.Graphics
	) {
		super(x, y, width, height, color, parentContainer, graphicsContainer);
		this.radiusDraw = radius;
		this.draw();
	}

	drawSteps() {
		this.graphics.drawRoundedRect(0, 0, this.widthDraw, this.heightDraw, this.radiusDraw);
	}
}

export default RoundedRectangleRenderer;