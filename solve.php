<!doctype html><html><head><meta charset="utf-8"><title>Cryptojam solution</title>
<link rel="stylesheet" href="crypto.css" type="text/css"></head><body>
<?php
/*
solve.php for Cryptojam
Author: Triskaideka
License: MIT

Parameters:
  p = Puzzle ID
  s = Solution (array of letters)
*/

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
if ( empty($_REQUEST['s']) || !is_array($_REQUEST['s']) ) {
  echo "<p>You didn't provide a solution!</p>";
  exit;
}

// Compare the solution to the db
$submission = strtoupper( implode('', $_REQUEST['s']) );

$puzzle = $puzzles[$_REQUEST['p']];
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
  echo "<div class=\"proof\"><div>$puzzle[text]</div><div class=\"att\">&mdash;$puzzle[author]</div></div>";

} else {
  echo "<p class=\"wrong\">&#x2717; Sorry, that's the wrong answer.</p>";
}


// End of document
?><p><a href=\"./\">Try another puzzle</a></p></body></html>
