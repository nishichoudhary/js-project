document.addEventListener("DOMContentLoaded", function() {
    const incomeInput = document.getElementById('incomeInput');
    const addIncomeBtn = document.getElementById('addIncomeBtn');
    const incomeList = document.getElementById('incomeList');
    const expenseInput = document.getElementById('expenseInput');
    const expenseCategorySelect = document.getElementById('expenseCategorySelect');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const expenseList = document.getElementById('expenseList');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpenses = document.getElementById('totalExpenses');
    const remainingBudget = document.getElementById('remainingBudget');
    const currencySelect = document.getElementById('currencySelect');
    const sourceCurrencySelect = document.getElementById('sourceCurrencySelect');
    const targetCurrencySelect = document.getElementById('targetCurrencySelect');

    const currencies = {
        'USD': 'United States Dollar',
        'EUR': 'Euro',
        'GBP': 'British Pound Sterling',
        'JPY': 'Japanese Yen',
        'CAD': 'Canadian Dollar',
        'INR': 'Indian Rupee'
    };

    const exchangeRates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.72,
        'JPY': 110.33,
        'CAD': 1.21,
        'INR': 74.38
    };

    let incomes = [];
    let expenses = [];
    let selectedCurrency = 'INR'; // Default currency

    // Initialize currency selection
    Object.keys(currencies)
        .sort((a, b) => currencies[a].localeCompare(currencies[b])) // Sort currencies alphabetically by their full name
        .forEach(currency => {
            const option = document.createElement('option');
            option.textContent = `${currency} - ${currencies[currency]}`;
            currencySelect.appendChild(option);
            sourceCurrencySelect.appendChild(option.cloneNode(true));
            targetCurrencySelect.appendChild(option.cloneNode(true));
        });

    currencySelect.value = 'INR';

    currencySelect.addEventListener('change', function() {
        selectedCurrency = currencySelect.value.split(' ')[0];
        updateSummary();
        displayIncomes();
        displayExpenses();
    });

    addIncomeBtn.addEventListener('click', function() {
        const incomeAmount = parseFloat(incomeInput.value);
        if (!isNaN(incomeAmount) && incomeAmount > 0) {
            incomes.push(incomeAmount);
            displayIncomes();
            updateSummary();
            incomeInput.value = '';
        }
    });

    addExpenseBtn.addEventListener('click', function() {
        const expenseAmount = parseFloat(expenseInput.value);
        const expenseCategory = expenseCategorySelect.value;
        if (!isNaN(expenseAmount) && expenseAmount > 0 && expenseCategory) {
            expenses.push({ amount: expenseAmount, category: expenseCategory });
            displayExpenses();
            updateSummary();
            expenseInput.value = '';
            expenseCategorySelect.value = '';
        }
    });

    function displayIncomes() {
        incomeList.innerHTML = '';
        incomes.forEach((income, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Income ${index + 1}: ${selectedCurrency} ${income.toFixed(2)}`;
            incomeList.appendChild(listItem);
        });
    }

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Expense ${index + 1}: ${selectedCurrency} ${expense.amount.toFixed(2)} (${expense.category})`;
            expenseList.appendChild(listItem);
        });
    }

    function updateSummary() {
        const totalIncomeAmount = incomes.reduce((total, income) => total + income, 0);
        const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        const remainingBudgetAmount = totalIncomeAmount - totalExpenseAmount;

        totalIncome.textContent = `${selectedCurrency} ${totalIncomeAmount.toFixed(2)}`;
        totalExpenses.textContent = `${selectedCurrency} ${totalExpenseAmount.toFixed(2)}`;
        remainingBudget.textContent = `${selectedCurrency} ${remainingBudgetAmount.toFixed(2)}`;

        if (remainingBudgetAmount >= 0) {
            remainingBudget.style.color = 'green';
        } else {
            remainingBudget.style.color = 'red';
        }
    }

    const convertButton = document.getElementById('convertButton');
    const resultDisplay = document.getElementById('conversionResult');

    convertButton.addEventListener('click', function() {
        const sourceCurrency = sourceCurrencySelect.value.split(' ')[0];
        const targetCurrency = targetCurrencySelect.value.split(' ')[0];
        const amount = parseFloat(document.getElementById('conversionAmount').value);

        if (!isNaN(amount) && amount > 0 && sourceCurrency !== targetCurrency) {
            const convertedAmount = amount * exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
            resultDisplay.textContent = `${amount} ${sourceCurrency} is equal to ${convertedAmount.toFixed(2)} ${targetCurrency}`;
        } else {
            resultDisplay.textContent = 'Please enter valid amount and select different currencies';
        }
    });
});
