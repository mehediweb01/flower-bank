const dashboardPage = document.getElementById("dashboardPage");
const TransactionPage = document.getElementById("TransactionPage");
const totalBalanceShow = document.getElementById("totalBalanceShow");
const withdrawBalanceShow = document.getElementById("withdrawBalanceShow");
const addBalanceShow = document.getElementById("addBalanceShow");
const addMoneyInput = document.getElementById("addMoneyInput");
const withdrawInput = document.getElementById("withdrawInput");
const transactionHistory = document.getElementById("transactionHistory");
const addMoneyBtn = document.getElementById("addMoneyBtn");
const withdrawMoneyBtn = document.getElementById("withdrawMoneyBtn");
const dashboard = document.getElementById("dashboard");
const Transaction = document.getElementById("Transaction");

//change
window.addEventListener("hashchange", (e) => {
  e.preventDefault();
  const hash = window.location.hash.substring(1);
  switch (hash) {
    case "dashboard":
      dashboard.classList.add("active");
      Transaction.classList.remove("active");
      TransactionPage.style.display = "none";
      dashboardPage.style.display = "block";
      break;
    case "transaction-history":
      Transaction.classList.add("active");
      dashboard.classList.remove("active");
      dashboard.className =
        "md:text-2xl text-xl hover:underline text-white hover:text-yellow-800 transition-all duration-300";
      dashboardPage.style.display = "none";
      TransactionPage.style.display = "flex";
      break;
  }
});

//add money
addMoneyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const addMoney = parseFloat(addMoneyInput.value);
  if (addMoneyInput.value === "") {
    alert("Enter your amount");
  } else if (addMoney < 10) {
    alert("Your amount above $10");
    addMoneyInput.value = "";
  } else {
    const addBalance = parseFloat(addBalanceShow.innerText) + addMoney;
    const total = parseFloat(totalBalanceShow.innerText) + addMoney;
    addBalanceShow.innerHTML = addBalance.toFixed(2);
    totalBalanceShow.innerHTML = total.toFixed(2);
    addTransaction("Add", addMoney);
    addMoneyInput.value = "";
  }
});

// withdraw Money
withdrawMoneyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const withdrawMoney = parseFloat(withdrawInput.value);
  if (withdrawInput.value === "") {
    alert("Enter your amount");
  } else if (withdrawMoney < 10) {
    alert("Your amount above $10");
    withdrawInput.value = "";
  } else if (totalBalanceShow.innerText < withdrawMoney) {
    alert("your account balance is low!");
    withdrawInput.value = "";
  } else {
    const withdrawBalance =
      parseFloat(withdrawBalanceShow.innerText) + withdrawMoney;
    const total = parseFloat(totalBalanceShow.innerText) - withdrawMoney;
    withdrawBalanceShow.innerHTML = withdrawBalance.toFixed(2);
    totalBalanceShow.innerHTML = total.toFixed(2);
    addTransaction("withdraw", withdrawMoney);
    withdrawInput.value = "";
  }
});

// array
const transactionsArray = [];
//addTransaction
function addTransaction(type, amount) {
  const date = new Date().toLocaleString();
  const balance = parseFloat(totalBalanceShow.textContent);
  transactionsArray.push({ date, type, amount, balance });
  updateTransactionHistory();
}
// update
function updateTransactionHistory() {
  transactionHistory.innerHTML = "";
  transactionsArray.forEach((transactions) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="border border-slate-600">${transactions.date}</td>
            <td class="border border-slate-600">${transactions.type}</td>
            <td class="border border-slate-600">$${transactions.amount.toFixed(
              2
            )}</td>
            <td class="border border-slate-600">$${transactions.balance.toFixed(
              2
            )}</td>`;
    transactionHistory.appendChild(tr);
  });
}
