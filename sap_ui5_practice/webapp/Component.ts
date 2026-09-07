import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ui5.tutorial.walkthrough
 */
export default class Component extends UIComponent {
	public static metadata = {
		"interfaces": ["sap.ui.core.IAsyncContentCreation"],
		"manifest": "json" 
	};
	init(): void {
		// call the init function of the parent
		super.init();
		
		// set data model
		const oNamedData = {
			named:{
				name: "Harsh",
				marks: 98,
				age: 21
			}
		}
		const oNamedDataModel = new JSONModel(oNamedData);
		this.setModel(oNamedDataModel , "Named");
		const oUnNamedData = {
			recipient: {
				name: "World"
			},
			unnamed:{
				name: "Cheetah",
				marks : 96,
				age: 17
			}
		}
		const oUnNamedDataModel = new JSONModel(oUnNamedData);
		this.setModel(oUnNamedDataModel);
	};
};
