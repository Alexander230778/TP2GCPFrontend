export default {
    methods: {
        http( pathName, method = 'GET', body = {}, callback, callbackError ) {

            let _url = `https://upctp3-des.azurewebsites.net/${pathName}`;
            if ( method === 'GET' ) {
                _url = new URL( _url );
                Object.keys( body ).forEach( key => _url.searchParams.append( key, body[key] ) )
            }

            let myHeaders = new Headers();

            myHeaders.append( "Content-Type", "application/json" );

            let myInit = {
                method: method,
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            };

          if (method === 'POST') {
            myInit.body = JSON.stringify( body );
          }

            let myRequest = new Request( _url, myInit );

            fetch( myRequest )
                .then( function ( response ) {
                    return response.json()
                } )
                .then( function ( response ) {
                    callback( response )
                } ).catch( ( e ) => {
                callbackError(e)
            } );
        }
    }
}