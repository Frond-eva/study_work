ymaps.ready(init);

function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error('Геолокация не поддерживается в вашем браузере');
    }
}

function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var myMap = new ymaps.Map("map", {
        center: [latitude, longitude],
        zoom: 13
    });

    var myPlacemark = new ymaps.Placemark([latitude, longitude], {
        hintContent: "Ваше местоположение",
        balloonContent: "Вы здесь"
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        var newPlacemark = new ymaps.Placemark(coords, {
            hintContent: "Метка",
            balloonContent: "Новая метка"
        });

        myMap.geoObjects.add(newPlacemark);

        // Сохраняем новую метку в localStorage
        var savedPlacemarks = JSON.parse(localStorage.getItem('placemarks')) || [];
        savedPlacemarks.push(coords);
        localStorage.setItem('placemarks', JSON.stringify(savedPlacemarks));
    });
}

function error(error) {
    console.log(error);
    var myMap = new ymaps.Map("map", {
        center: [55.751574, 37.573856],
        zoom: 13
    });
}


