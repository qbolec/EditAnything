EditAnything
============

Simplistic JS which helps make content of your website editable


Installation
------------

Just download the files. The JS uses Mootools.


Usage
-----
Add .editable class to elements of DOM which you want to be editable.
Add data-update-url to them, which should point to an endpoint which accepts POSTs with 
new value and on success responds with a JSON structure containing the new value,
and the new HTML content for the DOM element.
By default the value is the innerText of the text node.
To override this, use data-value attribute.
For example if you want the user to provide Markdown markup, but display HTML, you should
put Markdown in data-value, and HTML inside the tag, and make sure that the server responds with
    {value:Markdown, html:HTML}
