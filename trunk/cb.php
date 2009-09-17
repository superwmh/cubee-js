<?php
/**
 * get files via curl from internet
 */
function get_contents($url){
	$ch =curl_init($url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$str =curl_exec($ch);
	curl_close($ch);
	if ($str !==false) {
		return $str;
	}else {
		return '';
	}
}
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
		array('/_js$/','/_css$/','/yui\/2_7_0/','/yui\/2_6_0/','/yui\/3_0_0/','/yui\/3_0/','/yui\/2_5_2/','/yui\/2_5_1/'), 
		array('.js','.css','yui/2.7.0','yui/2.6.0','yui/3.0.0','yui/3.0','yui/2.5.2','yui/2.5.1'), 
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
	else if(file_exists($kk)){
		$files[] = file_get_contents($kk);
	}else {
		$files[] = file_get_contents('http://cn.yimg.com/'.$k);
	}
}
header('Content-Encoding: gzip, deflate');//压缩输出
header('Vary: Accept-Encoding');//压缩输出
header('Expires: Sun, 15 Sep 2019 02:24:02 GMT');//压缩输出
header('Accept-Ranges: byte');//压缩输出
header('Connection: keep-alive');
//header('Cache-Control: max-age=304831331');//永久缓存
header('Cache-Control: max-age=86400, private');//缓存一天
header($header[$type]);//文件类型
$result = join("\n",$files);
cache(md5($result));//etag
echo $result;
?>

