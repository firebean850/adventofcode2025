import {readFile} from "node:fs/promises";
const input = (await readFile("day11input.txt", "utf8")).trim().split('\n').map(x => x.split(':'));
const machines = input.map(x => x.shift());
const outputs = input.map(x => x[0].trim().split(/\s+/));
const start = machines.indexOf('svr');
const memo = new Map();
function countpaths(currentindex, visiteds1, visiteds2){
    const key = `${currentindex}-${visiteds1 ? 1 : 0}-${visiteds2 ? 1 : 0}`;
    if (memo.has(key)){return memo.get(key);}
    const availoutputs = outputs[currentindex];
    const len = availoutputs.length;
    if (len === 1 && availoutputs[0] === 'out'){
        if (visiteds1 && visiteds2){
            memo.set(key, 1);
            return 1;
        } else {
            memo.set(key, 0);
            return 0;
        }
    } 
    let result = 0;
    for (const x of availoutputs){
        if (x === 'out'){
            result += 1;
            continue;
        }
        const newvis1 = visiteds1 || (x === 'fft');
        const newvis2 = visiteds2 || (x === 'dac');
        const next = machines.indexOf(x);
        result += countpaths(next, newvis1, newvis2);
    }
    memo.set(key, result);
    return result;
    
}
console.time("Elapsed");
console.log(countpaths(start, false, false));
console.timeEnd("Elapsed"); //19.461 ms || probably can make it iterative somehow will come back to optimise