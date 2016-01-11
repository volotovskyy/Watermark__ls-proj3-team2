<?php
require_once "../composer/vendor/autoload.php";
use \WideImage\WideImage as WideImage;

$pos_x = 0;
$pos_y = 0;
$opacity = 0.6 * 100;
$type = 'tile';

$main_image_src = '../img/watermark/main-image.jpg';
$watermark_src = '../img/watermark/watermark1.jpg';

$main_image = WideImage::loadFromFile($main_image_src);
$main_image_width = $main_image->getWidth();
$main_image_height = $main_image->getHeight();

$watermark = WideImage::loadFromFile($watermark_src);
$watermark_width = $watermark->getWidth();
$watermark_height = $watermark->getHeight();

if ($main_image_width / $watermark_width < 1) {
    $watermark = $watermark->resize($main_image_width);
    $watermark_height = $watermark->getHeight();
}

if ($main_image_height / $watermark_height < 1) {
    $watermark = $watermark->resize(null, $main_image_height);
}

if ($type == 'tile') {
    $margin_x = 50 / 100;
    $margin_y = 30 / 100;

    $watermark_width += $watermark_width * $margin_x;
    $watermark_height += $watermark_height * $margin_y;

    $ratio_x = ceil($main_image_width / $watermark_width);
    $ratio_y = ceil($main_image_height / $watermark_height);

    if ($pos_x > $margin_x) {
        $pos_x -= $watermark_width;
        $ratio_x++;
    }

    if ($pos_y > $margin_y) {
        $pos_y -= $watermark_height;
        $ratio_y++;
    }

    for ($i = 0; $i < $ratio_y; $i++) {
        for ($j = 0; $j < $ratio_x; $j++) {
            $x = $pos_x + $watermark_width * $j;
            $y = $pos_y + $watermark_height * $i;

            $main_image = $main_image->merge($watermark, $x, $y, $opacity);
        }
    }

    $main_image->saveToFile("../img/watermark/1.jpg");
} else {
    $main_image->merge($watermark, $pos_x, $pos_y, $opacity)->saveToFile("../img/watermark/1.jpg");
}


//$main_image->resize(500)->merge($watermark,0,0,50)->saveToFile("../img/watermark/1.jpg");