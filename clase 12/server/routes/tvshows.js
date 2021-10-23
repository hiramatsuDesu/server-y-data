var express = require('express');
var router = express.Router();

const showController = require('../controllers/tvshowctrl');

//Listar todos los tvshows con GET
router.get('/', showController.findAllTVShows, (result, req, res, next) => {
    console.log('GET TVShows');
    res.status(200).render('tvshows', result);
});

router.post('/', showController.addTVShows, (result, req, res, next) => {
    console.log("POST TVShows");
    if (result.error) {
        next(result.error);
    } else {
        res.redirect('/tvshows');
    }
});

router.put('/', showController.updateTVShows, (result, req, res, next) => {
    console.log("PUT TVShows");
    if (result.error) {
        next(result.error);
    } else {
        res.redirect('/tvshows');
    }
});

router.delete('/', showController.deleteTVShows, (result, req, res, next) => {
    console.log("DELETE TVShows BY ID");
    if (result.error) {
        next(result.error);
    } else {
        res.redirect('/tvshows');
    }
});


//FORMULARIOS DE ADD EDIT Y DELETE...
router.get('/add', (req, res, next) => {
    console.log("GET TVShows ADD");
    res.render('tvshowsadd', {});
});

router.get('/edit/:id', showController.findTVShowsById, (result, req, res, next) => {
    console.log("GET TVShows BY ID");
    if (result.error) {
        next(result.error);
    } else {
        res.render('tvshowsedit', { tvshow: result.tvshow});
    }
});

router.get('/delete/:id', showController.findTVShowsById, (result, req, res, next) => {
    console.log("GET TVShows BY ID");
    if (result.error) {
        next(result.error);
    } else {
        res.render('tvshowsdelete', { tvshow: result.tvshow});
    }
});

module.exports = router; 