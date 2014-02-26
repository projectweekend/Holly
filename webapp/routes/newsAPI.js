var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.newsSourceConfig = function ( req, res ) {

    if ( req.method == 'GET' ) {

        var q = NewsSourceConfig.find( ).sort( {category: 1, url: 1} );

        q.exec( function ( err, data ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.json( data );

        } );

    }

    if ( req.method == 'POST' ) {

        var newConfigItem = {
            date: new Date(),
            url: req.body.url
        };

        NewsSourceConfig.create( newConfigItem, function ( err, configItemData) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.send( 201 );

        } );

    }

    if ( req.method == 'PUT' ) {

        var update = {
            $set: {
                url: req.body.url
            }
        };
        var callback = function ( err, updatedItem ) {
            
            if ( err ) {
                return errorHandler( err, res );
            }

            res.json( updatedItem );

        };

        NewsSourceConfig.findByIdAndUpdate( req.body._id, update, callback );

    }

    if ( req.method == 'DELETE' ) {

        NewsSourceConfig.findById( req.query.id, function ( err, itemToDelete ) {
            
            if ( err ) {
                return errorHandler( err, res );
            }

            itemToDelete.remove();
            res.send( 200 );
            
        } );

    }

};


exports.newsArticles = function ( req, res ) {

    if (  req.query.id ) {
        
        NewsArticle.findById( req.query.id, function ( err, data ) {
            
            if ( err ) {
                return errorHandler( err, res );
            }

            res.json( data );

        } );

    } else {
        
        var q = NewsArticle.find();
        q.exec( function ( err, data ) {
            
            if ( err ) {
                return errorHandler( err, res );
            }

            res.json( data );

        } );
    }

};


// Used in readArticle and ignoreArticle routes
var updateWordScore = function ( wordToUpdate, scoreIncrement, callback ) {
    wordToUpdate.score += scoreIncrement;
    wordToUpdate.save( function ( err ) {
        if ( err ) {
            callback( err );
        } else {
            callback();
        }
    } );
};


// Used in readArticle and ignoreArticle routes
var addNewKeyWord = function ( newKeyword, startingScore, callback ) {
    NewsArticleKeyword.create({word: newKeyword, score: startingScore}, function ( err, newKeyword ) {
        if ( err ) {
            callback( err );
        } else {
            callback();
        }
    });
};

// Used in readArticle and ignoreArticle routes
var removeArticle = function ( articleID ) {
    NewsArticle.findById( articleID, function ( err, article ) {
        if ( err ) {
            return next( errorHandler( err, res ) );
        } else {
            article.remove();
        }
    } );
};


exports.readArticle = function ( req, res ) {

    // Take a keyword as input and return a function that can be used in 
    // async.parallel call
    var buildAsyncCallback = function ( word ) {
        
        return function ( callback ) {
            var q = NewsArticleKeyword.findOne( {word: word} );
            q.exec( function ( err, wordToUpdate ) {
                
                if ( err ) {
                    callback( err );
                } else {
                    if ( wordToUpdate ) {
                        updateWordScore( wordToUpdate, 1, callback );
                    } else {
                        addNewKeyWord( word, 1, callback );
                    }
                }

            } );
        };

    };

    var keywords = req.body.keywords;
    var asyncTaskList = keywords.map( buildAsyncCallback );

    async.parallel( asyncTaskList, function ( err ) {
        if ( err ) {
            return next( errorHandler( err, res ) );
        }
        removeArticle( req.body._id );
        return res.send( 200 );
    } );

};


exports.ignoreArticle = function ( req, res ) {

    // Take a keyword as input and return a function that can be used in 
    // async.parallel call
    var buildAsyncCallback = function ( word ) {
        
        return function ( callback ) {
            var q = NewsArticleKeyword.findOne( {word: word} );
            q.exec( function ( err, wordToUpdate ) {
                
                if ( err ) {
                    callback( err );
                } else {
                    if ( wordToUpdate ) {
                        updateWordScore( wordToUpdate, -1, callback );
                    } else {
                        addNewKeyWord( word, -1, callback );
                    }
                }

            } );
        };

    };

    var keywords = req.body.keywords;
    var asyncTaskList = keywords.map( buildAsyncCallback );

    async.parallel( asyncTaskList, function ( err ) {
        if ( err ) {
            return next( errorHandler( err, res ) );
        }
        removeArticle( req.body._id );
        return res.send( 200 );
    } );

};


exports.articleKeywords = function ( req, res ) {

    NewsArticleKeyword.find( {}, function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res );
        }

        res.json( data );

    } );

};
