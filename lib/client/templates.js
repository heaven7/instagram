Handlebars.registerHelper('auth_url', () => {
	Meteor.call('getAuthUrl', (err, res) => {
		if(err)
			console.log(err)

		if(res)
			Session.set('auth_url', res)
	})
	return Session.get('auth_url')
})
