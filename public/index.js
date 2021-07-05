const mapListItems = new Map();
var uniqueListID;
fetch('/uniqueListID')
  .then(response => response.json())
  .then(data => setUniqueListID(data.uniqueListID));

function setUniqueListID(data){
    uniqueListID = data;
    localStorage.setItem("uniqueListID", data);
}

function updateUniqueListID(){
    let numdata = localStorage.getItem("uniqueListID");
    numdata++;
    let data = {"uniqueListID" : numdata};
    fetch('/handle/uniqueListID', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.log('Error:', error);
        });
    localStorage.setItem("uniqueListID", numdata);
}

function addlist1toServer(listData){
    fetch('/add/listItems1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.log('Error:', error);
    });
};

function addlist2toServer(listData){
    fetch('/add/listItems2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.log('Error:', error);
    });
};

function editlist1toServer(listData){
    fetch('/edit/listItems1', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.log('Error:', error);
    });
};

function editlist2toServer(listData){
    fetch('/edit/listItems2', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.log('Error:', error);
    });
};

function deletelist1toServer(listData){
    fetch('/delete/listItems1', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(listData),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.log('Error:', error);
        });
};

function deletelist2toServer(listData){
    fetch('/delete/listItems2', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
    });
};

let listIDString = 'listEntry';


const listButton_1 = document.querySelector('.list-button-1');
const listButton_2 = document.querySelector('.list-button-2');
const listItems_1 = document.querySelector('.list-items-1');
const listItems_2 = document.querySelector('.list-items-2');

var objPromise = async() => {
    // console.log("promise start");
    const objScript = document.createElement("script");
    objScript.src = 'object.js';
    document.body.append(objScript);
    objScript.onload = () => {
        // console.log("Object Script Loaded");
        funPromise.then((res) => {
            // console.log("Funtion Script Loading Success");
        })
        .catch((err) => console.log(err, "Object Script Loading Failed"));  
    };
    // objScript.onerror = () => {
    //     reject(1);
    // };
    // // console.log("promise ends");
    // resolve(0);
    // console.log("promise resolved");
    
};

var funPromise = new Promise(function(resolve, reject) {
    const funScript = document.createElement("script");
    funScript.src = 'functions.js';
    document.body.append(funScript);
    funScript.onload = () => {
        // console.log("Function Script Loaded");
        addEvents();
        newGetListData();
    };
    funScript.onerror = () => {
        reject(2);
    };
    resolve(0);
    
});


objPromise().then((res) => {
    // console.log("Object Script Loading Success");
    
})
.catch((err) => console.log(err, "Function Script Loading Failed"));  

// console.log("check");