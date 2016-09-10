<?php
// Document head
if ( empty($_REQUEST['a']) || !$_REQUEST['a']) {
  echo "<!doctype html><html><head><title>Cryptojam solution</title></head><body>";
}

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

$answer = strtoupper(
  preg_replace(
    "/[^A-Za-z]/",
    '',
    $puzzles[$_REQUEST['p']]['text'] . $puzzles[$_REQUEST['p']]['author']
  )
);

#print_r($_REQUEST);
#echo "<br>Submission: " . $submission;
#echo "<br>Answer: " . $answer;

if ($submission === $answer) {
  echo "<p>Correct!</p>";
} else {
  echo "<p>Sorry, that's the wrong answer.</p>";
}


// End of document
if ( empty($_REQUEST['a']) || !$_REQUEST['a']) {
  echo "</body></html>";
}
