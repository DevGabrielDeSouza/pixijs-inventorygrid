import * as PIXI from "pixi.js";
import RoundedRectangleRenderer from "./RoundedRectangleRenderer";

class SlotRenderer extends RoundedRectangleRenderer { 
	constructor(x: number, y: number, size: number, radius: number, parentContainer?: PIXI.Container){
		super(x, y, size, size, 0xFFFFFF, radius, parentContainer);
	}
}

export default SlotRenderer;