let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelector('#clear')
let clearAllButton = document.querySelector("#clearAll")
let equalButton = document.querySelector("#equal");
let logButton = document.querySelector("#log");
let expButton = document.querySelector("#exp");

function getHistory() {
  return document.querySelector(".history").innerText.toString();
}

function printHistory(num) {
  document.querySelector(".history").innerText = num;
}

function getOutput() {
  return document.querySelector(".output").innerText;
}

function printOutput(num) {
  document.querySelector(".output").innerText = num.toString();
}

function evalLog(expr) {
  let n = Number(getOutput().replace(/\D/g, ''));
  return Math.log10(n);
}

function checkIfOperatorExists(num) {
  let x = num.charAt(num.length - 1);
  switch (x) {
    case "+":
      return true;
    case "-":
      return true;
    case "*":
      return true;
    case "/":
      return true;
    case "%":
      return true;
  }
  return false;
}

clearAllButton.addEventListener('click', () => {
  printHistory("");
  printOutput("");
})

clearButton.addEventListener('click', () => {
  if (getOutput() == "" && getHistory()) {
    let n = getHistory().substr(0, getHistory().length);
    printHistory("");
    printOutput(n);
  }
  let n = getOutput().substr(0, getOutput().length - 1);
  printOutput(n);
})

equalButton.addEventListener('click', () => {
  if (getOutput().includes("log")) {
    if (!checkIfOperatorExists(getHistory())) {
      let n = Number(getOutput().replace(/\D/g, ''));
      let res = Math.log10(n);
      let num = "log" + "(" + n + ")";
      if (res % 1 == 0) // does not contain decimal
      {
        res = Number(res);
      } else {
        res = Number(Math.round(res + 'e3') + 'e-3'); // if it has decimal round it to two places
      }
      printHistory(num);
      printOutput(res);
    } else if (checkIfOperatorExists(getHistory())) {
      let n = Number(getOutput().replace(/\D/g, ''));
      let n1 = getHistory().toString();
      let logRes = Math.log10(n);
      if (logRes % 1 != 0) {
        logRes = Number(Math.round(logRes + 'e3') + 'e-3');
      }
      let num = "log" + "(" + n + ")";
      printHistory(getHistory().toString() + " " + num);
      let n2 = logRes.toString();
      let n3 = n1 + n2;
      printOutput(eval(n3));
    }
  }
  if (checkIfOperatorExists(getHistory()) && getOutput().charAt(0) == "-") {
    let n = getHistory().toString() + " " + "(" + getOutput().toString() + ")";
    printHistory(n);
    let res = eval(n);
    if (res % 1 == 0) // does not contain decimal
    {
      res = Number(res);
    } else {
      res = Number(Math.round(res + 'e3') + 'e-3'); // if it has decimal round it to two places
    }
    printOutput(res);
  } else if (checkIfOperatorExists(getHistory()) && getOutput()) {
    let n = getHistory().toString() + " " + getOutput().toString();
    printHistory(n);
    let res = eval(n);
    if (res % 1 == 0) // does not contain decimal
    {
      res = Number(res);
    } else {
      res = Number(Math.round(res + 'e3') + 'e-3'); // if it has decimal round it to two places
    }
    printOutput(res);
  } else if ((getOutput() && getHistory())) return;
  else {
    alert("Invalid computation");
    return;
  }
})

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (getOutput() == "0" && button.innerText == "0") return;
    if (button.innerText == "." && getOutput().includes(".")) return; // to stop consecutive decimals
    if (getOutput() == "") printOutput(button.innerText);
    else printOutput(getOutput().toString() + button.innerText.toString());
  })
})


operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (getOutput() == "" && (getHistory() == "" && button.innerText != "-")) return;
    else if (getOutput() == "-") return; //prevent  multiple neg signs
    else if (getOutput() == ".") return; // prevent multiple decimal sign
    else if (getOutput() == "log") return;
    else if (button.innerText == '-' && (getHistory() == "" && getOutput() == "")) {
      printOutput("-");
    } else if (button.innerText == '-' && (checkIfOperatorExists(getHistory()))) {
      printOutput("-");
    } else if (getOutput() && checkIfOperatorExists(getHistory())) {
      let n = getHistory().toString() + " " + getOutput().toString();
      printOutput("");
      let res = eval(n);
      printHistory(res.toString() + " " + button.innerText.toString());
    } else if (getOutput() == "" && checkIfOperatorExists(getHistory())) {
      let n = getHistory().substr(0, getHistory().length - 1) + " " + button.innerText.toString();
      printHistory(n);
      let res = eval(n);
      printOutput(res);
    } else {
      let n = getOutput().toString() + " " + button.innerText.toString();
      printHistory(n);
      printOutput("");
    }
  })
})

logButton.addEventListener('click', () => {
  if (getHistory() == "" && getOutput() == "" || (getHistory() && getOutput() == "")) {
    printOutput("log");
  } else if (getHistory() && !getOutput().includes("log")) { // to prevent multiple logs
    printOutput("log" + " " + getOutput());
  } else {
    return;
  }
})

expButton.addEventListener('click', () => {
  if ((getOutput() && getOutput() != '-') && (getHistory() == "")) {
    let n = "(" + getOutput() + ")" + " **";
    printHistory(n);
    printOutput("");
  } else {
    return;
  }
})
