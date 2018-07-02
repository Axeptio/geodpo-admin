var cookieManager = document.createElement("div");
cookieManager.classList.add("cookie-manager");
document.body.append(cookieManager);

var cookieIcon = document.createElement("div");
cookieIcon.classList.add("cookie-icon");
cookieIcon.classList.add("hidden");
cookieManager.append(cookieIcon);
setTimeout(() => cookieIcon.classList.remove("hidden"), 2000);

var cookieTooltip = document.createElement("div");
cookieManager.append(cookieTooltip);
cookieTooltip.classList.add("cookie-tooltip");
cookieTooltip.classList.add("hidden");
setTimeout(() => cookieTooltip.classList.remove("hidden"), 4000);

var cookieWelcomeTooltip = document.createElement("div");
cookieWelcomeTooltipTitle = document.createElement("h3");
cookieWelcomeTooltipTitle.append(document.createTextNode("Les cookies, ça vous dit ?"));
cookieWelcomeTooltip.append(cookieWelcomeTooltipTitle);
var cookieWelcomeTooltipText = document.createElement("p");
cookieWelcomeTooltip.append(cookieWelcomeTooltipText);
cookieWelcomeTooltipText.append(document.createTextNode("Nous vous proposons d'utiliser des cookies pour adapter votre expérience de navigation."));
var cookieWelcomeTooltipBold = document.createElement("b");
cookieWelcomeTooltipBold.append(document.createTextNode("Cliquez sur le gâteau pour en savoir plus."));
cookieWelcomeTooltipText.append(cookieWelcomeTooltipBold);
cookieTooltip.append(cookieWelcomeTooltip);

var cookieParamsTooltip = document.createElement("div");
var cookieParamsTooltipText = document.createElement("p");
cookieParamsTooltip.append(cookieParamsTooltipText);
cookieParamsTooltipText.append(document.createTextNode("Faites glisser le gâteau vers le haut pour accéder aux paramètres."));

var cookieParams = document.createElement("div");
cookieParams.classList.add("cookie-params");
cookieManager.append(cookieParams);
cookieParamsMenu = document.createElement("div");
cookieParamsMenu.classList.add("cookie-params-menu");
cookieParams.append(cookieParamsMenu);


var cookieSelector = document.createElement("div");
cookieSelector.classList.add("cookie-selector");
cookieSelector.classList.add("hidden");
cookieManager.append(cookieSelector);

var cookieSelectNo = document.createElement("div");
cookieSelectNo.classList.add("cookie-select");
cookieSelectNo.classList.add("cookie-select-no");
var cookieSelectNoIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
cookieSelectNoIcon.classList.add("cookie-select-icon");
cookieSelectNoIcon.setAttribute('viewBox', "0 0 52 52");
var cookieSelectNoIconPath1 = document.createElementNS('http://www.w3.org/2000/svg', "path");
cookieSelectNoIconPath1.setAttribute("fill", "none");
cookieSelectNoIconPath1.setAttribute("d", "M16,16 l20,20");
cookieSelectNoIcon.append(cookieSelectNoIconPath1);
var cookieSelectNoIconPath2 = document.createElementNS('http://www.w3.org/2000/svg', "path");
cookieSelectNoIconPath2.setAttribute("fill", "none");
cookieSelectNoIconPath2.setAttribute("d", "M16,36 l20,-20");
cookieSelectNoIcon.append(cookieSelectNoIconPath2);
cookieSelectNo.append(cookieSelectNoIcon);
cookieSelector.append(cookieSelectNo);
var cookieSelectOk = document.createElement("div");
cookieSelectOk.classList.add("cookie-select");
cookieSelectOk.classList.add("cookie-select-ok");
var cookieSelectOkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
cookieSelectOkIcon.classList.add("cookie-select-icon");
cookieSelectOkIcon.setAttribute('viewBox', "0 0 52 52");
var cookieSelectOkIconPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
cookieSelectOkIconPath.setAttribute("fill", "none");
cookieSelectOkIconPath.setAttribute("d", "M14.1 27.2l7.1 7.2 16.7-16.8");
cookieSelectOkIcon.append(cookieSelectOkIconPath);
cookieSelectOk.append(cookieSelectOkIcon);
cookieSelector.append(cookieSelectOk);

