let childScreen = document.getElementById("child-screen");
let mainScreen = document.getElementById("output-screen");
let errorMessage = document.getElementById("error-message");
let memoryClear = document.getElementById("memory-clear");
let memoryRecallElement = document.getElementById("memory-recall");
let operators = ["%", "+", "-", "*", "/", ".", "^", ".e+0"];
let errorMsg = "Please enter valid input";
let memoryItems = [];
checkMemory();

// Display user input on screen
function displayEntry(value) {
  if (mainScreen.innerHTML == "0" && value != ".") {
    if (operators.includes(value)) {
      mainScreen.innerHTML += value;
    } else {
      mainScreen.innerHTML = value;
    }
  } else if (mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 4) == ".e+0") {
    if (operators.includes(value)) {
      mainScreen.innerHTML = mainScreen.innerHTML;
    } else {
      mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) + value;
    }
  }  
    else {
    if (validateInput(value) && mainScreen.innerHTML != "") {
      mainScreen.innerHTML += value;
    } else {
      mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) + value;
    }
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

// Calculate
function calculator() {
  try {
    if (mainScreen.innerHTML != "" && !operators.includes(mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 1))) {
      if (mainScreen.innerHTML.includes("^")) {
        const findXYSqaure = mainScreen.innerHTML.split("^", 2);
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
}

//Remove last entry
function clearEntry() {
  if (mainScreen.innerHTML == "0") {
    childScreen.innerHTML = childScreen.innerHTML.slice(0, -1);
  } else {
    if (mainScreen.innerHTML.length == 1) {
      mainScreen.innerHTML = "0";
    } else {
      mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
    }
  }
}

function fixedToExponent() {
  var lastFourEntry = mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 4);
  let lastEntry = mainScreen.innerHTML.slice(-1);
  if (lastEntry == ".") {
    mainScreen.innerHTML += "e+0";
  }else if(operators.includes(lastEntry)){
    mainScreen.innerHTML = mainScreen.innerHTML;
  }
  else if (lastFourEntry != ".e+0") {
    mainScreen.innerHTML += ".e+0";
  } else {
    mainScreen.innerHTML = mainScreen.innerHTML;
  }
}

function getConstant(clicked_id) {
  switch (clicked_id) {
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
    displayOutput(eval(1 / mainScreen.innerHTML));
  }
}
function getAbsoluteValue() {
  displayOutput(Math.abs(mainScreen.innerHTML));
}

function getModulo() {
  if (validateInput("%")) {
    mainScreen.innerHTML += "%";
  }
}

function getFactorial() {
  let factorialNumber = mainScreen.innerHTML;
  if (factorialNumber < 0) {
    showError(errorMsg);
  } else if (factorialNumber == 0) {
    mainScreen.innerHTML = "1";
  } else {
    for (var i = factorialNumber - 1; i >= 1; i--) {
      factorialNumber *= i;
    }
    childScreen.innerHTML = `fact(${mainScreen.innerHTML})`;
    displayOutput(factorialNumber);
  }
}

function getPower(clicked_id) {
  switch (clicked_id) {
    case "findSquare":
      childScreen.innerHTML = `sqr(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML, 2));
      break;
    case "findXRoot":
      childScreen.innerHTML = `√(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML, 1 / 2));
      break;
    case "findTenPower":
      childScreen.innerHTML = `10^(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(10, mainScreen.innerHTML));
      break;
    case "findXCube":
      childScreen.innerHTML = `cube(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML, 3));
      break;
    case "findCubeRoot":
      childScreen.innerHTML = `cuberoot(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(mainScreen.innerHTML, 1 / 3));
      break;
    case "findTwoXSquare":
      childScreen.innerHTML = `2^(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(2, mainScreen.innerHTML));
      break;
    case "findEulerXSquare":
      childScreen.innerHTML = `e^(${mainScreen.innerHTML})`;
      displayOutput(Math.pow(Math.E, mainScreen.innerHTML));
      break;
    case "findXYSqaure":
      if (validateInput("^")) {
        mainScreen.innerHTML += "^";
      }
      break;
  }
}

function getLog(clicked_id) {
  switch (clicked_id) {
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

//Memory Operations Start
function memoryStore() {
  const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
  if (mainScreen.innerHTML != "") {
    if (storedMemoryData != null) {
      storedMemoryData.push(mainScreen.innerHTML);
      localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
      enableButton();
    } else {
      memoryItems.push(mainScreen.innerHTML);
      localStorage.setItem("calcmemory", JSON.stringify(memoryItems));
      enableButton();
    }
  }
}

function memoryPlusSubtract(clicked_id) {
  const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
  if (mainScreen.innerHTML != "") {
    if (storedMemoryData != null) {
      let lastItems = storedMemoryData.length - 1;
      switch (clicked_id) {
        case "memory-plus":
          let replacePlus = eval(storedMemoryData[lastItems] + "+" + mainScreen.innerHTML);
          storedMemoryData[lastItems] = replacePlus;
          localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
          break;
        case "memory-subtract":
          let replaceSubtract = eval(storedMemoryData[lastItems] + "-" + mainScreen.innerHTML);
          storedMemoryData[lastItems] = replaceSubtract;
          localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
          break;
        default:
          localStorage.removeItem("calcmemory");
          checkMemory();
          break;
      }
    } else {
      return false;
    }
  }
}

function memoryRecall() {
  let retrievedMemoryData = localStorage.getItem("calcmemory");
  let memoryData = JSON.parse(retrievedMemoryData);
  mainScreen.innerHTML = memoryData[memoryData.length - 1];
}

function checkMemory() {
    const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
    if (storedMemoryData == null) {
        disableButton();
    } else {
       enableButton();
    }
}
//Memory Operations End

function getMathFunctionValue(clicked_id) {
  switch (clicked_id) {
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

function getTrigonometryValue(clicked_id) {
  switch (clicked_id) {
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
