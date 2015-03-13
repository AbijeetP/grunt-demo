var _vrProjectIDedit = ""; var _vrUpdateComment = "";
var _EmpId = '',_UserRoleId='';
var _vrTaskPriorityId = '';
var _vrTaskStatusId = '';var _vrUpdatedStatus = "";
var _vrTaskStatus = '',_vrEditTaskDetails="";
var _vrInformTo = '', _vrInformToText = '', _ArrModule, _vrAssignedTo = '', _vrBeyondScope = '', _vrAssignedTo = '', _vrDueDate = '', _vrMyScore = 0, _vrTaskHistoryID = '', _vrUpdatedInformToText = '';
var _vrTaskModule = '', _vrEditTaskOwnerName="";
var _vrFlag = '1';
var _BaseUrl = '';
var _TskStatus, _TaskId, _tskSt, _TskSubject, _BillableHours;
var _BugId = '', _BugProjectId = '';
var _Brpointstype = '', _BrPositive = '', _BrNegative = '';
var _vrProjVersionNum=''
var _Score, _HighestScore=0;
var sourceGrid;
var _intDataFlag = 0;
var _ArrStatus = ["In Progress", "Planned", "Bugs"];//This is also using in below code.Verify before modifying array indexed.
var _arrStatusCount = [0, 0, 0];
var _vrTaskStatus = "";
var _vrEditSprintID = "";
var _vrEditAssignedTo = "";
var _vrEditModuleName = "";
var _vrEditInformTo = "";
var _vrEditCustomerID = "";
var _vrTaskOwnerID = "";
var tskdetaileidting = "";
var _vrEditTaskStatusID = ""; var _vrEditProjManager="";
var taskDate = "";
$(document).ready(function () {
    $('#txtSearchBug').keypress(function (event) {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            return true;
        }
        else {
            return false;
        }
    });
    $("#btnUpdateTask").on('click', function () {
        var flUpload = $("#flNewTskAttachFile").val();
        if (flUpload.length != 0) {
            $("#ddlNewTskInformTo").val('');
            _BaseUrl = _vrLocationOrigin + '/Task/ToFilesUpload?strPicFileName=' + _DefaultAttachedFileName + '&strTokenID=' + _vrUserTokenId;
            uploadFile(_BaseUrl, updateTask, 'flNewTskAttachFile');
        } else {
            $("#ddlNewTskInformTo").val('');
            updateTask();
        }
    })
    // method for togling images based on the click on image
    $(".gridster").on('click',"#idSelectAllimg", function () {
        $("#ddlBugStatus").jqxDropDownList('checkAll');
        $("#idSelectAllimg").css("display", "none");
        $("#idUnselectAllimg").css("display","inline");
    });
    $(".gridster").on('click', "#idUnselectAllimg", function () {
        $("#ddlBugStatus").jqxDropDownList('uncheckAll');
        $("#idUnselectAllimg").css("display", "none");
        $("#idSelectAllimg").css("display", "inline");
    });
    //end of image togling functionality
    $("#imgedittsk").on('click', function () {
        $("#txtTaskComments").val('');
        var tskdetail = $("#imgedittsk").attr("value");
        var Splittskdetail = tskdetail.split(',');
        _vrTaskStatus = "update";
        // taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
        _vrEditTaskDialog = 1;
        _vrEditTaskFlagSprint = 1;
        createNewTask(_vrTaskStatus);
        _vrUpdatedStatus = 1;
    });
    
    //if (_vrEditTaskDialog == 1) {
    //    if ($("#imgedittsk").attr("value").length>0) {
    //    var tskdetail = $("#imgedittsk").attr("value");
    //    var Splittskdetail = tskdetail.split(',');
    //    taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
    //}
    //}
    //function for filtering grid based on the bug id
    //$("#txtSearchBug").on('change', function () {
    //    var searchbugid = $("#txtSearchBug").val();
    //    var filterdata = _vrBugsData.localdata;
    //    var vrBugLocalData = filterdata;
    //    var vrFilterBugdata = filterdata;
    //    if (searchbugid.length > 0) {
    //        vrFilterBugdata = jQuery.grep(filterdata, function (element, index) {
    //            var vrelement = "";
    //            return element.Bugid; // retain appropriate elements
    //        });
    //    }
    //    _vrBugsData.localdata = vrFilterBugdata;
    //    $("#jqxBugTrial").jqxGrid({ source: vrFilterBugdata });
        
           
    //});
    $(".gridster").on("click", "#btnRefreshBugTrailGrid", function () {
        _BTIndexNO = -1;
        $("#idBugTrailLoading").css("display", "block");
        $("#ddlBugTrTaskName").empty();
        $("#ddlBugTrTaskName").append("<option value='0'>Select task</option>");
        $("#chkHoldBugs").prop("checked", false);
        setDefaultValuesBugTrail();
        bindDataToBugDropDownDyn();
        BindValuesToBugFields();
        FilterBugTrail();
        bindBugStatus();
        $("#idBugTrailLoading").css("visibility", "none");
    });
    $("#divBugAttachedFiles").on("click", ".clsupdatedfileremove", function () {
        var vrStrikenVal = $(this).closest('.clshrefupdatedbug').find('a').prop("title");
        $(this).closest('.clshrefupdatedbug').addClass('clsremovefileonupdate');
        $(this).css("display", "none");
        $(this).closest('.clshrefupdatedbug').find('.clsfileremovecancel').css("display", "inline");

    });
    $("#divBugAttachedFiles").on("click", ".clsfileremovecancel", function () {
        var vrStrikenVal = $(this).closest('.clshrefupdatedbug').find('a').prop("title");
        $(this).closest('.clshrefupdatedbug').removeClass('clsremovefileonupdate');
        $(this).css("display", "none");
        $(this).closest('.clshrefupdatedbug').find('.clsupdatedfileremove').css("display", "inline");
    });

    $("#txtBugSearch").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

});
//Binds tasks to tasks jqx grid.
//$(document).ready(function () {
//    $(".gridster").on("click", "#btnRefreshBugTrailGrid", function () {
//        $("#idBugTrailLoading").css("display", "block");
//        FilterBugTrail();
//        $("#idBugTrailLoading").css("visibility", "none");
//    });
//});
function bindJqxGrid(sourceGrid) {
    var vrSortColumnName='',vrSortOrder='';
    $("#idSpnLoading").css("display", "block");
    if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
        $("#imgNewTask").css("display", "none");
        $("#btnRefreshTasksGrid").css("margin-right", "80px");
        $("#btnExportTasks").css("margin-right", "-27px");
    }
    var result = '';
    if ($(".clsusertasks .clstasksfields").length == '0' && $("#MagnifierDialog .clstasksfields").length == '0') {
        return;
    }
    setLocalStorageFromDialog("jqxTasksgrid", _vrProjectsTasksWidth);
    //var vrTaskUserPref = (JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid")));
    //  vrTaskUserPref.width = _vrProjectsTasksWidth;
    //localStorage.setItem("jqxGridjqxTasksgrid", JSON.stringify(vrTaskUserPref));
    //    if (typeof localStorage.jqxGridjqxTasksgrid != 'undefined') {
    //    $("#jqxTasksgrid").jqxGrid('loadstate', JSON.parse(localStorage.jqxGridjqxTasksgrid));
    //}
    // checkTasksData(sourceGrid);
    // _arrStatusCount = [0, 0, 0];
    //  _vrFlag = '1';
    if (typeof sourceGrid != 'undefined') {
        if (typeof sourceGrid != 'undefined' && sourceGrid.RecordCount > 0) {
            result = sourceGrid.MultipleResults;
        } else if (typeof sourceGrid != 'undefined' && sourceGrid.RecordCount == 0) {
            result = [];
        } else if (typeof sourceGrid != 'undefined') {
            result = sourceGrid;
        }
    }
    else {
        result = [];
    }
    var colsort = sortingcolumns("jqxTasksgrid");
    vrSortColumnName = colsort.vrSortColumnName;
    vrSortOrder = colsort.vrSortOrder;

    _vrTasksData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _vrTasksDataFields,
        localdata: result,
        pagesize: _vrDefaultTaskSizer
        // pagesizeoptions: "2",
    };
    //if ((JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"))).pagenum >0 ) {
    //    $("#jqxTasksgrid").jqxGrid('gotopage', _vrPageNumForWidget);
    //}else{
    // initialize jqxGrid

    $("#jqxTasksgrid").jqxGrid(
    {
        width: _vrProjectsTasksWidth,
        // minWidth: 840,
        source: _vrTasksData,
        //selectionmode: 'multiplerowsextended',
        sortable: true,
        pageable: true,
        pagerbuttonscount:3,
        autoheight: true,
        enabletooltips: true,
        pagermode: 'simple',
        filterable: true,
        autosavestate: true,
        autoloadstate: true,
        columns: _vrTasksColumns,
        columnsresize: true
    });
    //  pagerDisplay();
    disableJqxPagerButtonsOnLoad('jqxTasksgrid');
    $("#jqxTasksgrid").on("pagechanged", function (event) {
        disableEnablePagingButtons("jqxTasksgrid", event);
    });
    filterTaskTrailSprintDataJqxGrid();
    //loadsTasksCount();
    bindLoggedUserTaskCount();
    $(".clsslideinner").find('button').prop("disabled", false);
    if ((_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId) && _vrUserIsProjManager == false) {
        $("#lnkNewTask").css("color", "#B3BFCB");
        $("#imgNewTask").css("display", "none");
        $("#btnRefreshTasksGrid").css("margin-right", "80px");
        $("#btnExportTasks").css("margin-right", "-22px");

    }
        
    $("#idSpnLoading").css("display", "none");
    $("#imgTasksMagnify").attr("disabled", false);
        
    setRecordCountPosition("jqxTasksgrid");//To set pager count position in jqxgrid up on dynamically adding.
    sortOrderUserPref("jqxTasksgrid", vrSortColumnName,vrSortOrder);
    //      $("#jqxTasksgrid").jqxGrid().setGridParam({
    //          sortname: 'TaskName,', sortorder:
    //'desc'
    //      }).trigger("reloadGrid");
}
 
// var autosavestate = $('#jqxTasksgrid').jqxGrid('autosavestate');
// }

//Binds bugs list to bug trail jqx grid.
function bindBugTrial(sourceGrid) {
    var vrSortColumnName = '', vrSortOrder = '';
    $("#idBugTrailLoading").css("display", "block");
    var result = [];
    if ($(".clsbugtrail #idBugTrail").length == '0' && $("#MagnifierDialog #jqxBugTrial").length == '0') {
        return;
    }
        
    if (typeof sourceGrid != 'undefined') {
        if (typeof sourceGrid != 'undefined' && sourceGrid.RecordCount > 0) {
            result = sourceGrid.MultipleResults;
        } else if (typeof sourceGrid != 'undefined' && sourceGrid.RecordCount == 0) {
            result = [];
        } else if (typeof sourceGrid != 'undefined') {
            result = sourceGrid;
        }
    }
    else {
        result = [];
    }
    setLocalStorageFromDialog("jqxBugTrial", _vrProjectsTasksWidth);
    if ($("#MagnifierDialog #idBugTrail").length > 0 && _vrTskOpenBugDialog == 0) {
        loadJqxBugGrid(result);
    }
    else if ($("#MagnifierDialog #idTskOpenBugTrail").length > 0 && _vrTskOpenBugDialog == 1) {
        _vrBugsData =
       {
           datatype: "json",
           type: "GET",
           cache: false,
           datafields: _vrBugDataFields,
           localdata: result,
           pagesize: _vrDefaultBugSizer,

       };

        // initialize jqxGrid task bug grid
        $("#jqxTskBugTrial").jqxGrid(
        {
            width: _vrProjectsMagTasksWidth,
            source: _vrBugsData,
            sortable: true,
            pageable: true,
            pagerbuttonscount: 3,
            autoheight: true,
            enabletooltips: true,
            pagermode: 'simple',
            filterable: true,
            autosavestate: true,
            autoloadstate: true,
            columns: _vrBugTrailColumns,
            columnsresize: true,
            pagesize:14
        });
        disableJqxPagerButtonsOnLoad('jqxTskBugTrial');
        $("#jqxTskBugTrial").on("pagechanged", function (event) {
            disableEnablePagingButtons("jqxTskBugTrial", event);
        });
        $("#jqxTskBugTrial").jqxGrid('refreshData');
    }
    else {
        var colsort = sortingcolumns("jqxBugTrial");
        vrSortColumnName = colsort.vrSortColumnName;
        vrSortOrder = colsort.vrSortOrder;
        _vrBugsData =
       {
           datatype: "json",
           type: "GET",
           cache: false,
           datafields: _vrBugDataFields,
           localdata: result,
           pagesize: _vrDefaultBugSizer,
              
       };

        // initialize jqxGrid
        $("#jqxBugTrial").jqxGrid(
        {
            width: _vrProjectsTasksWidth,
            source: _vrBugsData,
            sortable: true,
            pageable: true,
            pagerbuttonscount: 3,
            autoheight: true,
            enabletooltips: true,
            pagermode: 'simple',
            filterable: true,
            autosavestate: true,
            autoloadstate:true,
            columns: _vrBugTrailColumns,
            columnsresize: true
        });
        disableJqxPagerButtonsOnLoad('jqxBugTrial');
        $("#jqxBugTrial").on("pagechanged", function (event) {
            disableEnablePagingButtons("jqxBugTrial", event);
        });
    }
    LoadBugsOnBugClick();
    $("#idTskBugTrailLoading").css("display", "none");
    $("#idBugTrailLoading").css("display", "none");
    $("#imgBugTrMagnify").attr("disabled", false);
    $(".clsslideinner").find('button').prop("disabled", false);
    setRecordCountPosition("jqxBugTrial");//To set pager count position in jqxgrid up on dynamically adding.
    sortOrderUserPref("jqxBugTrial", vrSortColumnName, vrSortOrder);
}

