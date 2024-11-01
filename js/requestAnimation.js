"use strict";
let requestId;
function loop() {
  requestId = undefined;
  offset += (Math.abs(scroller.getBoundingClientRect().y) - offset) * 0.15;
  screenScrollOffset +=
    (0,
    (firstSectionScrollers.reduce(
      (acc, curr) => acc + getScrollPercentage(curr) * 100,
      0
    ) -
      screenScrollOffset) *
      0.15);
  screenScrollOffset = screenScrollOffset < 0.3 ? 0 : screenScrollOffset;

  const texturePaperHeight = texturePaper.getBoundingClientRect().height;
  const textureDotsHeight = textureDotsContainer.getBoundingClientRect().height;

  mainContentEl.style.setProperty(
    "transform",
    `translateY(-${screenScrollOffset.toFixed(3)}vh)`
  );

  texturePaperContainer.style.transform = `translateY(-${getScrollValue(
    texturePaperHeight,
    0.3
  )}px)`;
  textureDotsContainer.style.transform = `translateY(-${getScrollValue(
    textureDotsHeight,
    0.2
  )}px)`;
  decorationIconsContainer.style.transform = `translateY(-${getScrollValue(
    decorationIconsContainer.getBoundingClientRect().height,
    0.8
  )}px)`;
  decorationStickersContainer.style.transform = `translateY(-${getScrollValue(
    decorationStickersContainer.getBoundingClientRect().height,
    0.8
  )}px)`;

  document.querySelectorAll(".scroller .section").forEach((section) => {
    const scrollPercentage = getScrollPercentage(section);
    const sectionScroll = +section.dataset.scroll;
    const value = sectionScroll + (scrollPercentage - sectionScroll) * 0.15;
    section.dataset.scroll = +(
      value <= 0.01 ? 0 : value >= 0.99 ? 1 : value
    ).toFixed(3);
  });

  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>

  const nextElementScroll = +scrollerStart1.nextElementSibling.dataset.scroll;
  const totalScroll =
    (+scrollerStart1.dataset.scroll + Math.min(nextElementScroll, 0.4)) / 1.4;

  start1TransitionElements.forEach((element, i, array) => {
    const result = getFadeOutAnimationValue(totalScroll, i, array.length, 2);

    element.style.opacity = result;
    element.style.fontWeight = result * 700;
  });
  // <<===========||===========||===========||===========>>
  intro2TransitionElements.forEach((element, i, array) => {
    const result = getFadeInOutAnimationValue(
      +scrollerStart2.dataset.scroll,
      i,
      array.length,
      1
    );

    element.style.opacity = result;
    element.style.fontWeight = result * 500;
  });
  // <<===========||===========||===========||===========>>
  const mainScroll = +scrollerJoke.dataset.scroll;
  const transitionMainScroll =
    getScrollValueSegment(mainScroll, 0, 0.5) -
    getScrollValueSegment(mainScroll, 0.5, 1);

  const fullScroll = getSectionScroll(scrollerJoke);

  jokeTransitionElements.forEach((element, i, array) => {
    const result = getFadeInOutAnimationValue(
      fullScroll,
      i,
      array.length,
      2.5,
      0.35
    );
    element.style.setProperty("transform", `scale(${result})`);
    element.style.setProperty(
      "transform",
      `rotate(${(result * 360).toFixed(2)}deg)`
    );
    element.style.setProperty("opacity", result);
  });

  jokeDecorationElements.forEach((decoration, i, array) => {
    const segmentLength = 1 / array.length;
    const result = Math.floor(
      getScrollValueSegment(
        transitionMainScroll,
        segmentLength * i,
        segmentLength * (i + 0.01)
      )
    );
    decoration.style.setProperty("opacity", result);
  });
  // <<===========||===========||===========||===========>>
  sectionIntroTransitionAnim();
  // <<===========||===========||===========||===========>>
  sectionStartAnim();
  // <<===========||===========||===========||===========>>
  sectionCakeAnim();
  // <<===========||===========||===========||===========>>
  sectionGiftsAnim();
  // <<===========||===========||===========||===========>>
  sectionMsgAnim();

  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>
  // <<===========||===========||===========||===========>>

  if (offset % 1 < 0.99) {
    start();
  } else {
    stop();
  }
}

function start() {
  if (!requestId) requestId = requestAnimationFrame(loop);
}
function stop() {
  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}
start();
addEventListener("scroll", (event) => {
  start();
});
