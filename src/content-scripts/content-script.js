console.log("Hello from the content-script");
var sampleSentences = [
  "Do you have time to meet next week?",
  "I have forwarded this message to the appropriate service rep.",
  "If you're not the right person, can you please put me in touch with whoever is?",
  "Thanks again for chatting today and I look forward to hearing from you!",
];
var displayTextWidth = (text, font) => {
  let canvas =
    displayTextWidth.canvas ||
    (displayTextWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
};
var handleChangeText = (e) => {
  var targetElement = e.target;
  var typedText = targetElement.value;

  var font = "400 13 sans-serif";
  var width = displayTextWidth(typedText, font);

  console.log("width", width);
  const filteredSentence = sampleSentences.find(
    (e) => e.indexOf(typedText) === 0 && typedText.length > e.length * 0.4
  );
  if (!filteredSentence) {
    return;
  }

  var spanTextEl = document.getElementById("suggestion");
  if (!spanTextEl) {
    spanTextEl = document.createElement("span");
    spanTextEl.id = "suggestion";
  }
  spanTextEl.innerHTML = filteredSentence.substring(typedText.length + 1);
  Object.assign(spanTextEl.style, {
    position: "absolute",
    textRendering: "auto",
    color: "black",
    letterSpacing: "normal",
    wordSpacing: "normal",
    textTransform: "none",
    textIndent: "0px",
    textShadow: "none",
    display: "inline-block",
    textAlign: "start",
    appearance: "auto",
    cursor: "text",
    margin: "0em",
    font: font,
    padding: "1px 2px",
    borderWidth: "2px",
    top: 20,
    left: width + 50,
    opacity: 0.5,
  });

  console.log("~~~~~ event", targetElement, e);

  e.srcElement.parentNode.style.position = "relative";
  e.srcElement.parentNode.append(spanTextEl);
};

document.querySelector("input").addEventListener("keypress", handleChangeText);
