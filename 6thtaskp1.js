import {readFile} from "node:fs/promises";
const input = ((await readFile("day6input.txt", "utf8")).trim()).split('\n'); 
const numberrows = [];
const operandrows = [];
for (const x of input){
    if (/^\d+(\s+\d+)*$/.test(x.trim())){
        numberrows.push(x.trim().split(/\s+/).map(Number)); //just learnt I could do .map(Number)....
    } else {
        operandrows.push(x.trim().split(/\s+/));
    }
} 
const rows = numberrows.length;
const cols = numberrows[0].length;
let totalsum = 0;
for (let x = 0; x < cols; x++){
    let sum = 0;
    for (let y = 0; y < rows; y++){
        if (y === 0){
            sum = numberrows[y][x];
        } else if (operandrows[0][x] === '*'){
            sum *= numberrows[y][x];
        } else {
            sum += numberrows[y][x];   
        }
    }
    totalsum += sum;
}
console.log(totalsum);