//Renders for every row binding to jqxtasksgrid.
var linkrenderer_task = function (row, column, value) {
    return linkrendertask('jqxTasksgrid', row, column, value);
}
var linkrenderer_taskname = function (row,column,value) {
    return linkrendertaskname('jqxTasksgrid', row, column, value);
}


var linkrenderer_timeformat = function (row, column, value) {
    var valRes = typeof value == 'undefined' || $.trim(value).length == 0 ? _vrDefaultFmt : value.toString();
    var valFormat =displayFormat(valRes);
    return "<div class='clsformatfields' title='" + valFormat + "'>" + valFormat + "</div>";
}
//var linkrenderer_addclass = function (row,column,value) {
//    return "<div class='clsformatfields'>" + value + "</div>";
//}
//Calls this function at the time of binding tasks to the jqxtasks grid.
function linkrendertask(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            _TaskId = JSON.stringify(rowdata['TaskID']).toString();
            _TskSubject = JSON.stringify(rowdata['TaskName']).toString();
            _TskSubject = _TskSubject.replace(/'/g, "#%&%#");
            _TskSubject = JSON.stringify(_TskSubject);
            //_vrTskSubject = _TskSubject;
            //_TskSubject = convertDoubleSingleQuotetoChar(rowdata['TaskName']);
            _TskProjId = JSON.stringify(rowdata['TaskProjectID']).toString()
            _BillableHours = typeof rowdata['BillableHours'] !== 'undefined' ? JSON.stringify(rowdata['BillableHours']).toString() : '0';
            _vrTaskStatus = rowdata['StatusType'].toString();//).replace(/\s+/g, "");;

        }
        return "<img title='" + _vrTaskStatus + "'src='img/" + _vrTaskStatus + ".ico' class='clsstatusimginner'/><a class='clstaskidlink' href='#' onclick='taskLink(" + _TaskId + "," + _TskProjId + "," + _TskSubject + ")'>" + _TaskId + "</a>";
    } catch (e) {

    }
}
//Renders for every bug binding to bug jqx grid.
function linkrendertaskname(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            _TaskId = JSON.stringify(rowdata['TaskID']).toString();
            _TskSubject = JSON.stringify(rowdata['TaskName']).toString();
            var vrtskSubShow = rowdata['TaskName'];
            _TskSubject = _TskSubject.replace(/'/g, "#%&%#");
            _TskSubject = JSON.stringify(_TskSubject);
            //_TskSubject = convertDoubleSingleQuotetoChar(rowdata['TaskName']);
            _TskProjId = JSON.stringify(rowdata['TaskProjectID']).toString()
            _BillableHours = typeof rowdata['BillableHours'] !== 'undefined' ? JSON.stringify(rowdata['BillableHours']).toString() : '0';
            _vrTaskStatus = rowdata['StatusType'].toString();//).replace(/\s+/g, "");;

        }
        return "<div class='clstsktrltaskname clsaddellipsis'><a  href='#' onclick='taskLink(" + _TaskId + "," + _TskProjId + "," + _TskSubject + ")'>" + vrtskSubShow + "</a></div>";
    } catch (e) {

    }
}


var linkrenderer_Bug = function (row, column, value) {
    if (_vrTskOpenBugDialog == 0) {
        return linkrenderbug('jqxBugTrial', row, column, value);
    }
    else {
        return linkrenderbug('jqxTskBugTrial', row, column, value);
    }
}

//Calls this function at the time of binding bugs to the bug jqx grid.
function linkrenderbug(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata.RecordCount != 0) {
            _BugId = JSON.stringify(rowdata['Bugid']).toString();
        
            //_BugProjectId = JSON.stringify(rowdata['ProjectID']).toString();
        }

    
        return "<a  href='#' class='clsbugidlink' onclick='bugLink(" + _BugId + ")'>" + _BugId + "</a>";
    } catch (e) {

    }
}
var linkrenderer_BugDesc = function (row, column, value) {
    //var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    // if (rowdata.RecordCount != 0) {
    // var BugDscrp = JSON.stringify(rowdata['BugDscrptn']).toString();
    // BugDscrp = "" + BugDscrp.replace(/\</g, "<span><</span>").replace(/\>/g, "<span>></span>");
       
    //}
    // return BugDscrp;
    var BugDscrp = value.replace(/\</g, "<span><</span>");
    return "<div class='clsbugdscrpalign'>" + BugDscrp + "</div>";
      
}

//function to get logged in employee is project manager are not 


 
function taskBRLink(taskId, taskProjId, taskSubject) {//Triggers at the time of clicking task name in billing report grid to get the pagenum of billing report
    _vrLocalBRDataOnTaskClick = null;
    _vrLocalBRDataOnTaskClick = JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"));
    taskLink(taskId, taskProjId, taskSubject);
}

function getEditProjectManager(data) {
    var source = data;
    _vrEditProjManager = data[0].IsProjectManager;
    if (vrLoginRoleId == 1 || _vrEditProjManager == true) {
        $("#imgedittsk").css("display", "inline");
        $(".clsShowOpnBugs").css("margin-left", "10px");
        $("#lblBeyondScope").css("margin-top", "6px");
    }
    else {
        $("#imgedittsk").css("display", "none");
        $("#lblBeyondScope").css("margin-top", "-2px");
        $(".clsShowOpnBugs").css("margin-left", "40px");
    }
}
function SummaryTaskLink(taskId, taskProjId, taskSubject) {
    _vrEditTaskDetails = 1;
    _vrattachedFiles = 1;
    taskLink(taskId, taskProjId, taskSubject);
}
//Triggers at the time of clicking on task id in task jqx grid..
function taskLink(taskId, taskProjId, taskSubject) {
    try {
        _vrUpdatedStatus ="";
        var pagenum = "";
		
        if ($("#txtTaskComments").length > 0) {
            $("#txtTaskComments").val('');
        }
        if ($("#txtCommInformTo").val().length > 0) {
            $("#txtCommInformTo").val('');
        }
        $("#ddlNewTskInformTo").val('');

        var vrDialogTitle = $("#MagnifierDialog").dialog("option", "title");
        if (vrDialogTitle == _vrUserDetDialogHdr) {
            _vrTaskDataOnCPUOnTaskClick = null;
            _vrTaskDataOnCPUOnTaskClick = $("#jqxPreviewGrid").jqxGrid('getpaginginformation');
        }

        $("#divMainLoader").css("display", "inline");

        //if (taskProjId.indexOf('"') == -1) {
        //    taskProjId =+'"'+ taskProjId+'"';
        //}
        var _vrEditTaskID = taskProjId.toString();
        _BaseUrl = _vrLocationOrigin + '/Task/GetProjectManagerDetails?strProjectID=' + _vrEditTaskID + '&strEmpID=' + _EmpId;
        ajaxCall(_BaseUrl, getEditProjectManager);
        //    if ($(".clsusertasks #jqxTasksgrid").length == '0' && $(".clstasks").length > 0) {
        //    $(".clstasks").append($(".clstasksfields"));
        //    $('#MagnifierDialog').dialog('close');
        //    $("#jqxTasksgrid").jqxGrid({ pagesize: _vrDefaultTaskSizer });
        //}
        
        var taskdetails = "";
        taskdetails = taskId + ',' + taskProjId + ',' + taskSubject;
        $("#imgedittsk").attr("value", taskdetails);
        $("#btnResetComm").click();

        if (vrDialogTitle == _vrProjDetDialogHdr) {
            _vrTaskDataOnCPUOnTaskClick = null;
            _vrTaskDataOnCPUOnTaskClick = $("#jqxPreviewGrid").jqxGrid('getpaginginformation');
        }
        _vrLocalTaskDataOnTaskClick = null;
        _vrLocalTaskDataOnTaskClick = JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"));
        $("#btnResetComm").click();
        

        //Fetches all comments using task id.
        _BaseUrl = _vrLocationOrigin + '/Task/GetTaskHistoryDataUsingTaskID?intTaskID=' + taskId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindComments);
        $("#lblTaskId").text(taskId);

        taskSubject = taskSubject.replace(/#%&%#/g, "'");
        _vrTxtTskId = taskId;
        _vrTxtOpenBugTaskId = taskId;
        //taskSubject = convertCharToDoubleSingle(taskSubject);
        var check = checkJson(taskSubject);
        if (check) {
            var vrTaskName = JSON.parse(taskSubject);
        }
        else {
            var vrTaskName= taskSubject;
        }
        $("#lblTskSubject").text(vrTaskName);
        $("#txtTskProjId").text(taskProjId);
        _vrTxtTskProjId = taskProjId;
        _vrMailTaskName = vrTaskName;
        $('#dailog').dialog('open');
        //$('#dailog').dialog({
        //    modal: false
        //});
        $(".clsdailogfields").css("display", "none");
        $("#idShowTaskComments").css("display", "inline-block");
        $('#dailog').dialog('option', 'title', _vrDialogBoxTaskTrail + " " + ": " + taskId + " " + "-" + " " + vrTaskName);
        _vrTskSubject = vrTaskName;
        _vrDialogBoxTitle = _vrDialogBoxTaskTrail;
        //Fetches some fields values like due date,billable hours,effort planned etc of particular task.
        _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingTaskID?intTaskID=' + taskId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, getTaskHistoryForComments);
        _vrOpenBugs = 0;
        _BaseUrl = _vrLocationOrigin + '/task/GetOpenBugs?intTaskID=' + taskId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl,getOpenBugsCount);
        //$(".clsAddCommDialogFields").css("display", "none");
        //$(".clsshowcomments").css("display", "block");
        $('#idInnerShowComments').scrollTop(0);
 $("#ddlAssTask").empty();
        $("#ddlAssTask").append("<option value='0'>Select task</option>");
        _BaseUrl = _vrLocationOrigin + '/Task/GetAssociatedTaskDetails?intTaskID=' + taskId + '&&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskAssociate);
        
        
        
        event.preventDefault();
    } catch (e) {

    }

}
function checkJson(data) {
    try {
        JSON.parse(data);
        return true;

    }
    catch (e) {
        return false;
    }
}
function getOpenBugsCount(data) {
    $("#lblShowOpenBugs").text("0");
    if(typeof data != 'undefined'){
        var source = data;
        _vrOpenBugs = data[0].BugCount;
        $("#lblShowOpenBugs").text(_vrOpenBugs);
    }
}

function bindFixedBugsCount(data) {
    if(typeof data != 'undefined' && data.length != 0){
        var source = data[0];
        $("#lblHdrBugsOpen").text(source.BugCount);
    }
}
//Fetches data of certain bug according to bug id.
function bugLink(bugId) {
    try {
        $("#divMainLoader").css("display", "inline");
        _vrLocalBTDataOnBugClick = null;
        _vrLocalBTDataOnBugClick = JSON.parse(localStorage.getItem("jqxGridjqxBugTrial"));
        clearBugDetailsFields();
        if (_vrTskOpenBugDialog == 1) {
            _vrTskddlProjId = $("#ddlTskOpenBugTrProject").val();
            _vrTskddlTaskId = $("#ddlTskOPenBugTrTaskName").val();
            _vrTskddlStatus = $("#ddlTskOpenBugStatus").val();
            _vrTskddlEmpName = $("#ddlTskOpenBugTrEmp").val();
            _vrTskblnProjId = _vrTskddlProjId == '0' ? false : true;
            _vrTskblnTaskId = _vrTskddlTaskId == '0' ? false : true;
            _vrTskblnStatus = _vrTskddlStatus == '0' ? false : true;
            _vrTskblnEmpName = _vrTskddlEmpName == '0' ? false : true;
            _vrTskBugTrFromDate = $("#txtTskOpenBugTrFromDate").val();
            _vrTskBugTrToDate = $("#txtTskOpenBugTrToDate").val();
        }
        _BaseUrl = _vrLocationOrigin + "/Bug/GetBugTrailData?intBugID=" + bugId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, BindBugFields);
        $("#btnUpdateBug").attr('disabled', true);
    
        event.preventDefault();
    } catch (e) {

    }
}
//adding function to fetching the data of certain bug details according to bug id showing in a dialog box...21_01_2015
function TaskbugLinkId(bugId)
{
    try {
       
        $("#divMainLoader").css("display", "inline");
        //clearBugDetailsFields();
        _BaseUrl = _vrLocationOrigin + "/Bug/GetBugTrailData?intBugID=" + bugId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, BindBugFieldsDetails);

        event.preventDefault();
       
    }
    catch (e) {

    }
}
function BindBugFieldsDetails(data)
{
    try {
        
           
        $("#divBugDetAttachedFiles").empty();
        $('#divBugRecorddetails').dialog('option', 'title', (_vrDialogBoxBugDetails + '#' + data[0].BugID));
        _vrDialogBoxTitle = _vrDialogBoxBugDetails;
          
        $("#divBugRecorddetails").css("display", "inline-block");
        $(".clsexistedbugfields").css("display", "inline-block");
        $(".clssavebug").css("display", "none");
        $('#divBugRecorddetails').dialog('open');
        _vrExistingBugTaskId = JSON.stringify(data[0].TaskID);
        _vrExistingBugProjId = JSON.stringify(data[0].ProjectID);
        _vrExistingBugTaskSubject = JSON.stringify(data[0].TaskName);
        _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + data[0].ProjectID + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagNewBugFields);
        var vrBrowsersData = data[0].Browsers.replace(/\,/g, ', ');
        //$("#ddlBugProjectName").val() = "";
        $("#lblBugIdDet").text(data[0].BugID);
        $("#txtBugProjectName").text(data[0].ProjectName);
        $("#txtBugDetTaskName").text(data[0].TaskName);
        $("#txtBugDetBugPriority").text(data[0].BugPriorityType);
        $("#txtBugDetBugSeverity").text(data[0].SeverityType);
        $("#txtBugDetBugType").text(data[0].BugType);
        $("#txtBugDetBugReproducible").text(data[0].BugReproducibleType);
        $("#txtBugDetBugStatus").text(data[0].BugStatusType);
        $("#txtBugDetCreatedDate").text(formatCommentsDate(data[0].CreatedDate));
        $("#txtBugDetCreatedBy").text(data[0].EmpFirstName);
        $("#txtBugDetBrowsers").text(vrBrowsersData);
        $("#txtBugDetComments").text(data[0].BugDscrptn);
        _vrNewBugAttachedFiles = typeof data[0].AttachedFiles == 'undefined' ? '' : data[0].AttachedFiles;
        if ($.trim(data[0].AttachedFiles).length > 0) {
            var vrAttachedFiles = data[0].AttachedFiles.split('~');
            for (var i = 0; i < vrAttachedFiles.length; i++) {
                if ($.trim(vrAttachedFiles[i]).length > 0) {
                    $("#divBugDetAttachedFiles").append("<div class='clshrefupdatedbug'><a href='" + _vrAttachedFilesPath + vrAttachedFiles[i] + "' title='" + vrAttachedFiles[i] + "' target='_blank'>" + CropTextHtml(vrAttachedFiles[i], _vrUpdateLimitFileName) + "</a></div>");//<img class='clsnewbugfileremove' src='img/closeicon.ico'>
                }
            }
        }

            
        $("#divMainLoader").css("display", "none");
        event.preventDefault();
    }
    catch (e) {

    }

}

