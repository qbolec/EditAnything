document.body.addEvent('click:relay(.editable)',function(e,el){
  e.preventDefault();
  for(var p=el;!p.get('data-update-url');p=p.parentNode){
  }
  var value = p.get('data-value') || p.get('text');
  var url = p.get('data-update-url');
  var pos = el.getPosition(document.body);
  var size = el.getSize();
  
  var textarea = new Element('textarea',{
    'class' : 'edit_anything',
    'styles' : {
      'left':pos.x +'px',
      'top':pos.y +'px',
      'width':Math.max(100,size.x) +'px',
      'height':size.y +'px'
    }
  });
  document.body.grab(textarea);
  textarea.appendText(value);
  textarea.addEvent('blur',function(){
    var newValue = textarea.value;
    if(newValue != value){
      new Request.JSON({
        'method':'POST',
        'url':url,
        'data': {
          'data' : JSON.encode(newValue)
        },
        'onSuccess':function(json){
          p.set('data-value',json.value);
          p.set('html',json.html);
          textarea.dispose();
        },
        'onFailure':function(json){
          alert("Could not save changes :(");
        }
      }).send();
    } else {
      textarea.dispose();
    }
  })
})