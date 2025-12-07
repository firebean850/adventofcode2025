import {readFile} from "node:fs/promises";
const ranges = (await readFile("day5ranges.txt", "utf8")).trim(); 
const desiredranges = ranges.split('\n');
const limited = desiredranges.map(x => x.split("-"));
let sum = 0;
const sorted = limited.sort((a, b) => Number(a[0]) - Number(b[0]));
const len = sorted.length;
const target = [sorted[0]];
console.log(target);
for (let x = 1; x < len; x++){
    const lowerlimit = sorted[x][0];
    const upperlimit = sorted[x][1];
    const tarlen = target.length;
    const prevlowerlimit = target[tarlen-1][0];
    const prevupperlimit = target[tarlen-1][1];
    if (Number(lowerlimit) <= Number(prevupperlimit)){
        target[tarlen-1][1] = Math.max(upperlimit, prevupperlimit);
    } else if (Number(upperlimit) >= Number(prevlowerlimit) && Number(upperlimit) <= Number(prevupperlimit)) {
        target[tarlen-1][0] = Math.min(lowerlimit, prevlowerlimit);
    } else if (Number(upperlimit) > Number(prevupperlimit)){
        target[tarlen] = sorted[x];
    } else {
        console.log("edge case " + sorted[x] + "prev: " + target[tarlen - 1]);

    }

}

for (let y = 0; y < target.length; y++){
    sum += Number(target[y][1]) - Number(target[y][0]) + 1
}

console.log(sum);
