import * as PIXI from "pixi.js";

class MathUtils {
	static distanceBetweenPoints(pointA: PIXI.Point, pointB: PIXI.Point): number {

		var xDistance = pointA.x - pointB.x;
		var yDistance = pointA.y - pointB.y;

		return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
	}

	static pointDistance(pointA: PIXI.Point, pointB: PIXI.Point): PIXI.Point {

		var xDistance = pointA.x - pointB.x;
		var yDistance = pointA.y - pointB.y;

		return new PIXI.Point(xDistance, yDistance);
	}

	static aabbCollision(rect1: PIXI.Container, rect2: PIXI.Container){
		return (rect1.x - rect1.width/2 < rect2.x + rect2.width/2 &&
			rect1.x + rect1.width / 2 > rect2.x - rect2.width / 2  &&
			rect1.y - rect1.height / 2 < rect2.y + rect2.height/2 &&
			rect1.y + rect1.height / 2  > rect2.y - rect2.height / 2 )
	}

}

export default MathUtils;