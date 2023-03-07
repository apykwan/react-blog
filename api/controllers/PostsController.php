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

    ## Getting paginated posts from database
    public function getPostsFromDatabase() {
        try {
            $perPage = $_GET['limit'] ?? 5;
            $pageNumber = $_GET['offset'] ??0;
            $postsArray = [];

            $sql_totalPost = "SELECT count(*) AS numOfPosts FROM posts";
            $data = mysqli_fetch_assoc(mysqli_query($this->conn, $sql_totalPost));
            $totalPosts = $data['numOfPosts'];

            $sql_limit = "SELECT * FROM posts ORDER BY id LIMIT ? OFFSET ?";
            $stmt = $this->conn->prepare($sql_limit);
            $stmt->bind_Param('ss', $perPage, $pageNumber);

            if(!$stmt->execute()) {
                trigger_error('Error executing query: ' . $stmt->error);
            }

            $response = $stmt->get_result();
            while($row = $response->fetch_assoc()) {
                $postsArray['posts'][] = $row;
            }
           
            $postsArray['count'] = $totalPosts;

            mysqli_close($this->conn);

            echo json_encode($postsArray, JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }

    ## Getting search results from database
    public function getSearchResult() {
        try {

            $postsArray = [];
            $keyword = $_GET['keyword'] ?? null;

            if (!$keyword) {
                exit;
            }

            $searchParam = "%{$keyword}%";
            $sql = "SELECT id, title FROM posts WHERE title LIKE ? LIMIT 5";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_Param('s', $searchParam);

            if(!$stmt->execute()) {
                trigger_error('Error executing query: ' . $stmt->error);
            }

            $response = $stmt->get_result();
            while($row = $response->fetch_assoc()) {
                $postsArray['posts'][] = $row;
            }

            echo json_encode($postsArray, JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }

    public function getCurrentTopic() {
        try {
            $id = $_GET['id'] ?? null;

            if(!$id)
                exit;
            
            $sql = "SELECT * FROM posts WHERE id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_Param('s', $id);

            if(!$stmt->execute()) {
                trigger_error('Error executing query: ' . $stmt->error);
            }

            $result = $stmt->get_result();

            echo json_encode($result->fetch_assoc(), JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }
}

?>