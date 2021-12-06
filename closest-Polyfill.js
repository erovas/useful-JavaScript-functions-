//Polyfill for Element.closest(), you can find it in https://developer.mozilla.org/es/docs/Web/API/Element/closest
if (!Element.prototype.closest) {

    if (!Element.prototype.matches) 
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (el.matches(s)) 
                return el;
            
            el = el.parentElement || el.parentNode;
        } 
        while (el !== null && el.nodeType === 1);

        return null;
    };
}