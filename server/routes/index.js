var express = require('express');
var router = express.Router();
var tvShows = require('../models/tvshowmodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get de tvshows
router.get('/shows', function(req, res, next){
  tvShows.find({},{}, function(err, tvshows){
    if(err)
    {
      console.log('Error: ' + err.message);
      next(err);
    };
    res.status(200).render('tvshows', {tvshows: tvshows});
    //res.status(200).jsonp(tvshows);
  });
});


//post
router.post('/Shows', function(req, res, next){
  let tvshow = new tvShows({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    posterName: req.body.posterName,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary
  });

  tvshow.save(function(err, tvshow){
    if(err){
      console.log('Error: ' + err.message);
      next(err);
    };
    res.redirect('shows');
  });

});

module.exports = router;
