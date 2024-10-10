/** @odoo-module  **/
import { registry } from "@web/core/registry";
import { Component, useState, useRef, onRendered } from  "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { InvoiceSelector } from "./modules/select_invoice";
const actionRegistry = registry.category("actions");

export class TableProrrateoComponent extends Component {

    setup() {
        this.selector = new InvoiceSelector([], null);
        this.selecDom = useRef("invoiceSelector");
        this.table = useRef("table");

        onRendered(async ()=>{
            await this.selector.getInvoicesFromModel();
            this.selector.getInvoiceDomElement().forEach(element =>{
                this.selecDom.el.appendChild(element)
            })
            await this.selectState()
            

        })
    }

    async selectState(){
        this.selector.setInvoiceFromID(this.selecDom.el.value);
        await this.getInvoiceLinesByID()
    }

    async getInvoiceLinesByID(){
        await this.selector.completeSelectedInvoice()
        this.table.el.innerHTML = '';
        this.table.el.appendChild(this.selector.getTableElements())

    }

    
}

TableProrrateoComponent.template = "accounting-extention.prorrateo_template";

actionRegistry.add("open_prorrateo_window", TableProrrateoComponent);