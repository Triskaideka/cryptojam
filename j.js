function q(e){return document.querySelector(e)}function qa(e){return document.querySelectorAll(e)}function f(e){q(e).focus()}function ajax(e){var t=new XMLHttpRequest;t.open("GET",e,!0),t.onload=function(){if(this.status>=200&&this.status<400){var e=document.implementation.createHTMLDocument("s");e.documentElement.innerHTML=this.responseText,q("#ol-body").innerHTML=e.documentElement.querySelector("body").innerHTML,null!==q("a#try")&&q("a#try").addEventListener("click",function(e){e.preventDefault(),showOL(0)}),null!==q("a#quit")&&q("a#quit").addEventListener("click",function(e){e.preventDefault(),ajax("solve.php?z=1&p="+q("input[name=p]").getAttribute("value"))}),showOL(1)}else q("#ol-body").innerHTML="Sorry, but something went wrong while checking your solution.",showOL(1)},t.onerror=function(){location.href=e},t.send()}function countPrevSibs(e){for(var t=[];e=e.previousSibling;)3!==e.nodeType&&t.push(e);return t.length}function showOL(e){e?(q("body").classList.add("noscroll"),q("#ol-back").classList.remove("hid"),f("#ol-close a")):(q("body").classList.remove("noscroll"),q("#ol-back").classList.add("hid"),f('input[name="s[]"]'))}function ready(e){"loading"!=document.readyState?e():document.addEventListener("DOMContentLoaded",e)}ready(function(){for(ltrs=qa('input[name="s[]"]'),i=0;i<ltrs.length;i++)ltrs[i].setAttribute("maxlength",1),ltrs[i].setAttribute("aria-label","Letter "+(countPrevSibs(ltrs[i])+1)+" of word "+(countPrevSibs(ltrs[i].parentNode)+1)+(countPrevSibs(ltrs[i].parentNode.parentNode)?" in the attribution":"")+"; cipher is "+ltrs[i].getAttribute("placeholder")),ltrs[i].setAttribute("data-idx",i),ltrs[i].addEventListener("keydown",function(e){if(self_idx=parseInt(this.getAttribute("data-idx")),37==e.keyCode)0===self_idx?target=ltrs.length-1:target=self_idx-1;else{if(39!=e.keyCode)return;self_idx===ltrs.length-1?target=0:target=self_idx+1}f('input[data-idx="'+target+'"]')}),ltrs[i].addEventListener("input",function(){for(sames=qa('input[placeholder="'+this.getAttribute("placeholder")+'"]'),j=0;j<sames.length;j++)sames[j].value=this.value.toUpperCase();fe=this,setTimeout(function(){fe.select()},9)}),ltrs[i].addEventListener("blur",function(){for(j=0;j<ltrs.length;j++)ltrs[j].classList.remove("same")}),ltrs[i].addEventListener("focus",function(){for(sames=qa('input[placeholder="'+this.getAttribute("placeholder")+'"]'),j=0;j<sames.length;j++)sames[j].classList.add("same");fe=this,setTimeout(function(){fe.select()},9)});q("a#help").innerHTML+=" (<kbd>SHIFT+I</kbd>)",q("button[type=reset]").innerHTML+="<br>(<kbd>SHIFT+R</kbd>)",q("button[type=submit]").innerHTML+="<br>(<kbd>SHIFT+S</kbd>)",document.addEventListener("keydown",function(e){e.shiftKey&&(73===e.keyCode&&(q("a#help").click(),e.preventDefault()),82===e.keyCode&&(q("button[type=reset]").click(),e.preventDefault()),83===e.keyCode&&(q("button[type=submit]").click(),e.preventDefault()))}),q("#ol-close a").addEventListener("click",function(e){e.preventDefault(),showOL(0)}),document.addEventListener("keyup",function(e){27===e.keyCode&&showOL(0)}),q("a#help").addEventListener("click",function(e){e.preventDefault(),ajax("help.php")}),q("form").addEventListener("submit",function(e){for(e.preventDefault(),url="solve.php?p="+q("input[name=p]").value,i=0;i<ltrs.length;i++)url+="&s[]="+ltrs[i].value;ajax(url)})});