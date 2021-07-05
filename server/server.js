const { response } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


console.log("server starting");



var server = app.listen(3000);

// app.get('/', renderPage);
app.use(express.static('../public'));

app.get('/search/:id', getData);
// app.get('/allData' , getAllData);
app.get('/uniqueListID' , getUniqueListID);
app.get('/listItems1' , getListItems1);
app.get('/listItems2' , getListItems2);


app.post('/handle/',(request,response) => {
    console.log(request.body);
    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});


function getData(req, res){
    var data = req.params;
    console.log(data);
    var ID = data.id.toString();
    res.send(ID); 
};

function getUniqueListID(req, res){
    fs.readFile('../data/uniqueListID.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            res.status(200).send(JSONdata);
        }
    });
};

function getListItems1(req, res){
    fs.readFile('../data/listItems1.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            res.status(200).send(JSONdata);
        }
    });
};

function getListItems2(req, res){
    fs.readFile('../data/listItems2.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            res.status(200).send(JSONdata);
        }
    });
};



app.post('/handle/uniqueListID',(request,response) => {
    // console.log(request.body);
    fs.writeFile('../data/uniqueListID.json', JSON.stringify(request.body, null, 1), err => {
        if(err){
            console.log(err);
        }
        else{
            console.log("uniqueListID updated");
        }
    })
    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});


app.post('/add/listItems1',(request,response) => {
    // console.log(request.body);
    let requestData = request.body;
    fs.readFile('../data/listItems1.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            // console.log(JSONdata, 107);
            // console.log(requestData);
            JSONdata.listItems1.push(requestData);
            // console.log(JSONdata, 110);

            fs.writeFile('../data/listItems1.json', JSON.stringify(JSONdata, null, 1), err => {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("listItems1 updated");
                }
            })
        }
    });


    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});

app.post('/add/listItems2',(request,response) => {
    // console.log(request.body);
    let requestData = request.body;
    fs.readFile('../data/listItems2.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            // console.log(JSONdata, 107);
            // console.log(requestData);
            JSONdata.listItems2.push(requestData);
            // console.log(JSONdata, 110);

            fs.writeFile('../data/listItems2.json', JSON.stringify(JSONdata, null, 1), err => {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("listItems2 updated");
                }
            })
        }
    });

    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});

app.post('/edit/listItems1',(request,response) => {
    // console.log(request.body);

    let requestData = request.body;
    fs.readFile('../data/listItems1.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            // console.log(JSONdata, 107);
            // console.log(requestData);
            const len = JSONdata.listItems1.length;
            // console.log(JSONdata.listItems1[len-2], 110);
            for(let i= 0; i< len; i++){
                let listentry = JSONdata.listItems1[i];
                if(listentry.itemID.toString() === requestData.itemID.toString() ){
                    JSONdata.listItems1[i].listData = requestData.listData.toString();
                    // console.log(JSONdata, 108);
                    break;
                }
            }

            fs.writeFile('../data/listItems1.json', JSON.stringify(JSONdata, null, 1), err => {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("listItems1 edited");
                }
            })
        }
    });

    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});

app.post('/edit/listItems2',(request,response) => {
    // console.log(request.body);

    let requestData = request.body;
    fs.readFile('../data/listItems2.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            // console.log(JSONdata, 107);
            // console.log(requestData);
            const len = JSONdata.listItems2.length;
            // console.log(JSONdata.listItems1[len-2], 110);
            for(let i= 0; i< len; i++){
                let listentry = JSONdata.listItems2[i];
                if(listentry.itemID.toString() === requestData.itemID.toString() ){
                    JSONdata.listItems2[i].listData = requestData.listData.toString();
                    // console.log(JSONdata, 108);
                    break;
                }
            }

            fs.writeFile('../data/listItems2.json', JSON.stringify(JSONdata, null, 1), err => {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("listItems2 edited");
                }
            })
        }
    });

    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});

app.post('/delete/listItems1',(request,response) => {
    // console.log(request.body);

    let requestData = request.body;
    fs.readFile('../data/listItems1.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            // console.log(JSONdata, 107);
            // console.log(requestData);
            const len = JSONdata.listItems1.length;
            // console.log(JSONdata.listItems1[len-2], 110);
            for(let i= 0; i< len; i++){
                let listentry = JSONdata.listItems1[i];
                if(listentry.itemID.toString() === requestData.itemID.toString() ){
                    JSONdata.listItems1.splice(i,1);
                    // console.log(JSONdata, 108);
                    break;
                }
            }

            fs.writeFile('../data/listItems1.json', JSON.stringify(JSONdata, null, 1), err => {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("listItems1 item deleted");
                }
            })
        }
    });

    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});

app.post('/delete/listItems2',(request,response) => {
    // console.log(request.body);

    let requestData = request.body;
    fs.readFile('../data/listItems2.json', 'utf-8', (err,JSONfile) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }
        else {
            const JSONdata = JSON.parse(JSONfile);
            // console.log(JSONdata, 107);
            // console.log(requestData);
            const len = JSONdata.listItems2.length;
            // console.log(JSONdata.listItems1[len-2], 110);
            for(let i= 0; i< len; i++){
                let listentry = JSONdata.listItems2[i];
                if(listentry.itemID.toString() === requestData.itemID.toString() ){
                    JSONdata.listItems2.splice(i,1);
                    // console.log(JSONdata, 108);
                    break;
                }
            }

            fs.writeFile('../data/listItems2.json', JSON.stringify(JSONdata, null, 1), err => {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log("listItems2 item deleted");
                }
            })
        }
    });
    
    response.status(200).send(JSON.stringify("Post Request to handle sucess"));
});

















// function getAllData(req, res){
//     var data = req.params;
//     res.status(200).send(allobj);
//     // res.send(allobj,200); 
// };

// function myReadFile(url){
//     let JSONdata = {};
//     fs.readFile(url.toString(), 'utf-8', (err,JSONfile) => {
//         if(err){
//             console.log(err);
//         }
//         else {
//             JSONdata = JSON.parse(JSONfile);
//             console.log(JSONdata);
//         }
//     });
//     return JSONdata;
// }


// fs.readFile('./list-objects.json', 'utf-8', (err,listItemsJSONfile) => {
//     if(err){
//         console.log(err);
//     }
//     else {
//         try {const listItemsJSON = JSON.parse(listItemsJSONfile);
//             console.log(listItemsJSON);
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
    
// });

// const allobj = {
//     uniqueListID: 2,
//     listItems1: [ { listID: 1, itemID: 'listEntry0', listData: 'sdgdf' } ],
//     listItems2: [ { listID: 1, itemID: 'listEntry0', listData: 'fgdfgdf' } ]
//   }

// fs.writeFile('../data/new.json', JSON.stringify(allobj, null, 1), err => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("new file created");
//     }
// })