//Data will be send and binds to bug fields.
function BindBugFields(data) {
    try {
        if(typeof data ==='undefined'){
            $("#divBugIdInfo").css("display", "inline");
            setTimeout(function () { $("#divBugIdInfo").fadeOut(); }, _vrSetTime);
            return;
        }
        if (_vrTskOpenBugDialog == 1) {
            _vrTskBugOpend = 1;
            $('#MagnifierDialog').dialog('close');   
        }
        //$("#ddlBugProjectName").val()="";
        clearBugDetailsFields();
        $("#divBugAttachedFiles").empty();
        $('#dailog').dialog('option', 'title', _vrDialogBoxBugDetails);
        _vrDialogBoxTitle = _vrDialogBoxBugDetails;
        $(".clsdailogfields").css("display", "none");
        $("#idShowBugDetails").css("display", "inline-block");
        $(".clsexistedbugfields").css("display", "inline-block");
        $(".clssavebug").css("display", "none");
        $("#idTskOpenBugTrail").css("display", "none");
        $('#dailog').dialog('open');
        if (_vrTskOpenBugDialog == 1) {
            $("#btnGoToTask").css('display', "none");
        }

        _vrExistingBugTaskId = JSON.stringify(data[0].TaskID);
        _vrExistingBugProjId = JSON.stringify(data[0].ProjectID);
        _vrExistingBugTaskSubject = JSON.stringify(data[0].TaskName);
        _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + data[0].ProjectID + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagNewBugFields);
        if (typeof data[0].Browsers !== 'undefined') {
            var vrBrowsersData = data[0].Browsers.replace(/\,/g, ', ');
            $("#txtBrowsers").val(vrBrowsersData);
        }
        else {
            $("#txtBrowsers").val();
        }
        //$("#ddlBugProjectName").val() = "";
        $("#lblBugId").text(data[0].BugID);
        if ($("#ddlBugProjectName option[value='" + data[0].ProjectID + "']").val() !== undefined) {
            $("#ddlBugProjectName").val(data[0].ProjectID);
        }
        $("#ddlNewBugPriority").val(data[0].BugPriorityID);
        $("#ddlNewBugSeverity").val(data[0].SeverityID);
        $("#ddlNewBugType").val(data[0].BugTypeID);
        $("#ddlNewBugReproducible").val(data[0].BugReproducibleID);
        $("#ddlNewBugStatus").val(data[0].BugStatusID);
        $("#txtBugCreatedDate").val(formatCommentsDate(data[0].CreatedDate));
        $("#txtBugCreatedBy").val(data[0].EmpFirstName);
        
        $("#txtBugComments").val(data[0].BugDscrptn);
    
        _vrNewBugAttachedFiles = typeof data[0].AttachedFiles =='undefined'?'':data[0].AttachedFiles;
        if ($.trim(data[0].AttachedFiles).length > 0) {
            var vrAttachedFiles = data[0].AttachedFiles.split('~');
            for (var i = 0; i < vrAttachedFiles.length; i++) {
                if ($.trim(vrAttachedFiles[i]).length > 0) {
                    $("#divBugAttachedFiles").append("<div class='clshrefupdatedbug'><a href='" + _vrAttachedFilesPath + vrAttachedFiles[i] + "' title='" + vrAttachedFiles[i] + "' target='_blank'>" + CropTextHtml(vrAttachedFiles[i], _vrUpdateLimitFileName) + "</a><img src='img/closeicon.ico' class='clsupdatedfileremove'/><img src='img/revert.ico' class='clsfileremovecancel'/></div>");//<img class='clsnewbugfileremove' src='img/closeicon.ico'>
                }
            }
        }
    
        //if ($(".clsbugtrail #idBugTrail").length == '0') {
        //    $(".clsInnerBugTrail").append($("#idBugTrail"));
        //    $('#MagnifierDialog').dialog('close');
        //}
        $("#divMainLoader").css("display", "none");
        event.preventDefault();
    } catch (e) {

    }

}

//Gets all employees those belong to particular project to show in inform to in add comment dialog box.
function getTaskRelEmps(source) {
    var data = source[0].LstProjectEmployees;
    var vrModuleData = source[0].LstModules[0];
    try {
        _vrInformToText = '';
        $("#ddlAssignTo").empty();
        $("#ddlCommInformTo").empty();
        $("#ddlCommInformTo").append("<option value='-1' text='Select'>Select inform to</option>");

        for (var i = 0; i < data.length; i++) {
            $("#ddlAssignTo").append("<option value=" + data[i].EmpID + ">" + data[i].EmpFirstName + "</option>");
            $("#ddlCommInformTo").append("<option value='" + data[i].EmpID + "'text='" + $.trim(convertDoubleSingleQuotetoNormalChar(data[i].EmpFirstName)) + "'>" + $.trim(data[i].EmpFirstName) + "</option>");
        }
        
        _vrInformToText = getInformPersonNames('ddlCommInformTo', _vrInformTo);//To show text in "inform to" text box in add comment box for particular task.
        $("#txtCommInformTo").val(_vrInformToText);
        $("#ddlAssignTo").val(_vrAssignedTo);
        bindModuleName(vrModuleData);
    } catch (e) {

    }
}

function getInformPersonNames(ddlMember,vrArrIdsToFetch) {
    var arrInformTo = vrArrIdsToFetch.split(',');
    var vrTextInformed = '';
    for (var i = 0; i < arrInformTo.length; i++) {
        if (arrInformTo[0].length > 0) {
            try {
                vrTextInformed += $("#"+ddlMember+" option[value=" + $.trim(arrInformTo[i]) + "]").text() + ', ';
            } catch (e) {

            }
        }
    }
    return vrTextInformed.substr(0, vrTextInformed.length - 2);
}
//Data containing billable hours,effort planned hours,due date etc. like individual fields and will binded in comments dialog box. 
function getTaskHistoryForComments(data) {
    data = data[0];
    var vrEffortPlanned = typeof data.ExpectedHours == 'undefined' ? '0' : data.ExpectedHours.toString();
    var vrBillableHours = typeof data.BillableHours == 'undefined'?'0':data.BillableHours.toString();
    var vrNonBillableHours = typeof data.NonBillableHours == 'undefined' ? '0' : data.NonBillableHours.toString();
    var vrTxtDueDate = typeof data.TaskDueDate == 'undefined' ? '' : data.TaskDueDate;

    $("#lblEffPlanned").text(displayFormat(vrEffortPlanned));
   
    $("#lblTotalBillable").text(displayFormat(vrBillableHours));
    $("#lblTotalNonBillable").text(displayFormat(vrNonBillableHours));
    $("#lblDueDate").text(vrTxtDueDate);
    cropText($("#lblProjName"), data.TaskProjectName, 15);
    _vrTxtTskProjName = '';
    _vrTxtTskProjName = data.TaskProjectName;
    //  $("#lblTaskOwner").text(data.TaskOwner);
    cropText($("#lblTaskOwner"), data.TaskOwner, 15);
    _vrMailTskPrjName = data.TaskProjectName;
    _vrMailTskOwnerName = data.TaskOwner;
    _vrMailTskOwnerID = data.OwnerID;
    //$("#lblTaskStatus").text(data.StatusType);
    _vrTaskPriorityId = data.TaskPriorityID;
    _vrTaskStatusId = data.TaskStatusID;
    _vrInformTo = data.InformTo;
    _vrAssignedTo = data.AssignedTo;
    fetchCommentFields();
var taskCrtDate = data.TaskCreatedDate.split(" ");
    var taskDate = taskCrtDate[0].split("/");
    _vrTaskCreatedDate = taskDate[1] + "/" + taskDate[0] + "/" + taskDate[2];
    TaskCreateDate();
}
function TaskCreateDate()
{
    var dates = $("#txtCommdate").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy',
      
        maxDate: "-1d",
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        beforeShow: function (textbox, instance) {
            instance.dpDiv.css({
                marginTop: '0px',
                marginLeft: (textbox.offsetWidth - ($(".ui-datepicker").width())) + 'px'
            });
        },
        onClose: function (e) {
            var ev = window.event;
            if (ev.srcElement.innerHTML == 'Clear')
                this.value = "";

        },
        closeText: 'Clear',
        buttonText: ''
    });

    $("#txtCommdate").datepicker('option', 'minDate', _vrTaskCreatedDate);
  }
//Binds modules to the module dropdown in add comment dialog box.
function bindModuleName(data) {
    $("#ddlSelectModule").empty();
    $("#ddlSelectModule").append("<option value=''>Select module</option>");
    bindArrayToDropDown(data.ModuleName, 'ddlSelectModule');
    if ($.trim(_vrTaskModule).length>0 && _vrTaskModule != '-1') {
        $("#ddlSelectModule").val(_vrTaskModule);
    } else {
        $("#ddlSelectModule").val('');
    }

}

