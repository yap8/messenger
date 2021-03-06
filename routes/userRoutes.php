<?php

// environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// jwt
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// @desc    Register a new user
// @access  Public
// @body    { name, username, email, password }
// @return  JWT
$app->post('/api/users/register', function ($request, $response) {
  try {
    // db connection
    $db = new DB;
    $conn = $db->connect();

    // get the request body
    $json = $request->getBody();
    $data = json_decode($json, true);

    // destructuring to get all fields into separate variables
    ['name' => $name, 'username' => $username, 'email' => $email, 'password' => $password] = $data;

    // add user to the database
    $sql = "INSERT INTO users(name, username, email, password)
            VALUES ('$name', '$username', '$email', '$password')";

    // perform the query
    $conn->query($sql);

    // get id
    $id = $conn->insert_id;
    $jwt = JWT::encode(['id' => $id], $_ENV['SECRET_KEY'], 'HS256');

    // return result
    return $response->withJson($jwt);
  } catch (Exception $error) {
    return $response->withJson($error->getMessage(), 500);
  }
});

// @desc    Authenticate a user
// @access  Public
// @body    { email, password }
// @return  JWT
$app->post('/api/users/login', function ($request, $response) {
  try {
    // db connection
    $db = new DB;
    $conn = $db->connect();

    // get the request body
    $json = $request->getBody();
    $data = json_decode($json, true);

    // destructuring to get all fields into separate variables
    ['email' => $email, 'password' => $password] = $data;

    // find the user that matches given credentials
    $sql = "SELECT * FROM users WHERE
            email = '$email' AND
            password = '$password'";

    // perform the query
    $result = $conn->query($sql);

    // throw error if no results
    if (!$result->num_rows) throw new Exception('No user with such credentials');

    // generate a token
    $id = $result->fetch_assoc()['id'];
    $jwt = JWT::encode(['id' => $id], $_ENV['SECRET_KEY'], 'HS256');

    // return the token
    return $response->withJson($jwt);
  } catch (Exception $error) {
    return $response->withJson($error->getMessage(), 500);
  }
});

// @desc    Get current user info
// @access  Private
// @body    {}
// @return  { id, name, username, email }
$app->get('/api/users/me', function ($request, $response) {
  try {
    // db connection
    $db = new DB;
    $conn = $db->connect();

    // get current user id
    $userId = $request->getAttribute('user');

    // find the user that matches given credentials
    $sql = "SELECT * FROM users WHERE id = '$userId';";

    // perform the query
    $result = $conn->query($sql);

    // fetch the result
    $user = $result->fetch_assoc();

    // remove password from user object
    unset($user['password']);

    // return the token
    return $response->withJson($user);
  } catch (Exception $error) {
    return $response->withJson($error->getMessage(), 500);
  }
})->add($private);

// @desc    Find users by given query
// @access  Private
// @body    {}
// @return  { id, name, username, email }
$app->get('/api/users/find', function ($request, $response) {
  try {
    // db connection
    $db = new DB;
    $conn = $db->connect();

    // get query param
    [ 'query' => $query ] = $request->getQueryParams();

    // get current user id
    $userId = $request->getAttribute('user');

    // find users that match given query
    $sql = "SELECT * FROM users WHERE id != '$userId' AND (email LIKE '$query%' OR name LIKE '$query%');";

    // perform the query
    $result = $conn->query($sql);

    // fetch the result
    $result = $result->fetch_all(MYSQLI_ASSOC);

    // return the token
    return $response->withJson($result);
  } catch (Exception $error) {
    return $response->withJson($error->getMessage(), 500);
  }
})->add($private);
