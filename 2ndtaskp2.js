import {readFile} from "node:fs/promises";
const longint = (await readFile("day2input.txt", "utf8")).trim();
const nice = longint.split(",");
const limited = nice.map(x => x.split("-"));
let sum = 0;
for (let y = 0; y < limited.length; y++){
    let start = limited[y][0];
    let end = limited[y][1]; //for each item/range in the array
    for(let x = Number(start); x <= Number(end); x++){ //for number in range of the given range
        let target = String(x);
        const len = target.length;
        for (let z = 1; z < len; z++){ //for 
            let count = 1;
            if (len % z !== 0 || len / z < 2){
                continue;
            } else {
                let standard = target.slice(0, z);
                let allMatch = true;
                for (let a = z; a < len; a += z){
                    if (target.slice(a, a + z) === standard){
                        count += 1;
                    } else {
                        allMatch = false;
                        break;
                    }
                }
                if (allMatch && count >= 2){
                    sum += x;
                    break;
                }
            }
        }
        
    }

}
console.log(sum);
