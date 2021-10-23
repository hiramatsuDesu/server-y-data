var express = require('express');
var router = express.Router();

const showController = require('../../controllers/tvshowctrl');

/*
//Listar todos los tvshows con GET
router.get('/', showController.findAllTVShows, (result, req, res, next) => {
    console.log('GET TVShows');
    res.status(200).jsonp(result);
});
*/


router.route('/')
.get(showController.findAllTVShows, (result, req, res, next) => {
    console.log('GET TVShows');
    if (result.error) {
        res.status(500).jsonp(new httpError(result.error.code, result.error.message));
    } else {
        res.status(200).jsonp(result);
    }
})
.post(showController.addTVShows, (result, req, res, next) => {
    console.log('POST TVShows');
    res.status(200).jsonp(result);
})
.put(showController.updateTVShows, (result, req, res, next) => {
    console.log('PUT TVShows');
    res.status(200).jsonp(result);
});

//Ruteo con ID...
router.route('/:id')
.get(showController.findTVShowsById, (result, req, res, next) => {
    console.log('GET TVShows by ID');
    res.status(200).jsonp(result);
})
.delete(showController.deleteTVShows, (result, req, res, next) => {
    console.log('DELETE TVShows by ID');
    res.status(200).jsonp(result);
});



module.exports = router;