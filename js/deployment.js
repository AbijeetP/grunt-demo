var vrEnvironment = '1';
var vrDepCheckId = 0;
var vrClear = 0;
var vrbtnStatus = '';
var vrDepChangeStatus=0;
var vrEmpDeployDisableGrid=0;
$(document).ready(function () {
    $(function () {
        $('.chosen-container').chosen();
    });
    $("#slstatus").change(function()
    {
        vrDepChangeStatus=1;
    });
$("#btnDepClose").click(function () {
        $('#dailog').dialog('close');
       
    });
    /* starting setting the jqxgrid in deployment*/

    //var _Column = [
    //              { text: 'checklistid', hidden: true, datafield: 'intID', width: "0%" },
    //              { text: 'File type', datafield: 'FileType', width: "20%" },
    //              { text: 'File path', datafield: 'FilePath', width: "50%" },
    //              { text: 'File name or Query', datafield: 'FileName', width: '30%' }
    //];
    //$("#jqxgridFilesDetails").jqxGrid(
    //        {
    //            width: 650,
    //             source:dataAdapter,
    //            enabletooltips: true,
    //            //selectionmode: 'singlerow',
    //            filterable: true, //Allows to filter function for the data.
    //            sortable: true, //sort The data.if required.               
    //            autoheight: true, //Sets the total height of the grid.
    //            autorowheight: true, //Sets the row height automatically.
    //            editable: true,
    //            pageable: true,
    //           columns: _vrFileDeployColumns

    //        });

    bindFieldsToGrid([]);
    /* end setting the jqxgrid in deployment*/

    //adds files details to the file details grid.
    $("#deployaddrowbutton").click(function () {
        $("#jqxgridFilesDetails").jqxGrid('addrow', null, {});
        //solved a issue which was creating destroying the structure of the grid.
        $("#jqxgridFilesDetails").jqxGrid('refreshData');
    });
    // delete row.          
    $("#deploydeleterowbutton").click(function () {
        var selectedrowindex = $("#jqxgridFilesDetails").jqxGrid('getselectedrowindex');
        var rowdata = $("#jqxgridFilesDetails").jqxGrid('getrowdata', selectedrowindex);
        // if ($("#<%=ddlStatus.ClientID %>").prop('disabled')) {
        //if ($("#<%=ddlStatus.ClientID %>").prop('disabled') && typeof rowdata.intID != "undefined") {
        //    alert('Can not be deleted after status is changed from New');
        //}
        //else {
            var rowscount = $("#jqxgridFilesDetails").jqxGrid('getdatainformation').rowscount;
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = $("#jqxgridFilesDetails").jqxGrid('getrowid', selectedrowindex);
                var commit = $("#jqxgridFilesDetails").jqxGrid('deleterow', id);
            //}
            }
            $("#jqxgridFilesDetails").jqxGrid('refreshData');

    });
    $("#ddldeploymentProject").on('change', function () {
        $("#ddldeploymentTask").empty().trigger("chosen:updated");
        $("#ddldeploymentTask").append("<option value='0'>Select task</option>");
        _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + $("#ddldeploymentProject").val() + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployTask);
        var ddlDeployProjval = $("#ddldeploymentProject option:selected").text();
        $("#ddldeploymentProject").prop('title', ddlDeployProjval);
        var _ProjUrl = _vrLocationOrigin + '/project/GetChecklistDataBasedOnProject?intProjectID=' + parseInt($("#ddldeploymentProject").val()) + '&&strTokenID=' + _vrUserTokenId;
        ajaxCall(_ProjUrl, bindFieldsToText);
        $(".clsnewdeployvaluefields").find("#ddldeploymentProject_chosen").find(".chosen-single").removeClass("error");
        if ($('.error').length == 0) {
            $("#errNewDeployError").css("display", "none");
        }

    });
    $("#ddldeploymentTask").on('change', function () {
        $(".clsnewdeployvaluefields").find("#ddldeploymentTask_chosen").find(".chosen-single").removeClass("error");
    });
    $("#ddldeploymentApplication").on('change', function () { 
        _BaseUrl = _vrLocationOrigin + '/project/GetChecklistDataBasedOnApplication?intChecklistID=' + vrDepCheckId + '&&intGetID=3&&strSaveButtonValue=' + vrbtnStatus + '&&intChecklistAppID=' + parseInt($("#ddldeploymentApplication").val()) + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindFieldsToGrid);
        //$(".clsnewdeployvaluefields").find("#ddldeploymentApplication_chosen").find(".chosen-single").removeClass("error");
        $("#ddldeploymentApplication_chosen").removeClass("error");
        if ($('.error').length == 0) {
            $("#errNewDeployError").css("display", "none");
        }
        //$("#ddldeploymentApplication").val()
    });
    $("#ddldeploymentTask").change(function () {
        $(".clsnewdeployvaluefields").find(".chosen-choices").removeClass("error");
        if ($('.error').length == 0) {
            $("#errNewDeployError").css("display", "none");
        }
    });
    $("#iddeployemail").blur(function () {
        var vrEmailId = $(this).val();
        validateDeployEmail(vrEmailId);
    });
  
    $("#iddeployversion").keypress(function (event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57)|| (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 8 || event.keyCode ==46 ||event.keyCode==95) {

        }
        else {
            return false;
        }
    });
    $("#iddeployversion").bind('paste',function (event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 95) {

        }
        else {
            return false;
        }
    });
    $("#iddeploysvn").keypress(function (event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8 || (event.keyCode >= 97 && event.keyCode <= 122)) {
    
        }
        else {
            return false;
        }
    });
    //$("#iddeploysvn").bind('paste',function (event) {
    //    var vrTxtNumVal = $(this).val();
    //    var vrTxtId = $(this).attr("id");
    //    var element = this;
    //    setTimeout(function () {
    //        var text = $(element).val();
    //        if (isNaN(text)) {
    //            $("#" + vrTxtId).val(vrTxtNumVal);
    //        }
    //        // do something with text
    //    }, 5);
    //});
    $(".clsnewdeploymandatory ").change(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
        }
        if ($('.error').length == 0) {
            $("#errNewDeployError").css("display", "none");
           
        }
    });
    //
    $(".clsnewdeploymandatory").blur(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
           }
        if ($('.error').length == 0) {
            $("#errNewDeployError").css("display", "none");
          ;
        }
    });


    $("input:radio[name=Deployment]").click(function () {
        vrEnvironment = $(this).val();
    });
    $("body").on("change", "#ddlDeploystatus", function () {
        filterDeployJqxGrid();
    });
    $(".gridster").on("click", "#btnDeployResetSearch", function () {
        $("#txtDeploySearch").val("");
        filterDeployJqxGrid();
    });
});

