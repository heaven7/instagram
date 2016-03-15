Meteor.methods({
	saveAuthToken: (token, userId) => {
		Meteor.users.update(userId, {
			$set: {'services.instagram.authToken': token}
		})
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
	authUser: () => {
		const ig = instagramNode.instagram()
		ig.use({
			client_id: ig_config.client_id,
			client_secret: ig_config.client_secret
		})		
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
