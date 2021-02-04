import * as PIXI from "pixi.js";

import AppManager from "../Systems/AppManager";
import AssetLoader from "../Systems/AssetLoader";
import PixiRenderer from "./PixiRenderer";

class SpriteRenderer extends PixiRenderer{
	sprite: PIXI.Sprite;

	constructor(x: number, y: number, texturePath: string, parentContainer?: PIXI.Container) {
		let sprite = new PIXI.Sprite(SpriteRenderer.getLoadedTexture(texturePath));
		super(x, y, sprite, parentContainer);
		this.sprite = sprite;
	}

	private static getLoadedTexture(texturePath: string): PIXI.Texture {
		return AssetLoader.getResource(texturePath).texture;
	}
}

export default SpriteRenderer;