//this took me horribly long to complete, will probably revisit in the future
//initially tried to repeat using XOR, but memory exploded p quickly
//got some inspiration from u/tenthmascot on reddit instead of treating it as a linear algebra problem :(
import {readFile} from "node:fs/promises";
const input = (await readFile("day10input.txt", "utf8")).trim().split('\n');
const splitted = input.map(x=> x.split(/\s+/));
const indicators = (splitted.map(x => x.shift())).map(y => y.slice(1,-1).split('')); //not used for part 2
const joltages = splitted.map(x => x.pop()).map(y => y.replace(/[{}]/g,"").split(',').map(Number));
const buttons = splitted.map(x => x.map(y => y.replace(/[()]/g,"").split(',').map(Number)));
let totalminbuttonpresses = 0;
function normalisebuttons(bts, len){
    return bts.map(btn => {
        const result = Array(len).fill(0);
        for (const i of btn) {
            result[i] = 1;
        }
        return result;
    });
}
function patterns(bts, goallength){
    const normalised = normalisebuttons(bts, goallength);
    const len = normalised.length;
    const result = [];
    for (let x = 0; x < (1 << len); x++) {
        const sum = Array(goallength).fill(0);
        let count = 0;
        for (let i = 0; i < len; i++) {
            if ((x & (1 << i)) !== 0) {
                normalised[i].forEach((v, idx) => sum[idx] += v);
                count++;
            }
        }
        result.push({ sumarray: sum, size: count });
    }
    return result;
}

function getminbuttonpressesforcurrentproblem(bts, desired){
    const buttoncombin = patterns(bts, desired.length);
    const memo = new Map();
    function helper(goal){
        const memokey = goal.join(',');
        if (goal.every(x => x === 0)){
            memo.set(memokey,0);
            return 0;
        }
        let result = Infinity
        if (memo.has(memokey)){return memo.get(memokey);}
        let canuse = false;
        
        for (const {sumarray, size} of buttoncombin){
            const valid = sumarray.every((val,i) => val <= goal[i] && val % 2 === goal[i] % 2);
            if (!valid) {continue;}
            const newGoal = goal.map((val, i) => Math.floor((val - sumarray[i])/2));
            const totalCost = size + 2 * helper(newGoal);
            result = Math.min(result, totalCost);
        }
        memo.set(memokey, result);
        return result;
    }
    return helper(desired);
}

for (let x = 0; x < joltages.length; x++){
    const minbuttonpresses = getminbuttonpressesforcurrentproblem(buttons[x], joltages[x]);
    if (minbuttonpresses !== Infinity) totalminbuttonpresses += minbuttonpresses;
}
console.log(totalminbuttonpresses);

