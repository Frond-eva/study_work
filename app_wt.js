fetch('https://api.openweathermap.org/data/2.5/weather?q={Omsk}&appid={ a8a4f533337b1b9090c9d61997ae1874}&units=metric')
    .then(response => response.json())
    .then(data => {
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('currentDateTime').innerText = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        document.getElementById('weatherDescription').innerText = data.weather[0].description;
        document.getElementById('minTemp').innerText = data.main.temp_min + "°C";
        document.getElementById('maxTemp').innerText = data.main.temp_max + "°C";
        document.getElementById('humidity').innerText = "Влажность: " + data.main.humidity + "%";
        document.getElementById('windSpeed').innerText = "Ветер: " + data.wind.speed + " км/ч";
    })
    .catch(err => {
        console.log(err);
    });



document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    
    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var image = new Image();
            image.src = e.target.result;
            
            image.onload = function() {
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = image.width;
                canvas.height = image.height;
                
                ctx.drawImage(image, 0, 0);
            }
        }
        
        reader.readAsDataURL(file);
    }
});

// Функция добавления события
function addEvent(event) {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

// Функция отображения предстоящих событий
function displayEvents() {
    var events = JSON.parse(localStorage.getItem('events')) || [];
    var eventsContainer = document.getElementById('events');
    
    eventsContainer.innerHTML = '';

    events.forEach(function(event) {
        var eventElement = document.createElement('div');
        eventElement.innerHTML = `<strong>${event.name}</strong> - ${event.datetime}`;

        eventsContainer.appendChild(eventElement);
    });
}

// Функция добавления события в расписание
function addToSchedule(event) {
    var schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    schedule.push(event);
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Функция отображения расписания
function displaySchedule() {
    var schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    var scheduleContainer = document.getElementById('schedule');
    
    scheduleContainer.innerHTML = '';

    schedule.forEach(function(event) {
        var eventElement = document.createElement('li');
        eventElement.textContent = event.name;

        scheduleContainer.appendChild(eventElement);
    });
}

// Обработчик отправки формы добавления события
document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var eventName = document.getElementById('eventName').value;
    var eventDateTime = document.getElementById('eventDateTime').value;

    var event = {
        name: eventName,
        datetime: eventDateTime
    };
    
    addEvent(event);
    displayEvents();
    
    addToSchedule(event);
    displaySchedule();

    // Очищаем поля формы после добавления события
    document.getElementById('eventName').value = '';
    document.getElementById('eventDateTime').value = '';
});

// Отображаем предстоящие события и расписание при загрузке страницы
window.onload = function() {
    displayEvents();
    displaySchedule();
};
