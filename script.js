const display = document.getElementById("display");

// Append value
function appendValue(value) {
  const lastChar = display.value.slice(-1);

  // Prevent double operators
  if ("+-*/%".includes(lastChar) && "+-*/%".includes(value)) {
    return;
  }

  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
  if (display.value === "") return;

  try {
    display.value = eval(display.value);
  } catch {
    alert("Invalid Expression");
  }
}

// ---------------- BUTTON EVENTS ---------------- //

document.querySelectorAll(".number, .operator").forEach((button) => {
  button.addEventListener("click", () => {
    appendValue(button.dataset.value);
  });
});

document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("delete").addEventListener("click", deleteLast);
document.getElementById("equal").addEventListener("click", calculate);

// ---------------- KEYBOARD SUPPORT ---------------- //

document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers (0–9)
  if (/[0-9]/.test(key)) {
    appendValue(key);
  }

  // Operators
  else if ("+-*/%".includes(key)) {
    appendValue(key);
  }

  // Decimal (only one per number)
  else if (key === ".") {
    let parts = display.value.split(/[\+\-\*\/%]/);
    let lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
      appendValue(".");
    }
  }

  // Enter → calculate
  else if (key === "Enter") {
    e.preventDefault();
    calculate();
  }

  // Backspace → delete
  else if (key === "Backspace") {
    deleteLast();
  }

  // Escape → clear
  else if (key === "Escape") {
    clearDisplay();
  }
});