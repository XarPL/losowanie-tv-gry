function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var w1 = ["najlepszych", "chinskich", "polskich", "niemieckich", "rosyjskich", "największych", "najmniejszych", "najsłodszych", "najgłupszych", "losowych", "skandalicznych", "nieprzewidywalnych", "erotycznych", "najgorszych", "podrabianych", "najsłabszych", "najsilniejszych"];
var w2 = ["cytryn w grach", "bajek", "modów", "gier", "filmów", "błędów", "momentów w grach", "reklam", "reklam delmy", "bossów", "owoców", "broni", "pomidorów"];

var lottSpeed = 50;
var lottTime = 500;
losowanko()
function losowanko ()
{
	document.getElementById("b1").innerHTML = Math.floor(getRandomArbitrary(2, 10));
	document.getElementById("b2").innerHTML = w1[Math.floor(getRandomArbitrary(0, w1.length))];
	document.getElementById("b3").innerHTML = w2[Math.floor(getRandomArbitrary(0, w2.length))];
	
		
	if (lottSpeed < lottTime)
	{
		document.getElementById("progress").innerHTML = "trwa losowanko (" + Math.floor((lottSpeed/lottTime)*100) + "%)";
		setTimeout(losowanko, lottSpeed);
		lottSpeed += lottSpeed*0.1;
	}else{
		document.getElementById("progress").innerHTML = "losowanko zakonczone";
	}

	
}
