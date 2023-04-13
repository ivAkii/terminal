
const delay = ms => new Promise(res => setTimeout(res, ms));
const terminalBody = document.querySelector('.terminal-body');
let terminalInput = document.querySelector('.terminal-input');
terminalInput.addEventListener('keydown', handleKeyDown);

const commandFunctions = {
  help: () => {
    printToTerminal('Available commands: contact, about, test, help, clear');
  },
  about: () => {
    printToTerminal(`I'm an 18-year-old computer science student <br> in my first year of studies. A Manga enthusiast and used to watch anime a lot, but now I rarely do. Known as Gacha Addict in my circle. I love messing around with code and I find that I learn best through hands-on experience.`);
  },
  contact: async() => {
    printToTerminal("Discord: Netizen AKi#1275")
    await delay(200);
    printToTerminal("Mail: iv.akii.ouo@gmail.com")
  },
  start: () => {
    printToTerminal('Permission denied.');   
  },
  clr: () => {
    clearTerminal();
  },
  clear: () => {
    commandFunctions.clr();
  },
}
function addLineBreaks(text) {
  return text.split('\n').map((line) => {
    return line.trim() ? line + '<br>' : '';
  }).join('');
}
async function handleCommand(command) {
  if (!command) {
    createNewPrompt(command);
    return; // do nothing if command is empty
  }
  const commandFunction = commandFunctions[command];
  if (commandFunction) {
    await commandFunction(); 
    createNewPrompt(command);
  } else {
    printToTerminal(`Command not found: ${command}`);
    createNewPrompt(command);
  }
}

function createNewPrompt(command) {
  const prompt = document.createElement('span');
  prompt.classList.add('terminal-prompt');
  prompt.innerHTML  = '~/guest<spam id="hotpink">$</spam>';
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
    handleCommand(command);
  }
}


async function printToTerminal(text) {
  const terminalBody = document.querySelector('.terminal-body');
  const output = document.createElement('div');
  terminalBody.appendChild(output);

  for (let i = 0; i < text.length; i++) {
    output.textContent += text[i];
    await delay(20); // adjust the delay time as needed
  }
}

window.addEventListener('load', () => {
  terminalInput.value = 'start';
  terminalInput.disabled = true;
});

async function initializeTerminal() {
  await printToTerminal('Welcome to the terminal! | Type help for more information!');
  createNewPrompt("start");
}
initializeTerminal()

function clearTerminal() {
  const terminalBody = document.querySelector('.terminal-body');
  while (terminalBody.firstChild) {
    terminalBody.removeChild(terminalBody.firstChild);
  }
}