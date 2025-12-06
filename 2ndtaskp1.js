import {readFile} from "node:fs/promises";
const longint = (await readFile("day2input.txt", "utf8")).trim();
const nice = longint.split(",");
const limited = nice.map(x => x.split("-"));
let sum = 0;
for (let y = 0; y < limited.length; y++){
    let start = limited[y][0];
    let end = limited[y][1];
    for(let x = Number(start); x <= Number(end); x++){
        const len = String(x).length;
        if (len % 2 === 1){
            continue;
        } else {
            const mid = len/2;
            if (String(x).slice(0, mid) === String(x).slice(mid)){
                sum += x;
            }
        }

    }

}
console.log(sum);