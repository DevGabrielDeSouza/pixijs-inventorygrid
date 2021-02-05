import * as PIXI from "pixi.js";
import RoundedRectangleRenderer from "./RoundedRectangleRenderer";

class SlotRenderer extends RoundedRectangleRenderer { 
	constructor(x: number, y: number, size: number, radius: number, parentContainer?: PIXI.Container, graphicsContainer?: PIXI.Graphics){
		super(x, y, size, size, 0xFFFFFF, radius, parentContainer, graphicsContainer);
	}
}

export default SlotRenderer;