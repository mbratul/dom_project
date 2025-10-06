/* JavaScript Goes Here */
"use strict";
/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copied
 * - User can type their own hex code too
 * - Show RGB color too, but do not need to edit it.
 * - User can also copy the RGB color code.
 */

// Steps

window.onload = () => {
  main();
};

// global declaration
let divElem = null;
function clipboardInner(message) {
  navigator.clipboard.writeText(`#${message.value}`);
  if (divElem != null) {
    divElem.remove();
    divElem = null;
  }
  if (isValidHex(output.value)) {
    generateToastMessage(`#${message.value} copied`);
  } else {
    alert("Invalid Color Code");
  }
}
function main() {
  const root = document.getElementById("root");
  const btnChange = document.getElementById("change-btn");
  const btnCopy = document.getElementById("copy-btn");
  const btnCopy2 = document.getElementById("copy-btn2");
  const output = document.getElementById("output");
  const output2 = document.getElementById("output2");

  btnChange.addEventListener("click", function () {
    const color = generateColorDecimal();
    const hex = generateHEXColor(color);
    const rgb = generateRGBColor(color);
    root.style.backgroundColor = hex;
    output.value = hex.substring(1);
    output2.value = rgb;
  });

  btnCopy.addEventListener("click", function () {
    clipboardInner(output);
  });
  btnCopy2.addEventListener("click", function () {
    clipboardInner(output2);
  });

  output.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color) {
      output.value = color.toUpperCase();
      if (isValidHex(color)) {
        root.style.backgroundColor = `#${color}`;
        output2.value = hexToRGB(color);
      }
    }
  });
}

//function 1 - generate three random decimal number for red green and blue return as an object
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return { red, green, blue };
}

// function 2 - generate hex color code
function generateHEXColor({ red, green, blue }) {
  //const { red, green, blue } = generateColorDecimal();

  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const hexadecimal = `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`;

  return hexadecimal.toUpperCase();
}

//function 3 - generate rgba color code
function generateRGBColor({ red, green, blue }) {
  //const { red, green, blue } = generateColorDecimal();
  return `rgb(${red}, ${green}, ${blue})`;
}
/**
 * convert hex color to rgb
 * @param {string} hex
 *
 * */
function hexToRGB(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}
//console.log(hexToRGB("ffffff"));

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

/**
 *  @param {string} color: ;
 *
 * **/
function isValidHex(color) {
  if (color.length !== 6) return false;
  // if (color[0] !== "#") return false;

  // color = color.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
// Step 1 - create onload handler

// step 2 - random color generator function

// step 3 - collect all necessary references

// step 4 - handle the change button click event

// step 5 - handle the copy button click event

// Step 6 - activate toast message

// Step 7 - create a dynamic toast message

// step 8 - clear toast message

// step 9 - create isHexValid function

// step 10 - implement change handler on input field

// step 11 - prevent copying hex code if it is not valid

// step 12 - refactor color generator function

// step 13 - update the color code to display rgb color

// step 14 - create hex to rgb function

//step 15 - update change handler

//step 16 - implement copy function
