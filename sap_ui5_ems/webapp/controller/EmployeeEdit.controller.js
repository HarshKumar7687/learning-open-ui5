sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/merge",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../model/ValidationHelper"
], function (BaseController, JSONModel, merge, MessageBox, MessageToast, ValidationHelper) {
    "use strict";

    return BaseController.extend("ems.controller.EmployeeEdit", {

        onInit: function () {
            this.getView().setModel(new JSONModel({}), "draft");
            this.getRouter().getRoute("edit").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            var aEmployees = this.getOwnerComponent().getModel().getProperty("/Employees");
            var oEmployee = aEmployees.find(function (e) { return e.ID === sEmployeeId; });

            if (!oEmployee) {
                MessageBox.error("Employee not found");
                this.getRouter().navTo("list");
                return;
            }

            this._sEmployeeId = sEmployeeId;

            var oDraft = merge({}, oEmployee);
            oDraft.SkillsText = (oDraft.Skills || []).join(", ");
            this.getView().getModel("draft").setData(oDraft);

            ValidationHelper.clearValueStates(this.getView());
        },

        onOwnsVehicleChange: function (oEvent) {
            if (!oEvent.getParameter("selected")) {
                this.getView().getModel("draft").setProperty("/VehicleType", "");
            }
        },

        onAddWorkHistoryRow: function () {
            var oDraft = this.getView().getModel("draft");
            var aHistory = oDraft.getProperty("/WorkHistory") || [];
            aHistory.push({ Company: "", Designation: "", Duration: "" });
            oDraft.setProperty("/WorkHistory", aHistory);
        },

        onDeleteWorkHistoryRow: function (oEvent) {
            var oContext = oEvent.getSource().getParent().getBindingContext("draft");
            var iIndex = parseInt(oContext.getPath().split("/").pop(), 10);
            var oDraft = this.getView().getModel("draft");
            var aHistory = oDraft.getProperty("/WorkHistory");
            aHistory.splice(iIndex, 1);
            oDraft.setProperty("/WorkHistory", aHistory);
        },

        onSave: function () {
            if (!ValidationHelper.validate(this.getView())) {
                MessageBox.error("Please correct the highlighted fields before saving.");
                return;
            }

            var oComponentModel = this.getOwnerComponent().getModel();
            var oEmployee = ValidationHelper.buildEmployeeFromDraft(this.getView().getModel("draft").getData());
            oEmployee.ID = this._sEmployeeId;

            var aEmployees = oComponentModel.getProperty("/Employees");
            var iIndex = aEmployees.findIndex(function (e) { return e.ID === oEmployee.ID; });
            aEmployees[iIndex] = oEmployee;
            oComponentModel.setProperty("/Employees", aEmployees);


            MessageToast.show("Employee updated successfully");
            this.getRouter().navTo("profile", { employeeId: oEmployee.ID });
        }
    });
});
