import './InputBox.css'

// function formSubmitHandler(e){
//     e.preventDefault();
//     const listInput1 = document.getElementById('listInput1');
//     console.log(listInput1.value);
// }

function InputBox(){
    return(
        <div>
            <form>
                {/* <input type='text' id='listInput1' name='list1' placeholder='Enter Your List Item'></input>
                <button type='submit' onClick= {formSubmitHandler}>Submit</button> */}
            </form>
        </div>
    );
}

export default InputBox;