const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.innerText);
    });
});

// Keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" || key === "-" ||
        key === "*" || key === "/" ||
        key === "."
    ) {
        handleInput(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    if (key === "Escape") {
        clearDisplay();
    }
});

function handleInput(value) {
    if (value === "C") {
        clearDisplay();
    } else if (value === "=") {
        calculate();
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}
