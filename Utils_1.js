/**
 * Check if "obj" is a "{}" or "Object.create(null)"
 * @param {Object} obj 
 * @returns 
 */
function isPlainObject(obj){

    if(
        //Basic check
        //obj !== null &&  //No es necesario
        //Separate from primitives
        typeof obj === 'object' &&
        //Separate build-in like Math
        Object.prototype.toString.call(obj) === '[object Object]'
        ){
        let props = Object.getPrototypeOf(obj);
        //obj == Object.create(null) || Separate instances (Array, DOM, ...)
        return props === null || props.constructor === Object;
    }

    return false;
}


/**
 * Check if "value" is "Something"
 * @param {Object} value 
 * @param {String|Object} type 
 * @returns 
 */
function is(value, type){
    
    switch(type){
        case 'Empty': 
            return (value === null || !(Object.keys(value) || value).length);
        case 'Blank': 
            return (value + "").trim() === "";
        case 'NaN': 
            return Number.isNaN(value);
        case 'Even': 
            return value % 2 === 0;
        case 'Odd': 
            return value % 2 === 1;        
        case 'PowerOfTwo': 
            return !!value && (value & (value - 1)) == 0;
        case 'Prime': 
            for(let i = 2; i <= Math.floor(Math.sqrt(value)); i++){ 
                if (value % i === 0) 
                return false; 
            } 
            return value >= 2;
        case 'Integer':
            return value % 1 === 0;
        case 'Float':
            return !(value % 1 === 0);
        case 'Primitive':
            return Object(value) !== value;
        case 'HTMLElement':
        case HTMLElement:
            return value instanceof HTMLElement;
        case 'Image':
        case Image:
            type = HTMLImageElement; 
            break;
        default: 
            type = window[type] || type;
    }

    return ![, null].includes(value) && value.constructor === type;
}


/**
 * Apply a effect over value
 * @param {Object} value 
 * @param {String} effect 
 * @returns 
 */
function to(value, effect){

    switch(effect){
        case "SnakeCase":
        case "KebabCase":
        case "TitleCase":
        case "CamelCase":
            let s = (value+"").match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
            switch (effect) {
                case "SnakeCase": 
                    return s.map(function(x){ x.toLowerCase(); }).join('_');
                case "KebabCase":
                    return s.map(function(x){ x.toLowerCase(); }).join('-');
                case "TitleCase":
                    return s.map(function(x){ x.charAt(0).toUpperCase() + x.slice(1); }).join(' ');
                case "CamelCase":
                    s = s.map(function(x){ x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase(); }).join(''); 
                    return s.slice(0, 1).toLowerCase() + s.slice(1);                    
            }
        case "ReverseString":
            return [...(value+"")].reverse().join('');
        case "SortCharacters":
            return [...(value+"")].sort(function(a, b){ a.localeCompare(b); }).join('');
        case "String":
            if(isPlainObject(value))
                return JSON.stringify(value);

            return value + "";
        case "Json":
            return JSON.parse(value+"");
        case "Integer":
            return parseInt(value+"");
        case "Float":
            return parseFloat(value+"");
        case "OrdinalSuffix":
            const int = parseInt(value+"");
            const digits = [int % 10, int % 100];
            const ordinals = ['st', 'nd', 'rd', 'th'];
            const oPattern = [1, 2, 3, 4];
            const tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];

            return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
    }
    return (value+"")["to"+effect](); //toLowercase, toUppercase, etc
}


/**
 * Check if String is Empty or Blank
 * @param {String} txt 
 * @returns 
 */
function isEmptyorBlankString(txt){

    if(!txt || txt.constructor !== String || txt.trim() === '')
        return true;

    return false;
}


/**
 * Generate a function with debounced (useful for example to "resize" event)
 * @param {Function} fn Mandatory
 * @param {Number} delay Optional
 * @returns 
 */
function debounced(fn, delay){
    delay = delay || 150;
    let fire = null;
    
    return function(){
        if(fire) 
            clearTimeout(fire);

        const ctx = this; 
        const args = arguments;
        fire = setTimeout(function() { 
            fn.apply(ctx, args); 
        }, delay);
    }
}


/**
 * Generate a function with throttled (useful for example to "scroll" event)
 * @param {Function} fn Mandatory
 * @param {Number} delay Optional
 * @returns 
 */
function throttled(fn, delay) {
    delay = delay || 50;
    let fire = null; 
    let last = null;
    
    return function() {
        const ctx = this; 
        const args = arguments;
        
        if(!last){ 
            fn.apply(ctx, args); 
            last = Date.now(); 
        } 
        else {
            clearTimeout(fire);
            
            fire = setTimeout(function() { 
                if((Date.now() - last) >= delay){ 
                    fn.apply(ctx, args); 
                    last = Date.now(); 
                } 
            }, delay - (Date.now() - last));
        }
    }
}


/**
 * Convert a Date object to valid String useful for setting a input element with type="date"
 * @param {Date} date 
 * @param {Boolean} hours 
 * @param {Boolean} seconds 
 */
