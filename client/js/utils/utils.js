var createElement = function (tag, attrs) {
    var element = document.createElement(tag);
    if (attrs) {
        attrs.forEach(function (attr) {
            if (attr.attribute && attr.value) {
                element.setAttribute(attr.attribute, attr.value);
            }
            if (attr.text) {
                var text = document.createTextNode(attr.text);
                element.appendChild(text);
            }
            if(attr.event){
                element.addEventListener(attr.event.type, attr.event.func);
            }
        }, this);
    }

    return element;
}
