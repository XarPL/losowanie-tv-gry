function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var w1 = [];
var w2 = [];
var ryjce = ["szef", "kacper", "hed", "arasz", "jordan", "fanggotten"];
$.ajaxSetup({
    async: false
});
$.getJSON("database.json", function(json) {
    w1 = json.w1;
    w2 = json.w2;
});

var lottSpeed = 50;
var lottTime = 600;
var los1 = true;
var los2 = true;
var los3 = true;
var time = 0;
var modal = document.getElementById('myModal');
var modal_close = document.getElementsByClassName("close")[0];
var losowania = 0;
var specjalne = 0;
var volume = 1;

var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var ryjceDiv = document.getElementById("ryjce");
var progress = document.getElementById("progress");
var stats = document.getElementById("stats");
var keywords = document.getElementById("keywords");

if (localStorage.volume) {
    volume = Number(localStorage.volume);
    document.getElementById("volume").value = volume;
    setVolume(volume);
}
if (localStorage.losowania) {
    losowania = Number(localStorage.losowania);
    specjalne = Number(localStorage.specjalne);
}
keywords.innerHTML = "baza danych maszyny zawiera " + (w1.length + w2.length) + " pozycji (" + (9 * w1.length * w2.length) + " kombinacji)";
stats.innerHTML = "twoje losowania: " + losowania + ", wylosowałeś/aś " + specjalne + " specjalnych tematów";
var started = false;

function download() {

    document.getElementById("img01").innerHTML = "";
    html2canvas(document.getElementById("machine")).then(canvas => {
        canvas.toBlob(function(blob) {
            saveAs(blob, "losowanko_" + losowania + ".png");
        });
    });
}

function setVolume(value) {
    a1.volume = value;
    a2.volume = value;
    a3.volume = value;
    a4.volume = value;
    localStorage.volume = value;
}

function info() {
    modal.style.display = "block";
    var div = document.getElementById("img01");
    document.getElementById("img01").innerHTML = "<div id='about'><h1>o maszynie</h1>legendarna maszyna losujaca teraz dostepna w przegladarce. wylosuj swoj temat, udostępnij go znajomym, redakcji TVGRY, wykorzystaj go jako temat na swoj filmik lub po prostu nic z nim nie rob (najlepiej). #gierki #tvgry #klocuch #losulosu #losowanko</div><h1>tworcy maszyny</h1><ul style='list-style-type:square'><li>ksar - projekt i wykonanie</li><li><a href='https://www.facebook.com/Andrewblage/?ref=bookmarks' target='_blank'>andrju blejdz</a> - pomysl, testy</li><li>ołgon - specjalista ds. rozwoju oprogramowania, testy</li><li>oleła - specjalistka ds. rozrywki, testy z duzym napracowaniem</li><li>tomczak - specjalista ds. zabezpieczen i naduzyc, testy</li><li><a href='https://szymonzak.ovh/' target='_blank'>szmyk</a> - qa engineer</li></ul><h1>podziekowania</h1><ul style='list-style-type:square'><li>Klocuch - inspiracja, dublaż</li><i>Glos klocucha zostal wykorzystany za jego zgoda</i><li>Redakcja TVGRY - inspiracja</li><li>Todd Howard - za wszystkie slodkie klamstwa</li><li>Zespół SoulFire - testy</li><i>lubisz grę Gothic? Sprawdź ich projekt! <a href='https://kronikimyrtany.pl/' target='_blank'>[LINK]</a></i></ul><h1>wsparcie</h2><ul>Kontakt / Dotacje Paypal: stormtrooper69pl@gmail.com<br /><span style='font-size:x-small;'>pieniądze z dotacji będą przeznaczone na utrzymanie strony oraz zakup pićka i gum do żucia (nie lambady)";
    document.getElementById("caption").innerHTML = "";
}

