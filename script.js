
const delay = ms => new Promise(res => setTimeout(res, ms));
const terminalBody = document.querySelector('.terminal-body');

const commandFunctions = {
  test: () => {
    printToTerminal('Hello');
  },
  help: () => {
    printToTerminal('Available commands: test, help');
  },
  // add more commands here
};

function handleCommand(command) {
  if (!command) {
    createNewPrompt(command);
    return; // do nothing if command is empty
  }
  const commandFunction = commandFunctions[command];
  if (commandFunction) {

    commandFunction();
  } else {
    printToTerminal(`Command not found: ${command}`);
  }
  createNewPrompt(command);
}

function createNewPrompt(command) {
  // const terminalBody = document.querySelector('.terminal-body');
  const prompt = document.createElement('span');
  prompt.classList.add('terminal-prompt');
  prompt.textContent = '$';
 // terminalBody.appendChild(document.createElement('br'));
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('terminal-input');
  input.autofocus = true;
  terminalBody.appendChild(prompt);
  terminalBody.appendChild(input);
  input.focus();

  terminalInput.removeEventListener('keydown', handleKeyDown);
  terminalInput.disabled = true;
  terminalInput.value = command;
  terminalInput = input;
  terminalInput.addEventListener('keydown', handleKeyDown);
}



function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const command = terminalInput.value.trim();
    terminalInput.value = '';
    handleCommand(command);
  }
}

let terminalInput = document.querySelector('.terminal-input');
terminalInput.addEventListener('keydown', handleKeyDown);

function printToTerminal(text) {
  const terminalBody = document.querySelector('.terminal-body');
  const output = document.createElement('div');
  output.textContent = text;
  terminalBody.appendChild(output);
}

window.addEventListener('load', () => {
  terminalInput.value = 'start';
  terminalInput.disabled = true;
});

async function open_terminal(){
  await delay(700);
  createText("Welcome ");
  await delay(700);
  createText("Starting the server...");
  await delay(1500);
  createText("Command List:");
  await delay(1500);
  createCode("about", "Learn more about this project");
  await delay(1500);
  createCode("contact", "My socials");

  await delay(500);
  createNewPrompt("start")
}

open_terminal();

function createText(text, classname){
  const p = document.createElement("p");
  
  p.innerHTML =
  text
  ;
  terminalBody.appendChild(p);
}
function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =
 `${code} : <span class='text'> ${text} </span>`;
 terminalBody.appendChild(p);
}