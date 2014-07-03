var expect = require( 'chai' ).expect;
var supertest = require( 'supertest' );
var api = supertest( 'http://192.168.13.81:3000' );


describe( 'get temperature chart', function () {

    it( 'responds with 200 and data', function ( done ) {

        api.get( '/api/chart/temperature' )
            .set( 'Content-Type', 'application/json' )
            .expect( 200 )
            .end( function ( err, res ) {

                if ( err ) {
                    return done( err );
                }

                expect( res.body ).to.be.an( 'array' ).with.length.above( 0 );
                expect( res.body[0] ).to.have.a.property( "_id" );
                expect( res.body[0] ).to.have.a.property( "temp_c" );
                expect( res.body[0] ).to.have.a.property( "temp_f" );

                done();

            } );

    } );

} );


describe( 'get humidity chart', function () {

    it( 'responds with 200 and data', function ( done ) {

        api.get( '/api/chart/humidity' )
            .set( 'Content-Type', 'application/json' )
            .expect( 200 )
            .end( function ( err, res ) {

                if ( err ) {
                    return done( err );
                }

                expect( res.body ).to.be.an( 'array' ).with.length.above( 0 );
                expect( res.body[0] ).to.have.a.property( "_id" );
                expect( res.body[0] ).to.have.a.property( "humidity" );

                done();

            } );

    } );

} );


describe( 'get pressure chart', function () {

    it( 'responds with 200 and data', function ( done ) {

        api.get( '/api/chart/pressure' )
            .set( 'Content-Type', 'application/json' )
            .expect( 200 )
            .end( function ( err, res ) {

                if ( err ) {
                    return done( err );
                }

                expect( res.body ).to.be.an( 'array' ).with.length.above( 0 );
                expect( res.body[0] ).to.have.a.property( "_id" );
                expect( res.body[0] ).to.have.a.property( "pressure" );

                done();

            } );

    } );

} );


describe( 'get luminosity chart', function () {

    it( 'responds with 200 and data', function ( done ) {

        api.get( '/api/chart/luminosity' )
            .set( 'Content-Type', 'application/json' )
            .expect( 200 )
            .end( function ( err, res ) {

                if ( err ) {
                    return done( err );
                }

                expect( res.body ).to.be.an( 'array' ).with.length.above( 0 );
                expect( res.body[0] ).to.have.a.property( "_id" );
                expect( res.body[0] ).to.have.a.property( "luminosity" );

                done();

            } );

    } );

} );
