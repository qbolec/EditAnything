EditAnything
============

A simplistic JS library which helps make content of your website editable


Installation
------------

Just download the files. The JS file requires Mootools.


Usage
-----
Add `.editable` class to elements of DOM which you want to be editable.
Add `data-update-url` to them, which should point to an endpoint which accepts POSTs with 
new value and on success responds with a JSON structure containing the new value,
and the new HTML content for the DOM element.


More detailed explanation
-------------------------

The library finds all .editable elements in the DOM and shows an textarea above them when the mouse is over.
By default the `value` is the `innerText` of the text node.
To override this, use `data-value` attribute.
For example if you want the user to provide Markdown markup, but display HTML, you should
put Markdown in data-value, and HTML inside the tag, and make sure that the server responds with
  
     {value:Markdown, html:HTML}

For example your web-page could containt a following element:

     <div class=".editable" data-value="_cool_" data-update-url="/save/path?csrf=deadbeef"><i>cool</i></div>
     
which when user clicks on it will present a textarea with a word `_cool_` in it, and if the user changes it to `_cooler_` 
then a POST request will be sent to `/save/path?csrf=deadbeef` with as a form with a `data` field containing a JSONed `value`, 
in this case `"_cooler_"`. The server should save that and respond with something like:

     {value:"_cooler_", html:"<i>cooler<\/i>"}
     
the library than will plug the `<i>cooler</i>` node into the `<div>` and set the div's `data-value` to `_cooler_`.

Please be wise and remember about protecting your server from all possible kinds of attack, such as:

* SQL injection -- make sure you validate and properly encode and escape user provided data before passing it to db
* XSS -- make sure that (unless that is your intent) user can not force arbitrary html tags into the server's response.html
* CSRF -- make sure that one user can not trick another user into submiting a change to your server, by making (a part of) url hard to predict

The CSS provided just makes sure that size of textarea agrees with the size of the div.
You will probably need to make sure font, line-height, etc. are also in sync, by yourself.
     

