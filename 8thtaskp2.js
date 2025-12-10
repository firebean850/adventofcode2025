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
const connected = Array.from({length: coords.length}, (_,i) => i); //array of indexes
let lastpair = null;
for (let x = 0; x < sorteddiff.length; x++){
    const current = sorteddiff[x];
    const key = [...current.keys()][0];
    const [a,b] = current.get(key);
    graph[a].push(b);
    graph[b].push(a);
    const circuita = connected[a]; 
    const circuitb = connected[b];
    if (circuita !== circuitb){
        for (let i = 0; i < connected.length; i++) {
            if (connected[i] === circuitb) connected[i] = circuita;
        }
        lastpair = {a, b, dist: key}; //we assign lastpair to an object
    }
}
const firstxcoord = Number(coords[lastpair.a][0]);
const secondxcoord = Number(coords[lastpair.b][0]);
console.log(firstxcoord * secondxcoord);