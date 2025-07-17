/* JavaScript Goes Here */

const displayElem = document.querySelector("#display");

function appendToDisplay(input) {
  displayElem.value += input;
}
function clearDisplay() {
  displayElem.value = "";
}
function calculate() {
  try {
    displayElem.value = eval(displayElem.value);
  } catch (error) {
    displayElem.value = "Error";
  }
}
