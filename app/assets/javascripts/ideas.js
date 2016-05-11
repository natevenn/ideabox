$(document).ready(function() {

    displayAllIdeas()

    $('.save-btn').click(function() {
        CreateIdea();
        clearForm();
    })

    $('body').on('click', 'a.delete-idea', deleteIdea);
    $('body').on('click', 'a.thumbs-up', thumbsUpIdea);
    $('body').on('click', 'a.thumbs-down', thumbsDownIdea);
    $('body').on('click', '.ideas .body', editBody);
    $('body').on('click', '.ideas .title', editTitle);

});

function editTitle(){
    thisElement = $(this)
    $(this).keydown(function(event) {
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


function thumbsUpIdea(event) {
    event.preventDefault();
   var ideaId = $(this).parent('.ideas').attr('id');
   var oldQuality = $(this).siblings('.quality').attr('id');
   var newQuality = increaseQuality(oldQuality);
   var params = { idea: { quality: newQuality } }
   updateIdeasTable(ideaId, params)
   renderQuality(ideaId, newQuality);
}

function thumbsDownIdea(event) {
    event.preventDefault();
   var ideaId = $(this).parent('.ideas').attr('id');
   var oldQuality = $(this).siblings('.quality').attr('id');
   var newQuality = decreaseQuality(oldQuality);
   var params = { idea: { quality: newQuality } }
   updateIdeasTable(ideaId, newQuality, params)
   renderQuality(ideaId, newQuality);
}

function updateIdeasTable(ideaId, params){
   $.ajax({
       url: '/api/v1/ideas/' + ideaId + '.json',
       method: 'PUT',
       dataType: 'json',
       data: params,
       success: function() {
           console.log('success')
       }
   });
}

function decreaseQuality(oldQuality) {
    if(oldQuality > 0){
        return parseInt(oldQuality) - 1
    } else {
        return oldQuality
    }
}

function increaseQuality(oldQuality) {
    if(oldQuality < 3){
        return parseInt(oldQuality) + 1
    } else {
        return oldQuality
    }
}

function CreateIdea(){
    var postParams = { idea: { title: $('#title').val(), body: $('#body').val(), quality: 0 } }
    $.ajax({
        url: '/api/v1/ideas.json',
        method: 'POST',
        dataType: 'json',
        data: postParams,
        success: function(idea){
            renderIdea(idea);
        }
    });
}

function displayAllIdeas(){
    var target = $('.idea-list');
    $.getJSON('/api/v1/ideas.json', function(ideas) {
        var sorted = $(ideas).sort(function(a, b){
        return a.id - b.id
        }).each(function(index, idea) {
            renderIdea(idea);
        })
    });
}

var ideaQuality = { 0:'swill', 1:'plausible', 2:'genius' }

function renderIdea(idea){
    $('.idea-list')
    .prepend('<div class=ideas id='
            + idea.id
            + '><h4 class=title contentEditable=true>'
            + idea.title
            + '</h4><h4 class=body contentEditable=true>'
            + idea.body
            + '</h4><h4 class=quality id='
            + idea.quality
            + '>'
            + ideaQuality[idea.quality]
            + '</h4><a class=delete-idea href=#>Delete</a>'
            + '<a class=thumbs-up href=#><img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJrRjKqgwEwEekl1BXhAOsbNqcrJ8TeWlne71cdIIEqQ9lcEmvA alt=thumbs up id=up-vote style=width:20px;heigth:20px;></a>'
            + '<a class=thumbs-down href=#><img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkv6tro4-yZk3dKpYCoLLnnIKUMbnMI7IaVf2n0GHrf9uCksul alt=thumbs down id=down-vote style=width:20px;heigth:20px;></a></div>'
           );
}

function renderQuality(ideaId, newQuality) {
    $('#' + ideaId).children('.quality').attr('id', newQuality).text(ideaQuality[newQuality])
}

function deleteIdea(event) {
    event.preventDefault();
    var ideaId = $(this).parent('.ideas').attr('id');
    $.ajax({
        url: '/api/v1/ideas/' + ideaId + '.json',
        method: 'DELETE',
        success: function(){
            $('#' + ideaId).remove();
        }
    });
}

function clearForm(){
    $('#title').val('');
    $('#body').val('');
}
