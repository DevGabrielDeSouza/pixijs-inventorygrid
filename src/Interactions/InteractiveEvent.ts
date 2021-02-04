import * as PIXI from "pixi.js";
import { eventNames } from "process";
import InteractableObject from "./InteractableObject";

class EventTrigger {

	private events?: Function[];
	private pixiInstance: PIXI.Container;
	private eventName: string;
	/*private contextObject: any;*/

	constructor(
		eventName: string, 
		pixiInstance: PIXI.Container,
		/*context: InteractableObject, */
		eventsFunctions?: Function[]
	) {
		this.events = eventsFunctions;
		this.pixiInstance = pixiInstance;
		this.eventName = eventName;
		/*this.contextObject = context;*/

		this.pixiInstance.interactive = true;
	}

	public addListener(eventFunction: Function, contextObject?: any) {
		if(this.events == undefined){
			this.events = [];
		}
		this.events.push(eventFunction);
		if(contextObject != undefined){
			this.pixiInstance.on(this.eventName, this.events[this.events.length - 1], contextObject);
		} else {
			this.pixiInstance.on(this.eventName, this.events[this.events.length - 1]);
		}
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