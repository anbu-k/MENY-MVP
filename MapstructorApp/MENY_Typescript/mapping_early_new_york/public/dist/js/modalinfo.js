"use strict";
function getInfoText(modal_header_text, modal_content_html) {
    $.ajax({
        url: 'https://encyclopedia.nahc-mapping.org/info-text-export',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        type: 'get',
        dataType: 'json',
        data: {}
    }).done(function (data) {
        if (data.length > 0) {
            for (var i_1 = 0; i_1 < data.length; i_1++) {
                if (data[i_1].id.length > 0) {
                    modal_header_text[data[i_1].id] = data[i_1].title.replace(/&amp;/g, '&');
                    modal_content_html[data[i_1].id] = data[i_1].body;
                }
            }
        }
    }).fail(function (xhr, textStatus) {
        console.warn("jQuery AJAX request  ERROR !!!");
        console.log(xhr.responseText);
        console.log(textStatus);
    });
}
