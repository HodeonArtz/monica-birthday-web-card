"use strict";
// window.addEventListener("scroll", scrollAction);
const mainContentEl = document.querySelector(".main-content");
const sections = [...document.querySelectorAll(".main-content section")];
const scrollerContainer = document.querySelector(".scroller");
const firstSectionScrollers = [
  ...document.querySelectorAll(
    ".scroller .screen:not(:last-child) .section:last-child"
  ),
];
const sectionScrollers = [
  ...document.querySelectorAll(
    ".scroller .section:not(.section-joke, .section-intro-transition, .section-start)"
  ),
];
const marquee1 = document.querySelector(".bg .bg__marquee .text-1");
const marquee2 = document.querySelector(".bg .bg__marquee .text-2");
const bgEl = document.querySelector(".bg");

let screenScrollOffset = 0;

function getScrollPercentage(element = document.documentElement) {
  const elementYpos = element.getBoundingClientRect().top * -1;
  const elementHeight = element.getBoundingClientRect().height;
  return +(
    Math.max(Math.min(elementYpos, elementHeight), 0) / elementHeight
  ).toFixed(2);
}
function getScrollPercentageMax(element = document.documentElement) {
  const elementYpos = element.getBoundingClientRect().top * -1;
  const elementHeight = element.getBoundingClientRect().height;
  return +((Math.max(elementYpos, 0) / elementHeight) * 100).toFixed(2);
}

// <<===========||===========||===========||===========>>

sectionScrollers.forEach((section) => {
  new IntersectionObserver(changeBg, {
    root: null,
    threshold: 0.45,
  }).observe(section);
});

new IntersectionObserver(
  (entries) => {
    changeBg(entries);
    marquee1.style.opacity = 1;
    marquee2.style.opacity = 0;
  },
  {
    root: null,
    threshold: 0.3,
  }
).observe(document.querySelector(".scroller .section-joke"));
new IntersectionObserver(changeBg, {
  root: null,
  threshold: 0.2,
}).observe(document.querySelector(".scroller .section-start"));
new IntersectionObserver(
  (entries) => {
    changeBg(entries);
    marquee1.style.opacity = 0;
    marquee2.style.opacity = 1;
  },
  {
    root: null,
    threshold: 0.3,
  }
).observe(document.querySelector(".scroller .section-intro-transition"));

function changeBg(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    document.querySelectorAll(".main-content section").forEach((section) => {
      section.style.zIndex = "auto";
    });

    document.querySelector(
      `.main-content .${entry.target.classList[1]}`
    ).style.zIndex = 2;
    bgEl.className = `bg bg--${entry.target.dataset.background}`;
  }
}

// <<===========||===========||===========||===========>>
window.scroll(0, 0);
document.querySelectorAll(".scroller .section").forEach((section) => {
  section.dataset.scroll = 0;
});

// <<===========||===========||===========||===========>>
