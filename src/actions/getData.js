function getData(input, state, output, services) {


    console.log('get data');

    window.fetch('api/get?ip=10.65.6.1&show=desc').then(function(response) {
        return response.text()
    }).then(function(s) {
        output({
            value: JSON.parse(s)
        });
    });




}

export default getData;
