export default {
    methods: {
        http(url, method = 'GET', body = {},callback){
            let myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            let myInit = {
                method: method,
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: method === "POST" && JSON.stringify(body)
            };

            let myRequest = new Request( `http://10.11.141.94/${url}`, myInit);

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