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
/**
 * Date 07-10-2025
 * Author: Ratul
 * Description: Color Picker Application Refactoring
 * */
// Steps

// global declaration
let divElem = null;

//onload handler
window.onload = () => {
  main();
};

function clipboardInner(element) {
  navigator.clipboard.writeText(`#${element.value}`);
  if (divElem != null) {
    divElem.remove();
    divElem = null;
  }
  if (isValidHex(output.value)) {
    generateToastMessage(`#${element.value} copied`);
  } else {
    alert("Invalid Color Code");
  }
}
// main function, this function will take care of getting all the DOM Referrence

function main() {
  // DOM references
  const generateRandomColorbtn = document.querySelector(
    "#generate-random-color"
  );
  const colorHexInput = document.querySelector("#input-hex");
  const colorSliderRed = document.querySelector("#color-slider-red");
  const colorSliderGreen = document.querySelector("#color-slider-green");
  const colorSliderBlue = document.querySelector("#color-slider-blue");

  // event listeners
  generateRandomColorbtn.addEventListener(
    "click",
    handlegenerateRandomColorbtn
  );
  colorHexInput.addEventListener("keyup", handleColorHexInput);

  colorSliderRed.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderGreen.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderBlue.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );

  /* btnCopy.addEventListener("click", function () {
    clipboardInner(output);
  }); */
  /* btnCopy2.addEventListener("click", function () {
    clipboardInner(output2);
  }); */
}

//Event handlers
/**
 * generateRandomColorbtn eventlistener function
 */
function handlegenerateRandomColorbtn() {
  const color = generateColorDecimal();
  updateColorCodeToDOM(color);
}
function handleColorHexInput(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColor(hexColor);
      updateColorCodeToDOM(color);
    }
  }
}

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };

    updateColorCodeToDOM(color);
  };
}

//DOM functions

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
 * update DOM elements with calculated color values
 * @param {object} color
 */
function updateColorCodeToDOM(color) {
  const hexColor = `${generateHEXColor(color)}`;
  const rgbColor = generateRGBColor(color);

  document.querySelector(
    "#color-display"
  ).style.backgroundColor = `#${hexColor}`;
  document.querySelector("#input-hex").value = hexColor;
  document.querySelector("#input-rgb").value = rgbColor;
  document.querySelector("#color-slider-red-label").innerText = color.red;
  document.querySelector("#color-slider-red").value = color.red;
  document.querySelector("#color-slider-green-label").innerText = color.green;
  document.querySelector("#color-slider-green").value = color.green;
  document.querySelector("#color-slider-blue-label").innerText = color.blue;
  document.querySelector("#color-slider-blue").value = color.blue;
}
// Utility functions
/**
 * genrate and return an object of three color decimal values
 * @returns
 */

function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return { red, green, blue };
}

/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */
function generateHEXColor({ red, green, blue }) {
  //const { red, green, blue } = generateColorDecimal();

  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const hexadecimal = `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`;

  return hexadecimal.toUpperCase();
}

/**
 * take a color object of three decimal values and return a RGB color code
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
  //const { red, green, blue } = generateColorDecimal();
  return `rgb(${red}, ${green}, ${blue})`;
}
/**
 * convert hex color to decimal colors object
 * @param {string} hex
 * @returns {object}
 * */
function hexToDecimalColor(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * validate hex color code
 *
 *  @param {string} color: ;
 * @returns {boolean}
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
