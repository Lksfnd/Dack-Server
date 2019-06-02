import path from 'path';

function replaceAll(text: string, search: string, replacement: string):string {
    return text.split(search).join(replacement);
}
function formatDate() {
    var date = new Date();
    var month: string|number = date.getMonth()+1;
    month = month < 10 ? '0'+month : month;
    var day: string|number = date.getDate();
    day = day < 10 ? '0'+day : day;
    /*var hours: string|number = date.getHours();
    hours = hours < 10 ? '0'+hours : hours;
    var minutes: string|number = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var seconds: string|number = date.getSeconds();
    seconds = seconds < 10 ? '0'+seconds : seconds;*/
    return date.getFullYear() + "-" + month + "-" + day/* + "_" + hours + "-" + minutes + "-" + seconds*/;
}

/**
 * test
 */
function replacePlacholders(text: string): string {

    text = replaceAll(text, "%projectroot%", replaceAll(path.dirname(require.main.filename),"\\src",""));
    text = replaceAll(text, "%logtime%", formatDate());
    return text;
};
export default replacePlacholders;
   // %projectroot%
   // %logtime%