var dragCookie = false;
var overSelect = null;
var cookieClient = {
  h: document.body.clientHeight,
  w: document.body.clientWidth
};
var cookieStartFocusPoint = null;
var cookieDragType = null;
var cookieMenuOpen = false;

$(".cookie-icon").on("touchstart", e => {
  
  cookieTooltip.removeChild(cookieTooltip.firstChild);
  cookieTooltip.append(cookieParamsTooltip);
  if (!cookieMenuOpen)
    cookieSelector.classList.remove("hidden");
  cookieStartFocusPoint = {
    x: e.originalEvent.touches[0].clientX,
    y: e.originalEvent.touches[0].clientY
  };
  dragCookie = true;
  cookieDragType = null;
  if (cookieMenuOpen) cookieDragType = "v";
});

var getCookies = () => {
  
  var res = {};
  document.cookie.split(";").forEach(el => {
    var split = el.trim().split("=");
    res[split[0]] = split[1];
  });
  return res;
}

var resetCookie = () => {
  
  dragCookie = false;
  cookieIcon.setAttribute('style', `left: 50%`);
  cookieParams.setAttribute('style', `bottom: -100%`);
  cookieSelector.classList.remove("hidden");
  cookieTooltip.classList.remove("hidden");
  cookieSelectOk.classList.remove("selected");
  cookieSelectNo.classList.remove("selected");
  cookieMenuOpen = false;
};

var displayParams = () => {
  
  cookieParams.setAttribute('style', 'bottom: 0%');
  cookieIcon.setAttribute('style', `bottom: ${cookieClient.h-75}px`);
  cookieMenuOpen = true;
  console.log(getCookies());
};

document.addEventListener("touchend", e => {
  
  switch (overSelect) {
    case null:
    case "ok":
    case "no":
      resetCookie();
      break;
    case "params":
      displayParams();
      break;
  }
});

document.addEventListener("touchmove", e => {
  
  if (!dragCookie) return;
  
  let transition = {
    x: cookieDragType === "v" ? 0 : Math.floor(e.touches[0].clientX - cookieStartFocusPoint.x),
    y: cookieDragType === "h" ? 0 : cookieMenuOpen ? Math.min(cookieClient.h-100, Math.max(0, Math.floor(e.touches[0].clientY - cookieStartFocusPoint.y))) : Math.max(100-cookieClient.h, Math.min(0, Math.floor(e.touches[0].clientY - cookieStartFocusPoint.y)))
  };
  
  if (cookieDragType === null) {
    cookieTooltip.classList.remove("hidden");
    if (transition.x * transition.x + transition.y * transition.y > 600) {
      if (transition.x * transition.x > transition.y * transition.y) {
        cookieDragType = "h";
        transition.y = 0;
        cookieTooltip.classList.add("hidden");
      } else {
        cookieDragType = "v";
        transition.x = 0;
        cookieTooltip.classList.add("hidden");
      }
    }
  }
  
  let x = Math.floor(e.touches[0].clientX);
  let y = Math.floor(e.touches[0].clientY);
  
  cookieIcon.setAttribute('style',
  `left: ${cookieClient.w/2+transition.x}px;
  transition: none; bottom: ${cookieMenuOpen ? (cookieClient.h-75-transition.y) : (25-transition.y)}px;`);
  
  if (cookieDragType === "h") {
    
    if (x < cookieClient.w/3) overSelect = "no";
    else if (x > 2*cookieClient.w/3) overSelect = "ok";
    else overSelect = null;
    
    if (overSelect !== null) {
      if (overSelect === "ok")
        cookieSelectOk.classList.add("selected");
      else
        cookieSelectNo.classList.add("selected");
    } else {
      cookieSelectOk.classList.remove("selected");
      cookieSelectNo.classList.remove("selected");
    }
  } else if (cookieDragType === "v") {
    
    var cookieVSelectPrct = cookieMenuOpen ? Math.floor((transition.y)*100/(100-cookieClient.h)) : Math.floor((transition.y-100+cookieClient.h)*100/(100-cookieClient.h));
    cookieParams.setAttribute("style", `bottom: ${cookieVSelectPrct}%; transition: none;`);
    cookieSelector.classList.add("hidden");
    overSelect = cookieVSelectPrct < -50 ? null : "params";
  }
});