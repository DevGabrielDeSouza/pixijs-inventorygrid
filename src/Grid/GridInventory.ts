import * as PIXI from "pixi.js";
import InteractableObject from "../Interactions/InteractableObject";
import GridContainer from "./GridContainer";

class GridInventory extends GridContainer {
	private interactionData?: PIXI.InteractionData;

	interactions: InteractableObject;
	pointerInside: boolean;

	constructor(x: number, y: number, gridWidth: number, gridHeight: number, slotSize: number, padding: number){
		super(x, y, gridWidth, gridHeight, slotSize, padding, 10);
		this.interactions = new InteractableObject(this.pixiInstance);
		this.pointerInside = false;

		this.interactions.movePointerEvent.addListener(this.pointerMove, this);
		this.interactions.overPointerEvent.addListener(this.pointerOver, this);
		this.interactions.outPointerEvent.addListener(this.pointerOut, this);
		
		this.setSlotsStatus(-1, true);
		this.centerPivots();
	}

	debug(){
		let output = "";
		for(let i = 0; i < this.slotsStatus.length; i++){
			for (let j = 0; j < this.slotsStatus[i].length; j++) {
				let num = this.slotsStatus[i][j];
				let numText;
				if(num >= 0){
					numText = "+"+ num;
				}else{
					numText = ""+num;
				}
				output += "[" + numText + "]  ";
			}
			output += "\n";
		}
		output += "\n\n\n";
		console.log(output);
	}

	pointerMove(event: PIXI.InteractionEvent) {

		if (this.pointerInside) {
			this.interactionData = event.data;
			var targetPosition = this.interactionData.getLocalPosition(this.pixiInstance.parent);

			var points = this.globalPositionToSlotPoint(targetPosition);

			//this.slotsRenderers[points.x][points.y].pixiInstance.alpha = 0.2;
		} else {
			this.interactionData = undefined;
		}
	}

	pointerOver() {
		this.pointerInside = true;
	}

	pointerOut() {
		this.pointerInside = false;
	}
}

export default GridInventory;