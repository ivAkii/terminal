
const delay = ms => new Promise(res => setTimeout(res, ms));
const terminalBody = document.querySelector('.terminal-body');

const commandFunctions = {
  test: () => {
    printToTerminal('Hello');
  },
  help: () => {
    printToTerminal('Available commands: contact, about, test, help');
  },
  about: () => {
    printToTerminal(`I'm an 18-year-old computer science student in my first year of studies. A Manga enthusiast and used to watch anime a lot, but now I rarely do. Known as Gacha Addict in my circle. I love messing around with code and I find that I learn best through hands-on experience.`);
  },
  contact: () => {
    printToTerminal("Discord: Netizen AKi#1275")
    printToTerminal("Mail: iv.akii.ouo@gmail.com")
  },
  start: () => {
    printToTerminal("Permission Denied.")
  },
}
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
  prompt.innerHTML  = 'user@guest <spam id="hotpink">$</spam>';
  terminalBody.appendChild(document.createElement('br'));
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

// function printToTerminal(text) {
//   const terminalBody = document.querySelector('.terminal-body');
//   const output = document.createElement('div');
//   output.textContent = text;
//   terminalBody.appendChild(output);
// }
async function printToTerminal(text) {
  const terminalBody = document.querySelector('.terminal-body');
  const output = document.createElement('div');
  terminalBody.appendChild(output);

  for (let i = 0; i < text.length; i++) {
    output.textContent += text[i];
    await delay(20); // adjust the delay time as needed
  }
}

function createText(text, classname){
  const p = document.createElement("p");
  p.innerHTML = text;
  terminalBody.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =`${code} : <span class='text'> ${text} </span>`;
 terminalBody.appendChild(p);
}



window.addEventListener('load', () => {
  terminalInput.value = 'start';
  terminalInput.disabled = true;
});

async function open_terminal(){
  await delay(700);
  printToTerminal("Welcome ");
  await delay(700);
  printToTerminal("Starting the server...");
  await delay(850);
  printToTerminal("Command List:");
  await delay(700);
  printToTerminal("about", "Get to know me");
  await delay(700);
  printToTerminal("contact", "My socials");
  await delay(500);
  createNewPrompt("start")
}

open_terminal();

