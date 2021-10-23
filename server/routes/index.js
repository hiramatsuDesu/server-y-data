var express = require('express');
var router = express.Router();
var tvShows = require('../models/tvshowmodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get de tvshows
router.get('/shows', function(req, res, next){
  tvShows.find({},{title: 1, genre: 1, year: 1}, function(err, tvshows){
    if(err)
    {
      console.log('Error: ' + err.message);
      next(err);
    };
    res.status(200).render('tvshows', {tvshows: tvshows});
    //res.status(200).jsonp(tvshows);
  });
});

router.get('/asincrono', function(res, res, next){
  res.render('asincrono');
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

//router del PUT
router.put('/shows', function(req, res, next){
  //consultamos en la base y la actaulizamos
  tvShows.updateOne({_id: req.body._id}, req.body, function(err, result){
    if(err){
      next(err);
    }
    else{
      res.status(200).redirect('/shows');
    }
  });
});

router.delete('/shows', function(req, res, next){
  tvShows.deleteOne({_id: req.body._id}, function(err, result){
    if(err){
      next(err);
    }else{
      res.status(200).redirect('/shows');
    }
  });
});



//get para formulario de alta
router.get('/shows/add', function(req, res, next){
  res.status(200).render('tvshowsadd', {});

})


//GET para formulario de edicion
router.get('/shows/edit/:id', function(req, res, next){
  let id = req.params.id;
  if(id){
    tvShows.findById(id, function(err, result){
      console.log('GET Tvshow por id: ' + id);
      if(err){
        next(err);
      }else{
        res.status(200).render('tvshowsedit', {tvshow:result});
      }
    });
  }else{
    let error = new Error ('No se encontro el ID');
    next(error);
  }
});


//get del formulario delete
router.get('/shows/delete/:id', function(req, res, next){
  let id = req.params.id;
  if(id){
    tvShows.findById(id, function(err, result){
      console.log('GET Tvshow por id: ' + id);
      if(err){
        next(err);
      }else{
        res.status(200).render('tvshowsdelete', {tvshow:result});
      }
    });
  }else{
    let error = new Error ('No se encontro el ID');
    next(error);
  }
});


module.exports = router;
