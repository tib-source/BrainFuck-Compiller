const syntax = document.querySelector("input[type='text']")
const output = document.querySelector("#output")
const compile = document.querySelector("input[type='submit']")

compile.addEventListener("click", event => {
    event.preventDefault()
    if (syntax.value.length > 0){
        input = prompt("provide an input - if any")
        brainfuck(syntax.value, input)
    }else{
        alert("please provide a brainfuck code")
    }
})


function brainFuck(code,input){
    input  = input.split("").map(e=> e.charCodeAt(0)).reverse()
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
                if(memory[ptr]>255){memory[ptr]=0}
                codeptr++
                // add byte wrappign behaviour 
                break
            case "-":
                memory[ptr]--
                if(memory[ptr]<0){memory[ptr]=255}
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
                memory[ptr] = input.pop()
                codeptr++
                break
        }
    } 
    output.innerText = returns.map(e=> String.fromCharCode(e)).join("")
}
