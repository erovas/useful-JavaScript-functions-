// Polyfill for isConnected - Modified from https://gist.github.com/eligrey/f109a6d0bf4efe3461201c3d7b745e8f
if (!('isConnected' in Node.prototype)) {
    Object.defineProperty(Node.prototype, 'isConnected', {
        get: function() {
            return !this.ownerDocument || !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
        }
    });
}