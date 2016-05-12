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
