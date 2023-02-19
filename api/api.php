<?php
    global $settings;
    $settings = load_settings();

    function load_settings() {
        $c = file_get_contents("api-settings.json");
        return json_decode($c);
    }

    function get_db_username($settings) {
        return $settings->username;
    }

    function get_db_password($settings) {
        return $settings->password;
    }

    function get_db_host($settings) {
        return $settings->host;
    }

    function get_db_port($settings) {
        return $settings->port;
    }

    function get_temp_db_name($settings) {
        return $settings->temp_db_name;
    }

	function get_req_body() {
		$inputJSON = file_get_contents('php://input');
		return $input = json_decode($inputJSON, TRUE);
	}

	$res_ = array();
	global $res_;

	function get_schema($body) {
		return $body['schema'];
	}

	function get_query($body) {
		return $body['query'];
	}

	function open_db() {
	    global $settings;
		return new mysqli(get_db_host($settings), get_db_username($settings), get_db_password($settings), "", get_db_port($settings));
	}

	function open_temp_db() {
		global $settings;
        return new mysqli(get_db_host($settings), get_db_username($settings), get_db_password($settings), get_temp_db_name($settings), get_db_port($settings));
	}

	function use_temp_database($db) {
		global $settings;
		$r1 = $db -> query("CREATE DATABASE ".get_temp_db_name($settings).";");
		$r2 = $db->query("USE ".get_temp_db_name($settings).";");
	}

	function load_schema($db, $schema) {
		$db -> multi_query($schema);
	}

	function exec_query($db, $query) {
		$res = $db -> multi_query($query);
		return $res;
	}

	function get_headers_array($r) {
		$headers = array();
		$fields = $r->fetch_fields();
		foreach ($fields as $f) {
			array_push($headers, $f->name);
		}
		return $headers;
	}

	function get_rows_array($r) {
		$rows=array();
		while ($row = $r->fetch_assoc()) {
			array_push($rows, $row);
		}
		return $rows;
	}

	function make_result_object($r) {
		return array("rows" => get_rows_array($r),"headers"=>get_headers_array($r));
	}

	function use_multi_result($mr) {
		do {
			echo $mr;
			$result = $mr->store_result();

			$result_object = make_result_object($result);
			array_push($results);
		} while ($mr->next_result());
	}

	function delete_temp_database($db) {
		$r = $db -> query("DROP DATABASE test_x_;");
	}

	function execute_query($dbx, $query) {
		if ($dbx -> multi_query($query)) {
			do {
				if ($result = $dbx -> store_result()) {
					global $res_;
					array_push($res_, make_result_object($result));
					$result -> free_result();
				}
			} while ($dbx -> next_result());
		}
	}

	$body_ = get_req_body();

	$schema = get_schema($body_);

	$query_ = get_query($body_);

	$db_ = open_db();

	use_temp_database($db_);

	load_schema($db_, $schema);

	$db_->close();

	$xdb = open_temp_db();

	$res = execute_query($xdb, $query_);

	delete_temp_database($xdb);

	header("content-type: application/json");

	echo json_encode($res_);
?>