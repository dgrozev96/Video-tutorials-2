const router = require('express').Router();
const housingService = require('../services/housingService');


router.get('/', async(req, res) => {
    let housings = await housingService.getTopHouses();
    res.render('home', {title: 'Home Page', housings})
});

router.get('/search', async(req, res) => {
    console.log(req.query.text);
    let housings = await housingService.search(req.query.text)
    console.log(housingService.search(req.query.text));
    res.render('search', {title: 'Search Housing', housings})
});

module.exports = router;