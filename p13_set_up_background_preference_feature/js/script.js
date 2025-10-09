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
let toastContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};
const defaultPresetColors = [
  "#ffcdd2",
  "#f8bbd0",
  "#e1bee7",
  "#ff8a80",
  "#ff80ab",
  "#ea80fc",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#b388ff",
  "#8c9eff",
  "#82b1ff",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#80d8ff",
  "#84ffff",
  "#a7ffeb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#b9f6ca",
  "#ccff90",
  "#ffcc80",
];
let customColor = new Array(24);
const copySound = new Audio("./images/copy-sound.wav");

//onload handler
window.onload = () => {
  main();
  updateColorCodeToDOM(defaultColor);
  //display preset colors
  const parentBoxes = document.querySelector("#preset-colors");
  displayColorBoxes(parentBoxes, defaultPresetColors);

  let getCustomColors = localStorage.getItem("custom-colors");
  if (getCustomColors) {
    displayColorBoxes(
      document.querySelector("#custom-colors"),
      JSON.parse(getCustomColors)
    );
  }
};

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
  const copyTOClipboardbtn = document.querySelector("#copy-to-clipboard");
  const saveTOCustombtn = document.querySelector("#save-to-custom");
  const presetColorParent = document.querySelector("#preset-colors");
  const customColorParent = document.querySelector("#custom-colors");
  const bgFileInput = document.querySelector("#bg-file-input");
  const bgFileInputBtn = document.querySelector("#bg-file-input-btn");
  const bgPreviewImg = document.querySelector("#bg-preview");

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

  copyTOClipboardbtn.addEventListener("click", handleCopyTOClipBoard);

  presetColorParent.addEventListener("click", handlePresetColorParent);

  customColorParent.addEventListener("click", handleCustomColorParent);

  saveTOCustombtn.addEventListener(
    "click",
    handleSaveToCustombtn(customColorParent, colorHexInput)
  );
  bgFileInputBtn.addEventListener("click", function () {
    bgFileInput.click();
  });
  bgFileInput.addEventListener("change", function (event) {
    const files = event.target.files[0];
    const imgURL = URL.createObjectURL(files);
    bgPreviewImg.style.background = `url(${imgURL})`;
    document.body.style.background = `url(${imgURL})`;
  });
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

function handleCopyTOClipBoard() {
  const colorModeRadios = document.getElementsByName("color-mode");
  const mode = getCheckedValuesFromRadios(colorModeRadios);
  if (mode === null) {
    throw new Error("Please Select a Color Mode");
  }
  if (toastContainer != null) {
    toastContainer.remove();
    toastContainer = null;
  }
  if (mode === "hex") {
    const hexColor = document.querySelector("#input-hex").value;
    if (hexColor && isValidHex(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor} Copied`);
    } else {
      alert("Invalid Hex Code");
    }
  } else {
    const rgbColor = document.querySelector("#input-rgb").value;
    if (rgbColor) {
      navigator.clipboard.writeText(rgbColor);
      generateToastMessage(`${rgbColor} Copied`);
    } else {
      alert("Invalid RGB color");
    }
  }
  copySound.volume = 0.2;
  copySound.play();
}

function handlePresetColorParent(event) {
  const child = event.target;
  if (child.className === "color-box") {
    copySound.volume = 0.2;
    copySound.play();
    navigator.clipboard.writeText(child.getAttribute("data-color"));
    generateToastMessage(
      `${child.getAttribute("data-color").toUpperCase()} Copied`
    );
  }
}
function handleCustomColorParent(event) {
  const child = event.target;
  if (child.className === "color-box") {
    copySound.volume = 0.2;
    copySound.play();
    navigator.clipboard.writeText(child.getAttribute("data-color"));
    generateToastMessage(
      `${child.getAttribute("data-color").toUpperCase()} Copied`
    );
  }
}
function handleSaveToCustombtn(customColorParent, inputHex) {
  return function () {
    let color = `#${inputHex.value}`;
    if (customColor.includes(color)) {
      alert("Color already saved in your list");
      return;
    }
    customColor.unshift(color);
    if (customColor.length > 24) {
      customColor = customColor.slice(0, 24);
    }
    localStorage.setItem("custom-colors", JSON.stringify(customColor));
    removeChildren(customColorParent);
    displayColorBoxes(customColorParent, customColor);
    /* copySound.volume = 0.2;
    copySound.play(); */
  };
}

//DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} message
 */
function generateToastMessage(message) {
  toastContainer = document.createElement("div");
  toastContainer.innerText = message;
  toastContainer.className = "toast-message toast-message-slide-in";

  // add eventlistener
  toastContainer.addEventListener("click", function () {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    // remove animation event listener
    toastContainer.addEventListener("animationend", function () {
      toastContainer.remove();
      toastContainer = null;
    });
  });

  document.body.appendChild(toastContainer);
}
/**
 * find the checked element from a list of radio buttons
 * @param {Array} nodes
 * @returns {null/string}
 */
function getCheckedValuesFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
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
/**
 * create a div element with class name color-box
 * @param {string} color
 * @returns {object}
 */
function generateColorBox(color) {
  const div = document.createElement("div");
  div.className = "color-box";
  div.style.backgroundColor = color;
  div.setAttribute("data-color", color);
  return div;
}
/**
 * this function will create and append new color boxes to it's parent
 * @param {object} parent
 * @param {Array} colors
 */
function displayColorBoxes(parent, colors) {
  colors.forEach(function (color) {
    if (color && isValidHex(color.slice(1))) {
      const colorBox = generateColorBox(color);
      parent.appendChild(colorBox);
    }
  });
}
/**
 * remove all children from parent
 * @param {object} parent
 */
function removeChildren(parent) {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
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
