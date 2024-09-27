/**
 * Fetches information text from an external API and updates the modal content
 * 
 * @param {object} modal_header_text - an object where the modal header text will be stored by the data's id
 * @param {object} modal_content_html - an object where the modal body content will be stored, keyed by the data's id
 */
function getInfoText(modal_header_text, modal_content_html) {
	// AJAX GET request to retireve information text data from the server
	$.ajax({
		url: 'https://encyclopedia.nahc-mapping.org/info-text-export', // API endpoint for fetching the info text
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // setting content type for the request
		type: 'get',
		dataType: 'json', // expect a JSON response from the server
		data: {}
	}).done(function (data) {
		if (data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].id.length > 0) {
					modal_header_text[data[i].id] = data[i].title.replace(/&amp;/g, '&');
					modal_content_html[data[i].id] = data[i].body;
				}
			}
		}
	})
	// Handle the failure case where the AJAX request fails
	.fail(function (xhr, textStatus) {
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
		console.log(textStatus);
	});
}