import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";

/**
 * @name ui5.tutorial.walkthrough.controller.Base
 */
export default class BaseController extends Controller {
	public showMessage(sMessage:string):void{
		MessageToast.show(sMessage);
	}
};