/* JavaScript Goes Here */
/* Change the background color by clicking button */

window.onload = () => {
  main();
};

function main() {
  const rootElem = document.querySelector("#root");
  const changeBtnElem = document.querySelector("#change-btn");

  changeBtnElem.addEventListener("click", function () {
    const bgcolor = generateRGBColor();
    rootElem.style.backgroundColor = bgcolor;
  });
}

function generateRGBColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red},${green},${blue})`;
}
