import {observable, action} from "mobx";
import menus from "../json/menu";

class RouterStore {
    @observable openKeys = [];
    rootSubmenuKeys = [];
    @observable currentUrl = [];

    constructor() {
        this.rootSubmenuKeys = this.getRootSubMenuKeys();
        console.log(this.currentUrl);
    }

    @action.bound setCurrentUrl(val) {
        this.currentUrl = val;
    }

    getRootSubMenuKeys() {
        let subMenuKeys = [];
        menus.map(menu => subMenuKeys.push(menu['key']));
        return subMenuKeys;
    }

    @action.bound onOpenChange(openKeys) {
        console.log(openKeys, this.openKeys);
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.openKeys = openKeys;
            if (latestOpenKey === undefined) {
                this.openKeys = [];
            }
        } else {
            this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
    }
}

export default new RouterStore();