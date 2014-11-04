<?php
	session_start();
// include server parameters
include("initial.php");
require("configure.php");
include("database.php");
include_once("function.php");

// Filter Group qry
if ($_GET['gid'] != ""){
	$_SESSION[Filter_Group_ID] = $_GET['gid'];
}
else{
	$_SESSION[Filter_Group_ID] = "1";
}
if ($_SESSION[Filter_Group_ID] == "0"){
	$Filter_Group_qry = "";
}
else {
	$Filter_Group_qry = " WHERE `Group_ID` = " . $_SESSION[Filter_Group_ID];
}

// Filter Category qry
if ($_GET['cid'] != ""){
	$_SESSION[Filter_Category_ID] = $_GET['cid'];
}
else{
	$_SESSION[Filter_Category_ID] = "0";
}
if ( ($_SESSION[Filter_Category_ID] == "0") ){
	$Filter_Category_qry = "";
}
else {
	if ( ($Filter_Group_qry == "") ){
		$Filter_Category_qry = "` WHERE Category_ID` = " . $_SESSION[Filter_Category_ID];
	}
	else{
		$Filter_Category_qry = " AND `Category_ID` = " . $_SESSION[Filter_Category_ID];
	}
}

// Show which District : 0->Show all
if ($_GET['did'] != ""){
	$_SESSION[Filter_District_ID] = $_GET['did'];
}
else{
	$_SESSION[Filter_District_ID] = "0";
}
// Filter District qry
if ( ($_SESSION[Filter_District_ID] == "0") ){
	$Filter_District_qry = "";
}
else {
	if ( ($Filter_Group_qry == "") AND ($Filter_Category_qry == "") ){
		$Filter_District_qry = "` WHERE District_ID` = " . $_SESSION[Filter_District_ID];
	}
	else{
		$Filter_District_qry = " AND `District_ID` = " . $_SESSION[Filter_District_ID];
	}
}

// Filter Show_Mainpage qry
if ($_GET['mp'] != ""){
	$_SESSION[Filter_Show_Mainpage] = $_GET['mp'];
}
else{
	$_SESSION[Filter_Show_Mainpage] = "0";
}
if ($_SESSION[Filter_Show_Mainpage] == "0"){
	$Filter_Show_Mainpage_qry = "";
}
else {
	if ( ($Filter_Group_qry == "") AND ($Filter_Category_qry == "") ){
		$Filter_Show_Mainpage_qry = " ` WHERE Show_Mainpage` = " . $_SESSION[Filter_Show_Mainpage];
	}
	else{
		$Filter_Show_Mainpage_qry = " AND `Show_Mainpage` = " . $_SESSION[Filter_Show_Mainpage];
	}
}

// Get selected results
unset($_SESSION['resultMSG_ID']);
$_SESSION['resultMSG_ID'][] = 0;
$_SESSION['MSGtotal'] = 0;
$qryMSG_ID = "SELECT `MSG_ID`,`MSG_EXPIRE_DATE` FROM `".TB_MSG."` " . $Filter_Group_qry . $Filter_Category_qry . $Filter_District_qry . $Filter_Show_Mainpage_qry . " ORDER BY `Show_Top` DESC, `MSG_Date` DESC, `modifydate` DESC";
if($resMSG_ID = mysql_query($qryMSG_ID,$conn)){
	while ($row = mysql_fetch_array($resMSG_ID, MYSQL_ASSOC)){
		if ( Show_expired($row[MSG_EXPIRE_DATE], $today) ){
			// Expired
		}
		else{
			$_SESSION['resultMSG_ID'][$_SESSION['MSGtotal']] = $row[MSG_ID];
			$_SESSION['MSGtotal'] += 1;
		}
	}
	mysql_free_result($resMSG_ID);
}

$_SESSION[ShowFirstContent] = $_SESSION[resultMSG_ID][0];
if ( $_SESSION['MSGtotal'] >= NUM_OF_RESULTS_OF_FTUNEWS_IN_MAINPAGE ){
	$_SESSION[NUM_OF_RESULTS] = NUM_OF_RESULTS_OF_FTUNEWS_IN_MAINPAGE;
}
else{
	$_SESSION[NUM_OF_RESULTS] = $_SESSION['MSGtotal'];
}


//Display result

	for ($s=0;$s<=$_SESSION[NUM_OF_RESULTS]-1;$s++){
		$qryMSG = "SELECT `MSG_Number`,`MSG_Subject`,`MSG_Description`,`MSG_Date`,`MSG_IMG`,`Group_ID`,`Category_ID`,`District_ID`,`Show_Top`,`modifydate` FROM `".TB_MSG."`";
		$resMSG = mysql_query($qryMSG,$conn);
		while ($row = mysql_fetch_array($resMSG, MYSQL_ASSOC)){
			$d1 = date_parse($row['MSG_Date']);
			$MSG_Date = $d1['day'] . " " . $months[$d1['month']-1] . ", " . $d1['year'];

			echo $row[MSG_Description];

		}
		mysql_free_result($resMSG);



	mysql_close($conn);
?>
