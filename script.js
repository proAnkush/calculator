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
            var output = getOutput();
            var history = getHistory();
            if(output==""&&history!=""){
                if(isNaN(history[history.length-1])){
                    history=history.substr(0,history.length-1);

                }
            }
            if(output!="" || history!=""){
                output = output==""?output:badNumber(output);
                history=history+output;
                if(this.id=="="){
                    var result=evaluateSafe(history);
                    printOutput(result);
                    printHistory("");
                }else{
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
    let num2 = "";
    let operator = "";

    for(let element of history){
        if(operator=="" && isDigit(element)){
            num1 += element;
        }
        else if(!isDigit(element)){
            operator += element;
        }
        else if(operator!="" && element!=NaN){
            num2 += element;
        }
    }
    console.log(num1 + ":num1  operator:" + operator + "  num2:" + num2 );
    if(num1 == "") return history;
    if(num2 == "") return history.substr(0, history.length-1);
    if(operator != ""){
        if(operator == "+"){
            console.log("+");
            return Number(num1) + Number(num2);
        }
        else if(operator == "-"){
            console.log("-");
            return Number(num1) - Number(num2);
        }
        else if(operator == "*"){
            console.log("*");
            return Number(num1) * Number(num2);
        }
        else if(operator == "/"){
            console.log("/");
            return Number(num1) / Number(num2);
        }
        else if(operator == "%"){
            console.log("%");
            return Number(num1) % Number(num2);
        }
    }
}
var isDigit = (function() {
    // https://stackoverflow.com/questions/8935632/check-if-character-is-number
    var re = /^\d$/;
    return function(c) {
        return re.test(c);
    }
}());