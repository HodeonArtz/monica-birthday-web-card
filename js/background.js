"use strict";
// <<===========||===========||===========||===========>>

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function duplicateElement(element) {
  const duplicatedEl = document.createElement(element.tagName);
  duplicatedEl.className = element.className;
  duplicatedEl.innerHTML = element.innerHTML;
  return duplicatedEl;
}
const decorationIconsContainer = document.querySelector(
  ".decoration-icons .pos-relative"
);
const decorationStickersContainer = document.querySelector(
  ".decoration-stickers .pos-relative"
);

const icons = [...document.querySelectorAll(".decoration-icons .decoration")];
const stickers = [
  ...document.querySelectorAll(".decoration-stickers .sticker"),
];
function generateBgSprites(
  sprites,
  containerBg,
  settings = {
    quantity: Math.floor(getRandom(30, 40)),
    range: {
      x: window.innerWidth * 4,
      y: containerBg.getBoundingClientRect().height,
    },
  }
) {
  sprites.forEach((sprite) => {
    for (const iterator of Array(settings.quantity)) {
      const clonedElement = duplicateElement(sprite);
      clonedElement.style.marginLeft = `${
        getRandom(-settings.range.x, settings.range.x).toFixed(2) / 2
      }px`;
      clonedElement.style.marginTop = `${getRandom(0, settings.range.y).toFixed(
        1
      )}px`;

      clonedElement.querySelector(
        ".pos-relative"
      ).style.transform = `rotate(${getRandom(-45, 45).toFixed(
        2
      )}deg) scale(${getRandom(0.4, 1.4).toFixed(4)})`;
      const randomDelay = getRandom(-7, 0);
      for (const iterator of clonedElement.querySelectorAll(".sticker-img")) {
        iterator.style.animationDelay = `${randomDelay}s`;
      }

      containerBg.append(clonedElement);
    }
  });
  sprites.forEach((sprite) => sprite.remove());
}
generateBgSprites(icons, decorationIconsContainer);
generateBgSprites(stickers, decorationStickersContainer, {
  quantity: 1,
  range: {
    x: window.innerWidth * 2,
    y: decorationStickersContainer.getBoundingClientRect().height,
  },
});

// <<===========||===========||===========||===========>>

const body = document.querySelector("body"),
  scroller = document.querySelector(".scroller"),
  texturePaperContainer = document.querySelector(".texture__paper-container"),
  texturePaper = texturePaperContainer.querySelector(".texture__paper"),
  textureDotsContainer = document.querySelector(".texture__dots-container"),
  textureDots = textureDotsContainer.querySelector(".texture__dots");

let offset = 0;

function getScrollValue(elementHeight, offsetRatio) {
  return (
    Math.floor(offset.toFixed(2)) *
    ((elementHeight / scroller.getBoundingClientRect().height) * offsetRatio)
  );
}
