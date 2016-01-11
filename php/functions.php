<?php
function getExtension($filename) {
    return substr(strrchr($filename, '.'), 1);
}