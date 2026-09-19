import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class Home extends BaseController {

    public onInit(): void {
        const model = this.getOwnerComponent()!.getModel() as JSONModel;
        const employees = model.getProperty("/Employees") || [];
        const departments = model.getProperty("/Departments") || [];

        const locations = new Set(
            employees.map((employee: any) => employee.WorkingLocation)
        );

        const vehicleOwners = employees.filter(
            (employee: any) => employee.OwnsVehicle === true
        ).length;

        const dashboardModel = new JSONModel({
            totalEmployees: employees.length,
            departments: departments.length,
            vehicleOwners: vehicleOwners,
            locations: locations.size
        });

        this.getView()!.setModel(dashboardModel, "dashboard");
    }

    public onViewEmployees(): void {
        this.getRouter().navTo("list");
    }
}