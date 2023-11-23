
//break、else、new、var、 case、  finally 、 return、 void 、 catch  、for  、switch 、 while 、 continue、  function  、this 、 with 、default 、 if 、 throw 、 delete 、 in 、  try 、do 、 instranceof、  typeof
let keyWords = ["if", "else", "var", "for", "while", "new", "continue", "break", "this", "default", "function", "with", "throw", "delete", "in", "try", "do", "instanceof", "typeof", "switch", "switch", "case", "return", "void", "finally"];

export function isKeyWords(text) {
    if (keyWords.indexOf(text) > -1) {
        return true;
    } else {
        return false;
    }
}