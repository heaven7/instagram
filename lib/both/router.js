if(Meteor.isClient) {
	Tracker.autorun(() => {
		Meteor.call('getRoute', (err, res) => {
			if(res)
				Session.set('auth_route', res)
		})
		let auth_route = Session.get('auth_route') 
		if(auth_route) {
			FlowRouter.route(auth_route, {
			    action: function(params, queryParams) {
			    	if(queryParams && queryParams.code) {
			    		let token = queryParams.code
			    		Meteor.call('saveAuthToken', token)
			    	}
			    }
			});

		}
	})
}
