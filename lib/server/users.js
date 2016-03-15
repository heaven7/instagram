/**
 * User methods
 */

 Meteor.methods({
 	'userSelf': (userId) => {
 		const user = Meteor.users.findOne(userId)
 		const accessToken = user.services.instagram.accessToken
 		if(accessToken) {
 			
 		}
 	}
 })