//Inserts sum of hours  for this task based on getting task history id.
function updateTaskStatus(source) {
    var vrEffHrs = $("#txtCommMoreHours").val().length == 0 ? 0 : replaceColon($("#txtCommMoreHours").val());
    var vrBillHrs = $("#txtCommBillHours").val().length == 0 ? 0 :replaceColon($("#txtCommBillHours").val());
    var vrNonBillHrs = $("#txtCommNonBillableHours").val().length == 0 ? 0 : replaceColon($("#txtCommNonBillableHours").val());
    var vrLblEffPlan = replaceColon($("#lblEffPlanned").text());
    var vrLblBill = replaceColon($("#lblTotalBillable").text());
    var vrNonBill = replaceColon($("#lblTotalNonBillable").text());
    var vrSelectedModule = $("#ddlSelectModule").val();
    try {
        var vrLblEffort = parseFloat(vrLblEffPlan) + parseFloat(vrEffHrs);
        var vrTtlBill = parseFloat(vrLblBill) + parseFloat(vrBillHrs);
        var vrTtlNonBill = parseFloat(vrNonBill) + parseFloat(vrNonBillHrs);
        _vrTaskHistoryID = source.SingleResult.TaskHistoryID;
        var objTaskDetails = {
            TaskID: $("#lblTaskId").text(),
            TaskStatusID: $("#ddlStatus").val(),
            AnticipatedHours: vrLblEffort,
            TotalBillableHours: vrTtlBill,
            TotalNonBillableHours: vrTtlNonBill,
            InformTo: _vrUpdatedInformToText,
            TaskDueDate: $("#txtDueDate").val(),
            AssignedTo: $("#ddlAssignTo").val(),
            ModuleName: vrSelectedModule,
            TokenID:_vrUserTokenId

        }
        _BaseUrl = _vrLocationOrigin + '/Task/updateTaskStatus';
        ajaxCallWithObject(_BaseUrl, objTaskDetails, insertEstimation);
    } catch (e) {
        $("#divMainLoader").css("display", "none");
        displayMessage(_vrAlert, _vrSomeThingError)

    }
}
//Inserts hours those are entered for the particular comment.
function insertEstimation(source) {
 var vrCDate = $("#txtCommdate").val();
    var vrTime = "00:00:00"
    var vrTaskEstCreatedOn = "";
    if (vrCDate != "") {
        var vrCoDate = vrCDate.split("/");
        var vrCommDate = vrCoDate[2] + "-" + vrCoDate[1] + "-" + vrCoDate[0] + " " + vrTime;
        vrTaskEstCreatedOn = vrCommDate;
        _vrFlagReloadGraph = '1';
    }
    else {
         vrTaskEstCreatedOn = "";
    }
    var vrTtlBillHrs = replaceColon($('#lblTotalBillable').text());
    var vrTtlNonBillHrs = replaceColon($('#lblTotalNonBillable').text());
    var vrTtlTskHrs = parseFloat(vrTtlBillHrs) + parseFloat(vrTtlNonBillHrs);
    var vrName = localStorage.getItem("LoggedEmpName");
    var vrEmpName = vrName.split(" ");
    var vrEmpFName = vrEmpName[0];
    var vrLblTaskId = $("#lblTaskId").text();
    var vrBillHrs = $('#txtCommBillHours').val().length == 0 ? 0 : replaceColon($('#txtCommBillHours').val());
    var vrMoreHours = $("#txtCommMoreHours").val().length == 0 ? 0 : replaceColon($('#txtCommMoreHours').val());
    vrHrsNonBill = $("#txtCommNonBillableHours").val().length == 0 ? 0 : replaceColon($('#txtCommNonBillableHours').val());
    var vrTtlHrs = parseFloat(vrTtlTskHrs) + parseFloat(vrBillHrs) + parseFloat(vrHrsNonBill);
    vrTtlHrs= displayFormat(vrTtlHrs);
    var vrCreatedOn = "";//getCurrentDate();
    var vrAssignedBy = $("#lblLogin").text();
    var vrAssignedTo=$("#ddlAssignTo").val();
    var vrAssignedToName=$("#ddlAssignTo option:selected").text();
    var vrBillAccMailHRs = $.trim($('#txtCommBillHours').val()).length ==0?"00:00":$('#txtCommBillHours').val();
    var vrNonBillAccMailHrs = $.trim($('#txtCommNonBillableHours').val()).length == 0 ? "00:00" : $('#txtCommNonBillableHours').val();
    var vrValComments =$("#txtTaskComments").val();
    if($.trim($("#txtNonBillableComm").val()).length > 0){
        vrValComments +=  _vrNonBillMailComments + ":" + $("#txtNonBillableComm").val();
    
    }
    
    var objTaskEstimation = {
        TaskID: vrLblTaskId,
        TaskHistoryID: _vrTaskHistoryID,
        EmpID: _EmpId,
       // Date: vrCreatedOn,
        CreatedOn: vrTaskEstCreatedOn,
        BillableHours: vrBillHrs,
        NonBillableHours: vrHrsNonBill,
        MoreHours: vrMoreHours,
        TokenID: _vrUserTokenId,
        AssignedToID: vrAssignedTo,
        LoggedInEmpName: $("#lblLogin").text(),
        OwnerName: _vrMailTskOwnerName,
        AssignedToName: vrAssignedToName,
        StatusType: $("#ddlStatus option:Selected").text(),
        ProjectName: _vrMailTskPrjName,
        TaskName: _vrMailTaskName,
        Comments: vrValComments,
        OwnerID: _vrMailTskOwnerID,
        InformTo: _vrUpdatedInformToText,
        BillalbleAccHours: vrBillAccMailHRs,
        NonBillableAccHours: vrNonBillAccMailHrs,
        TotalHours: vrTtlHrs,
        EmpFirstName: vrEmpFName
    }

    _VrReloadEmpHours = _vrResponseId;//Setting value to reload billing hours.
    //To fetch monthly,weekly,daily billing status of logged in person 
    _vrCommentCreatedFlag = _vrResponseId;//To show comment inserted status.
    

    
    vrSaveCommentClick = 1;
    $("#btnResetComm").click();
    
    //To close dialog box for add comment by clicking on save and exit
    // FilterBugTrail();//For reloading bug trail
    if (_vrSaveExitClick == _vrSaveExitFlag) {
        $("#dailog").dialog('close');
        if ($("#MagnifierDialog").dialog("isOpen") === false) {
            $("#idSpnLoading").css("display", "block");
        }
        _BaseUrl = _vrLocationOrigin + '/Task/InsertTaskEstimation';
        ajaxCallWithObject(_BaseUrl, objTaskEstimation, reloadTasksGrid);
        _BaseUrl = _vrLocationOrigin + '/Task/GetBillingDetails?intEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindBillingHours);
    } else {
        _BaseUrl = _vrLocationOrigin + '/Task/InsertTaskEstimation';
        ajaxCallWithObject(_BaseUrl, objTaskEstimation, reloadComments);
    }
    _BaseUrl = _vrLocationOrigin + '/mobile/PrjctBugDetails?intEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFixedBugsCount);
}

//To reload comments after adding any comment.
function reloadComments() {
   
    if (_VrReloadEmpHours.length>0) {
        _BaseUrl = _vrLocationOrigin + '/Task/GetBillingDetails?intEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindBillingHours);
    }
    
    var vrLblTaskId = $("#lblTaskId").text();
    var vrTskSubject = JSON.stringify($("#lblTskSubject").text());
    var vrTskProjId = $("#txtTskProjId").text();
    taskLink(vrLblTaskId, vrTskProjId, vrTskSubject);
    if (_vrFlagReloadGraph == '1') {//  added by harish to load alloted -3 points into BR graph and score slider when billed for previous dates 
        loadBARData();
        LoadBARDataToSlider();
        _vrFlagReloadGraph = '0';
    }
}

//It is to bind status type like Planned, Inprogress etc to the dropdown in "Add Comment" dialog box.
function bindStatus(data) {  /// starting adding 16_01_2015
    //$("#ddlTskTrailStatus").jqxDropDownList({ checkboxes: true, source: data, displayMember: "StatusType", valueMember: "StatusId", scrollBarSize: 13, width: 130, height: 22, placeHolder: "Select status", promptText: "Select status" });
    //$("#ddlTskTrailStatus").jqxDropDownList('checkAll');
    //$("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', 5);
    //$("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', 7);
    //$("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', 8);
    //$("#ddlTskTrailStatus").jqxDropDownList('insertAt', 'Select all', 0);
    //$("#ddlTskTrailStatus").jqxDropDownList('setContent', 'Select status');
    //var DropDownitemsTaskStatus = $("#ddlTskTrailStatus").jqxDropDownList('getItems');
    //$("#ddlTskTrailStatus").on("checkChange", function (event) {
    //    var item = event.args.item;
    //    if (event.args.label == 'Select all' && (item.checked == true)) {
    //        for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
    //            $("#ddlTskTrailStatus").jqxDropDownList('checkIndex', index);
    //        }
    //    }
    //    else if (event.args.label == 'Select all' && (item.checked == false)) {
    //        for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
    //            $("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', index);
    //        }
    //    }
    //});
    $("#ddlTskTrailStatus").empty();
    $("#ddlStatus").empty();
    $("#ddlTskTrailStatus").append("<option value='0' title='Select status'>Select status</option>");

    for (var i = 0; i < data.length; i++) {
        var vrDataStatus = data[i].StatusType;
        //$("#ddlTskTrailStatus").empty();customerValuesLink(
        //$("#ddlStatus").empty();
        // $("#ddlTskTrailStatus").empty();
        $("#ddlTskTrailStatus").append("<option value=" + data[i].StatusId + ">" + vrDataStatus + "</option>");
        $("#ddlStatus").append("<option value=" + data[i].StatusId + ">" + vrDataStatus + "</option>");
    }
    if (_vrWidgetCOntrolData.length > 0) {
        if (_taskIndexNO > -1) {
            if ((parseInt(_vrWidgetCOntrolData[_taskIndexNO].ddlTskTrailStatus)) >= 0) {
                $("#ddlTskTrailStatus").val(_vrWidgetCOntrolData[_taskIndexNO].ddlTskTrailStatus);
            }
        }
    }
}

//function bindTaskStatusWidget(data) {
//    $("#ddlTskTrailStatus").jqxDropDownList({ checkboxes: true, source: data, displayMember: "StatusType", valueMember: "StatusId", scrollBarSize: 13, width: 130, height: 22, placeHolder: "Select status", promptText: "Select status" });
//    $("#ddlTskTrailStatus").jqxDropDownList('checkAll');
//    $("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', 5);
//    $("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', 7);
//    $("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', 8);
//    $("#ddlTskTrailStatus").jqxDropDownList('insertAt', 'Select all', 0);
//    $("#ddlTskTrailStatus").jqxDropDownList('setContent', 'Select status');
//    var DropDownitemsTaskStatus = $("#ddlTskTrailStatus").jqxDropDownList('getItems');
//    $("#ddlTskTrailStatus").on("checkChange", function (event) {
//        var item = event.args.item;
//        if (event.args.label == 'Select all' && (item.checked == true)) {
//            for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
//                $("#ddlTskTrailStatus").jqxDropDownList('checkIndex', index);
//            }
//        }
//        else if (event.args.label == 'Select all' && (item.checked == false)) {
//            for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
//                $("#ddlTskTrailStatus").jqxDropDownList('uncheckIndex', index);
//            }
//        }
//    });
//}
var checkindexbugtrail = 0;
function bindBugStatusWidget(data) {
    $("#ddlBugStatus").jqxDropDownList({ checkboxes: true, source: data, displayMember: "BugStatusType", valueMember: "BugStatusId", scrollBarSize: 13, width: 109, height: 24, placeHolder: "Select status", promptText: "Select status", autoDropDownHeight: true });
    //$("#ddlBugStatus").jqxDropDownList('insertAt', 'Select all', 0);
    $("#ddlBugStatus").jqxDropDownList('setContent', 'Select status');
    $("#ddlBugStatus").jqxDropDownList('checkAll');
    
  
    var DropDownitemsTaskStatus = $("#ddlBugStatus").jqxDropDownList('getItems');
    $("#ddlBugStatus").on("checkChange", function (event) {
        var item = event.args.item;
        //if (event.args.label == 'Select all' && (item.checked == true)) {
        //    //for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
        //    //    $("#ddlBugStatus").jqxDropDownList('checkIndex', index);
        //    //}
        //    $("#ddlBugStatus").jqxDropDownList('checkAll');
            
        //}
        if (item.checked == false) {
            //for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
            //    $("#ddlBugStatus").jqxDropDownList('uncheckIndex', index);
            //}
            $("#idUnselectAllimg").css("display", "none");
            $("#idSelectAllimg").css("display", "inline");
        }
        //else {
        //            $("#ddlBugStatus").jqxDropDownList('uncheckIndex', 0);
        //            checkindexbugtrail = 1;
       
        //}
    });
    
   
    
}



//function to add multiple check boxes to bug status

function bindBugStatusWidget(data) {
    $("#ddlBugStatus").jqxDropDownList({ checkboxes: true, source: data, displayMember: "BugStatusType", valueMember: "BugStatusId", width: 130, height: 24, placeHolder: "Select status", promptText: "Select status", autoDropDownHeight: true });
    $("#ddlBugStatus").jqxDropDownList('checkAll');
    $("#ddlBugStatus").jqxDropDownList('uncheckIndex', 5);
    $("#ddlBugStatus").jqxDropDownList('uncheckIndex', 7);
    $("#ddlBugStatus").jqxDropDownList('uncheckIndex', 8);
    $("#ddlBugStatus").jqxDropDownList('insertAt', 'Select all', 0);
    $("#ddlBugStatus").jqxDropDownList('setContent', 'Select status');
    var DropDownitemsTaskStatus = $("#ddlTskTrailStatus").jqxDropDownList('getItems');
    $("#ddlBugStatus").on("checkChange", function (event) {
        var item = event.args.item;
        if (event.args.label == 'Select all' && (item.checked == true)) {
            for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
                $("#ddlBugStatus").jqxDropDownList('checkIndex', index);
            }
        }
        else if (event.args.label == 'Select all' && (item.checked == false)) {
            for (var index = 1; index < DropDownitemsTaskStatus.length; index++) {
                $("#ddlBugStatus").jqxDropDownList('uncheckIndex', index);
            }
        }
    });
}

//To bind daily,monthly,weekly billing hours in the slider.
function bindBillingHours(data) {
    try {

        var thisMonthHours = parseFloat(data[0].MonthBillableHours) + parseFloat(data[0].MonthNonBillableHours);
        var thisWeekHours = parseFloat(data[0].WeekBillableHours) + parseFloat(data[0].WeekNonBillableHours);
        var todayHours = parseFloat(data[0].TodayBillableHours) + parseFloat(data[0].TodayNonBillableHours);
        thisMonthHours = isNaN(thisMonthHours) ? _vrDefaultFmt : displayFormat(thisMonthHours);
        thisWeekHours = isNaN(thisWeekHours) ? _vrDefaultFmt : displayFormat(thisWeekHours);
        todayHours = isNaN(todayHours) ? _vrDefaultFmt : displayFormat(todayHours);
        var vrMonthHrs = thisMonthHours.length > _vrHrsLengthDefault ? _vrMonthHrs : _vrHrsLengthDefault;
        var vrWeekHrs = thisWeekHours.length > _vrHrsLengthDefault ? _vrWeekHrs : _vrHrsLengthDefault;
        cropText($("#lblMonthBillHours"), thisMonthHours, vrMonthHrs);
        cropText($("#lblWeekBillHours"), thisWeekHours, vrWeekHrs);
        $("#lblTodayBillHours").text(todayHours);
        $("#lblTodayBillHours").attr('title', todayHours);
        if (_vrSuccessStatus == 1) {
            _vrSuccessStatus = "";
            var fromdate = $("#txtFromDate").val().split('/');
            var todate = $("#txtToDate").val().split('/');
            var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
            var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
            getReports(_vrFromdate, _vrTodate);
        }
        if (_vrSuccessBillingFlag == 1) {
            _vrSuccessBillingFlag = "";
            var fromdate = $("#txtFromDate").val().split('/');
            var todate = $("#txtToDate").val().split('/');
            var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
            var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
            viewBillingSummaryReport(_vrFromdate, _vrTodate);
        }
    } catch (e) {

    }
}

