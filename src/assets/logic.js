import { createCipheriv } from "crypto";
import fetch from "node-fetch";

//Tasks:
//1 - initialize variables for API and DOM elements
//2 - set-up basic events that the DOM will trigger
//2.1 - install fetch for async calls with fetch API
//3 - write  async functions
//3.1 - create DOM nodes with classes
//3.2 - build logic to render card with user input (city)

const API = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=46326a6829dc87953c417b28d2a4194a"

async function fetchData(api){
   try{
        const raw = await fetch(api);
        const parsed = await raw.json();
        console.log(parsed)
   } catch(e) {
    throw new Error(e);
   }
}

fetchData(API);