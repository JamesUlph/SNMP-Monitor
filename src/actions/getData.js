function getData(ipaddress, show) {

    return function get(input, state, output, services) {


        console.log('get data for ip', ipaddress);
        console.log(input);

        let g = `api/get?ip=${input.ipaddress}&show=${show}`;
        console.log(g);
        window.fetch(g).then(function(response) {
            return response.text()
        }).then(function(s) {

            output.success({
                value: JSON.parse(s)
            });

        }).catch(function(s) {
            output.error({
                value: null
            });
        });




    }
}


export default getData;