function bindFieldsToGrid(data) {
    var source = data;
    if(typeof data =='undefined'){
        source = [];
    }
    //jqxgridFilesDetails
    _vrDeployFilesData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields:_vrDeployFilesDatafields,
        localdata: source
        // pagesize: _vrDefaultPreviewPager
    };
if (vrEmpDeployDisableGrid > 0) {
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileType', 'editable',false);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FilePath', 'editable', false);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileName', 'editable', false);
    }
    else
    {
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileType', 'editable', true);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FilePath', 'editable', true);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileName', 'editable', true);
    }
    loadFilesDeployGrid("jqxgridFilesDetails", _vrDeployFilesData, _vrFileDeployColumns, 650);
}
function loadFilesDeployGrid(Gridid,FilesData,Columns,Gridwidth) {
    $("#" + Gridid).jqxGrid(
                {
                    width: Gridwidth,
                    source: FilesData,
                    enabletooltips: true,
                    //selectionmode: 'singlerow',
                    filterable: true, //Allows to filter function for the data.
                    sortable: true, //sort The data.if required.               
                    autoheight: true, //Sets the total height of the grid.
                    autorowheight: true, //Sets the row height automatically.
                    editable: true,
                    //pageable: true,
                    columns: Columns,
                    autorowheight: true

                });
}

