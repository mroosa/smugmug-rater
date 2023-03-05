<?php include_once('template/header.php');?>
<script defer src="js/ratings.js" type="text/javascript"></script>
    <main style="height: auto;">
      <section class="check_ratings">
<?php
  # load json file
  $jsonfile = 'data/ratings.json';
  $rattyJSON = file_get_contents($jsonfile);
  $rattyAry = json_decode($rattyJSON, true);
  //
  // print "<pre style=\"font-size: 9px;\">\n";
  // print_r($rattyAry['images']);
  // print "</pre>\n";
  //
  $output = "<table id=\"ratings_table\" cellspacing=\"0\" cellpadding=\"0\">\n";
  $output .= "\t<tr>\n";
  $output .= "\t\t<th width=\"80\"></th>\n";
  $output .= "\t\t<th data-sortable=\"1\">Filename</th>\n";
  $output .= "\t\t<th>Key</th>\n";
  $output .= "\t\t<th data-sortable=\"1\" data-sort-by=\"rating\">Ratings</th>\n";
  $output .= "\t</tr>\n";
  # loop through images
  foreach ($rattyAry['images'] as $key => $image) {
    $output .= "\t<tr>\n";

    $output .= "\t\t<td><img src=\"" . $image['thumbnail'] . "\" alt=\"" . $image['filename'] . "\"></td>\n";
    $output .= "\t\t<td>" . $image['filename'] . "</td>\n";
    $output .= "\t\t<td>" . $image['serial'] . "</td>\n";
    $numRating = 0;
    $totalRating = 0;
    $imgHasRatings = array_key_exists('ratings', $image);
    if ($imgHasRatings && count($image['ratings']) > 0){
      $numRating = count($image['ratings']);
      if ($numRating > 0) {
        foreach($image['ratings'] as $rating) {
          $totalRating += $rating['score'];
        }
        $avgRating = floor(($totalRating / $numRating) * 10) / 10;
      }
    }
    $output .= "\t\t<td data-rating=\"$avgRating\"><ul><li>Times rated: " .  $numRating . "</li><li>Overall rating: " . $avgRating . "</li></ul></td>\n";

    $output .= "\t</tr>\n";
  }
  print $output;
?>
      </section>
    </main>
<?php include_once('template/footer.php');?>
