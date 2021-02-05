import * as PIXI from "pixi.js";
import AppManager from "../Systems/AppManager";

abstract class PixiRenderer {

	private _pixiInstance: PIXI.Container;
	public get pixiInstance(): PIXI.Container {
		return this._pixiInstance;
	}



	public get visible(): boolean {
		return this.pixiInstance.visible;
	}
	public set visible(value: boolean) {
		this.pixiInstance.visible = value;
	}

	constructor(x: number, y: number, pixiInstance: PIXI.Container, parentContainer?: PIXI.Container){
		this._pixiInstance = pixiInstance;
		this.pixiInstance.x = x;
		this.pixiInstance.y = y;
		
		this.centerPivots();

		if(parentContainer != undefined){
			parentContainer.addChild(this.pixiInstance);
		}else{
			AppManager.addStageChild(this.pixiInstance);
		}
	}

	protected centerPivots() {
		this.pixiInstance.pivot.x = this.width / 2;
		this.pixiInstance.pivot.y = this.height / 2;
	}

	public get x(): number {
		return this.pixiInstance.x;
	}
	public set x(value: number) {
		this.pixiInstance.x = value;
	}


	public get y(): number {
		return this.pixiInstance.y;
	}
	public set y(value: number) {
		this.pixiInstance.y = value;
	}


	public get position(): PIXI.ObservablePoint {
		return this.pixiInstance.position;
	}
	public set position(value: PIXI.ObservablePoint) {
		this.pixiInstance.position = value;
	}

	public get width(): number {
		return this.pixiInstance.width;
	}
	public set width(value: number) {
		this.pixiInstance.width = value;
	}

	
	get height(): number {
		return this.pixiInstance.height;
	}
	set height(value: number) {
		this.pixiInstance.height = value;
	}
}

export default PixiRenderer;