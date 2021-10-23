var TVShow = require('../models/tvshowmodel');

let findAllTVShows = async (req, res, next) => {
    try {
        let tvshows = await TVShow.find({}, {title: 1, genre: 1, year: 1}).sort({title: -1});
        next({tvshows, error: null});
    } catch(err) {
        next({tvshows: null, error: err});
    }
};

let updateTVShows = async(req, res, next) => {
    try{
        let tvshow = await TVShow.updateOne({_id: body.req._id}, req.body);
        next({tvshow, error: null});
    }catch(err){
        next({tvshow: null, error: err});
    }
};

let addTVShows = async (req, res, next) => {
    try{
        let result = await TVShow.findOne({title: req.body.title});
        if(result){
            next({tvshow: null, error:{message: "tvshos already exists", code: 400}});
        }else{
            let tvshow = new TVShow({
                title: req.body.title,
                    year: req.body.year,
                    country: req.body.country,
                    poster: req.body.poster,
                    posterName: req.body.posterName,
                    seasons: req.body.seasons,
                    genre: req.body.genre,
                    summary: req.body.summary
            });
            result = await tvshow.save();
            next({tvshow: result, error: null});
        }
    }catch(err){
        next({tvshow: null, error:err});
    }
};

let findTVShowsById = async (req, res, next) => {
    try {
        let tvshow = await TVShow.findById(req.params.id);
        if (!tvshow) {
            next({tvshow: null, error: {message: "Tvshow not found...", code: 404}});
        } else {
            next({tvshow: tvshow, error: null});    
        }
    } 
    catch(err)
    {
        let result = {tvshow: null, error: err};
        next(result);
    }
};

let deleteTVShows = async (req, res, next) => {
    try {
        let result = await TVShow.deleteOne({_id: req.body._id});
        if (result.deletedCount === 1) {
            next({tvshow: null, error: null });
        } else {
            next({tvshow: tvshow, error: {message: "Tvshow not found...", code: 404}});    
        }
    } 
    catch(err)
    {
        let result = {tvshow: null, error: err};
        next(result);
    }
};

module.exports = {
    findAllTVShows,
    updateTVShows,
    addTVShows,
    findTVShowsById,
    deleteTVShows
}