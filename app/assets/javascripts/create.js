function CreateIdea(){
    var $form = $('#form');
    var postParams = { idea: { title: $form.find('#title').val(), body: $form.find('#body').val(), quality: 0 } }
    $.ajax({
        url: '/api/v1/ideas.json',
        method: 'POST',
        dataType: 'json',
        data: postParams,
        success: function(idea){
            renderIdea(idea);
            clearForm($form);
        }
    });
}

function clearForm($form){
    $form.find('#title').val('');
    $form.find('#body').val('');
}
