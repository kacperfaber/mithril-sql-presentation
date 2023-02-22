<?php
	header("content-type: application/json");
	mysqli_report(MYSQLI_REPORT_OFF);

	function return_err($error_msg) {
		http_response_code(400);
		echo '{"err": "'.$error_msg.'"}';
		die();
	}
	
    global $settings;
    $settings = load_settings();
	
	header("Access-Control-Allow-Origin: ".get_cors($settings));
	header("Access-Control-Allow-Headers: Content-Type");

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
	
	function get_cors($settings) {
		return $settings->cors;
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
		foreach (explode(";", $schema) as $s) {
			if ($s == "") {
				continue;
			}
			if (!$db->query($s)) {
				return_err("SCHEMA: ".$db -> error);
			}
		}
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
	
	function make_single_value_row($row) {
		$value_row = array();
		$keys = array_keys($row);
		foreach ($keys as $key) {
			array_push($value_row, $row[$key]);
		}
		return $value_row;
	}

	function get_rows_array($r) {
		$rows=array();
		while ($row = $r->fetch_assoc()) {
			$vrow = make_single_value_row($row);
			array_push($rows, $vrow);
		}
		return $rows;
	}

	function make_result_object($r) {
		return array("rows" => get_rows_array($r),"headers"=>get_headers_array($r));
	}

	function delete_temp_database($db) {
		global $settings;
		$r = $db -> query("DROP DATABASE ".get_temp_db_name($settings).";");
	}

	function execute_query($dbx, $query) {
		try {
			if ($dbx -> multi_query($query)) {
				do {
					if ($result = $dbx -> store_result()) {
						global $res_;
						array_push($res_, make_result_object($result));	
					}
				} while ($dbx -> next_result());
			}
			else {
				return_err("QUERY: ".$dbx->error);
			}
		}
		
		catch (Exception $e) {
			return_err("exception");
		}
	}

	try {
		$body_ = get_req_body();

		$schema = get_schema($body_);

		$query_ = get_query($body_);

		$db_ = open_db();

		use_temp_database($db_);

		load_schema($db_, $schema);

		$res = execute_query($db_, $query_);

		delete_temp_database($db_);
		
		$db_->close();

		echo json_encode($res_);
	}
	
	catch (Exception $e) {
		return_err("exception");
	}
?>