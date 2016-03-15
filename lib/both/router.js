if(Meteor.isClient) {
	Tracker.autorun(() => {
		Meteor.call('getConfig', (err, res) => {
			if(res) 
				Meteor.call('setServiceConfig')
		})
		Meteor.call('getRoute', (err, res) => {
			if(res) 
				Session.set('auth_route', res)
		})	

		// authorize user and update token everytime the request_uri is hit
		if(Meteor.userId() && window.location.pathname == Session.get('auth_route')) {
			const userId = Meteor.userId()
			const params = window.location.search 
			const regex = new RegExp(/code=[a-z0-9]+/)
			const code = params.match(regex)[0].split('code=')[1]
			if(code) Meteor.call('authorizeUser', code, userId, (err, res) => {
				if(err)
					console.log(err)
			})
		}
	})	
}
