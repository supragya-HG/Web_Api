// const listInput1 = document.querySelector('.list-input');
// const listButton1 = document.querySelector('.list-button');
// const listItems1 = document.querySelector('.list-items');

// const listInput = document.querySelector('.list-input');



// why this works

const listButton_1 = document.querySelector('.list-button-1');
const listButton_2 = document.querySelector('.list-button-2');
const listItems_1 = document.querySelector('.list-items-1');
const listItems_2 = document.querySelector('.list-items-2');

listButton_1.addEventListener("click", addListItem);
listButton_2.addEventListener("click", addListItem);
listItems_1.addEventListener("click", doAction);
listItems_2.addEventListener("click", doAction);


function addListItem(event){
    event.preventDefault();
    const parentForm = event.target.parentElement;
    const parentList = parentForm.parentElement;
    // Imp 
    const listItemsCurrent = parentList.querySelector("[class^=list-items");
    // console.log(listItemsCurrent.classList[0]);
    let listNum;
    if(listItemsCurrent.classList[0] === 'list-items-1'){
        listNum = '1';
    }
    else if(listItemsCurrent.classList[0] === 'list-items-2'){
        listNum = '2';
    }

    const listInput = parentForm.querySelector('.list-input');
    // console.log(listItemsCurrent);
    
    const listDiv = document.createElement("div");
    listDiv.classList.add("list-data");
    
    const newLi = document.createElement('li');
    newLi.innerText = listInput.value;
    newLi.classList.add('list-text');
    listDiv.appendChild(newLi);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('edit-button');
    listDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('delete-button');
    listDiv.appendChild(deleteButton);

    listItemsCurrent.appendChild(listDiv)
    // saveLocalList(listInput.value, listNum);
    listInput.value = "";
}

function doAction(e){
    const item = e.target;
    // console.log(item);
    // console.log(item.classList);

    if(item.classList[0] === 'delete-button'){
        const list = item.parentElement;
        list.remove();
    }
    else if(item.classList[0] === 'edit-button'){
        const list = item.parentElement;
        const listData = list.querySelector('.list-text');
        // console.log(listData.innerText);
        const oldData = listData.innerText;
        // listData.remove();
        let updateForm = document.createElement('form');
        updateForm.innerHTML = '<input type="text" class="list-update-input">  <button class="list-update-button" type="submit">Update</button>';
        const updateFormInput = updateForm.querySelector('.list-update-input');
        updateFormInput.value = oldData;
        list.replaceChild(updateForm, listData);
        list.querySelector('.edit-button').remove();


        const updateButton = document.querySelector('.list-update-button');
        updateButton.addEventListener("click", updateData);
    }

    // Imp Why It didnt work like this


    // else if(item.classList[0] === 'list-update-button'){
    //     console.log('hi');
    
        
    //     // const list = item.parentElement;
    //     // const listUpdateForm = list.querySelector('.list-update-input');
    //     // const updateButton = list.querySelector('.list-update-button')
    //     // console.log(listUpdateForm.innerText);
    //     // const newData = listUpdateForm.innerText;
    //     // // listData.remove();
    //     // const updatedList = document.createElement('li');
    //     // updatedList.classList.add('list-text');
    //     // updatedList.value = newData;

    //     // const newEditButton = document.createElement('button');
    //     // newEditButton.classList.add('edit-button');
    //     // newEditButton.value = Edit;

    //     // list.replaceChild(updatedList, listUpdateForm);
    //     // list.replaceChild(newEditButton, updateButton);
        
    // }
}

function updateData(e){
    e.preventDefault();
    const item = e.target;
    // console.log(item);
    // console.log(item.classList); 
    
    
    const Form = item.parentElement;
    // console.log(Form);
    // console.log(Form.querySelector('.list-update-input').value);
    const list = Form.parentElement;
    // console.log(list);
    // const listUpdateForm = list.querySelector('.list-update-input');
    // const updateButton = list.querySelector('.list-update-button')
    // console.log(listUpdateForm.innerText);


    // value property of input form


    const newData = Form.querySelector('.list-update-input').value;
    // listData.remove();
    const updatedList = document.createElement('li');
    updatedList.classList.add('list-text');
    updatedList.innerText = newData;

    const newEditButton = document.createElement('button');
    newEditButton.classList.add('edit-button');
    newEditButton.innerText = 'Edit';
    Form.remove();
    // console.log(newEditButton);
    // console.log(updatedList);
    list.insertBefore(newEditButton, list.querySelector('.delete-button'));
    list.insertBefore(updatedList, newEditButton);
}


// function saveLocalList(listItem, listNum){
//     let ListItems1, ListItems2;
//     if(listNum === '1'){
//         if(localStorage.getItem('ListItems1') === null){
//             ListItems1 = [];
//         }
//         else{
//             JSON.parse(localStorage.getItem("ListItems1"));
//         }
    
//         ListItems1.push(listItem);
//         localStorage.setItem("listItems1", JSON.stringify(ListItems1))    
//     }
//     else if(listNum === '2'){
//         if(localStorage.getItem('ListItems2') === null){
//             ListItems2 = [];
//         }
//         else{
//             JSON.parse(localStorage.getItem("ListItems2"));
//         }
    
//         ListItems2.push(listItem);
//         localStorage.setItem("listItems2", JSON.stringify(ListItems2))    
//     }
    
// }