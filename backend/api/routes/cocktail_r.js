/*** IMPORT */
const express = require('express')
const cocktailCtrl = require('../controllers/cocktail_c')
const checkToken = require('../middleware/checkJwt')
const rateLimit = require('express-rate-limit') // Import rate limiter

/*** EEXPRESS ROUTER */
let router = express.Router()

/*** RATE LIMITER */
const deleteRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 delete requests per minute
  message: "Too many delete requests from this IP, please try again later."
})

/*** COCKTAIL ROUTAGE */
router.get('/', cocktailCtrl.getAllCocktails)
router.get('/:id([0-9]+)', cocktailCtrl.getCocktail)

router.put('/', checkToken, cocktailCtrl.addCocktail)
router.patch('/:id([0-9]+)', checkToken, cocktailCtrl.modifyCocktail)

router.delete('/:id([0-9]+)', checkToken, deleteRateLimiter, cocktailCtrl.deleteCocktail)

module.exports = router