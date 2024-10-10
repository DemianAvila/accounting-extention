import json
from odoo import http
from odoo.http import route, request

class Invoices(http.Controller):
    @route(
            route='/invoices', 
            auth='user',
            type= 'http',
            methods= ['post', 'get'])
    def invoices(self):
        invo = request.env["account.move"].search([])
        ret_invo = []
        for inv in invo:
            ret_invo.append({
                "id": inv.id,
                "name": inv.name
            })
            
        return json.dumps(
            {"invoices": ret_invo}
        )
    
    @route(
            route='/invoice_detail', 
            auth='user',
            type= 'http',
            methods= ['get'])
    def invoice_detail(self, **kwargs):
        req_id = kwargs.get("id")
        invo = request.env["account.move"].search([
            ("id", "=", req_id)
        ])
        if len(invo)==1:
            invo = invo[0]
            ret_invo = {
                "id": invo.id,
                "name": invo.name,
                "client": invo.partner_id.name,
                "products": [],
                "untax_total": 0
            }
            for line in invo.invoice_line_ids:
                ret_invo["products"].append(
                    {
                        "name": line.name,
                        "qty": line.quantity,
                        "u_price": line.price_unit,
                        "tax": line.tax_ids.amount
                    }
                )

                ret_invo["untax_total"] = ret_invo["untax_total"]+(line.price_unit*line.quantity)

        
            return json.dumps(
                {"invoice": ret_invo}
            )
        
        return None