function bindFieldsToText(data)
{
    //  var source = data;
    if (typeof data != 'undefined' )
    {
        if (vrbtnStatus != 'Update') {
        $("#iddeployversion").val(data[0].Version);
        $("#iddeploysvn").val(data[0].SVNNo)
        $("#idFilepath").val(data[0].URL);
    }
    }
    else
    {
    $("#iddeployversion").val('');
    $("#iddeploysvn").val('')
    $("#idFilepath").val('');
    }
}
//To open new deployment create dialog box
function createNewDeployment() {
    try {
        vrbtnStatus = "Save";
        vrDepCheckId = 0;
        vrEnvironment = '1';
        $("#errNewDeployError").css("display", "none");
        $("#errNewDeployEmail").css("display", "none");
        $(".clsdailogfields").css("display", "none");
        $("#btnDepSave").css("display", "inline");
        $("#btnDepUpdate").css("display", "none");
        $("#ddldeploymentTask").empty().trigger("chosen:updated");
        $("input[type = submit]").attr("disabled", false);
        $("#ddldeploymentProject").attr('disabled', false).trigger("chosen:updated");
        $('#ddldeploymentTask').attr('disabled', false).trigger("chosen:updated");
        $("#ddldeploymentApplication").attr('disabled', false).trigger("chosen:updated");
        $("#idShowNewDeployment").css("display", "block");
        $("#ddldeploymentTask").empty().trigger("chosen:updated");
     $("#slstatus option[value='2']").remove();
        if (_UserRoleId == 1)
        {
            $("#slstatus").append('<option value=2>Deployed</option>');
        }
        $("#selstatusdeployed").css("display", "inline");
       // $("#slstatus").attr("disabled", false);
        _vrChecklistAppID = 0;
        _vrCheklistProjectId = 0;
        _vrSelTaskNames = [];
        //$("#ddldeploymentApplication").empty().trigger("chosen:updated");
        $('#dailog').dialog('option', 'title', _vrDialogBoxNewDeployment);
        _vrDialogBoxTitle = _vrDialogBoxNewDeployment;        
        $('#dailog').dialog('open');
        _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployProject);
        _BaseUrl = _vrLocationOrigin + '/Project/FetchApplicationData?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployApplication);
        $("#jqxgridFilesDetails").jqxGrid('clear');
     $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileType', 'editable', true);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FilePath', 'editable', true);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileName', 'editable', true);
        
        
    

        clearDeploymentFields();


       
    }
    catch (e) {

    }
}
function CheckFilesRemeber()
{
    if ($('#chkRemmemberFiles').prop('checked')) {
        SaveDeploymentFields();
    } else {
          $('#divDeployFilesDailog').dialog('option', 'title', "Files checklist");
           $(".clsremainingfields").html("Do you want save below files");
        $("#divDeployFilesDailog").dialog('open');
        $("#divDeployFilesDailog").dialog("widget").effect("shake", { times: 2 }, 200);
        $("#btnSubmitOkDevelopment").click(function () {
            $('#chkRemmemberFiles').prop('checked', true);
            $("#divDeployFilesDailog").dialog('close');
            SaveDeploymentFields();
        });
        $("#btnSubmitCancelDeployment").click(function () {
            $('#chkRemmemberFiles').prop('checked', false);
            $("#divDeployFilesDailog").dialog('close');
            SaveDeploymentFields();
        });
    }    
}
function SaveDeploymentFields()
{
    try {
        if (!validateChosen()) {
            validateDeploymentFields();
        return false;
    }
    if (!validateDeploymentFields()) {
        return false;
    }
    var vrCheckEmail = $('#iddeployemail').val();
    if (!validateDeployEmail(vrCheckEmail)) {
    return false;
    }
    $("input[type = submit]").attr("disabled", true);
    _vrDeployStatusId = 'succ';
    $("#divMainLoader").css("display", "inline");
    var vrDepEnvironment = parseInt(vrEnvironment);
        //var vrEnvironment= $(" input:checked").val();
   

    var vrIsRedBook = parseInt($('#chkRedbook').prop('checked') ? 1 : 0);
    var vrIsCommitted = parseInt($('#chkCommSvn').prop('checked') ? 1 : 0);
    var vrFileDetailsRemember = $('#chkRemmemberFiles').prop('checked') ? true : false;
    var vrProjectID=parseInt($('#ddldeploymentProject').val());
    var tasks = $('#ddldeploymentTask').val();
    if (tasks != null)
    {
        var vrTaskIds = tasks[0];
        for (var intIndex = 1; intIndex < tasks.length; intIndex++) {
            vrTaskIds = vrTaskIds + "," + tasks[intIndex];
        }
    }
    
    var version = $('#iddeployversion').val();
    var vrsvnno = $('#iddeploysvn').val();
    var vremail = $('#iddeployemail').val();
    var vrcomments = $('#txtcomment').val();
    
    var url = $("#idFilepath").val();
    var vrDepStatus =parseInt( $("#slstatus").val());
    var checklistapplicationid =parseInt(  $('#ddldeploymentApplication').val());
    var vrEmpId = parseInt(localStorage.getItem("LoggedEmpId"));
    var vrDeployFileDetails = [];
    var rows = $("#jqxgridFilesDetails").jqxGrid('getrows');
        try {
    for (var vrLoop = 0; vrLoop < rows.length; vrLoop++) {
        vrDeployFileDetails.push($('#jqxgridFilesDetails').jqxGrid('getrowdata', vrLoop));
        vrDeployFileDetails[vrLoop].FileName = replaceSlash(vrDeployFileDetails[vrLoop].FileName);
        vrDeployFileDetails[vrLoop].FilePath = replaceSlash(vrDeployFileDetails[vrLoop].FilePath);
        vrDeployFileDetails[vrLoop].FileType = replaceSlash(vrDeployFileDetails[vrLoop].FileType);
    }
        } catch (e) {

        }
    //if (vrFileDetailsRemember == false)
    //{
    //    $('#divDeployFilesDailog').dialog('option', 'title', "Files checklist");
    //    $(".clsremainingfields").html("Do you want save below files");
    //    $("#divDeployFilesDailog").dialog('open');
    //    $("#divDeployFilesDailog").dialog("widget").effect("shake", { times: 2 }, 200);
   
    //}
   // var fileDetails = FileDetails();
    var objCheckList = {
        // ApplicationName:checklistapplicationid,
        CheckListAppID: checklistapplicationid,
        Environment: vrDepEnvironment,
            IsRedbookUpdated :vrIsRedBook,
            IsCommitted :vrIsCommitted,
            ProjectID : vrProjectID,
            TaskIDs: vrTaskIds,
        Version :version,
        SVNNo :vrsvnno,
        EmailID :vremail,
        Comments :vrcomments,
        EmpID :vrEmpId,
    URL :url,
    Status: vrDepStatus,
    FileDetails: vrDeployFileDetails,
    TokenID:_vrUserTokenId,
   BlnFileDetailsRemember:vrFileDetailsRemember
    };
    _BaseUrl = _vrLocationOrigin + '/Project/InsertChecklist';
    ajaxCallWithObject(_BaseUrl, objCheckList, reloadCheckList);
    //$("#divMainLoader").css("display", "none");
    //$('#dailog').dialog('close');
    }
    catch(e)
    {

    }
    
}

function replaceSlash(value) {
    var vrVal = '';
    if ($.trim(value).length > 0) {
        vrVal = value.replace(/\\/g, '\\\\');
        return vrVal;
    } else {
       return value;
    }
    
}
function reloadCheckList(data) {

    var source = data;
    FilterDeploymentDetail();
}

////    $("#errNewDeployError").css("display", "none");
////    $("#errNewDeployEmail").css("display", "none");
////    $(".clsdailogfields").css("display", "none");
////    $("#idShowNewDeployment").css("display", "block");
////    $("#btnDepSave").css("display", "none");
////    $("#btnDepUpdate").css("display", "inline");
////    $('#dailog').dialog('option', 'title', _vrDialogBoxNewDeployment);
////    _vrDialogBoxTitle = _vrDialogBoxNewDeployment;
////    $('#dailog').dialog('open');
////    _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
////    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployProject);
////    _BaseUrl = _vrLocationOrigin + '/Project/FetchApplicationData?strTokenID=' + _vrUserTokenId;
////    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployApplication);

