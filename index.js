// initializing pointers to DOM elements
const container = document.getElementById('container')
const form = document.getElementById('form')
const submitBtn = document.getElementById('submitButton')
const nameBtn = document.getElementById('nameQuery')
const ingredientBtn = document.getElementById('ingredientQuery')

// initializing query variable to look up by cocktail name
let query = 'search.php?s='

// adding event listeners to buttons
nameBtn.addEventListener('click', (e) => {
	query = 'search.php?s='
	submitBtn.textContent = 'Search by Name'
})
ingredientBtn.addEventListener('click', (e) => {
	query = 'filter.php?i='
	submitBtn.textContent = 'Search by Ingredient'
})

// adding event listener to form
form.addEventListener('submit', (e) => {
	e.preventDefault()
	const input = document.querySelector('input').value
	fetch(`https://www.thecocktaildb.com/api/json/v1/1/${query}${input}`)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById('container').innerHTML = ''
			data.drinks.map((drink) => {
				const element = document.createElement('div')
				element.setAttribute('class', 'col')
				element.setAttribute('role', 'button')
				element.addEventListener('click', (e) => {
					console.log()
				})
				element.innerHTML = `
          <div class="card h-100">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${
					drink.strDrink
				}">
            <div class="card-body">
              <h5 class="card-title">${drink.strDrink}</h5>
							${
								query === 'search.php?s='
									? `
              <p class="card-text">
							<b>Top Ingredients:</b><br />
                <em>${drink.strMeasure1 ? drink.strMeasure1 : ''}</em> ${
											drink.strIngredient1 ? drink.strIngredient1 : ''
									  }<br />
                <em>${drink.strMeasure2 ? drink.strMeasure2 : ''}</em>${
											drink.strIngredient2 ? drink.strIngredient2 : ''
									  }<br />
                <em>${drink.strMeasure3 ? drink.strMeasure3 : ''}</em> ${
											drink.strIngredient3 ? drink.strIngredient3 : ''
									  }
              </p>`
									: `${input}-based cocktail`
							}
            </div>
          </div>`
				container.appendChild(element)
			})
		})
		.catch((error) => {
			container.innerHTML = `<h1>No results found ${
				input ? `for ${input}` : `:(`
			}</h1>`
		})
})
