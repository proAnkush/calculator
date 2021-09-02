function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText = num;
    }else{
        document.getElementById("output-value").innerText = goodNumber(num);
    }
}
function goodNumber(num){
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
function badNumber(num){
    return Number(num.replace(/,/,''));
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function(){
        // operator click event
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var out = badNumber(getOutput()).toString();
            if(out){
                out = out.substr(0, out.length-1);
                printOutput(out);
            }
        }
        else{
            var output = getOutput();
            var history = getHistory();
            if(output!=""){
                output = badNumber(output);
                history = history+output;
            }
        }
    });
}
var number = document.getElementsByClassName("number");
for(var i=0; i < number.length; i++){
    number[i].addEventListener('click', function(){
        // number click event
        var output = badNumber(getOutput());
        if(output!=NaN){
            output=output+this.id;
            printOutput(output);
        }
    });
}