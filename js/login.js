// Browser-only authentication simulation. Never use this as production authentication.
const demoAccounts = {
  admin: { password: "admin123", displayName: "Demo Administrator" },
  member: { password: "member123", displayName: "Demo Member" }
};

const form = document.querySelector("#auth-form");
const usernameInput = document.querySelector("#auth-user");
const passwordInput = document.querySelector("#auth-pass");
const output = document.querySelector("#auth-output");

let failedAttempts = 0;
let locked = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (locked) {
    output.textContent = "SIMULATION: login temporarily locked after repeated failed attempts. Reload this page to reset the in-memory counter.";
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    output.textContent = "Enter both username and password.";
    return;
  }

  const account = demoAccounts[username];

  // Deliberately different messages demonstrate username enumeration.
  if (!account) {
    failedAttempts += 1;
    output.textContent = "Unknown username. SIMULATION: this distinct response leaks whether an account exists.";
  } else if (account.password !== password) {
    failedAttempts += 1;
    output.textContent = "Incorrect password. SIMULATION: the username exists, so this response reveals account validity.";
  } else {
    failedAttempts = 0;
    output.textContent = `Welcome, ${account.displayName}. This is a fictional client-side session only.`;
  }

  if (failedAttempts >= 5) {
    locked = true;
    output.textContent += " Rate-limit simulation activated after 5 failed attempts.";
  }
});
