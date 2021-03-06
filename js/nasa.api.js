var apiKey = "api_key=cyAK67LdM89ZCmcrxQ51qIdodB3et6E8fYUhW0MO";

function init() {
    var textBox = "?hd=true&" + apiKey;
    var req = new XMLHttpRequest;
    req.open("GET", "https://api.nasa.gov/planetary/apod" + textBox, true);

    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            if (response["media_type"] === "image") {
                $('#video').css('display', 'none');
                document.getElementById('image').src = response["url"];
            } else {

                $('#image').css('display', 'none');
                document.getElementById('video').src = response["url"];
            }
            if("copyright" in response) {
                document.getElementById('author').textContent = 'by ' + response["copyright"];
            } else {
                document.getElementById('author').textContent = "Public Domain";
            }
            document.getElementById('title').textContent = response["title"];
            document.getElementById('explanation').textContent = response["explanation"];
            document.getElementById('date').textContent = response["date"];
        }
    });

    req.send(null);
}

function getData() {
    resetData();
    var textBox = "";

    if (document.getElementById("qDate").value.length != 0) {
        console.log(document.getElementById("qDate").value);
        textBox = "?date=";
        textBox += document.getElementById("qDate").value;
        textBox += "&" + apiKey;
    } else {
        textBox = "?" + apiKey;
    }

    var req = new XMLHttpRequest;
    req.open("GET", "https://api.nasa.gov/planetary/apod" + textBox, true);

    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            if (response["media_type"] === "video") {
                var newVideo = document.createElement("iframe");
                newVideo.id = "video";
                newVideo.src = response["url"];
                document.body.insertBefore(newVideo, document.body.firstChild);
            } else {
                document.getElementById('pic').src = response["url"];
            }
            document.getElementById('title').textContent = response["title"];
            document.getElementById('date').textContent = response["date"];
            document.getElementById('explanation').textContent = response["explanation"];
        } else {
            document.getElementById('explanation').textContent = req.responseText;
            document.getElementById('date').textContent = req.status;
        }
    });

    req.send(null);
}

function resetData() {
    document.getElementById('pic').src = '';
    document.getElementById('title').textContent = "";
    document.getElementById('explanation').textContent = "";
    document.getElementById('date').textContent = "";
    if (document.getElementById('video')) {
        var removeMe = document.getElementById('video');
        removeMe.parentNode.removeChild(removeMe);
    }
}
