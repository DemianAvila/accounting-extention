# -*- coding: utf-8 -*-
# from odoo import http


# class Accounting-extention(http.Controller):
#     @http.route('/accounting-extention/accounting-extention', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/accounting-extention/accounting-extention/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('accounting-extention.listing', {
#             'root': '/accounting-extention/accounting-extention',
#             'objects': http.request.env['accounting-extention.accounting-extention'].search([]),
#         })

#     @http.route('/accounting-extention/accounting-extention/objects/<model("accounting-extention.accounting-extention"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('accounting-extention.object', {
#             'object': obj
#         })

