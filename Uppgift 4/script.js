let input1Element, input2Element, resultElement;
function init(){
        input1Element=document.getElementById("input1");
        input2Element=document.getElementById("input2");
        resultElement=document.getElementById("result");
        document.getElementById("runBtn").onclick=doCalculations;
} //End init
window.onload=init;

function doCalculations(){
    let length; //Längd i meter
    let width; //Bredd i meter
    let area; //Yta i kvadratmeter
    let distance; //längd konverterad till anna enhet
    let unit = [" steg", " fot", " tum"];
    let conv = [90, 30.48, 2.54];

    length = Number(input1Element.value);
    width = Number(input2Element.value);
    area = length * width;

    resultElement.innerHTML = "<p>Rektangelns area blir "+ area + "m<sup>2</sup>.</p>"

    area = 3.14159 * length * width / 4;

    
    resultElement.innerHTML += "<p>Ellipsens area blir "+ area + "m<sup>2</sup>.</p>"
    resultElement.innerHTML += "<p>Längden " + length + " meter blir:</p>";
    distance = length / conv [0] * 100;
    resultElement.innerHTML += "<p>" + distance + "" + unit[0] + "</p>";
    distance = length / conv [1] * 100;
    resultElement.innerHTML  += "<p>" + distance + "" + unit[1] + "</p>"; 
    distance = length /conv [2] * 100;
    resultElement.innerHTML  += "<p>" + distance + "" + unit[2] + "</p>"; 

 
}