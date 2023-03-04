<?php

require "services/DB.php";
use services\DB;

// Get current URL
$current_link = $_SERVER['REQUEST_URI'];
var_dump($current_link);
exit;

// Routes

$urls = [
    '/react-blog/api/posts'
]

?>