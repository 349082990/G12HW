// Typed the same thing as Hyunseo - There were a lot of parts that I didn't know how to do (Forgot grade 11 content)
const yousif = document.getElementById("yousif");
const btn = document.getElementById("btn");
// btn.addEventListener('click', ()=> increase());
let count = 0;

const input = document.getElementById("input") as HTMLInputElement;
btn.addEventListener('click', ()=> check());

function check(){
    

    let counter: number = 0;

    for (let i = 0; i > -1; i++){
        let random = Math.floor(Math.random() * ( (10**16-1) - (10**9-1) + 1))+ 10**8;

        let check: string = random.toString(); 

        counter++;

        if (add(check) === true){
            console.log(random);
            console.log(counter);
            return random; 
        }
    }
}

function check2(){
    let input = document.getElementById("input") as HTMLInputElement;

    console.log(add(input.value));
}






function takeDigits(inputString: string): number[] {

    let numbers = Number(inputString);
    let tempArray: number[] = [];
    let temp: number = 0;

    for (let i = 0; i < inputString.length; i++){

        temp = (numbers % 10);

        tempArray[inputString.length-1-i] = temp;

        numbers = Math.floor(numbers/10);
    }
    return tempArray; 
}



function times2(inputString: string): number[] {
    
    let tempArray = takeDigits(inputString);
    
    if (tempArray.length % 2 == 0){

        for (let i = 0; i< tempArray.length; i++){
            if (i % 2 == 0){
                if (tempArray[i]*2 > 9){
                    let temp: number = tempArray[i]*2;
                    temp = Math.floor(temp/10) + (temp % 10); 
                    tempArray[i] = temp;
                } else {
                    tempArray[i] = tempArray[i]*2;

                }
            }
        }
    } else { 
        for (let i = 0; i< tempArray.length; i++){
            if (i % 2 != 0){
  
                if (tempArray[i]*2 > 9){
                    let temp: number = tempArray[i]*2;
                    temp = (Math.floor[temp/10] + (temp % 10)); 
                    tempArray[i] =temp;
                } else {
                    tempArray[i] = tempArray[i]*2;

                }
            }
        }  
    }
    
    return tempArray;
}

function add(inputString: string): boolean {
    let tempArray = times2(inputString);

    let number: number = 0;

    for (let i = 0; i<tempArray.length; i++){
        number = number + tempArray[i];
    }

    if (number % 10 === 0){
        return true;
    } else {
        return false;
    }
}