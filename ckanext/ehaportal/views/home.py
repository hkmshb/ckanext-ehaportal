# encoding: utf-8

from ckan.lib import base
from flask import Blueprint

eha_home = Blueprint('eha_home', __name__)


def impacts():
    '''display impact page'''
    return base.render('home/impact.html', extra_vars={})


def support():
    '''display support page'''
    # TODO: drop hard-coded values, extend/use config page instead 
    support = {
        'number': '0909-399-5400', 
        'number_url': 'tel:+2349093995400',
        'email_url': 'mailto:dataportal.support@ehealthafrica.org',
    }

    return base.render('home/support.html', extra_vars={'support': support})


util_rules = [
    ('/impacts', impacts),
    ('/support', support)
]

for rule, view_func in util_rules:
    eha_home.add_url_rule(rule, view_func=view_func)

