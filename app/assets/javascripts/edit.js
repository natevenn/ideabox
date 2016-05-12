function editTitle(){
    thisElement = $(this)
    $(this).keypress(function(event) {
        if(event.keyCode === 13) {
            event.preventDefault()
            var thisElement = $(this)
            toggleContentEditableFalse(thisElement)
            var newTitle = $(this).text()
            var ideaId   = $(this).parents().attr('id')
            var params   = { idea: { title: newTitle } }
            updateIdeasTable(ideaId, params)
        }
    }).then(toggleContentEditableTrue(thisElement))
}

function editBody() {
    thisElement = $(this)
    $(this).keypress(function(event) {
        if(event.keyCode == 13) {
            event.preventDefault()
            var thisElement = $(this)
            toggleContentEditableFalse(thisElement)
            var newBody = $(this).text()
            var ideaId   = $(this).parents().attr('id')
            var params   = { idea: { body: newBody } }
            updateIdeasTable(ideaId, params)
        }
    }).then(toggleContentEditableTrue(thisElement))
}

function toggleContentEditableFalse() {
    $(thisElement).attr('contentEditable', 'false')
}

function toggleContentEditableTrue(thisElement) {
    $(thisElement).attr('contentEditable', 'true')
}

