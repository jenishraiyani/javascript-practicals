let childScreen = document.getElementById("child-screen");
let mainScreen = document.getElementById("output-screen");
let errorMessage = document.getElementById("error-message");
let memoryClear = document.getElementById("memory-clear");
let memoryRecallElement = document.getElementById("memory-recall");
let operators = ["%", "+", "-", "*", "/", ".", "^", ".e+0"];
let errorMsg = "Please enter valid input";
let memoryItems = [];
let localMemory = "calcmemory";
let openParenthesisCounter = 0;
let closeParenthesisCounter = 0;
let parenthesis = document.getElementById("parenthesis-counter");
checkMemory();

// Display user input on screen
function displayEntry(value) {
  let lastEntry = mainScreen.innerHTML.slice(-1);
  if (mainScreen.innerHTML == "0" && value != ".") {
    operators.includes(value) ? mainScreen.innerHTML += value : mainScreen.innerHTML = value;
  } else if (mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 4) == ".e+0") {
    operators.includes(value) ? mainScreen.innerHTML = mainScreen.innerHTML : 
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) + value;
  } else if(mainScreen.innerHTML == Math.PI || mainScreen.innerHTML == Math.E){
    operators.includes(value) ? mainScreen.innerHTML += value : 
    mainScreen.innerHTML = value;
  } else if(lastEntry == "("){
    validateInput(value) && mainScreen.innerHTML != "" ? mainScreen.innerHTML += "0"+ value :  
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) + value;
  } else {
    validateInput(value) && mainScreen.innerHTML != "" ? mainScreen.innerHTML += value :  
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) + value;
  }
}

function displayOutput(value){
  if(isNaN(value) || !isFinite(value)){
    showError(errorMsg);
    mainScreen.innerHTML = "0";
  }else{
    mainScreen.innerHTML = value;
  }
}

function openParenthesis(){
  if(!isNaN(mainScreen.innerHTML)){
    mainScreen.innerHTML += "*(";
  }else{
    mainScreen.innerHTML += "(";
  }
  openParenthesisCounter++;
  parenthesis.innerHTML = openParenthesisCounter;
}

function closeParenthesis(){
  if (openParenthesisCounter > 0) {
    let lastEntry = mainScreen.innerHTML.slice(-1);
    if (closeParenthesisCounter == 0 && lastEntry == "(") {
      mainScreen.innerHTML += "0)";
    } else {
      mainScreen.innerHTML += ")";  
    }
    openParenthesisCounter--;
    closeParenthesisCounter++;
    parenthesis.innerHTML = openParenthesisCounter;
    if (openParenthesisCounter == 0) {
        closeParenthesisCounter = 0;
        mainScreen.innerHTML += "*";
        parenthesis.innerHTML = "";
    }
  }
}

// Calculate
function calculator() {
  try {
    if (mainScreen.innerHTML != "" && !operators.includes(mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 1))) {
      if (mainScreen.innerHTML.includes("^")) {
        let findXYSqaure = mainScreen.innerHTML.split("^", 2);
        childScreen.innerHTML = mainScreen.innerHTML;
        displayOutput(Math.pow(findXYSqaure[0], findXYSqaure[1]));
      } else {
        childScreen.innerHTML = mainScreen.innerHTML;
        let count = eval(mainScreen.innerHTML);
        displayOutput(count);
      }
    }else{
      showError(errorMsg);
    }
  } catch (err) {
    showError(errorMsg);
  }
}

//Remove all the entry from screen
function allClear() {
  mainScreen.innerHTML = "0";
  childScreen.innerHTML = "";
  parenthesis.innerHTML = "";
  openParenthesisCounter = 0;
}

//Remove last entry
function clearEntry() {
  if (mainScreen.innerHTML == "0") {
    childScreen.innerHTML = childScreen.innerHTML.slice(0, -1);
  } else {
    if (mainScreen.innerHTML.length == 1) {
      mainScreen.innerHTML = "0";
      parenthesis.innerHTML = "";
      openParenthesisCounter = 0;
    } else {
      let lastEntry = mainScreen.innerHTML.slice(-1);
      if(lastEntry == "("){
        openParenthesisCounter--;
        parenthesis.innerHTML = openParenthesisCounter;
        mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
      } else if(lastEntry == ")"){
        openParenthesisCounter++;
        parenthesis.innerHTML = openParenthesisCounter;
        mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
      } else {
        mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
      }
    }
  }
}

