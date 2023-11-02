// generate by gpt
export const setCursorAtPosition = (clientX, clientY) => {
  // Get the contenteditable div, range and selection objects.
  const contentEditableDiv = document.getElementById("editable");
  const range = document.createRange();
  const selection = window.getSelection();
  // Get the document element at the clicked position
  const elementAtPosition = document.elementFromPoint(clientX, clientY)

  // Check if the element is a text node
  if (elementAtPosition.childNodes[0].nodeType === Node.TEXT_NODE) {
    // Get the closest text node
    const textNode = elementAtPosition;
    let caretPos, offset
    if (document.caretPositionFromPoint) {
      caretPos = document.caretPositionFromPoint(clientX, clientY);
      offset = caretPos.offset;
    } else if (document.caretRangeFromPoint) {
      // Use WebKit-proprietary fallback method
      caretPos = document.caretRangeFromPoint(clientX, clientY);
      offset = caretPos.startOffset;
    } else {
      // Neither method is supported, do nothing
      return;
    }
    // Set the range and selection
    range.setStart(textNode.childNodes[0], offset);
    range.collapse(true); // meaning range start and end are the same.
    selection.removeAllRanges(); // remove existing selection
    selection.addRange(range);

    // Set focus to the contenteditable div
    contentEditableDiv.focus();
  }else{
    contentEditableDiv.focus();
    console.log('wrong type')
  }
}