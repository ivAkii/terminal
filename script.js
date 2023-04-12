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
  const terminalBody = document.querySelector('.terminal-body');
  const prompt = document.createElement('span');
  prompt.classList.add('terminal-prompt');
  prompt.textContent = '$';
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

function printToTerminal(text) {
  const terminalBody = document.querySelector('.terminal-body');
  const output = document.createElement('div');
  output.textContent = text;
  terminalBody.appendChild(output);
}

window.addEventListener('load', () => {
  terminalInput.value = '';
});