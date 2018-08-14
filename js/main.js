function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var w1 = ["najlepszych", "chinskich", "polskich", "niemieckich", "rosyjskich", "największych", "najmniejszych", "najsłodszych", "najgłupszych", "losowych", "skandalicznych", "nieprzewidywalnych", "przewidywalnych", "erotycznych", "najgorszych", "podrabianych", "najsłabszych", "najsilniejszych", "najpiękniejszych", "walecznych", "najkrótszych", "najdłuższych", "egzotycznych", "znamienitych", "najstarszych", "najdroższych", "najtańszych", "najdziwniejszych", "najśmieszniejszych", "najciekawszych", "wkurzających", "niemożliwych", "fascynujących", "mrocznych", "żenujących"];
var w2 = ["cytryn w grach", "bajek", "modów", "gier", "filmów", "błędów", "momentów w grach", "reklam", "reklam delmy", "bossów", "owoców", "broni", "pomidorów", "rozłamów w ekipach", "mordobitek", "strzelanek", "misji hitmena", "aktorów", "twórców", "menju w grach", "kłamstw deweloperów", "kłamstw Todda Howarda", "modów do Skyrim", "modów do Gothic", "modów do Wiedźmin 3", "dublaży w grach", "dublaży w filmach", "pomówień", "muzyczek w grach", "muzyczek w filmach", "bananów", "pomarańczy", "postaci z Star Wars", "lokacji w grach", "gadżetów dla graczy"];

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

function preview() {
    modal.style.display = "block";
    var div = document.querySelector("#img01");
    document.querySelector("#img01").innerHTML = "";
    html2canvas(document.querySelector("#machine")).then(canvas => {
        div.appendChild(canvas)
    });
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
        document.getElementById("b1").innerHTML = Math.floor(getRandomArbitrary(2, 10));
    if (los2)
        document.getElementById("b2").innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
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
        if (document.getElementById("b2").innerHTML == w1[7] && document.getElementById("b3").innerHTML == w2[21]) {
            document.getElementById("a4").play();
            document.getElementById("progress").innerHTML = "oryginał: <a href='https://www.youtube.com/watch?v=yvGXCisAaR4'>Link do YT</a><br />losowanko zakonczone, jeszcze raz?";
            specjalne += 1;
        } else {
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