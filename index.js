const mapListItems = new Map();

if(localStorage.getItem('uniqueListID') === null){
    localStorage.setItem("uniqueListID", 0);
}
let uniqueListID = localStorage.getItem('uniqueListID');
let listIDString = 'listEntry';


const listButton_1 = document.querySelector('.list-button-1');
const listButton_2 = document.querySelector('.list-button-2');
const listItems_1 = document.querySelector('.list-items-1');
const listItems_2 = document.querySelector('.list-items-2');

var promise = new Promise(function(resolve, reject) {
    console.log("promise start");
    const objScript = document.createElement("script");
    objScript.src = 'object.js';
    document.body.append(objScript);
    const funScript = document.createElement("script");
    funScript.src = 'functions.js';
    document.body.append(funScript);
    objScript.onload = () => {
        console.log("Object Script Loaded");
    };
    objScript.onerror = () => {
        reject(1);
    };
    funScript.onload = () => {
        console.log("Function Script Loaded");
        addEvents();
        getListData();
    };
    funScript.onerror = () => {
        reject(2);
    };
    console.log("promise ends");
    resolve(0);
    console.log("promise resolved");
    
  });

promise.then((res) => console.log("Script Loading Success")).catch((err) => console.log(err, "Script Loading Failed"));  

console.log("check");