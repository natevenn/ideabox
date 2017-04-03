function editText(){
    thisElement = $(this)
    thisElement.keypress(function(event) {
        if(event.keyCode === 13) {
            event.preventDefault()
            var classAttr = thisElement.attr('class')
            var newText = thisElement.text()
            var ideaId   = thisElement.parents().attr('id')
            var params = setParams(classAttr, newText)
            if(classAttr === 'body') {
                renderEditedBody(thisElement, newText)
            }
            toggleContentEditableFalse(thisElement)
            updateIdeasTable(ideaId, params)
        }
    }).then(toggleContentEditableTrue(thisElement))
}

function setParams(classAttr, newText) {
    return (classAttr === 'title') ?
        {idea: {title: newText}} : {idea: {body: newText}}
}

function renderEditedBody(thisElement, text) {
    $(thisElement).text(truncateBody(text))
}

function toggleContentEditableFalse() {
    $(thisElement).attr('contentEditable', 'false')
}

function toggleContentEditableTrue(thisElement) {
    $(thisElement).attr('contentEditable', 'true')
}

