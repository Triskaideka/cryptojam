<!doctype html>
<meta charset="utf-8">
<html><head><title>Cryptogram Solver</title>
<link rel="stylesheet" href="crypto.css" type="text/css">
</head><body>
<h1>cryptojam</h1>
<form action="solve.php" method="post">
<?php

$puzzles = json_decode(file_get_contents('grams.json'), true);

#echo json_last_error_msg() , "<br>";
#var_dump($puzzles);

$pzl_id = array_rand($puzzles);
echo "<input type=\"hidden\" name=\"id\" value=\"$pzl_id\">";
  
$puzzle = $puzzles[ $pzl_id ];

#var_dump($puzzle);
#echo $puzzle['author'];

$pzlcode = '';

foreach ( preg_split('//', strtoupper($puzzle['text']) ) as $c ) {
  if ( preg_match('/[A-Za-z]/', $c) ) {
    $pzlcode .= "<input name=s[] placeholder=$c>";
  } else if ( $c === ' ' ) {
    $pzlcode .= " <wbr>";
  } else {
    $pzlcode .= $c;
  }
}

if ( !empty($puzzle['author']) ) {
  $pzlcode .= '<br>&mdash;';
  foreach ( preg_split('//', strtoupper($puzzle['author']) ) as $c ) {
    if ( preg_match('/[A-Za-z]/', $c) ) {
      $pzlcode .= "<input placeholder=$c>";
    } else if ( $c === ' ' ) {
      $pzlcode .= " <wbr>";
    } else {
      $pzlcode .= $c;
    }
  }
}

echo $pzlcode;

echo "<p><button>Check solution</button></p>";
  
?>
</form>
<p><a href="./">Get a new puzzle</a></p>
<p>Quotations from <a href="https://en.wikiquote.org/">WikiQuote</a>.</p>
</body></html>
