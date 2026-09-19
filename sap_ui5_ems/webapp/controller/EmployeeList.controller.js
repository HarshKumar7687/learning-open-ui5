sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../model/formatter"
], function (BaseController, Filter, FilterOperator, MessageBox, MessageToast, formatter) {
    "use strict";

    return BaseController.extend("ems.controller.EmployeeList", {

        formatter: formatter,

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            if (sQuery === undefined) {
                sQuery = oEvent.getParameter("query") || "";
            }

            var oBinding = this.byId("employeeTable").getBinding("items");

            if (!sQuery) {
                oBinding.filter([]);
                return;
            }

            var aFilters = [
                new Filter("Name", FilterOperator.Contains, sQuery),
                new Filter("Department", FilterOperator.Contains, sQuery),
                new Filter("WorkingLocation", FilterOperator.Contains, sQuery),
                new Filter("PreviousOrganisation", FilterOperator.Contains, sQuery)
            ];

            oBinding.filter(new Filter({ filters: aFilters, and: false }));
        },

        onAdd: function () {
            this.getRouter().navTo("create");
        },

        onViewProfile: function (oEvent) {
            var oEmployee = oEvent.getSource().getParent().getBindingContext().getObject();
            this.getRouter().navTo("profile", { employeeId: oEmployee.ID });
        },

        onEditEmployee: function (oEvent) {
            var oEmployee = oEvent.getSource().getParent().getBindingContext().getObject();
            this.getRouter().navTo("edit", { employeeId: oEmployee.ID });
        },

        onDeleteEmployee: function (oEvent) {
            var oEmployee = oEvent.getSource().getParent().getBindingContext().getObject();
            var oModel = this.getOwnerComponent().getModel();

            MessageBox.confirm("Delete employee \"" + oEmployee.Name + "\"?", {
                title: "Confirm Delete",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        var aEmployees = oModel.getProperty("/Employees");
                        var iIndex = aEmployees.findIndex(function (e) { return e.ID === oEmployee.ID; });
                        if (iIndex > -1) {
                            aEmployees.splice(iIndex, 1);
                            oModel.setProperty("/Employees", aEmployees);
                            MessageToast.show("Employee deleted");
                        }
                    }
                }
            });
        }
    });
});
