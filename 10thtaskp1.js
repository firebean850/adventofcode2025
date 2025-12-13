import {readFile} from "node:fs/promises";
const input = (await readFile("day10input.txt", "utf8")).trim().split('\n');
const splitted = input.map(x=> x.split(/\s+/));
const indicators = (splitted.map(x => x.shift())).map(y => y.slice(1,-1).split(''));
const joltages = splitted.map(x => x.pop()); //not used for part1
const buttons = splitted.map(x => x.map(y => y.replace(/[()]/g,"").split(',').map(Number)));
let total = 0;
for (let i = 0; i < indicators.length; i++){
    const desiredstate = indicators[i];
    const availbuttons = buttons[i];
    let bitwise_desstate = 0;
    for (let j = 0; j < desiredstate.length; j++){
        if (desiredstate[j] === "#"){
            bitwise_desstate |= (1 << j);
        }
    }
    const buttonMasks = availbuttons.map(button => {
        let mask = 0;
        for (const x of button){
            mask |= (1 << x)
        }
        return mask;
    })

    const queue = [{state: 0, steps: 0, buttonindex: 0}];
    const seen = new Set();
    let minbuttonpresses = Infinity;

    while (queue.length > 0){
        const {state, steps, buttonindex} = queue.shift();
        const key = `${state}|${buttonindex}`;
        if (seen.has(key)){continue;}
        seen.add(key);
        if (state === bitwise_desstate){
            minbuttonpresses = Math.min(minbuttonpresses, steps);
            continue;
        } 
        if (buttonindex >= availbuttons.length || steps >= minbuttonpresses){
            continue;
        }
        queue.push({state, steps, buttonindex: buttonindex + 1});
        const nextstate = state ^ buttonMasks[buttonindex];
        queue.push({state: nextstate, steps: steps + 1, buttonindex: buttonindex});
    }
    if (minbuttonpresses !== Infinity){
        total += minbuttonpresses;
    }
}
console.log(total);