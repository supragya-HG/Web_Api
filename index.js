// const listInput1 = document.querySelector('.list-input');
// const listButton1 = document.querySelector('.list-button');
// const listItems1 = document.querySelector('.list-items');

// const listInput = document.querySelector('.list-input');



// why this works

const listButton_1 = document.querySelector('.list-button-1');
const listButton_2 = document.querySelector('.list-button-2');
const listItems_1 = document.querySelector('.list-items-1');
const listItems_2 = document.querySelector('.list-items-2');

document.addEventListener('DOMContentLoaded', getListData);
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
    saveLocalList(listInput.value, listNum);
    listInput.value = "";
}

function doAction(e){
    const item = e.target;
    // console.log(item);
    // console.log(item.classList);
    


    if(item.classList[0] === 'delete-button'){
        const list = item.parentElement;
        let listNum;
        if(list.parentElement.classList[0] === 'list-items-1'){
            listNum = '1';
        }
        else if(list.parentElement.classList[0] === 'list-items-2'){
            listNum = '2';
        }

        const listData = list.querySelector('.list-text');
        removeLocalStorageData(listData.innerText, listNum);
        list.remove();
    }
    else if(item.classList[0] === 'edit-button'){
        const list = item.parentElement;
        let listNum;
        if(list.parentElement.classList[0] === 'list-items-1'){
            listNum = '1';
        }
        else if(list.parentElement.classList[0] === 'list-items-2'){
            listNum = '2';
        }

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

        removeLocalStorageData(oldData, listNum);
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

    console.log(list);
    let listNum;
    if(list.parentElement.classList[0] === 'list-items-1'){
        listNum = '1';
    }
    else if(list.parentElement.classList[0] === 'list-items-2'){
        listNum = '2';
    }
    saveLocalList(newData, listNum);

}


function saveLocalList(listItem, listNum){
    let listItems1, listItems2;
    if(listNum === '1'){
        if(localStorage.getItem('listItems1') === null){
            listItems1 = [];
        }
        else{
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
        }
    
        listItems1.push(listItem);
        localStorage.setItem("listItems1", JSON.stringify(listItems1))    
    }
    else if(listNum === '2'){
        if(localStorage.getItem('listItems2') === null){
            listItems2 = [];
        }
        else{
            listItems2 = JSON.parse(localStorage.getItem("listItems2"));
        }
    
        listItems2.push(listItem);
        localStorage.setItem("listItems2", JSON.stringify(listItems2))    
    }
    
}   


function getListData(){
    let listItems1, listItems2;
    
    if(localStorage.getItem('listItems1') === null){
        listItems1 = [];
    }
    else{
        listItems1 = JSON.parse(localStorage.getItem("listItems1"));
    }

    if(localStorage.getItem('listItems2') === null){
        listItems2 = [];
    }
    else{
        listItems2 = JSON.parse(localStorage.getItem("listItems2"));
    }


    listItems1.forEach(function(listData){
        const listItemsCurrent = document.querySelector(".list-items-1");
        
        const listDiv = document.createElement("div");
        listDiv.classList.add("list-data");
        
        const newLi = document.createElement('li');
        newLi.innerText = listData;
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
    
    })

    listItems2.forEach(function(listData){
        const listItemsCurrent = document.querySelector(".list-items-2");
        
        const listDiv = document.createElement("div");
        listDiv.classList.add("list-data");
        
        const newLi = document.createElement('li');
        newLi.innerText = listData;
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
    
    })
}

function editLocalStorageData(listData, listNum){
    // console.log(listData, listNum);
    let listItems1,listItems2;
    if(listNum === '1'){
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
            listItems1.splice(listItems1.indexOf(listData),1);
            localStorage.setItem("listItems1", JSON.stringify(listItems1));
    }
    else if(listNum === '2'){
        listItems2 = JSON.parse(localStorage.getItem("listItems2"));
        listItems2.splice(listItems2.indexOf(listData),1);
        localStorage.setItem("listItems2", JSON.stringify(listItems2));
    }

}

function removeLocalStorageData(listData, listNum){
    // console.log(listData, listNum);
    let listItems1,listItems2;
    if(listNum === '1'){
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
            listItems1.splice(listItems1.indexOf(listData),1);
            localStorage.setItem("listItems1", JSON.stringify(listItems1));
    }
    else if(listNum === '2'){
        listItems2 = JSON.parse(localStorage.getItem("listItems2"));
        listItems2.splice(listItems2.indexOf(listData),1);
        localStorage.setItem("listItems2", JSON.stringify(listItems2));
    }

}