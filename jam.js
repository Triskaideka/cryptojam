function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  letters = document.querySelectorAll('input[name="s[]"]');

  // Loop through letter fields
  for (i = 0; i < letters.length; i++)  {

    // Set a maxlength for each letter field
    letters[i].setAttribute('maxlength', 1);

    
    // Enable keyboard navigation among the letter fields
    letters[i].setAttribute('data-idx', i);

    // use keydown instead of keyup so the user can hold the key to move quickly
    letters[i].addEventListener('keydown', function(ev){
      self_idx = parseInt(this.getAttribute('data-idx'))
  
      // left arrow
      if (ev.keyCode == 37) {
        if ( self_idx === 0 ) {
          target = letters.length - 1;
        } else {
          target = self_idx - 1;
        }
      
      // right arrow
      } else if (ev.keyCode == 39) {
        if ( self_idx === letters.length - 1 ) {
          target = 0;
        } else {
          target = self_idx + 1;
        }

      // if it's some other key then we don't have to do anything
      } else {
        return;
      }

      // Here's where we actually perform the navigation
      document
        .querySelector("input[data-idx=\""+target+"\"]")
        .focus();
    });

    
    // Auto-fill letter fields with the same cipher
    letters[i].addEventListener('input', function(){
      same_letters = document.querySelectorAll('input[placeholder="'+this.getAttribute('placeholder')+'"]');
      for (j = 0; j < same_letters.length; j++)  {
        same_letters[j].value = this.value.toUpperCase();
      }
    });

    
    // Highlight a letter when moving to it -- this makes it easier to change letters you've already entered.
    // Have to do this on a delay for some reason; nothing happens otherwise.
    letters[i].addEventListener('focus', function(){
      fe = this;  // focused element
      setTimeout(function(){ fe.select(); }, 9);
    });

    
  } // end of letter field loop

  // Enable keyboard shortcuts for the form buttons
  document.querySelector("button[type=reset]").innerHTML += '<br><span class="small">(ALT+A)</span>';
  document.querySelector("button[type=submit]").innerHTML += '<br><span class="small">(ALT+S)</span>';
  document.addEventListener('keyup', function(ev){
    if (ev.altKey) {
      //console.log(ev.keyCode);
      if (ev.keyCode === 65)  {  // A
        document.querySelector("button[type=reset]").click();
      }
      if (ev.keyCode === 83)  {  // S
        document.querySelector("button[type=submit]").click();
      }
    }
  });

}); // end of ready function