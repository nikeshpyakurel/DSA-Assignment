function appendToDisplay(value) {
    const display = document.getElementById("display");
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById("display");
    display.value = '';
    document.getElementById("result").innerText = '';
}

function calculate() {
    const expression = document.getElementById("display").value;
    const resultDiv = document.getElementById("result");

    try {
        const result = evaluateExpression(expression);
        resultDiv.innerText = `Result: ${result}`;
    } catch (error) {
        resultDiv.innerText = `Error: ${error.message}`;
    }
}

function evaluateExpression(s) {
    const tokens = tokenize(s);
    const { result, index } = parseExpression(tokens, 0);
    if (index !== tokens.length) {
        throw new Error("Invalid expression");
    }
    return result;
}

function tokenize(s) {
    const tokens = [];
    let num = '';
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char >= '0' && char <= '9') {
            num += char;
        } else {
            if (num) {
                tokens.push(parseInt(num));
                num = '';
            }
            if (char !== ' ') {
                tokens.push(char);
            }
        }
    }
    if (num) {
        tokens.push(parseInt(num));
    }
    return tokens;
}

function parseExpression(tokens, index) {
    let { result, index: newIndex } = parseTerm(tokens, index);
    while (newIndex < tokens.length) {
        const op = tokens[newIndex];
        if (op !== '+' && op !== '-') break;
        newIndex++;
        const { result: nextTerm, index: termIndex } = parseTerm(tokens, newIndex);
        if (op === '+') {
            result += nextTerm;
        } else {
            result -= nextTerm;
        }
        newIndex = termIndex;
    }
    return { result, index: newIndex };
}

function parseTerm(tokens, index) {
    let { result, index: newIndex } = parseFactor(tokens, index);
    while (newIndex < tokens.length) {
        const op = tokens[newIndex];
        if (op !== '*' && op !== '/' && op !== '%') break;
        newIndex++;
        const { result: nextFactor, index: factorIndex } = parseFactor(tokens, newIndex);
        if (op === '*') {
            result *= nextFactor;
        } else if (op === '/') {
            if (nextFactor === 0) {
                throw new Error("Division by zero");
            }
            result /= nextFactor;
        } else if (op === '%') {
            result %= nextFactor;
        }
        newIndex = factorIndex;
    }
    return { result, index: newIndex };
}

function parseFactor(tokens, index) {
    const openBrackets = ['(', '[', '{'];
    const closeBrackets = [')', ']', '}'];
    
    if (openBrackets.includes(tokens[index])) {
        const matchingCloseBracket = closeBrackets[openBrackets.indexOf(tokens[index])];
        const { result, index: newIndex } = parseExpression(tokens, index + 1);
        if (tokens[newIndex] !== matchingCloseBracket) {
            throw new Error("Mismatched brackets");
        }
        return { result, index: newIndex + 1 };
    }
    return { result: tokens[index], index: index + 1 };
}