//To bind comments to the dialog box.
function bindComments(sourceGrid) {
    try {
        $("#idInnerShowComments").empty();
        if (typeof sourceGrid === 'undefined' || $.trim(sourceGrid).length == 0) {
            $("#divMainLoader").css("display", "none");
            return;
        }
        var data = sourceGrid;
        _vrBeyondScope = data[0].BeyondScope;
        _vrNonBillableTask = data[0].NonBillableTask;
        if (_vrBeyondScope == true || _vrBeyondScope == 'True') {
            $('#chkBeyondScope').prop("checked", true);
            _vrBeyondScope = true;
        }
        else {
            $('#chkBeyondScope').prop("checked", false);
            _vrBeyondScope = false;
        }
        if (_vrNonBillableTask == true || $("#ddlStatus").val() == 1 ) {
            $("#txtCommBillHours").prop("disabled", true);
            $("#txtCommBillHours").css("background-color", "rgb(131, 131, 131)");
            if (_vrNonBillableTask == true) {
                $("#txtNonBillableComm").css("display", "inline");
                $("#txtTaskComments").css("display", "none");
            } else {
                $("#txtNonBillableComm").css("display", "none");
                $("#txtTaskComments").css("display", "inline");
            }
        } else {
            $("#txtCommBillHours").prop("disabled", false);
            $("#txtCommBillHours").css("background-color", "transparent");
            $("#txtNonBillableComm").css("display", "none");
            $("#txtTaskComments").css("display", "inline");
        }
        _vrTaskModule = typeof data[0].TaskModuleName == 'undefined' ? '' : data[0].TaskModuleName;
        $("#idInnerShowComments").empty();
        $("#ddlSelectModule").val(_vrTaskModule);
        for (var i = 0; i < data.length; i++) {
            var NonBillHrs = typeof data[i].NonBillableHour == 'undefined' ? '0' : data[i].NonBillableHour;
            if (data[i].AssignedBy!=undefined) {
                var EmpImg = data[i].AssignedBy.replace(/\"/g, '_@-').replace(/\'/g, '@_@');//data[i].EmpPicName == '0' || data[i].EmpPicName.length==0 ? EmpDefaultPic : data[i].EmpPicName;
            }
            var EmpErrImg = _vrMainWebstationPath + _EmpDefaultPic;
            var EmpImgSrc = _vrMainWebstationPath + EmpImg + _vrPicExt;
            //  var EmpImgSrc = _vrLocationOrigin + "/UploadedFiles/" + EmpImg + _vrPicExt;
            var AttachedFile = typeof data[i].AttachedFiles == 'undefined' ? '' : data[i].AttachedFiles;
            var vrTaskStatus = typeof data[i].StatusType == 'undefined' ? '     ' : data[i].StatusType;
            var vrCommentedDate = formatCommentsDate(data[i].CreatedOn);
            var vrComments = data[i].Comments;//data[i].Comments.replace(_vrNonBillTextDiv, _vrNonBillSepText);;
            if (typeof data[i].Comments != 'undefined') {
                if (data[i].Comments.indexOf("<") > -1) {//modidfied by harish on 14/01/2015 
                    //if (data[i].Comments.indexOf("commntsnonbill") > -1) {
                   
                    //    vrComments = vrComments
                    //}
                    //else {
                    vrComments = handleScriptTags(vrComments);
                    //}
                
                } else {
                    vrComments = vrComments;
                }
            }
            else if (typeof data[i].TaskBugID != 'undefined') {
                vrComments = "<div class='clstaskbugdisplay'><div class='clsbugrecorded'>Bug recorded</div><div class='clsbugid'>Bug id:   <span>" + data[i].TaskBugID + "</span></div><img src='img/viewdetails.png' class='clsbugrecorddetails'onclick=TaskbugLinkId(" + data[i].TaskBugID+")  /></div>"; //adding dialog box showing bug id details
            }
            else if (typeof data[i].Comments == 'undefined' && typeof data[i].TaskBugID == 'undefined') {
                vrComments = "";
            }
            if (data[i].AssignedBy != undefined) {
                var Comments = "<div class='clsAllComments' ><div><img src='" + EmpImgSrc + "' OnError= this.src='" + EmpErrImg + "' class='clsImgProfile'/></div><div class='arrow-left'></div><div  class='clsTskComments'><div class='clsEmpName'><label title='" + data[i].AssignedBy + "'>" + CropTextHtml(data[i].AssignedBy, _vrAssignedByName) + "</label> <label class='clsCommentedTime '>(" + vrCommentedDate + ")</label><label>Status:</label><label class='clsLblHeader'>" + vrTaskStatus + "</label><label>Bill:</label><label class='clsLblHeader'>" + displayFormat(data[i].BillableHours) + "</label> <label>Non-bill:</label><label class='clsLblHeader'>" + displayFormat(data[i].NonBillableHours) + "</label><div class='clsAttachedFile'><a target='_blank' href='" + _vrAttachedFilesPath + encodeURIComponent(AttachedFile) + "'>" + AttachedFile + "</a></div></div><div class='clsEmpComments'><pre class='clsInnerComments'>" + vrComments + "</pre></div></div></div>";
                //onclick=\"javascript:downloadDoc('" + _vrLocationOrigin + '/UploadedFiles/' + data[i].AttachedFiles + "');\"
            }
            $(Comments).appendTo('#idInnerShowComments');
        }
        if (sourceGrid.length >= 0) {
            var vrSourceLength = sourceGrid.length-1;
            _vrTskCreatOn = sourceGrid[vrSourceLength].CreatedOn;
            _vrTskCreatOn = _vrTskCreatOn.split(' ')[0];
        }
        $("#divMainLoader").css("display", "none");
    } catch (e) {
        $("#divMainLoader").css("display", "none");
    }
}

//Loads new data again to "jqxTasksGrid".
function reloadTasksGrid(source) {
    try {
        
        $("#divMainLoader").css("display", "none");
        ClearNewTaskFields();//To clear any values in "Add Comment" dialog box.
        if ($(".clstasks").length>0) {
            var vrEmpId = $("#ddlTaskTrailEmployee").val();
            var vrProjId = $("#ddlTaskTrailProject").val();
            var vrExcludeCSD = $("#chkFilterTasks").is(':checked');
            //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + vrProjId + '&intEmployeeID=' + vrEmpId + '&blnExcludeCSD=' + _vrBlnExcludeDefault + '&strTokenID=' + _vrUserTokenId;
            //ajaxCall(_BaseUrl, loadJqxTasksGrid);

            bindTasksBasedOnClientID(vrProjId, vrEmpId, vrExcludeCSD, loadJqxTasksGrid);
            if ($("#MagnifierDialog").dialog("isOpen") === true && _vrMagnifyCloneTitle == _vrProjDetDialogHdr) {
                $("#imgMagnifydialogLoader").css("display","block");
                _BaseUrl = _vrLocationOrigin + '/Task/GetInProgTasksByProjId?intProjId=' + _vrSelectedProjectProjId + '&strTokenID=' + _vrUserTokenId;
                ajaxCall(_BaseUrl, bindInProgTasks);
            }
            else if ($("#MagnifierDialog").dialog("isOpen") === true && _vrMagnifyCloneTitle == _vrDialogBoxUser) {
                $("#imgMagnifydialogLoader").css("display", "block");
                //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + _vrDdlDefault + '&intEmployeeID=' + _vrMagnifyUserId + '&blnExcludeCSD=' + _vrBlnExcludeDefault + '&strTokenID=' + _vrUserTokenId;
                //ajaxCall(_BaseUrl, bindUserMagnifyGrid);
                bindTasksBasedOnClientID(_vrDdlDefault, _vrMagnifyUserId, _vrBlnExcludeDefault, bindUserMagnifyGrid);
            }
            if (_vrSaveExitClick == _vrSaveExitFlag) {
                _BaseUrl = _vrLocationOrigin + '/Task/GetBillingDetails?intEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
                ajaxCall(_BaseUrl, bindBillingHours);
                _vrSaveExitClick = '';

            }
            var vrVal = $(".clsBillingReport").attr("data-col");
            if (typeof vrVal != 'undefined') {
                loadjqxBillingReportGrid();
            }
            $("#idSpnLoading").css("display", "none");
        }
        if (_vrLocalBRDataOnTaskClick != null) {
            localStorage.setItem("jqxGridjqxBillingReport", JSON.stringify(_vrLocalBRDataOnTaskClick));
            $("#jqxBillingReport").jqxGrid('gotopage', _vrLocalBRDataOnTaskClick.pagenum);
        }
        if (_vrFlagReloadGraph == '1') {//  added by harish to load alloted -3 points into BR graph and score slider when billed for previous dates 
            loadBARData();
            LoadBARDataToSlider();
            _vrFlagReloadGraph = '0';
        }
    }
    catch (e) {

    }
}

//Calculates difference of created date and today date.Presenlty using in comments.
function getDateTime(date_past) {
    try {

        //  date_past = calcTime(date_past.split('_')[1].split(':')[0]);
        date_past = new Date(date_past);
        date_now = new Date();
        seconds = Math.floor(((date_now) - date_past) / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        if (seconds >= 0 && minutes >= 0 && hours >= 0 && days > 0) {
            return days + " days";
        }
        else if (seconds >= 0 && minutes >= 0 && hours > 0 && days == 0) {
            return hours + " hours";
        }
        else if (seconds >= 0 && minutes > 0 && hours == 0 && days == 0) {
            return minutes + " min";
        }
        else if (seconds > 0 && minutes == 0 && hours == 0 && days == 0) {
            return seconds + " sec";
        }

    } catch (e) {

    }
}
//To bind data to technical tip widget.
//function bindTechTip(source) {
//    try {


//    var Tip = source.TipMsg;
//    $("#lblTechTipText").text(Tip);
//    } catch (e) {

//    }
//}

//Gets data of all employees booster and rooster points.
function getBRPoints(sourceGrid) {
    try {
        bindNewDataToChart(sourceGrid);
        var data = sourceGrid;
        LoadDataToBARControls();
        $("#idBARLoading").css("display", "none");
    }
    catch (e) {
        $("#idBARLoading").css("display", "none");
        $("#divMainLoader").css("display", "none");
    }
    if (_UserRoleId == '1' || _vrUserIsProjManager == true) {
        $("#imgAddScore").css("display", "block");
        $("#btnRefreshBarGraph").removeClass("clsrefreshbarscore");
    }
}


//Checks certain conditions for every uploaded file in bugs dialog box and then uploads file.
function multiFileUploadvalidator(File,vrFlagUploadFile,clsFilesDiv) {
    try {
        var vrFileNameLength = '',vrFileNames='';
        // var size = File.files[0].size ;//File size in MB.
        var fileSize = 0;//Actual file size
        var fileName = File.files[0].name;
        var fileNameWithoutExtntion = fileName.substr(0, fileName.lastIndexOf('.'));
        var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length - 1);
        fileExt = fileExt.toLowerCase();
        //var fileExt = fileName.split('.')[1];
        //var filescount = parseInt($("#divBugAttachedFiles a").length)+parseInt($(".clsbugdynfilename").length);
        var fileSize = 0;
        for (var i = 0; i < (File.files.length); i++) {
            fileSize = fileSize + File.files[i].size;
        }
        if (/^[ A-Za-z0-9_@()-]*$/.test(fileNameWithoutExtntion) == false) {//Regular expression to verify file name.
            displayMessage(_vrAlert, _vrFileNameVeirfy);
            $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());
            return false;
        }
        if (jQuery.inArray(fileExt, _vrArrValidExtensions) == '-1') {
            displayMessage(_vrAlert, _vrValidFileFormatExtMessage);
            $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());
            return false;
        }
        _vrSameFileName = '';
        $("."+clsFilesDiv).each(function (index) {
            var vrFileName = $(this).prop("title");
            vrFileNames = vrFileNames + vrFileName + "~";
            if (vrFileName == fileName) {
                _vrSameFileName = parseInt(_vrSameFileName) + 1;
            }
        });
        if ($.trim(_vrSameFileName).length > 0) {
            var vrFileTextName = _vrFileNameMsg +'--'+ fileName;
            displayMessage(_vrAlert, vrFileTextName);
            $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());
            return false;
        }
        //var vrVerifyFilename = jQuery.inArray(TskStatus, _ArrStatus);
        //_vrArrFileNames.push(fileName);
        vrFileNameLength = vrFileNames + fileNameWithoutExtntion + _vrNewBugAttachedFiles;
        if (fileSize > parseInt(_vrFileSize)) {
            displayMessage(_vrAlert, _vrAttachedFileMessage)
            $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());
            return false;
        }
        else if (fileSize == _VrDefaultFileSize) {
            displayMessage(_vrAlert, _vrFileSizeMsg)
            $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());
            return false;
        }
        else {
            if (vrFlagUploadFile == _vrBugsFileUpload) {
                uploadBugsFile();
            }
            else if (vrFlagUploadFile == _vrNewProjFileUpload) {
                uploadNewProjFile();
            }
        }
    } catch (e) {

    }
}

function uploadBugsFile() {
    _vrFileUploading = _vrFileUploadDefault;
    $("#flCtBugMultiUpload").prop("disabled", true);
    $(".clsinsertbugdata").prop("disabled", true);
    $("#imgLoaderFileUpload").css("display", "inline");
    _BaseUrl = _vrLocationOrigin + '/Task/ToFilesUpload?strPicFileName=' + _DefaultAttachedFileName + '&strTokenID=' + _vrUserTokenId;
    uploadFile(_BaseUrl, loadBugFileName, 'flCtBugMultiUpload');
    //_BaseUrl = 'http://localhost:54405' + '/Task/ToFilesUpload?strPicFileName=ashok';
    //  uploadFile(_BaseUrl, loadBugFileName, 'flCtBugMultiUpload');
}

function bindDataToBugDropDownDyn() {
    try {
        //To fetch all active employees of osmosys in bug trail.
        if (_UserRoleId != _vrClientRoleId) {
            _BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId+ '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugEmp);
        } else {
            _BaseUrl = _vrLocationOrigin + '/customer/GetCustomerProjectEmployees?intCustomerEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugEmp);
        }
        //Fetches all employees under particular project bug trail.
        _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugProj);
    } catch (e) {
    }
}
function bindDataToTaskDropDownDyn() {
    try {
        //To fetch all active employees of osmosys in task trail.
        if (_UserRoleId != _vrClientRoleId) {
            _BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskEmp);
        } else {
            _BaseUrl = _vrLocationOrigin + '/customer/GetCustomerProjectEmployees?intCustomerEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskEmp);
        }
        //Fetches all employees under particular project in task trail.
        _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskProj);

    } catch (e) {

    }
}

