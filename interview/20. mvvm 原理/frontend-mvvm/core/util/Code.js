
export function generateAnnoCode(obj) {
    let code = "";
    for (let temp in obj) {
        code += "let " + temp + "=" + JSON.stringify(obj[temp]) + ";";
    }
    return code;
}

export function isTrue(expression, env) {
    let bool = false;
    let code = env;
    code += "if(" + expression + ") {bool = true;}";
    eval(code);
    return bool;
}