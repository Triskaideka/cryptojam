<?php /*
index.php for Cryptojam
Author: Triskaideka
License: MIT

Parameters:
  p = Puzzle ID
*/

// gzip the output
if ( substr_count($_SERVER[‘HTTP_ACCEPT_ENCODING’], ‘gzip’) ) {
  ob_start(“ob_gzhandler”);
} else {
  ob_start(); 
}
?><!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<title>Cryptojam</title>
<link rel="icon" type="image/png" href="favicon.png" />
<link rel="stylesheet" href="crypto.css" type="text/css">
</head><body>
<header><h1>CRYPTOJAM</h1></header>
<main><form action="solve.php" method="get">
<?php

// Load the puzzle db
$puzzles = json_decode(file_get_contents('grams.json'), true);

#echo json_last_error_msg() , "<br>";
#echo $_GET['p'];
#var_dump($puzzles);

// Choose a puzzle
if ( !empty($_GET['p']) && array_key_exists($_GET['p'], $puzzles) ) {
  $pzl_id = $_GET['p'];
} else {
  $pzl_id = array_rand($puzzles);
}
echo "<input type=\"hidden\" name=\"p\" value=\"$pzl_id\">";
$puzzle = $puzzles[ $pzl_id ];

#var_dump($puzzle);
#echo $puzzle['author'];

// Generate the cipher, taking care to avoid a situation where a letter is its own answer
$code1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
$code2 = $code1;

for ($i = 0; $i < count($code1); $i++) {
  do {
    $j = array_rand($code2);
    #echo "$j ";
  } while ( $code1[$i] === $code2[$j] || $code1[$j] === $code2[$i] );
  #echo "<br>";
  
  list($code2[$i], $code2[$j]) = array($code2[$j], $code2[$i]);
}

$cipher = array_combine($code1, $code2);

#echo "<pre>";
#print_r($cipher);
#echo "</pre>";

// Print the quote
$pzlcode = '<span>';
foreach ( preg_split('//', strtoupper($puzzle['text']) ) as $c ) {
  if ( preg_match('/[A-Za-z]/', $c) ) {
    $pzlcode .= "<input name=s[] placeholder=$cipher[$c]>";
  } else if ( $c === ' ' ) {
    $pzlcode .= "</span> <span>";
  } else {
    $pzlcode .= $c;
  }
}
$pzlcode .= '</span>';

// Print the attribution
if ( !empty($puzzle['author']) ) {
  $pzlcode .= "<div class=\"att\">&mdash;<span>";
  foreach ( preg_split('//', strtoupper($puzzle['author']) ) as $c ) {
    if ( preg_match('/[A-Za-z]/', $c) ) {
      $pzlcode .= "<input name=s[] placeholder=$cipher[$c]>";
    } else if ( $c === ' ' ) {
      $pzlcode .= "</span> <span>";
    } else {
      $pzlcode .= $c;
    }
  }
  $pzlcode .= '</span></div>';
}

echo $pzlcode;

?>
<p><button type="reset">Reset puzzle</button>
<button type="submit">Check solution</button></p>
</form></main>
<footer><ul><li><a id="help" href="help.php">Instructions</a></li><li><a href="?p=<?php echo $pzl_id; ?>">Permalink</a><li><a href="./">Try another puzzle</a>
<li>Quotations from <a href="https://en.wikiquote.org/">WikiQuote</a></ul></footer>
<div id="ol-back" class="hid"><div id="ol-fore"><div id="ol-close"><a href="">Close (<kbd>ESC</kbd>)</a></div>
<div id="ol-body">Loading....</div></div></div>
<script type="text/javascript" src="jam.js"></script>
</body></html>
