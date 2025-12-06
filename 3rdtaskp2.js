import {readFile} from "node:fs/promises";
const input = (await readFile("day3input.txt", "utf8")).trim();
const splitted = input.split('\n');
let sum = 0;
for (let x = 0; x < splitted.length; x++) {
    let beforepos = -1;
    for (let z = 12; z > 0; z--){
        let currentterm = 0;
        for (let y = 0; y < splitted[x].length; y++){
            if (Number(splitted[x][y]) > currentterm && y < (splitted[x].length - z + 1) && y > beforepos){
                currentterm = Number(splitted[x][y]);
                beforepos = y;
            }          
        }
        sum += currentterm * Math.pow(10, z - 1);
    }
}
console.log(sum);

