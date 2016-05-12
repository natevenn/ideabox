function CreateIdea(){
    var postParams = { idea: { title: $('#title').val(), body: $('#body').val(), quality: 0 } }
    $.ajax({
        url: '/api/v1/ideas.json',
        method: 'POST',
        dataType: 'json',
        data: postParams,
        success: function(idea){
            renderIdea(idea);
            clearForm();
        }
    });
}

function clearForm(){
    $('#title').val('');
    $('#body').val('');
}
