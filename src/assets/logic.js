//Tasks:
//1 - initialize variables for API and DOM elements
//2 - set-up basic events that the DOM will trigger
//2.1 - install fetch for async calls with fetch API
//3 - write  async functions
//3.1 - create DOM nodes with classes
//3.2 - build logic to render card with user input (city)

//input event:
const input = document.querySelector('#input');

//submit event:
const submitButton = document.querySelector('#button')

const page = document.querySelector('.cards-section')

const cardsArray = [];

const iconArray = [];

async function fetchData(e){
   try{
         const message = e.target.form[0].value; 
         //selecting value from input inside the form
      
         const location = message.toUpperCase();
         //transforming to uppercase value from input for async call


         const raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=46326a6829dc87953c417b28d2a4194a&units=metric`);
         //fetching raw data from weather app

         const parsed = await raw.json();
         //parsing in json() raw weater data

         console.log(parsed)

         //=====================Let's create HTML nodes

         const wrapper = document.createElement('div');
         wrapper.className = 'card-container';
         //wrapper node

         const cardTop = document.createElement('div');
         cardTop.className = 'card-top';
         //card top container

         const cardTitle = document.createElement('h4');
         //card title

         const deleteIcon = document.createElement('span')
         //delete icon. IMPORTANT for deleting cards ahead

         cardTop.append(cardTitle, deleteIcon);
         //adding title and delete icon to cardTop

         const degreesContainer = document.createElement('div');
         degreesContainer.className = 'card-degrees';
         //degrees container

         const degrees = document.createElement('p');
         //actual degrees

         degreesContainer.append(degrees);
         //inserting degrees inside degrees container

         const climateContainer = document.createElement('div');
         climateContainer.className = 'card-climate';
         //climate icon container

         const climateIcon = document.createElement('span');
         //actual climate icon

         climateContainer.append(climateIcon);
         //inserting climate icon inside its container

         const descriptionBox = document.createElement('div');
         descriptionBox.className = 'card-description';
         //creating description container

         const climateDescription = document.createElement('p');
         //climate description

         descriptionBox.append(climateDescription);
         //appending description to description box

         wrapper.append(cardTop, degreesContainer, climateContainer, descriptionBox);
         //appending containers inside wrapper node


         //=============== Let's insert parsed data into HTML elements
         cardTitle.innerText = parsed.name;
         //city name

         //ICON → Later in CSS insert ICON

         degrees.innerText = parsed.main.temp
         //city degrees

         //CLIMATE ICON → LATER 
         //climate icon

         climateDescription.innerText = parsed.weather[0].description;
         //climate description

         isAppended(wrapper);
         //call isAppended to check if its repeated

         console.log(wrapper, cardsArray);
         return wrapper;

      } catch(e) {
    throw new Error(e);
   }
}

function isAppended(arg){
   if(cardsArray.some(item => item.cardTitle.innerText == arg.cardTitle.innerText)){
      console.log('arg:', arg)
      return;
   } else {
      page.append(arg);
   }
}

submitButton.addEventListener('click', fetchData)
submitButton.addEventListener('click', (e) => e.preventDefault()) //to not reload the page



// fetchData('caracas');
