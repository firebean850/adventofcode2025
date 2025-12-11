import {readFile} from "node:fs/promises";
const input = (await readFile("day9input.txt", "utf8")).trim().split('\n');
const coords = input.map(x => x.split(','));
function findarea(coord1, coord2){
    const numer1 = coord1.map(Number);
    const numer2 = coord2.map(Number);
    const width = Math.abs(numer1[0] - numer2[0]) + 1;
    const length = Math.abs(numer1[1] - numer2[1]) + 1;
    return width * length;
}

const areas = [];
for (let x = 0; x < coords.length; x++){
    for (let y = 0; y < coords.length; y++){
        if (x >= y) {continue;}
        const c1 = coords[x];
        const c2 = coords[y]; 
        const areafound = findarea(c1, c2);
        const dict = new Map();
        const pair = [c1, c2];
        dict.set(areafound, pair);
        areas.push(dict);
    }
}

const sortedareas = areas.sort((a, b) => {
    const keyA = [...a.keys()][0];
    const keyB = [...b.keys()][0];
    return keyB - keyA;
})

console.log([...sortedareas[0].keys()][0]);
