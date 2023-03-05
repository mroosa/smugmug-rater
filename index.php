<?php include_once('template/header.php');?>

    <main>
      <section class="image">
        <?php include_once('template/displayImage.php'); ?>
      </section>
      <aside>
        <?php $displayImg = $curImg < 9 ? "0" . ($curImg + 1) : $curImg + 1; ?>
        <p id="progress"><span id="cur"><?php print $displayImg; ?></span>&nbsp;&nbsp;of&nbsp;&nbsp;<span class="total"><?php print $numImgs; ?></span></p>
        <ul class="image-nav">
          <li id="prev-image"><a href="#">«</a></li>
          <li id="next-image"><a href="#">»</a></li>
        </ul>
        <?php include_once("template/rate.php"); ?>
      </aside>
    </main>

<?php include_once('template/footer.php');?>
