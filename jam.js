/*
jam.js for Cryptojam
Author: Triskaideka
License: MIT

Thanks go to random people who answer questions on the internet, but most especialy to 
http://youmightnotneedjquery.com/ , for important parts of the code in this file.
*/

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
  // We use SHIFT because CTRL and ALT keystrokes may already have certain uses (e.g. CTRL+R reloads
  // the page).  Since cryptograms are case-insensitive, there should be no need for the user to use
  // the SHIFT key on the page.
  document.querySelector("button[type=reset]").innerHTML += '<br><span class="small">(SHIFT+R)</span>';
  document.querySelector("button[type=submit]").innerHTML += '<br><span class="small">(SHIFT+S)</span>';
  document.addEventListener('keypress', function(ev){
    if (ev.shiftKey) {
      ev.preventDefault();  // so the letter doesn't get typed in the field
      //console.log(ev.keyCode);
      if (ev.keyCode === 82)  {  // R
        document.querySelector("button[type=reset]").click();
      }
      if (ev.keyCode === 83)  {  // S
        document.querySelector("button[type=submit]").click();
      }
    }
  });

  
  // Check the solution asynchronously
  document
    .querySelector("form")
    .addEventListener('submit', function(ev){
      // Since we're running JavaScript, don't submit the form in the usual way
      ev.preventDefault();
    
      // Build the URL
      url = "solve.php?a=1&p="
        + document.querySelector("input[name=p]").value;

      for (i = 0; i < letters.length; i++) {
        url += '&s[]=' + letters[i].value;
      }
    
      //console.log(url);
    
      // Make the AJAX request
      var request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          var resp = this.response;
        } else {
          // We reached our target server, but it returned an error

        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
  });
  
}); // end of ready function
