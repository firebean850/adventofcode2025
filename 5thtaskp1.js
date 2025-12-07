import {readFile} from "node:fs/promises";
const ranges = (await readFile("day5ranges.txt", "utf8")).trim(); //Split the given input into 2 files for ease of access
const desiredranges = ranges.split('\n');
const limited = desiredranges.map(x => x.split("-"));
const input = (await readFile("day5inputs.txt", "utf8")).trim();
const desiredinput = input.split('\n');
let count = 0;
for (let x = 0; x < desiredinput.length; x++){
    let fresh = false;
    for (let y = 0; y < limited.length; y++){
        const lowerlimit = Number(limited[y][0]);
        const upperlimit = Number(limited[y][1]);
        const tofind = Number(desiredinput[x]);
        if (tofind > upperlimit || tofind < lowerlimit){
            continue;
        } else if (tofind >= lowerlimit && tofind <= upperlimit){
            fresh = true;
        }
    }
    if (fresh){
        count +=1;
    }

}
console.log(count);



