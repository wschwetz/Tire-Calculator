const widthMaxMM = 400;
const widthMinMM = 105;
const aspectMax = 100;
const aspectMin = 5;
const rimMax = 30;
const rimMin = 13;

const widthMaxIn = 54;
const widthMinIn = 20;

let inchToMm = (num) => {
    return num * 25.4;
}

let mmToInch = (num) => {
    return num * 0.0393701;
}

let calcDiameter = (sectionWidth, aspectRatio, rim) => {
     return inchToMm(rim) + (2 * ((aspectRatio/100) * sectionWidth));
}

let calcCircum = (diameter) => {
    return 2 * (diameter/2) * 3.141593;
}

let calcPercentDifference = (originalNum, newNum) => {
    return  ((1 - (originalNum/newNum)) * 100) * -1;
}

let displayData = (stringName, valueToDisplay, displayModeChoice) => {
    if( displayModeChoice == 1 ){
        document.getElementById(stringName).innerHTML = valueToDisplay +"mm (" + mmToInch(valueToDisplay).toFixed(2) +"\")";
    }
    else if( displayModeChoice == 2 ) document.getElementById(stringName).innerHTML = valueToDisplay;
    else if( displayModeChoice == 3 ){
        document.getElementById(stringName).innerHTML = mmToInch(valueToDisplay).toFixed(2);
    }
}

function validateInput(userDataIn, maxNum, minNum){
    if( isNaN(userDataIn) ) return false;
    else{
        if ( userDataIn >= minNum && userDataIn <= maxNum ) return true;
        else return false;
    }
}


let btnClickBegin = () => {
    var allsGoodFlag = true;
    let currentWidth = parseFloat(document.getElementById("currentWidth").value);
    let currentAspect = parseFloat(document.getElementById("currentAspect").value);
    let currentRim = parseFloat(document.getElementById("currentRim").value);
    let newWidth = parseFloat(document.getElementById("newWidth").value);
    let newAspect = parseFloat(document.getElementById("newAspect").value);
    let newRim = parseFloat(document.getElementById("newRim").value);
    var currentDiameter = 0;
    var currentCircum = 0;
    var newDiameter = 0;
    var newCircum = 0;
    var currentSidewallHeight = 0;
    var newSidewallHeight = 0;

    if( currentWidth <= widthMaxIn && currentWidth >= widthMinIn ){
        if( isNaN(currentWidth) ) {
            allsGoodFlag = false;
        }
        else{
            currentDiameter = inchToMm(currentWidth);
            currentWidth = inchToMm(currentAspect);
            currentRim = inchToMm(currentRim);
            currentSidewallHeight = (currentDiameter - currentRim) / 2;
            currentAspect = (currentSidewallHeight / currentWidth) * 100;
            currentCircum = calcCircum(currentDiameter).toFixed(2);
        }
    }
    else {
        if( !validateInput(currentWidth, widthMaxMM, widthMinMM) ) allsGoodFlag = false;
        else{
            currentDiameter = calcDiameter(currentWidth, currentAspect, currentRim).toFixed(2);
            currentCircum = calcCircum(calcDiameter(currentWidth, currentAspect, currentRim)).toFixed(2);
            currentSidewallHeight = (currentDiameter - inchToMm(currentRim).toFixed(2)) / 2;
        }
    }

    if( !validateInput(currentAspect, aspectMax, aspectMin) ) allsGoodFlag = false;

    if( !validateInput(currentRim, rimMax, rimMin) ) allsGoodFlag = false;
    if( !validateInput(newWidth, widthMaxMM, widthMinMM) ) allsGoodFlag = false;

    if( !validateInput(newAspect, aspectMax, aspectMin) ) allsGoodFlag = false;
    if( !validateInput(newRim, rimMax, rimMin) ) allsGoodFlag = false;
    
    

    //for choosing the display mode, 0 default, 1 both, 2 mm, 3 inches
    var displayMode = 1;

    var widthDiffernceString = "";
    var diameterDifferenceString = "";
    var circumDifferenceString = "";
    var sidewallDifferenceString = "";

    
    newDiameter = calcDiameter(newWidth, newAspect, newRim).toFixed(2);
    newCircum = calcCircum(calcDiameter(newWidth, newAspect, newRim)).toFixed(2);

    //currentSidewallHeight = (currentDiameter - inchToMm(currentRim).toFixed(2)) / 2;
    newSidewallHeight = (newDiameter - inchToMm(newRim).toFixed(2)) / 2;

    if ( document.getElementById("both").checked ){
       displayMode = 1;
    } else if ( document.getElementById("mm").checked ) {
        displayMode = 2;
    } else if ( document.getElementById("inches").checked ) {
        displayMode = 3;
    }

    displayData("currentDiameterOut", currentDiameter, displayMode);
    displayData("currentWidthOut",currentWidth, displayMode);
    displayData("currentCircumOut", currentCircum, displayMode);
    displayData("newDiameterOut",newDiameter, displayMode);
    displayData("newWidthOut", newWidth, displayMode);
    displayData("newCircumOut", newCircum, displayMode);
   
    diameterDifferenceString = (newDiameter-currentDiameter).toFixed(2);
    widthDiffernceString = (newWidth - currentWidth);
    circumDifferenceString = (newCircum - currentCircum).toFixed(2);
    sidewallDifferenceString = (newSidewallHeight - currentSidewallHeight).toFixed(2);

    displayData("diamDifference", diameterDifferenceString, displayMode);
    document.getElementById("diamDifference").innerHTML = document.getElementById("diamDifference").innerHTML + " " + calcPercentDifference(newDiameter,currentDiameter).toFixed(1) + "%";
    displayData("widthDifference", widthDiffernceString, displayMode);
    document.getElementById("widthDifference").innerHTML = document.getElementById("widthDifference").innerHTML + " " + calcPercentDifference(newWidth,currentWidth).toFixed(1) + "%";
    displayData("circumDifference", circumDifferenceString, displayMode);
    document.getElementById("circumDifference").innerHTML = document.getElementById("circumDifference").innerHTML + " " + calcPercentDifference(newCircum, currentCircum).toFixed(1) + "%";
    displayData("currentSidewall", currentSidewallHeight, displayMode);
    displayData("newSidewall", newSidewallHeight.toFixed(2), displayMode);
    displayData("sideWallDiff", sidewallDifferenceString, displayMode);
    document.getElementById("sideWallDiff").innerHTML = document.getElementById("sideWallDiff").innerHTML + " " + calcPercentDifference(newSidewallHeight, currentSidewallHeight).toFixed(1) + "%";
}