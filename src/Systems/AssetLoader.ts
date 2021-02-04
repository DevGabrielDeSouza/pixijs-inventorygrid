//import { Dirent, readdir, readdirSync } from "fs";
import * as PIXI from "pixi.js";
import AppManager from './AppManager';

//import fs from "fs";

//const fs = require('fs');
//const testFolder = 'assets/';
const spritesNames = ["tennis-ball"];

class AssetLoader extends AppManager{
	testPath = 'assets/';

	private constructor() {
		super();
	}

	public static loadSprite(path: string) {
		return new Promise<void>((resolve) => {
			AppManager.loadSingleSprite("assets/" + path + ".png").load(() => {
				resolve();
			});
		});
	}

	public static async loadAllSprites() {
		let loadingPromise: Promise<void>[] = [];

		spritesNames.forEach(async spriteName => {
			loadingPromise.push(AssetLoader.loadSprite(spriteName));
		});

		return await Promise.all(loadingPromise);
	}

	public static async loadAllResources() {
		await AssetLoader.loadAllSprites();
	}

	public static getResource(path: string) {
		return AppManager.getResource(path);
	}
}

export default AssetLoader;