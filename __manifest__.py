# -*- coding: utf-8 -*-
{
    'name': "accounting-extention",

    'summary': "Module that goes in line with Integritas tech test",

    'description': """
    This module extends Accounting module to insert tables
    """,

    'author': "Integritas - Demian Avila",
    'website': "-",

    'category': 'Accounting',
    'version': '0.1',

    'depends': ['base', 'account'],

    'data': [
        # 'security/ir.model.access.csv',
        #'views/views.xml',
        #'views/templates.xml',
        'views/add_prorrateo_menu.xml'
    ],
    
    'assets': {
        'web.assets_backend': [
            'accounting-extention/static/src/js/modules/**/*',
            'accounting-extention/static/src/js/prorrateo_action.js',
            'accounting-extention/static/src/xml/prorrateo_template.xml'
        ]
    },
}