//function BindValuesToBugFields() { //commenting as the function description is already present in current file at the bottom
//    try {
//        // intializeDatePicker();
//        //Sets jquery ui date picker model for input type text contains class as "clsDatePicker."
//        var dates = $("#txtBugTrFromDate,#txtBugTrToDate").datepicker({
//            showOn: "button",
//            buttonImage: "img/calendar.gif",
//            buttonImageOnly: true,
//            buttonText: "Select date",
//            dateFormat: 'dd/mm/yy',
//            maxDate: new Date(),
//            changeMonth: true,
//            changeYear: true,
//            showButtonPanel:true,
//            onClose: function (e) {
//                var ev = window.event;
//                if (ev.srcElement.innerHTML == 'Clear')
//                    this.value = "";

//            },
//            closeText: 'Clear',
//            buttonText: '',
//            onSelect: function (date) {
//                if ($.trim($("#txtBugTrFromDate").val()).length > 0) {

//                    for (var i = 0; i < dates.length; ++i) {
//                        if (dates[i].id > this.id)
//                            $(dates[i]).datepicker('option', 'minDate', date);
//                    }
//                }

//            }
//        });
        
//        //$('#txtBugTrToDate').datepicker('option', 'minDate', "-1d");
//        $('.ui-datepicker-current').hide();
//        $("#txtBugTrToDate").datepicker("setDate", new Date());
//        $("#txtBugTrFromDate").datepicker("setDate", -14);
//        var fromdate = $("#txtBugTrFromDate").val();
//        $('#txtBugTrToDate').datepicker('option', 'minDate', fromdate);
//        //To get bugtrail data
//        //To fetch bug status data like open,closed etc alosng with dropdowns to load in create bug.
//        _BaseUrl = _vrLocationOrigin + '/Bug/FetchBugStatusData?strTokenID=' + _vrUserTokenId;
//        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugStatus);
//    } catch (e) {

//    }
//}

function intializeDatePicker() {
    $(".clsDatePicker").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy'
    });
}
//To show added file next to upload file control.
function loadBugFileName(data) {
    try {
        if ($.trim(data.Value).length > 0 && _vrFileUploading == _vrFileUploadDefault) {
            var vrData = (data.Value).toString();
            var vrFileNames = vrData.split(',');
            for (var i = 0; i < vrFileNames.length; i++) {
                $("#divInnerAttachedFiles").append("<div class='clsnewbugdynupload'><label class='clsbugdynfilename' title='" + vrFileNames[i] + "'>" + CropTextHtml(vrFileNames[i], _vrLimitBugFileName) + "<a href='#'class='clsnewbugfileremove' ><img src='img/closeicon.ico'/><a></label></div>");
            }
        
            $('#flCtBugMultiUpload').replaceWith($('#flCtBugMultiUpload').clone());
            _vrFileUploading = _vrFileUploadComplete;
        }
        else if (_vrFileUploading == _vrFileUploadCanceled) {
            _vrUploadedCancFile = data.Value;
            deleteUploadedFile();
            _vrFileUploading = _vrFileUploadComplete;
        }
   
        $("#imgLoaderFileUpload").css("display", "none");
        $("#flCtBugMultiUpload").prop("disabled", false);
        $(".clsinsertbugdata").prop("disabled", false);
    } catch (e) {
        _vrFileUploading = _vrFileUploadComplete;
        $("#imgLoaderFileUpload").css("display", "none");
        $("#flCtBugMultiUpload").prop("disabled", false);
        $(".clsinsertbugdata").prop("disabled", false);
    }
}

//Function to get tasks based on selected employee id
function getTasksBasedEmployee() {
    try {
        $("#idSpnLoading").css("display", "block");
        var vrEmpId = $("#ddlTaskTrailEmployee").val();
        // if ($("#chkFilterTasks").is(':checked')) {
 
        var vrExcludeCSD = $("#chkFilterTasks").is(':checked');
        var vrProjectId = $("#ddlTaskTrailProject").val();
        //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + vrProjectId + '&intEmployeeID=' + vrEmpId + '&blnExcludeCSD=' + vrExcludeCSD + '&strTokenID=' + _vrUserTokenId;;
        //ajaxCall(_BaseUrl, loadJqxTasksGrid);
        bindTasksBasedOnClientID(vrProjectId, vrEmpId, vrExcludeCSD, loadJqxTasksGrid);
        // }
        //else {
        //    var vrExcludeCSD = $("#chkFilterTasks").prop('checked', false);
        //    var vrProjectId = $("#ddlTaskTrailProject").val();
        //    _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + vrProjectId + '&intEmployeeID=' + vrEmpId + '&blnExcludeCSD=' + vrExcludeCSD[0].checked + '&strTokenID=' + _vrUserTokenId;;
        //    ajaxCall(_BaseUrl, loadJqxTasksGrid);
        //}
        //var vrProjectId = $("#ddlTaskTrailProject").val();
        //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + vrProjectId + '&intEmployeeID=' + vrEmpId + '&blnExcludeCSD=' + vrExcludeCSD[0].checked + '&strTokenID=' + _vrUserTokenId;;
        //ajaxCall(_BaseUrl, loadJqxTasksGrid);
    } catch (e) {

    }
}

function getTasksBasedCSDEmployee() {
    try {
        $("#idSpnLoading").css("display", "block");
        var vrEmpId = $("#ddlTaskTrailEmployee").val();
        var vrExcludeCSD =$("#chkFilterTasks").prop('checked',false);
        var vrProjectId = $("#ddlTaskTrailProject").val();
        //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + vrProjectId + '&intEmployeeID=' + vrEmpId + '&blnExcludeCSD=' + vrExcludeCSD + '&strTokenID=' + _vrUserTokenId;;
        //ajaxCall(_BaseUrl, loadJqxTasksGrid);
        bindTasksBasedOnClientID(vrProjectId, vrEmpId, vrExcludeCSD, loadJqxTasksGrid);
    } catch (e) {

    }
}

function LoadTaskPageNumOnTaskClick() {
    if (_vrLocalTaskDataOnTaskClick != null) {
        localStorage.setItem("jqxGridjqxTasksgrid", JSON.stringify(_vrLocalTaskDataOnTaskClick));
        $("#jqxTasksgrid").jqxGrid('gotopage', _vrLocalTaskDataOnTaskClick.pagenum);
        if (_vrCloseDialog.length == 0) {
            _vrLocalTaskDataOnTaskClick = null;
        }
    }
}
function LoadBugsOnBugClick() {
    if (_vrLocalBTDataOnBugClick != null) {
        localStorage.setItem('jqxGridjqxBugTrial', JSON.stringify(_vrLocalBTDataOnBugClick));
        $('#jqxBugTrial').jqxGrid('gotopage', _vrLocalBTDataOnBugClick.pagenum);
        _vrLocalBTDataOnBugClick = null;
    }
}
//To load data for jqxgrid.
function loadJqxTasksGrid(result) {
    try {
        //checkTasksData(result);
        if ($(".clsusertasks .clstasksfields").length == '0' && $("#MagnifierDialog .clstasksfields").length == '0') {
            return;
        }

        if (result != _vrFlagData) {
            _vrTasksData.localdata = result;
        }
        if ($(".clsusertasks .clstasksfields").length > 0) {
            bindJqxGrid(_vrTasksData.localdata);
            LoadTaskPageNumOnTaskClick();
            //taskTrailProjectChange();
        } else if ($("#MagnifierDialog .clstasksfields").length > 0) {
        
            var data = _vrTasksData.localdata;
            var vrLocalTasksData = {
                datatype: "json",
                type: "GET",
                cache: false,
                datafields: _vrTasksDataFields,
                localdata: data
                // pagesize: _vrDefaultPreviewPager
            };

            bindDataToJqxInMagnifier("jqxTasksgrid", vrLocalTasksData, _vrTasksColumns, _vrProjectsMagTasksWidth);//Calls during magnify column click
            filterTaskTrailSprintDataJqxGrid();
            LoadTaskPageNumOnTaskClick();
        } else {
            $("#jqxTasksgrid").jqxGrid({ source: _vrTasksData });
            //loadsTasksCount();
            bindLoggedUserTaskCount();
            disableJqxPagerButtonsOnLoad('jqxTasksgrid');
            $("#jqxTasksgrid").on("pagechanged", function (event) {
                disableEnablePagingButtons("jqxTasksgrid", event);
            });
        }
        $("#idSpnLoading").css("display", "none");
        if ($("#MagnifierDialog .clstasksfields").length > 0) {
            taskTrailProjectChange();

        }

    } catch (e) {
        $("#idSpnLoading").css("display", "none");
    }
}

//To load data for bug trail grid.
function loadJqxBugGrid(result) {
    try {

        if (result != _vrFlagData) {
            _vrBugsData.localdata = result;
        }
        if ($(".clsbugtrail #idBugTrail").length > 0) {
            bindBugTrial(_vrBugsData.localdata);
            //taskTrailProjectChange();
        }
        else if ($("#MagnifierDialog #idBugTrail").length > 0) {
            var data = _vrBugsData.localdata;
            var vrLocalBugsData = {
                datatype: "json",
                type: "GET",
                cache: false,
                datafields: _vrBugDataFields,
                localdata: data
                // pagesize: _vrDefaultPreviewPager
            };
            bindDataToJqx("jqxBugTrial", vrLocalBugsData, _vrBugTrailColumns, _vrBugsMagWidth);//Calls during magnifier icon click
            $("#jqxBugTrial").jqxGrid({ source: _vrBugsData });
            
            disableJqxPagerButtonsOnLoad('jqxBugTrial');
            //bindBugTrial(_vrBugsData.localdata);

        } else {
            $("#jqxBugTrial").jqxGrid({ source: _vrBugsData });
            disableJqxPagerButtonsOnLoad('jqxBugTrial');
            $("#jqxBugTrial").on("pagechanged", function (event) {
                disableEnablePagingButtons("jqxBugTrial", event);
            });
        }
        // $("#loadJqxBugGrid").css("display", "none");
    } catch (e) {

    }
}
//Generic function to get sprints based on ProjectID ***Satish***
function AjaxCallToGetProjectDataBasedOnProjectID(projectID, FlagName) {
    _BaseUrl = _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + projectID + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, FlagName);
}
//Generic function to get sprints based on ProjectID ***Satish***
function AjaxCallToGetSprintDataBasedOnProjectID(projectID, FlagName) {
    _BaseUrl = _vrLocationOrigin + '/project/GetSprintDetails?intProjectID=' + projectID + '&strTokenID=' + _vrUserTokenId + '';
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, FlagName);
}// ***Satish***
function GetProjectRelatedSprintDetails() {
    var vrProjectIDForSelectedProject = $("#ddlNewTskProject").val();
    if (vrProjectIDForSelectedProject == "") {
        $("#ddlNewTskSprint").empty();
        $("#ddlNewTskSprint").append("<option value='0'>Select sprint</option>");
        $("#ddlAssTaskList").empty().trigger("chosen:updated");
    }
    else {
        $("#ddlNewTskSprint").empty();
        $("#ddlNewTskSprint").append("<option value='0'>Select sprint</option>");
        _BaseUrl = _vrLocationOrigin + '/project/GetSprintDetails?intProjectID=' + vrProjectIDForSelectedProject + '&strTokenID=' + _vrUserTokenId + '';
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskNewTaskSprintName);
         $("#ddlAssTaskList").empty().trigger("chosen:updated");
       // $("#ddlAssTaskList").append("<option value='0'>Select task</option>");
        _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + $("#ddlNewTskProject").val() + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskListAssociate);
        //if (_vrProjectIDedit !== "") {
        //    $("#ddlNewTskSprint").val(_vrEditSprintID);
        //}
    }
}

