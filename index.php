<?php define ('IS_PROD', 0); ?>
<?php 
  header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
  header("Pragma: no-cache"); //HTTP 1.0
  header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Grunt JS Demo</title>
	</head>
</html>
<body>

<?php if (IS_PROD === 1 || !empty($_POST['getMinifiedFiles']) && $_POST['getMinifiedFiles']) {  ?>
<script type="text/javascript" src="dist/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="dist/jqxwidgets.min.js"></script>
<script type="text/javascript" src="dist/custom.min.js"></script>
<?php } else if (!empty($_POST['getNonMinifiedFiles']) && $_POST['getNonMinifiedFiles']) {  ?>
<!-- JQUERY -->
<script type="text/javascript" src="plugins/jquery-2.1.3.min.js"></script>
<!-- GRID -->
<script type="text/javascript" src="plugins/jqxwidgets/jqxcore.js"></script> 
<script type="text/javascript" src="plugins/jqxwidgets/jqxdata.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.sort.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.pager.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.selection.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.sort.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.aggregates.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.columnsresize.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.columnsreorder.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxmenu.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.storage.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxgrid.filter.js"></script>
<!-- CHART -->
<script type="text/javascript" src="plugins/jqxwidgets/jqxdraw.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxchart.core.js"></script>
<script type="text/javascript" src="plugins/jqxwidgets/jqxchart.js"></script>
<!-- DIALOG -->
<script type="text/javascript" src="plugins/jqxwidgets/jqxwindow.js"></script>

<!-- CUSTOM -->
<script type="text/javascript" src="js/BillingReport.js"></script></script>
<script type="text/javascript" src="js/Booster.js"></script>
<script type="text/javascript" src="js/commonjs.js"></script>
<script type="text/javascript" src="js/ConvertToJson.js"></script>
<script type="text/javascript" src="js/customerrole.js"></script>
<script type="text/javascript" src="js/Customers.js"></script>
<script type="text/javascript" src="js/dashboard.js"></script>
<script type="text/javascript" src="js/default.js"></script>
<script type="text/javascript" src="js/deployment.js"></script>
<script type="text/javascript" src="js/fetchdata.js"></script>
<script type="text/javascript" src="js/global.js"></script>
<script type="text/javascript" src="js/home.js"></script>
<script type="text/javascript" src="js/Policies.js"></script>
<script type="text/javascript" src="js/projects.js"></script>
<script type="text/javascript" src="js/quote.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/UserJs.js"></script>
<?php } ?>

<form method="POST">
	<input type="submit" value="Load minified files" name="getMinifiedFiles">
	<input type="submit" value="Load non minified files" name="getNonMinifiedFiles">
</form>
</body>
</html>
	
