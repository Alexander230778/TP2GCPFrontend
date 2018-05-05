export default {
    methods: {
        http(pathName, method = 'GET', body = {},callback){

            let _url = `http://192.168.1.8/${pathName}`;
            if(method === 'GET'){
                _url = new URL(_url);
                Object.keys(body).forEach(key => _url.searchParams.append(key, body[key]))
            }

            let myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            let myInit = {
                method: method,
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: method === "POST" && JSON.stringify(body)
            };

            let myRequest = new Request( _url, myInit);

            fetch(myRequest)
                .then(function(response) {
                    return response.json()
                })
                .then(function ( response ) {
                    callback(response)
                });
        }
    }
}