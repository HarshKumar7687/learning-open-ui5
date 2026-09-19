import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace ems_crud
 */
export default class Component extends UIComponent {
    public static metadata = {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json"
    };

    public init(): void {
        super.init();

        const oModel = new JSONModel();
        oModel.loadData("model/mockdata.json");
        this.setModel(oModel);

        this.getRouter().initialize();
    }
}