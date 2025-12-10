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
let count = 0;
for (let x = 0; x < arr.length; x++){
    for (let y = 0; y < arr[0].length; y++){
        const currelem = arr[x][y];
        if (x !== arr.length - 1) {    
            if (currelem === "S"){
                arr[x+1][y] = "|";
            }
            if (currelem === "|"){
                if (arr[x+1][y] === "."){
                    arr[x+1][y] = "|";
                } else if (arr[x+1][y] === "^"){
                    if ((arr[x+1][y-1] !== "|") || (arr[x+1][y+1] !== "|")){
                        arr[x+1][y-1] = "|";
                        arr[x+1][y+1] = "|";
                        count += 1;
                    }
                }
                    
            }
        }
    }
}

console.log(count);
/*for (let x = 0; x < arr.length; x++){
    for (let y = 0; y < arr[0].length; y++){
        if (arr[x][y] === "|"){
            count += 1;
        }
    }
}
*/

//console.log(divider(count));