/** @odoo-module */

class InvoiceLine {
    constructor(id, invoice_id, product_id, product_name, price, qty, tax) {
        this._id = id;
        this._invoice_id = invoice_id;
        this._product_id = product_id;
        this._product_name = product_name;
        this._price = price;
        this._qty = qty;
        this._tax = tax;

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

    get tax(){
        return this._tax
    }

    set tax(value){
        this._tax = value
    }
}

class Invoice {
    constructor(id, name, customer_name, products, total_price) {
        this._id = id;
        this._name = name;
        this._customer_name = customer_name;
        this._products = products;  
        this._total_price = total_price
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

    get total_price(){
        return this._total_price
    }

    set total_price(value){
        this._total_price = value
    }
}

class InvoiceSelector {
    constructor(invoices, selected_invoices) {
        this._invoices = invoices; 
        this._selected_invoices = selected_invoices; 
    }

    async getInvoicesFromModel(){
        let model_invoices;
        let response;
        this.invoices = []

        try {
            response = await fetch(
                URL= "invoices"
            )
            model_invoices = await response.json()

            model_invoices.invoices.forEach(invoice => {
                let id = invoice.id
                let name = invoice.name
                this.invoices.push(
                    new Invoice(
                        id= id,
                        name= name
                    )
                )
            });

        } catch (error) {
            console.error('Error calling method: ', error);
        }

    }

    getInvoiceDomElement(){
        let domElements = [];
        let optionElement = undefined;
        this.invoices.forEach(invoice =>{
            optionElement = document.createElement('option');
            optionElement.value = invoice.id;
            optionElement.textContent = invoice.name;
            domElements.push(
                optionElement    
            )
        })
        return domElements;
    }

    setInvoiceFromID(id){
        this.invoices.forEach(invoice=>{
            if(invoice.id == id){
                this.selected_invoices=invoice
            }
        })
    }

    async completeSelectedInvoice(){
        let response;
        let invoice_detail;
        let products = []
        let line;
        try {
           response = await fetch(
            URL= `invoice_detail?id=${this.selected_invoices.id}`
           )
           invoice_detail = await response.json()

           this.selected_invoices.customer_name = invoice_detail.invoice.client
           this.selected_invoices.total_price = invoice_detail.invoice.untax_total


           invoice_detail.invoice.products.forEach(product => {
                line = new InvoiceLine(
                    0,
                    this.selected_invoices.id,
                    0,                
                    product.name,
                    product.qty,
                    product.u_price,
                    product.tax
                )
                products.push(line)

           })
           this.selected_invoices.products = products


        } catch (error) {
            console.error('Error calling method: ', error);
        }
    }

    getTableElements(){
        let table = document.createElement("table");
        let headerElem;
        let headers = [
            "Producto", 
            "Cliente", 
            "Importe"
        ]
        let headerRow = document.createElement("tr")
        headers.forEach(header => {
            headerElem = document.createElement("th")
            headerElem.textContent = header
            headerRow.appendChild(headerElem)
            table.appendChild(headerRow)
        })
        this.selected_invoices.products.forEach( product => {
            let tableRowData = document.createElement("tr")
            let product1 = document.createElement("td")
            let customer = document.createElement("td")
            let total = document.createElement("td")
            product1.textContent = product.product_name
            customer.textContent = this.selected_invoices.customer_name
            total.textContent = `${this.selected_invoices.total_price} / ${product.qty} = ${this.selected_invoices.total_price/product.qty}`
            tableRowData.appendChild(
                product1
            )
            tableRowData.appendChild(
                customer
            )
            tableRowData.appendChild(
                total
            )
            table.appendChild(tableRowData)
            
        })

        return table
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