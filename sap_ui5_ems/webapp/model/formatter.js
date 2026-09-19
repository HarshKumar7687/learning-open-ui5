sap.ui.define([], function () {
    "use strict";

    return {
        // Used by the Avatar control as a fallback when PhotoUrl is empty
        getInitials: function (sName) {
            if (!sName) {
                return "?";
            }
            var aParts = sName.trim().split(/\s+/);
            var sInitials = aParts[0].charAt(0);
            if (aParts.length > 1) {
                sInitials += aParts[aParts.length - 1].charAt(0);
            }
            return sInitials.toUpperCase();
        },

        joinList: function (aList) {
            if (!aList || !aList.length) {
                return "—";
            }
            return aList.join(", ");
        }
    };
});
