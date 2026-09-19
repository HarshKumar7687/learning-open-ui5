sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../model/ValidationHelper"
], function (BaseController, JSONModel, MessageBox, MessageToast, ValidationHelper) {
    "use strict";

    return BaseController.extend("ems.controller.EmployeeCreate", {

        onInit: function () {
            this.getView().setModel(new JSONModel(this._getEmptyEmployee()), "draft");
            this.getRouter().getRoute("create").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            // reset the form every time the Create page is entered
            this.getView().getModel("draft").setData(this._getEmptyEmployee());
            ValidationHelper.clearValueStates(this.getView());
        },

        _getEmptyEmployee: function () {
            return {
                ID: "",
                Name: "",
                PhotoUrl: "",
                Address: "",
                Deposit: "",
                JoiningDate: null,
                Department: "",
                WorkingLocation: "",
                OwnsVehicle: false,
                VehicleType: "",
                PreviousOrganisation: "",
                Skills: [],
                SkillsText: "",
                WorkHistory: []
            };
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
            oEmployee.ID = "EMP" + String(Date.now()).slice(-6);

            var aEmployees = oComponentModel.getProperty("/Employees");
            aEmployees.push(oEmployee);
            oComponentModel.setProperty("/Employees", aEmployees);
            
            MessageToast.show("Employee created successfully");
            this.getRouter().navTo("profile", { employeeId: oEmployee.ID });
        }
    });
});
