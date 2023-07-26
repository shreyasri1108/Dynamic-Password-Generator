//                fetching the data's
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");   
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'; // created a string for generating random string using mapping from address

let password = ""; // intially there is nothing hence empty
let passwordLength = 10; // default location of slider
let checkCount = 0;
handleSlider();
//set strength circle color to gray
 setIndicator('#ccc');
//function setting the length of the password
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%" // ((passwordLength-min)*100/(max-min)) + "% is width and rest are height
}

// this function sets the color and shadow of stength wla ball 
function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    // shadow by own
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
 
function getRndInteger(min , max)
{
    return Math.floor(Math.random() *(max - min)) + min; // Math.random gives number between 0 and 1 , now it will give random no b/w 0 to max - min as = (0*(max-min) to 1(max*min)), now add min to both , so 0+ min to (max-min)+min = min to max random numbers
}

function generateRandomNumber()
{
    return getRndInteger(0,9);
}

function generateLowerCase()
{
   return  String.fromCharCode(getRndInteger(97,123)); //"String.fromCharCode" this converts the number into character , hence found random small char
}  

function generateUpperCase()
{
   return  String.fromCharCode(getRndInteger(65,91)); //"String.fromCharCode" this converts the number into character , hence found random small char
} 

function generateSymbol()
{
   const randNum = getRndInteger(0 , symbols.length);
   return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false; // for checkbox 
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

function shufflePassword(array) {
    //Fisher Yates Method (EASY H JST TRY TO UNDERSTAND)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // here the range lies between(0 to i+1), it comes up with a random index
        const temp = array[i];  // saving the value
        array[i] = array[j]; // swapping last index with any random index
        array[j] = temp; // copying the value
      }
    let str = "";
    array.forEach((el) => (str += el)); // here each character is added in a string
    return str;
}

// // await only works when written under async function
//  async function copyContent() 
// {
//     // possibilty ke chal bhi skta h or nhi bhi.. therefore for nhi wla condition try catch is written
//     try 
//     {
//        await navigator.clipboard.writeText(passwordDisplay.value); // api used
//        copyMsg.innerText = "copied"; // this will go under span and will be shown on screen now
//     }

//     catch(e)
//     {
//         copyMsg.innerText = "Failed";
//     }
    
//     //to make copy wla "spam" invisible
//     copyMsg.classList.add("active");

//     setTimeout(() => {
//         copyMsg.classList.remove("active");
//     },2000); // 2 sec ke baad "active" class is removed and hence the css property along with the text value is disapered
// }

async function copyContent() {
    console.log("before try block");
    try {
        console.log("after try block");
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active"); // adding a class from css to span tag now

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000); //after 2 second this class is removed

}

function handleCheckBoxChange()
{
    checkCount = 0;
    allCheckBox.forEach ( (checkbox) => {
        if(checkbox.checked)
         checkCount++;
    });

    //special condition for length of the password
    if( passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider(); //so that UI me changes ho jae
    }
}


allCheckBox.forEach( (checkbox) =>
{
    checkbox.addEventListener('change', handleCheckBoxChange);
})// appling a loop , on change on tick or not given function will be called

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value; // jo bhi slider ke move karne par value h usko copy kardo password ki length me 
    handleSlider(); // e.target shows ki slider ke move karne par recent value fetch ho jae
})

copyBtn.addEventListener('click', () => {
    console.log("1");
    if(passwordDisplay.value) // input is non-empty then value can be copied otherwise not
    {
        console.log("2");
        copyContent();
    }
})



generateBtn.addEventListener('click', () =>
{
  // none of the checkbox are selected
   if(checkCount == 0) return;

   if(passwordLength < checkCount)
   {
    passwordLength = checkCount;
    handleSlider();
   }

   // let's start the journey to find new password
    
     // removing the old password
     password =""; 

    // let's put the stuff mentioned by checkboxes
    
    // METHOD 1 - but not applicable for random pickups more than 4
    // if(uppercaseCheck.checked)
    // {
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked)
    // {
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked)
    // {
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked)
    // {
    //     password += generateSymbol();
    // }
    
    // METHOD 2 -

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    // compulsary addition

    for(let i=0; i<funcArr.length ; i++)
    {
       password += funcArr[i]();
    }

    //remaining addition of characters 
    for(let i=0; i<passwordLength-funcArr.length; i++)
    {
        let randIndex = getRndInteger(0 , funcArr.length);
        
        password += funcArr[randIndex]();
    }

    // problem - this way we get a herirachy at starting like A,a,1,!
    //but we want it random , Hence shuffling these values

    password = shufflePassword(Array.from(password)); // using "Array.from" we have sent the password in form of array 

    //show in UI
    passwordDisplay.value = password;

    // calculating strength
    calcStrength();
});


