sap.ui.define([], function () {
    "use strict";

    var aFieldIds = [
        "nameInput", "addressInput", "depositInput", "joiningDatePicker",
        "departmentSelect", "locationInput", "vehicleTypeSelect", "skillsInput"
    ];

    return {

        clearValueStates: function (oView) {
            aFieldIds.forEach(function (sId) {
                var oControl = oView.byId(sId);
                if (oControl) {
                    oControl.setValueState("None");
                }
            });
        },

        // Validates the view's "draft" model against the field controls in
        // the embedded EmployeeForm fragment. Returns true if everything is valid.
        validate: function (oView) {
            var oData = oView.getModel("draft").getData();
            var bValid = true;

            var setState = function (sId, bOk, sMsg) {
                var oControl = oView.byId(sId);
                if (!oControl) {
                    return;
                }
                oControl.setValueState(bOk ? "None" : "Error");
                oControl.setValueStateText(sMsg || "");
                if (!bOk) {
                    bValid = false;
                }
            };

            setState("nameInput",
                !!(oData.Name && oData.Name.trim().length >= 2),
                "Name is required (minimum 2 characters)");

            setState("addressInput",
                !!(oData.Address && oData.Address.trim().length >= 5),
                "Address is required (minimum 5 characters)");

            var fDeposit = parseFloat(oData.Deposit);
            setState("depositInput",
                oData.Deposit !== "" && oData.Deposit !== null && !isNaN(fDeposit) && fDeposit >= 0,
                "Deposit must be a valid number, 0 or greater");

            var bDateOk = !!oData.JoiningDate && new Date(oData.JoiningDate) <= new Date();
            setState("joiningDatePicker",
                bDateOk,
                "Joining date is required and cannot be in the future");

            setState("departmentSelect",
                !!oData.Department,
                "Please select a department");

            setState("locationInput",
                !!(oData.WorkingLocation && oData.WorkingLocation.trim().length > 0),
                "Working location is required");

            if (oData.OwnsVehicle) {
                setState("vehicleTypeSelect",
                    !!oData.VehicleType,
                    "Please select a vehicle type");
            } else {
                setState("vehicleTypeSelect", true);
            }

            setState("skillsInput",
                !!(oData.SkillsText && oData.SkillsText.trim().length > 0),
                "Add at least one skill (comma-separated)");

            return bValid;
        },

        // Converts the flat "draft" (which carries a comma-separated SkillsText
        // field for easy editing) into the shape stored in the Employees array.
        buildEmployeeFromDraft: function (oDraftData) {
            var oEmployee = Object.assign({}, oDraftData);
            oEmployee.Skills = (oEmployee.SkillsText || "")
                .split(",")
                .map(function (s) { return s.trim(); })
                .filter(function (s) { return s.length > 0; });
            delete oEmployee.SkillsText;
            return oEmployee;
        }
    };
});
