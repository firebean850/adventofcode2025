import {readFile} from "node:fs/promises";
const input = (await readFile("day4input.txt", "utf8")).trim();
const desiredinput = input.split('\n');
const width = desiredinput[0].length; //no. of cols
const height = desiredinput.length; //no. of rows
let answer = 0;
function checksurrounding(arr, row, col){
    if (arr[row][col] !== "@"){
        return false;
    }
    let count = 0;
    function helper(a, r, c){
        if (r < 0 || c < 0 || r >= height || c >= width) {
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
    if (count <= 3){
        return true;
    } else {
        return false;
    }
}

function remover(arr){
    for (let x = 0; x < height; x++){
        for (let y = 0; y < width; y++){
            if (checksurrounding(desiredinput, x, y)){
                answer += 1;
                const temp = desiredinput[x].split("");
                temp[y] = "x";
                desiredinput[x] = temp.join("");

            }
        }
    }
    let allchecked = true;
    for (let x = 0; x < height; x++){
        if (!allchecked){
            break;
        }
        for (let y = 0; y < width; y++){
            if (checksurrounding(desiredinput, x, y)){
                allchecked = false;
                break;
            }
        }
    }
    if (!allchecked){
        remover(desiredinput);
    }

}
remover(desiredinput);

console.log(answer);
//2720 too low
