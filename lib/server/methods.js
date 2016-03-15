authorizeUser = (code, cb) => {
	const ig = instagramNode.instagram()
	ig.use({
		client_id: ig_config.client_id,
		client_secret: ig_config.client_secret
	})
	ig.authorize_user(code, ig_config.redirect_uri, (err, res) => {
		if(err)
	//		console.log(err)
			cb && cb(err, null)
		if(res)
			cb && cb(null, res)
	})	
}

Meteor.methods({
	setAccessToken: (token, userId) => {
		let id = Meteor.users.update(userId, {
			$set: {'services.instagram.accessToken': token}
		})
		return id
	},
	getAccessToken: (userId) => {
		const user = Meteor.users.findOne(userId)
		if(user) return user.services.instagram.accessToken
		return false
	},
	getRoute: () => {
		if(ig_config && ig_config.redirect_uri) {
			parts = ig_config.redirect_uri.split('/')
			path = parts[parts.length -1]
			return `/${path}`
		}
		return false
	},
	getAuthUrl: () => {
		const ig = instagramNode.instagram()
		ig.use({
			client_id: ig_config.client_id,
			client_secret: ig_config.client_secret
		})
		if(ig_config && ig_config.redirect_uri && ig_config.scope)
			return ig.get_authorization_url(ig_config.redirect_uri, ig_config.scope)
	},
	authorizeUser: (code, userId) => {
		let authorizeUserAsync = Meteor.wrapAsync(authorizeUser)
		try {
			authorizeUserAsync(code, (err, res) => {
				if(res) {
					if(res.access_token) {
						const token = res.access_token
						Meteor.call('setAccessToken', token, userId)
					}
				}  		
	   		})
			
		}
		catch(e) {
			error = e.toString()
			throw new Meteor.Error(500, error)
		}
	},
	getConfig: () => ig_config ? true : false,
	setServiceConfig: () => {
		if(ig_config && ig_config.client_id && ig_config.client_secret) {
			ServiceConfiguration.configurations.update({ service: 'instagram' },
			{
				$set: {
					scope: ig_config.scope,
					clientId: ig_config.client_id,
					secret: ig_config.client_secret
				}
			})
			return true
		}
	}
})
