/* JavaScript Goes Here */
"use strict";
/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 */

// Steps

// Step 1 - create onload handler
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("change-btn");
  const output = document.getElementById("output");

  btn.addEventListener("click", function () {
    const bgcolor = generateHEXColor();
    root.style.backgroundColor = bgcolor;
    output.value = bgcolor;
  });
}

function generateHEXColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const hexadecimal = `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16
  )}`;

  return hexadecimal;
}
