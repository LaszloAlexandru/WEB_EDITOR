var previousElement;
var hoverClass = document.createElement('style');
hoverClass.type = 'text/css';
hoverClass.innerHTML = '.textHover{ border: 2px solid red !important; } .selectClass{ border: 2px solid blue !important';
document.getElementsByTagName('head')[0].appendChild(hoverClass);

function getIndex(element, nodes) {
  for(var i = 0 ;i<nodes.length; ++i){
    if(element === nodes[i]) {
      return i+1;
    }
  }
}

function getPath (e, xPath) {
  if(e != null) {
    if(e.nodeName === "BODY")
      return xPath;
    getPath(e.parentElement, xPath);
    const filteredNodes = [];
    for(let i = 0; i < e.parentElement.childNodes.length; ++i){
      if(e.parentElement.childNodes[i].nodeName === e.nodeName){
        filteredNodes.push(e.parentElement.childNodes[i]);
      }
    }
    if(filteredNodes.length > 1){
      const index = getIndex(e, filteredNodes);
      if (index > 1) {
        xPath.push(e.nodeName.toString() + "[" + index + "]");
      } else {
        xPath.push(e.nodeName.toString());
      }
    }
    else xPath.push(e.nodeName.toString());
    return xPath;
  }
}

function submitForm() {
  window.parent.postMessage('submitted form', '*')
}

function getElementByXpath(path) {
  if(path != null){
    let selector = path.split("/");
    let searchedElemen = [];
    for(var elem of selector){
      if(elem.includes("[")){
        let parsedElem = elem.slice(0,elem.length-1).split("[");
        parsedElem = parsedElem.map(it => {
          if(!isNaN(it)) return it - 0;
          else return it;
        });
        searchedElemen.push(parsedElem);
      } else {
        searchedElemen.push(elem);
      }
    }

    let currentElement = document.getElementsByTagName("body")[0];
    for(let element of searchedElemen) {
      const currentElementChildrenArray = Array.from(currentElement.children);
      if(typeof element === "string"){
        const currentElementChildren = currentElementChildrenArray.filter(child => child.nodeName.toLowerCase() === element.toLowerCase())
        currentElement = currentElementChildren[0];
      } else {
        const elementType = element[0];
        const elementIndex = element[1];
        const currentElementChildren = currentElementChildrenArray.filter(child => child.nodeName.toLowerCase() === elementType.toLowerCase())
        currentElement = currentElementChildren[elementIndex - 1];
      }
    }

    return currentElement;
  } else {
    const body = document.getElementsByTagName("body")[0];
    return body;
  }
}


document.addEventListener("click", function(e){
  let xPath = [];
  xPath = getPath(e.target, xPath);
  const element = getElementByXpath(xPath.join("/").toLowerCase());
  const serializer = new XMLSerializer();
  const innerHTML = [];
  const innerText = element.innerText;
  const children = Array.from(element.children);
  children.forEach(x => innerHTML.push(serializer.serializeToString(x)));
  window.parent.postMessage({
    path: xPath.join("/").toLowerCase(),
    innerHTML: innerHTML,
    innerText,
    action: 'click'
  }, '*');
});


document.addEventListener("mouseover", function(e){
  let xPath = [];
  xPath = getPath(e.target, xPath);
  window.parent.postMessage({
    path: xPath.join("/").toLowerCase(),
    action: 'mouseover'
  }, '*');
});

document.addEventListener('mouseout', function(event) {
  if(event.target != null && event.target.className != null) {
    event.target.className = event.target.className.split(' textHover').join('');
  }
});

const handleBackgroundChange = (element, backgroundColor) => {
  element.setAttribute('style',   "background: " + backgroundColor);
};

const handleJavascriptInjection = (code) => {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerText = code;
  document.head.appendChild(script);
};


const handleCssInjection = (element, text) => {
  var newClass = document.createElement('style');
  newClass.type = 'text/css';
  newClass.innerHTML = text;
  element.className = element.className + " " + text.split('{')[0].replace('.','');
  document.getElementsByTagName('head')[0].appendChild(newClass);
};

const handleChangeText = (element, text) => {
  element.innerHTML =  text;
};

const handleHtmlInjection = (element, htmlText) => {
  const newElements = htmlToElements(htmlText);
  element.innerHTML = "";
  newElements.forEach(el => element.appendChild(el));
};

const handleResize = (element, width, height) => {
  const parsedWidth = width + 'px !important;';
  const parsedHeight = height + 'px !important;';
  element.setAttribute('style', 'width' + ": " + parsedWidth);
  element.setAttribute('style', 'height' + ": " + parsedHeight);
};

function htmlToElements(html) {
  let template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}

const handleIframeTask = (e) => {
  if(e.origin + "/" !== document.URL){
    let element = getElementByXpath(e.data.path);
    if(e.data.action === 'mouseover' && element != null) {
      element.className = element.className + " " + 'textHover';
    }
    if(e.data.action === "click"){
      removeSelector(element);
      element.className = element.className + ' selectClass';
    }
    switch (e.data.type) {
      case "background-change":
        handleBackgroundChange(element, e.data.style);
        break;
      case "javascript-injection":
        handleJavascriptInjection(e.data.code);
        break;
      case "inner-text-change":
        handleChangeText(element, e.data.text);
        break;
      case "css":
        handleCssInjection(element, e.data.css);
        break;
      case "html":
        handleHtmlInjection(element, e.data.html);
        break;
      case "resize":
        handleResize(element, e.data.resize.width, e.data.resize.height);
        break;
    }
  }
};

const removeSelector = (element) => {
  if(previousElement != null) {
    previousElement.className = previousElement.className.split(' selectClass',).join('')
  }
  previousElement = element;
};

const applyModifications = (modifications) => {
  modifications.forEach(modification => {
    const js = modification.javascriptInjections;
    const genericModifications = modification.genericModifications;
    const resizeModifications = modification.resizeModifications;
    js.forEach(jsInjection => {
      handleJavascriptInjection(jsInjection.value);
    });
    genericModifications.forEach(genericModification => {
      switch(genericModification.type) {
        case "cssInjection":
          let elementCss = getElementByXpath(genericModification.selector);
          handleCssInjection(elementCss, genericModification.value);
          break;
        case "textInjection":
          let elementText = getElementByXpath(genericModification.selector);
          handleChangeText(elementText, genericModification.value);
          break;
        case "htmlInjection":
          let elementHtml = getElementByXpath(genericModification.selector);
          handleHtmlInjection(elementHtml, genericModification.value);
          break;
        case "backgroundChange":
          let elementBackground = getElementByXpath(genericModification.selector);
          handleBackgroundChange(elementBackground, genericModification.value);
          break;
      }
    })
    resizeModifications.forEach(resize => {
      const width = resize.value.width;
      const height = resize.value.height;
      let element = getElementByXpath(resize.selector);
      handleResize(element, width, height);
    })
  })
};


window.addEventListener('message', handleIframeTask);

const Http = new XMLHttpRequest();
Http.onreadystatechange = function() {
  if (Http.readyState === 4) {
    if(Http.response != null)
      applyModifications(JSON.parse(Http.response));
  } else {}
};
Http.open("get", url);
Http.send();
