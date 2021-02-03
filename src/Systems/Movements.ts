import * as PIXI from "pixi.js";

class Movements {
	static moveToPosition(pixiInstance: PIXI.Container, target: PIXI.Point) {
		pixiInstance.position = target;
	}

	static moveToPositionWithBoundaries(pixiInstance: PIXI.Container, target: PIXI.Point, startBound: PIXI.Point, endBound: PIXI.Point) {
		if (target.x + pixiInstance.width / 2 > endBound.x) {
			pixiInstance.position.x = endBound.x - pixiInstance.width / 2;
		} else if (target.x - pixiInstance.width / 2 < startBound.x) {
			pixiInstance.position.x = pixiInstance.width / 2;
		} else {
			pixiInstance.position.x = target.x;
		}

		if (target.y + pixiInstance.height / 2 > endBound.y) {
			pixiInstance.position.y = endBound.y - pixiInstance.height / 2;
		} else if (target.y - pixiInstance.height / 2 < startBound.y) {
			pixiInstance.position.y = pixiInstance.height / 2;
		} else {
			pixiInstance.position.y = target.y;
		}
	}
}

export default Movements;
