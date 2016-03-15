/**
 * User methods
 */

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
 	}
 })