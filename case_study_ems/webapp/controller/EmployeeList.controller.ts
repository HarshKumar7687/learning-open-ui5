import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import formatter from "../model/formatter";
/**
 * @namespace ems_crud.controller
 */
export default class EmployeeList extends BaseController {

    public formatter = formatter;

    public onSearch(oEvent: any): void {
        let sQuery = oEvent.getParameter("newValue");

        if (sQuery === undefined) {
            sQuery = oEvent.getParameter("query") || "";
        }

        const oBinding =
            this.byId("employeeTable")!.getBinding("items") as ListBinding;

        if (!sQuery) {
            oBinding.filter([]);
            return;
        }

        const aFilters = [
            new Filter(
                "Name",
                FilterOperator.Contains,
                sQuery
            ),
            new Filter(
                "Department",
                FilterOperator.Contains,
                sQuery
            ),
            new Filter(
                "WorkingLocation",
                FilterOperator.Contains,
                sQuery
            ),
            new Filter(
                "PreviousOrganisation",
                FilterOperator.Contains,
                sQuery
            )
        ];

        oBinding.filter(
            new Filter({
                filters: aFilters,
                and: false
            })
        );
    }

    public onAdd(): void {
        this.getRouter().navTo("create");
    }

    public onViewProfile(oEvent: any): void {
        const oEmployee = oEvent
            .getSource()
            .getParent()
            .getBindingContext()
            .getObject();

        this.getRouter().navTo("profile", {
            employeeId: oEmployee.ID
        });
    }

    public onEditEmployee(oEvent: any): void {
        const oEmployee = oEvent
            .getSource()
            .getParent()
            .getBindingContext()
            .getObject();

        this.getRouter().navTo("edit", {
            employeeId: oEmployee.ID
        });
    }
}