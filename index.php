<!doctype html>
<meta charset="utf-8">
<html><head><title>Cryptojam</title>
<link rel="stylesheet" href="crypto.css" type="text/css">
</head><body>
<h1>CRYPTOJAM</h1>
<form action="solve.php" method="post">
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
echo "<input type=\"hidden\" name=\"id\" value=\"$pzl_id\">";
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
    $pzlcode .= "<input name=s[] placeholder=$c>";
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
      $pzlcode .= "<input placeholder=$c>";
    } else if ( $c === ' ' ) {
      $pzlcode .= "</span> <span>";
    } else {
      $pzlcode .= $c;
    }
  }
  $pzlcode .= '</span></div>';
}

echo $pzlcode;

echo "<p><button>Check solution</button></p>";

?>
</form>
<p><a href="?p=<?php echo $pzl_id; ?>">Permalink</a> | <a href="./">Try another puzzle</a></p>
<p>Quotations from <a href="https://en.wikiquote.org/">WikiQuote</a>.</p>
</body></html>
