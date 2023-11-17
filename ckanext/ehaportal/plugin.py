import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from ckanext.ehaportal.views.home import eha_home


class EHAPortal(plugins.SingletonPlugin):
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.IConfigurer)

    # IBlueprint
    def get_blueprint(self):
        blueprint = [eha_home]
        return blueprint

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('assets', 'ehaportal')

