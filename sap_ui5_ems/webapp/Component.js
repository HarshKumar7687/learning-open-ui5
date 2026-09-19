sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("ui5.tutorial.walkthrough.Component", {

        metadata: {
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            const oModel = new JSONModel();
            oModel.loadData("model/mockdata.json");
            this.setModel(oModel);

            this.getRouter().initialize();
        }
    });
});