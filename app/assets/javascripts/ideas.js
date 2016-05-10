$(document).ready(function() {

    displayAllIdeas()

    $('.save-btn').click(function() {
        CreateIdea()
    })
})

function CreateIdea(){
    var postParams = { idea: { title: $('#title').val(), body: $('#body').val(), quality: 0 } }
    $.ajax({
        url: '/api/v1/ideas.json',
        method: 'POST',
        dataType: 'json',
        data: postParams,
        success: function(idea){
            renderIdea(idea)
        }
    })
}

function displayAllIdeas(){
    var target = $('.idea-list')
    $.getJSON('/api/v1/ideas.json', function(ideas) {
        $(ideas).each(function(index, idea){
            renderIdea(idea)
        })
    })

}

var ideaQuality = { 0:'swill', 1:'plausible', 2:'ganius' }

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
            + '</h4></p>'
           )
}
