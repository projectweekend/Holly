var expect = require( 'chai' ).expect;
var supertest = require( 'supertest' );
var api = supertest( 'http://192.168.13.81:3000' );


var authToken =  "Bearer " + process.env.AUTH_TOKEN;


describe( 'add a system temperature reading...', function () {

    describe( 'with valid data...', function () {

        it( 'responds with 201 and data', function ( done ) {

            api.post( '/api/raspberry-pi' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: 71.6
                } )
                .expect( 201 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( '_id' );
                    expect( res.body ).to.have.a.property( 'temp_c', 22.0 );
                    expect( res.body ).to.have.a.property( 'temp_f', 71.6 );

                    done();

                } );

        } );

    } );

    describe( 'with invalid temp_c', function () {

        it( 'responds with 400 and a message', function ( done ) {

            api.post( '/api/raspberry-pi' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: "not valid",
                    temp_f: 71.6
                } )
                .expect( 400 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.include( {
                        "param": "temp_c",
                        "msg": "'temp_c' must be a float",
                        "value": "not valid"
                    } );

                    done();

                } );

        } );

    } );

    describe( 'with invalid temp_f', function () {

        it( 'responds with 400 and a message', function ( done ) {

            api.post( '/api/raspberry-pi' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: "not valid"
                } )
                .expect( 400 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.include( {
                        "param": "temp_f",
                        "msg": "'temp_f' must be a float",
                        "value": "not valid"
                    } );

                    done();

                } );

        } );

    } );

} );
