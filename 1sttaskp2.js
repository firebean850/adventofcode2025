import {readFile} from "node:fs/promises";
const longstring = (await readFile("day1input.txt", "utf8")).trim();
const words = longstring.split('\n');
const len = words.length;
//console.log(len); //4446 entries
let current = 50;
let count = 0;
for (let x = 0; x < len; x += 1){
    const instruction = words[x];
    const direction = instruction[0];
    const targetnumber = Number(instruction.slice(1)) % 100;
    count += Math.floor(Number(instruction.slice(1))/100);
    //console.log("the previous count is " + String(count));
    //console.log("my number is " + String(Number(instruction.slice(1))));
    //console.log("the count is " + String(count));

    if (targetnumber === 0) {
        continue;
    }
    if (direction === "L") {
        let newpos = (current - targetnumber + 100) % 100;
        if (targetnumber > current && current !== 0|| newpos === 0) {
            //need to add current !== 0, because if current is 0 and we move left, 
            //targetnumber > current but we dont "pass by 0"
            count += 1;
        }
        current = newpos;
    } else {
        let newpos = (current + targetnumber) % 100;
        if (current + targetnumber > 100 || newpos === 0){
            count += 1;
        }
        current = newpos;
    }
}
console.log(count);

