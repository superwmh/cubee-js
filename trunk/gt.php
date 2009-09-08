<?php
$files = array();
$header = array(
	'js' => 'Content-Type: application/x-javascript',
	'css' => 'Content-Type: text/css',
	'jpg' => 'Content-Type: image/jpg',
	'gif' => 'Content-Type: image/gif',
	'png' => 'Content-Type: image/png'
);
$type = '';

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
$k = $_REQUEST;
foreach ($_REQUEST as $k => $v) {
	$k = preg_replace(
		array('/_png$/','/_gif$/','/_jpg$/','/_js$/','/_css$/','/yui\/2_7_0/','/yui\/2_6_0/','/yui\/3_0_0/','/yui\/3_0/','/yui\/2_5_2/','/yui\/2_5_1/'), 
		array('.png','.gif','.jpg','.js','.css','yui/2.7.0','yui/2.6.0','yui/3.0.0','yui/3.0','yui/2.5.2','yui/2.5.1'), 
		trim($k,'/')
	);
	if(empty($type)) {
		if(preg_match('/.js$/', $k)) {
			$type = 'js';
		}
		else if(preg_match('/.css$/', $k)) {
			$type = 'css';
		} else if(preg_match('/.jpg/', $k)) {
			$type = 'jpg';
		} else if(preg_match('/.png/', $k)) {
			$type = 'png';
		} else if(preg_match('/.gif/', $k)) {
			$type = 'gif';
		}
	}
	$kk = preg_replace("/^(.+)\/([0-9]{5})\/(.+)$/","$1/branches/$2/$3",$k);
	if(file_exists($k)){
		$files[] = file_get_contents($k);
	}
	else if(file_exists($kk)){
		$files[] = file_get_contents($kk);
	}
	else {
		#$files[] = get_contents('http://cn.yimg.com/'.$k);
		$files[] = file_get_contents('http://cn.yimg.com/'.$k);
	}
}
header($header[$type]);
echo join("\n",$files)
?>

