let element = document.querySelector('button');

function createButtonState(clr, bgClr, text) {
  let bs = {
    clr,
    bgClr,
    text
  };
  return bs;
}

function restoreButtonState(btn, st) {
  btn.style.color = st.clr;
  btn.style.backgroundColor = st.bgClr;
  btn.innerHTML = st.text;
}

function toggleState(st) {
  if (st === 'o') 
    return 'n';
  else 
    return 'o';
}

function setButtonClickHandler(btn) {
  let buttonStates = {
    n: createButtonState(
        'white', 
        'red', 
        'Red Button'
       ),

    o: createButtonState(
        btn.style.color,
        btn.style.backgroundColor,
        btn.innerHTML
       )
  };

  let state = 'o';

  function switchButtonState() {
    // Add code to turn button red
    state = toggleState(state);
    restoreButtonState(btn, buttonStates[state]);
  }

  btn.onclick = switchButtonState;
}

setButtonClickHandler(element);
