
let myLatLng = { lat: 20.4663, lng: 79.9831 };
let mapOptions = {
    center: myLatLng,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};


let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


let directionsService = new google.maps.DirectionsService();


let directionsDisplay = new google.maps.DirectionsRenderer();


directionsDisplay.setMap(map);


function calcRoute() {
    
    let request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

           
            directionsDisplay.setDirections(result);
        } else {
            
            directionsDisplay.setDirections({ routes: [] });
            
            map.setCenter(myLatLng);

            
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}




let options = {
    types: ['(cities)']
}

let input1 = document.getElementById("from");
let autocomplete1 = new google.maps.places.Autocomplete(input1, options);

let input2 = document.getElementById("to");
let autocomplete2 = new google.maps.places.Autocomplete(input2, options);