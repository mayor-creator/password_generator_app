const passwordText = document.getElementById("password");
const slideNumber = document.getElementById("slideNumber");
const range = document.getElementById("slider");
const upperCase = document.getElementById("uppercase");
const lowerCase = document.getElementById("lowercase");
const number = document.getElementById("numbers");
const symbol = document.getElementById("symbol");
const strengthText = document.getElementById("strength");
const meter = document.getElementById("meter");
const button = document.getElementById("button");
const copyButton = document.getElementById("copy");
const copyText = document.getElementById("copiedText");

const getCharacterLength = () => {
	slideNumber.innerText = range.value;
	range.addEventListener("input", (event) => {
		const slideValue = event.target.value;
		slideNumber.innerText = slideValue;
	});
};

getCharacterLength();

const getPassword = (characterLength) => {
	let password = "";
	const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const lowerLetters = "abcdefghijklmnopqrstuvwxyz".split("");
	const numbers = "0123456789".split("");
	const specialLetters = "!@#$%^&*()_+[]{};,<>?".split("");
	const letters = [];

	if (
		!upperCase.checked &&
		!lowerCase.checked &&
		!numbers.checked &&
		!specialLetters.checked
	) {
		return "Checkbox to continue";
	}

	if (upperCase.checked) {
		letters.push(...upperLetters);
	}
	if (lowerCase.checked) {
		letters.push(...lowerLetters);
	}
	if (number.checked) {
		letters.push(...numbers);
	}
	if (symbol.checked) {
		letters.push(...specialLetters);
	}

	for (let i = 0; i < characterLength; i++) {
		const randPosition = Math.floor(Math.random() * letters.length);
		password += letters[randPosition];
	}

	return password;
};

const existingPasswords = [];
const generatePassword = () => {
	passwordText.value = "";
	const characterLength = Number(slideNumber.innerText);
	let newPassword = getPassword(characterLength);
	passwordText.value = newPassword;

	if (newPassword.length < 8) {
		meter.value = 1;
		strengthText.innerText = "Weak";
		meter.classList.add("weak");
	} else if (newPassword.length >= 8 && newPassword.length <= 12) {
		meter.value = 3;
		strengthText.innerText = "Medium";
		meter.classList.add("medium");
	} else {
		meter.value = 4;
		strengthText.innerText = "Strong";
		meter.classList.add("strong");
	}
	if (passwordText.value === "Checkbox to continue") {
		meter.value = 0;
		strengthText.innerText = "";
		meter.classList.remove("weak");
	}
};

const displayCopiedText = () => {
	copyText.style.display = "block";
};

const copyPassword = async () => {
	const copiedPassword = passwordText.value;
	try {
		await navigator.clipboard.writeText(copiedPassword);
		displayCopiedText();
	} catch (error) {
		console.log(error);
	}
};

button.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);
