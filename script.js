function getRandomChar(str) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return str[arr[0] % str.length];
}

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const useUpper   = document.getElementById('uppercase').checked;
  const useLower   = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower   = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charset = '';
  if (useUpper)   charset += upper;
  if (useLower)   charset += lower;
  if (useNumbers) charset += numbers;
  if (useSymbols) charset += symbols;

  if (charset.length === 0) {
    return 'Please select at least one character type!';
  }

  let password = '';

  // Ensure at least one of each selected type (good practice)
  if (useUpper)   password += getRandomChar(upper);
  if (useLower)   password += getRandomChar(lower);
  if (useNumbers) password += getRandomChar(numbers);
  if (useSymbols) password += getRandomChar(symbols);

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += getRandomChar(charset);
  }

  // Shuffle it (Fisher-Yates via modern JS)
  const array = password.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  password = array.join('');

  return password;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const lengthSlider = document.getElementById('length');
  const lengthValue  = document.getElementById('lengthValue');

  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
  });

  document.getElementById('generate').addEventListener('click', () => {
    const pw = generatePassword();
    document.getElementById('password').textContent = pw;
    document.getElementById('message').textContent = '';
  });

  document.getElementById('copy').addEventListener('click', () => {
    const pwElement = document.getElementById('password');
    const pw = pwElement.textContent.trim();

    if (pw && pw.length > 6 && !pw.includes('Please select')) {
      navigator.clipboard.writeText(pw).then(() => {
        document.getElementById('message').textContent = 'Copied to clipboard!';
        setTimeout(() => { document.getElementById('message').textContent = ''; }, 2000);
      }).catch(err => {
        document.getElementById('message').textContent = 'Copy failed — select & copy manually';
        console.error('Clipboard error:', err);
      });
    } else {
      document.getElementById('message').textContent = 'Generate a password first!';
    }
  });
});