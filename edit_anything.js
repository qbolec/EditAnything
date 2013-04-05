document.body.addEvent('click:relay(.editable)',function(e,el){
  var value = el.get('data-value') || el.get('text');
  var url = el.get('data-update-url');
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
      console.log("please change",value,newValue);
      new Request.JSON({
        'method':'POST',
        'url':url,
        'data': {
          'data' : JSON.encode(newValue)
        },
        'onSuccess':function(json){
          el.set('data-value',json.value);
          el.set('html',json.html);
          textarea.dispose();
        },
        'onFailure':function(json){
          alert("Could not save changes :(");
        }
      }).send();
    } 
  })
})