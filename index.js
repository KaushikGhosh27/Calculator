numberButtons = document.querySelectorAll(".number");
operatorButtons = document.querySelectorAll(".operator");
clearButton = document.querySelector('#clear')
clearAllButton = document.querySelector("#clearAll")
equalButton = document.querySelector("#equal");

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

function checkIfOperatorExists(num) {
  let x = num.charAt(str.length - 1);
  switch (x) {
    case "+":
      return true;
    case "-":
      return true;
    case "*":
      return true;
    case "/":
      return true;
  }
  return false;
}


clearAllButton.addEventListener('click', () => {
  printHistory("");
  printOutput("");
})

clearButton.addEventListener('click', () => {
  let n = getOutput().substr(0, getOutput().length - 1);
  printOutput(n);
})

equalButton.addEventListener('click', () => {
  if (getOutput() && getHistory()) {
    let n = getHistory().toString() + " " + getOutput().toString();
    printHistory(n);
    let res = eval(n);
    if (res % 1 == 0) // does not contain decimal
    {
      res = Number(res);
    } else {
      res = Number(Math.round(res + 'e2') + 'e-2'); // if it has decimal round it to two places
    }
    printOutput(res);
  } else {
    alert("Invalid computation");
    return;
  }
})

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText == "." && getOutput().includes(".")) return;
    if (getOutput() == "") printOutput(button.innerText);
    else printOutput(getOutput().toString() + button.innerText.toString());
  })
})


operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (getOutput() == "") return;
    // else if (getOutput() && checkIfOperatorExists(getHistory())) {
    //   let n = getHistory().toString() + " " + getOutput().toString();
    //   printOutput("");
    //   let res = eval(n);
    //   printHistory(res.toString() + " " + button.innerText.toString());
    // }
    else {
      let n = getOutput().toString() + " " + button.innerText.toString();
      printHistory(n);
      printOutput("");
    }
  })
})
