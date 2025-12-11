//so this wasnt as easy as i imagined... was stuck on this for at least a day 
//initially tried to code every single coordinate as an array 
//which exploded the memory before I. got a bit of inspiration/help from r/adventofcode...
//unfortunately my original code ran for 3 hours before crashing due to memory :(

import {readFile} from "node:fs/promises";
const input = (await readFile("day9input.txt", "utf8")).trim().split('\n');
const coords = input.map(x => x.split(',')).map(x => x.map(Number));
const area = (minx, miny, maxx, maxy) => (maxx - minx + 1) * (maxy - miny + 1);
const pairs = [];
for (let x = 0; x < coords.length; x++){
    for (let y = 0; y < coords.length; y++){
        if (x >= y){continue;}
        let lesserx = Math.min(coords[x][0], coords[y][0]);
        let higherx = Math.max(coords[x][0], coords[y][0]);
        let lessery = Math.min(coords[x][1], coords[y][1]);
        let highery = Math.max(coords[x][1], coords[y][1]);
        pairs.push([lesserx, lessery, higherx, highery]);
    }
}
pairs.sort((a,b) => area(...b) - area(...a));
const lines = [];
for (let x = 0; x < coords.length; x++){
    const [x1, y1] = coords[x];
    const [x2, y2] = coords[(x+1) % coords.length];
    let lesserx = Math.min(x1, x2);
    let higherx = Math.max(x1, x2);
    let lessery = Math.min(y1, y2);
    let highery = Math.max(y1, y2);
    lines.push([lesserx, lessery, higherx, highery]);

}
lines.sort((a,b) => area(...b) - area(...a));
for (const [lesserx, lessery, higherx, highery] of pairs){
    let allpassed = true;
    for (const [x1, y1, x2, y2] of lines){
        if (x1 < higherx && y1 < highery && x2 > lesserx && y2 > lessery){
            allpassed = false;
            break;
        } 
    }
    if (!allpassed) {
        continue;
    } else {
        console.log(area(lesserx,lessery,higherx,highery));
        break;
    }
    
}



