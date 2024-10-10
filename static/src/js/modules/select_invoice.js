/** @odoo-module */

class InvoiceLine {
    constructor(id, invoice_id, product_id, product_name, price, qty) {
        this._id = id;
        this._invoice_id = invoice_id;
        this._product_id = product_id;
        this._product_name = product_name;
        this._price = price;
        this._qty = qty;
    }

    get id() {
        return this._id;
    }

    get invoice_id() {
        return this._invoice_id;
    }

    get product_id() {
        return this._product_id;
    }

    get product_name() {
        return this._product_name;
    }

    get price() {
        return this._price;
    }

    get qty() {
        return this._qty;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set invoice_id(value) {
        this._invoice_id = value;
    }

    set product_id(value) {
        this._product_id = value;
    }

    set product_name(value) {
        this._product_name = value;
    }

    set price(value) {
        this._price = value;
    }

    set qty(value) {
        this._qty = value;
    }
}

class Invoice {
    constructor(id, name, customer_name, products) {
        this._id = id;
        this._name = name;
        this._customer_name = customer_name;
        this._products = products;  
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get customer_name() {
        return this._customer_name;
    }

    get products() {
        return this._products;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    set products(value) {
        this._products = value;
    }
}

class InvoiceSelector {
    constructor(invoices, selected_invoices) {
        this._invoices = invoices; 
        this._selected_invoices = selected_invoices; 
    }

    async getInvoicesFromModel(model){
        let model_invoices;
        this.invoices = []
        console.log("====================")
        console.log(model)
        console.log("====================")

        try {
            model_invoices = await model(
                "/invoices"
            )
        } catch (error) {
            console.error('Error calling method: ', error);
        }

        model_invoices.forEach(invoice => {
            this._invoices.push(
                new Invoice(
                    id= invoice.id,
                    name= invoice.name
                )
            )
       });
    }

    getInvoiceDomElement(){
        let domElements = [];
        let optionElement = undefined;
        this.invoices.forEach(invoice =>{
            optionElement = document.createElement('option');
            optionElement.value = invoice.id();
            optionElement.textContent = invoice.name();
            domElements.push(
                optionElement    
            )
        })
        return domElements;
    }

    get invoices() {
        return this._invoices;
    }

    get selected_invoices() {
        return this._selected_invoices;
    }

    set invoices(value) {
        this._invoices = value;
    }

    set selected_invoices(value) {
        this._selected_invoices = value;
    }
}

export { Invoice, InvoiceLine, InvoiceSelector }