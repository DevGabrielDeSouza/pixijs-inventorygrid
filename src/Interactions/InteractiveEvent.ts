import * as PIXI from "pixi.js";
import { eventNames } from "process";
import InteractableObject from "./InteractableObject";

class EventTrigger {

	private events?: Function[];
	private pixiInstance: PIXI.Container;
	private eventName: string;
	private interactableObject: InteractableObject;

	constructor(
		eventName: string, 
		pixiInstance: PIXI.Container,
		interactable: InteractableObject, 
		eventsFunctions?: Function[]
	) {
		this.events = eventsFunctions;
		this.pixiInstance = pixiInstance;
		this.eventName = eventName;
		this.interactableObject = interactable;

		this.pixiInstance.interactive = true;
	}

	/*private addAllListeners(){
		if (this.events != undefined) {
			for (let i = 0; i < this.events.length; i++) {
				this.pixiInstance.on(this.eventName, this.events[i], this.interactableObject);
			}
		}
	}*/

	public addListener(eventFunction: Function) {
		if(this.events == undefined){
			this.events = [];
		}
		this.events.push(eventFunction);
		this.pixiInstance.on(this.eventName, this.events[this.events.length - 1], this.interactableObject);
	}

	public removeAllListeners(){
		if (this.events != undefined) {
			for (let i = 0; i < this.events.length; i++) {
				this.pixiInstance.off(this.eventName, this.events[i]);
			}
			this.events = [];
			this.events = undefined;
		}
	}
}

export default EventTrigger;