function fixedToExponent() {
  let lastFourEntry = mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 4);
  let lastEntry = mainScreen.innerHTML.slice(-1);
  if (lastEntry == ".") {
    mainScreen.innerHTML += "e+0";
  } else if(operators.includes(lastEntry)){
    mainScreen.innerHTML = mainScreen.innerHTML;
  } else if (lastFourEntry != ".e+0") {
    mainScreen.innerHTML += ".e+0";
  } else {
    mainScreen.innerHTML = mainScreen.innerHTML;
  }
}

function getConstant(clickedId) {
  switch (clickedId) {
    case "PI":
      mainScreen.innerHTML = Math.PI;
      break;
    case "Euler":
      mainScreen.innerHTML = Math.E;
      break;
  }
}

function getDerivative() {
  if (mainScreen.innerHTML == 0) {
    let msg = "Cannot divide by zero";
    showError(msg);
  } else {
    childScreen.innerHTML = `1/(${mainScreen.innerHTML})`;
    displayOutput(eval(1/mainScreen.innerHTML));
  }
}

function getAbsoluteValue() {
  displayOutput(Math.abs(mainScreen.innerHTML));
}

function getModulo() {
  let modulo = "%";
  if (validateInput(modulo)) {
    mainScreen.innerHTML += modulo;
  }
}

function getFactorial() {
  let factorialNumber = mainScreen.innerHTML;
  if (factorialNumber < 0) {
    showError(errorMsg);
  } else if (factorialNumber == 0) {
    mainScreen.innerHTML = "1";
  } else {
    for (let i = factorialNumber - 1; i >= 1; i--) {
      factorialNumber *= i;
    }
    childScreen.innerHTML = `fact(${mainScreen.innerHTML})`;
    displayOutput(factorialNumber);
  }
}

