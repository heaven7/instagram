Handlebars.registerHelper('auth_url', () => {
	Meteor.call('getAuthUrl', (err, res) => {
		if(err)
			console.log(err)

		if(res)
			Session.set('auth_url', res)
	})
	return Session.get('auth_url')
})

Handlebars.registerHelper('user_data', () => {
	Meteor.call('userData', Meteor.userId(), (err, res) => {
		if(err)
			console.log(err)

		if(res)
			Session.set('user_data', res)
	})
	return Session.get('user_data')
})

Handlebars.registerHelper('user_followers_count', () => {
	Meteor.call('getUserFollowersCount', Meteor.userId(), (err, res) => {
		if(err)
			console.log(err)

		if(res || res == 0)
			Session.set('user_followers_count', res)
	})
	return Session.get('user_followers_count')
})
