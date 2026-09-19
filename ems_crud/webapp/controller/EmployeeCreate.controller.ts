import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import ValidationHelper from "../model/ValidationHelper";
/**
 * @namespace ems_crud.controller
 */
export default class EmployeeCreate extends BaseController {

    public onInit(): void {
        this.getView()!.setModel(
            new JSONModel(this._getEmptyEmployee()),
            "draft"
        );

        this.getRouter()
            .getRoute("create")!
            .attachPatternMatched(this._onRouteMatched, this);
    }

    private _onRouteMatched(): void {
        const oDraft = this.getView()!.getModel("draft") as JSONModel;

        oDraft.setData(this._getEmptyEmployee());

        ValidationHelper.clearValueStates(this.getView()!);
    }

    private _getEmptyEmployee() {
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
    }

    public onOwnsVehicleChange(oEvent: any): void {
        if (!oEvent.getParameter("selected")) {
            const oDraft = this.getView()!.getModel("draft") as JSONModel;

            oDraft.setProperty("/VehicleType", "");
        }
    }

    public onAddWorkHistoryRow(): void {
        const oDraft = this.getView()!.getModel("draft") as JSONModel;
        const aHistory = oDraft.getProperty("/WorkHistory") || [];

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

        const oDraft = this.getView()!.getModel("draft") as JSONModel;
        const aHistory = oDraft.getProperty("/WorkHistory");

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

        oEmployee.ID = "EMP" + String(Date.now()).slice(-6);

        const aEmployees = oComponentModel.getProperty("/Employees");

        aEmployees.push(oEmployee);

        oComponentModel.setProperty("/Employees", aEmployees);

        MessageToast.show("Employee created successfully");

        this.getRouter().navTo("profile", {
            employeeId: oEmployee.ID
        });
    }
    
}