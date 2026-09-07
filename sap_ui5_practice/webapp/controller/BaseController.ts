import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @name ui5.tutorial.walkthrough.controller.Base
 */
export default class BaseController extends Controller {
	public showMessage(sMessage:string):void{
		MessageToast.show(sMessage);
	}
};