"use strict";
const sectionScrollThreshold = 0.25;

const textElements = [...document.querySelectorAll("h1")];
textElements.forEach((textEl) => {
  spanDivide(textEl);
});
const interleave = (arr, thing) =>
  [].concat(...arr.map((n) => [n, thing])).slice(0, -1);

function spanDivide(element) {
  const elementArray = Array.isArray(element) ? element : [element];
  for (let i = 0; i < elementArray.length; i++) {
    const words = elementArray[i].textContent
      .trim()
      .split(" ")
      .filter((curr) => curr !== "");
    elementArray[i].textContent = "";
    for (let j = 0; j < words.length; j++) {
      const wordElement = document.createElement("span");
      wordElement.className = "word";
      // wordElement.dataset.wordOrder = j + 1;

      const letters = words[j].split("");

      for (let k = 0; k < letters.length; k++) {
        const letterElement = document.createElement("span");
        letterElement.textContent = letters[k];
        letterElement.className = "letter";
        letterElement.dataset.order = k + 1;
        wordElement.appendChild(letterElement);
      }
      elementArray[i].appendChild(wordElement);
      if (j + 1 !== words.length) {
        const spaceElement = document.createElement("span");
        spaceElement.textContent = " ";
        spaceElement.className = "space";
        elementArray[i].appendChild(spaceElement);
      }
    }
  }
}

function getScrollValueSegment(scroll, start, end, threshold = 0) {
  const length = end - start;
  const extra = length * threshold;
  const lockedValue = Math.max(start, Math.min(end + extra, scroll));
  return (lockedValue - start) / length + extra;
}
function getFadeInAnimationValue(
  scroll,
  order,
  length,
  threshold = 0,
  displayThreshold = 0.35
) {
  const fadeInScroll =
    Math.max(0, Math.min(scroll, displayThreshold)) / displayThreshold;

  const converted = fadeInScroll;

  const timeLength = 1 / (length + threshold);
  const extra = timeLength * threshold;
  const startScroll = timeLength * order;
  const endScroll = timeLength * (order + 1) + extra;
  const timelineProgress = Math.max(
    startScroll,
    Math.min(endScroll, converted)
  );
  const result = (timelineProgress - startScroll) / (timeLength + extra);
  return result > 0.999 ? 1 : result < 0.001 ? 0 : result;
}
function getFadeToggleAnimationValue(
  scroll,
  order,
  length,
  threshold = 0,
  displayThreshold = 0.35
) {
  const fadeInScroll =
    Math.max(0, Math.min(scroll, displayThreshold)) / displayThreshold;
  const converted = fadeInScroll;
  const timeLength = 1 / (length + threshold);
  const extra = timeLength * threshold;
  const startScroll = timeLength * order;
  const startScroll2 = timeLength * (order + 1);
  const endScroll = timeLength * (order + 1) + extra;
  const endScroll2 = timeLength * (order + 2) + extra;
  const timelineProgress = Math.max(
    startScroll,
    Math.min(endScroll, converted)
  );
  const timelineProgress2 = Math.max(
    startScroll2,
    Math.min(endScroll2, converted)
  );
  const result1 = (timelineProgress - startScroll) / (timeLength + extra);
  const result2 = (timelineProgress2 - startScroll2) / (timeLength + extra);
  const result = result1 - result2;
  return result > 0.999 ? 1 : result < 0.001 ? 0 : result;
}
function getFadeOutAnimationValue(scroll, order, length, threshold = 0) {
  const converted = 1 - scroll;
  const timeLength = 1 / (length + threshold);
  const extra = timeLength * threshold;
  const startScroll = timeLength * order;
  const endScroll = timeLength * (order + 1) + extra;
  const timelineProgress =
    Math.max(startScroll, Math.min(endScroll, converted)) - startScroll;
  return timelineProgress / (timeLength + extra);
}
function getFadeInOutAnimationValue(
  scroll,
  order,
  length,
  threshold = 0,
  displayThreshold = 0.35
) {
  const fadeInScroll =
    Math.max(0, Math.min(scroll, displayThreshold)) / displayThreshold;
  const fadeOutScroll =
    (Math.max(1 - displayThreshold, Math.min(scroll, 1)) -
      (1 - displayThreshold)) /
    displayThreshold;

  const converted = fadeInScroll - fadeOutScroll;

  const timeLength = 1 / (length + threshold);
  const extra = timeLength * threshold;
  const startScroll = timeLength * order;
  const endScroll = timeLength * (order + 1) + extra;
  const timelineProgress = Math.max(
    startScroll,
    Math.min(endScroll, converted)
  );
  return (timelineProgress - startScroll) / (timeLength + extra);
}

