// fetch('/allData')
//   .then(response => response.json())
//   .then(data => listAllData(data));

// function listAllData(data){
//     console.log(data);
// }

fetch('/uniqueListID')
  .then(response => response.json())
  .then(data => ConsoleLog(data));

fetch('/listItems1')
  .then(response => response.json())
  .then(data => ConsoleLog(data));

fetch('/listItems2')
  .then(response => response.json())
  .then(data => ConsoleLog(data));






  
const data = { uniqueListID : 15 };
  
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


function ConsoleLog(data){
    console.log(data);
}
