import {readFile} from "node:fs/promises";
const input = (await readFile("day7input.txt", "utf8")).trim().split('\n');
const arr = [];
for (let x = 0; x < input.length; x++){
    if (arr[x] === undefined) {
        arr[x] = [];
    }
    for (let y = 0; y < input[0].length; y++){
        arr[x][y] = input[x][y];
    }
}//converted str to array 

const rows = arr.length;
const cols = arr[0].length
const memo = new Map();
function perms(array, currentx){
    const key = currentx + "|" + array.map(r => r.join('')).join('\n');
    if (memo.has(key)) return memo.get(key);
    if (currentx === rows - 1){
        memo.set(key,1);
        return 1;
    } 
    let ways = 0;
    for (let y = 0; y < cols; y++){
        const current = array[currentx][y];
        if (current === "S" || current === "|" && array[currentx+1][y] === "."){
            const temp = arr.map(x => [...x]);
            temp[currentx + 1][y] = "|";
            ways += perms(temp, currentx+1);
        } else if (current === "|" && array[currentx+1][y] === "^"){
            if (y > 0){
                const templeft = array.map(x => [...x]);
                templeft[currentx + 1][y-1] = "|";
                ways += perms(templeft, currentx+1);
            } 
            if (y < rows - 1){
                const tempright = array.map(y => [...y]);
                tempright[currentx + 1][y+1] = "|";
                ways += perms(tempright, currentx+1)
            }
        }
    }
    memo.set(key, ways);
    return ways;
}




console.log(perms(arr,0));

