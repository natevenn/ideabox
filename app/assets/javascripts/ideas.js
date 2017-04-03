$(document).ready(function() {
    var $body = $('body');

    fetchAllIdeas();

    showSearchedIdeas();

    $('.save-btn').click(function() {
        CreateIdea();
    })

    $body.on('click', 'a.delete-idea', deleteIdea);
    $body.on('click', 'a.thumbs-up', thumbsUpIdea);
    $body.on('click', 'a.thumbs-down', thumbsDownIdea);
    $body.on('click', '.ideas .body', editText);
    $body.on('click', '.ideas .title', editText);
});

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

function fetchAllIdeas(){
    $.getJSON('/api/v1/ideas.json', function(ideas) {
        sortIdeas(ideas)
    });
}

function sortIdeas(ideas) {
    $(ideas).sort(function(a, b){
        return a.id - b.id
    }).each(function(index, idea) {
        renderIdea(idea);
    })
}

var ideaQuality = { 0:'swill', 1:'plausible', 2:'genius' }

function renderIdea(idea){
    $('.idea-list')
    .prepend('<div class=ideas id='
             + idea.id
             + '><h4 class=title contentEditable=true>'
             + idea.title
             + '</h4><h5 class=body contentEditable=true>'
             + truncateBody(idea.body)
             + '</h5><h3 class=quality id='
             + idea.quality
             + '>'
             + ideaQuality[idea.quality]
             + '</h3><a class=delete-idea href=#>Delete</a>'
             + '<a class=thumbs-up href=#><img src=assets/thumbs-up.png alt=thumbs up id=up-vote style=width:20px;heigth:20px;></a>'
             + '<a class=thumbs-down href=#><img src=assets/thumbs-down.png alt=thumbs down id=down-vote style=width:20px;heigth:20px;></a></div>'
            );
}

function truncateBody(body) {
    var length = 100
    var bodyLength = body.lastIndexOf(' ', length);
    var truncatedBody = body.length > length ? body.substring(0, bodyLength) + '...' : body
    return truncatedBody
}
