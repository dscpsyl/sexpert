<?php
require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
require_once( __DIR__ . '/../const.php' );


class Inquiry_List_Table extends WP_List_Table
{
    public function prepare_items() {
        global $LIST_LIMIT;
        $this->set_pagination_args( array(
            'total_items' => $this->get_total(),
            'per_page'    => $LIST_LIMIT
        ));

        $columns = $this->get_columns();
        $hidden = $this->get_hidden_columns();
        $sortable = $this->get_sortable_columns();

        $this->_column_headers = array($columns, $hidden, $sortable);
        $this->items = $this->get_parsed_data();
    }

    public function shorten($v){
        $v = strip_tags($v);
        if (strlen($v) < 20){
            return $v;
        } else {
            return substr($v, 0, 20) . "...";
        }
    }

    private function toggle_modal_text($v){
        $v = preg_replace("/'/","\"",$v);
        return "<div onclick='toggle_modal_unchange(`$v`)'>" . $this->shorten($v) . "</div>";
    }

    private function escape($v){
        return preg_replace("/'/","\"",$v);
    }

    private function get_parsed_data() {
        $result = [];
        foreach ($this->get_data() as $res){
            $result[] = array(
                "id" => $res->id,
                "age" => $res->age,
                "gender" => $res->gender,
                "country" => $res->country,
                "message" => $this->toggle_modal_text($res->message),
                "status" => CONVERT_STATUS_CODE($res->status),
                "_response" => $this->toggle_modal_text($res->response ? $res->response : "No Response"),
                "time" => CONVERT_TIME($res->time),
                "assignee_name" => $res->assignee_name ? $res->assignee_name : "-",
                "assigner_name" =>
                    $res->assigner_name ? $res->assigner_name: "-",
            );
        }
        return $result;
    }

    function column_id($item) {
        $actions = array();
        $inquiry_id = $item["id"];
        if (strcmp($item["assignee_name"], "-") == 0){
            $actions["edit"] = "<a onclick=\"open_assign_modal($inquiry_id)\" href=\"#\">Assign</a>";
        } else {
            $actions["delete"] = "<a onclick=\"unassign_inquiry($inquiry_id, -1)\" href=\"#\">Unassign</a>";
            $actions["edit"] = "<a onclick=\"open_assign_modal($inquiry_id)\" href=\"#\">Reassign</a>";
        }

        return sprintf('%1$s %2$s', $item['id'], $this->row_actions($actions) );
    }

    private function get_data() {
        global $wpdb, $INQUIRY_TABLE_NAME, $USER_TABLE_NAME, $LIST_LIMIT;
        // Orders
        $order_by = 'time';
        $order = 'desc';
        // If orderby is set, use this as the sort column
        if(!empty($_GET['orderby']))
        {
            $order_by = $_GET['orderby'];
            if (!$this->get_columns()[$order_by]){
                echo "You SQL injection activity is recorded!";
                $order_by = 'time';
            }
        }
        // If order is set use this as the order
        if(!empty($_GET['order']))
        {
            $order = $_GET['order'];
            if (!($order == "desc" or $order == "asc")){
                echo "You SQL injection activity is recorded!";
                $order = "desc";
            }
        }

        // Paging
        $offset = ((int) $this->get_pagenum() - 1) * $LIST_LIMIT;

        // Where
        $where = "";
        if(!empty($_GET['status']))
        {
            $status = (int) $_GET['status'];
            $where = $wpdb->prepare("WHERE i.status = %d", $status);
        }

        return $wpdb->get_results($wpdb->prepare(
            "
                SELECT 
                    i.id, i.age, i.gender, i.country, i.message, i.status, i.response, i.time,
                    assignee.user_login as assignee_name,
                    assigner.user_login as assigner_name
                FROM $INQUIRY_TABLE_NAME AS i
                LEFT JOIN $USER_TABLE_NAME AS assignee ON i.assignee_id = assignee.id
                LEFT JOIN $USER_TABLE_NAME AS assigner ON i.assigner_id = assigner.id
                ORDER BY i.$order_by $order
                LIMIT %d, %d 
            " . $where,
            $offset, $LIST_LIMIT
        ));
    }

    private function get_total() {
        global $wpdb, $INQUIRY_TABLE_NAME;
        $result = $wpdb->get_results("SELECT count(*) AS c FROM $INQUIRY_TABLE_NAME");
        return $result[0]->c;
    }

    public function get_columns() {
        $columns = array(
            "id" => "ID",
            "age" => "Age",
            "gender" => "Gender",
            "country" => "Country",
            "message" => "Message",
            "status" => "Status",
            "_response" => "Response",
            "time" => "Time",
            "assignee_name" => "Assignee",
            "assigner_name" => "Assigner",
        );
        return $columns;
    }

    public function get_hidden_columns() {
        return array();
    }

    public function get_sortable_columns() {
        return array(
            'time' => array('time', false),
            'status' => array('status', false),
            'gender' => array('gender', false),
            'age' => array('age', false),
        );
    }

    public function column_default( $item, $column_name ) {
        switch( $column_name ) {
            case 'id':
            case 'age':
            case 'gender':
            case 'country':
            case 'message':
            case 'status':
            case '_response':
            case 'time':
            case 'assignee_name':
            case 'assigner_name':
                return $item[ $column_name ];
            default:
                return print_r( $item, true ) ;
        }
    }



}
