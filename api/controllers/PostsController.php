<?php

namespace Api\Controllers;

use Services\DB;

class PostsController {
    public $conn = null;

    public function __construct() {
        $this->conn = (new DB())->database();
    }

    ## Getting posts from third party library
    public function getPosts() {
        try {
            # Fetching posts
            $post_url = "https://jsonplaceholder.typicode.com/posts";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_ENCODING, 0);
            curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_URL, $post_url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

            # Getting Images.
            $photo_url = "https://jsonplaceholder.typicode.com/photos";
            $chImg = curl_init();
            curl_setopt($chImg, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($chImg, CURLOPT_HEADER, 0);
            curl_setopt($chImg, CURLOPT_ENCODING, 0);
            curl_setopt($chImg, CURLOPT_MAXREDIRS, 10);
            curl_setopt($chImg, CURLOPT_TIMEOUT, 30);
            curl_setopt($chImg, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($chImg, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($chImg, CURLOPT_URL, $photo_url);
            curl_setopt($chImg, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($chImg, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

            $responseData = json_decode(curl_exec($ch), true);
            $responseImages = json_decode(curl_exec($chImg), true);
            $newArray = [];

            foreach($responseData as $resData) {
                if(isset($responseImages[$resData['id']])) {
                    $resData['image'] = $responseImages[$resData['id']]["url"];
                }

                $newArray[] = $resData;
            }

            $this->savePostsToDatabase($newArray);
        } catch(\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }

    ## Save posts in database from api
    public function savePostsToDatabase($posts = null) {
        foreach($posts as $post) {
            $userId = $post['userId'];
            $title = $post['title'];
            $content = $post['body'];
            $image = $post['image'];

            $sql = "INSERT INTO posts(`user_id`, `title`, `content`, `image`) VALUES(?,?,?,?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_Param('ssss', $userId, $title, $content, $image);
            
            if($stmt->execute()) {
                echo "New record created successfully";
            } else {
                echo "Error Fetching posts". "<br/>". mysqli_error($this->conn);
            }
        }
        mysqli_close($this->conn);
    }
}

?>