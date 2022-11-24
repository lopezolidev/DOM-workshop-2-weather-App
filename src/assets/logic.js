//Tasks:
//1 - initialize variables for API and DOM elements
//2 - set-up basic events that the DOM will trigger
//2.1 - install fetch for async calls with fetch API
//3 - write  async functions
//3.1 - create DOM nodes with classes
//3.2 - build logic to render card with user input (city)

//input event:
const input = document.querySelector('#input');

const submitButton = document.querySelector('#button')


async function fetchData(country){
   try{
         const location = country.toUpperCase();
         console.log(location);
         const raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=46326a6829dc87953c417b28d2a4194a&units=metric`);
         const parsed = await raw.json();
         console.log(parsed)
      } catch(e) {
    throw new Error(e);
   }
}

submitButton.addEventListener('click', fetchData)

// fetchData('caracas');
