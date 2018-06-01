let mainOptions = {
  backgroundColor: "rgba(0, 185, 212, 0.51)"
};
let oldTarget;
let layer = document.createElement("div");
layer.style.pointerEvents = "none";

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName === "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function onMouseMove(event) {
  const { excludedTarget, backgroundColor } = mainOptions;
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (!oldTarget) {
    document.body.style.cursor = "pointer";
  }
  if (target.closest(excludedTarget)) {
    return;
  }
  oldTarget = target;

  const pos = getPosition(target);

  layer.style.display = "block";
  layer.style.position = "absolute";
  layer.style.width = target.offsetWidth + "px";
  layer.style.height = target.offsetHeight + "px";
  layer.style.top = pos.y + "px";
  layer.style.left = pos.x + "px";
  layer.style.backgroundColor = backgroundColor;
}

function onMouseClick(event) {
  const { excludedTarget, onClick } = mainOptions;
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (event.preventDefault) event.preventDefault();
  if (event.stopPropagation) event.stopPropagation();
  if (target.closest(excludedTarget)) {
    return;
  }
  onClick(target);
  reset();
  return false;
}

function reset() {
  document.removeEventListener("click", onMouseClick, false);
  document.removeEventListener("mousemove", onMouseMove, false);
  document.body.style.cursor = "auto";
  layer.style.display = "none";
  oldTarget = null;
}

export function startPick(options = {}) {
  if (typeof window === "undefined") {
    return;
  }

  mainOptions = {
    ...mainOptions,
    ...options
  };

  if (typeof mainOptions.onClick !== "function") {
    console.error("onClick must be defined");
  }

  document.addEventListener("click", onMouseClick, false);
  document.addEventListener("mousemove", onMouseMove, false);
  document.body.appendChild(layer);
}
