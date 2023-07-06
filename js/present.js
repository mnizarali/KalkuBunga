// Get DOM elements
const form = document.querySelector('.compound-form');
const calculateButton = form.querySelector('button');
const message = document.getElementById('message');
const canvas = document.getElementById('data-set');

// Calculate the present value
function calculatePresentValue(event) {
  event.preventDefault();

  // Get input values
  const initialAmount = parseFloat(form.querySelector('#initialamount').value);
  const years = parseFloat(form.querySelector('#years').value);
  const interestRate = parseFloat(form.querySelector('#rates').value);
  const compoundFrequency = parseInt(form.querySelector('#compound').value);

  // Calculate present value using the formula
  const presentValue = initialAmount / Math.pow(1 + (interestRate / (compoundFrequency * 100)), years * compoundFrequency);

  // Display the present value
  message.textContent = `Present Value: ${presentValue.toFixed(2)}`;

  // Clear any previous chart
  if (Chart.instances.length > 0) {
    Chart.instances.forEach((chart) => chart.destroy());
  }

  // Display a chart showing the growth over time
  const data = {
    labels: Array.from({ length: years }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Present Value',
        data: Array.from({ length: years }, (_, index) => presentValue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  new Chart(canvas, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Add event listener to the Calculate button
calculateButton.addEventListener('click', calculatePresentValue);
