import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import merge from "sap/base/util/merge";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import ValidationHelper from "../model/ValidationHelper";
/**
 * @namespace ems_crud.controller
 */
export default class EmployeeEdit extends BaseController {

    private _sEmployeeId: string = "";

    public onInit(): void {
        this.getView()!.setModel(
            new JSONModel({}),
            "draft"
        );

        this.getRouter()
            .getRoute("edit")!
            .attachPatternMatched(this._onRouteMatched, this);
    }

    private _onRouteMatched(oEvent: any): void {
        const sEmployeeId =
            oEvent.getParameter("arguments").employeeId;

        const oComponentModel =
            this.getOwnerComponent()!.getModel() as JSONModel;

        const aEmployees =
            oComponentModel.getProperty("/Employees");

        const oEmployee = aEmployees.find(
            (e: any) => e.ID === sEmployeeId
        );

        if (!oEmployee) {
            MessageBox.error("Employee not found");
            this.getRouter().navTo("list");
            return;
        }

        this._sEmployeeId = sEmployeeId;

        const oDraft: any = merge({}, oEmployee);

        oDraft.SkillsText =
            (oDraft.Skills || []).join(", ");

        const oDraftModel =
            this.getView()!.getModel("draft") as JSONModel;

        oDraftModel.setData(oDraft);

        ValidationHelper.clearValueStates(
            this.getView()!
        );
    }

    public onOwnsVehicleChange(oEvent: any): void {
        if (!oEvent.getParameter("selected")) {
            const oDraft =
                this.getView()!.getModel("draft") as JSONModel;

            oDraft.setProperty("/VehicleType", "");
        }
    }

    public onAddWorkHistoryRow(): void {
        const oDraft =
            this.getView()!.getModel("draft") as JSONModel;

        const aHistory =
            oDraft.getProperty("/WorkHistory") || [];

        aHistory.push({
            Company: "",
            Designation: "",
            Duration: ""
        });

        oDraft.setProperty("/WorkHistory", aHistory);
    }

    public onDeleteWorkHistoryRow(oEvent: any): void {
        const oContext = oEvent
            .getSource()
            .getParent()
            .getBindingContext("draft");

        const iIndex = parseInt(
            oContext.getPath().split("/").pop(),
            10
        );

        const oDraft =
            this.getView()!.getModel("draft") as JSONModel;

        const aHistory =
            oDraft.getProperty("/WorkHistory");

        aHistory.splice(iIndex, 1);

        oDraft.setProperty("/WorkHistory", aHistory);
    }

    public onSave(): void {
        if (!ValidationHelper.validate(this.getView()!)) {
            MessageBox.error(
                "Please correct the highlighted fields before saving."
            );
            return;
        }

        const oComponentModel =
            this.getOwnerComponent()!.getModel() as JSONModel;

        const oDraft =
            this.getView()!.getModel("draft") as JSONModel;

        const oEmployee =
            ValidationHelper.buildEmployeeFromDraft(
                oDraft.getData()
            );

        oEmployee.ID = this._sEmployeeId;

        const aEmployees =
            oComponentModel.getProperty("/Employees");

        const iIndex = aEmployees.findIndex(
            (e: any) => e.ID === oEmployee.ID
        );

        aEmployees[iIndex] = oEmployee;

        oComponentModel.setProperty(
            "/Employees",
            aEmployees
        );

        MessageToast.show(
            "Employee updated successfully"
        );

        this.getRouter().navTo("profile", {
            employeeId: oEmployee.ID
        });
    }
}