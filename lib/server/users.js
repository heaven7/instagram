/**
 * User methods
 */

getUserMediaLiked = (userId, options, cb) => {

	Meteor.call('getAccessToken', userId, (err, res) => {
		if(res) {
			const token = res
			const ig = instagramNode.instagram()
			ig.use({
				access_token: token
			})
			options = options || {}
			ig.user_self_liked(options, cb, (err, res) => {
				if(err)
			//		console.log(err)
					cb && cb(err, null)
				if(res)
					cb && cb(null, res)
			})	
		}
	})

}
 Meteor.methods({
 	'userData': (userId) => {
		const token = Meteor.call('getAccessToken', userId)
 		if(token) {
 			const url = `https://api.instagram.com/v1/users/self/?access_token=${token}`
 			let result = HTTP.call('GET', url)
 			if(result && result.statusCode == 200) {
 				return result.data
 			}
 		}
 	},
 	'getUserFollowersCount': (userId) => {
 		const user = Meteor.call('userData', userId)
 		if(user && (user.data.counts.followed_by || user.data.counts.followed_by == 0))
 			return user.data.counts.followed_by
 		return false
 	},
 	/**
	 * Get the list of recent media liked by the user
	 * @param userId {string}
	 * @param options object { count,        [opt]
	 *                         max_like_id   [opt] }
	 * @returns {Array}
	 */
 	'getUserMediaLiked': (userId, options) => {
		let getUserMediaLikedAsync = Meteor.wrapAsync(getUserMediaLiked)
		try {
			let result = getUserMediaLikedAsync(userId, options)
			if(result) 
				return result
		}
		catch(e) {
			error = e.toString()
			throw new Meteor.Error(500, error)
		}
 	}


 })