function getSectionScroll(element) {
  const prevScroll = element.previousElementSibling
    ? +element.previousElementSibling.dataset.scroll
    : 0;
  const currentScroll = +element.dataset.scroll;
  const nextScroll = element.nextElementSibling
    ? +element.nextElementSibling.dataset.scroll
    : 0;

  return (
    (Math.max(prevScroll, 1 - sectionScrollThreshold) -
      (1 - sectionScrollThreshold) +
      currentScroll +
      Math.min(nextScroll, sectionScrollThreshold)) /
    (1 + sectionScrollThreshold * 2)
  );
}
// <<===========||===========||===========||===========>>

function sectionAnimations() {
  sectionStart1Anim();
  sectionStart2Anim();
  sectionJokeAnim();
  sectionIntroTransitionAnim();
  sectionStartAnim();
  sectionCakeAnim();
  sectionGiftsAnim();
  sectionMsgAnim();
}

// >>=====>>====>>====#[<| start 1 |>]#====<<====<<=====<<
const sectionStart1 = document.querySelector(
  ".main-content section.section-intro-1"
);
const start1TransitionElements = [
  ...sectionStart1.querySelectorAll(".msg span.letter, .decoration img"),
];
const scrollerStart1 = document.querySelector(".scroller .section-intro-1");

// >>=====>>====>>====#[<| intro 2 |>]#====<<====<<=====<<

spanDivide(document.querySelector(".main-content .section-intro-2 .msg"));
const sectionStart2 = document.querySelector(
  ".main-content section.section-intro-2"
);
const intro2TransitionElements = [
  ...sectionStart2.querySelectorAll(".msg span.letter"),
];
const scrollerStart2 = document.querySelector(".scroller .section-intro-2");

// >>=====>>====>>====#[<| joke |>]#====<<====<<=====<<

const sectionJoke = document.querySelector(
  ".main-content section.section-joke"
);
const jokeTransitionElements = [
  ...sectionJoke.querySelectorAll(".msg span.word"),
];
const jokeDecorationElements = sectionJoke.querySelectorAll(
  `[class^="decoration"]`
);
const scrollerJoke = document.querySelector(".scroller .section-joke");

// >>=====>>====>>====#[<| intro-transition |>]#====<<====<<=====<<
spanDivide([
  ...document.querySelectorAll(
    ".main-content .section-intro-transition .subtitle, .main-content .section-intro-transition .msg"
  ),
]);
const sectionIntroTransition = document.querySelector(
  ".main-content section.section-intro-transition"
);
const scrollerIntroTransition = document.querySelector(
  ".scroller .section.section-intro-transition"
);
const introTransitionTransitionEls1 = [
  ...sectionIntroTransition.querySelectorAll(".subtitle .letter"),
];
const introTransitionTransitionEls2 = [
  ...sectionIntroTransition.querySelectorAll(".msg .letter"),
];

