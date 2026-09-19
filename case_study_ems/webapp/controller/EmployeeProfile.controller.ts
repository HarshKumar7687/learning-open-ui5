import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import formatter from "../model/formatter";
import Dialog from "sap/m/Dialog";
import Image from "sap/m/Image";
import Button from "sap/m/Button";
/**
 * @namespace ems_crud.controller
 */
export default class EmployeeProfile extends BaseController {

    public formatter = formatter;

    private _sEmployeeId: string = "";

    public onInit(): void {
        this.getRouter()
            .getRoute("profile")!
            .attachPatternMatched(
                this._onRouteMatched,
                this
            );
    }

    private _onRouteMatched(oEvent: any): void {

        const sEmployeeId =
            oEvent
                .getParameter("arguments")
                .employeeId;

        const oModel =
            this.getOwnerComponent()!.getModel() as JSONModel;

        const aEmployees =
            oModel.getProperty("/Employees") || [];

        const oEmployee = aEmployees.find(
            (oEmployee: any) =>
                String(oEmployee.ID) ===
                String(sEmployeeId)
        );

        if (!oEmployee) {
            MessageBox.error("Employee not found");
            this.getRouter().navTo("list");
            return;
        }

        this._sEmployeeId = oEmployee.ID;

        const oProfileModel =
            new JSONModel(oEmployee);

        this.getView()!.setModel(
            oProfileModel,
            "profile"
        );
    }

    public onEdit(): void {
        this.getRouter().navTo("edit", {
            employeeId: this._sEmployeeId
        });
    }

    public onDelete(): void {

        const oComponentModel =
            this.getOwnerComponent()!.getModel() as JSONModel;

        const oProfileModel =
            this.getView()!.getModel("profile") as JSONModel;

        const sName =
            oProfileModel.getProperty("/Name");

        MessageBox.confirm(
            `Delete employee "${sName}"?`,
            {
                title: "Confirm Delete",
                onClose: (sAction: string): void => {
                    if ( sAction === MessageBox.Action.OK ) {
                        const aEmployees = oComponentModel.getProperty("/Employees");
                        const iIndex = aEmployees.findIndex((oEmployee: any) => String(oEmployee.ID) === String(this._sEmployeeId));
                        if (iIndex > -1) {
                            aEmployees.splice(iIndex, 1);
                            oComponentModel.setProperty(
                                "/Employees",
                                aEmployees
                            );
                            MessageToast.show(
                                "Employee deleted"
                            );
                            this.getRouter()
                                .navTo("list");
                        }
                    }
                }
            }
        );
    }
    public onProfilePicturePress(): void {
    const dialog = new Dialog({
        title: "Profile Picture",
        contentWidth: "400px",
        content: [
            new Image({
                src: "{profile>/PhotoUrl}",
                width: "100%",
                densityAware: false
            })
        ],
        endButton: new Button({
            text: "Close",
            press: () => dialog.close()
        }),
        afterClose: () => dialog.destroy()
    });

        this.getView()?.addDependent(dialog);
        dialog.open();
    }
}