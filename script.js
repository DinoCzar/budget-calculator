const card = document.getElementById('card');
const managerHrs = document.getElementById('manager-hrs');
const budget = document.getElementById('budget');
const monthPay = document.getElementById('month-pay');
const weekPay = document.getElementById('week-pay');
const hourPay = document.getElementById('hour-pay');
const onCall = document.getElementById('on-call');
const delivery = document.getElementById('delivery');
const inventory = document.getElementById('inventory');
const hours = document.getElementById('hours');

const salesInput = document.getElementById('sales-input');
const driversInput = document.getElementById('drivers-input');

const generate = document.getElementById('generate');
const reset = document.getElementById('reset');

const inputValues = document.querySelectorAll('input');
const outputValues = document.querySelectorAll('.display');

let cardValue;
let managerHrsValue;
let budgetValue;
let monthPayValue;
let weekPayValue;
let hourPayValue;
let onCallValue;
let deliveryValue;
let inventoryValue;
let hoursValue;

card.textContent = cardValue;
managerHrs.textContent = managerHrsValue;
budget.textContent = budgetValue;
monthPay.textContent = monthPayValue;
weekPay.textContent = weekPayValue;
hourPay.textContent = hourPayValue;
onCall.textContent = onCallValue;
delivery.textContent = deliveryValue;
inventory.textContent = inventoryValue;
hours.textContent = hoursValue;

function showError(input) {
	input.classList.add('error');
}

function showSuccess(input) {
	input.classList.remove('error');
}

function validateSales() {
	const salesInputValue = salesInput.value.trim();
	if (!salesInputValue) {
		showError(salesInput);
	} else {
		showSuccess(salesInput);
	}
}

function validateHours() {
	const driversInputValue = driversInput.value.trim();
	if (!driversInputValue) {
		showError(driversInput);
	} else {
		showSuccess(driversInput);
	}
}

function validateForm() {
	validateSales();
	validateHours();

	const errors = document.querySelectorAll('.error');

	if (errors.length === 0) {
		console.log('populate driver pay values');
	}
}

generate.addEventListener('click', () => {
	validateForm();
});

reset.addEventListener('click', () => {
	inputValues.forEach(function (item) {
		item.value = '';
	});
	outputValues.forEach(function (item) {
		item.textContent = '';
	});
});
