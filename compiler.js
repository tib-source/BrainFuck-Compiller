const syntax = document.querySelector("input[type='text']")
const output = document.querySelector("#output")
const compile = document.querySelector("input[type='submit']")

compile.addEventListener("click", event => {
    event.preventDefault()
    if (syntax.value.length > 0){
        brainfuck(syntax.value)
    }else{
        alert("please provide a brainfuck code")
    }
})


function brainfuck(code){
    code = code.split("")
    let memory = new Array(1000).fill(0)
    let returns = []
    let ptr = 0
    let codeptr = 0
    let stack = []
    let jump = Array(code.length).fill(NaN)
    code.forEach((e, i) => {
        if(e=="["){
            stack.push(i)
        }else if(e == "]"){
            jump[i] = stack.pop()
            jump[jump[i]] = i
        }
    });
    while(codeptr < code.length){
        let curr = code[codeptr]
        if(typeof curr == undefined){
            run=false
            break
        }
        switch(curr){
            case "<":
                ptr--
                codeptr++
                break
            case ">":
                ptr++
                codeptr++
                break
            case "+":
                memory[ptr]++
                codeptr++
                // add byte wrappign behaviour 
                break
            case "-":
                memory[ptr]--
                codeptr++
                break
            case ".":
                returns.push(memory[ptr])
                codeptr++
                break
            case "[":
                if (memory[ptr] > 0){
                    codeptr++
                }else{
                    codeptr = jump[codeptr]
                }
                break
            case "]":
                if (memory[ptr]> 0){
                    codeptr = jump[codeptr]
                }else{
                  codeptr++
                }
                break
            case ",":
                memory[ptr] = prompt("input")
                codeptr++
                break
        }
    } 
    
    output.innerText = returns.map(e=> String.fromCharCode(e)).join("")
}
