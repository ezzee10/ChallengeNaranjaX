const { Router } = require('../cases/itineraryCase/itineraryModule')
const router = new Router()
const { get, post, comment, like, checkUser } = require('../cases/itineraryCase/itineraryController')
const passport = require('../passport')

/* Get itineraries */
router.get('/itineraries/all', get.getItineraries)
/* Get itinerarie by city */
router.get('/itineraries/city/:city', get.getItineraryByNameCity)
/* Get itinerarie by city Id*/
router.get('/itineraries/:id', get.getItineraryByCityId)
/* Create a new Itinerarie */
router.post('/itineraries', passport.authenticate('jwt', {session: false}), post.createItinerary)
/* Checkuser by Id*/
router.get('/checkuser/:id', passport.authenticate('jwt', {session: false}), checkUser.checkUser)
/* Like itinerary */
router.get('/like/:id', passport.authenticate('jwt', {session: false}), like.likeItinerary)
/* Create comment in itinerary*/
router.post('/comments/:id',  passport.authenticate('jwt', {session: false}), comment.createComment)
/* Update comment in itinerary*/
router.put('/comment/:id', passport.authenticate('jwt', {session: false}), comment.updateComment)
/* Delete comment in itinerary*/
router.delete('/comment/:id',  passport.authenticate('jwt', {session: false}), comment.deleteComment)




module.exports = router
