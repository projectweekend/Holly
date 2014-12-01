from fabric import api
from fabric.operations import prompt


def production():
	api.env.hosts = ['{0}'.format(prompt('Host:'))]
	api.env.user = '{0}'.format(prompt('User:'))


def update():
	api.require('hosts', provided_by=[production])

	with api.settings(warn_only=True):
		api.sudo('service holly stop')

	with api.cd('~/Holly'):
		api.run('git pull origin master')
		api.run('npm install')

	api.sudo('service holly start')
