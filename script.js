var websiteTitle = $('#website-title');
var websiteUrl = $('#website-url');

function createCard(title, url, status) {
    var template = $('#template').clone(true, true);
    template.find('h3').text(title);
    template.find('.url').children().attr('href', url);
    template.find('.url').children().text(url);
    template.removeClass('hidden');
    template.addClass(status)
    $('aside').append(template);
    readCount()
};

Object.keys(localStorage).forEach(function(key) {
    var link = JSON.parse(localStorage.getItem(key));
    createCard(link.name, link.url, link.status);
});

$('#enter').on('click', function() {
    var title = websiteTitle.val();
    var url = websiteUrl.val();
    localStorage.setItem(title, JSON.stringify({ name: title, url: url, status: 'un-read' }));
    createCard(title, url);
    readCount();
})

$('.delete-button').on('click', function() {
    $(this).parent().parent().addClass('hidden');
    var key = $(this).parent().siblings('h3').text()
    localStorage.removeItem(key);
    readCount();
});

$('.read-button').on('click', function() {
    var key = $(this).parent().siblings('h3').text()
    var url = $(this).parent().siblings('.url').children().text();
    localStorage.setItem(key, JSON.stringify({ name: key, url: url, status: 'read' }))
    $(this).parent().parent().toggleClass('read');
    readCount();
});

$('input').on('keyup', function() {
    if (websiteTitle.val() === '' || websiteUrl.val() === '') {
        $('#enter').prop('disabled', true)
    } else {
        $('#enter').prop('disabled', false);
    }
})


function readCount() {
    var total = $('.bookmark').length - $('.hidden').length;
    var read = $('.read').length - $('.hidden.read').length;
    $('.count').text(read + ' of ' + total + " Bookmarks Read")
}