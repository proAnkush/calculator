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
    if(num=="-"){
        return ""; 
    }
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
            // operators +-*/%

            var output = getOutput();
            var history = getHistory();
            if(output==""&&history!=""){
                console.log("first");
                if(isNaN(history[history.length-1])){
                    history=history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!=""){
                console.log("second");

                output = output==""?output:badNumber(output);
                history=history+output;
                if(this.id=="="){
                    console.log("third");
                    var result=evaluateSafe(history);
                    printOutput(result);
                    printHistory("");
                }else{
                    console.log("fourth");
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
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
function evaluateSafe(history) {
    let num1 = "";
    let numbers = [];
    let operators = [];

    for(let element of history){
        if(isDigit(element)){
            num1 += element;
        }else{
            numbers.push(num1);
            num1="";
            operators.push(element);
        }
    }
    numbers.push(num1);
    console.log("Total numbers/operators: " + numbers.length + " / " +  operators.length);
    for(let operator of operators){
        let num1 = numbers.pop();
        let num2 = numbers.pop();
        let result = "";
        console.log("num1: " + num1 + " operator:" + operator + "  num2:" + num2 );
        if(operator != ""){
            if(operator == "+"){
                console.log("+");
                result = Number(num1) + Number(num2);
            }
            else if(operator == "-"){
                console.log("-");
                result = Number(num1) - Number(num2);
            }
            else if(operator == "*"){
                console.log("*");
                result = Number(num1) * Number(num2);
            }
            else if(operator == "/"){
                console.log("/");
                result = Number(num1) / Number(num2);
            }
            else if(operator == "%"){
                console.log("%");
                result = Number(num1) % Number(num2);
            }
            numbers.push(result);
        }
    }
    return numbers[0];
}
var isDigit = (function() {
    // https://stackoverflow.com/questions/8935632/check-if-character-is-number
    var re = /^\d$/;
    return function(c) {
        return re.test(c);
    }
}());