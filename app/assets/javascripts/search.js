function showSearchedIdeas() {
    $('#search').keyup(function() {
        var thisVal = $(this).val().toLowerCase();
        filterSearch(thisVal)
    });
}

function filterSearch(thisVal) {
    $('.ideas').each(function() {
        var text = $(this).text().toLowerCase();
        (text.indexOf(thisVal) == 0) ? $(this).show() : $(this).hide();
    });
}

