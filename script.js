function appendValue(value) {
  let display = document.getElementById("display");
  let lastChar = display.value.slice(-1);

  if ("+-*/".includes(lastChar) && "+-*/".includes(value)) {
    return;
  }

  display.value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let display = document.getElementById("display");

  try {
    display.value = Function('"use strict";return (' + display.value + ")")();
  } catch {
    alert("Invalid Expression");
  }
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);
  });
});

// ----Keyboard support----  //

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});