////}
function UpdateDeploy()
{
    try {

        if (!validateDeploymentFields()) {
            return false;
        }
        if (!validateChosen()) {
            validateDeploymentFields();
            return false;
        }
           
        if (parseInt($("#slstatus").val()) > 0 && vrDepChangeStatus==0)
        {
            if (_UserRoleId != "1")
            {
                var vrCnfrimMsg = "Can be updated only when status is 'New' (or) having Admin privileges.";
                displayMessage(_vrAlert, vrCnfrimMsg);
                return false;
            }
            
        }
        $("#divMainLoader").css("display", "inline");
        _vrDeployStatusId = 'updatesucc';
        $("input[type = submit]").attr("disabled", true);
        var vrDepEnvironment = parseInt(vrEnvironment);
        //var vrEnvironment= $(" input:checked").val();
        var vrIsRedBook = parseInt($('#chkRedbook').prop('checked') ? 1 : 0);
        var vrIsCommitted = parseInt($('#chkCommSvn').prop('checked') ? 1 : 0);
        var vrFileDetailsRemember = $('#chkRemmemberFiles').prop('checked') ? true : false;
        var vrProjectID = parseInt($('#ddldeploymentProject').val());
        var tasks = $('#ddldeploymentTask').val();
        if (tasks != null) {
            var vrTaskIds = tasks[0];
            for (var intIndex = 1; intIndex < tasks.length; intIndex++) {
                vrTaskIds = vrTaskIds + "," + tasks[intIndex];
            }
        }
        
        var version = $('#iddeployversion').val();
        var vrsvnno = $('#iddeploysvn').val();
        var vremail = $('#iddeployemail').val();
        var vrcomments = $('#txtcomment').val();

        var url = $("#idFilepath").val();
        var vrDepStatus = parseInt($("#slstatus").val());
        var checklistapplicationid = parseInt($('#ddldeploymentApplication').val());
        var vrEmpId = parseInt(localStorage.getItem("LoggedEmpId"));
        var vrDeployFileDetails = [];
        var rows = $("#jqxgridFilesDetails").jqxGrid('getrows');
        for (var vrLoop = 0; vrLoop < rows.length; vrLoop++) {
            vrDeployFileDetails.push($('#jqxgridFilesDetails').jqxGrid('getrowdata', vrLoop));
            vrDeployFileDetails[vrLoop].FileName = replaceSlash(vrDeployFileDetails[vrLoop].FileName);
            vrDeployFileDetails[vrLoop].FilePath = replaceSlash(vrDeployFileDetails[vrLoop].FilePath);
            vrDeployFileDetails[vrLoop].FileType = replaceSlash(vrDeployFileDetails[vrLoop].FileType);
        }
        // var fileDetails = FileDetails();
        var objCheckList = {
           
            CheckListAppID: checklistapplicationid,
            Environment: vrDepEnvironment,
            IsRedbookUpdated: vrIsRedBook,
            IsCommitted: vrIsCommitted,
            ProjectID: vrProjectID,
            TaskIDs: vrTaskIds,
            Version: version,
            SVNNo: vrsvnno,
            EmailID: vremail,
            Comments: vrcomments,
            EmpID: vrEmpId,
            URL: url,
            Status: vrDepStatus,
            FileDetails: vrDeployFileDetails,
            TokenID: _vrUserTokenId,
            BlnFileDetailsRemember: vrFileDetailsRemember,
            CheckListID:vrDepCheckId
        };
        _BaseUrl = _vrLocationOrigin + '/Project/UpdateChecklist';
        ajaxCallWithObject(_BaseUrl, objCheckList,reloadCheckList);
    }
        catch(e){

        }
}
function LoadPageNumForDeployment() {
    try {
        if ( _vrLocalDeployData!= null) {
            localStorage.setItem("jqxGridjqxDeployGrid", JSON.stringify(_vrLocalDeployData));
            $("#jqxDeployGrid").jqxGrid('gotopage', _vrLocalDeployData.pagenum);
        }
    }
    catch (e) {

    }
}
function clearDeploymentFields() {
    $('#dailog').dialog('option', 'title', _vrDialogBoxNewDeployment);
    _vrChecklistAppID = 0, _vrCheklistProjectId = 0, vrDepCheckId=0;
    _vrSelTaskNames = [];
    $("#slstatus").attr("disabled", false);
$("#btnDepClose").css("display", "none");
    $("#errNewDeployError").css("display", "none");
    $("#errNewDeployEmail").css("display", "none");
 $("#btnDepReset").css("display", "inline");
    $("#slstatus").val(vrClear);
    $("#ddldeploymentProject").val('').trigger("chosen:updated");
    $("#ddldeploymentTask").chosen();
    $("#ddldeploymentTask").empty().trigger("chosen:updated");
   // $("#ddldeploymentTask").val('').trigger("chosen:updated");
    $("#ddldeploymentApplication").chosen();
    $("#ddldeploymentApplication").val('').trigger("chosen:updated");
    $('#chkRedbook').prop('checked', false);
    $('#chkCommSvn').prop('checked', false);
    $('#rbTest').prop('checked', true);
    $('#chkRemmemberFiles').prop('checked', false);
    $("#iddeployversion").val('');
    $("#iddeploysvn").val('');
    $("#iddeployemail").val('');
    $("#idFilepath").val('');
    $("#txtcomment").val('');
    $("#jqxgridFilesDetails").jqxGrid('clear');
    $(".clsnewdeploymandatory").removeClass("error");
    $("#ddldeploymentProject").attr('disabled', false).trigger("chosen:updated");
    $('#ddldeploymentTask').attr('disabled', false).trigger("chosen:updated");
    $("#ddldeploymentApplication").attr('disabled', false).trigger("chosen:updated");
    $("#btnDepUpdate").css("display", "none");
    $("#btnDepSave").css("display", "inline");
        $(".clsnewdeployvaluefields").find("#ddldeploymentProject_chosen").find(".chosen-single").removeClass("error");
        $(".clsnewdeployvaluefields").find(".chosen-choices").removeClass("error");
        $(".clsnewdeployvaluefields").find("#ddldeploymentApplication_chosen").removeClass("error");
        $("#slstatus").attr("disabled", false);
  $('#txtcomment').attr("disabled", false);
        $("#idFilepath").attr("disabled", false);
        $("#iddeployemail").attr("disabled", false);
        $("#iddeployversion").attr("disabled", false);
        $("#iddeploysvn").attr("disabled", false);
        $('input[name=Deployment]').attr('disabled', false);
        $('#chkCommSvn').prop('disabled', false);
        $('#chkRedbook').prop('disabled', false);
        $("#deployaddrowbutton").attr("disabled", false);
        $("#deploydeleterowbutton").attr("disabled", false);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileType', 'editable', true);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FilePath', 'editable', true);
        $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileName', 'editable', true);
}
function validateDeploymentFields()
{
    $(".clsnewdeploymandatory").each(function (index) {
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass('error');
           
        }
    });
    if ($('.error').length > 0) {
        $("#errNewDeployError").css("display", "inline");
       
        return false;
    } else {
        return true;
    }
}
//validd
function validateDeployEmail(varEmail) {
    //var varEmail = $('#txtEmail').val();
    //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var firstChar = varEmail.charAt(0);
    if ((varEmail.charCodeAt(0) <= 122 && varEmail.charCodeAt(0) >= 97) || (varEmail.charCodeAt(0) <= 90 && varEmail.charCodeAt(0) >= 65)) {
        var splitemail = varEmail.split("@");
        if (splitemail.length == 2) {
            splitemail[0];
            var count = 0;
            for (var i = 0; i < splitemail[0].length; i++) {
                //splitemail[i].charCodeAt(i);

                if ((splitemail[0].charCodeAt(i) <= 47) && (splitemail[0].charCodeAt(i) >= 32)) {


                    var index = splitemail[0].indexOf(splitemail[0].charAt(i));
                    if (index > 0) {
                        var index1 = 1;
                        index1 += index;
                        var splitindex = splitemail[0].indexOf(splitemail[0].charAt(i), index1);
                        if (splitindex > index && splitindex == index1) {
                            count++;
                        }
                    }
                }
            }
            if (count == 0) {
                var re = /^[a-zA-Z0-9_\!#$%^&*()+-]+(\.[a-zA-Z0-9_\!#$%^&*()+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
                if (varEmail == "") {
                    $('#errNewDeployEmail').css('display', 'none');
                    
                    return true;
                }
                else if (re.test(varEmail)) {
                    $('#errNewDeployEmail').css('display', 'none');
                    
                    return true;

                }
                else {
                    $('#errNewDeployEmail').css('display', 'inline');
                  
                    return false;
                }
            }
            else {
                $('#errNewDeployEmail').css('display', 'inline');
              
                return false;
            }
        }
        else {
            $('#errNewDeployEmail').css('display', 'inline');
           
            return false;
        }
    }
    else {

        if (varEmail.length == 0) {
            $('#errNewDeployEmail').css('display', 'none');
            
            return true;
        }
        else {
            $('#errNewDeployEmail').css('display', 'inline');
        
            return false;
        }

    }
}

function FilterDeploymentDetail() {
    $("#divDeployLoading").css("display", "block");
    var vrFrmDate = $("#txtDeployFromDate").val();
    var vrToDate = $("#txtDeployToDate").val();
    var _vrToDate = "";
    if (typeof vrFrmDate != 'undefined' && typeof vrToDate != 'undefined') {
        var fromDate = $("#txtDeployFromDate").val().split("/");
        if (fromDate != "" && fromDate != undefined) {
            _vrFromDate = fromDate[2] + '-' + fromDate[1] + '-' + fromDate[0];
        }
        var ToDate = $("#txtDeployToDate").val().split("/");
        if (ToDate != "" && ToDate != undefined) {
            _vrToDate = ToDate[2] + '-' + ToDate[1] + '-' + ToDate[0];
        }
        _BaseUrl = _vrLocationOrigin + '/project/GetCheckListDetails?strTokenID=' + _vrUserTokenId + '&&strFromDate=' + _vrFromDate + '&&strToDate=' + _vrToDate;
        ajaxCall(_BaseUrl, bindDeploymentDetail);
    }
}
function bindDeploymentDetail(source) {
    $("#divDeployLoading").css("display", "block");
    var gridwidth = '';
    if (_vrGridDeployMagnify == 1 || $("#MagnifierDialog #idDeploy").length > 0) {
        gridwidth = _vrMagnifyDeployGridWidth;
        }
    else{
        gridwidth = _vrProjectsTasksWidth;
        setLocalStorageFromDialog("jqxDeployGrid", _vrProjectsTasksWidth);
    }
    var result = source;
    _vrDeployData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _DeployDataFields,
        localdata: result,
        pagesize: _vrDefaultDeploySizer
    };
    
    $("#jqxDeployGrid").jqxGrid(
    {
        width: gridwidth,
        source: _vrDeployData,
        sortable: true,
        pageable: true,
        pagerbuttonscount: 3,
        autoheight: true,
        enabletooltips: true,
        pagermode: 'simple',
        filterable: true,
        autosavestate: true,
        autoloadstate: true, 
        columns: _vrDeployColumns,
        columnsresize: true
    });
    //  pagerDisplay();
    disableJqxPagerButtonsOnLoad('jqxDeployGrid');
    $("#jqxDeployGrid").on("pagechanged", function (event) {
        disableEnablePagingButtons("jqxDeployGrid", event);
    });
    try {
        if (_vrsliderDates == 1) {
           // $('#txtDeployToDate').datepicker('option', 'minDate', "-1d");
            $('.ui-datepicker-current').hide();
           $("#txtDeployToDate").datepicker("setDate", new Date());
            $("#txtDeployFromDate").datepicker("setDate", -1);
            _vrsliderDates = 0;
        }
        if (_deployIndexNO > -1) {
            if (Object.keys(_vrWidgetCOntrolData[_deployIndexNO]).length > 0) {
                $("#txtDeployToDate").datepicker('option', 'minDate', _vrWidgetCOntrolData[_deployIndexNO].txtDeployFromDate);
                $("#txtDeployFromDate").datepicker("setDate", _vrWidgetCOntrolData[_deployIndexNO].txtDeployFromDate);
                $("#txtDeployToDate").datepicker("setDate", _vrWidgetCOntrolData[_deployIndexNO].txtDeployToDate);
                _deployIndexNO = -1;
            }
        }
    }
    catch (e) {

    }
    setRecordCountPosition("jqxDeployGrid");//To set pager count position in jqxgrid up on dynamically adding.
    filterDeployJqxGrid();
    LoadPageNumForDeployment();
    $("#divDeployLoading").css("display", "none");
    $("#imgDeployMagnify").attr("disabled", false);
}
var linkrenderer_deployempname = function (row, column, value) {
    return linkrenderdeployempname('jqxDeployGrid', row, column, value);
}
function linkrenderdeployempname(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            return '<span style="margin: 4px; line-height: 1.9;">' + rowdata.EmpFirstName + ' ' + rowdata.EmpLastName + '</span>';
        }
    } catch (e) {

    }
}
var linkrenderer_deploy = function (row, column, value) {
    return linkrenderdeploy('jqxDeployGrid', row, column, value);
}
function linkrenderdeploy(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var _ListID = JSON.stringify(rowdata['CheckListID']).toString();
        }
        return "<a class='clsdeploylink' href='#' onclick='deploylink(" + row + ")'>" + _ListID + "</a>";
    } catch (e) {

    }
}
function deploylink(valRowId) {
    clearDeploymentFields();
    var vrDialogTitleName = $("#MagnifierDialog").dialog("option", "title");
    if (vrDialogTitleName == _vrDialogDeployment) {// User click on maginfying of the deployment widget  
        _vrLocalDeployData = null;
        _vrLocalDeployData = JSON.parse(localStorage.getItem("jqxGridjqxDeployGrid"));
    }
    else {//user click on the widget itself.
        if (vrDialogTitleName != _vrDialogDeployment) {
            _vrLocalDeployData = null;
            _vrLocalDeployData = JSON.parse(localStorage.getItem("jqxGridjqxDeployGrid"));
        }
    }
    var rowdata = $('#jqxDeployGrid').jqxGrid('getrowdata', valRowId);
    vrDepCheckId = parseInt(rowdata.CheckListID);
    vrbtnStatus = "Update";
 vrEmpDeployDisableGrid=0;
    if (_UserRoleId == 1) {
        $("#slstatus option[value='2']").remove();
        $("#slstatus").append('<option value=2>Deployed</option>');
    }
    $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileType', 'editable', true);
    $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FilePath', 'editable', true);
    $("#jqxgridFilesDetails").jqxGrid('setcolumnproperty', 'FileName', 'editable', true);
    $("#errNewDeployError").css("display", "none");
    $("#errNewDeployEmail").css("display", "none");
    $(".clsdailogfields").css("display", "none");
    $("#idShowNewDeployment").css("display", "block");
    $("#btnDepSave").css("display", "none");
    $("#btnDepUpdate").css("display", "inline");
 $("#btnDepReset").css("display", "inline");
    $('#dailog').dialog('option', 'title', _vrDialogBoxNewDeployment);
    _vrDialogBoxTitle = _vrDialogBoxNewDeployment;
    $('#dailog').dialog('open');
    _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployProject);
    _BaseUrl = _vrLocationOrigin + '/Project/FetchApplicationData?strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagDeployApplication);
    $("#ddldeploymentTask").chosen();
    _vrCheklistProjectId = rowdata.ProjectID;
    //$("#ddldeploymentProject").val(parseInt(_vrCheklistProjectId)).trigger("chosen:updated");
    _vrSelTaskNames=rowdata.TaskIDs
  
    $("#ddldeploymentProject").attr('disabled', true).trigger("chosen:updated");
    $('#ddldeploymentTask').attr('disabled', true).trigger("chosen:updated");
    $("#ddldeploymentApplication").attr('disabled', true).trigger("chosen:updated");
   // $("#ddldeploymentTask").val(parseInt(rowdata.TaskIDs)).trigger("chosen:updated");;
    // $("#ddldeploymentApplication").chosen();
    _vrChecklistAppID = rowdata.CheckListAppID;
    //$("#ddldeploymentApplication").val(parseInt(rowdata.CheckListAppID)).trigger("chosen:updated");
    if (rowdata.IsRedbookUpdated == true)
    {
        $('#chkRedbook').prop('checked', true);
    }
    if (rowdata.IsCommitted == true)
    {
        $('#chkCommSvn').prop('checked', true);
    }
    if(parseInt(rowdata.Environment)==1)
    {
        $('#rbTest').prop('checked', true);
        vrEnvironment = '1';
    }
    else if (parseInt(rowdata.Environment) == 2) {
        $('#idLive').prop('checked', true);
        vrEnvironment = '2';
     }
    else
     {
        $('#idStaging').prop('checked', true);
        vrEnvironment = '3';
     }
    vrDepChangeStatus = 0;
    //$('#chkRedbook').val(parseInt(rowdata.IsRedbookUpdated));
   // $('#chkCommSvn').val(parseInt(rowdata.IsCommitted));
    $("#iddeployversion").val(rowdata.Version);
    $("#iddeploysvn").val(rowdata.SVNNo);
    $("#iddeployemail").val(rowdata.EmailID);
   $("#idFilepath").val( rowdata.URL);
 $("#idFilepath").val( rowdata.URL);
   $("#idFilepath").val(rowdata.URL);
    if (parseInt(rowdata.Status) == "2")
    {
        $("#slstatus option[value='2']").remove();
        $("#slstatus").append('<option value=2>Deployed</option>');
    }
   $("#slstatus").val(parseInt(rowdata.Status));
   $('#txtcomment').val(rowdata.Comments);
   _vrChecklistID = rowdata.CheckListID;
   var vrRemFiles = rowdata.BlnFileDetailsRemember;
  // if (vrRemFiles == true)
   //{
       $("#chkRemmemberFiles").prop("checked", true);
   //}
       $('#dailog').dialog('option', 'title', _vrEditDeploy);
       $("#slstatus").attr("disabled", false);
       if (parseInt(rowdata.Status) > 0)
       {
           if(_UserRoleId=="1")
           {
               $("#slstatus").attr("disabled", false);
               $('#txtcomment').attr("disabled", false);
               $("#idFilepath").attr("disabled", false);
               $("#iddeployemail").attr("disabled", false);
               $("#iddeployversion").attr("disabled", false);
               $("#iddeploysvn").attr("disabled", false);
               $('input[name=Deployment]').attr('disabled', false);
               $('#chkCommSvn').prop('disabled', false);
               $('#chkRedbook').prop('disabled', false);
               $("#deployaddrowbutton").attr("disabled", false);
               $("#deploydeleterowbutton").attr("disabled", false);
               $("#btnDepClose").css("display", "none");
               $("#btnDepUpdate").css("display", "inline");
               $("#btnDepReset").css("display", "inline");
           }
           else
           {
               $("#slstatus").attr("disabled", true);
               $('#txtcomment').attr("disabled", true);
               $("#idFilepath").attr("disabled", true);
               $("#iddeployemail").attr("disabled", true);
               $("#iddeployversion").attr("disabled", true);
               $("#iddeploysvn").attr("disabled", true);
               $('input[name=Deployment]').attr('disabled', true);
               $('#chkCommSvn').prop('disabled', true);
               $('#chkRedbook').prop('disabled', true);
               $("#deployaddrowbutton").attr("disabled", true);
               $("#deploydeleterowbutton").attr("disabled", true);
               $("#btnDepClose").css("display", "inline");
               $("#btnDepUpdate").css("display", "none");
               $("#btnDepReset").css("display", "none");
               vrEmpDeployDisableGrid = 1;
           }
       }
   _vrDialogBoxTitle = _vrEditDeploy;
   //if (rowdata.Status == 0) {
   //    $("#ddldeploymentProject").attr('disabled', false).trigger("chosen:updated");
   //    $('#ddldeploymentTask').attr('disabled', false).trigger("chosen:updated");
   //}
   //else {
       //$("#ddldeploymentProject").attr('disabled', true).trigger("chosen:updated");
       //$('#ddldeploymentTask').attr('disabled', true).trigger("chosen:updated");
    // }
    event.preventDefault();
  // event.returnvalue = false;
}
var linkrenderer_deployStatus = function (row, column, value) {
    return linkrenderdeploystatus('jqxDeployGrid', row, column, value);
}
function linkrenderdeploystatus(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var status = JSON.stringify(rowdata['Status']).toString();
            if (status == 0) {
                return "New";
            }
            else if (status == 1) {
                return "To be deployed";
            }
            else if (status == 2) {
                return "Deployed";
            }
        }
    } catch (e) {

    }
}
var linkrenderer_deployEnv = function (row, column, value) {
    return linkrenderdeployEnv('jqxDeployGrid', row, column, value);
}
function linkrenderdeployEnv(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var environment = JSON.stringify(rowdata['Environment']).toString();
            if (environment == 1) {
                return " Test ";
            }
            else if (environment == 2) {
                return " Live ";
            }
            else if (environment == 3) {
                return " Staging ";
            }
        }
    } catch (e) {

    }
}

