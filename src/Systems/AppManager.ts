import * as PIXI from "pixi.js";

class AppManager {

	private static app: PIXI.Application;

	private static graphics: PIXI.Graphics;

	private static get stage(): PIXI.Container {
		return AppManager.app.stage;
	}

	public static get bounds(): PIXI.Point{
		return new PIXI.Point(AppManager.app.screen.width, AppManager.app.screen.height);
	}

	protected constructor() { }

	public static initialize() {
		AppManager.app = new PIXI.Application({
			// View size = windows
			width: window.innerWidth,
			height: window.innerHeight,

			backgroundColor: 0x2c3e50,
			antialias: true,
		});
		AppManager.app.renderer.view.style.position = "absolute";
		AppManager.app.renderer.view.style.display = "block";

		// Display application properly
		document.body.style.margin = "0";

		// Handle window resizing
		window.addEventListener("resize", (e) => {
			AppManager.app.renderer.resize(window.innerWidth, window.innerHeight);
		});

		document.body.appendChild(AppManager.app.view);
	}

	protected static loadSingleSprite(path: string) {
		return AppManager.app.loader.add(path);
	}

	public static addStageChild(child: PIXI.DisplayObject) {
		AppManager.stage.addChild(child);
	}

	protected static getResource(path: string) {
		return AppManager.app.loader.resources[path];
	}
}

export default AppManager;