function getPower(clickedId) {
  switch (clickedId) {
    case "findSquare":
      childScreen.innerHTML = `sqr(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML,2));
      break;
    case "findXRoot":
      childScreen.innerHTML = `√(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML,1/2));
      break;
    case "findTenPower":
      childScreen.innerHTML = `10^(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(10,mainScreen.innerHTML));
      break;
    case "findXCube":
      childScreen.innerHTML = `cube(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML,3));
      break;
    case "findCubeRoot":
      childScreen.innerHTML = `cuberoot(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML,1/3));
      break;
    case "findTwoXSquare":
      childScreen.innerHTML = `2^(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(2,mainScreen.innerHTML));
      break;
    case "findEulerXSquare":
      childScreen.innerHTML = `e^(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(Math.E,mainScreen.innerHTML));
      break;
    case "findXYSqaure":
      let exponent = "^";
      if (validateInput(exponent)) {
        mainScreen.innerHTML += exponent;
      }
      break;
  }
}

function getLog(clickedId) {
  switch (clickedId) {
    case "logTenBase":
      childScreen.innerHTML = `log(${mainScreen.innerHTML})`;
      displayOutput(Math.log10(mainScreen.innerHTML));
      break;
    case "naturalLogarithm":
      childScreen.innerHTML = `ln(${mainScreen.innerHTML})`;
      displayOutput(Math.log(mainScreen.innerHTML));
      break;
  }
}

function setPlusMinus() {
  let firstOperator = mainScreen.innerHTML.charAt(0);
  if (firstOperator == "-") {
    mainScreen.innerHTML = mainScreen.innerHTML.slice(1);
  } else {
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, 0) + "-" + mainScreen.innerHTML.slice(0);
  }
}

//Validate user input
function validateInput(value) {
  let lastEntry = mainScreen.innerHTML.slice(-1);
  if (operators.includes(value)) {
    if (operators.includes(lastEntry)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function disableButton(){
    memoryClear.className += " disabled";
    memoryRecallElement.className += " disabled";
} 

function enableButton(){
    memoryClear.setAttribute("class", "btn");
    memoryRecallElement.setAttribute("class", "btn");
} 

function getMemoryItem(){
  let storedMemoryData = JSON.parse(localStorage.getItem(localMemory));
  return storedMemoryData;
}

function setMemoryItem(storedMemoryData){
  localStorage.setItem(localMemory, JSON.stringify(storedMemoryData));
}

//Memory Operations Start
function memoryStore() {
  let storedMemoryData = getMemoryItem();
  if (mainScreen.innerHTML != "" && !isNaN(mainScreen.innerHTML)) {
    if (storedMemoryData != null) {
      storedMemoryData.push(mainScreen.innerHTML);
      setMemoryItem(storedMemoryData);
      enableButton();
    } else {
      memoryItems.push(mainScreen.innerHTML);
      setMemoryItem(memoryItems);
      enableButton();
    }
  }
}

function memoryPlusSubtract(clickedId) {
  if (mainScreen.innerHTML != "") {
      switch (clickedId) {
        case "memory-plus":
          let plus = "+";
          memoryPlusSub(plus)
          break;
        case "memory-subtract":
          let subtract = "-";
          memoryPlusSub(subtract)
          break;
        default:
          localStorage.removeItem(localMemory);
          checkMemory();
          break;
      }
    }
}

function memoryPlusSub(operators){
  let storedMemoryData = getMemoryItem();
  if(storedMemoryData == null){
   if(operators == '-'){
    memoryItems.push(Math.abs(mainScreen.innerHTML)*-1);
    setMemoryItem(memoryItems);
    enableButton();
   } else {
    memoryItems.push(Math.abs(mainScreen.innerHTML));
    setMemoryItem(memoryItems);
    enableButton();
   }
  } else {
    let lastItems = storedMemoryData.length - 1;
    let replaceData = eval(storedMemoryData[lastItems] + operators + mainScreen.innerHTML);
    storedMemoryData[lastItems] = replaceData;
    setMemoryItem(storedMemoryData);
  }
}

function memoryRecall() {
  let storedMemoryData = getMemoryItem();
  mainScreen.innerHTML = storedMemoryData[storedMemoryData.length - 1];
}

function checkMemory() {
  let storedMemoryData = getMemoryItem();
  if(storedMemoryData == null) {
    disableButton();
  } else {
    enableButton();
  }
}
//Memory Operations End

function getMathFunctionValue(clickedId) {
  switch (clickedId) {
    case "rand":
      displayOutput(Math.random());
      break;
    case "floor":
      childScreen.innerHTML = `floor(${mainScreen.innerHTML})`;
      displayOutput(Math.floor(mainScreen.innerHTML));
      break;
    case "ceil":
      childScreen.innerHTML = `ceil(${mainScreen.innerHTML})`;
      displayOutput(Math.ceil(mainScreen.innerHTML));
      break;
  }
}

function getTrigonometryValue(clickedId) {
  switch (clickedId) {
    case "sin":
      childScreen.innerHTML = `sin(${mainScreen.innerHTML})`;
      displayOutput(Math.sin(mainScreen.innerHTML));
      break;
    case "cos":
      childScreen.innerHTML = `cos(${mainScreen.innerHTML})`;
      displayOutput(Math.cos(mainScreen.innerHTML));
      break;
    case "tan":
      childScreen.innerHTML = `tan(${mainScreen.innerHTML})`;
      displayOutput(Math.tan(mainScreen.innerHTML));
      break;
    case "sinh":
      childScreen.innerHTML = `sinh(${mainScreen.innerHTML})`;
      displayOutput(Math.sinh(mainScreen.innerHTML));
      break;
    case "cosh":
      childScreen.innerHTML = `cosh(${mainScreen.innerHTML})`;
      displayOutput(Math.cosh(mainScreen.innerHTML));
      break;
    case "tanh":
      childScreen.innerHTML = `tanh(${mainScreen.innerHTML})`;
      displayOutput(Math.tanh(mainScreen.innerHTML));
      break;
  }
}

function showError(msg) {
  errorMessage.innerHTML = `<div class='alert alert-danger w-25' role='alert'>${msg}</div>`;
  window.setTimeout(function () {
    errorMessage.innerHTML = "";
  }, 3000);
}