function preview() {
    document.getElementById("img01").innerHTML = "";
    modal.style.display = "block";
    var div = document.getElementById("img01");
    html2canvas(document.getElementById("machine")).then(canvas => {
        div.appendChild(canvas)
    });
    document.getElementById("caption").innerHTML = "Kliknij prawym przyciskiem myszy i wybierz jedną z opcji";
}

function start() {
    if (started == false) {
        started = true;
        a3.pause();
        a4.pause();
        a3.currentTime = 0;
        a4.currentTime = 0;
        b1.innerHTML = "";
        b2.innerHTML = "";
        b3.innerHTML = "";
        a1.play();
        lottSpeed = 50;
        lottTime = 600;
        los1 = true;
        los2 = true;
        los3 = true;
        time = 0;
        setTimeout(losowanko, 3300);

    };
}

function losowanko() {
    a2.play();

    if (los1)
        b1.innerHTML = Math.floor(getRandomArbitrary(2, 11));
    if (los2)
        if (b1.innerHTML == 3) {
            if (Math.floor(getRandomArbitrary(0, 8)) == 1) {
                b2.innerHTML = "wiedzmin 3";
            }
            else {
                b2.innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
            }
        }
        else {
            b2.innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
        }
    if (los3)
        b3.innerHTML = w2[Math.floor(getRandomArbitrary(0, w2.length))];
    ryjceDiv.innerHTML = "temacik dla: <img height='100px' src='img/" + ryjce[Math.floor(getRandomArbitrary(0, ryjce.length))] + ".png'/>";
    time += 1;
    if (time == 80)
        los1 = false;
    if (time == 100)
        los2 = false;
    if (time == 120)
        los3 = false;
    if (los3 == true) {
        progress.innerHTML = "trwa losowanko (" + Math.floor((time / 120) * 100) + "%)";
        setTimeout(losowanko, lottSpeed);
    }
    else {
        progress.innerHTML = "losowanko zakonczone, jeszcze raz?";
        if (b2.innerHTML == w1[7] && b3.innerHTML == w2[21]) {
            a4.src = "sounds/tmsll.mp3"
            a4.play();

            progress.innerHTML = "specjal napędził: Todd Howard <br />oryginał: <a href='https://www.youtube.com/watch?v=yvGXCisAaR4'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b2.innerHTML == w1[25] && b3.innerHTML == w2[35]) {
            a4.src = "sounds/roltest.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Klejnot Nilu & Testoviron <br />oryginał: <a href='https://www.youtube.com/watch?v=4kbpssHwqYc'>Link do YT [+18]</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b1.innerHTML == 5 && b2.innerHTML == w1[0] && b3.innerHTML == w2[0]) {
            a4.src = "sounds/cytryny.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b2.innerHTML == w1[36]) {
            ryjceDiv.innerHTML = "temacik dla: <img height='100px' src='img/szef.png' />";
            a4.src = "sounds/tonasiebie.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b2.innerHTML == w1[1]) {
            ryjceDiv.innerHTML = "temacik dla: <img height='100px' src='img/jordan.png' />";
            a4.src = "sounds/chinskie.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b2.innerHTML == "wiedzmin 3") {
            b3.innerHTML = "najlepszy"
            a4.src = "sounds/3w3.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b2.innerHTML == w1[40] && b3.innerHTML == w2[68]) {
            a4.src = "sounds/to.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Husson Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=sS3xkUyqyUQ'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else if (b2.innerHTML == w1[42] && b3.innerHTML == w2[100]) {
            ryjceDiv.innerHTML = "temacik dla: <img height='100px' src='img/kacper.png />";
            a4.src = "sounds/kruci.mp3"
            a4.play();
            progress.innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=sS3xkUyqyUQ'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
        else {
            a3.play();
        }
        a2.pause();
        a2.currentTime = 0;
        started = false;
        losowania += 1;
        stats.innerHTML = "twoje losowania: " + losowania + ", wylosowałeś/aś " + specjalne + " specjalnych tematów";
        localStorage.losowania = losowania;
        localStorage.specjalne = specjalne;
    }
}
modal_close.onclick = function() {
    modal.style.display = "none";
}