//To create new task dialog box
function createNewTask(_vrTaskStatus) {
    try {
        if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
            return false;
        }
        
        if (_UserRoleId == _vrClientRoleId && _vrUserIsProjManager == false) {
            return false;
        }
        _vrTaskChosenTaskName = [];
        $("#divNonSuccesTaskCreationDiv").empty();
        $("#divSuccesTaskCreationDiv").empty();
        $("#divNonSuccesTaskCreationDiv").css("display", "none");
        $("#divSuccesTaskCreationDiv").css("display", "none");
        $("#ddlAssTaskList").chosen();
        $("#divNonSuccesTaskCreationDiv").empty();
        $("#divSuccesTaskCreationDiv").empty();
        $("#idDisplayCreatedTasks").css("display", "none");
        $("#idDisplayNonCreatedTasks").css("display", "none");
        $("#btnNewTaskSaveNew").css("display", "inline");
        $("#btnNewTaskSave").css("display", "inline");
        $("#btnUpdateTask").css("display", "none");
        $("#errNewExcelTskError").css("display", "none");
        $("#errExcelFile").css("display", "none");
        _vrCloseDialog == '0';
        _vrProjectIDedit = "";
        _vrEditSprintID = "";
        _vrEditAssignedTo = "";
        _vrEditModuleName = "";
        _vrEditInformTo = "";
        _vrEditCustomerID = "";
        _vrCloseDialog == '0';
        ClearNewTaskFields();
        $(".clsNewTskDropdown").empty();
        $("#ddlNewTskProject").attr('disabled', true);
        $("#ddlNewTskSprint").attr('disabled', true);
        $("#ddlNewTskModule").attr('disabled', true);
        $("#ddlNewTskAssignTo").attr('disabled', true);
        $("#ddlNewTskInformTo").attr('disabled', true);
        $("#ddlAssTaskList").attr('disabled', true).trigger("chosen:updated");
        var vrMagnifierDialogTitle=$("#MagnifierDialog").dialog("option", "title");
        if (vrMagnifierDialogTitle == _vrTaskTrailTitle) {
            _vrLocalTaskDataOnTaskClick = null;
            _vrLocalTaskDataOnTaskClick = JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"));
        }
        
        _BaseUrl = _vrLocationOrigin + '/Task/GetPrioritiesList?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagPriority);

        _BaseUrl = _vrLocationOrigin + '/Task/GetTaskCategories?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskCategory);
        if (_UserRoleId == _vrClientRoleId) {//if logged in person is customer then bind his company details in customer drop down.
            _BaseUrl = _vrLocationOrigin + '/customer/GetCustomerNames?strTokenID=' + _vrUserTokenId + '&intEmpID=' + _EmpId + '&intRoleId=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskCustomer);
        }
        else {
            _BaseUrl = _vrLocationOrigin + '/Customer/GetCustToBindDropDown?strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskCustomer);
        }
        $("#ddlAssTaskList").empty().trigger("chosen:updated");
        $(".clsdailogfields").css("display", "none");
        $("#idShowNewTask").css("display", "inline");
        $('#dailog').dialog('option', 'title', _vrDialogBoxNewTask);
        _vrDialogBoxTitle = _vrDialogBoxNewTask;
        $('#dailog').dialog('open');
        $("#ddlNewTskProject").append("<option value=''>Select project</option>");
        $("#ddlNewTskSprint").append("<option value=''>Select sprint</option>");
        $("#ddlNewTskModule").append("<option value=''>Select module</option>");
        $("#ddlNewTskAssignTo").append("<option value=''>Select assign to</option>");
        $("#ddlNewTskInformTo").append("<option value=''>Select inform to</option>");
        
        if (_vrTaskStatus == "update") {
            var tskdetail = $("#imgedittsk").attr("value");
            var Splittskdetail = tskdetail.split(',');
            $("#divMainLoader").css("display", "inline");
            $("#ddlNewTskProject").attr('disabled', false);
            $("#ddlNewTskSprint").attr('disabled', false);
            $("#ddlNewTskModule").attr('disabled', false);
            $("#ddlNewTskAssignTo").attr('disabled', false);
            $("#ddlNewTskInformTo").attr('disabled', false);
            $("#ddlAssTaskList").attr('disabled', false).trigger("chosen:updated");
            _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingTaskID?intTaskiD=' + Splittskdetail[0] + '&strTokenID=' + _vrUserTokenId;
            ajaxCall(_BaseUrl, bindtotasktrail);
     
        }
        //if ($("#dailog").dialog("isOpen") === false) {
        //    var tskdetail = $("#imgedittsk").attr("value");
        //    var Splittskdetail = tskdetail.split(',');
        //    taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
        //}
    } catch (e) {

    }
}
//function to bind data to task trial for updating or editing task trial


function bindtotasktrail(data) {
    var source = data;
    $('#dailog').dialog('option', 'title', 'Edit task details');
    var hours=displayFormat(data[0].ExpectedHours);
    $("#txtNewTskEffortPlanned").val(hours);
    _vrTaskOwnerID = data[0].OwnerID;
    $("#txtNewTskName").val(data[0].TaskName) ;
    $("#ddlNewTskPriority").val(data[0].TaskPriorityID);
    // $("#txtNewTskEffortPlanned").val(data[0].ExpectedHours);
    _vrEditCustomerID = data[0].CustomerID;
    $("#ddlNewTskCustomer").val(data[0].CustomerID);
    //bindModuleName(data[0].ProjectModule);
    _vrEditTaskStatusID = data[0].TaskStatusID;
    $("#ddlNewTskCustomer").trigger("change");
    
    $("#ddlNewTskCategory").val(data[0].TaskCategoryID);
    $("#txtNewTskDueDate").val(data[0].TaskDueDate);
    $("#ddlNewTskOwner").val(data[0].OwnerID);
    if (data[0].NonBillableTask == false) {
        $("#chkNewTskNonBillable").prop("checked", false);
    } else {
        $("#chkNewTskNonBillable").prop("checked", true);
    }
    if (data[0].GetUpdates != 0) {
        $("#chkNewTskGetUpdates").prop("checked", true);
    } else {
        $("#chkNewTskGetUpdates").prop("checked", false);
    }
    //_vrTaskChosenTaskName = data[0].AssociatedTasks;
    //_BaseUrl = _vrLocationOrigin + '/project/GetProjectNames?intID=' + data[0].CustomerID + '&strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
    //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskProject);
    if (_vrProjectIDedit=="") {
        _vrProjectIDedit = data[0].TaskProjectID;
    }
    //$("#ddlNewTskCustomer").val(data[0].CustomerID);
    //$("#ddlNewTskCustomer").trigger("change");
    // $("#ddlNewTskProject").val(_vrProjectIDedit);
    // $("#ddlNewTskProject").trigger("change");
    //GetProjectRelatedSprintDetails();
    //_BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + _vrProjectIDedit + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskModules);
    _BaseUrl = _vrLocationOrigin + '/project/GetProjectNames?intID=' + data[0].CustomerID + '&strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskProject);
    $("#ddlNewTskProject").val(data[0].TaskProjectID);
    _vrEditSprintID = data[0].SprintID;
    _vrEditAssignedTo = data[0].AssignedTo;
    _vrEditModuleName = data[0].ModuleName;
    _vrEditInformTo = data[0].InformTo;
    _vrEditTaskOwnerName = data[0].TaskOwner;
    //$("#ddlNewTskSprint").val(data[0].SprintID);
    //$("#ddlNewTskOwner").val(data[0].OwnerID);
    //$("#ddlNewTskAssignTo").val(data[0].AssignedTo);
    //bindArrayToDropDown(data[0].ProjectModule, 'ddlNewTskModule');
    //$("#ddlNewTskModule").val(data[0].ModuleName);
  
    //if ($.trim(data[0].AttachedFiles).length > 0) {
    //    var vrAttachedFiles = data[0].AttachedFiles.split('~');
    //    for (var i = 0; i < vrAttachedFiles.length; i++) {
    //        if ($.trim(vrAttachedFiles[i]).length > 0) {
    //            $("#flNewTskAttachFile").append("<div class='clshrefupdatedbug'><a href='" + _vrAttachedFilesPath + vrAttachedFiles[i] + "' title='" + vrAttachedFiles[i] + "' target='_blank'>" + CropTextHtml(vrAttachedFiles[i], _vrUpdateLimitFileName) + "</a><img src='img/closeicon.ico' class='clsupdatedfileremove'/><img src='img/revert.ico' class='clsfileremovecancel'/></div>");//<img class='clsnewbugfileremove' src='img/closeicon.ico'>
    //            _vrUpdateComment = "Task details are edited";
    //        }
    //    }
    //}
     $("#ddlAssTaskList").empty().trigger("chosen:updated");
    // $("#ddlAssTaskList").append("<option value='0'>Select task</option>");
    _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + data[0].TaskProjectID + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskListAssociate);
    _vrTaskChosenTaskName = data[0].AssociatedTasks;
    $("#txtNewTskNotes").val(data[0].TaskDescription);
    //_vrEditTaskDialog = 1;
    $("#btnNewTaskSaveNew").css("display", "none");
    $("#btnNewTaskSave").css("display", "none");
    $("#btnUpdateTask").css("display", "inline");
    $("#divMainLoader").css("display", "none");

}
//function to update task details


function updateTask(data) {
    $(".clsNewTskMandatory").each(function (index) {
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass('error');
        }
    });
    if ($('.error').length > 0) {
        $("#errNewTskError").css("display", "block");
        return false;
    }
    _vrUpdatedStatus = 1;
    var tskdetail = $("#imgedittsk").attr("value");
    var Splittskdetail = tskdetail.split(',');
    if (data != undefined) {
        var vrAttachedFiles = typeof data.Value === 'undefined' ? '' : data.Value;
    } else {
        var vrAttachedFiles = "";
    }
    // taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
    var _vrUpdatedInformToTextEdit = GetInformToIds('ddlNewTskInformTo', 'txtNewTskInformTo');
    var hours = $("#txtNewTskEffortPlanned").val();
    var anticipatedhours = replaceColon(hours);
    var Editnonbillabletask = "";
    if ($('#chkNewTskNonBillable').is(':checked')) {
        Editnonbillabletask = 1;
    }
    else {
        Editnonbillabletask = 0;
    }
    var _vrEditGetUpdates = "";
    if ($('#chkNewTskGetUpdates').is(':checked')) {
        _vrEditGetUpdates = 1;
    }
    else {
        _vrEditGetUpdates = 0;
    }
    var _vrEditedText = "Task details are edited.";
    $("#btnUpdateTask").attr("disabled", true);
    var tasks = $('#ddlAssTaskList').val();
    if (tasks != null) {
        var vrTaskIds = tasks[0];
        for (var intIndex = 1; intIndex < tasks.length; intIndex++) {
            vrTaskIds = vrTaskIds + "," + tasks[intIndex];
        }
    }
    var objTask = {
        TaskName: $("#txtNewTskName").val(),
        TaskPriorityID: $("#ddlNewTskPriority").val(),
        TaskDueDate: $("#txtNewTskDueDate").val(),
        TaskStatusID: _vrEditTaskStatusID,
        TaskProjectID: $("#ddlNewTskProject").val(),
        TaskDescription: $("#txtNewTskNotes").val(),
        TaskCategoryID: $("#ddlNewTskCategory").val(),
        AssignedTo: $("#ddlNewTskAssignTo").val(),
        AnticipatedHours: anticipatedhours,
        GetUpdates: _vrEditGetUpdates,
        OwnerID: $("#ddlNewTskOwner").val(),
        InformTo: _vrUpdatedInformToTextEdit,
        TaskReleaseVersion: '1',
        NonBillableTask: Editnonbillabletask,
        ModuleName: $("#ddlNewTskModule").val(),
        TaskID: Splittskdetail[0],
        TokenID: _vrUserTokenId,
        AttchedFiles: vrAttachedFiles,
        AssignedBy: _vrEditTaskOwnerName,
        CustomerID: $("#ddlNewTskCustomer").val(),
        SprintID: $("#ddlNewTskSprint").val(),
        AttachedFilesComment: _vrEditedText,
        UpdatedBy: $("#lblLogin").text(),
        AssociatedTasks: vrTaskIds
    }
    //if (vrAttachedFiles != undefined && vrAttachedFiles!="") {
    //    // var AttachedFilesComment = "Edited tak details";
    //    objTask.AttachedFilesComment = "Edited task details";
    //}
    var editTaskdetails = Splittskdetail[0] + ',' + $("#ddlNewTskProject").val() + ',' + $("#txtNewTskName").val();
    tskdetaileidting = $("#imgedittsk").attr("value", editTaskdetails);
    _BaseUrl = _vrLocationOrigin + '/Task/UpdateTask?intEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    ajaxCallWithObject(_BaseUrl, objTask, callTaskComments);


}
function callTaskComments(data) {
    $("#btnUpdateTask").attr("disabled", false);
    $("#dialog").dialog('close');
    $("#ddlNewTskInformTo").val('');
    $('.info').html("Updated task details successfully");
    showStatusDiv();
    var tskdetail = $("#imgedittsk").attr("value");
    var Splittskdetail = tskdetail.split(',');
    taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
}
//To open new bug create dialog box.
function createNewBug() {

    try {
        vrstatus = false;
        $('#dailog').dialog('option', 'title', _vrDialogBoxNewBug);
        _vrDialogBoxTitle = _vrDialogBoxNewBug;
        $(".clsdailogfields").css("display", "none");
        $("#idShowBugDetails").css("display", "inline-block");
        $(".clsexistedbugfields").css("display", "none");
        $('#dailog').dialog('open');
        $("#txtBugCreatedDate").datepicker("setDate", new Date());
        $(".clssavebug").css("display", "inline-block");
        clearBugDetailsFields();
    } catch (e) {

    }
}

//To limits file name length to certain length
function CropTextHtml(text,length){
    if(text.length > length){
        var vrText = text.substr(0, length)+'...';
        return vrText;
    }
    else{
        return text;
    }
}
function bindNewDataToChart(data) {
    objArrEmpNames = [""];
    objArrPstvPnts = [];
    objArrNgtvPnts = [];
    empNames = [];
    pstvPnts = [];
    ngtvPnts = [];
    $.each(data, function (key, value) {
        var objEmp = new Object();
        objEmp.EmpFirstName = value.EmpFirstName;
        objArrEmpNames.push(objEmp);

        var objPstvPnts = new Object();
        objPstvPnts.PositivePoints = value.PositivePoints;
        objArrPstvPnts.push(objPstvPnts);

        var objNgtvPnts = new Object();
        objNgtvPnts.NegativePoints = value.NegativePoints.replace('-','');
        objArrNgtvPnts.push(objNgtvPnts);
    });
    for (var intLoop = 0, intArray = 1; intLoop < objArrEmpNames.length - 1; intLoop++, intArray++) {
        empNames[intLoop] = objArrEmpNames[intArray]["EmpFirstName"];
    }

    for (var intLoop = 0; intLoop < objArrPstvPnts.length; intLoop++) {
        pstvPnts[intLoop] = parseInt(objArrPstvPnts[intLoop]["PositivePoints"]);
        // pstvPnts[intLoop] = isNaN(objArrPstvPnts[intLoop]["PositivePoints"]) ? '0' : objArrPstvPnts[intLoop]["PositivePoints"];
    }

    for (var intLoop = 0; intLoop < objArrNgtvPnts.length; intLoop++) {
        ngtvPnts[intLoop] = parseInt(objArrNgtvPnts[intLoop]["NegativePoints"].replace('-',''));
    }
    bindChart();
}

