import {readFile} from "node:fs/promises";
const input = (await readFile("day6input.txt", "utf8")).split('\n'); 
const operandrows = (input.pop()).trim().split(/\s+/);
const numberrows = input;
const width = input[0].length;
const separatorindexes = [];
let totalsum = 0;
for (let x = 0; x < width; x++){
    if (numberrows.every(y => y[x] === " ")) separatorindexes.push(x);
}
const splitstrings = numberrows.map(x => {
    const parts = [];
    let start = 0;
    for (const sep of separatorindexes){
        parts.push(x.slice(start, sep))
        start = sep + 1;
    }
    parts.push(x.slice(start));
    return parts;
})//array of arrays - rows are preserved, but elements are split by problems

const accum = [];
for (let x = 0; x < splitstrings.length; x ++){// x is rows
    for (let y = 0; y < splitstrings[x].length; y++){
        if (accum[y] === undefined) {accum[y] = [];}// y is cols
        for (let z = 0; z < splitstrings[x][y].length; z++){ // z is pos of each char in the string
            const current = splitstrings[x][y][z];
            if (accum[y][z] === undefined) {accum[y][z] = "";}
            if (current === ' '){
                continue;
            } else {
                accum[y][z] = accum[y][z] + current;
            }
        }

    }
}
//console.log(accum);
console.log(accum.length);
console.log(operandrows.length);
for (let x = 0; x < operandrows.length; x++){
    const operator = operandrows[x];
    const currentarray = accum[x];
    let sum = Number(currentarray[0]);
    const binaryop = operator === "*" ? (a, b) => a*b : (a, b) => a+b;
    for (let y = 1; y < currentarray.length; y++){
        const currentitem = Number(currentarray[y]);
        sum = binaryop(sum, currentitem);
    }
    totalsum += sum;


}

console.log(totalsum);



