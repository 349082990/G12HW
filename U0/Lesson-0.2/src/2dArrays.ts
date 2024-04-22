const a: number[] = [1,2,3];
const b: number[] = [4,5,6];
const c: number[] = [7,8,9];
const d: number[][] = [a,b,c];

for (let i = 0; i < d.length; i++) {
    for (let j = 0; j < d[i].length; j++) {
        console.log(d[i][j]);
    }
}