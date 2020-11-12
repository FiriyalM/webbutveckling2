// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const carImgs = ["car_up.png","car_right.png","car_down.png","car_left.png"];
						// Array med filnamn för bilderna med bilen 
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
/* === Tillägg i uppgiften === */
let pigElem;			// Referens till img-element för vilsvinet
let pigTimerRef = null;
const pigDuration = 2000; //Tid i ms mellan varje vildsvin 
let pigNr; //Antal vildsvin som kommer upp innan spelet stannar
let hitCounter; // Antal poäng man för efter bilen ha kol
		//Nollställs i Startgame()
let pigNrElem;
let hitCounterElem;  
let catchedPig; //Variable för när man ha fångat vildsvinet
		//ref i init()
		//pigNr kopplas med pigNrElem och hitCounter kopplas med hitCounterElem

// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
	// Referenser till element i gränssnittet
		boardElem = document.getElementById("board");
		carElem = document.getElementById("car");
		startBtn = document.getElementById("startBtn");
		stopBtn = document.getElementById("stopBtn");
	// Lägg på händelsehanterare
		document.addEventListener("keydown",checkKey);
			// Känna av om användaren trycker på tangenter för att styra bilen
		startBtn.addEventListener("click",startGame);
		stopBtn.addEventListener("click",stopGame);
	// Aktivera/inaktivera knappar
		startBtn.disabled = false;
		stopBtn.disabled = true;
	/* === Tillägg i uppgiften === */
		pigElem = document.getElementById("pig");
		pigNrElem = document.getElementById("pigNr");
		hitCounterElem = document.getElementById("hitCounter");
		
 
} // End init
window.addEventListener("load",init);
// ------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) {
	let k = e.keyCode;
	switch (k) {
		case 37: // Pil vänster
		case 90: // Z
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case 39:  // Pil höger
		case 173: // -
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // End checkKey
// ------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();
	/* === Tillägg i uppgiften === */
	pigTimerRef = setTimeout(newPig,pigDuration);
	pigNr = 0;
	hitCounter = 0;
	catchedPig = true;
} // End startGame
// ------------------------------
// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	startBtn.disabled = false;
	stopBtn.disabled = true;
	/* === Tillägg i uppgiften === */
	if(pigTimerRef != null) clearTimeout(pigTimerRef);
	pigElem.style.visibility = "hidden";


} // End stopGame
// ------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar,timerStep);
	/* === Tillägg i uppgiften === */
	checkIt(); // anropar till funktionen

} // End moveCar
// ------------------------------

/* === Tillägg av nya funktioner i uppgiften === */

function newPig() {
	let xLimit = boardElem.offsetWidth - pigElem.offsetWidth - 20;
	let yLimit = boardElem.offsetHeight - pigElem.offsetHeight - 20;
	
	if(pigNr < 10){//Max antal vildsvin
	pigNr ++;
	pigNrElem.innerHTML = pigNr;
	
	catchedPig = false; //Kollar om vildsvinet är "fångad"
	
	let  x = Math.floor(xLimit*Math.random()) + 10;//Var 
	let  y = Math.floor(yLimit*Math.random()) + 10;
	pigElem.style.left =  x + "px";
	pigElem.style.top =  y + "px";
	pigElem.src = "img/pig.png";
	pigElem.style.visibility = "visible";
	pigTimerRef = setTimeout(newPig,pigDuration);

	}else{
		stopGame();
	}
}
// ------------------------------
function checkIt(){
	if(catchedPig) return;	//
	/* === Kollision mellan bilen och vildsvinet === */
	let cSize = carElem.offsetWidth;
	let pSize = pigElem.offsetWidth;
	let cL = parseInt(carElem.style.left);
	let cT = parseInt(carElem.style.top);
	let pL = parseInt(pigElem.style.left);
	let pT = parseInt(pigElem.style.top);

	if(cL + 10 < pL + pSize && cL + cSize - 10 > pL && cT + 10 < pT + pSize && cT + cSize - 10 > pT){
		clearTimeout(pigTimerRef);
		hitCounter ++; //räknar upp hitCounter
		hitCounterElem.innerHTML = hitCounter; //skriver upp värdet
		catchedPig = true;	//
		pigElem.src = "img/smack.png"; 	//
		pigTimerRef = setTimeout(newPig,pigDuration);	//
		
	}

}