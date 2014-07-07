var expect = require( 'chai' ).expect;
var supertest = require( 'supertest' );
var api = supertest( 'http://192.168.13.81:3000' );


var authToken =  "Bearer " + process.env.AUTH_TOKEN;


describe( 'add a sensor reading...', function () {

    describe( 'with valid data...', function () {

        it( 'responds with 201 and data', function ( done ) {

            api.post( '/api/sensor' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: 71.6,
                    humidity: 55.3,
                    pressure: 876.3,
                    luminosity: 79.2
                } )
                .expect( 201 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( '_id' );
                    expect( res.body ).to.have.a.property( 'temp_c', 22.0 );
                    expect( res.body ).to.have.a.property( 'temp_f', 71.6 );
                    expect( res.body ).to.have.a.property( 'humidity', 55.3 );
                    expect( res.body ).to.have.a.property( 'pressure', 876.3 );
                    expect( res.body ).to.have.a.property( 'luminosity', 79.2 );

                    done();

                } );

        } );

    } );

    describe( 'with invalid temp_c', function () {

        it( 'responds with 400 and a message', function ( done ) {

            api.post( '/api/sensor' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: "not valid",
                    temp_f: 71.6,
                    humidity: 55.3,
                    pressure: 876.3,
                    luminosity: 79.2
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

            api.post( '/api/sensor' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: "not valid",
                    humidity: 55.3,
                    pressure: 876.3,
                    luminosity: 79.2
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

    describe( 'with invalid humidity', function () {

        it( 'responds with 400 and a message', function ( done ) {

            api.post( '/api/sensor' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: 71.6,
                    humidity: "not valid",
                    pressure: 876.3,
                    luminosity: 79.2
                } )
                .expect( 400 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.include( {
                        "param": "humidity",
                        "msg": "'humidity' must be a float",
                        "value": "not valid"
                    } );

                    done();

                } );

        } );

    } );

    describe( 'with invalid pressure', function () {

        it( 'responds with 400 and a message', function ( done ) {

            api.post( '/api/sensor' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: 71.6,
                    humidity: 55.3,
                    pressure: "not valid",
                    luminosity: 79.2
                } )
                .expect( 400 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.include( {
                        "param": "pressure",
                        "msg": "'pressure' must be a float",
                        "value": "not valid"
                    } );

                    done();

                } );

        } );

    } );

    describe( 'with invalid luminosity', function () {

        it( 'responds with 400 and a message', function ( done ) {

            api.post( '/api/sensor' )
                .set( 'Content-Type', 'application/json' )
                .set( 'Authorization', authToken )
                .send( {
                    temp_c: 22.0,
                    temp_f: 71.6,
                    humidity: 55.3,
                    pressure: 876.3,
                    luminosity: "not valid"
                } )
                .expect( 400 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.include( {
                        "param": "luminosity",
                        "msg": "'luminosity' must be a float",
                        "value": "not valid"
                    } );

                    done();

                } );

        } );

    } );

} );


describe( 'get latest...', function () {

    describe( 'temperature reading...', function () {
        it( 'responds with 200 and data', function ( done ) {
            api.get( '/api/sensor/temperature' )
                .set( 'Content-Type', 'application/json' )
                .expect( 200 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( "_id" );
                    expect( res.body ).to.have.a.property( "date" );
                    expect( res.body ).to.have.a.property( "temp_f" );
                    expect( res.body ).to.have.a.property( "temp_c" );
                    done();

                } );
        } );
    } );

    describe( 'humidity reading...', function () {
        it( 'responds with 200 and data', function ( done ) {
            api.get( '/api/sensor/humidity' )
                .set( 'Content-Type', 'application/json' )
                .expect( 200 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( "_id" );
                    expect( res.body ).to.have.a.property( "date" );
                    expect( res.body ).to.have.a.property( "humidity" );
                    done();

                } );
        } );
    } );

    describe( 'pressure reading...', function () {
        it( 'responds with 200 and data', function ( done ) {
            api.get( '/api/sensor/pressure' )
                .set( 'Content-Type', 'application/json' )
                .expect( 200 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( "_id" );
                    expect( res.body ).to.have.a.property( "date" );
                    expect( res.body ).to.have.a.property( "pressure" );
                    done();

                } );
        } );
    } );

    describe( 'luminosity reading...', function () {
        it( 'responds with 200 and data', function ( done ) {
            api.get( '/api/sensor/luminosity' )
                .set( 'Content-Type', 'application/json' )
                .expect( 200 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( "_id" );
                    expect( res.body ).to.have.a.property( "date" );
                    expect( res.body ).to.have.a.property( "luminosity" );
                    done();

                } );
        } );
    } );

    describe( 'all readings...', function () {
        it( 'responds with 200 and data', function ( done ) {
            api.get( '/api/sensor/all' )
                .set( 'Content-Type', 'application/json' )
                .expect( 200 )
                .end( function ( err, res ) {

                    if ( err ) {
                        return done( err );
                    }

                    expect( res.body ).to.have.a.property( "_id" );
                    expect( res.body ).to.have.a.property( "date" );
                    expect( res.body ).to.have.a.property( "temp_f" );
                    expect( res.body ).to.have.a.property( "temp_c" );
                    expect( res.body ).to.have.a.property( "humidity" );
                    expect( res.body ).to.have.a.property( "pressure" );
                    expect( res.body ).to.have.a.property( "luminosity" );
                    done();

                } );
        } );
    } );

} );
