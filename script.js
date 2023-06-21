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

card.textContent = 'test';
managerHrs.textContent = 'test';
budget.textContent = 'test';
monthPay.textContent = 'test';
weekPay.textContent = 'test';
hourPay.textContent = 'test';
onCall.textContent = 'test';
delivery.textContent = 'test';
inventory.textContent = 'test';
hours.textContent = 'test';

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
