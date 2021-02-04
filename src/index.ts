import * as PIXI from "pixi.js";

import AssetLoader from './Systems/AssetLoader';
import AppManager from "./Systems/AppManager";
import SpriteRenderer from "./Renderers/SpriteRenderer";
import RoundedRectangleRenderer from "./Renderers/RoundedRectangleRenderer";
import DraggableObject from "./Interactions/DraggableObject";
import GridContainer from "./Grid/GridContainer";
import GridInventory from "./Grid/GridInventory";
import GridItem from "./Grid/GridItem";

const load = (app: PIXI.Application) => {
	return new Promise<void>((resolve) => {
		app.loader.add("assets/tennis-ball.png").load(() => {
			resolve();
		});
	});
};

const main = async () => {
	// Actual app
	AppManager.initialize();

	// Load assets
	await AssetLoader.loadAllResources();

	//let sprite = new SpriteRenderer(50, 50,  "assets/tennis-ball.png");

	/*sprite.x = window.innerWidth / 2;
	sprite.y = window.innerHeight / 2;

	// Handle window resizing
	window.addEventListener("resize", (e) => {
		sprite.x = window.innerWidth / 2;
		sprite.y = window.innerHeight / 2;
	});*/

	/*let rect = new RoundedRectangleRenderer(300, 300, 200, 200, 0x650A5A, 30);
	let rect2 = new RoundedRectangleRenderer(200, 400, 100, 100, 0xF0F0F0, 100);

	let drag = new DraggableObject(rect2.pixiInstance, true, 30);
	let dragBall = new DraggableObject(sprite.pixiInstance, true, 30);*/

	let inventory = new GridInventory(window.innerWidth / 2, window.innerHeight / 2, 6, 4, 40, 10);
	let item = new GridItem(400, 550, 3, 2, 50, 0, inventory,[
		new PIXI.Point(0, 0), new PIXI.Point(1, 0), new PIXI.Point(0, 1)
	]);
	let item2 = new GridItem(600, 550, 1, 3, 50, 0, inventory,[
		new PIXI.Point(0, 0), new PIXI.Point(0, 1), new PIXI.Point(1, 1), new PIXI.Point(1, 2)
	]);
};

main();
