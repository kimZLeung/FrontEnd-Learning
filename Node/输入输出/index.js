var readline=require("readline")
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt: '\nkimz > '
})

r1.prompt()

r1.on('line',function(line){
    console.log(line)
    r1.prompt()
})