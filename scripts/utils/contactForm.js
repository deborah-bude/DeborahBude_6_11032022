function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  document.getElementById("close-contact").addEventListener("click", closeModal)
  document.getElementById("close-contact").addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        closeModal();
      }
  })

  const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  focusElementInModal(focusableElements, modal);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

const validateForm = {
  first: false,
  last: false,
  email: false,
}

const errorMessages = {
  first: "Votre prénom doit comporter au minimum deux caractères avec seulement des lettres.",
  last: "Votre nom doit comporter au minimum deux caractères avec seulement des lettres.",
  email: "Votre e-mail doit être saisie dans un format valide.",
}

//Regex for validation
const dataRegex = {
  name: /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
}

// DOM Elements
const submitButton = document.querySelector(".btn-submit");
//DOM Elements - Input
const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");
const emailInput = document.querySelector("#email");
const form = document.querySelector("form");

//Validate input
firstNameInput.addEventListener("input", () => validateField(firstNameInput));
lastNameInput.addEventListener("input", () => validateField(lastNameInput));
emailInput.addEventListener("input", () => validateField(emailInput));
form.addEventListener("submit", validate)

// Validation of basic fields witch contain just texts or numbers
function validateField(input) {
  const name = input.getAttribute('name')
  let regex;
  if (name === 'email') {
    regex = dataRegex.email;
  } else {
    regex = dataRegex.name;
  }
  if (regex.test(input.value)) {
    input.parentElement.setAttribute("data-error-visible", "false");
    input.parentElement.removeAttribute("data-error");
    validateForm[name] = true;
  } else {
    input.parentElement.setAttribute("data-error-visible", "true");
    input.parentElement.setAttribute("data-error", errorMessages[name]);
    validateForm[name] = false;
  }
}

// Validation subscription
function validate(event) {
  console.log(event);
  event.preventDefault();
  // Checking each value of the validateForm table
  if (Object.values(validateForm).every(value => value === true)) {
    validateForm.first = false;
    validateForm.last = false;
    validateForm.email = false;
    console.log("Le message a bien été envoyé !");
    console.log(`Nom : ${firstNameInput.value} `);
    console.log(`Prénom : ${lastNameInput.value} `);
    console.log(`E-mail : ${emailInput.value} `);
    form.reset();
  } else {
    console.log("Hum... quelque chose cloche...")
    //Form error generation
    validateField(firstNameInput);
    validateField(lastNameInput);
    validateField(emailInput);
  }
}