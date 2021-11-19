<?php

require_once __DIR__ . "/../const.php";
require_once __DIR__ . "/../utils/user-level.php";

function list_users(WP_REST_Request $request)
{
    if (!authorize("admin")){
        wp_send_json(
            array(
                "success" => false,
                "message" => "Not authorized",
            )
        );
    }
    global $wpdb, $USER_TABLE_NAME;

    $users = $wpdb->get_results(
    "SELECT ID, display_name FROM $USER_TABLE_NAME",
    );

    wp_send_json(
        array(
            "success" => true,
            "message" => $users,
        )
    );

}

