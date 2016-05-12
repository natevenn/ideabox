$(document).ready(function() {
    displayAllIdeas();
    showSearchedIdeas();
    $('.save-btn').click(function() {
        CreateIdea();
    })
    $('body').on('click', 'a.delete-idea', deleteIdea);
    $('body').on('click', 'a.thumbs-up', thumbsUpIdea);
    $('body').on('click', 'a.thumbs-down', thumbsDownIdea);
    $('body').on('click', '.ideas .body', editBody);
    $('body').on('click', '.ideas .title', editTitle);
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
             + '</h4><h5 class=body contentEditable=true>'
             + idea.body
             + '</h5><h3 class=quality id='
             + idea.quality
             + '>'
             + ideaQuality[idea.quality]
             + '</h3><a class=delete-idea href=#>Delete</a>'
             + '<a class=thumbs-up href=#><img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJrRjKqgwEwEekl1BXhAOsbNqcrJ8TeWlne71cdIIEqQ9lcEmvA alt=thumbs up id=up-vote style=width:20px;heigth:20px;></a>'
             + '<a class=thumbs-down href=#><img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkv6tro4-yZk3dKpYCoLLnnIKUMbnMI7IaVf2n0GHrf9uCksul alt=thumbs down id=down-vote style=width:20px;heigth:20px;></a></div>'
            );
}
