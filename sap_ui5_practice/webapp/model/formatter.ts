import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default {
	statusText: function (this: Controller, status: string): string | undefined {
		const resourceBundle = (this?.getOwnerComponent()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		switch (status) {
			case "A":
				return resourceBundle.getText("invoiceStatusA");
			case "B":
				return resourceBundle.getText("invoiceStatusB");
			case "C":
				return resourceBundle.getText("invoiceStatusC");
			default:
				return status;
		}
	},
	statusIcon: function (status: string): string {
		switch (status) {
			case "A":
				return "sap-icon://add-document"; // Icon for 'New'
			case "B":
				return "sap-icon://in-progress";    // Icon for 'In Progress'
			case "C":
				return "sap-icon://accept";        // Icon for 'Done'
			default:
				return "";
		}
	}
};