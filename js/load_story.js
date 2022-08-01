var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function insertUntrustedText(domElement, untrustedText, blockedelement) {
    var trustedText = untrustedText.replace(/\n/g, '<br>').replaceAll('	', '&emsp;&emsp;');
    // remove all blocked element from trusted text
    for (var i = 0; i < blockedelement.length; i++) {
        var regex_str = '<.*?' + blockedelement[i] + '.*?>';
        trustedText = trustedText.replace(new RegExp(regex_str, 'g'), '');
    }
    domElement.innerHTML = trustedText;
}

function get_story_content() {
    try{
    $('#overlay').fadeIn().delay(1000)
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const chapter = getUrlParameter('chapter');
    const token = localStorage.getItem('token');
    const url = 'https://newsandstory.herokuapp.com/api/v1/story';
    const form_data = new FormData();
    form_data.append('url', btoa(storyurl));
    form_data.append('token', btoa(token));
    form_data.append('author', btoa(author));
    form_data.append('chapter', btoa(chapter));
    $.ajax({
        url: url,
        type: 'POST',
        data: form_data,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.status == 'success') {
                $('#overlay').fadeOut().delay(1000)
                const is_this_author = data.is_this_author;
                if (data.story.nearest_previous_chap != null) {
                    const previous_button = document.createElement('a');
                    previous_button.className = 'btn btn-primary btn-xl me-5';
                    previous_button.innerHTML = 'Chương ' + data.story.nearest_previous_chap;
                    previous_button.href = './story.html?url=' + storyurl + '&author=' + author + '&chapter=' + data.story.nearest_previous_chap;
                    document.getElementById('moreop_div').appendChild(previous_button);
                }
                if (data.story.nearest_next_chap != null) {
                    const next_button = document.createElement('a');
                    next_button.className = 'btn btn-primary btn-xl me-5';
                    next_button.innerHTML = 'Chương ' + data.story.nearest_next_chap;
                    next_button.href = './story.html?url=' + storyurl + '&author=' + author + '&chapter=' + data.story.nearest_next_chap;
                    document.getElementById('moreop_div').appendChild(next_button);
                }
                if (is_this_author == true) {
                    const edit_button = document.createElement('a');
                    edit_button.className = 'btn btn-primary btn-xl me-5';
                    edit_button.innerHTML = 'Edit câu truyện';
                    edit_button.href = './edit.html?url=' + storyurl + '&author=' + author + '&chapter=' + chapter;
                    document.getElementById('moreop_div').appendChild(edit_button);
                }
                document.title = data.story.storyname;
                const meta_description = document.createElement('meta');
                meta_description.name = 'description';
                meta_description.content = data.story.storydescription;
                document.head.appendChild(meta_description);
                const meta_image = document.createElement('meta');
                meta_image.name = 'og:image';
                meta_image.content = data.story.storyimagelink;
                document.head.appendChild(meta_image);
                const meta_authors = document.createElement('meta');
                meta_authors.name = 'author';
                meta_authors.content = data.story.storyauthor;
                document.head.appendChild(meta_authors);
                document.getElementById('story_title').textContent = data.story.storyname;
                document.getElementById('story_des').textContent = data.story.storydescription;
                document.getElementById('story_des_2').textContent = data.story.storyname + ' - Chapter ' + data.story.storychapter;
                document.getElementById('chapter_num').textContent = "CHAPTER " + data.story.storychapter;
                author_em = document.createElement('em');
                author_em.textContent = 'Tác giả: ' + data.story.storyauthor;
                document.getElementById('author_name').appendChild(author_em);
                //const content = data.story.storycontent.replaceAll('	', '&emsp;&emsp;').replace(/\n/g, '<br>');
                const content = insertUntrustedText(document.getElementById('story_content'), data.story.storycontent, ['script', 'button', 'iframe']);
            }
            else {
                alert(data.message);
                window.location.href = '/';
            }
    }
    });
    }
    catch (err) {
        alert(err);
    }
}
get_story_content();