function sectionIntroTransitionAnim() {
  const fullScroll = getSectionScroll(scrollerIntroTransition);

  introTransitionTransitionEls1.forEach(function (letter, i, array) {
    const result = getFadeInOutAnimationValue(
      fullScroll,
      i,
      array.length,
      2.5,
      0.35
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("font-weight", result * 500);
  });

  introTransitionTransitionEls2.forEach(function (letter, i, array) {
    const result = getFadeInOutAnimationValue(
      1 - fullScroll,
      array.length - 1 - i,
      array.length,
      2.5,
      0.35
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * -1.5}rem)`
    );
    letter.style.setProperty("font-weight", result * 700);
  });
}

// >>=====>>====>>====#[<| start |>]#====<<====<<=====<<
spanDivide([
  ...document.querySelectorAll(
    ".main-content .section-start .msg, .main-content .section-start .birthday-girl, .main-content .section-start .wishes .text"
  ),
]);
const sectionStart = document.querySelector(
  ".main-content section.section-start"
);
const scrollerStart = document.querySelector(
  ".scroller .section.section-start"
);
const startMsg = sectionStart.querySelector(".msg");
const startMsgLetters = [...startMsg.querySelectorAll(".letter")];

const birthdayGirl = sectionStart.querySelector(".birthday-girl");
const birthdayGirlLetters = [...birthdayGirl.querySelectorAll(".letter")];

const wishes = sectionStart.querySelector(".wishes");
const wishesTransitionElements = [
  ...wishes.querySelectorAll(".names, .text .letter"),
];

function sectionStartAnim() {
  const fullScroll = getSectionScroll(scrollerStart);
  startMsgLetters.forEach(function (letter, i, array) {
    const result = getFadeInAnimationValue(
      fullScroll,
      i,
      array.length,
      3,
      0.25
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("font-weight", result * 700);
  });
  const msgScroll = getScrollValueSegment(fullScroll, 0, 0.35);
  const msgTranslate = getScrollValueSegment(msgScroll, 0.4, 1) * 150;
  const msgScale1 = getScrollValueSegment(msgScroll, 0, 0.4) * 0.25 + 2;
  const msgScale2 = getScrollValueSegment(msgScroll, 0.6, 1) * 0.25 + 1;
  startMsg.style.setProperty(
    "transform",
    `translateY(${150 - msgTranslate}%)
     scale(${msgScale1 - msgScale2})
    `
  );
  birthdayGirlLetters.forEach(function (letter, i, array) {
    const result = getFadeInAnimationValue(
      getScrollValueSegment(fullScroll, 0.25, 0.4),
      i,
      array.length,
      2,
      1
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 700);
  });
  wishesTransitionElements.forEach(function (letter, i, array) {
    const result = getFadeInAnimationValue(
      getScrollValueSegment(fullScroll, 0.35, 0.55),
      i,
      array.length,
      0,
      1
    );
    letter.style.setProperty(
      "transform",
      `translateY(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
  });
}

// >>=====>>====>>====#[<| cake |>]#====<<====<<=====<<

const sectionCake = document.querySelector(
  ".main-content section.section-cake"
);
const scrollerStartScroll = document.querySelector(
  ".scroller .section-start-scroll"
);
const years = sectionCake.querySelector(".years");
const ageDigit1 = years.querySelector(".digit-1");
const ageDigit2 = years.querySelector(".digit-2");
function sectionCakeAnim() {
  const transitionScroll = getScrollValueSegment(
    +scrollerStartScroll.dataset.scroll,
    0.2,
    0.8
  );
  ageDigit1.style.setProperty(
    "transform",
    `translateY(-${transitionScroll * 100}%)`
  );
  ageDigit1.style.setProperty("font-weight", transitionScroll * 700);

  ageDigit2.style.setProperty(
    "transform",
    `translateY(-${transitionScroll * 900}%)`
  );
  ageDigit2.style.setProperty("font-weight", transitionScroll * 700);
}

// >>=====>>====>>====#[<| gift |>]#====<<====<<=====<<
const sectionGifts = [
  ...document.querySelectorAll(".main-content section.section-gift"),
];
const sectionGift1 = sectionGifts[0];
const sectionGift2 = sectionGifts[1];
const scrollerGifts = [
  ...document.querySelectorAll(
    ".scroller .section-gift-1, .scroller .section-gift-2"
  ),
];
const scrollerGift1 = scrollerGifts[0];
const scrollerGift2 = scrollerGifts[1];
for (let i = 0; i < sectionGifts.length; i++) {
  const sectionGift = sectionGifts[i];
  spanDivide([
    ...sectionGift.querySelectorAll(
      ".subtitle span[class^='text'], .title span[class^='text']"
    ),
  ]);
}
const gift1Letters1 = sectionGift1.querySelectorAll(".text-1 .letter");
const gift1Letters2 = sectionGift1.querySelectorAll(".text-2 .letter");
const gift2Letters1 = sectionGift2.querySelectorAll(".text-1 .letter");
const gift2Letters2 = sectionGift2.querySelectorAll(".text-2 .letter");
const present2 = sectionGift2.querySelector(".present-2");
const present1Box = sectionGift1.querySelector(".present__box");
const present1Lid = sectionGift1.querySelector(".present__lid");
const present2Box = sectionGift2.querySelector(".present__box");
const present2Lid = sectionGift2.querySelector(".present__lid");
const actualGift1 = sectionGift1.querySelector(".present__actual-gift-1");
const actualGift2 = sectionGift2.querySelector(".present__actual-gift-2");
function sectionGiftsAnim() {
  const gift1Scroll = getScrollValueSegment(
    +scrollerGift1.dataset.scroll,
    0,
    1
  );
  const gift1ObjectScroll = getScrollValueSegment(
    +scrollerGift1.nextElementSibling.dataset.scroll,
    0,
    1
  );
  const gift2Scroll = getScrollValueSegment(
    +scrollerGift2.dataset.scroll,
    0,
    1
  );
  const gift2ObjectScroll = getScrollValueSegment(
    +scrollerGift2.nextElementSibling.dataset.scroll,
    0,
    1
  );
  present1Box.style.setProperty(
    "transform",
    `translateY(${getScrollValueSegment(gift1Scroll, 0.2, 0.6) * 10}rem)
    rotate(${getScrollValueSegment(gift1Scroll, 0.2, 0.6) * 3}deg)`
  );
  present1Box.style.setProperty(
    "opacity",
    `${1 - getScrollValueSegment(gift1Scroll, 0.45, 0.6)}`
  );
  present1Lid.style.setProperty(
    "transform",
    `translateY(-${getScrollValueSegment(gift1Scroll, 0.2, 0.6) * 10}rem)
    rotate(-${getScrollValueSegment(gift1Scroll, 0.2, 0.6) * 10}deg)`
  );
  present1Lid.style.setProperty(
    "opacity",
    `${1 - getScrollValueSegment(gift1Scroll, 0.45, 0.6)}`
  );
  actualGift1.style.setProperty(
    "transform",
    `scale(${getScrollValueSegment(gift1Scroll, 0.2, 0.6) * 0.5 + 1.5})`
  );
  actualGift1.style.setProperty(
    "opacity",
    `${gift1Scroll - gift1ObjectScroll}`
  );
  present2.style.setProperty(
    "opacity",
    getScrollValueSegment((gift1ObjectScroll + gift2Scroll) / 2, 0.4, 0.6)
  );
  present2Box.style.setProperty(
    "transform",
    `translateY(${getScrollValueSegment(gift2Scroll, 0.6, 1) * 10}rem)
    rotate(-${getScrollValueSegment(gift2Scroll, 0.6, 1) * 3}deg`
  );
  present2Box.style.setProperty(
    "opacity",
    `${1 - getScrollValueSegment(gift2Scroll, 0.6, 1)}`
  );
  present2Lid.style.setProperty(
    "transform",
    `translateY(-${getScrollValueSegment(gift2Scroll, 0.6, 1) * 10}rem)
    rotate(${getScrollValueSegment(gift2Scroll, 0.6, 1) * 10}deg`
  );
  present2Lid.style.setProperty(
    "opacity",
    `${1 - getScrollValueSegment(gift2Scroll, 0.6, 1)}`
  );
  actualGift2.style.setProperty(
    "transform",
    `scale(${getScrollValueSegment(gift2Scroll, 0.6, 1) * 0.5 + 1.5})`
  );
  actualGift2.style.setProperty(
    "opacity",
    `${getScrollValueSegment(gift2Scroll, 0.6, 1)}`
  );

  gift1Letters1.forEach(function (letter, i, array) {
    const result = getFadeOutAnimationValue(
      getScrollValueSegment(gift1Scroll, 0, 0.6),
      i,
      array.length,
      0
    );

    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 500);
  });
  gift1Letters2.forEach(function (letter, i, array) {
    const result = getFadeInOutAnimationValue(
      getScrollValueSegment((gift1Scroll + gift1ObjectScroll) / 2, 0.2, 1),
      i,
      array.length,
      0
    );
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 500);
  });
  gift2Letters1.forEach(function (letter, i, array) {
    const result = getFadeInOutAnimationValue(
      getScrollValueSegment((gift1ObjectScroll + gift2Scroll) / 2, 0.4, 1),
      i,
      array.length,
      0
    );
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 500);
  });
  gift2Letters2.forEach(function (letter, i, array) {
    const result = getFadeInAnimationValue(
      getScrollValueSegment((gift2ObjectScroll + gift2Scroll) / 2, 0.5, 1),
      i,
      array.length,
      0
    );
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 500);
  });
}

