import * as PIXI from "pixi.js";

import AssetLoader from './Systems/AssetLoader';
import AppManager from "./Systems/AppManager";
import SpriteRenderer from "./Renderers/SpriteRenderer";
import RoundedRectangleRenderer from "./Renderers/RoundedRectangleRenderer";
import DragableObject from "./Interactions/DragableObject";

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

	let sprite = new SpriteRenderer(50, 50,  "assets/tennis-ball.png");

	/*sprite.x = window.innerWidth / 2;
	sprite.y = window.innerHeight / 2;

	// Handle window resizing
	window.addEventListener("resize", (e) => {
		sprite.x = window.innerWidth / 2;
		sprite.y = window.innerHeight / 2;
	});*/

	let rect = new RoundedRectangleRenderer(300, 300, 200, 200, 0x650A5A, 30);
	let rect2 = new RoundedRectangleRenderer(200, 400, 100, 100, 0xF0F0F0, 100);

	let drag = new DragableObject(rect2.pixiInstance, true, 30);
	let dragBall = new DragableObject(sprite.pixiInstance, true, 30);
};

main();
