/*
jam.js for Cryptojam
Author: Triskaideka
License: MIT
*/

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// shortcut functions
function q(s) { return document.querySelector(s); }
function qa(s) { return document.querySelectorAll(s); }
function f(l) { q(l).focus(); }


// Used to count letters in words for the benefit of the ARIA labels; thanks to http://stackoverflow.com/a/4379864 for the code
function countPrevSibs(el) {
  var sibs = [];
  while (el = el.previousSibling) {
    if (el.nodeType === 3) continue; // text node
    sibs.push(el);
  }
  return sibs.length;
}


ready(function(){
  letters = qa('input[name="s[]"]');

  // Loop through letter fields
  for (i = 0; i < letters.length; i++)  {

    // Set a maxlength for each letter field
    letters[i].setAttribute('maxlength', 1);

    
    // Add an ARIA label to each letter field
    letters[i].setAttribute(
      'aria-label',
      'Letter ' + ( countPrevSibs(letters[i]) + 1 ) + 
        ' of word ' + ( countPrevSibs(letters[i].parentNode) + 1 ) +
        // this next line relies on the assumption that there are exactly two DIVs in the form: a quote and its attribution
        ( countPrevSibs(letters[i].parentNode.parentNode) ? ' in the attribution' : '' ) +
        '; cipher is ' + letters[i].getAttribute('placeholder')
    );
    
    
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
      f("input[data-idx=\""+target+"\"]");
    });

    
    // When the user types in a letter field:
    letters[i].addEventListener('input', function(){
      // Auto-fill all letter fields that have the same cipher as this one
      same_letters = qa('input[placeholder="'+this.getAttribute('placeholder')+'"]');
      for (j = 0; j < same_letters.length; j++)  {
        same_letters[j].value = this.value.toUpperCase();
      }

      // Immediately select the contents of the field so the user can change their mind about it without pressing backspace
      fe = this;  // focused element
      setTimeout(function(){ fe.select(); }, 9);
    });

    
    letters[i].addEventListener('blur', function(){
      // Remove the background coloring from all letter fields that previously had it
      for (j = 0; j < letters.length; j++)  {
        letters[j].classList.remove('same');
      }
    });
                                
    letters[i].addEventListener('focus', function(){
      // Add the background coloring to all letter fields with the same cipher letter as this one
      same_letters = qa('input[placeholder="'+this.getAttribute('placeholder')+'"]');
      for (j = 0; j < same_letters.length; j++)  {
        same_letters[j].classList.add('same');
      }
      
      // Highlight a letter when moving to it -- this makes it easier to change letters you've already entered.
      // Have to do this on a delay for some reason; nothing happens otherwise.
      fe = this;  // focused element
      setTimeout(function(){ fe.select(); }, 9);
    });
    
  } // end of letter field loop


  // Enable keyboard shortcuts
  q("a#help").innerHTML += ' (<kbd>SHIFT+I</kbd>)';
  q("button[type=reset]").innerHTML += '<br>(<kbd>SHIFT+R</kbd>)';
  q("button[type=submit]").innerHTML += '<br>(<kbd>SHIFT+S</kbd>)';

  // Wanted to use 'keypress' but had to use 'keydown' because apparently Firefox (unlike Chrome and Opera) 
  // fires the keypress event when SHIFT is held down all by itself, and then doesn't fire it again when you 
  // press a letter key while holding SHIFT.
  document.addEventListener('keydown', function(ev){
    
    // We use SHIFT because CTRL and ALT keystrokes may already have certain uses (e.g. CTRL+R reloads
    // the page).  Since cryptograms are case-insensitive, there should be no need for the user to use
    // the SHIFT key on the page.
    if (ev.shiftKey) {
      //console.log(ev.keyCode);

      // I: read [i]nstructions
      if (ev.keyCode === 73)  {
        q("a#help").click();
        ev.preventDefault();  // so the letter doesn't get typed in the field
      }
      
      // R: [r]eset the puzzle
      if (ev.keyCode === 82)  {
        q("button[type=reset]").click();
        ev.preventDefault();  // so the letter doesn't get typed in the field
      }
      
      // S: check the [s]olution
      if (ev.keyCode === 83)  {
        q("button[type=submit]").click();
        ev.preventDefault();  // so the letter doesn't get typed in the field
      }
    }
  });  // end keydown listener

  
  // Enable link for dismissing the overlay
  q("#ol-close a").addEventListener('click', function(ev){
    ev.preventDefault();
    showOL(0);
  });
  
  // Enable keyboard shortcut for dismissing the overlay
  // Can't combine with the form button shortcuts because they can't use 'keyup' and, for some reason,
  // this one can't use 'keypress' -- something about some browsers not recognizing Esc properly?
  document.addEventListener('keyup', function(ev){
    if (ev.keyCode === 27)  {  // Esc
      showOL(0);
    }
  });
  
  
  // Enable the help link
  q("a#help").addEventListener('click', function(ev){
    ev.preventDefault();
    ajax("help.php");
  });

  
  // Check the solution asynchronously
  q("form").addEventListener('submit', function(ev){
      // Since we're running JavaScript, don't submit the form in the usual way
      ev.preventDefault();
    
      // Build the URL
      url = "solve.php?p="
        + q("input[name=p]").value;

      for (i = 0; i < letters.length; i++) {
        url += '&s[]=' + letters[i].value;
      }
    
      //console.log(url);
    
      // Make the AJAX request
      ajax(url);
    });
  
}); // end of ready function


function ajax(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    // Success
    if (this.status >= 200 && this.status < 400) {
      // make a new document with the received code
      var code = document.implementation.createHTMLDocument("s");
      code.documentElement.innerHTML = this.responseText;

      // insert the body of the received code into the body of the overlay
      q("#ol-body").innerHTML = code.documentElement.querySelector('body').innerHTML;

      // make the "try again" link just dismiss the overlay
      if ( q('a#try') !== null ) {
        q('a#try').addEventListener('click', function(ev){ ev.preventDefault(); showOL(0); })
      }

      // enable the "give up" link
      if ( q('a#quit') !== null ) {
        q('a#quit').addEventListener('click', function(ev){
          ev.preventDefault();
          ajax( 'solve.php?z=1&p=' + q('input[name=p]').getAttribute('value') );
        })
      }

      // reveal the overlay
      showOL(1);

    // Failure (reached the target server, but it returned an error)
    } else {
      q("#ol-body").innerHTML = "Sorry, but something went wrong while checking your solution.";
      showOL(1);
    }
  };

  // Also failure: if there was a connection error, try just going to the solution URL, for what it's worth.
  request.onerror = function() {
    location.href = url;
  };

  request.send();
}


// shortcut function to show or hide the overlay
function showOL(on) {
  if (on) {
    q("#ol-back").classList.remove('hid');
    f("#ol-close a");  // focus on the close link
  } else {
    q("#ol-back").classList.add('hid');
    f('input[name="s[]"]');  // focus on the first letter field
  }
}