<?php
function getExtension($filename, $point) {
    return substr(strrchr($filename, $point), 1);
}

function getTypeOfFile($filename) {
    return substr($filename, 0, strrpos($filename, '/'));
}