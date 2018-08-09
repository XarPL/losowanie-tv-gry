function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var w1 = ["najlepszych", "chinskich", "polskich", "niemieckich", "rosyjskich", "największych", "najmniejszych", "najsłodszych", "najgłupszych", "losowych", "skandalicznych", "nieprzewidywalnych", "erotycznych", "najgorszych", "podrabianych", "najsłabszych", "najsilniejszych"];
var w2 = ["cytryn w grach", "bajek", "modów", "gier", "filmów", "błędów", "momentów w grach", "reklam", "reklam delmy", "bossów", "owoców", "broni", "pomidorów"];

var lottSpeed = 50;
var lottTime = 600;
var los1 = true;
var los2 = true;
var los3 = true;
var time = 0;
function start()
{
	document.getElementById("b1").innerHTML = "";
	document.getElementById("b2").innerHTML = "";
	document.getElementById("b3").innerHTML = "";
	document.getElementById("a1").play();
	lottSpeed = 50;lottTime = 600;los1 = true;los2 = true;los3 = true;time = 0;
	setTimeout(losowanko, 3300);
}
function losowanko ()
{
	
	document.getElementById("a2").play();
	if (los1)
	document.getElementById("b1").innerHTML = Math.floor(getRandomArbitrary(2, 10));
	if (los2)
	document.getElementById("b2").innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
	if (los3)
	document.getElementById("b3").innerHTML = w2[Math.floor(getRandomArbitrary(0, w2.length))];
	time += 1;
	if(time == 21)
	{
		los1 = false;
	}
	if(time == 24)
	{
		los2 = false;
	}
	if(time == 27)
	{
		los3 = false;
	}
	if (lottSpeed < lottTime)
	{
		document.getElementById("progress").innerHTML = "trwa losowanko (" + Math.floor((lottSpeed/lottTime)*100) + "%)";
		setTimeout(losowanko, lottSpeed);
		lottSpeed += lottSpeed*0.1;
	}else{
		document.getElementById("progress").innerHTML = "losowanko zakonczone, jeszcze raz?";
		document.getElementById("a3").play();
	}
}
