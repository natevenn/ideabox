function thumbsUpIdea(event) {
    event.preventDefault();
    var vote       = $(this).attr('class')
    var ideaId     = $(this).parent('.ideas').attr('id');
    var oldQuality = $(this).siblings('.quality').attr('id');
    var newQuality = changeQuality(oldQuality, vote);
    var params     = { idea: { quality: newQuality } }
    updateIdeasTable(ideaId, params)
    renderQuality(ideaId, newQuality);
}

function thumbsDownIdea(event) {
    event.preventDefault();
    var vote       = $(this).attr('class')
    var ideaId     = $(this).parent('.ideas').attr('id');
    var oldQuality = $(this).siblings('.quality').attr('id');
    var newQuality = changeQuality(oldQuality, vote);
    var params     = { idea: { quality: newQuality } }
    updateIdeasTable(ideaId, params)
    renderQuality(ideaId, newQuality);
}

function changeQuality(oldQuality, vote) {
    if(vote === "thumbs-up") {
        return (oldQuality < 2) ?  parseInt(oldQuality) + 1 : oldQuality
    } else {
        return (oldQuality > 0) ? parseInt(oldQuality) - 1 : oldQuality
    }
}

function renderQuality(ideaId, newQuality) {
  $('#' + ideaId).children('.quality').attr('id', newQuality).text(ideaQuality[newQuality])
}
