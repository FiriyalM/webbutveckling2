// Globala variabler
var formElem;		// Referens till elementet med hela formuläret
var totalCostElem;	// Referens till elementet för totalpris
var re;			// Array med reguljära uttryck för fälten
var errMsg;		// Array med felmeddelanden
 // Referens till andra span-elementet
// Initiera globala variabler och koppla funktion till knapp

function init(){
			formElem = document.getElementById("booking");
            totalCostElem = document.getElementById("totalCost");
    let i;	// Loopvariabel
	for (i=0; i< formElem.roomType.length; i++) {
        addListener(formElem.roomType[i],"click",checkIfFamilyRoom); //kolla med andra
        addListener(formElem.roomType[i], "click", calculateC);
    }
    for (i=0; i< formElem.roomType.length; i++) {
        addListener(formElem.roomType[i], "click", calculateC);
        addListener(formElem.nights, "change", calculateC);
    }
    addListener(formElem.city, "blur", checkCity);
    
    re = [

		/^[A-ZÅÄÖ]+((-| )[A-ZÅÄÖ]+)*$/i,		// Namn
		/^[A-ZÅÄÖ]+((-| )[A-ZÅÄÖ0-9]+)*$/i,		// Adress
		/^\d{3} ?\d{2}$/,						// Postnummer
		/^[A-ZÅÄÖ]+((-| )[A-ZÅÄÖ]+)*$/i,		// Ort
        /^0\d{1,3}[-/ ]?\d{5,8}$/	            // Telefon

    ];
    errMsg = [
		"Namnet får endast innehålla bokstäverna a-ö, bindestreck och blanktecken.",
		"Adressen får endast innehålla bokstäverna a-ö, siffror, bindestreck och blanktecken.",
		"Postnumret måste bestå av fem siffror.",
		"Orten får endast innehålla bokstäverna a-ö, bindestreck och blanktecken.",
		"Telnr måste börja med en 0:a och sedan 6-11 siffror."
    ]; 
    
    addListener(formElem.campaigncode, "focus", startCheckCampaign);
    addListener(formElem.campaigncode, "keyup", checkCampaign);
    addListener(formElem.campaigncode, "blur", endcheckCampaign);
    formElem.campaigncode.value = " ";

	checkIfFamilyRoom();
    calculateC();
   
} // End init
window.onload = init();

function checkIfFamilyRoom() {
	console.log(formElem.roomType[2].checked);
	if (formElem.roomType[2].checked === true) {
	formElem.persons.disabled = false;
	formElem.persons.parentNode.style.color = "#000";
	
	formElem.addition[2].disabled = true;
	formElem.addition[2].parentNode.style.color = "#999";	
    } 
    else{
    formElem.persons.disabled = true;
    formElem.persons.parentNode.style.color = "#999";

    formElem.addition[2].disabled = false;
    formElem.addition[2].parentNode.style.color = "#000";

    }
}//End checkIfFamilyRoom

function calculateC() {
    let i; 
    let elemValue;
    let roomPrice;
    let nightsIndex;
    let nrOfNights;
    
    for(i=0; i< formElem.roomType.length; i++){
        if(formElem.roomType[i].checked === true){
            elemValue = formElem.roomType[i].value;
            roomPice = Number(elemValue.split(",")[1]);
            break;
        } 
    }

    for(i=0; i< formElem.addition.length; i++){
        if(formElem.addition[i].checked && !formElem.addition[i].disabled){
            elemValue = formElem.addition[i].value;
            roomPice += Number(elemValue.split(",")[1]);
        }
    }

        nightsIndex = formElem.nights.selectedIndex;
        nrOfNights = Number(formElem.nights[nightsIndex].value);
        totalCostElem.innerHTML = nrOfNights * roomPice;
    
} 


function checkCity(){
    let city;
    city = formElem.city.value;
    city = city.toUpperCase;
    formElem.city.value = city;
}

function checkZipcode() {
    checkField(formElem.zipcode,0);
}

function startCheckCampaign(){
    this.style.backgroundColor = "#F99";
    this.select();
}
    
function checkCampaign(){
    if(re.test(tis.value));
  
}

function endcheckCampaign(){
    this.style.backgroundColor = " ";
}

function checkField(field,index) {
    let errMsgElem; 
    
    errMsgElem = this.field.parentNode.getElementsByTagName("span")[1];
    errMsgElem.innerHTML = " ";
    if (!re[index].test(field.value)) {
        errMsgElem.innerHTML = errMsg[index];
        return false;
    }
    else return true;
} // checkField
