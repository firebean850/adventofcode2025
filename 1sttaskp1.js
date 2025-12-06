import {readFile} from "node:fs/promises";
const longstring = (await readFile("day1input.txt", "utf8")).trim();
const words = longstring.split('\n');
//console.log(words); //4446 entries
const len = words.length;
//console.log(len);
let current = 50;
let count = 0;
for (let x = 0; x < len; x += 1){
    const instruction = words[x];
    const direction = instruction[0];
    const targetnumber = Number(instruction.slice(1)) % 100;
    if (direction === "L") {
        const overflow = current - targetnumber;
        if (overflow < 0){
            current = 100 - Math.abs(overflow);
            //current %= 100;
        } else {
            current = overflow;
        }

    } else {
        const space = 100 - current;
        const overflow = targetnumber - space;
        if (overflow >= 0){
            current = overflow;
            //current %= 100;
        } else {
            current = current + targetnumber;
        }
    }
    if (current === 0){
        count += 1;
    }

}
console.log(count);
