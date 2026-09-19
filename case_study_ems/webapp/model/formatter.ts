export default {
    getInitials(sName: string): string {
        if (!sName) {
            return "?";
        }

        const aParts = sName.trim().split(/\s+/);
        let sInitials = aParts[0].charAt(0);

        if (aParts.length > 1) {
            sInitials += aParts[aParts.length - 1].charAt(0);
        }

        return sInitials.toUpperCase();
    },

    joinList(aList: string[]): string {
        if (!aList || !aList.length) {
            return "—";
        }

        return aList.join(", ");
    }
};