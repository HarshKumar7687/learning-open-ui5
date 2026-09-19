import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
/**
 * @namespace ems_crud.controller
 */
export default class BaseController extends Controller {

    public getRouter() {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }

    public onNavBack(): void {
        this.getRouter().navTo("list");
    }
}