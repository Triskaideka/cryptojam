<?php /*
solve.php for Cryptojam
Author: Triskaideka
License: MIT

Parameters:
  p = Puzzle ID
  s = Solution (array of letters)
  z = indicates user is giving up and wants to see the solution
*/

// gzip the output
if ( substr_count($_SERVER[‘HTTP_ACCEPT_ENCODING’], ‘gzip’) ) {
  ob_start(“ob_gzhandler”);
} else {
  ob_start(); 
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><title>Cryptojam solution</title>
<link rel="stylesheet" href="c.css" type="text/css"></head><body class="direct"><main>
<?php
// Load the puzzle db
$puzzles = json_decode(file_get_contents('grams.json'), true);

// Deal with errors
if ( empty($_REQUEST['p']) ) {
  echo "<p>I don't know which puzzle you're trying to solve!</p>";
  exit;
}
if ( !array_key_exists($_REQUEST['p'], $puzzles) ) {
  echo "<p>There isn't any puzzle with the ID \"".htmlspecialchars($_REQUEST['p'])."\".</p>";
  exit;
}
if ( empty($_REQUEST['z']) && 
     ( empty($_REQUEST['s']) || !is_array($_REQUEST['s']) )
   )
{
  echo "<p>You didn't propose a solution!</p>";
  exit;
}

// Now that everything's okay, set up some variables.
$id = $_REQUEST['p'];
$puzzle = $puzzles[$id];

// If the user is giving up, show the solution and we're done.
// Compare this to the code if the user got the right solution; they're pretty 
// similar (I thought about combining them... and I still might).
if ( !empty($_REQUEST['z']) && $_REQUEST['z'] ) {
  echo "<div class=\"proof\"><div>$puzzle[text]</div><div class=\"att\">&mdash;$puzzle[author]</div></div></main>";
  echo "<nav><ul><li><a href=\"$puzzle[source]\">Source</a><li><a href=\"./\">Try another puzzle</a></ul></nav></body></html>";
  exit;  
}
  
// Fill holes in the provided solution with underscores, to make it easier to identify omissions
$letters = array_map(
  function ($l) { return empty($l) ? '_' : $l; },
  $_REQUEST['s']
);
  
// Compare the solution to the db
$submission = strtoupper( implode('', $letters) );
$wrappable_submission = strtoupper( implode(' ', $letters) );  // tried &#x200b; (zero-width space) but didn't like it

$answer = strtoupper(
  preg_replace(
    "/[^A-Za-z]/",
    '',
    $puzzle['text'] . $puzzle['author']
  )
);

#print_r($_REQUEST);
#echo "<br>Submission: " . $submission;
#echo "<br>Answer: " . $answer;

if ($submission === $answer) {
  echo "<p class=\"correct\">&#x2713; Correct!</p>";
  echo "<div class=\"proof\"><div>$puzzle[text]</div><div class=\"att\">&mdash;$puzzle[author]</div></div></main>";
  echo "<nav><ul><li><a href=\"$puzzle[source]\">Source</a><li><a href=\"./\">Try another puzzle</a></ul></nav>";
} else {
  echo "<p class=\"wrong\">&#x2717; Sorry, that's not the answer.</p>";
  echo "<div>$wrappable_submission</div></main>";
  echo "<nav><ul><li><a href=\"./?p=$id\" id=\"try\">Keep trying</a>";
  echo "<li><a href=\"solve.php?p=$id&amp;z=1\" id=\"quit\">See the solution</a></ul></nav>";
}

// End of document
?></body></html>
