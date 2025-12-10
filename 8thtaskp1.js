import {readFile} from "node:fs/promises";
const input = (await readFile("day8input.txt", "utf8")).trim().split('\n');
const coords = input.map(x => x.split(','));

function distbetwcoords(coord1,coord2){
    const numerical1 = coord1.map(Number);
    const numerical2 = coord2.map(Number);
    return Math.sqrt((numerical1[0]-numerical2[0])**2 + (numerical1[1]-numerical2[1])**2 + (numerical1[2]-numerical2[2])**2);
}

const arrayofdiff = [];
for (let x = 0; x < coords.length; x++){
    for (let y = 0; y < coords.length; y++) {
        if (x === y || x > y) {
            continue;
        } else {
            const dict = new Map();
            const pair = [x,y];
            const dist = distbetwcoords(coords[x], coords[y]);
            dict.set(dist, pair);
            arrayofdiff.push(dict);
        }
    }
}

const sorteddiff = arrayofdiff.sort((a, b) => {
    const keyA = [...a.keys()][0];
    const keyB = [...b.keys()][0];
    return keyA - keyB;
})


const graph = Array.from({length: coords.length}, () => []);
for (let x = 0; x < 1000; x++){
    const current = sorteddiff[x];
    const key = [...current.keys()][0];
    const [a,b] = current.get(key);
    graph[a].push(b);
    graph[b].push(a);
}

const seenalr = new Array(coords.length).fill(false);
const circuitlengths = [];

for (let i = 0; i < coords.length; i++){
    if (seenalr[i]){
        continue;
    }
    const stack = [i];
    let size = 0;
    while (stack.length > 0){
        const node = stack.pop();
        if (seenalr[node]) {continue;}
        seenalr[node] = true;
        size += 1;

        for (const x of graph[node]){
            if (!seenalr[x]) {stack.push(x);}
        }
    }
    circuitlengths.push(size);
}
circuitlengths.sort((a,b) => b-a);
console.log(circuitlengths[0]*circuitlengths[1]*circuitlengths[2]);

