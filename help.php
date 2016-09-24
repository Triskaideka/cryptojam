<?php /*
help.php for Cryptojam
Author: Triskaideka
License: MIT

Parameters: none
*/

// gzip the output
if ( substr_count($_SERVER[‘HTTP_ACCEPT_ENCODING’], ‘gzip’) ) {
  ob_start(“ob_gzhandler”);
} else {
  ob_start(); 
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><title>Cryptojam help</title>
<link rel="stylesheet" href="crypto.css" type="text/css"></head><body><main></main>
<h2>Instructions</h2>
  
<div>A crpytogram is a word puzzle in which a phrase or quotation is expressed in code.  Each letter of the alphabet is replaced with another letter.  Your job is to reveal the original text by converting the letters back.</div>
  
<h3>Tips</h3>
  
<ol>
<li><strong>Focus on short words first.</strong>  In English, a one-letter word must be either <samp>A</samp> or <samp>I</samp>.  Two- or three-letter words are likely to be prepositions, articles, or conjunctions.</li>
<li><strong>Use punctuation as a guide,</strong> especially apostrophes. A single letter following an apostrophe might be a possessive <samp>S</samp>, or it might be <samp>T</samp>, as in <samp>CAN'T</samp> or <samp>WOULDN'T</samp>.  Two letters following an apostrophe could be <samp>RE</samp> or <samp>VE</samp>, as in <samp>THEY'RE</samp> or <samp>WE'VE</samp>.</li>
<li><strong>Look for similar words.</strong>  If you see <samp>WXR</samp> and <samp>WXRU</samp>, the former might be <samp>THE</samp>, and the latter <samp>THEM</samp>, <samp>THEN</samp>, or <samp>THEY</samp>.  If two words end with the same few letters, maybe they rhyme?</li>
<li><strong>A letter can't stand for itself.</strong> If you see the word <samp>OF</samp> in the puzzle, one thing you know for certain is that that word <i>isn't</i> "of".</li>
</ol>
</body></html>