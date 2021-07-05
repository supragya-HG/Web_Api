function serverRefresh(){
    localStorage.clear();
}


// fetch('/allData')
//   .then(response => response.json())
//   .then(data => listAllData(data));

// function listAllData(data){
//     console.log(data);
// }

// fetch('/uniqueListID')
//   .then(response => response.json())
//   .then(data => ConsoleLog(data));

// fetch('/listItems1')
//   .then(response => response.json())
//   .then(data => ConsoleLog(data));

// fetch('/listItems2')
//   .then(response => response.json())
//   .then(data => ConsoleLog(data));





// function ConsoleLog(data){
//     console.log(data);
// }

// const data = { uniqueListID : 15 };
// const listTemp = {listID: 1, itemID: "listEntry2", listData: "kjdj"};
  
// fetch('/handle/uniqueListID', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.log('Error:', error);
// });


// fetch('/add/listItems1', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(listTemp),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.log('Error:', error);
// });

// fetch('/add/listItems2', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(listTemp),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.log('Error:', error);
// });

// fetch('/edit/listItems1', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(listTemp),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.log('Error:', error);
// });


// fetch('/edit/listItems2', {
    //     method: 'POST', // or 'PUT'
    //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(listTemp),
        //   })
        //   .then(response => response.json())
        //   .then(data => {
            //     console.log('Success:', data);
            //   })
            //   .catch((error) => {
                //     console.log('Error:', error);
                // });
                
                
// fetch('/delete/listItems2', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(listTemp),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.log('Error:', error);
// });