// >>=====>>====>>====#[<| msg |>]#====<<====<<=====<<
const sectionMsg = document.querySelector(".main-content .section-msg");
const scrollerMsg1 = document.querySelector(".scroller .section-msg-1");
const scrollerMsg2 = document.querySelector(".scroller .section-msg-2");
const scrollerGiftScroll = document.querySelector(
  ".scroller .section-gift-scroll"
);
const msgCurrImage = sectionMsg.querySelector(".curr-img");
spanDivide(sectionMsg.querySelector(".text-1"));
spanDivide(sectionMsg.querySelector(".text-2"));
const msg1Letters = sectionMsg.querySelectorAll(".text-1 .letter");
const msg2Letters = sectionMsg.querySelectorAll(".text-2 .letter");
const moniImgs = sectionMsg.querySelectorAll(".moni-img .img");
const moniOriginalImgs = sectionMsg.querySelectorAll(".moni-img .img img");

function sectionMsgAnim() {
  const fullScroll =
    (+scrollerMsg1.dataset.scroll + +scrollerMsg2.dataset.scroll) / 2;

  msgCurrImage.style.setProperty(
    "transform",
    `translateY(-${fullScroll * 20}%)`
  );
  msg1Letters.forEach(function (letter, i, array) {
    const result = getFadeOutAnimationValue(
      getScrollValueSegment(+scrollerMsg1.dataset.scroll, 0.4, 0.75),
      array.length - 1 - i,
      array.length,
      0
    );
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 400);
  });
  msg2Letters.forEach(function (letter, i, array) {
    const result = getFadeInAnimationValue(
      getScrollValueSegment(+scrollerMsg1.dataset.scroll, 0.6, 1),
      i,
      array.length,
      0
    );
    letter.style.setProperty(
      "transform",
      `translateX(${(1 - result) * 1.5}rem)`
    );
    letter.style.setProperty("opacity", result);
    letter.style.setProperty("font-weight", result * 400);
  });
  moniImgs.forEach(function (img, i, array) {
    if (i === 0) return;
    const result = getFadeToggleAnimationValue(
      fullScroll,
      i,
      array.length,
      -0.5,
      0.5
    );
    img.style.setProperty("opacity", result);
    moniOriginalImgs[i].setAttribute("loading", result > 0 ? "eager" : "lazy");
  });
}
