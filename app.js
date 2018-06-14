// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide results
  document.getElementById('results').style.display = 'none'
  // show loader
  document.getElementById('loading').style.display = 'block'

  setTimeout(calculateResults, 500)

  e.preventDefault();
  
})


// calculate results function
function calculateResults(e) {
  // get UI variables and assign

  const uiAmount = document.getElementById('amount')
  const uiInterest = document.getElementById('interest')
  const uiYears = document.getElementById('years')
  const uiMonthlyPayment = document.getElementById('monthly-payment')
  const uiTotalPayment = document.getElementById('total-payment')
  const uiTotalInterest = document.getElementById('total-interest')

// set calculation variables

const principal = parseFloat(uiAmount.value)
const calculatedInterest = parseFloat(uiInterest.value) / 100 / 12
const calculatedPayments = parseFloat(uiYears.value) * 12

// calculate monthly payments

const x = Math.pow(1 + calculatedInterest, calculatedPayments)
const monthly = (principal * x * calculatedInterest)/(x-1)

if(isFinite(monthly)) {
  uiMonthlyPayment.value = monthly.toFixed(2)
  uiTotalPayment.value = (monthly * calculatedPayments).toFixed(2)
  uiTotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
// show results, hide loader
  document.getElementById('results').style.display = 'block'
  document.getElementById('loading').style.display = 'none'
} else {
  showError('Please check your numbers')
  console.log('Please check your numbers')
  uiMonthlyPayment.value = ''
  uiTotalPayment.value = ''
  uiTotalInterest.value = ''
  }  
}

// function showError(error) {
//   // create an element
//   const errorDiv = document.createElement('div')
//   // get parent element and child to insert our new element before
//   const card = document.querySelector('.card')
//   const heading = document.querySelector('.heading')
//   // set class names
//   errorDiv.className = 'alert alert-danger'
//   // create text node and append to element
//   errorDiv.appendChild(document.createTextNode(error))
//   // insert error above heading
//   card.insertBefore(errorDiv, heading)
//   // clear error after 3 seconds
//   setTimeout(clearError, 3000)

// }
// function clearError() {
//   document.querySelector('.alert').className = 'alert alert-danger hidden'
// }
function showError(error) {
  const errorDiv = document.getElementById('invalid-numbers-alert')
  errorDiv.classList.toggle('hidden')
  errorDiv.classList.toggle('show')
  document.getElementById('loading').style.display = 'none'
  document.getElementById('results').style.display = 'none'
  setTimeout(clearError, 3000)
}

function clearError() {
  const errorDiv = document.getElementById('invalid-numbers-alert')
  errorDiv.classList.toggle('hidden')
  errorDiv.classList.toggle('show')
}

