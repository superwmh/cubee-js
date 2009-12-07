<?php
/**
 * set e-tag cache
 */
function cache($etag){
	$etag = $etag; //标记字符串，可以任意修改
	if ($_SERVER['HTTP_IF_NONE_MATCH'] == $etag){
		header('Etag:'.$etag,true,304);
		exit;
	}
	else header('Etag:'.$etag);
}

/**
 * logic begin
 */
$files = array();
$header = array(
	'js' => 'Content-Type: application/x-javascript',
	'css' => 'Content-Type: text/css'
);
$type = '';
foreach ($_REQUEST as $k => $v) {
	$k = preg_replace(
		array('/_js$/','/_css$/'), 
		array('.js','.css'), 
		trim($k,'/')
	);
	if(empty($type)) {
		if(preg_match('/.js$/', $k)) {
			$type = 'js';
		}
		else if(preg_match('/.css$/', $k)) {
			$type = 'css';
		}
	}
	if(file_exists($k)) {
		$files[] = file_get_contents($k);
	}
}

header('Content-Encoding: gzip, deflate');//压缩输出
header('Vary: Accept-Encoding');
header('Accept-Ranges: byte');
header('Connection: keep-alive');
header("Cache-Control: max-age=315360000");
header("Expires: " . date("D, j M Y H:i:s", strtotime("now + 10 years")) ." GMT");
header($header[$type]);//文件类型
$result = join("\n",$files);
cache(md5($result));//etag
echo $result;

?>
