/* JavaScript Goes Here */
"use strict";
/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copied
 */

// Steps

// Step 1 - create onload handler
window.onload = () => {
  main();
};

// global declaration
let divElem = null;

function main() {
  const root = document.getElementById("root");
  const btnChange = document.getElementById("change-btn");
  const btnCopy = document.getElementById("copy-btn");
  const output = document.getElementById("output");

  btnChange.addEventListener("click", function () {
    const bgcolor = generateHEXColor();
    root.style.backgroundColor = bgcolor;
    output.value = bgcolor;
  });

  btnCopy.addEventListener("click", function () {
    navigator.clipboard.writeText(output.value);
    if (divElem != null) {
      divElem.remove();
      divElem = null;
    }
    generateToastMessage(`${output.value} copied`);
  });
}

// step 2 - random color generator function
function generateHEXColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const hexadecimal = `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16
  )}`;

  return hexadecimal;
}

function generateToastMessage(message) {
  divElem = document.createElement("div");
  divElem.innerText = message;
  divElem.className = "toast-message toast-message-slide-in";

  // add eventlistener
  divElem.addEventListener("click", function () {
    divElem.classList.remove("toast-message-slide-in");
    divElem.classList.add("toast-message-slide-out");

    // remove animation event listener
    divElem.addEventListener("animationend", function () {
      divElem.remove();
      divElem = null;
    });
  });

  document.body.appendChild(divElem);
}
// step 3 - collect all necessary references

// step 4 - handle the change button click event

// step 5 - handle the copy button click event

// Step 6 - activate toast message

// Step 7 - create a dynamic toast message

// step 8 - clear toast message
