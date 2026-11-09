// Browser-only training simulator. All records and outcomes are fictional.
const records = {
  1: { name: "Public demo profile", role: "Visitor", access: "Public", note: "A normal public record." },
  2: { name: "Sample catalog entry", role: "Catalog", access: "Public", note: "A normal catalog record." },
  3: { name: "Training account", role: "Member", access: "Restricted", note: "A record available to its owner." },
  7: { name: "Hidden training record", role: "Administrator (fictional)", access: "Restricted", note: "The simulator exposes this record to demonstrate a missing server-side authorization check." }
};

const recordForm = document.querySelector("#record-form");
const recordId = document.querySelector("#record-id");
const recordOutput = document.querySelector("#record-output");

recordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = Number(recordId.value);
  const record = records[id];
  if (!Number.isInteger(id) || id < 1 || id > 99) {
    recordOutput.textContent = "Invalid numeric ID. Enter a whole number from 1 to 99.";
    return;
  }
  if (!record) {
    recordOutput.textContent = `No demo record exists for ID ${id}.`;
    return;
  }
  recordOutput.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = `${record.name} — #${id}`;
  const detail = document.createElement("p");
  detail.textContent = `Role: ${record.role} · Access label: ${record.access}. ${record.note}`;
  recordOutput.append(heading, detail);
  if (id === 7) {
    const flag = document.createElement("div");
    flag.className = "flag";
    flag.textContent = "SIMULATED ACCESS-CONTROL FLAW";
    recordOutput.append(flag);
  }
});

document.querySelector("#reflect-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = document.querySelector("#reflect-input").value;
  const output = document.querySelector("#reflect-output");
  output.textContent = value ? `Search preview: ${value}` : "Enter a phrase first.";
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;
  const output = document.querySelector("#login-output");
  const looksLikeInjection = /('|--|\bor\b|\b1\s*=\s*1\b)/i.test(username);
  if (!username || !password) {
    output.textContent = "Enter both fields to run the mock login.";
  } else if (looksLikeInjection) {
    output.textContent = "SIMULATION: this input resembles SQL syntax. A vulnerable string-concatenated query could change its logic; this demo does not execute SQL and grants no real login.";
  } else if (username === "demo" && password === "demo") {
    output.textContent = "Mock login successful for the fictional demo account.";
  } else {
    output.textContent = "Mock login rejected. Try username demo and password demo.";
  }
});
