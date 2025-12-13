import {readFile} from "node:fs/promises";
const input = (await readFile("day11input.txt", "utf8")).trim().split('\n').map(x => x.split(':'));
const machines = input.map(x => x.shift());
const outputs = input.map(x => x[0].trim().split(/\s+/));
const start = machines.indexOf('you');
const memo = new Map();
function countpaths(currentindex){
    if (memo.has(currentindex)){return memo.get(currentindex);}
    const availoutputs = outputs[currentindex];
    const len = availoutputs.length;
    if (len === 1 && availoutputs[0] === 'out'){
        memo.set(currentindex, 1);
        return 1;
    } else {
        let result = 0;
        for (const x of availoutputs){
            if (x === 'out'){
                result += 1;
                continue;
            }
            const next = machines.indexOf(x);
            result += countpaths(next);
        }
        memo.set(currentindex, result);
        return result;
    }
}

console.log(countpaths(start));