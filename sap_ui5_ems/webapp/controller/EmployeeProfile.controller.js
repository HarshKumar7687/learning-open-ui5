sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../model/formatter"
], function (
    BaseController,
    JSONModel,
    MessageBox,
    MessageToast,
    formatter
) {
    "use strict";

    return BaseController.extend("ems.controller.EmployeeProfile", {

        formatter: formatter,

        onInit: function () {
            this.getRouter()
                .getRoute("profile")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {

            var sEmployeeId = oEvent
                .getParameter("arguments")
                .employeeId;

            var oModel = this.getOwnerComponent().getModel();

            var aEmployees = oModel.getProperty("/Employees") || [];

            // Convert both values to String so 1 and "1" also match
            var oEmployee = aEmployees.find(function (oEmployee) {
                return String(oEmployee.ID) === String(sEmployeeId);
            });

            if (!oEmployee) {
                MessageBox.error("Employee not found");
                this.getRouter().navTo("list");
                return;
            }

            this._sEmployeeId = oEmployee.ID;

            // Create a view-local named model
            var oProfileModel = new JSONModel(oEmployee);

            this.getView().setModel(oProfileModel, "profile");
        },

        onEdit: function () {

            this.getRouter().navTo("edit", {
                employeeId: this._sEmployeeId
            });

        },

        onDelete: function () {

            var that = this;

            var oComponentModel =
                this.getOwnerComponent().getModel();

            var oProfileModel =
                this.getView().getModel("profile");

            var sName =
                oProfileModel.getProperty("/Name");

            MessageBox.confirm(
                "Delete employee \"" + sName + "\"?",
                {
                    title: "Confirm Delete",

                    onClose: function (sAction) {

                        if (sAction === MessageBox.Action.OK) {

                            var aEmployees =
                                oComponentModel.getProperty("/Employees");

                            var iIndex =
                                aEmployees.findIndex(function (oEmployee) {
                                    return String(oEmployee.ID) ===
                                           String(that._sEmployeeId);
                                });

                            if (iIndex > -1) {

                                aEmployees.splice(iIndex, 1);

                                oComponentModel.setProperty(
                                    "/Employees",
                                    aEmployees
                                );
                                
                                MessageToast.show(
                                    "Employee deleted"
                                );

                                that.getRouter().navTo("list");

                            }

                        }

                    }
                }
            );

        }

    });
});
