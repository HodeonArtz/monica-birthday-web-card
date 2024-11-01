"use strict";
const cakeEl = sectionCake.querySelector(".cake");
function blowCandles() {
  cakeEl.classList.add("candles-blown");
  sectionCake.querySelector(".text").style.setProperty("opacity", 0);
  sectionCake
    .querySelector(".subtitle .text-1")
    .style.setProperty("opacity", 0);
  sectionCake
    .querySelector(".subtitle .text-2")
    .style.setProperty("opacity", 1);
  cakeEl.removeEventListener("click", blowCandles, false);
}
cakeEl.addEventListener("click", blowCandles);
