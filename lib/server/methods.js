Meteor.methods({
	saveAuthToken: (token) => {
		console.log(token)
	},
	getRoute: () => ig_config && ig_config.route,
	getAuthUrl: () => {
		const ig = instagramNode.instagram()
		ig.use({
			client_id: ig_config.client_id,
			client_secret: ig_config.client_secret
		})
		if(ig_config.redirect_uri)
			return ig.get_authorization_url(ig_config.redirect_uri, ig_config.scope)
	},
	authUser: () => {
		const ig = instagramNode.instagram()
		ig.use({
			client_id: ig_config.client_id,
			client_secret: ig_config.client_secret
		})		
	}
})