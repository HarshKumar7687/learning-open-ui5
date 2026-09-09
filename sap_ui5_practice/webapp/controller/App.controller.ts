import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import BaseController from "./BaseController";
import App from "sap/m/App";

/**
 * @name ui5.tutorial.walkthrough.controller.App
 */
export default class AppController extends BaseController {

	onShowUnnamedFormName(): void {
		// read msg from i18n model
		const unNamedName = (this.getView()?.getModel() as JSONModel)?.getProperty("/unnamed/name");
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const msgUnnamed = resourceBundle.getText("UnnamedMsgName", [unNamedName]) as string;
		this.showMessage(msgUnnamed)
	}
	onShowUnnamedFormMarks(): void {
		// read msg from i18n model
		const unNamedMarks = (this.getView()?.getModel() as JSONModel)?.getProperty("/unnamed/marks");
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const msgUnnamed = resourceBundle.getText("UnnamedMsgMarks", [unNamedMarks]) as string;
		this.showMessage(msgUnnamed)
	}
	onShowUnnamedFormAge(): void {
		// read msg from i18n model
		const unNamedAge = (this.getView()?.getModel() as JSONModel)?.getProperty("/unnamed/age");
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const msgUnnamed = resourceBundle.getText("UnnamedMsgAge", [unNamedAge]) as string;
		this.showMessage(msgUnnamed)
	}
	onShowNamedFormName(): void {
		// read msg from i18n model
		const namedName = (this.getView()?.getModel("Named") as JSONModel)?.getProperty("/named/name");
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const msgNamed = resourceBundle.getText("NamedMsgName", [namedName]) as string;
		this.showMessage(msgNamed)
	}
	onShowNamedFormMarks(): void {
		// read msg from i18n model
		const namedMarks = (this.getView()?.getModel("Named") as JSONModel)?.getProperty("/named/marks");
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const msgNamed = resourceBundle.getText("NamedMsgMarks", [namedMarks]) as string;
		this.showMessage(msgNamed)
	}
	onShowNamedFormAge(): void {
		// read msg from i18n model
		const namedAge = (this.getView()?.getModel("Named") as JSONModel)?.getProperty("/named/age");
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const msgNamed = resourceBundle.getText("NamedMsgAge", [namedAge]) as string;
		this.showMessage(msgNamed)
	}
	public onNavigateToPage2(): void {
        const app = this.byId("app") as App;
        app.to(this.createId("page2"));
    }
	public onNavigateToPage3(): void {
        const app = this.byId("app") as App;
        app.to(this.createId("page3"));
    }
	public onNavigateToPage4(): void {
        const app = this.byId("app") as App;
        app.to(this.createId("page4"));
    }
    public onNavigateBack(): void {
        const app = this.byId("app") as App;
        app.back();
    }
};