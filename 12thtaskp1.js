import {readFile} from "node:fs/promises";
const input = (await readFile("day12input.txt", "utf8")).trim();
const splitIndex = input.search(/\n\d+x\d+:/);
const presents = input.slice(0, splitIndex).replace(/\d+:/g, "").trim().split(/\n\s*\n/).map(x => x.split('\n'));
const regions_and_counts = input.slice(splitIndex + 1).split('\n').map(x => x.split(':'));
const regions = regions_and_counts.map(x => x.shift()).map(x => x.replace('x', '*'));
const areas = regions.map(x => eval(x));
const countsofpresents = regions_and_counts.map(x => x[0].trim().split(/\s+/).map(Number));
const sizes = [];
for (let x = 0; x < presents.length; x++){
    let temp = 0;
    for (let y = 0; y < presents[x].length; y++){
        for (const c of presents[x][y]){
            if (c === '#') {temp++;}
        }
    }
    sizes[x] = temp;
}
let count = regions.length;
for (let x = 0; x < regions.length; x++){
    const availarea = areas[x];
    const temp = []
    for (let y = 0; y < presents.length; y++){
        temp[y] = countsofpresents[x][y] * sizes[y];
    }
    const totalarea = temp.reduce((a,b)=> a+b, 0)
    if (totalarea > availarea){
        count--;
    }
}
console.log(count);