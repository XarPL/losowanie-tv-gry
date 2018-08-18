function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var w1 = [];
var w2 = [];

$.getJSON("database.json", function (json) {
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
if (localStorage.volume) {
	volume = Number(localStorage.volume);
	document.getElementById("volume").value = volume;
	setVolume(volume);
}
if (localStorage.losowania) {
    losowania = Number(localStorage.losowania);
    specjalne = Number(localStorage.specjalne);
}
document.getElementById("keywords").innerHTML = "baza danych maszyny zawiera " + (w1.length + w2.length) + " pozycji (" + (9 * w1.length * w2.length) + " kombinacji)";
document.getElementById("stats").innerHTML = "twoje losowania: " + losowania + ", wylosowałeś/aś " + specjalne + " specjalnych tematów";
var started = false;
function download() {

    document.querySelector("#img01").innerHTML = "";
    html2canvas(document.querySelector("#machine")).then(canvas => {
        canvas.toBlob(function(blob) {
            saveAs(blob,"losowanko_"+losowania+".png");
        });
    });
}
function setVolume(value)
{
	document.getElementById("a1").volume = value;
	document.getElementById("a2").volume = value;
	document.getElementById("a3").volume = value;
	document.getElementById("a4").volume = value;
	localStorage.volume = value;
}
function info() {
    modal.style.display = "block";
    var div = document.querySelector("#img01");
    document.querySelector("#img01").innerHTML = "<div id='about'><h1>o maszynie</h1>legendarna maszyna losujaca teraz dostepna w przegladarce. wylosuj swoj temat, udostępnij go znajomym, redakcji TVGRY, wykorzystaj go jako temat na swoj filmik lub po prostu nic z nim nie rob (najlepiej).</div><h1>tworcy maszyny</h1><ul style='list-style-type:square'><li>ksar - projekt i wykonanie</li><li><a href='https://www.facebook.com/Andrewblage/?ref=bookmarks' target='_blank'>andrju blejdz</a> - pomysl, testy</li><li>ołgon - specjalista ds. rozwoju oprogramowania, testy</li><li>oleła - specjalistka ds. rozrywki, testy z duzym napracowaniem</li><li>tomczak - specjalista ds. zabezpieczen i naduzyc, testy</li><li><a href='https://szymonzak.ovh/' target='_blank'>szmyk</a> - qa engineer</li></ul><h1>podziekowania</h1><ul style='list-style-type:square'><li>Klocuch - inspiracja, dublaż</li><i>Glos klocucha zostal wykorzystany za jego zgoda</i><li>Redakcja TVGRY - inspiracja</li><li>Todd Howard - za wszystkie slodkie klamstwa</li><li>Zespół SoulFire - testy</li><i>lubisz grę Gothic? Sprawdź ich projekt! <a href='https://kronikimyrtany.pl/' target='_blank'>[LINK]</a>";
	document.querySelector("#caption").innerHTML = "";
}
function preview() {
	document.querySelector("#img01").innerHTML = "";
    modal.style.display = "block";
    var div = document.querySelector("#img01");
    html2canvas(document.querySelector("#machine")).then(canvas => {
        div.appendChild(canvas)
    });
	document.querySelector("#caption").innerHTML = "Kliknij prawym przyciskiem myszy i wybierz jedną z opcji";
}

function start() {
    if (started == false) {
        started = true;
        document.getElementById("a3").pause();
        document.getElementById("a4").pause();
        document.getElementById("a3").currentTime = 0;
        document.getElementById("a4").currentTime = 0;
        document.getElementById("b1").innerHTML = "";
        document.getElementById("b2").innerHTML = "";
        document.getElementById("b3").innerHTML = "";
        document.getElementById("a1").play();
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

    document.getElementById("a2").play();
    if (los1)
        document.getElementById("b1").innerHTML = Math.floor(getRandomArbitrary(2, 11));
    if (los2)
		if (document.getElementById("b1").innerHTML == 3 )
		{
			if (Math.floor(getRandomArbitrary(0,8)) == 1)
			{
				document.getElementById("b2").innerHTML = "wiedzmin 3";
			}else{
				document.getElementById("b2").innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
			}
		}else{
			document.getElementById("b2").innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
		}
    if (los3)
        document.getElementById("b3").innerHTML = w2[Math.floor(getRandomArbitrary(0, w2.length))];

    time += 1;
    if (time == 80)
        los1 = false;
    if (time == 100)
        los2 = false;
    if (time == 120)
        los3 = false;
    if (los3 == true) {
        document.getElementById("progress").innerHTML = "trwa losowanko (" + Math.floor((time / 120) * 100) + "%)";
        setTimeout(losowanko, lottSpeed);
    } else {
        document.getElementById("progress").innerHTML = "losowanko zakonczone, jeszcze raz?";
        if (document.getElementById("b2").innerHTML == w1[7] && document.getElementById("b3").innerHTML == w2[21]){
			document.getElementById("a4").src = "sounds/tmsll.mp3"
            document.getElementById("a4").play();
			
            document.getElementById("progress").innerHTML = "specjal napędził: Todd Howard <br />oryginał: <a href='https://www.youtube.com/watch?v=yvGXCisAaR4'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        }
		else if (document.getElementById("b2").innerHTML == w1[25] && document.getElementById("b3").innerHTML == w2[35]) {
			document.getElementById("a4").src = "sounds/roltest.mp3"
			document.getElementById("a4").play();
			document.getElementById("progress").innerHTML = "specjal napędził: Klejnot Nilu & Testoviron <br />oryginał: <a href='https://www.youtube.com/watch?v=4kbpssHwqYc'>Link do YT [+18]</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
		}
		else if (document.getElementById("b1").innerHTML == 5 && document.getElementById("b2").innerHTML == w1[0] && document.getElementById("b3").innerHTML == w2[0]) {
			document.getElementById("a4").src = "sounds/cytryny.mp3"
			document.getElementById("a4").play();
			document.getElementById("progress").innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
		}
		else if (document.getElementById("b2").innerHTML == w1[36]) {
			document.getElementById("a4").src = "sounds/tonasiebie.mp3"
			document.getElementById("a4").play();
			document.getElementById("progress").innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
		}
		else if (document.getElementById("b2").innerHTML == "wiedzmin 3") {
			document.getElementById("b3").innerHTML = "najlepszy"
			document.getElementById("a4").src = "sounds/3w3.mp3"
			document.getElementById("a4").play();
			document.getElementById("progress").innerHTML = "specjal napędził: Klo Cuch <br />oryginał: <a href='https://www.youtube.com/watch?v=H6qsJcALHkM'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
		}
		else {
            document.getElementById("a3").play();
        }
        document.getElementById("a2").pause();
        document.getElementById("a2").currentTime = 0;
        started = false;
        losowania += 1;
        document.getElementById("stats").innerHTML = "twoje losowania: " + losowania + ", wylosowałeś/aś " + specjalne + " specjalnych tematów";
        localStorage.losowania = losowania;
        localStorage.specjalne = specjalne;
    }
}
modal_close.onclick = function() {
    modal.style.display = "none";
}