import {readFile} from "node:fs/promises";
const input = (await readFile("day3input.txt", "utf8")).trim();
const splitted = input.split('\n');
//console.log(splitted);
let sum = 0;
for (let x = 0; x < splitted.length; x++) {
    let firstterm = 0;
    let secondterm = 0;
    let tenspos = 0;
    for (let y = 0; y < splitted[x].length; y++){
        if (Number(splitted[x][y]) > firstterm && y !== splitted[x].length - 1) {
            firstterm = Number(splitted[x][y]);
            tenspos = y;
            secondterm = Number(splitted[x][y+1]);
        }
        if (Number(splitted[x][y]) > secondterm && y > tenspos){
            secondterm = Number(splitted[x][y]);
        }
    }
    sum += (firstterm * 10 + secondterm);
}
console.log(sum);