function Date2InputValue(date, hours, seconds){

    if(!date || date.constructor !== Date)
        return null;

    function fnt(n){
        if(n < 10) 
            n = "0" + n;
        return n+"";
    }

    let  yyyy = date.getFullYear(),
    MM = fnt( date.getMonth() + 1 ),
    dd = fnt( date.getDate() ),        

    hh = fnt( date.getHours() ),
    mm = fnt( date.getMinutes() ),
    ss = fnt( date.getSeconds() ),

    txt = yyyy + "-" + MM + "-" + dd;

    if(hours)
        txt += "T" + hh + ":" + mm;
    if(seconds)
        txt += ":" + ss;
    
    return txt;
}


/**
 * Get the weight of the String in base64, for example it is useful to know how much an image weighs
 * @param {String} base64 
 * @returns 
 */
function base64Weight(base64){

    //if(base64.indexOf("data:image") >= 0 )
    if(base64.indexOf("data:") >= 0 )
    base64 = base64.split(",")[1];

    let padding = base64.substring(base64[base64.length - 2], 2).split("=").length - 1,  //"ASAKSNACACA=S"   => "=S"  => ["", "S"] => relleno = 1 
    //const padding = base64.substring(base64[base64.length - 2], 2).match(/=/g).length;  //"ASAKSNACACA=S"   => "=S"  => ["="] => relleno = 1   ¡¡MAS LENTO!!
    //padding = 0 || 1 || 2;
    weight = (3* base64.length/4) - padding,  // 3 * n/4 - padding
    KBytes = weight/1024,
    MBytes = (0 | KBytes ) / 1024;

    return {
        Bytes: weight,
        KBytes: KBytes,
        MBytes: MBytes
    }
}


/**
 * Get extension from string (try "name.xls.doc.js" result "js")
 * @param {String} fileName 
 * @returns 
 */
function getExtension(fileName){
    let regex = /(?:\.([^.]+))?$/;
    return regex.exec(fileName+"")[1];
}


/**
 * Get parameters from url (try "link?asd=123&qwert=asd" result { asd: "123", qwert:"asd" })
 * @param {String} url 
 * @returns 
 */
function getUrlParameters(url){
    let obj = {};
    (url).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) { obj[key] = value; });
    return obj;
}


/**
 * Convert header string from XHR to utf-8 string
 * @param {XMLHttpRequest} xhr 
 * @param {String} headerName 
 * @returns 
 */
function decodeHeaderXHR(xhr, headerName){

    if(!xhr || xhr.constructor !== XMLHttpRequest)
        return null;

    let head = xhr.getResponseHeader(headerName);
    if(!head) 
        return null;
            
    return decodeURIComponent(escape(unescape(head.replace(/\+/g, " "))))
}


/**
 * Convert a table element to xls (or similar) file.
 * @param {HTMLTableElement|String} table Mandatory
 * @param {String} filename Optional 
 */
let table2XLS = (function(window){

    //"nuevo" template, para que acepte tildes
    let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    /*let template =
    `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        <head>
            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head>
        <body>
            <table>{table}</table>
        </body>
    </html>
    `,*/
    uri = 'data:application/vnd.ms-excel;base64,',
    
    base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    },

    format = function(s, c) {
        return s.replace(/{(\w+)}/g, (m, p) => c[p]);
    };

    return function(table, filename) {
        if(!(table instanceof HTMLTableElement)){
            //Si "table" es un selector
            table = document.querySelector(table);
            if(!table) {
                console.error('table is not a HTMLTableElement');
                return;
            }
        }

        filename = filename?  filename+".xls":'Table.xls';

        let ctx = { 
            worksheet: 'Worksheet', 
            table: table.innerHTML 
        }

        if(window.navigator.msSaveOrOpenBlob){  //Solucion para ms EDGE Legacy
            let dataType = 'text/csv',
            blob = new Blob(['ufeff', format(template, ctx)], { type: dataType });
            window.navigator.msSaveOrOpenBlob( blob, filename); 
            return;
        }

        let a = document.createElement("a");
        a.href = uri + base64(format(template, ctx));
        a.download = filename;
        a.click();
    }

})(window);


/**
 * Throw exceptions with line number
 * from http://www.jomendez.com/2015/02/25/throw-exceptions-line-number-javascript/
 * @param {String} txt 
 * @param {String} act 
 * @returns 
 */
function throwError(txt, act){
    let error;
    try { throw new Error(); }
    catch(e){ error = e; }
    if(!error) return;

    error = error.stack.split('\n');
    //removing the line that we force to generate the error (let error = new Error();) from the message
    //aux.splice(0, 2);
    error.splice(0, 3);
    error = error.join('\n');
    if(act)
        error = '"' + txt + '" ' + act + '\n' + error;
    else
        error = txt + '\n' + error;
    
    throw error;
}


/**
 * Check if css selector has a correct syntax
 * @param {String} selector 
 * @returns 
 */
function _checkCSSSelector(selector){
    try { document.createDocumentFragment().querySelector(selector) } catch(e) { return false }
    return true
}


/**
 * Similar to Object.assing, but more powerful
 * @param {Object} target 
 * @param {Object} source 
 * @returns 
 */
function powerful_object_assing(target, source){
    Object.getOwnPropertyNames(source).forEach(function(name){
        Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    });
    return target;
}


/**
 * Freeze the browser
 * @param {Number} time in milliseconds
 */
function FreezeBrowser(time){
    let force_wait = Date.now() + time;
    while(Date.now() < force_wait){}
}