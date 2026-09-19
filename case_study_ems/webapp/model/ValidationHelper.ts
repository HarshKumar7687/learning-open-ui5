import View from "sap/ui/core/mvc/View";
import JSONModel from "sap/ui/model/json/JSONModel";

const aFieldIds: string[] = [
    "nameInput",
    "addressInput",
    "depositInput",
    "joiningDatePicker",
    "departmentSelect",
    "locationInput",
    "vehicleTypeSelect",
    "skillsInput"
];

export default {

    clearValueStates(oView: View): void {
        aFieldIds.forEach((sId: string) => {
            const oControl: any = oView.byId(sId);

            if (oControl) {
                oControl.setValueState("None");
            }
        });
    },

    validate(oView: View): boolean {
        const oData = (oView.getModel("draft") as JSONModel).getData();
        let bValid = true;

        const setState = (
            sId: string,
            bOk: boolean,
            sMsg: string
        ): void => {

            const oControl: any = oView.byId(sId);

            if (!oControl) {
                return;
            }

            oControl.setValueState(
                bOk ? "None" : "Error"
            );

            oControl.setValueStateText(sMsg || "");

            if (!bOk) {
                bValid = false;
            }
        };

        setState(
            "nameInput",
            !!(oData.Name && oData.Name.trim().length >= 2),
            "Name is required (minimum 2 characters)"
        );

        setState(
            "addressInput",
            !!(oData.Address && oData.Address.trim().length >= 5),
            "Address is required (minimum 5 characters)"
        );

        const fDeposit = parseFloat(oData.Deposit);

        setState(
            "depositInput",
            oData.Deposit !== "" &&
            oData.Deposit !== null &&
            !isNaN(fDeposit) &&
            fDeposit >= 0,
            "Deposit must be a valid number, 0 or greater"
        );

        const bDateOk =
            !!oData.JoiningDate &&
            new Date(oData.JoiningDate) <= new Date();

        setState(
            "joiningDatePicker",
            bDateOk,
            "Joining date is required and cannot be in the future"
        );

        setState(
            "departmentSelect",
            !!oData.Department,
            "Please select a department"
        );

        setState(
            "locationInput",
            !!(
                oData.WorkingLocation &&
                oData.WorkingLocation.trim().length > 0
            ),
            "Working location is required"
        );

        if (oData.OwnsVehicle) {
            setState(
                "vehicleTypeSelect",
                !!oData.VehicleType,
                "Please select a vehicle type"
            );
        } else {
            setState("vehicleTypeSelect", true, "");
        }

        setState(
            "skillsInput",
            !!(
                oData.SkillsText &&
                oData.SkillsText.trim().length > 0
            ),
            "Add at least one skill (comma-separated)"
        );

        return bValid;
    },

    buildEmployeeFromDraft(oDraftData: any): any {
        const oEmployee = Object.assign({}, oDraftData);

        oEmployee.Skills = (oEmployee.SkillsText || "")
            .split(",")
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0);

        delete oEmployee.SkillsText;

        return oEmployee;
    }
};