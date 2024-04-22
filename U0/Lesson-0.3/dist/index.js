const yousif = document.getElementById("yousif");
const btn = document.getElementById("btn");
// btn.addEventListener('click', ()=> increase());
let count = 0;
const input = document.getElementById("input");
btn.addEventListener('click', () => grab());
function increase() {
    count++;
    yousif.innerText = count.toString();
}
function grab() {
    console.log(input.value);
}
//# sourceMappingURL=index.js.map