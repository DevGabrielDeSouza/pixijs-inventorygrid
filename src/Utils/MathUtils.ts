import * as PIXI from "pixi.js";

class MathUtils {
	static distanceBetweenPoints(pointA: PIXI.Point, pointB: PIXI.Point) {

		var xDistance = pointA.x - pointB.x;
		var yDistance = pointA.y - pointB.y;

		return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
	}

	static pointDistance(pointA: PIXI.Point, pointB: PIXI.Point) {

		var xDistance = pointA.x - pointB.x;
		var yDistance = pointA.y - pointB.y;

		return new PIXI.Point(xDistance, yDistance);
	}

}

export default MathUtils;