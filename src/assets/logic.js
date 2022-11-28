//Tasks:
//1 - initialize variables for API and DOM elements ← DONE
//2 - set-up basic events that the DOM will trigger ← DONE
//2.1 - install fetch for async calls with fetch API ← DONE
//3 - write  async functions ← DONE
//3.1 - create DOM nodes with classes ← DONE
//3.2 - build logic to render card with user input (city) ← DONE
//4 - build logic check for repeated cards ← DONE
//5 - delete card logic ← DONE
//6 - add styles to app design ← DONE


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

         // console.log(parsed.weather[0])

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

         deleteIcon.innerText = 'X'; 
         //icon symbol
         deleteIcon.addEventListener('click', deleteCard)
         //adding event of card deletion

         degrees.innerText = parsed.main.temp
         //city degrees

         const climate = parsed.weather[0].main.toLowerCase();
         //selecting climate code

         imageSelect(climate, climateIcon);
         //pushing weather code to array of icons  

         climateDescription.innerText = parsed.weather[0].description;
         //climate description

         const proof = cardsArray.some(i => i.children[0].children[0].innerText === wrapper.children[0].children[0].innerText)
         //this part sometimes work, sometimes doesn't


         if(proof){
            return;
         } else {
            cardsArray.push(wrapper);
            //pushing elements inside the cardsArray

            page.append(wrapper);
            //appending such element in the page

         }
         
      } catch(e) {
    throw new Error(e);
   }
}

// function isAppended(arg){
//    return cardsArray.some(i => i.children[0].innerText == arg.children[0].innerText);

//    //arg.then(e => e.children[0].innerText)

//    //as arg is wrapper, children stands for the HTML elements array and [0] is the cardTitle element. innerText is the object of comparison with any element that already exists inside the cards array
// }
// //isAppended function will return true if there's at least one element equal to those in the array

// function appendCard(proof, element){
//    if(proof){
//       return;
//    } else {
//       cardsArray.push(element);
//       //pushing elements inside the cardsArray

//       page.append(element);
//       //appending such element in the page

//       // console.log(cardsArray)
//    }
// }
//appendCard function will take as argument isAppended function to validate the presence of a card already pushed to the array of cards to decide if its appended to the container or not

function deleteCard(e){
   const elementName = e.target.parentElement.parentElement.children[0].children[0].innerText 
   //name of city accessed through parent element

   const indexOfElement = cardsArray.findIndex(i => i.children[0].children[0].innerText == elementName)
   //knowing which is the index of the card that triggered the event
   
   const iconName = e.target.parentElement.parentElement.children[2].children[0].className
   //getting icon name for selecting its index in their array

   const indexOfIcon = cardsArray.findIndex(i => i.children[2].children[0].className == iconName)
   //indexOfIcon will be used to erase icon reference in its array
   
   cardsArray.splice(indexOfElement, 1)
   // //eliminating card of the array, to erase the reference

   iconArray.splice(indexOfIcon, 1);
   //erasing icon reference in the array

   e.path[2].remove();
   //removing card using path[2], referencing the whole card


}

function imageSelect(item, span){

   span.className = item
   //creating classes for span

   if(!iconArray.some(i => i == item)){
      iconArray.push(item);
      return;
   }
}

submitButton.addEventListener('click', fetchData)
submitButton.addEventListener('click', (e) => e.preventDefault()) //to not reload the page


