// JavaScript

/**
 * Globala variabler.
 * selectedWord - Array med ett antal ord, där man sedan väljer ett slumpmässigt.
 * wordList - Det ord som valts slumpmässigt och som användaren ska gissa på.
 * letterBoxes - Array med referenser till de span-taggar som utgör rutor för bokstövrtna i ordet.
 * hangmanImg - Referens till img.elementet med bilden för galgen och gubben.
 * hangmanImhNr - Nummer fler aktuell bil (0-6), för den bildfil som visas (så man sedan kan veta vilket som blir nästa bild).
 * msgElem - Referens till div-elementet för meddelanden.
 * 
 */
var selectedWord; 
var wordList; 
var letterBoxes; 
var hangmanImg;
var hangmanImgNr; 
var msgElem; 
var startGamebtn;
var letterButtons;
var startTime;

/**
 * Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
 * Initiering av globala variabler samt koppling av funktioner till knapparna.
 */
function init() {

	var i; //loopvariabel

	startGamebtn = document.getElementById("startGameBtn"); //Referens till startknappen.
	startGamebtn.onclick = startGame;//Array med referenser till bokstavsknapparna.

	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
	for (i=0; i < letterButtons.length; i++) letterButtons[i].onclick = guessLetter;

	hangmanlmg = document.getElementById("hangman");
	msgElem = document.getElementById("message");
	

	wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
				"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
				"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];
	
	changeButtonActivation(true);

} // End init
window.onload = init; //Den ser till att init akrivieras då sidan är inladdad.

/**
 * Initiera ett nytt spel. 
 * Välj ord.
 * Visa första bilden (tom bild) och sätt bild nummer till 0.
 */
function startGame(){
	
	randomWord(); 
	showLetterBoxes(); 
	hangmanImg.src = "./pics/h0.png"; 
	hangmanImgNr = 0; 
	changeButtonActivation(false); 
	msgElem.innerHTML = ""; 

	now = new Date();
	startTime = now.getTime();

	
}//End startGame

// Går igenom valt ord och skapa en kod med ett såan-elemebt för varje bokstav.
 
function showLetterBoxes(){

	var newCode;
	var i;
	
	newCode = "";

	for(i = 0; i  <selectedWord.length; i++){

		newCode += "<span>&nbsp;</span>";
	}

	document.getElementById("letterBoxes").innerHTML = newCode;
	letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");

}

/**
 * Väljer ord slumpmässigt.
 * Väljer mellan 0 och antal ord i den listan vi har i wordList.
 */
function randomWord(){

	var wordIndex;

	wordIndex = Math.floor(wordList.length*Math.random());
	selectedWord = wordList[wordIndex];

}

/**
 * Gå igenom alla bokstäver i ordet och kontrollera om vald bokstav finns. Notera att det kan finnas en bokstav flera gånger i ordet.
 	* I såfall skrivs den in i motsvarande ruta.
 * Om bokstaven ej finns, byts bilden till nästa bild.
 */
function guessLetter(){

	this.disabled = true;
	console.log(this.value);
	var letter;
	var i;
	var letterFound;
	var correctLettersCount;

	letter = this.value;
	letterFound = false;
	correctLettersCount = 0;

	for(i = 0; i <selectedWord.length; i++){
		if(letter == selectedWord.charAt(i)){
			letterFound = true;
			letterBoxes[i].innerHTML = letter;
		}

		if(letterBoxes[i].innerHTML != "&nbsp;") {
			correctLettersCount++;
		}

	}
	if(letterFound == false){
		hangmanImgNr++;
		hangmanImg.src = "./pics/h" + hangmanImgNr + ".png";
		 //Efter man har valt fel bokstav kommer nästa bild up. Det fortsätter tills gubben hängs.
		 //Det vill säga efter 6 försök.
		 
		if(hangmanImgNr == 6){
			endGame(true);
		}
	}
	else if (correctLettersCount == selectedWord.length){
		endGame(false);
	}

}//Enf guessletter

/**
 * Om man då den sista bilden visas up avslutas spelet med hängd gubbe.
 * Meddelarna kommer upp. Dock får man två olika meddelande berode på om man har gissat rätt eller om gubben höngdes.
 * @param {*} manHang 
 */
function endGame(manHang){
	var now;
	var runTime;

	now = new Date();
	runTime = (now.getTime() - startTime)/ 1000;

	if (manHang == true){
		msgElem.innerHTML = "Gubben hängdes, rätt ord är: " + selectedWord;
	}else {msgElem.innerHTML = "Det var rätt ord! ";

	}

	changeButtonActivation(true);
}//End endGame

/**
 * Funktion för att akrivera och avakrivera knappar,
 * @param {*} status 
 * Om en bokstav vals då kommer den bokstaven avlåsas ur button - elementets value-attribut.
 */
function changeButtonActivation(status){

	if (status == true){
		startGamebtn.disabled = false;
	
		for(i = 0; i <letterButtons.length; i++){
			letterButtons[i].disabled = true;
		}
	}else {
		startGamebtn.disabled = true;
		for (i = 0; i <letterButtons.length; i++){
		letterButtons[i].disabled = false;
		}
	}
}



