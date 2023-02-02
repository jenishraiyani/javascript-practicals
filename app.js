let childScreen = document.getElementById("child-screen");
let mainScreen = document.getElementById("output-screen");
let errorMessage = document.getElementById("error-message");
let memoryItems = [];
checkMemory();

// Display user input on screen
function displayEntry(value) {
  if (mainScreen.innerHTML == "0" && value != ".") {
    mainScreen.innerHTML = value;
  } else if (mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 4) == ".e+0") {
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) + value;
  } else {
    if (ValidateInput(value)) {
      mainScreen.innerHTML += value;
    }
  }
}

// Calculate
function Calculator() {
  try {
    if (mainScreen.innerHTML != "") {
      if (mainScreen.innerHTML.includes("^")) {
        const findXYSqaure = mainScreen.innerHTML.split("^", 2);
        childScreen.innerHTML = mainScreen.innerHTML;
        mainScreen.innerHTML = Math.pow(findXYSqaure[0], findXYSqaure[1]);
      } else {
        childScreen.innerHTML = mainScreen.innerHTML;
        let count = eval(mainScreen.innerHTML);
        mainScreen.innerHTML = count;
      }
    }
  } catch (err) {
    showError("Please enter valid input");
  }
}

//Remove all the entry from screen
function allClear() {
  mainScreen.innerHTML = "";
  childScreen.innerHTML = "";
}

//Remove last entry
function clearEntry() {
  if (mainScreen.innerHTML == "") {
    childScreen.innerHTML = childScreen.innerHTML.slice(0, -1);
  } else {
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
  }
}

function fixedToExponent() {
  var lastEntry = mainScreen.innerHTML.substr(mainScreen.innerHTML.length - 4);
  if (lastEntry != ".e+0") {
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
  if(mainScreen.innerHTML == 0){
    showError("Cannot divide by zero");
  }else{
    mainScreen.innerHTML = eval(1 / mainScreen.innerHTML);
  }
 
}
function getAbsoluteValue() {
  mainScreen.innerHTML = Math.abs(mainScreen.innerHTML);
}

function getModulo() {
  if (ValidateInput("%")) {
    mainScreen.innerHTML += "%";
  }
}

function getFactorial() {
  let factorialNumber = mainScreen.innerHTML;
  if (factorialNumber < 0) {
    showError("Please enter valid input");
  } else if (factorialNumber == 0) {
    mainScreen.innerHTML = "1";
  } else {
    for (var i = factorialNumber - 1; i >= 1; i--) {
      factorialNumber *= i;
    }
    mainScreen.innerHTML = factorialNumber;
  }
}

function getPower(clicked_id) {
  switch (clicked_id) {
    case "findSquare":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 2);
      break;
    case "findXRoot":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 1 / 2);
      break;
    case "findTenPower":
      mainScreen.innerHTML = Math.pow(10, mainScreen.innerHTML);
      break;
    case "findXCube":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 3);
      break;
    case "findCubeRoot":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 1 / 3);
      break;
    case "findTwoXSquare":
      mainScreen.innerHTML = Math.pow(2, mainScreen.innerHTML);
      break;
    case "findEulerXSquare":
      mainScreen.innerHTML = Math.pow(Math.E, mainScreen.innerHTML);
    case "findXYSqaure":
      if (ValidateInput("^")) {
        mainScreen.innerHTML += "^";
      }
      break;
  }
}

function getLog(clicked_id) {
  switch (clicked_id) {
    case "logTenBase":
      mainScreen.innerHTML = Math.log10(mainScreen.innerHTML);
      break;
    case "naturalLogarithm":
      mainScreen.innerHTML = Math.log(mainScreen.innerHTML);
      break;
  }
}

function setPlusMinus() {
  let firstOperator = mainScreen.innerHTML.charAt(0);
  if (firstOperator == "-") {
    getAbsoluteValue();
  } else {
    mainScreen.innerHTML =
      mainScreen.innerHTML.slice(0, 0) + "-" + mainScreen.innerHTML.slice(0);
  }
}

//Validate user input
function ValidateInput(value) {
  let lastEntry = mainScreen.innerHTML.slice(-1);
  let operators = ["%", "+", "-", "*", "/", ".", "^", ".e+0"];
  if (operators.includes(value)) {
    if (operators.includes(lastEntry)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}

//Memory Operations Start
function memoryStore() {
  const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
  if (mainScreen.innerHTML != "") {
    let memoryClear = document.getElementById("memory-clear");
    let memoryRecall = document.getElementById("memory-recall");
    if (storedMemoryData != null) {
      storedMemoryData.push(mainScreen.innerHTML);
      localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
      memoryClear.setAttribute("class", "btn");
      memoryRecall.setAttribute("class", "btn");
    } else {
      memoryItems.push(mainScreen.innerHTML);
      localStorage.setItem("calcmemory", JSON.stringify(memoryItems));
      memoryClear.setAttribute("class", "btn");
      memoryRecall.setAttribute("class", "btn");
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
          let replacePlus = eval(
            storedMemoryData[lastItems] + "+" + mainScreen.innerHTML
          );
          storedMemoryData[lastItems] = replacePlus;
          localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
          break;
        case "memory-subtract":
          let replaceSubtract = eval(
            storedMemoryData[lastItems] + "-" + mainScreen.innerHTML
          );
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
  let memoryClear = document.getElementById("memory-clear");
  let memoryRecall = document.getElementById("memory-recall");
  if (storedMemoryData == null) {
    memoryClear.className += " disabled";
    memoryRecall.className += " disabled";
  } else {
    memoryClear.setAttribute("class", "btn");
    memoryRecall.setAttribute("class", "btn");
  }
}
//Memory Operations End

function getMathFunctionValue(clicked_id) {
  switch (clicked_id) {
    case "rand":
      mainScreen.innerHTML = Math.random();
      break;
    case "floor":
      mainScreen.innerHTML = Math.floor(mainScreen.innerHTML);
      break;
    case "ceil":
      mainScreen.innerHTML = Math.ceil(mainScreen.innerHTML);
      break;
  }
}

function getTrigonometryValue(clicked_id) {
  switch (clicked_id) {
    case "sin":
      mainScreen.innerHTML = Math.sin(mainScreen.innerHTML);
      break;
    case "cos":
      mainScreen.innerHTML = Math.cos(mainScreen.innerHTML);
      break;
    case "tan":
      mainScreen.innerHTML = Math.tan(mainScreen.innerHTML);
      break;
    case "sinh":
      mainScreen.innerHTML = Math.sinh(mainScreen.innerHTML);
      break;
    case "cosh":
      mainScreen.innerHTML = Math.cosh(mainScreen.innerHTML);
      break;
    case "tanh":
      mainScreen.innerHTML = Math.tanh(mainScreen.innerHTML);
      break;
  }
}

function showError(msg){
  errorMessage.innerHTML = `<div class='alert alert-danger w-25' role='alert'>${msg}</div>`;
    window.setTimeout(function () {
      errorMessage.innerHTML = "";
    }, 3000);
}