/** @odoo-module  **/
import { registry } from "@web/core/registry";
import { Component, useState } from  "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { InvoiceSelector } from "./modules/select_invoice";
const actionRegistry = registry.category("actions");

export class TableProrrateoComponent extends Component {
    setup() {
        this.rpc = useService("rpc");
        console.log("Set up component")
        this.selector = new InvoiceSelector([], null);
        this.selector.getInvoicesFromModel(this.rpc);
        console.log(this.selector.getInvoiceDomElement())
    }

    
}

TableProrrateoComponent.template = "accounting-extention.prorrateo_template";

actionRegistry.add("open_prorrateo_window", TableProrrateoComponent);