//***********This method will calculate first and last date of the month and then call webservice 
function bindChart() {
    try {
        $(function () {

            $('#showChart').highcharts({
                chart: {
                    //   renderTo: 'container',
                    type: 'column',
                    width: _vrSetWidthOfGraph,
                    height: _vrSetHeightOfGraph
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: empNames,
                    labels: {
                        rotation: -60,
                        align: 'right',
                        style: {
                            fontSize: '13px',
                            fontFamily: '"Trebuchet MS", sans-serif',

                        }
                    }
                },

                yAxis: {
                    min: 0,
                    title: {
                        text: 'Points'
                    },
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                }  ,
                scrollbar: {
                    enabled: true
                },
                series: [{
                    name: 'Positive Points',
                    data: pstvPnts,

                }, {
                    name: 'Negative Points',
                    data: ngtvPnts

                }]
            });
        });

    }
    catch(e){

    }
    //initializeGraph();
    //ChangeColorOfBRGraph();

}
function ChangeColorOfBRGraph() {
    // var color = $(".highcharts-axis-labels text").css('fill', 'black');//to change the color of the text
   
    var color = $(".highcharts-container>svg>g>rect");//to change the color of the bars
    $(color[0]).css('fill', 'rgb(59, 197, 216)');
    $(color[1]).css('fill', 'rgb(240, 93, 93)');
    $(color[2]).css('fill', 'rgb(207, 80, 121)');
    $(color[3]).css('fill', 'yellow');
    $(color[4]).css('fill', 'rgb(110, 138, 248)');
    $(color[5]).css('fill', 'rgb(0, 196, 55)');
    $(color[6]).css('fill', 'rgb(168, 32, 173)');
    $(color[7]).css('fill', 'rgb(255, 227, 186)');
    $(color[8]).css('fill', 'black');
}


function initializeGraph() {
    // Radialize the colors
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    // Build the chart
    $('.pieChartGraph').highcharts({
        chart: {
            //plotBackgroundColor: null,
            // plotBorderWidth: null,
            // plotShadow: false
            // width: 420,
            // height: 420

        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie'

        }]
    });

}

function cropText(cntObj, dataObj, lengthObj) {
    if (cntObj.length > 0) {
        
        if (typeof dataObj != 'undefined' && dataObj.length > lengthObj) {
            cntObj[0].innerHTML = dataObj.substring(0, lengthObj) + '...';
           
        } else if (typeof dataObj != 'undefined') {
            cntObj[0].innerHTML = dataObj.substring(0, lengthObj) + '';
        }
    }
    cntObj.attr('title', dataObj);
}

function cropTextForHours(cntObj, dataObj, lengthObj) {
    if (cntObj.length > 0) {

        if (typeof dataObj != 'undefined' && dataObj.length > lengthObj) {
            cntObj[0].innerHTML = dataObj.substring(0, lengthObj) + '..';

        } else if (typeof dataObj != 'undefined') {
            cntObj[0].innerHTML = dataObj.substring(0, lengthObj) + '';
        }
    }
    cntObj.attr('title', dataObj);
}


//Verified is widget present in the page or not.
// function checkTasksData(sourceGrid) {
//_arrStatusCount = [0, 0, 0];
//   if ($(".clsusertasks .clstasksfields").length == '0' && $("#MagnifierDialog .clstasksfields").length == '0') {
//      return;
//  }
//if (sourceGrid.RecordCount != '0') {
//    var result = sourceGrid;
//}
//if (typeof sourceGrid === 'undefined' || sourceGrid.length == 0) {
//    //$("#idSpnLoading").css("display", "none");
//    //$("#jqxTasksgrid").hide();
//    //$("#divTasksGridNoData").css("display", "block");
//    //return;
//}
//else {
//    $("#divTasksGridNoData").css("display", "none");
//    $("#jqxTasksgrid").show();
//}
//  }

function loadsTasksCount(data) {
    try {


        $("#lblInProgCount").text(data[0].TaskCount);
        $("#lblPlannedCount").text(data[1].TaskCount);
        //var vrValDdlEmpId = $("#ddlTaskTrailEmployee").val();
        //var vrValDdlProjId = $("#ddlTaskTrailProject").val();
        //if ((vrValDdlEmpId == _EmpId || vrValDdlEmpId == "0") && vrValDdlProjId == "0") {


        //    _vrArrPlanned = jQuery.grep(_vrTasksData.localdata, function (element, index) {
        //        return element.StatusType == _vrPlannedVal && element.AssignedToEmpID == _EmpId; // retain appropriate elements
        //    });
        //    _vrArrInProgress = jQuery.grep(_vrTasksData.localdata, function (element, index) {
        //        return element.StatusType == _vrInProgVal && element.AssignedToEmpID == _EmpId; // retain appropriate elements
        //    });

        //    $("#lblInProgCount").text(_vrArrInProgress.length);
        //    $("#lblPlannedCount").text(_vrArrPlanned.length);
        //}
        //$("#lblBugsCount").text(_arrStatusCount[2]);
        //if (_vrArrInProgress.length == 0) {
        //    //  $("#lblHdrTaskId").text("None");
        //    // $('#lblTimer').text("");
        //    // $("#lblTaskSubject").text("");
        //}
        //else {

        //    _BillableHours = typeof _vrArrInProgress[0].BillableHours !== 'undefined' ? _vrArrInProgress[0].BillableHours.toString() : '0';
        //    // $("#lblHdrTaskId").text(_vrArrInProgress[0].TaskID);
        //    // $("#lblTaskSubject").text();
        //    // cropText($("#lblTaskSubject"), _vrArrInProgress[0].TaskName, _vrTaskSubLen);
        //    // $('#lblTimer').text(displayFormat(_BillableHours));



        // }
        // _vrFlag = '0';
        //$("#idSpnLoading").css("display", "none");
    } catch (e) {
        $("#idSpnLoading").css("display", "none");
    }
}





function handleScriptTags(vrCommentText) {
    try {
        vrCommentText = vrCommentText.replace(_vrNonBillDiv, _vrNonBillReplace);
        vrCommentText = vrCommentText.replace(/\</g, "<span><</span>");
        var html = vrCommentText.split(" ");      /// |</),//jQuery.parseHTML(str),//
        valResStr='';

        // Gather the parsed HTML's node names
        $.each(html, function (i, el) {
            valResStr += "<span> " + html[i] + " </span>";
        });
        valResStr = vrCommentText.replace(_vrNonBillReplace, _vrNonBillDiv);
        return valResStr;
    } catch (e) {

    }
}

function formatCommentsDate(vrDateToFormat) {
    try {
        var formattedDate = new Date(vrDateToFormat);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        //m = _vrMonthShortHand[m];
        var y = formattedDate.getFullYear();

        var hh = formattedDate.getHours();
        var mm = formattedDate.getMinutes();
        var ss = formattedDate.getSeconds();
        var vrResFormattedDate = '';
        if (!isNaN(d)) {
            vrResFormattedDate = DoubleDigitNum(d) + "/" + DoubleDigitNum(m) + "/" + DoubleDigitNum(y) + " " + DoubleDigitNum(hh) + ":" + DoubleDigitNum(mm) + ":" + DoubleDigitNum(ss);
        }
        else {
            vrResFormattedDate = vrDateToFormat;
        }

        return vrResFormattedDate;
        // return vrDateToFormat;
    } catch (e) {

    }
}

function formatSprintFromDate(vrDateToFormat) {
    try {
        var vrDate = vrDateToFormat.split('/');
        var vrResFormattedDate = vrDate[2] + "/" + vrDate[1] + "/" + vrDate[0];
        //var formattedDate = new Date(vrDateToFormat);
        //var d = formattedDate.getDate();
        //var m = formattedDate.getMonth();
        //m += 1;  // JavaScript months are 0-11
        ////m = _vrMonthShortHand[m];
        //var y = formattedDate.getFullYear();

        //var hh = formattedDate.getHours();
        //var mm = formattedDate.getMinutes();
        //var ss = formattedDate.getSeconds();
        //var vrResFormattedDate = '';
        //if (!isNaN(d)) {
        //    vrResFormattedDate = DoubleDigitNum(y) + "/" + DoubleDigitNum(m) + "/" + DoubleDigitNum(d) ;
        //}
        //else {
        //    vrResFormattedDate = vrDateToFormat;
        //}

        return vrResFormattedDate;
        // return vrDateToFormat;
    } catch (e) {

    }
}

function formatSprintStatus(strStatusSprint) {
        try {
            var sprintstatus = strStatusSprint;
            if (sprintstatus == "Select status") {
                return 1;
            }
            else if (sprintstatus == "Freeze sprint") {
                return 0;
            }
            else if (sprintstatus == "Close sprint") {
                return 2;
            }
            else {
                return strStatusSprint;
            }
        } catch (e) {

        }
}

function formatSprintDisplayDate(vrDateToFormat) {
    try {
        var formattedDate = new Date(vrDateToFormat);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        //m = _vrMonthShortHand[m];
        var y = formattedDate.getFullYear();

        var hh = formattedDate.getHours();
        var mm = formattedDate.getMinutes();
        var ss = formattedDate.getSeconds();
        var vrResFormattedDate = '';
        if (!isNaN(d)) {
            vrResFormattedDate = DoubleDigitNum(d) + "/" + DoubleDigitNum(m) + "/" + DoubleDigitNum(y);
        }
        else {
            vrResFormattedDate = vrDateToFormat;
        }

        return vrResFormattedDate;
        // return vrDateToFormat;
    } catch (e) {

    }
}
function BindValuesToBugFields() {
    try {
        // intializeDatePicker();
        //Sets jquery ui date picker model for input type text contains class as "clsDatePicker."
        var dates = $("#txtBugTrFromDate,#txtBugTrToDate").datepicker({
            showOn: "button",
            buttonImage: "img/calendar.gif",
            buttonImageOnly: true,
            buttonText: "Select date",
            dateFormat: 'dd/mm/yy',
            maxDate: new Date(),
            changeMonth: true,
            changeYear: true,
            showButtonPanel:true,
            onClose: function (e) {
                var ev = window.event;
                if (ev.srcElement.innerHTML == 'Clear')
                    this.value = "";
            },
            closeText: 'Clear',
            buttonText: '',
            onSelect: function (date) {
                if ($.trim($("#txtBugTrFromDate").val()).length > 0) {

                    for (var i = 0; i < dates.length; ++i) {
                        if (dates[i].id > this.id)
                            $(dates[i]).datepicker('option', 'minDate', date);
                    }
                }

            }
        });
        
        //$('#txtBugTrToDate').datepicker('option', 'minDate', "-1d");
        $('.ui-datepicker-current').hide();
        $("#txtBugTrToDate").datepicker("setDate", new Date());
        $("#txtBugTrFromDate").datepicker("setDate", -14);
        var fromdate = $("#txtBugTrFromDate").val();
        $('#txtBugTrToDate').datepicker('option', 'minDate', fromdate);
        //To get bugtrail data
        //To fetch bug status data like open,closed etc alosng with dropdowns to load in create bug.
        _BaseUrl = _vrLocationOrigin + '/Bug/FetchBugStatusData?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugStatus);
    } catch (e) {

    }
}
function BindValuesToBugFieldsTaskBugs() {
    try {
        // intializeDatePicker();
        //Sets jquery ui date picker model for input type text contains class as "clsDatePicker."
        var dates = $("#txtTskOpenBugTrFromDate,#txtTskOpenBugTrToDate").datepicker({
            showOn: "button",
            buttonImage: "img/calendar.gif",
            buttonImageOnly: true,
            buttonText: "Select date",
            dateFormat: 'dd/mm/yy',
            maxDate: new Date(),
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            onClose: function (e) {
                var ev = window.event;
                if (ev.srcElement.innerHTML == 'Clear')
                    this.value = "";

            },
            closeText: 'Clear',
            buttonText: '',
            onSelect: function (date) {
                if ($.trim($("#txtTskOpenBugTrFromDate").val()).length > 0) {

                    for (var i = 0; i < dates.length; ++i) {
                        if (dates[i].id > this.id)
                            $(dates[i]).datepicker('option', 'minDate', date);
                    }
                }

            }
        });
        //$('#txtTskOpenBugTrToDate').datepicker('option', 'minDate', "-1d");
        $('.ui-datepicker-current').hide();
        $("#txtTskOpenBugTrToDate").datepicker("setDate", new Date());
        $("#txtTskOpenBugTrFromDate").datepicker("setDate", -1);
        _BaseUrl = _vrLocationOrigin + '/Bug/FetchBugStatusData?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrTskOpenBugsTaskStatus);
    } catch (e) {

    }
}
function sortOrderUserPref(vrGridId,columnname,isasc) {
    try {
        //var vrGetColumnSort = JSON.parse(localStorage.getItem("jqxGrid" + vrGridId));
        //  if (typeof vrGetColumnSort.sortcolumn != null && typeof vrGetColumnSort.sortcolumn != 'undefined') {
        //if (isasc) {
        //    $("#" + vrGridId).jqxGrid('sortby', columnname, 'asc');

        //    } else {
        //    $("#" + vrGridId).jqxGrid('sortby', columnname, 'desc');
        //    }

        //}
    } catch (e) {

    }
}

var sortingcolumns = function (GridId) {
    var vrSortColumnName = "", vrSortOrder = "";
    var vrGetColumnSort = JSON.parse(localStorage.getItem("jqxGrid" + GridId));
    if (vrGetColumnSort != null) {
        if (vrGetColumnSort.sortcolumn != null) {
            vrSortColumnName = vrGetColumnSort.sortcolumn;
            vrSortOrder = vrGetColumnSort.sortdirection.ascending;
        }
    }
    return {
        vrSortColumnName: vrSortColumnName,
        vrSortOrder: vrSortOrder
    };
};
