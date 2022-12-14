import React from "react";

const SuperTag = ({ value, ...rest }) => {
  // set description in to inner html
  const support = (() => {
    if (!window.DOMParser) return false;
    let parser = new DOMParser();
    try {
      parser.parseFromString("x", "text/html");
    } catch (err) {
      return false;
    }
    return true;
  })();

  const textToHTML = (str) => {
    // check for DOMParser support
    if (support) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(str, "text/html");
      return doc.body.innerHTML;
    }

    // Otherwise, create div and append HTML
    let dom = document.createElement("p");
    dom.innerHTML = str;
    return dom;
  };
  return <span dangerouslySetInnerHTML={{ __html: textToHTML(value) }} {...rest} />;
};

export default SuperTag;
