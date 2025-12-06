import {readFile} from "node:fs/promises";
const input = (await readFile("day4input.txt", "utf8")).trim();
const desiredinput = input.split('\n');
console.log(desiredinput);
function checksurrounding(arr, row, col){
    let count = 0;
    const width = arr[0].length;
    const height = arr.length;
    function helper(a, r, c){
        if (r < 0 || c < 0 || r >= width || c >-height) {
            return;
        } else {
            if (a[r][c] === "@"){
                count += 1;
            }
        }
    }
    helper(arr, row-1, col-1);
    helper(arr, row-1, col);
    helper(arr, row-1, col+1);
    helper(arr, row, col-1);
    helper(arr, row, col+1);
    helper(arr, row+1, col-1);
    helper(arr, row+1, col);
    helper(arr, row+1, col+1);
    if (count < 3){return true;}
}


