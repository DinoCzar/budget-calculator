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

const inputObject = {
	sales: undefined,
	hours: undefined,
};

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

function displayValues(cardValue, managerHrsValue, budgetValue, monthPayValue, weekPayValue, hourPayValue,
    onCallValue, deliveryValue, inventoryValue, hoursValue, totalSales, driverHours) {
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
    salesInput.value = totalSales;
    driversInput.value = driverHours;
}

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
	store(salesInput.value, driversInput.value);
	loadPage();
});

reset.addEventListener('click', () => {
	inputValues.forEach(function (item) {
		item.value = '';
	});
	outputValues.forEach(function (item) {
		item.textContent = '';
	});
    store(0, 0)
});

function store(salesValue, hoursValue) {
	inputObject.sales = salesValue;
	inputObject.hours = hoursValue;
	localStorage.setItem('inputObject', JSON.stringify(inputObject));
}

function loadPage() {
    const inputObject = JSON.parse(localStorage.getItem('inputObject'));
	if (inputObject !== null) {
        calculateValues(inputObject.sales, inputObject.hours);
	}
}

function calculateValues(totalSales, driverHours) {
	cardValue = Math.ceil(totalSales*.3);
	managerHrsValue = 80.5-driverHours;
    let driverRate = 18.75;
    let operatingExp = 7602;
    let salesTax = cardValue*.14;
    let cogs = totalSales*.453;
    let percentage = 0.9;
    let rem = (totalSales+(cardValue*.073))-(operatingExp+salesTax+cogs);
    let driverMonthHrs = ((driverHours/7)*363)/12;
	budgetValue = Math.ceil(rem-((rem-(driverMonthHrs*driverRate))*(1-percentage)));
	monthPayValue = Math.ceil(budgetValue-(driverMonthHrs*driverRate));
	weekPayValue = Math.ceil(((monthPayValue*12)/363)*7);
	onCallValue = managerHrsValue/2;
	deliveryValue = onCallValue;
	inventoryValue = 10;
	hoursValue = onCallValue+deliveryValue+inventoryValue;
    hourPayValue = (weekPayValue/hoursValue).toFixed(2);
    displayValues(cardValue, managerHrsValue, budgetValue, monthPayValue, weekPayValue, hourPayValue,
        onCallValue, deliveryValue, inventoryValue, hoursValue, totalSales, driverHours);
}

loadPage();
