$(document).ready(function() {

    displayAllIdeas()

    $('.save-btn').click(function() {
        CreateIdea();
        clearForm();
    })

    $('body').on('click', 'a.delete-idea', deleteIdea);
});

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
        $(ideas).sort(function(a, b){
            a.id - b.id
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
            + '><p><h4>'
            + idea.title
            + '</h4></p><p><h4>'
            + idea.body
            + '</h4></p><p><h4>'
            + ideaQuality[idea.quality]
            + '</h4></p><a class=delete-idea href=#>Delete</a></div>'
           );
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
