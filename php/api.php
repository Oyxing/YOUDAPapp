<?php
    $work=$_GET["q"];      
    echo $work;
    $url = "http://dict.youdao.com/suggest?q=".$work."&le=eng&num=5&ver=2.0&doctype=json";
    $ch = curl_init();
    $timeout = 5;
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $file_contents = curl_exec($ch);
    curl_close($ch);
    echo $file_contents;

?>