function validateChosen() {
    var vrValProj = $('#ddldeploymentProject').val();
    var VrValTask = $('#ddldeploymentTask').val();
    var vrValApplication = $('#ddldeploymentApplication').val();
    if (vrValProj == 0 || vrValProj== null) {
        $(".clsnewdeployvaluefields").find("#ddldeploymentProject_chosen").find(".chosen-single").addClass("error");
    }
    else {
        $(".clsnewdeployvaluefields").find("#ddldeploymentProject_chosen").find(".chosen-single").removeClass("error");
    }

    if (VrValTask == null || VrValTask == null) {
        $(".clsnewdeployvaluefields").find(".chosen-choices").addClass("error");
    }
    else {
        $(".clsnewdeployvaluefields").find(".chosen-choices").removeClass("error");
    }
    if (vrValApplication == 0 || vrValApplication==null) {
        $(".clsnewdeployvaluefields").find("#ddldeploymentApplication_chosen").addClass("error");
    } else {
        $(".clsnewdeployvaluefields").find("#ddldeploymentApplication_chosen").removeClass("error");
    }
    if ($('.error').length > 0) {
        $("#errNewDeployError").css("display", "inline");
        return false;
    }
    else {
        return true;
    }
        
    }
var linkrenderer_deployStatus = function (row, column, value) {
    return linkrenderdeploystatus('jqxDeployGrid', row, column, value);
}
function linkrenderdeploystatus(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var status = JSON.stringify(rowdata['Status']).toString();
            if (status == 0)
            {
                return '<span style="margin: 4px; line-height: 1.9;">'+"New"+'</span>';
            }
            else if (status==1)
            {
                return '<span style="margin: 4px; line-height: 1.9;">' + "To be deployed" + '</span>';
            }
            else if (status == 2)
            {
                return '<span style="margin: 4px; line-height: 1.9;">' + "Deployed" + '</span>';
            }
        }
    } catch (e) {

    }
}
var linkrenderer_deployEnv = function (row, column, value) {
    return linkrenderdeployEnv('jqxDeployGrid', row, column, value);
}
function linkrenderdeployEnv(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var environment = JSON.stringify(rowdata['Environment']).toString();
            if (environment == 1) {
                return '<span style="margin: 4px; line-height: 1.9;">' + "Test" + '</span>';
            }
            else if (environment == 2) {
                return '<span style="margin: 4px; line-height: 1.9;">' + "Live" + '</span>';
            }
            else if (environment == 3) {
                return '<span style="margin: 4px; line-height: 1.9;">' + "Staging" + '</span>';
            }
        }
    } catch (e) {

    }
}
function checkBtnResizePositionInDeploy(checkBtnName, btnresizecount) {
    if (btnresizecount == 0) {//Calls during resizing of widget
        $(".clsdeploystatus").css("margin-left", "10px");
        $("#txtDeploySearch").css("margin-left", "10px");
        $("#btnDeployResetSearch").css("margin-right", "135px");
        btnresizecount++;
        _vrBtnDeployResize = btnresizecount;
    }
    else {//Goes to this condition upon minimizing widget. 
        $(".clsdeploystatus ").css("margin-left", "0px");
        $("#txtDeploySearch").css("margin-left", "157px");
        $("#btnDeployResetSearch").css("margin-right", "-10px");
        btnresizecount--;
        _vrBtnDeployResize = btnresizecount;
    }
}
function loadJqxDeployMagifyClickGrid() {
    bindDataToJqx("jqxDeployGrid", _vrDeployData, _vrDeployColumns, _vrMagnifyDeployGridWidth);
}
function refreshDeploymentGrid() {
    _deployIndexNO = -1; //clear the value of user preferences value
    _vrLocalDeployData = null;// clear the localstorage value
    $("#txtDeployToDate").datepicker("setDate", new Date());
    $("#txtDeployFromDate").datepicker("setDate", -1);
    var vrMinDate= $("#txtDeployFromDate").val();
    $("#txtDeployToDate").datepicker('option', 'minDate', vrMinDate);
    $("#txtDeploySearch").val("");
    $("#ddlDeploystatus").val("");
    FilterDeploymentDetail();
}
function SearchDeploment() {
    filterDeployJqxGrid();
}
function LoadDeployDetails() {
    setTimeout(function () {
        filterDeployJqxGrid();
    }, 5);
}
function filterDeployJqxGrid() {
    $("#divDeployLoading").css("display", "block");
    try {
        var vrDeployStatus = $("#ddlDeploystatus").val();
        var vrDeployProj = $("#txtDeploySearch").val().toLowerCase();
        var vrDynDeployData = _vrDeployData;
        var vrDynDeployLocalData = _vrDeployData.localdata;
        var vrFilteredData = vrDynDeployLocalData;
        if (vrDeployStatus != null && $("#ddlDeploystatus").val().length != 0) {
            vrFilteredData = jQuery.grep(vrDynDeployLocalData, function (element, index) {
                return element.Status == parseInt(vrDeployStatus); // retain appropriate elements
            });
        }
        if ($.trim(vrDeployProj).length > 0) {
            vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
                return element.ProjectName.toLowerCase().indexOf(vrDeployProj) > -1; // retain appropriate elements
            });
        }
        if ($.trim(vrDeployProj).length == 0 && $("#ddlDeploystatus").val().length == 0) {
            vrFilteredData = vrDynDeployLocalData;
        }
        vrDynDeployData.localdata = vrFilteredData;
        $("#jqxDeployGrid").jqxGrid({ source: _vrDeployData });
        _vrDeployData.localdata = vrDynDeployLocalData;
        disableJqxPagerButtonsOnLoad('jqxDeployGrid');
        $("#divDeployLoading").css("display", "none");

    } catch (e) {
        $("#divDeployLoading").css("display", "none");
    }
}
function LoadDeploymentCountDetails() {
    _BaseUrl = _vrLocationOrigin + '/Project/GetChecklistStatusCount?strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindDeployRecordsCount);//Count of Customers,Users and projects.
}
function bindDeployRecordsCount(source) {
    var data = source;
    $("#lblNewDeployDisplayCount").text(data[0].Status);
    $("#lblDeployedDisplayCount").text(data[2].Status);
    $("#lblTobeDeployDisplayCount").text(data[1].Status);
}


//To formatize created on date.
var linkrenderer_deployCreatedOn = function (row, column, value) {
    return linkrenderdeploycreatedon('jqxDeployGrid', row, column, value);
}
var linkrenderdeploycreatedon = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null && typeof rowdata['CreatedDate'] != 'undefined') {
        var vrFileName = rowdata['CreatedDate'];
        var _vrCretedOnSplit = vrFileName.split(' ');
        var _vrDateSplit = _vrCretedOnSplit[0].split('/');
        var _vrDate = _vrDateSplit[1] + '/' + _vrDateSplit[0] + '/' + _vrDateSplit[2];
        var _vrFinalDate = _vrDate + ' ' + _vrCretedOnSplit[1];
        //return _vrFinalDate;
        return "<div class='clscustcompanyvalues clsaddellipsis' title='" + _vrFinalDate + "'> " + _vrFinalDate + "</div>";
    }
}