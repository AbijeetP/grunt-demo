//To make user to move only forward through browser navigation
window.onload = function () {
    noBack();
}

var returnStatus = true;
var _vrSuccessStatus = "";
var _vrSuccessBillingFlag = "";
window.history.forward();
function noBack() {
    window.history.forward();
}

//Initializes dialog box with particular height and width
function initializeCommDialog(DialogId, DialogWidth, DialogHeight) {
    $("#" + DialogId).dialog({
        closeOnEscape: false,
        resizable: false,
        modal: true,
        height: DialogHeight,
        width: DialogWidth,
        maxWidth: 1100,
        autoResize: true,
        autoOpen: false,
        draggable: true,
        close: CloseMadmifyFunction,
        //position: {
        //    my: "center center",
        //    at: "center center"
        //},
        position: {
            my: "center center",
            at: "top top"
        },
        dialogClass: 'dialogPosition',
        open: function (event, ui) {
            //Triggers for every time of opening dailog box whose id is "dailog".
            $droppableEl = $('.gridster-container .gridster');
            $droppableEl.droppable('disable');
        },
        beforeClose: function (event, ui) {
            //Triggers for every time of closing dailog box whose id is "dailog".
            //Checks length of #jqxTasksgrid id is present or not for cloning of jqx grid.
            if ($("#divUnderDevelopment").dialog("isOpen") === false && ($('#divBugRecorddetails').dialog("isOpen") == false)) {
                $(".dropdown-menu").css("display", "none");
                checkWidgetsAndAppend();

            }
            if ($("#divBugRecorddetails").dialog("isOpen") === true) {
                //$("#divBugDetAttachedFiles").empty();
                return true;
            }
            if ($("#divSprintStatusalert").dialog("isOpen") === true) {
                $("#ddlNewTskSprint").val(0);
				//$("#ddlNewTskSprint").attr("title", "Select sprint");
                if (_vrEditTaskFlagSprint == 1) {
                    $("#ddlNewTskSprint").val(_vrEditSprintID);
                    //$("#ddlNewTskSprint").attr("title", $("#ddlNewTskSprint").text(_vrEditSprintID));
                    var sprintSelected = $("#ddlNewTskSprint").val();
                    if (sprintSelected == null) {
                        $("#ddlNewTskSprint").val(0);
                        //$("#ddlNewTskSprint").attr("title", "Select sprint");
                    }
                }
                $("#divMagnifyHdrTitle").css("display", "block");
                $("#divMagnifierGrid").css("display", "block");
                return true;
            }
            $droppableEl = $('.gridster-container .gridster');
            $droppableEl.droppable('enable');
			if (_vrTskOpenBugDialog == 1) {
                if (_vrTskBugOpend==0){
                _vrTskOpenBugDialog = 0;
                $("#idTskOpenBugTrail").css("display", "none");
                taskLink(_vrTxtOpenBugTaskId, _vrTxtTskProjId, _vrTskSubject);
                $("#MagnifierDialog").dialog("close");
                $(".clstasksfields").css("display", "block");
                $("#idBugTrail").css("display", "block");
                $("#divProjectsTrail").css("display", "block");
                return false;
            }
            }
            if ($("#lblMagfieldtext1").text() == _vrProjectNameLbl && _vrCustDetails == 1) {
                _vrCustDetCnt = 1;
                customerValuesLink(_vrMagnifyCustId, _vrCustContName, _vrCustEmailId, _vrCustWebsiteName, _vrCustName);
                return false;
            }
            if ($("#lblMagfieldtext1").text() == "Customer name" || $("#lblCompanyNametext").text() == "Customer name") {
                if (_vrLocalCustDataOnCustClick != null) {
                    LoadPageNumForCustomer();
                }
                _vrCustDetails = 0;
            }
            if (_vrUserMagnifyDialog == 1 && _vrUserDialogOpen == 1) {
                //_vrUserMagnifyDialog = 0;
                _vrUserDialogOpen = 0;
                openMagnifyDialogBox(_vrUserTitle, 'jqxUserTrial', _vrMagnifierUserSizer);
                $('#MagnifierDialog').append($("#idUser"));
               
                loadJqxUserMagifyClickGrid();
                return false;
            }
            if (_vrProjMagnifyDialog == 1 && _vrProjDialogOpen == 1) {
               // _vrProjMagnifyDialog = 0;
                _vrProjDialogOpen = 0;
                openMagnifyDialogBox(_vrProjectsTitle, 'jqxProjectsGrid', _vrMagnifierProjSizer);
                loadJqxProjectsGrid();
                $('#MagnifierDialog').append($("#divProjectsTrail"));
                return false;
            }
            if (_vrCustMagnifyDialog == 1 && _vrCustDialogOpen == 1) {
               // _vrCustMagnifyDialog = 0;
                _vrCustDialogOpen = 0;
                openMagnifyDialogBox(_vrCustomerDialogHdr, 'jqxCustomerTrial', _vrMagnifierCustomerSizer);
                //loadJqxCustomersGrid();
                LoadPageNumForCustomer();
                $("#jqxCustomerTrial").jqxGrid({ width: _vrMagnifyGridWidth });
                $('#MagnifierDialog').append($("#idCustomerTrail"));
                return false;
            }
            if ((_vrProjMagnifyDialog == 1 && _vrProjDialogOpen == 0) || (_vrProjMagnifyDialog == 0 && _vrProjDialogOpen == 1)) {
                _vrProjMagnifyDialog = 0;
                _vrProjDialogOpen = 0;
                $("#imgProjUserPref").css("display", "none");
                //openMagnifyDialogBox(_vrProjectsTitle, 'jqxProjectsGrid', _vrMagnifierProjSizer);
                // loadJqxProjectsGrid();
                //$('#MagnifierDialog').append($("#divProjectsTrail"));
                
            }
            if ((_vrCustMagnifyDialog == 1 && _vrCustDialogOpen == 0) || (_vrCustMagnifyDialog == 0 && _vrCustDialogOpen == 1)) {
                _vrCustMagnifyDialog = 0;
                _vrCustDialogOpen = 0;
            }
            if ((_vrUserMagnifyDialog == 1 && _vrUserDialogOpen == 0) || (_vrUserMagnifyDialog == 0 && _vrUserDialogOpen == 1)) {
                _vrUserMagnifyDialog = 0;
                _vrUserDialogOpen = 0;
            }
            $("#btnSubmitDelete").css("display","none");
            //if (_vrEditTaskDialog == 1) {
            //    var tskdetail = $("#imgedittsk").attr("value");
            //    var Splittskdetail = tskdetail.split(',');
            //    $("#txtCommInformTo").val('');
            //    taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
            //}
        }
    });
}
function checkBtnResizePositionInTask(checkBtnName,btnresizecount) {
    if (btnresizecount == 0) {//Calls during resizing of widget
        if (checkBtnName == _vrBtnTaskWidgetResize) {
            $("#ddlTskTrailStatus").css("margin-left", "20px");
            $("#ddlTskTrailStatus").css("margin-top", "5px");
            $("#divBlnExcludeCSD").css("margin-left", "36px");
            btnresizecount++;
            _vrBtnWidgetResize = btnresizecount;
        }
        else {
            $("#txtBugTrFromDate, #txtBugTrToDate").css("margin-left", "20px");
            $("#ddlBugTrEmp").css("margin-left", "5px");
            $("#ddlBugTrTaskName").css("margin-left", "3px");
            $("#ddlBugStatus").css("margin-left", "18px");
            $("#bugTrailCheckBox").css("margin-top", "35px");
            btnresizecount++;
            _vrBtnBugTrailResize = btnresizecount;
        }
    }
    else {//Goes to this condition upon minimizing widget. 
        if (checkBtnName == _vrBtnTaskWidgetResize) {
            $("#ddlTskTrailStatus").css("margin-left", "0px");
            $("#ddlTskTrailStatus").css("margin-top", "0px");
            $("#divBlnExcludeCSD").css("margin-left", "14px");
            btnresizecount--;
            _vrBtnWidgetResize = btnresizecount;
        }
        else {
            $("#txtBugTrFromDate, #txtBugTrToDate").css("margin-left", "0px");
            $("#ddlBugTrEmp").css("margin-left", "0px");
            $("#ddlBugTrTaskName").css("margin-left", "0px");
            $("#ddlBugStatus").css("margin-left", "0px");
            $("#bugTrailCheckBox").css("margin-top", "72px");
            btnresizecount--;
            _vrBtnBugTrailResize = btnresizecount;
        }
    }
}

    function checkWidgetsAndAppend() {
        try {

            if ($(".clsusertasks .clstasksfields").length == '0' && _vrMagnifyCloneTitle == _vrTaskTrailTitle) {
                $(".clstasks").append($(".clstasksfields"));
                $("#btnNewTaskInMaginfier").css("display", "none");
                var vrTaskPageInMaginfy = (JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"))).pagenum;//get the pagenum at the time of closing
                $("#jqxTasksgrid").jqxGrid({ pagesize: _vrDefaultTaskSizer, width: _vrProjectsTasksWidth });
                if (vrTaskPageInMaginfy > 0) {
                    var vrMaginfyTaskRecords = ((++vrTaskPageInMaginfy) * _vrMagnifierTaskSizer); //calculate the records
                    var vrSetTaskWidgetPageNum = (vrMaginfyTaskRecords / _vrDefaultTaskSizer).toFixed();//calculate the page number
                    vrSetTaskWidgetPageNum--;
                    $("#jqxTasksgrid").jqxGrid('gotopage', vrSetTaskWidgetPageNum);//Set the page number
                }
                else {
                    $("#jqxTasksgrid").jqxGrid('gotopage', vrTaskPageInMaginfy);
                }
                var vrLocalStgTsk = JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"));
                pagerMagnifyDisplay(".clsusertasks");
                checkBtnResizePositionInTask("btnResizeTasksWidget", _vrBtnWidgetResize);
                $("#imgTaskUserPref").css("display", "none");
                disableJqxPagerButtonsOnLoad('jqxTasksgrid');
            }
                //Checks length of #idBugTrail is present or not for cloning of idbugtrail data.
            else if ($(".clsbugtrail #idBugTrail").length == '0' && _vrMagnifyCloneTitle == _vrDialogBoxBugTrail) {//Checks length of 
                $(".clsInnerBugTrail").append($("#idBugTrail"));
                var vrBTPageInMaginfy = (JSON.parse(localStorage.getItem("jqxGridjqxBugTrial"))).pagenum;
                $("#jqxBugTrial").jqxGrid({ pagesize: _vrDefaultBugSizer, width: _vrProjectsTasksWidth });
                if (vrBTPageInMaginfy > 0) {
                    var vrMaginfyBTRecords = ((++vrBTPageInMaginfy) * _vrMagnifierBugSizer);
                    var vrSetBTWidgetPageNum = (vrMaginfyBTRecords / _vrDefaultBugSizer).toFixed();
                    vrSetBTWidgetPageNum--;
                    $("#jqxBugTrial").jqxGrid('gotopage', vrSetBTWidgetPageNum);
                }
                else {
                    $("#jqxBugTrial").jqxGrid('gotopage', vrBTPageInMaginfy);
                }
                $("#imgBTUserPref").css("display", "none");
                pagerMagnifyDisplay(".clsbugtrail");
                checkBtnResizePositionInTask("btnResizeBugTrailWidget", _vrBtnBugTrailResize);
                disableJqxPagerButtonsOnLoad('jqxBugTrial');
            }
            else if (_vrMagnifyCloneTitle == _vrProjectsTitle && $(".clsprojwidget #divProjectsTrail").length == '0') {
                _vrProjDefLen = _vrProjLen;
                $("#divProjectLoading").css("display", "block");
                $(".clsprojectsdetails").append($("#divProjectsTrail"));
                var vrProjPageInMaginfy = (JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"))).pagenum;
                $("#jqxProjectsGrid").jqxGrid({ pagesize: _vrDefaultProjSizer, width: _vrProjectsTasksWidth });
                if (vrProjPageInMaginfy > 0) {
                    var vrMaginfyProjRecords = ((++vrProjPageInMaginfy) * 14);// the records in projects dialog are 14
                    var vrSetProjWidgetPageNum = (vrMaginfyProjRecords / _vrDefaultProjSizer).toFixed();
                    vrSetProjWidgetPageNum--;
                    $("#jqxProjectsGrid").jqxGrid('gotopage', vrSetProjWidgetPageNum);
                }
                else {
                    $("#jqxProjectsGrid").jqxGrid('gotopage', vrProjPageInMaginfy);
                }
                $("#imgProjUserPref").css("display", "block");
                 $("#divProjectLoading").css("display", "none");
                // decreaseJqxProjectsGrid();
                 pagerMagnifyDisplay(".clsprojwidget");
                 disableJqxPagerButtonsOnLoad('jqxProjectsGrid');
            }
            else if ($(".clscustomertrail #idCustomerTrail").length == '0' && _vrMagnifyCloneTitle == _vrCustomerDialogHdr) {//Checks length of 
            
                _vrCustDefLen = _vrCustLen;
                $("#idCustomerLoding").css("visibility", "block");
                $mgnClose = $(".clsInnerCustomerTrail").append($("#idCustomerTrail"));
                var vrCustPageInMaginfy = (JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"))).pagenum;
                $("#jqxCustomerTrial").jqxGrid({ pagesize: _vrDefaultCustomerSizer, width: _vrProjectsTasksWidth });
                if (vrCustPageInMaginfy > 0) {
                    var vrMaginfyCustRecords = ((++vrCustPageInMaginfy) * _vrMagnifierCustomerSizer);
                    var vrSetCustWidgetPageNum = (vrMaginfyCustRecords / _vrDefaultCustomerSizer).toFixed();
                    vrSetCustWidgetPageNum--;
                    $("#jqxCustomerTrial").jqxGrid('gotopage', vrSetCustWidgetPageNum);
                }
                else {
                    $("#jqxCustomerTrial").jqxGrid('gotopage', vrCustPageInMaginfy);
                }
                $("#imgCustUserPrefCont").css("display", "none");
                //decreaseJqxCustomersGrid();
                pagerMagnifyDisplay(".clscustomertrail");
                loadJqxTasksGrid(_vrFlagData);
                disableJqxPagerButtonsOnLoad('jqxCustomerTrial');
            }
          
            else if ($(".clsuser #idUser").length == '0' && _vrMagnifyCloneTitle == _vrUserTitle) {//  //Checks length of #idUser is present or not for cloning of idUser data.
                $("#divUserLoading").css("display", "block");
                $(".clsinneruser").append($("#idUser"));
                var vrUserPageInMaginfy = (JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"))).pagenum;
                $("#jqxUserTrial").jqxGrid({ pagesize: _vrDefaultUserSizer, width: _vrProjectsTasksWidth });
                if (vrUserPageInMaginfy > 0) {
                    var vrMaginfyUserRecords = ((++vrUserPageInMaginfy) * _vrMagnifierUserSizer);
                    var vrSetUserWidgetPageNum = (vrMaginfyUserRecords / _vrDefaulUserSizer).toFixed();
                    vrSetUserWidgetPageNum--;
                    $("#jqxUserTrial").jqxGrid('gotopage', vrSetUserWidgetPageNum);
                    $("#divUserLoading").css("display", "none");
                }
                else {
                    $("#jqxUserTrial").jqxGrid('gotopage', vrUserPageInMaginfy);
                    $("#divUserLoading").css("display", "none");
                }
                // decreaseJqxUserGrid();
                $("#jqxUserTrial").jqxGrid('hidecolumn', 'Address');
                $("#imgWidgetUserPrefContainer").css("display", "none");
                pagerMagnifyDisplay(".clsuser");
                disableJqxPagerButtonsOnLoad('jqxUserTrial');
            }
            else if ($(".clsBillingReport #idBIllingReport").length == '0' && _vrMagnifyCloneTitle == _vrBillingReportTitle) {
                var vrBRPageInMaginfy = (JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"))).pagenum;
                $("#divBillingReportLoading").css("display", "block");
                $(".clsBillingReport").append($("#divInnerBillingReportContent"));
                $("#jqxBillingReport").jqxGrid({ pagesize: _vrBillingGridPagerSize, width: _vrBillingReportGridWidth });
                if (vrBRPageInMaginfy > 0) {
                    var vrMaginfyBRRecords = ((++vrBRPageInMaginfy) * _vrDefaultBillingReportSizer);
                    var vrSetBRWidgetPageNum = (vrMaginfyBRRecords / _vrBillingGridPagerSize).toFixed();
                    vrSetBRWidgetPageNum--;
                    $("#jqxBillingReport").jqxGrid('gotopage', vrSetBRWidgetPageNum);
                    $("#divBillingReportLoading").css("display", "none");
                }
                else {
                    $("#jqxBillingReport").jqxGrid('gotopage', vrBRPageInMaginfy);
                    $("#divBillingReportLoading").css("display", "none");

                }
                $("#divBRUserPrefCont").css("display", "none");
                //loadjqxBillingReportGrid();
                pagerMagnifyDisplay(".clsBillingReport");
                disableJqxPagerButtonsOnLoad('jqxBillingReport');
            }
            else if ($(".clsdeploy #idDeploy").length == '0' && _vrMagnifyCloneTitle == _vrDialogDeployment) {
                var vrDeployPageNoInMagnify = (JSON.parse(localStorage.getItem("jqxGridjqxDeployGrid"))).pagenum;
                $("#divDeployLoading").css("display", "block");
                $(".clsinnerdeploy").append($("#idDeploy"));
                $("#jqxDeployGrid").jqxGrid({ pagesize: _vrDeployGridPagerSize, width: _vrProjectsTasksWidth });

                $("#divDeployLoading").css("display", "none");
                if (vrDeployPageNoInMagnify > 0) {
                    var vrMaginfyDeployRecords = ((++vrDeployPageNoInMagnify) * _vrMagnifierDeploySizer);
                    var vrSetDeployWidgetPageNum = (vrMaginfyDeployRecords / _vrDeployGridPagerSize).toFixed();
                    vrSetDeployWidgetPageNum--;
                    $("#jqxDeployGrid").jqxGrid('gotopage', vrSetDeployWidgetPageNum);
                }
                else {
                    $("#jqxDeployGrid").jqxGrid('gotopage', vrDeployPageNoInMagnify);
                }
                pagerMagnifyDisplay(".clsdeploy");
                $(".clsdeployfieldcontent").css("margin-left", "0px");
                $("#jqxDeployGrid").css("margin-left", " 0px");
                $("#txtDeploySearch").css("margin-left", "157px");
                if (_vrBtnDeployResize == 1) {
                    $("#txtDeploySearch").css("margin-left", "15px");
					$("#btnDeployResetSearch").css("margin-right", "132px");
                }
                else {
                    $("#btnDeployResetSearch").css("margin-right", "-11px");
                    $(".clsdeploystatus").css("margin-left", "0px");
                }
                $("#imgDeployUserPref").css("display", "none");
                disableJqxPagerButtonsOnLoad('jqxDeployGrid');
            }
            else if ($(".clsbrPoints #idShowBARInMagnify").length == '0') {
                $(".clsbrPoints").append($("#idShowBARInMagnify"));
                _vrSetWidthOfGraph = 850;
                _vrSetHeightOfGraph = 320;
                $("#idBARLoading").css("display", "block");
                loadBARData();
            }
            else if ($(".clsquotation .clsquotetoappend").length =='0') {
                $(".clsquotation").append($(".clsquotetoappend"));
                $("#jqxQuotationGrid").jqxGrid({ pagesize: _vrQuoteGridPagerSize, width: _vrQuoteGridWidth });
                bindDataToJqx("jqxQuotationGrid", _vrQuoteData, _vrQuoteWidgetColumns, _vrQuoteGridWidth);
                filterBasedOnQuoteStatus();
            }
            //if ($("#MagnifierDialog").dialog("isOpen") === true) {
            //    $("#idSearchCustomer").attr("disabled", false);
            //}
            if ($("#divUnderDevelopment").dialog("isOpen") === false) {
                //selectCount = 0;
                $("#divMagnifierGrid").css("display", "none");
                $("#divMagnifyHdrTitle").css("display", "none");
                $(".clsmagcompanyname").css("display", "none");
                $("#divMagnifyHdrTitle").css("height", "63px");
                $('#jqxPreviewGrid').jqxGrid('refreshdata');
                $(".clslnkcustomercontact").css("display", "none");
                _vrMagnifyCloneTitle = '';
                //  pagerDisplay();
            }

        } catch (e) {

        }
    }
function CloseFunction() {
//
          if (_vrEditTaskDetails == 1) {
            
                if (_vrattachedTask != "") {
                    _vrattachedTask = "";
                    var fromdate = $("#txtFromDate").val().split('/');
                    var todate = $("#txtToDate").val().split('/');
                    var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
                    var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
                   
                    var title = $("#dialog").dialog("option", "title");
                    if ($("#dialog").dialog('isOpen') == false) {
                        $("#dialog").dialog('close');

                    } else {
                        ViewReport();
                        getReports(_vrFromdate, _vrTodate);
                    }
                } else if (_vrEditTaskDetails != "" && _vrattachedFiles != "") {
                    var title = $("#dailog").dialog("option", "title");
                    if (title == _vrSummRprtHdr || title == _vrDialogBoxProjBillSummary) {
                        _vrEditTaskDetails = "";
                        _vrattachedFiles = "";
                        _vrSummaryBillingFlag = "";
                        $("#dailog").dialog("close");
                    } else if (_vrSummaryBillingFlag != "") {
                       // _vrSummaryBillingFlag = "";
                        _vrEditTaskDetails = "";
                        _vrattachedFiles = "";
                        _vrSuccessBillingFlag = 1;
                        var fromdate = $("#txtFromDate").val().split('/');
                        var todate = $("#txtToDate").val().split('/');
                        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
                        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
                       // ViewReport();
                        viewBillingSummaryReport(_vrFromdate, _vrTodate);
                    }
                    else {
                        _vrSuccessStatus = 1;
                        var fromdate = $("#txtFromDate").val().split('/');
                        var todate = $("#txtToDate").val().split('/');
                        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
                        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];

                        if ($("#dialog").dialog('isOpen') == false) {
                            $("#dialog").dialog('close');
                        } else {
                            
                            getReports(_vrFromdate, _vrTodate);
                        }
                        $("#imgedittsk").attr("value", "");
                    }
                }
               
            
            _vrEditTaskDetails = "";
            _vrattachedFiles = "";
        }
  
           
                //_vrattachedFiles = 1;
}


//Initializes dialog box whose id is 'Dailog'
function initializeCommentdDialog() {
    $("#dailog").dialog({
        closeOnEscape: false,
        resizable: false,
        modal: true,
        height: 550,
        width: 1100,
        maxWidth: 1100,
        autoResize: true,
        autoOpen: false,
        draggable: true,
        close: CloseFunction,
        //position: {
        //    my: "center center",
        //    at: "center center"
        //},
        position: {
            my: "center center",
            at: "top top"
        },
        dialogClass: 'dialogPosition',
        open: function (event, ui) {
            //Triggers for every time of opening dailog box whose id is "dailog".
            $droppableEl = $('.gridster-container .gridster');
            $droppableEl.droppable('disable');
            // $draggableE1 = $('.gridster-cotainer .gridster .widget');
            //$draggableE1.draggable('disable');
           
        },
        beforeClose: function (event, ui) {
          
				if (_vrGridDeployMagnify == 1) {
				    _vrGridDeployMagnify = 0;
				}
				if (_vrTskOpenBugDialog == 1) {
				    $('#MagnifierDialog').dialog('open');
				    $('#MagnifierDialog').dialog('option', 'title', _vrDialogBoxBugTrail);
				    $(".clsdailogfields").css("display", "none");
				    $("#idTskOpenBugTrail").css("display", "block");
				    $(".clsTskbugtrailDates").css("display", "block");
				    $('#MagnifierDialog').append($("#idTskOpenBugTrail"));
				    FilterTskOpenBugTrail();
				    _vrTskBugOpend = 0;
				 return false;
				}
				if (_vrEditTaskDialog != "" && _vrUpdatedStatus!="") {//if (_vrEditTaskDialog != "") {
				    var dialogtitle = $("#dialog").dialog("");
				    _vrEditTaskDialog = "";
				    var tskdetail = $("#imgedittsk").attr("value");
				    var Splittskdetail = tskdetail.split(',');

				    taskLink(Splittskdetail[0], Splittskdetail[1], Splittskdetail[2]);
				    return false;
				}
                if (_vrDialogBoxNewTask == _vrDialogBoxTitle || _vrDialogBoxTitle == _vrDialogBoxTaskTrail) {//Reloads tasks by verifying closing dialog box title.

                    //  $("#chkFilterTasks").prop("checked", true);
                    if (_vrSaveExitClick == _vrSaveExitFlag) {
                        //_vrSaveExitClick = '';
                        if (_vrLocalTaskDataOnTaskClick != null) {
                            localStorage.setItem("jqxGridjqxTasksgrid", JSON.stringify(_vrLocalTaskDataOnTaskClick));
                            $("#jqxTasksgrid").jqxGrid('gotopage', _vrLocalTaskDataOnTaskClick.pagenum);
                        }
                    }
                    else {
                        if ($(".clstasks").length > 0 || $("#MagnifierDialog").dialog("isOpen") === true) {
                            if ($(".clstasks").length > 0) {
                                //$("#idSpnLoading").css("display", "block");//removing this because every time twice ajax is being made to server on saving a task
                                if (_vrCloseDialog != '1') { //Since the ajax call is made twice from the function for binding and the other from before close events while dialog close so a conditional check.
                                    if (_vrCloseDialog != '0') {
                                        var vrEmpId = $("#ddlTaskTrailEmployee").val();
                                        var vrTskTrProjId = $("#ddlTaskTrailProject").val();
                                        var vrBlnExcludecsd = $("#chkFilterTasks").prop('checked');

                                        //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + vrTskTrProjId + '&intEmployeeID=' + vrEmpId + '&blnExcludeCSD=' + vrBlnExcludecsd + '&strTokenID=' + _vrUserTokenId;
                                        //ajaxCall(_BaseUrl, loadJqxTasksGrid);
                                        bindTasksBasedOnClientID(vrTskTrProjId, vrEmpId, vrBlnExcludecsd, loadJqxTasksGrid);
                                        ClearNewTaskFields();
                                        if ($(".clsBillingReport #idBIllingReport").length > '0' && $(".clsBillingReport").attr("data-col") > 0) {
                                            loadjqxBillingReportGrid();
                                           // FilterBillingReport();//To reload data for billing widget.
                                            //$(".clsBillingReport").attr("data-col");
                                        }
                                    }
                                }
                            }
                            if ($("#MagnifierDialog").dialog("isOpen") === true && _vrMagnifyCloneTitle == _vrProjDetDialogHdr) {
                                $("#imgMagnifydialogLoader").css("display", "block");
                                _BaseUrl = _vrLocationOrigin + '/Task/GetInProgTasksByProjId?intProjId=' + _vrSelectedProjectProjId + '&strTokenID=' + _vrUserTokenId;
                                ajaxCall(_BaseUrl, bindInProgTasks);
                         
                            }
                            else if ($("#MagnifierDialog").dialog("isOpen") === true && _vrMagnifyCloneTitle == _vrDialogBoxUser) {
                                $("#imgMagnifydialogLoader").css("display", "block");
                                //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + _vrDdlDefault + '&intEmployeeID=' + _vrMagnifyUserId + '&blnExcludeCSD=' + _vrBlnExcludeDefault + '&strTokenID=' + _vrUserTokenId;
                                //ajaxCall(_BaseUrl, bindUserMagnifyGrid);
                                bindTasksBasedOnClientID(_vrDdlDefault, _vrMagnifyUserId, _vrBlnExcludeDefault, bindUserMagnifyGrid);
                            }
                        }
                    }
            

                
                }
                else if (_vrDialogBoxBugTrail == _vrDialogBoxTitle) {//Reloads bugs by veirfying closing dialog box title.
                    deleteUploadedFile();
                    FilterBugTrail(); //To reload bug trail in Bug Trail Jqx grid.
                    localStorage.setItem("jqxGridjqxBugTrial", JSON.stringify(_vrLocalBTDataOnBugClick));
                    $("#jqxBugTrial").jqxGrid('gotopage', _vrLocalBTDataOnBugClick.pagenum);
                } else if (_vrDialogBoxNewProj == _vrDialogBoxTitle) {
                    deleteUploadedProjFile();
                    _VrProjFileUploading = '';
                }
                //$("body").css("overflow", "scroll");
                //$("#dailog").css("overflow", "hidden");
                $droppableEl = $('.gridster-container .gridster');
                $droppableEl.droppable('enable');
                _vrDialogBoxTitle = '';
                _vrFlagBrDates = '0';
            /*removintg error classes for all dialogs added by harish*/
                $(".clsNewTskMandatory").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".clsnewbugmandatory").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".clsnewdeploymandatory").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".clsprojreqfields").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".clsCustomerMandatory").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".clsnewBoostermandatory").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".chosen-choices").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".chosen-single").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".chosen-default").each(function (index) {
                    $(this).removeClass('error');
                });
                $(".chosen-container").each(function (index) {
                    $(this).removeClass('error');
                });
            // chosen-container chosen-container-single error
            //  "chosen-single chosen-default error
                $(".clsNewUserMandatory").each(function (index) {
                    $(this).removeClass('error');
                });

                $(".clsquotemandatory").each(function (index) {
                    $(this).removeClass('error');
                });
            }
        
        });
 
    }



    //Calls this method if parameters contains only url and function to send fetched data from webapi.
    function ajaxCall(_BaseUrl, bindJqxGrid) {
        $(this).find("clsSpnLoading").css("display", "inline-block");
        $.ajax({
            type: 'GET',
            url: _BaseUrl,
            contentType: 'application/json;charset=utf-8',
            processData: false,
            crossDomain: true,
            dataType: 'json',
            timeout: 30000,
            success: function (data) {
                /*if (data.RecordCount == 0) {
                    $("#divMainLoader").css("display","none");
                    return;
                }*/
                if (data.ResponseId == _vrExpiredTokendIdResponse) {
                    logOutUser();
                    //return false;
                }
                if (data.RecordCount == 1) {
                    sourceGrid = data.SingleResult;
                    if (typeof sourceGrid === 'undefined') {
                        sourceGrid = data.MultipleResults;
                    }
                }
                else {
                    sourceGrid = data.MultipleResults;
                }
                bindJqxGrid(sourceGrid);
            
                return true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                displayError();
                $("#divMainLoader").css("display", "none");
                $(".clsSpnLoading").css("display", "none");
                _vrSetProjUpdateFlag = _vrClearProjUpdateFlag;//Clears flag set to update project.
                return false;
            }
        });
    }

    //Calls this method if parameters contains only url,object and function to send fetched data from webapi.
    function ajaxCallWithObject(WebUrl, ObjData, InsertData) {
        $.ajax({
            type: 'POST',
            url: WebUrl,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(ObjData),
            processData: false,
            crossDomain: true,
            dataType: 'json',
            timeout: 30000,
            success: function (data) {
                if (data.ResponseId == _vrExpiredTokendIdResponse) {
                    logOutUser();
                    //return false;
                }
                if (data.ResponseId >= _vrResponseId && _vrCommentCreatedFlag == _vrResponseId) {
                    $(".info").html(_vrCommentInsertStatus);
                    _vrCommentCreatedFlag = '';
                    showStatusDiv();
                }
                else if(_vrBugUpdateStatus == _vrFunctionalityStatus && data.ResponseId >= _vrResponseId){
                    $(".info").html(_vrBugUpdatedStatus);
                    _vrFunctionalityStatus = '';
                    showStatusDiv();
                }
                else if (_vrBugSaveStatus == _vrFunctionalityStatus && data.ResponseId >= _vrResponseId) {
                    $(".info").html(_vrBugCreatedStatus);
                    _vrFunctionalityStatus = '';
                    showStatusDiv();
                }
                else if (data.ResponseId >= _vrResponseId && _vrTaskCreation == _vrResponseId) {//To show record created  info based on response id .
                    $(".info").html(_vrTskCreatedStatus);
                    _vrTaskCreation = '';
                    showStatusDiv();
                } else if (data.ResponseId >= _vrResponseId && _vrProjCreationStatus == _vrResponseId) {
                    $(".info").html(_vrProjDataStatus);
                    _vrProjCreationStatus = '';
                    _vrProjDataStatus = '';
                    showStatusDiv();
                    LoadCountDataToCustUserProjSilde();
                }
                else if (data.ResponseId == _vrErrResponseId) {
                    $("input[type = submit]").attr("disabled", false);
                }
                else if (data.ResponseId == _vrResponseId && _vrDepInsertStatus == _vrDeployStatusId) {
                        $(".info").html(_vrDeployInsertSucess);
                        $('#dailog').dialog('close');
                        $("#divMainLoader").css("display", "none");
                        $("input[type = submit]").attr("disabled", false);
                        showStatusDiv();
                        _vrDeployStatusId = '';
                        LoadDeploymentCountDetails();
                    }
                    else if (_vrDepUpdateStatus == _vrDeployStatusId) {
                        $(".info").html(_vrDeployUpdateSucess);
                        $("#divMainLoader").css("display", "none");
                        $('#dailog').dialog('close');
                        $("input[type = submit]").attr("disabled", false);
                        showStatusDiv();
                        _vrDeployStatusId = '';
                        LoadDeploymentCountDetails();
                        
                    }
                InsertData(data);
           
            },
            error: function (jqXHR, textStatus, errorThrown) {
                displayError();
                $("#divMainLoader").css("display", "none");
                $(".clsSpnLoading").css("display", "none");
                _vrCommentCreatedFlag = '';
                _vrFunctionalityStatus = '';
                $("input[type = submit]").attr("disabled", false);
            
                return false;
            }
        });
    }

    //It contains parameters url,function to call and flag value to bind data according to flag value.
    function ajaxCallBindDropDown(BaseUrl,CallBackFunction,FlagValue) {
        $.ajax({
            type: 'GET',
            url: _BaseUrl,
            contentType: 'application/json;charset=utf-8',
            processData: false,
            crossDomain: true,
            dataType: 'json',
            timeout: 30000,
            success: function (data) {
                if (data.ResponseId == _vrExpiredTokendIdResponse) {
                    logOutUser();
                    //return false;
                }
                if (data.RecordCount == 1) {
                    sourceGrid = data.SingleResult;
                    if (typeof sourceGrid === 'undefined') {
                        sourceGrid = data.MultipleResults;
                    }
                }
                else{  
                    sourceGrid = data.MultipleResults;
                }


                CallBackFunction(sourceGrid,FlagValue);//Call back function which contains parameters as data and flag value.
            
                return true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                displayError();
           
                return false;
            }
        });
    }

      function SetDataToDrpdwnFields(data, FlagValue) {
        if ($.trim(data).length == 0) {
            return;
        }
        if (FlagValue == _vrFlagTskCustomer) {
            var value = checkDropdownValues('ddlNewTskCustomer', data[0].CustomerID);
            if (value > 0) {
                $("#ddlNewTskCustomer").val(value);
            }
            else {
                $("#ddlNewTskCustomer").val('');
            }
            if (value > 0) {
            _BaseUrl = _vrLocationOrigin + '/project/GetProjectNames?intID=' + data[0].CustomerID + '&strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskProject);
            $("#ddlNewTskSprint").empty();
            $("#ddlNewTskSprint").append("<option value='0'>Select sprint</option>");
            if (data[0].SprintID != 0) {
                bindSprintDataToDropDown(data, 'ddlNewTskSprint');
            }
           }
        }
    }
      function bindSprintDataToDropDown(data, ddlMember) {//function to set the fields in new task creation
          _vrGetBacklogID = 0;
        for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
            $("#" + ddlMember).append("<option  value='" + data[vrLoop].SprintID + "'>" + data[vrLoop].SprintName + " </option>");
            if (($.trim(data[vrLoop].SprintName)).toLowerCase() === _vrbacklog) {
                 _vrGetBacklogID = data[vrLoop].SprintID;
            }
        }
}

    //To bind values for dropdown depending on particular flag value.
    function bindFieldsToDropdown(data, FlagValue) {

        if ($.trim(data).length == 0 && FlagValue == _vrFlagTskCustomer) {
            $("#ddlNewTskCustomer").append("<option value=''>Select customer</option>");
            return;
        }
        if ($.trim(data).length == 0) {
            return;
        }

        if (FlagValue == _vrFlagPriority) {
            $("#ddlNewTskPriority").empty();
            bindDataToDropDown(data, 'ddlNewTskPriority', 'PriorityID', 'PriorityType');
    }
    else if (FlagValue == _vrFlagNewBugTrTask) {
        $("#ddlNewBugTask").empty();
        $("#ddlNewBugTask").append("<option value='0'>Select task</option>");
        bindDataToDropDown(data, 'ddlNewBugTask', 'TaskID', 'TaskName');
        $("#ddlNewBugTask").removeClass("error");
    }
    else if (FlagValue == _vrFlagTskCustomer) {
        $("#ddlNewTskCustomer").empty();
        $("#ddlNewTskCustomer").append("<option value=''>Select customer</option>");
        bindDataToDropDown(data, 'ddlNewTskCustomer', 'CustomerID', 'CustomerCompanyName');
        if (_vrProjectIDedit != "") {
            $("#ddlNewTskCustomer").val(_vrEditCustomerID);
            //$("#ddlNewTskCustomer").trigger("change");
        }
        if (_ddlTaskTrailProject != 0) {
            _BaseUrl = _vrLocationOrigin + '/Customer/GetProjectBasedCustomers?strProjectID=' + _ddlTaskTrailProject + '&strTokenID=' + _vrUserTokenId + '';
            ajaxCallBindDropDown(_BaseUrl, SetDataToDrpdwnFields, _vrFlagTskCustomer); // Setting the fields data based on selection.
        }
    }
    else if (FlagValue == _vrFlagTskProject) {
        $("#ddlNewTskProject").empty();
        $("#ddlNewTskProject").append("<option value=''>Select project</option>");
        bindDataToDropDown(data, 'ddlNewTskProject', 'ProjectID', 'ProjectName');
        if (_vrProjectIDedit != "") {
            if (_vrEditStatusReport == "") {
                $("#ddlNewTskProject").val(_vrProjectIDedit);
                GetProjectRelatedSprintDetails();
                $("#ddlNewTskProject").removeClass("error");
                $("#errNewTskError").css("display", "none");

                $("#ddlNewTskProject").trigger("change");
            }
            //$("#ddlNewTskSprint").val(_vrEditSprintID);
            ////$("#ddlNewTskOwner").val(data[0].OwnerID);
            //$("#ddlNewTskAssignTo").val(_vrEditAssignedTo);
            ////bindArrayToDropDown(data[0].ProjectModule, 'ddlNewTskModule');
            //$("#ddlNewTskModule").val(_vrEditModuleName);
            //_BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + _vrProjectIDedit + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskModules);
            // $("#ddlNewTskOwner").val(_EmpId);
        }
        else {
            if (_ddlTaskTrailProject != 0) {
                $("#ddlNewTskProject").val(_ddlTaskTrailProject);
                var value = checkDropdownValues('ddlNewTskProject', _ddlTaskTrailProject);
                if (value > 0) {
                    $("#ddlNewTskProject").trigger("change");
                }
                else {
                    $("#ddlNewTskSprint").empty();
                    $("#ddlNewTskSprint").append("<option value='0'>Select sprint</option>");
                    $("#ddlNewTskProject").val('');
                    $("#ddlNewTskSprint").val(0);
                }
            }
            else {
                $("#ddlNewTskProject").val('');
            }
        }
    }
    else if (FlagValue == _vrFlagTskModules) {
        var srcProjectMembers = data[0].LstProjectEmployees;
        var srcOtherMembers = data[0].LstOtherEmployees;
        var srcModules = data[0].LstModules[0].ModuleName;
        _vrProjVersionNum = data[0].LstModules[0].VersionNumber;
        $("#ddlNewTskModule").empty();
        $("#ddlNewTskAssignTo").empty();
        $("#ddlNewTskInformTo").empty();
        $("#ddlNewTskOwner").empty();
        $("#ddlNewTskAssignTo").append("<option value=''>Select assign to</option>");
        $("#ddlNewTskInformTo").append("<option value='' text=''>Select inform to</option>");
        $("#ddlNewTskModule").append("<option value=''>Select module</option>");
        bindOptGroup(srcProjectMembers, 'ddlNewTskAssignTo', 'ddlNewTskInformTo', 'ddlNewTskOwner', 'Project Members', 'EmpID', 'EmpFirstName');
        if (_UserRoleId != _vrClientRoleId) {
            bindOptGroup(srcOtherMembers, 'ddlNewTskAssignTo', 'ddlNewTskInformTo', 'ddlNewTskOwner', 'Other Members', 'EmpID', 'EmpFirstName');
        }
        if (_vrTaskOwnerID != "") {
            $("#ddlNewTskOwner").val(_vrTaskOwnerID);
        }
        else {
            $("#ddlNewTskOwner").val(_EmpId);
        }
        bindArrayToDropDown(srcModules, 'ddlNewTskModule');
            //bindDataToDropDown(data, 'ddlNewTskPriority', 'PriorityID', 'PriorityType');
        } else if (FlagValue == _vrFlagTaskCategory) {
            bindDataToDropDown(data, 'ddlNewTskCategory', 'TaskCategoryID', 'TaskCategoryType');
            $("#ddlNewTskCategory").val(_vrDefaultTskCatogery);


        }
        else if (FlagValue == _vrFlagNewBugTrTask) {
            $("#ddlNewBugTask").empty();
            $("#ddlNewBugTask").append("<option value='0'>Select task</option>");
            bindDataToDropDown(data, 'ddlNewBugTask', 'TaskID', 'TaskName');
            $("#ddlNewBugTask").removeClass("error");
        }
        //else if (FlagValue == _vrFlagTskCustomer) {
        //    $("#ddlNewTskCustomer").empty();
        //    $("#ddlNewTskCustomer").append("<option value=''>Select customer</option>");
        //    bindDataToDropDown(data, 'ddlNewTskCustomer', 'CustomerID', 'CustomerCompanyName');
        //    if (_ddlTaskTrailProject != 0) {
        //        _BaseUrl = _vrLocationOrigin + '/Customer/GetProjectBasedCustomers?strProjectID=' + _ddlTaskTrailProject + '&strTokenID=' + _vrUserTokenId + '';
        //        ajaxCallBindDropDown(_BaseUrl, SetDataToDrpdwnFields,_vrFlagTskCustomer); // Setting the fields data based on selection.
        //    }
        //}
        //else if (FlagValue == _vrFlagTskProject) {
        //    $("#ddlNewTskProject").empty();
        //    $("#ddlNewTskProject").append("<option value=''>Select project</option>");
        //    bindDataToDropDown(data, 'ddlNewTskProject', 'ProjectID', 'ProjectName');
        //    if (_ddlTaskTrailProject != 0) {
        //        $("#ddlNewTskProject").val(_ddlTaskTrailProject);
        //    }
        //    else {
        //        $("#ddlNewTskProject").val('');
        //    }
        //}
        else if (FlagValue == _vrReportEmp) {
            $("#ddlEmployee").empty();
            $("#ddlEmployee").append("<option value='0'>Select employee</option>");
            $("#ddlEmployee").attr("title","Select employee");
            bindDataToDropDown(data, 'ddlEmployee', 'EmpID', 'EmpFirstName');
            var vrUserNameOnTaskTrailTooltip = $("#ddlEmployee  option:selected").text();
            $("#ddlEmployee").attr("title", vrUserNameOnTaskTrailTooltip);
            if (vrLoginRoleId != 1) {
                $("#ddlEmployee").val(_EmpId);
            }
        }
        else if (FlagValue == _vrUserReports) {
            $("#ddlReports").empty();
            
            bindToReportsddl(data[0].ReportTypes, 'ddlReports');
            var vrUserNameOnTaskTrailTooltip = $("#ddlReports  option:selected").text();
            $("#ddlReports").attr("title", vrUserNameOnTaskTrailTooltip);
       
            
            $("#ddlReports").val(6);
        }
        else if (FlagValue == _vrFlagTskModules) {
            var srcProjectMembers = data[0].LstProjectEmployees;
            var srcOtherMembers = data[0].LstOtherEmployees;
            var srcModules = data[0].LstModules[0].ModuleName;
            _vrProjVersionNum = data[0].LstModules[0].VersionNumber;
            $("#ddlNewTskModule").empty();
            $("#ddlNewTskAssignTo").empty();
            $("#ddlNewTskInformTo").empty();
            $("#ddlNewTskOwner").empty();
            $("#ddlNewTskAssignTo").append("<option value=''>Select assign to</option>");
            $("#ddlNewTskInformTo").append("<option value='' text=''>Select inform to</option>");
            $("#ddlNewTskModule").append("<option value=''>Select module</option>");
            bindOptGroup(srcProjectMembers, 'ddlNewTskAssignTo', 'ddlNewTskInformTo', 'ddlNewTskOwner', 'Project Members', 'EmpID', 'EmpFirstName');
            if (_UserRoleId != _vrClientRoleId) {
                bindOptGroup(srcOtherMembers, 'ddlNewTskAssignTo', 'ddlNewTskInformTo', 'ddlNewTskOwner', 'Other Members', 'EmpID', 'EmpFirstName');
            }
            $("#ddlNewTskOwner").val(_EmpId);
            bindArrayToDropDown(srcModules, 'ddlNewTskModule');
        }
        else if (FlagValue == _vrFlagLoadBugTrEmp) {
            $("#ddlBugTrEmp").empty();
            $("#ddlTaskTrailEmployee").empty();
			$("#ddlTskOpenBugTrEmp").empty();
            $("#ddlBugTrEmp").append("<option value='0'>Select created by</option>");
            $("#ddlTaskTrailEmployee").append("<option value='0'>Select employee</option>");
			$("#ddlTskOpenBugTrEmp").append("<option value='0'>Select created by</option>");
            bindDataToDropDown(data, 'ddlBugTrEmp', 'EmpID', 'EmpFirstName');
            bindDataToDropDown(data, 'ddlTaskTrailEmployee', 'EmpID', 'EmpFirstName');
			bindDataToDropDown(data, 'ddlTskOpenBugTrEmp', 'EmpID', 'EmpFirstName');
            $("#ddlTaskTrailEmployee").val(_EmpId);
            if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
                $("#ddlTaskTrailEmployee").prop("disabled", true);
            }
            var vrUserNameOnTaskTrailTooltip = $("#ddlTaskTrailEmployee  option:selected").text();
            $("#ddlTaskTrailEmployee").attr("title", vrUserNameOnTaskTrailTooltip);
        }
        else if (FlagValue == _vrTskOpenBugsEmp) {
            $("#ddlTskOpenBugTrEmp").empty();
            $("#ddlTskOpenBugTrEmp").append("<option value='0'>Select created by</option>");
            bindDataToDropDown(data, 'ddlTskOpenBugTrEmp', 'EmpID', 'EmpFirstName');
            var vrUserNameOnTaskTrailTooltip = $("#ddlTskOpenBugTrEmp  option:selected").text();
            $("#ddlTskOpenBugTrEmp").attr("title", vrUserNameOnTaskTrailTooltip);
        }
		else if (FlagValue == _vrTskOpenBugsTaskStatus) {
        $("#ddlTskOpenBugStatus").empty();//Need to add bug status id getting from database
        $("#ddlTskOpenBugStatus").append("<option value='0'>Select status</option>");
        bindDataToDropDown(data[0].LstStatus, 'ddlTskOpenBugStatus', 'BugStatusID', 'BugStatusType');
        $("#ddlTskOpenBugStatus").val(1);
		}
        else if (FlagValue == _vrFlagBugStatus) {
            var arrLstBrowsers = data[0].LstBrowser;
            _vrBugStatus = data[0].LstStatus;
            $("#ddlBugStatus").empty();//Need to add bug status id getting from database
            $("#ddlBugStatus").append("<option value='0'>Select status</option>");
            bindDataToDropDown(data[0].LstStatus, 'ddlBugStatus', 'BugStatusID', 'BugStatusType');
            if (_vrWidgetCOntrolData.length > 0) {
                if (_BTIndexNO > -1) {
                    var vrBugStatusValue = parseInt(_vrWidgetCOntrolData[_BTIndexNO].ddlBugStatus)
                    if ((vrBugStatusValue > 0) && (vrBugStatusValue != NaN)) {
                        $("#ddlBugStatus").val(vrBugStatusValue);
                    }
                }
            }
            // bindBugStatusWidget(_vrBugStatus);
            if (_varcheckDragDrop == 0) {//Added by satish to check the drag drop count, because of bugID 5019
                $("#ddlCreateBugBrowser").append("<option value=''>Select browser</option>");
            }
            if (_vrFlagBindDataToDdl.length != 0) {
                bindDataToDropDown(data[0].LstSeverity, 'ddlNewBugSeverity', 'SeverityID', 'SeverityType');
                bindDataToDropDown(data[0].LstReproducilble, 'ddlNewBugReproducible', 'BugReproducibleID', 'BugReproducibleType');
                bindDataToDropDown(data[0].LstStatus, 'ddlNewBugStatus', 'BugStatusID', 'BugStatusType');
                bindDataToDropDown(data[0].LstType, 'ddlNewBugType', 'BugTypeID', 'BugType');
                bindDataToDropDown(data[0].LstPriority, 'ddlNewBugPriority', 'BugPriorityID', 'BugPriorityType');
                bindArrayToBrowser(arrLstBrowsers, 'ddlCreateBugBrowser');
                _vrBugStatus = data[0].LstStatus;
                _vrFlagBindDataToDdl = '';
                _varcheckDragDrop++;
            }
        }
        else if (FlagValue == _vrTskOpenBugsTsk) {
        $("#ddlTskOPenBugTrTaskName").empty();
        $("#ddlTskOPenBugTrTaskName").append("<option value='0'>Select task</option>");
        bindDataToDropDown(data, 'ddlTskOPenBugTrTaskName', 'TaskID', 'TaskName');
        $("#ddlTskOPenBugTrTaskName").val(_vrTxtTskId);
        _vrTxtTskId = 0;
		}
		else if (FlagValue == _vrFlagBugTrTask) {
            $("#ddlBugTrTaskName").empty();
            $("#ddlBugTrTaskName").append("<option value='0'>Select task</option>");
            $("#ddlBugTrTaskName option").css("width", "130px")
            bindDataToDropDown(data, 'ddlBugTrTaskName', 'TaskID', 'TaskName');
            if (_BTIndexNO > -1) {
                var vrTaskIDInDB = _vrWidgetCOntrolData[_BTIndexNO].ddlBugTrTaskName;
                if ((parseInt(vrTaskIDInDB) >= 0) && (parseInt(vrTaskIDInDB) != NaN)) {
                    $("#ddlBugTrTaskName").val(vrTaskIDInDB);
                }
            }
        }
        else if (FlagValue == _vrFlagBugTrProject) {
            $("#ddlBugTrProject").empty();
            $("#ddlBugProjectName").empty();
            $("#ddlTaskTrailProject").empty();
			$("#ddlTskOpenBugTrProject").empty();
            $("#ddlBugTrProject").append("<option value='0' title='Select project' >Select project</option>");
            $("#ddlBugProjectName").append("<option value='0'>Select project</option>");
            $("#ddlTaskTrailProject").append("<option value='0'>Select project</option>");
			$("#ddlTskOpenBugTrProject").append("<option value='0'>Select project</option>");
            //$("#ddlTaskTrailProject option").css("width", "130px");
            bindDataToDropDown(data, 'ddlBugTrProject', 'ProjectID', 'ProjectName');
            bindDataToDropDown(data, 'ddlBugProjectName', 'ProjectID', 'ProjectName');
			
            
           // $("#ddlBugProjectName").val(_vrbugname);
            
            bindDataToDropDown(data, "ddlTaskTrailProject", "ProjectID", "ProjectName");
			bindDataToDropDown(data, 'ddlTskOpenBugTrProject', 'ProjectID', 'ProjectName');
            $("#divErrNewBug").css("display", "none");
        }
        else if (FlagValue == _vrFlagNewBugFields) {
            $("#btnUpdateBug").attr("disabled", false);
            $("#divErrNewBug").css("display", "none");
            $("#ddlNewBugTask").empty();
            $("#ddlNewBugTask").append("<option value='0'>Select task</option>");
            bindDataToDropDown(data, 'ddlNewBugTask', 'TaskID', 'TaskName');
            $("#ddlNewBugTask").val(_vrExistingBugTaskId);
            $("#ddlNewBugTask").removeClass('error');
            $("#ddlBugProjectName").removeClass('error');
       
        }
        else if (FlagValue == _vrFlagBugProj) {
            $("#ddlBugTrProject").empty();
            $("#ddlBugTrProject").append("<option value='0'>Select project</option>");
            bindDataToDropDown(data, 'ddlBugTrProject', 'ProjectID', 'ProjectName');
            if (_BTIndexNO > -1) {
                var vrProjIDInDB = _vrWidgetCOntrolData[_BTIndexNO].ddlBugTrProject;
                if ((parseInt(vrProjIDInDB) >= 0) && (parseInt(vrProjIDInDB) != NaN)) {
                    $("#ddlBugTrProject").val(vrProjIDInDB);
                    if (vrProjIDInDB > 0) {
                        AjaxCallToGetProjectDataBasedOnProjectID(vrProjIDInDB, _vrFlagBugTrTask);
                    }
                }
            }
        }
        else if (FlagValue == _vrFlagBugEmp) {
            $("#ddlBugTrEmp").empty();
            $("#ddlBugTrEmp").append("<option value='0'>Select created by</option>");
            bindDataToDropDown(data, 'ddlBugTrEmp', 'EmpID', 'EmpFirstName');
            if (_BTIndexNO > -1) {
                var vrEmpIDInDB = _vrWidgetCOntrolData[_BTIndexNO].ddlBugTrEmp;
                if ((parseInt(vrEmpIDInDB) >= 0) && (parseInt(vrEmpIDInDB) != NaN)) {
                    $("#ddlBugTrEmp").val(vrEmpIDInDB);
                }
            }
            $("#txtBugTrToDate").datepicker("setDate", new Date());
            $("#txtBugTrFromDate").datepicker("setDate", -14);
            var fromdate = $("#txtBugTrFromDate").val();
            $('#txtBugTrToDate').datepicker('option', 'minDate', fromdate);
            //$('#txtBugTrToDate').datepicker('option', 'minDate', '-1d');//modified by harish on 14/01/2015
            if (_vrWidgetCOntrolData.length > 0) {
                if (_BTIndexNO > -1) {
                    if (Object.keys(_vrWidgetCOntrolData[_BTIndexNO]).length > 0) {
                        $("#txtBugTrFromDate").datepicker("setDate", _vrWidgetCOntrolData[_BTIndexNO].txtBugTrFromDate);
                        $("#txtBugTrToDate").datepicker("option", 'minDate', _vrWidgetCOntrolData[_BTIndexNO].txtBugTrFromDate);
                        $("#txtBugTrToDate").datepicker("setDate", _vrWidgetCOntrolData[_BTIndexNO].txtBugTrToDate);
                    }
                }
            }
        }

        else if (FlagValue == _vrFlagTaskProj) {
            $("#ddlTaskTrailProject").empty();
            $("#ddlTaskTrailProject").append("<option value='0'>Select project</option>");
            bindDataToDropDown(data, "ddlTaskTrailProject", "ProjectID", "ProjectName");
            if (_taskIndexNO > -1) {
                var vrProjIDInDB = _vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailProject;
                if ((parseInt(vrProjIDInDB) >= 0) && (parseInt(vrProjIDInDB) != NaN)) {
                    $("#ddlTaskTrailProject").val(vrProjIDInDB);
                }
            }
        }
        else if (FlagValue == _vrFlagTaskEmp) {
            $("#ddlTaskTrailEmployee").empty();
            $("#ddlTaskTrailEmployee").append("<option value='0'>Select employee</option>");
            bindDataToDropDown(data, 'ddlTaskTrailEmployee', 'EmpID', 'EmpFirstName');
            if (_taskIndexNO > -1) {
                var vrEmpIDInDB = _vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailEmployee;
                if ((parseInt(vrEmpIDInDB) >= 0) && (parseInt(vrEmpIDInDB) != NaN)) {
                    $("#ddlTaskTrailEmployee").val(vrEmpIDInDB);
                }
            }
            else {
                $("#ddlTaskTrailEmployee").val(_EmpId);
            }
            if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
                $("#ddlTaskTrailEmployee").prop("disabled", true);
                var vrUserNameOnTaskTrailTooltip = $("#ddlTaskTrailEmployee  option:selected").text();
                $("#ddlTaskTrailEmployee").attr("title", vrUserNameOnTaskTrailTooltip);
            }
        }

        else if (FlagValue == _vrFlagBindStatusRole) {
            var data = data[0].Status;
            bindArrayToCustomerDropDown(data, 'ddlCustomerProject');
            if (_custIndexNO != -1) {
                var vrStatusInDB = _vrWidgetCOntrolData[_custIndexNO].ddlCustomerProject;
                $("#ddlCustomerProject").val(vrStatusInDB);
                var vrSearchCust = _vrWidgetCOntrolData[_custIndexNO].idSearchCustomer;
                if (vrSearchCust.length > 0) {
                    $("#idSearchCustomer").val(vrSearchCust);
                    filterCustomerTrStatus();
                }
            }
        }
        else if (FlagValue == _vrFlagBindStatusRoleUser) {
            var data = data[0].Status;
            bindArrayToCustomerDropDown(data, 'ddlUserstatus');
            if (_userIndexNO != -1) {
                var vrStatusInDB = _vrWidgetCOntrolData[_userIndexNO].ddlUserstatus;
                $("#ddlUserstatus").val(vrStatusInDB);
                var vrSearchCust = _vrWidgetCOntrolData[_userIndexNO].txtUserSearch;
                if (vrSearchCust.length > 0) {
                    $("#txtUserSearch").val(vrSearchCust);
                    SearchUser();
                }
            }
        }
        else if (FlagValue == _vrFlagNewUserRole) {
            var data = data;
            bindDataToDropDown(data[0].GetRoles, 'ddlNewUserRole', 'UserRoleID', 'UserRole');
            $("#ddlNewUserDesignation").append("<option value=''>Select designation</option>");
            bindDataToDropDown(data[0].GetDesignations, 'ddlNewUserDesignation', 'EmpDesignationID', 'EmpDesignationName');
            $("#ddlNewUserBloodGrp").append("<option value='0'>Select group</option>");
            bindDataToDropDown(data[0].GetBloodGroups, 'ddlNewUserBloodGrp', 'BloodGroupID', 'BloodGroupType');
            bindDataToDropDown(data[0].GetTimeZones, 'ddlNewUserTimeZone', 'StandardName', 'DisplayName');
            $('#ddlNewUserTimeZone').val(_vrIndiaStandardTime);
            $('#ddlNewUserRole').val(_VrDefaultUserRole);
            if (_vrEditUserProfile == _vrUserEditProfileDefault) {
                _BaseUrl = _vrLocationOrigin + '/user/GetIndividualEmployeeData?intEmpID=' + _vrMagnifyUserId + '&strTokenID=' + _vrUserTokenId;
                ajaxCall(_BaseUrl, checkUsersDataNBind);
            } else {
                $("#divMainLoader").css("display", "none");
            }
        }
        else if (FlagValue == _vrFlagBindCountrys) {
            var data = data;
            data.sort(function (a, b) {
                return $.trim(a.CountryName).localeCompare($.trim(b.CountryName)); //return (a.CountryName - b.CountryName);
            });
            $("#ddlCountryList").append("<option value=''>Select country</option>");
            bindDataToDropDown(data, 'ddlCountryList', 'CountryId', 'CountryName');


            // console.log(data);
        }
        else if (FlagValue == _vrFlagBindUpdatedCountrys) {
            var data = data;
            $("#ddlCountryList").append("<option value=''>Select country</option>");
            bindDataToDropDown(data, 'ddlCountryList', 'CountryId', 'CountryName');
            _BaseUrl = _vrLocationOrigin + '/customer/getcustomerdata?strTokenID=' + _vrUserTokenId;
            ajaxCallWithObject(_BaseUrl, objCustomerDetailsMagnify, UpdateFunction);
        }
        else if (FlagValue == _vrFlagBIllingReportBindProjects) {
            $("#ddlBillingRprtProjectName").empty();
            $("#ddlBillingRprtProjectName").append("<option value='0'>Select project</option>");
            bindDataToDropDown(data, "ddlBillingRprtProjectName", "ProjectID", "ProjectName");
            if (_BRIndexNO > -1) {
                var vrProjIDInDB = _vrWidgetCOntrolData[_BRIndexNO].ddlBillingRprtProjectName;
                if ((parseInt(vrProjIDInDB) >= 0) && (parseInt(vrProjIDInDB) != NaN)) {
                    $("#ddlBillingRprtProjectName").val(vrProjIDInDB);
                }
            }
        }
        else if (FlagValue == _vrFlagBIllingReportBindEmployees) {
            $("#ddlBillingRprtEmpName").empty();
            $("#ddlBillingRprtEmpName").append("<option value='0'>Select employee</option>");
            bindDataToDropDown(data, 'ddlBillingRprtEmpName', 'EmpID', 'EmpFirstName');
            if (_BRIndexNO > -1) {
                var vrEmpIDInDB = _vrWidgetCOntrolData[_BRIndexNO].ddlBillingRprtEmpName;
                if ((parseInt(vrEmpIDInDB) >= 0) && (parseInt(vrEmpIDInDB) != NaN)) {
                    $("#ddlBillingRprtEmpName").val(vrEmpIDInDB);
                }
            }
            else {
                $("#ddlBillingRprtEmpName").val(_EmpId);
            }
            if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
                $("#ddlBillingRprtEmpName").prop("disabled", true);
                var vrUserNameOnBillingReprtTooltip = $("#ddlBillingRprtEmpName  option:selected").text();
                $("#ddlBillingRprtEmpName").attr("title", vrUserNameOnBillingReprtTooltip);
            }
            //$("#txtBillingRprtToDate").datepicker("setDate", new Date());
            //$("#txtBillingRprtFromDate").datepicker("setDate", -1);
        }
        else if (FlagValue == _vrGetProjFields) {
            var data = data[0];
            $("#ddlReleaseDate").empty();
            // $("#ddlReleaseDate").append("");
            //for (var vrIds = 0; vrIds < arrIds.length; vrIds++) {
            //    clearDdlAddOption(arrIds[vrIds]);
            //}
            $("#ddlNewProjManager").append("<option value='' text=''>Select project manager</option>");

            $("#ddlNewProjTechnology").append("<option value='' text=''>Select technology</option>");
            $("#ddlNewCustomer").append("<option value='' text=''>Select customer</option>");
            bindDataToDropDown(data.LstCustomers, 'ddlNewCustomer', 'CustomerID', 'CompanyName');
            bindDataAlongWithTextDdlAndConvertInverted(data.LstProjGetActiveEmp, 'ddlNewProjManager', 'EmpID', 'EmpFirstName');
            bindDataToDropDown(data.LstProjPriority, 'ddlNewProjPriority', 'PriorityID', 'PriorityType');
            bindDataToDropDown(data.LstProjTechnologies, 'ddlNewProjTechnology', 'TechnologyID', 'TechnologyName');
            bindArrayToBrowser(data.LstProjReleaseVersion, 'ddlReleaseDate');
            //createCheckBoxDynamic(data.LstProjGetActiveEmp, 'divInformToMembers', 'EmpID', 'EmpFirstName');
            _vrGetInfrmUpdCount = data.LstProjGetActiveEmp.length;
            $("#JqxWidget").jqxDropDownList({
                checkboxes: true, source: data.LstProjGetActiveEmp, displayMember: "EmpFirstName", valueMember: "EmpID", width: 303, height: 25

            });
            $("#JqxWidget").jqxDropDownList('insertAt', 'Select all', 0);

            $("#JqxWidget").jqxDropDownList(
                'setContent', 'Select employees');
            var selectedcount = 0; var selectCount = 0;
            var DropDownitems = $("#JqxWidget").jqxDropDownList('getItems');
            $("#JqxWidget").on('checkChange', function (event) {
                var item = event.args.item;
                if (event.args.label == 'Select all' && (item.checked == true)) {
                    var dblcheckedItems = "";
                    for (var index = 1; index < DropDownitems.length; index++) {
                        $("#JqxWidget").jqxDropDownList('checkIndex', index);
                        dblcheckedItems += DropDownitems[index].label + ",";
                    }

                    $("#JqxWidget").jqxDropDownList('setContent', dblcheckedItems);
                }
                else if (event.args.label == 'Select all' && (item.checked == false)) {

                    for (var index = 1; index < DropDownitems.length; index++) {
                        $("#JqxWidget").jqxDropDownList('uncheckIndex', index);
                    }


                }
                if (item && event.args.label != 'Select all') {
                    var items = $("#JqxWidget").jqxDropDownList('getCheckedItems');
                    var checkedItems = "";
                    $.each(items, function (index) {
                        if ($.trim(checkedItems).length > 0) {
                            checkedItems += ", ";
                        }
                        if (this.label == 'Select all') {
                            returnStatus = false;
                        }
                        else {
                            checkedItems += this.label;
                        }
                    });
                    $("#txtSelectedEmp").val(checkedItems);
                    $("#txtSelectedEmp").prop('title', checkedItems);
                    $("#dropdownlistContentJqxWidget").attr('title', checkedItems);
                }
            });

        // console.log(data);
    }
    else if (FlagValue == _vrFlagBindUpdatedCountrys) {
        var data = data;
        $("#ddlCountryList").append("<option value=''>Select country</option>");
        bindDataToDropDown(data, 'ddlCountryList', 'CountryId', 'CountryName');
        _BaseUrl = _vrLocationOrigin + '/customer/getcustomerdata?strTokenID=' + _vrUserTokenId;
        ajaxCallWithObject(_BaseUrl, objCustomerDetailsMagnify, UpdateFunction);
    }
        //else if (FlagValue == _vrFlagBIllingReportBindProjects) {commented by satish, because condition is already checked in above steps.
    //    $("#ddlBillingRprtProjectName").empty();
    //    $("#ddlBillingRprtProjectName").append("<option value='0'>Select project</option>");
    //    bindDataToDropDown(data, "ddlBillingRprtProjectName", "ProjectID", "ProjectName");
    //    //$("#txtBillingRprtToDate").datepicker("setDate", new Date());
    //    //$("#txtBillingRprtFromDate").datepicker("setDate", -1);
    //}
    else if (FlagValue == _vrReportProjects) {
        _vrattachedTask = "";
        $("#ddlReportPoj").empty();
        $("#ddlReportPoj").append("<option value='0'>Select project</option>");
        bindDataToDropDown(data, "ddlReportPoj", "ProjectID", "ProjectName");
        //$("#txtBillingRprtToDate").datepicker("setDate", new Date());
        //$("#txtBillingRprtFromDate").datepicker("setDate", -1);
    }
    //else if (FlagValue == _vrFlagBIllingReportBindEmployees) { commented by satish, because condition is already checked in above steps.
    //    $("#ddlBillingRprtEmpName").empty();
    //    $("#ddlBillingRprtEmpName").append("<option value='0'>Select employee</option>");
    //    bindDataToDropDown(data, 'ddlBillingRprtEmpName', 'EmpID', 'EmpFirstName');
    //    $("#ddlBillingRprtEmpName").val(_EmpId);
    //    if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
    //        $("#ddlBillingRprtEmpName").prop("disabled", true);

    //        $("#JqxWidget").jqxDropDownList('insertAt', 'Select all', 0);


    //        $("#JqxWidget").jqxDropDownList(
    //            'setContent', 'Select employees');
    //        var selectedcount = 0; var selectCount = 0;
    //        var DropDownitems = $("#JqxWidget").jqxDropDownList('getItems');
    //        $("#JqxWidget").on('checkChange', function (event) {
    //            var item = event.args.item;
    //            if (event.args.label == 'Select all' && (item.checked == true)) {
    //                var dblcheckedItems = "";
    //                for (var index = 1; index < DropDownitems.length; index++) {
    //                    $("#JqxWidget").jqxDropDownList('checkIndex', index);
    //                    dblcheckedItems += DropDownitems[index].label;
    //                }

    //                $("#JqxWidget").jqxDropDownList('setContent', dblcheckedItems);
    //            }
    //        }
    //        );
    //    }
    //}

 else if (FlagValue == _vrFlagTaskNewTaskSprintName) {
        var data = data;
        $("#ddlNewTskSprint").empty();
        bindSprintDataToTaskDropDown(data, 'ddlNewTskSprint');
        if (_vrProjectIDedit !== "") {
            $("#ddlNewTskSprint").val(_vrEditSprintID);
var sprintSelected = $("#ddlNewTskSprint").val();
            if (sprintSelected == null)
            { $("#ddlNewTskSprint").val(0); }
        }
if (parseInt(_ddlTaskTrailProject) > 0) {
    if (parseInt(_ddlTaskTrailSprint) > 0) {
        var value = checkDropdownValues("ddlNewTskSprint", _ddlTaskTrailSprint);
        if (value > 0) {
               $("#ddlNewTskSprint").val(_ddlTaskTrailSprint);
    }
               var vrstatus = $("#ddlNewTskSprint option:selected").data("status");
               if (vrstatus == 0) {
                   $('#divSprintStatusalert').dialog('option', 'title', "Sprint status");
                   $(".clsremainingfields").html(_vrFreezeSprintStatus);
                   $("#divSprintStatusalert").dialog('open');
                   $("#divSprintStatusalert").dialog("widget").effect("shake", { times: 2 }, 200);
               }
           }
           else{
               if (parseInt(_vrGetBacklogID) > 0) {
                   $("#ddlNewTskSprint").val(_vrGetBacklogID);
                   var vrstatus = $("#ddlNewTskSprint option:selected").data("status");
                   if (vrstatus == 0) {
                       $('#divSprintStatusalert').dialog('option', 'title', "Sprint status");
                       $(".clsremainingfields").html(_vrFreezeSprintStatus);
                       $("#divSprintStatusalert").dialog('open');
                       $("#divSprintStatusalert").dialog("widget").effect("shake", { times: 2 }, 200);
                   }
               }
               else {
                   $("#ddlNewTskSprint").val(0);
               }
           }
        }
    }
    else if (FlagValue == _vrFlagTaskWidgetSprintName) {
        $("#ddlTaskTrailSprint").empty();
        bindSprintDataToTaskDropDown(data, 'ddlTaskTrailSprint');
        if (_taskIndexNO > -1) {
            var vrSprintIDInDB = _vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailSprint;
            if (((parseInt(vrSprintIDInDB)) >= 0) && (vrSprintIDInDB != NaN)) {
                $("#ddlTaskTrailSprint").val(vrSprintIDInDB);
            }
        }
    }

    else if (FlagValue == _vrFlagActiveEmployees) {
        $('#ddlEmployeeName').empty().trigger('chosen:updated');
        bindDataToDropDown(data, 'ddlEmployeeName', 'EmpID', 'EmpFirstName');
        $("#ddlEmployeeName").chosen();
        $('#ddlEmployeeName').trigger('chosen:updated');
        //$('#ddlEmployeeName').attr('data-placeholder', 'Select Employee');

    }
    else if (FlagValue == _vrFlagBrActiveEmployees) {
        bindDataToDropDown(data, 'ddlFltrEmployeeName', 'EmpID', 'EmpFirstName');
        // $("#ddlEmployeeName").chosen();
    }
    else if (FlagValue == _vrFlagCategory) {
        $('#ddlCatergory').empty();
        $('#ddlCatergory').append("<option value='0'>Select category</option>");
        $('#ddlSubCatergory').empty();
        $('#ddlSubCatergory').append("<option value='0'>Select subcategory</option>");
        $(".clsbrtxtfields").val('');
        $("#lblFrequency").html('');
        $('#ddlEmployeeName').trigger('chosen:updated');
        bindDataToDropDown(data, 'ddlCatergory', 'CategoryID', 'CategoryName');


    }
    else if (FlagValue == _vrFlagSubCategory) {
        $('#ddlSubCatergory').empty();
        $(".clsbrtxtfields").val('');
        $("#lblFrequency").html('');
        $('#ddlSubCatergory').append("<option value='0'>Select subcategory</option>");
        bindDataToDropDown(data, 'ddlSubCatergory', 'SubCategoryID', 'Description');
        pushDatatoArray(data);
        $('#ddlEmployeeName').trigger('chosen:updated');
    }

           
        
          //  var ddlReleaseDateVal = $("#ddlReleaseDate option:selected").text();
          //  $("#ddlReleaseDate").prop('title', ddlReleaseDateVal);

            if (_vrSetProjUpdateFlag == _vrGetProjDataById) {
                _BaseUrl = _vrLocationOrigin + '/Project/GetProjDetailsByProjId?intProjId=' + _vrSelectedProjectProjId + '&strTokenID=' + _vrUserTokenId;
                ajaxCall(_BaseUrl, bindProjectData);
                _vrSetProjUpdateFlag = _vrClearProjUpdateFlag;

            } else {
                $("#divMainLoader").css("display", "none");
            }
            if (FlagValue == _vrFlagDeployProject) {
                $("#ddldeploymentProject").empty();
                $("#ddldeploymentProject").append("<option value='0' title='Select project' >Select project</option>");
                bindDataToDropDown(data, 'ddldeploymentProject', 'ProjectID', 'ProjectName');
                if (_vrCheklistProjectId != 0) {
                    $("#ddldeploymentProject").val(parseInt(_vrCheklistProjectId));
                }
                $("#ddldeploymentProject").chosen();
                $("#ddldeploymentProject").trigger("chosen:updated");
                if (_vrCheklistProjectId!=0) {
                $("#ddldeploymentProject").change();
            }
                //$("#ddldeploymentProject").change();
            }
            else if (FlagValue == _vrFlagDeployTask) {


                $('#ddldeploymentTask').empty();//.trigger("chosen:updated");

                //$("#ddldeploymentTask").append("<option value='0' title='Select task' >Select task</option>");
                bindDataToDropDown(data, 'ddldeploymentTask', 'TaskID', 'TaskName');
                var depdata='';
                if ($.trim(_vrSelTaskNames).length>0) {
                    depdata = _vrSelTaskNames.split(',');
                }
                 
                $("#ddldeploymentTask").chosen();
                $.each(depdata, function (key, value) {
                    $('#ddldeploymentTask').append($("<option></option").val(value).html(value));
                    $('#ddldeploymentTask option:contains(' + value + ')').attr('selected', 'selected').trigger("chosen:updated");
                });
                
                $("#ddldeploymentTask").trigger("chosen:updated");




                $('#ddlAssTaskList').empty();//.trigger("chosen:updated");



                bindDataToDropDown(data, 'ddlAssTaskList', 'TaskID', 'TaskName');
                var Taskdata = '';
                if ($.trim(_vrTaskChosenTaskName).length > 0) {
                    Taskdata = _vrTaskChosenTaskName.split(',');
                }

                $("#ddlAssTaskList").chosen();
                //$("#ddlAssTaskList").empty().trigger("chosen:updated");
                $.each(Taskdata, function (key, value) {
                    $('#ddlAssTaskList').append($("<option></option").val(value).html(value));
                    $('#ddlAssTaskList option:contains(' + value + ')').attr('selected', 'selected').trigger("chosen:updated");
                });

                $("#ddlAssTaskList").trigger("chosen:updated");

            }

            else if (FlagValue == _vrFlagDeployApplication) {
                $('#ddldeploymentApplication').empty();//.trigger("chosen:updated");


               // for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
                    //if (data[vrLoop].Name.length > length) {
                    //    sprintname = data[vrLoop].Name.substr(0, length) + "..";
                    //}
                    //else {
                    //    sprintname = data[vrLoop].Name;
                    //}
                 //   $("#" + ddlMember).append("<option  value=" + data[vrLoop].ID + ">" + data[vrLoop].Name + " </option>");

                    $("#ddldeploymentApplication").append("<option value='0' title='Select application' >Select application</option>");
                    bindDataToDropDown(data, 'ddldeploymentApplication', 'CheckListAppID', 'ApplicationName');
                    $("#ddldeploymentApplication").val(_vrChecklistAppID);
                    $("#ddldeploymentApplication").chosen();
                        $("#ddldeploymentApplication").trigger("chosen:updated");
                        if (_vrChecklistAppID != 0) {
                            $("#ddldeploymentApplication").change();
                        }

            }
            else if (FlagValue == _vrFlagActiveEmployees) {
                bindDataToDropDown(data, 'ddlEmployeeName', 'EmpID', 'EmpFirstName');
                $("#ddlEmployeeName").chosen();


            }
 else if (FlagValue == _vrFlagTaskAssociate)
            {
                $("#ddlAssTask").empty();
                $("#ddlAssTask").append("<option value='0'>Select task</option>");
                 bindAssTaskDataToTaskDropDownTaskDetails(data, 'ddlAssTask', 'TaskID', 'TaskName');
            }
else if (FlagValue == _vrFlagTaskListAssociate) {

                     $('#ddlAssTaskList').empty();//.trigger("chosen:updated");

                     bindDataToDropDown(data, 'ddlAssTaskList', 'TaskID', 'TaskName');
                     var Taskdata = '';
                     if ($.trim(_vrTaskChosenTaskName).length > 0) {
                         Taskdata = _vrTaskChosenTaskName.split(',');
                     }
                     
                     $("#ddlAssTaskList").chosen();
                     if (Taskdata.length > 0)
                     {
                         $('#ddlAssTaskList').val(Taskdata).text();
                     }
                     
                     $("#ddlAssTaskList").trigger("chosen:updated");
                 }
        }
    
  
function bindSprintDataToTaskDropDown(data, ddlMember) {
    var sprintname = "";
    $("#" + ddlMember).append("<option value='0'>Select sprint</option>");

        for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
            //if (data[vrLoop].Name.length > length) {
            //    sprintname = data[vrLoop].Name.substr(0, length) + "..";
            //}
            //else {
            //    sprintname = data[vrLoop].Name;
            //}
            $("#" + ddlMember).append("<option  value=" + data[vrLoop].ID + ">" + data[vrLoop].Name + " </option>");

            $("#ddldeploymentApplication").append("<option value='0' title='Select Application' >Select Application</option>");
            bindDataToDropDown(data, 'ddldeploymentApplication', 'CheckListAppID', 'ApplicationName');
            $("#ddldeploymentApplication").chosen();
            $("#ddldeploymentApplication").trigger("chosen:updated");
        }
    }
    
function bindDataToDropDown(data, ddlMember, ddlId, ddlText) {
    $.each(data, function (i, item) {
        //$('#' + ddlMember).append($('<option>', {
        //    value: item[ddlId],
        //    text: item[ddlText],
        //    title: item[ddlText]
        //}));
        $("#" + ddlMember).append('<option value="' + item[ddlId] + '" text="' + $.trim(convertDoubleInvertedtoCode(item[ddlText])) + '">' + $.trim(item[ddlText]) + '</option>');
    });
    //if (_vrProjectIDedit != "") {
    //    $("#ddlNewTskCustomer").val(_vrEditCustomerID);
    //    $("#ddlNewTskCustomer").trigger("change");
    //}
}

function bindArrayToDropDown(data, ddlMember) {

    if ($.trim(data).length == 0) {

        if (_vrProjectIDedit != "") {

            //$("#ddlNewTskProject").trigger("change");

            //$("#ddlNewTskOwner").val(data[0].OwnerID);
            $("#ddlNewTskAssignTo").val(_vrEditAssignedTo);
            $("#ddlNewTskAssignTo").removeClass("error");
            $("#errNewTskError").css("display", "none");
            //bindArrayToDropDown(data[0].ProjectModule, 'ddlNewTskModule');
            $("#ddlNewTskModule").val(_vrEditModuleName);
            //_BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + _vrProjectIDedit + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskModules);
            // $("#ddlNewTskOwner").val(_EmpId);
            $("#ddlNewTskSprint").val(_vrEditSprintID);
            //$("#ddlNewTskOwner").val(data[0].OwnerID);
            //$("#ddlNewTskAssignTo").val(_vrEditAssignedTo);
            //bindArrayToDropDown(data[0].ProjectModule, 'ddlNewTskModule');
            $("#ddlNewTskModule").val(_vrEditModuleName);
            //  $("#ddlSelectModule").val(_vrEditModuleName);
            if (_vrEditInformTo.indexOf(',') > -1) {
                //var splitinformto = _vrEditInformTo.split(',');
                //for (var index = 0; index < splitinformto.length; index++) {
                //    _vrInformToText = getInformPersonNames('ddlNewTskInformTo', splitinformto[index]);
                //  // $("#ddlNewTskInformTo").val(splitinformto[index]);

                // $("#ddlNewTskInformTo").trigger("change");
                //}
                var _vrInformToEditTskText = getInformPersonNames('ddlNewTskInformTo', _vrEditInformTo);
                $("#txtNewTskInformTo").val(_vrInformToEditTskText);
            }
            else {
                if (_vrEditInformTo.length != "") {
                    //$("#ddlNewTskInformTo").val(_vrEditInformTo);
                    //      $("#ddlNewTskInformTo").trigger("change");
                    var _vrInformToEditTskText = getInformPersonNames('ddlNewTskInformTo', _vrEditInformTo);
                    $("#txtNewTskInformTo").val(_vrInformToEditTskText);
                }
            }
            $("#ddlNewTskInformTo").val('');
        }
        return;

    }
    var vrArrModules = data.split(',');
    // $("#ddlNewTskModule").append("<option value='" + '' + "'>Select module</option>");
    for (var vrLoop = 0; vrLoop < vrArrModules.length; vrLoop++) {
        if (vrArrModules[vrLoop].length > 0) {
            $("#" + ddlMember).append("<option value='" + vrArrModules[vrLoop] + "'>" + vrArrModules[vrLoop] + "</option>");
        }
    }
        if (_vrProjectIDedit != "") {
           
          
               // $("#ddlNewTskProject").trigger("change");
          
            //$("#ddlNewTskOwner").val(data[0].OwnerID);
            $("#ddlNewTskAssignTo").val(_vrEditAssignedTo);
            $("#ddlNewTskAssignTo").removeClass("error");
            $("#errNewTskError").css("display", "none");
            //bindArrayToDropDown(data[0].ProjectModule, 'ddlNewTskModule');
            $("#ddlNewTskModule").val(_vrEditModuleName);
            //_BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + _vrProjectIDedit + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskModules);
            // $("#ddlNewTskOwner").val(_EmpId);
            $("#ddlNewTskSprint").val(_vrEditSprintID);
            //$("#ddlNewTskOwner").val(data[0].OwnerID);
            //$("#ddlNewTskAssignTo").val(_vrEditAssignedTo);
            //bindArrayToDropDown(data[0].ProjectModule, 'ddlNewTskModule');
            $("#ddlNewTskModule").val(_vrEditModuleName);
            if (_vrEditInformTo.indexOf(',') > -1) {
                //var splitinformto = _vrEditInformTo.split(',');
                //for (var index = 0; index < splitinformto.length; index++) {
                //    _vrInformToText = getInformPersonNames('ddlNewTskInformTo', splitinformto[index]);//To show text in "inform to" text box in add comment box for particular task.
                //    $("#txtCommInformTo").val(_vrInformToText);
                //}
                var _vrInformToEditTskText = getInformPersonNames('ddlNewTskInformTo', _vrEditInformTo);
                $("#txtNewTskInformTo").val(_vrInformToEditTskText);
            }
            else {
                if (_vrEditInformTo.length != "") {
                    //$("#ddlNewTskInformTo").val(_vrEditInformTo);
                    //$("#ddlNewTskInformTo").trigger("change");
                    var _vrInformToEditTskText = getInformPersonNames('ddlNewTskInformTo', _vrEditInformTo);
                    $("#txtNewTskInformTo").val(_vrInformToEditTskText);
                }
            }
            $("#ddlNewTskInformTo").val('');
        }
      
            }
    
    function bindSprintDataToTaskDropDown(data, ddlMember) {
        // var sprintname = "";
        $("#" + ddlMember).append("<option value='0'>Select sprint</option>");
		if (ddlMember == "ddlNewTskSprint") {
        var ddlsprintdata = data;
        data = jQuery.grep(ddlsprintdata, function (element, index) {
            return element.Status === 0 || element.Status === 1;// retain appropriate elements
        });
        }
        //if (ddlMember == 'ddlNewTskSprint') {
        //    var length = 50;
        //} else {
        //    var length = 20;
        //}
        for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
            //if (data[vrLoop].Name.length > length) {
            //    sprintname = data[vrLoop].Name.substr(0, length) + "..";
            //}
            //else {
            //    sprintname = data[vrLoop].Name;
            //}
            $("#" + ddlMember).append("<option value='" + data[vrLoop].ID + "'data-status='" + data[vrLoop].Status + "' >" + data[vrLoop].Name + " </option>");
        }
    

}
 function bindAssTaskDataToTaskDropDown(data, ddlMember, ddlId, ddlText) {
      
        for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
            $("#" + ddlMember).append("<option  value='" + data[vrLoop].TaskID + "' text='" + data[vrLoop].TaskName + "'data-TaskProjectID='" + data[vrLoop].TaskProjectID + "'>" + data[vrLoop].TaskName + " </option>");
        }


    }
function bindAssTaskDataToTaskDropDownTaskDetails(data, ddlMember, ddlId, ddlText) {

     for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
         var _vrname = data[vrLoop].TaskName;
         if (data[vrLoop].TaskName.length > 50) {
             var vrText = data[vrLoop].TaskName.substr(0, 50) + '...';
             //return vrText;
             $("#" + ddlMember).append("<option  title='" + data[vrLoop].TaskName + "'value='" + data[vrLoop].TaskID + "' text='" + data[vrLoop].TaskName + "'data-TaskProjectID='" + data[vrLoop].TaskProjectID + "'>" + vrText + " </option>");
         } else {
             $("#" + ddlMember).append("<option  value='" + data[vrLoop].TaskID + "' text='" + data[vrLoop].TaskName + "'data-TaskProjectID='" + data[vrLoop].TaskProjectID + "'>" + data[vrLoop].TaskName + " </option>");
         }
     }


 }
function bindArrayToCustomerDropDown(data, ddlMember) {
    if ($.trim(data).length == 0) {
        return;   }
    //As not getting pattern to bind in for loop correctly for showing active and inactive status we are hardcoding.
    $("#" + ddlMember).append("<option value=''>" + data[0] + "</option>");
    $("#" + ddlMember).append("<option value='1'>" + data[1] + "</option>");
    $("#" + ddlMember).append("<option value='0'>" + data[2] + "</option>");
    //END of binding status .

}

    function bindDataToDropDown(data, ddlMember, ddlId, ddlText) {
        $.each(data, function (i, item) {
            //$('#' + ddlMember).append($('<option>', {
            //    value: item[ddlId],
            //    text: item[ddlText],
            //    title: item[ddlText]
            //}));
            $("#" + ddlMember).append('<option value="' + item[ddlId] + '" text="' + $.trim(convertDoubleInvertedtoCode(item[ddlText])) + '">' + $.trim(item[ddlText]) + '</option>');
        });
        //$("#" + ddlMember).removeClass('error');

    }

    function bindDataAlongWithTextDdl(data, ddlMember, ddlId, ddlText) {
        $.each(data, function (i, item) {
            $("#" + ddlMember).append('<option value="' + item[ddlId] + '" text="' + $.trim(convertDoubleInvertedtoCode(item[ddlText])) + '">' + $.trim(item[ddlText]) + '</option>');
        });
    }
    function bindDataAlongWithTextDdlAndConvertInverted(data, ddlMember, ddlId, ddlText) {
        $.each(data, function (i, item) {
            $("#" + ddlMember).append('<option value="' + item[ddlId] + '" text="' + $.trim(convertDoubleSingleQuotetoNormalChar(item[ddlText])) + '">' + $.trim(item[ddlText]) + '</option>');
        });
    }

    function createCheckBoxDynamic(data, divMember, value, text) {
        $('#' + divMember).append($('<div><input type="checkbox" id="chkEmpSelectAll" value="" onclick="checkAllCheckboxes();"/> <label for="chkEmpSelectAll"> Select all</label></div>'));
        $.each(data, function (i, item) {
            $('#' + divMember).append($('<div class="clsactiveempchkboxes"><input type="checkbox" class="clsprojcheckboxes" value="' + item[value] + '" id="chkEmp' + item[value] + '"/> <label for="chkEmp' + item[value] + '" title="' + convertDoubleInvertedtoCode(item[text]) + '">' + CropTextHtml(item[text], _vrChkEmpLength) + '</label></div>'));
        });
    }


    //function bindArrayToDropDown(data, ddlMember) {
    //    if ($.trim(data).length == 0) {
    //        return;
    //    }
    //    var vrArrModules = data.split(',');
    //    // $("#ddlNewTskModule").append("<option value='" + '' + "'>Select module</option>");
    //    for (var vrLoop = 0; vrLoop < vrArrModules.length; vrLoop++) {
    //        if (vrArrModules[vrLoop].length > 0) {
    //            $("#" + ddlMember).append("<option value='" + vrArrModules[vrLoop] + "'>" + vrArrModules[vrLoop] + "</option>");
    //        }
    //    }
    //}
    function bindArrayToCustomerDropDown(data, ddlMember) {
        if ($.trim(data).length == 0) {
            return;
        }
        //As not getting pattern to bind in for loop correctly for showing active and inactive status we are hardcoding.
        $("#" + ddlMember).append("<option value=''>" + data[0] + "</option>");
        $("#" + ddlMember).append("<option value='1'>" + data[1] + "</option>");
        $("#" + ddlMember).append("<option value='0'>" + data[2] + "</option>");
        //END of binding status .

    }
    function bindArrayToBrowser(data, ddlMember) {
        if ($.trim(data).length == 0) {
            return;
        }
    
        for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
            $("#" + ddlMember).append("<option value='" + vrLoop + "' text='" + data[vrLoop] + "'>" + data[vrLoop] + "</option>");
        }
    }
    function bindOptGroup(data, ddlAssign, ddlInform, ddlTaskOwner, groupName, ddlId, ddlText) {
        if (_UserRoleId != _vrClientRoleId) {
            $("#ddlNewTskAssignTo").append("<optgroup label='" + groupName + "'>");
            $("#ddlNewTskInformTo").append("<optgroup label='" + groupName + "'>");
            $("#ddlNewTskOwner").append("<optgroup label='" + groupName + "'>");
        }
        $.each(data, function (i, item) {
            if (typeof item[ddlText] !== 'undefined') {
                $("#" + ddlAssign).append("<option value=" + item[ddlId] + ">" + item[ddlText] + "</option>");
                $("#" + ddlInform).append('<option value="' + item[ddlId] + '" text="' + $.trim(convertDoubleSingleQuotetoNormalChar(item[ddlText])) + '">' + $.trim(item[ddlText]) + '</option>');
                $("#" + ddlTaskOwner).append("<option value=" + item[ddlId] + ">" + item[ddlText] + "</option>");
            }
        });
        if (_UserRoleId != _vrClientRoleId) {
            $("#ddlNewTskAssignTo").append("</optgroup>");
            $("#ddlNewTskInformTo").append("</optgroup>");
            $("#ddlNewTskOwner").append("</optgroup>");
        }
    }

    function uploadFile(WebUrl,AttachFile,FileId) {
        var data = new FormData();
        var files = $("#" + FileId).get(0).files;
        var flName = files[0].name;
        var fileNameWithoutExtntion = flName.substr(0, flName.lastIndexOf('.'));
        var fileExt = flName.substr(flName.lastIndexOf('.') + 1, flName.length - 1);
        fileExt = fileExt.toLowerCase();
        var totalFilesSize = 0;
        for (var i = 0; i < files.length; i++) {                            // to find out uploaded files size at a time
            totalFilesSize = totalFilesSize+files[i].size; 
        }
        if (/^[ A-Za-z0-9_@.()-]*$/.test(fileNameWithoutExtntion) == false) {//To check file name is contains special characters or not
            $("#divMainLoader").css("display", "none");
            displayMessage(_vrAlert, _vrFileNameVeirfy);
            return false;
        }

        if (jQuery.inArray(fileExt, _vrArrValidExtensions) == '-1') {
            $("#divMainLoader").css("display", "none");
            displayMessage(_vrAlert, _vrValidFileFormatExtMessage);
            return false;
        }

        //Add the uploaded image content to the form data collection
        if (parseInt(totalFilesSize) > parseInt(_vrFileSize)) {
            $("#divMainLoader").css("display", "none");
            displayMessage(_vrAlert, _vrAttachedFileMessage);
            return false;
        }
        else if (parseInt(totalFilesSize) == parseInt(_VrDefaultFileSize)) {
            $("#divMainLoader").css("display", "none");
            displayMessage(_vrAlert, _vrFileSizeMsg);
            $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());
            return false;
        }
        for (var i = 0; i < files.length; i++) {
            data.append("UploadedFile"+i+"", files[i]);
        }
    
        // Make Ajax request with the contentType = false, and procesDate = false
        $("#imgProjFileLoader").css("display", "inline");
        $.ajax({
            type: 'POST',
            url: WebUrl,
            contentType: false,
            data: data,
            processData: false,
            success: function (data) {
                //  $("#flCommUpload").val('');
                AttachFile(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                displayError();
                _vrFileUploading = _vrFileUploadComplete;
                return false;
            }

        });
        //$("#imgProjFileLoader").css("display", "none");
    }

    function returnBool(_BaseUrl, Validate) {
        $.ajax({
            type: 'GET',
            url: _BaseUrl,
            contentType: 'application/json;charset=utf-8',
            processData: false,
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                Validate(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                displayError();
                return false;
            }
        });
    }

    function showStatusDiv() {
        $("input[type = submit]").attr("disabled", false);
        $(".info").show();
        setTimeout(function () { $(".info").fadeOut(); }, _vrSetTime);
    
    }
    function deleteUploadedFile() {
        if (($.trim(_vrFunctionalityStatus).length == 0 ) || ($.trim(_vrFileUploading).length > 0)) {
            var vrAttachedFiles = '';
            $(".clsbugdynfilename").each(function (index) {
                var vrFileName = $(this).prop("title");
                vrAttachedFiles = vrAttachedFiles + vrFileName;
            });
            vrAttachedFiles = vrAttachedFiles + _vrUploadedCancFile;
            if (vrAttachedFiles.length>0) {
                _BaseUrl = _vrLocationOrigin + '/Bug/DeleteFile'; //Need to do.
                var objBugDetails = {
                    FileName: vrAttachedFiles,
                    TokenID: _vrUserTokenId
                };
                _vrUploadedCancFile = _vrFileUploadComplete;
                ajaxCallWithObject(_BaseUrl, objBugDetails, clearAttachedFiles);
            }

        }
        //else if () {
        //    _BaseUrl = _vrLocationOrigin + '/Bug/DeleteFile'; //Need to do.
        //    var objBugDetails = {
        //        FileName: vrAttachedFiles
        //    };
        //    _vrUploadedCancFile = _vrFileUploadComplete;
        //}
    }


    function bindDataToJqx(GridId, sourceData, _Columns, GridWidth) {
    
    // initialize jqxGrid
    //if (typeof localStorage.jqxGridjqxTasksgrid != 'undefined') {
    //    $("#jqxProjectsGrid").jqxGrid('loadstate', JSON.parse(localStorage.jqxGridjqxProjectsGrid));
    //    }
    try {

        $("#" + GridId).jqxGrid(
        {
            width: GridWidth,
            source: sourceData,
            //selectionmode: 'multiplerowsextended',
            sortable: true,
            pageable: true,
            pagerbuttonscount: 3,
            autoheight: true,
            enabletooltips: true,
            editable: true,
            editmode: 'click',
            columnsresize: true,
           // selectionmode: 'singlecell',
            pagermode: 'simple',
            filterable: true,
           // editable: true,
            autosavestate: true,
            autoloadstate: true,
            columns: _Columns
        });
        disableJqxPagerButtonsOnLoad(GridId);
        $(".clsslideinner").find('button').prop("disabled", false);
        $("#" + GridId).on("pagechanged", function (event) {
            disableEnablePagingButtons(GridId, event);
        });
       // $("#ReportGrid").jqxGrid({ pagesize: 15 });
        if (GridId == _vrJqxTasksGrid) {
            filterTaskTrailSprintDataJqxGrid();

 
            }

            //pagerDisplay();
        } catch (e) {
            var vrValError = e;

        }
    }
    function bindDataToJqxInMagnifier(GridId, sourceData, _Columns, GridWidth) {


    // initialize jqxGrid
    try {
        $("#" + GridId).jqxGrid(
        {
            width: GridWidth,
            source: sourceData,
            //selectionmode: 'multiplerowsextended',
            sortable: true,
            pageable: true,
            pagerbuttonscount: 3,
            autoheight: true,
            enabletooltips: true,
            pagermode: 'simple',
            filterable: true,
            //autosavestate: true,
            //autoloadstate: true,
            columns: _Columns,
            columnsresize: true
          
        });
        $(".clsslideinner").find('button').prop("disabled", false);   
        } catch (e) {
            var vrValError = e;
        }
    }
    function clearAttachedFiles() {
        $("#divInnerAttachedFiles").empty();
    }


    function displayFormat(vrHrs) {
        if (vrHrs != null) {
            var vrColonBoool = '';
            vrHrs = vrHrs.toString();
            if (vrHrs.indexOf(':') > -1) {
                vrHrs = vrHrs.replace(':', '.');
                vrColonBoool = '1';
            }
            if (isNaN(vrHrs) || $.trim(vrHrs).length == 0) {
                $(this).val("");
            }
            else {
                var vrHrsSplit = vrHrs.split('.');
                var vrHrs = vrHrsSplit[0].length == 0 ? _vrDefaultHours : DoubleDigit(vrHrsSplit[0]);
                var vrMinutes = vrHrsSplit.length == 1 || vrHrsSplit[1].length == 0 ? _vrDefaultHours : ZeroRightDigit(vrHrsSplit[1], vrColonBoool);
                return vrHrs + ":" + vrMinutes;
                //}
                // else {
                //     return vrHrs + ":" + _vrDefaultHours;
                // }
            }
        }
    }
    function displayError() {
        // _vrAlert = Error;
        $(".clsslideinner").find('button').prop("disabled", false);
        $('#divUnderDevelopment').dialog('option', 'title', _vrAlert);
        $("#divUnderDevelopment").dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogUnderDevelopment' });
        $(".clsremainingfields").html(_vrErrorMsg);
        $("#flCommUpload").replaceWith($("#flCommUpload").clone());

    }




    function replaceColon(value) {
        var vlValue = value.replace(':', '.');
        var vrRes = vlValue.split('.');
        if (vrRes.length == 2) {
            var vrResVal = (parseInt(vrRes[1]) / 0.6);
            vrResVal = vrResVal.toString().split('.');
            if (vrResVal[0].toString().length == 1) {
                vrResVal = '0' + vrResVal;
                return vrRes[0] + '.' + vrResVal;
            }
            return  vrRes[0] + '.' +vrResVal[0];
        }
        else {
            return vlValue;
        }
    }


    function displayFormat(vrHrs) {
        if (typeof vrHrs == 'undefined') {
            vrHrs = 0;
        }
        var vrColonBoool = '';
        vrHrs = vrHrs.toString();
        if (vrHrs.indexOf(':')>-1) {
            vrHrs = vrHrs.replace(':', '.');
            vrColonBoool = '1';
        }
        if (isNaN(vrHrs) || $.trim(vrHrs).length == 0) {
            $(this).val("");
        }
        else {
            var vrHrsSplit=vrHrs.split('.');
            var vrHrs = vrHrsSplit[0].length == 0 ? _vrDefaultHours : DoubleDigit(vrHrsSplit[0]);
            var vrMinutes = vrHrsSplit.length == 1 || vrHrsSplit[1].length == 0 ? _vrDefaultHours : ZeroRightDigit(vrHrsSplit[1], vrColonBoool);
            return vrHrs + ":" + vrMinutes;
            //}
            // else {
            //     return vrHrs + ":" + _vrDefaultHours;
            // }
        }
    }

    //Sets digit to two letters if sended value is single letter.
    function DoubleDigit(value) {
        if (value < 10 && (value.length == 1 )) {
            return '0' + value;
        }
        else {
            if (value.length > _vrMaxLengthTxt) {
                value = value.substr(0, _vrMaxLengthTxt);
            }
            return value;
        }
    }

    //Sets digit to two digits if sended value is lessthan 10
    function DoubleDigitNum(value) {
        if (value < 10 ) {
            return '0' + value;
        }
        else {
        
            return value;
        }
    }


    function ZeroRightDigit(value,vrFlag) {
        if (value < 10 && value.length == 1) {
            var valRes = '';
            if (vrFlag != '1') {
                valRes = value + '0';
                var valMin = Math.round(parseFloat(valRes) * (0.6));
                if (valMin.toString().length == 1) {
                    valMin = '0' + valMin;
                }
                return valMin.toString().substr(0, 2);
            }
            else {
                valRes = '0'+value ;
                return valRes;
            }
        }
        else {
            if (vrFlag != '1') {
                var valMin = Math.round((parseFloat(value) * (0.6)));
                if (valMin.toString().length == 1) {
                    valMin = '0' + valMin;
                }
                return valMin.toString().substr(0, 2);
            } else {
                return value;
            }
        }
    }

    function displayMessage(vrDialogTitle, vrMessage) {
        $("input[type = submit]").attr("disabled", false);
        $('#divUnderDevelopment').dialog('option', 'title', vrDialogTitle);
        $("#divUnderDevelopment").dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogUnderDevelopment' });
        $(".clsremainingfields").html(vrMessage);
    }

    function openMagnifyDialogBox(vrMagDialogTitle,MagGridId,pagerSize) {
        //  initializeCommDialog('MagnifierDialog', '1100', '552');
        $('#MagnifierDialog').dialog('option', 'title', vrMagDialogTitle);
        $(".clsdailogfields").css("display", "none");
        $('#MagnifierDialog').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
        $("#" + MagGridId).jqxGrid({ pagesize: 14 });
        _vrMagnifyCloneTitle = vrMagDialogTitle;
        //pagerMgnfierDisplay();
    }

    function setDefaultValuesBugTrail() {
        _vrblnProjId = false, _vrblnTaskId = false, _vrblnStatus = false, _vrFilterDates = true, _vrblnEmpName = false;
        _vrddlProjId = '0', _vrddlTaskId = '0', _vrddlStatus = '0', _vrddlEmpName = '0', _vrBugTrFromDate = '', _vrBugTrToDate = '';
    }


function openMagnifyDialogBox(vrMagDialogTitle, MagGridId, pagerSize) {
    //  initializeCommDialog('MagnifierDialog', '1100', '552');
    $('#MagnifierDialog').dialog('option', 'title', vrMagDialogTitle);
    $(".clsdailogfields").css("display", "none");
    $('#MagnifierDialog').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
    //$('#MagnifierDialog').dialog({modal:false})
    //$("#" + MagGridId).jqxGrid({ filterable: true });
    //$("#" + MagGridId).jqxGrid('applyfilters');
    $("#" + MagGridId).jqxGrid({ pagesize: 14 });
    _vrMagnifyCloneTitle = vrMagDialogTitle;
    //pagerMgnfierDisplay();
}

    //To capitalise only first character and make remaining all in small characters
    //function capitalize(value) {
    //    return value[0].toUpperCase() + value.slice(1).toLowerCase();
    //}


    function bindBugStatus() {
        bindDataToDropDown(_vrBugStatus, 'ddlBugStatus', 'BugStatusID', 'BugStatusType');
    }

    //Function to replace single and double inverted characters.
    function convertDoubleSingleQuotetoChar(value) {
        if (typeof value != 'undefined' && value.length > 0) {
            value = JSON.stringify(value.replace(/\"/g, '&@%!~').replace(/\'/g, '#%&%#'));
        } else {
            value = JSON.stringify(value);
        }
        return value;
    }

    function convertCharToDoubleSingle(value) {
        if (typeof value != 'undefined' && value.length > 0) {
            return value.replace(/\&@%!~/g, '"').replace(/\#%&%#/g, "'");
        }

    }
    //END of adding by ashok

    function convertDoubleSingleQuotetoNormalChar(value) {
        if (typeof value != 'undefined' && value.length > 0) {
            value = value.replace(/\"/g, '&@%!~').replace(/\'/g, '#%&%#');
        } else {
            value = value;
        }
        return value;
    }


    function convertDoubleInvertedtoCode(value) {
        if(typeof value != 'undefined'){
            value = value.replace(/\"/g, '&quot;');
        }
        return value;
    }
    //Handles back space event in readonly textbox.
    $(document).keydown(function (e) {
        var key = e.which;
        if (key == 8 && $(e.target).attr("readonly"))  // the enter key code
        {
            e.returnValue = false;
            return false;
        }
    });

    function disableJqxPagerButtonsOnLoad(jqxGridId) {
        var paginginformation = $('#' + jqxGridId).jqxGrid('getpaginginformation');
        if (paginginformation.pagenum == 0 && (paginginformation.pagescount == 0 || paginginformation.pagescount == 1)) {
            $("#" + jqxGridId + " div[title='first']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='previous']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='last']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='next']").jqxButton({ disabled: true });
        } else if (paginginformation.pagenum == 0 ) {
            $("#" + jqxGridId + " div[title='first']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='previous']").jqxButton({ disabled: true });
        }
    
    }

    function disableEnablePagingButtons(jqxGridId,event) {
        var paginginformation = $('#' + jqxGridId).jqxGrid('getpaginginformation');
        var pagescount = paginginformation.pagescount;
        var currentPage = event.args.pagenum;
        if (currentPage == 0) {
            $("#" + jqxGridId + " div[title='first']").jqxButton({ disabled: true }).css("background-color", "#efefef");
            $("#" + jqxGridId + " div[title='previous']").jqxButton({ disabled: true }).css("background-color", "#efefef");;
        } else {
            $("#" + jqxGridId + " div[title='first']").jqxButton({ disabled: false }).css("background-color", "#efefef");;
            $("#" + jqxGridId + " div[title='previous']").jqxButton({ disabled: false }).css("background-color", "#efefef");;
        };
        if (currentPage == (pagescount - 1)) {
            $("#" + jqxGridId + " div[title='last']").jqxButton({ disabled: true }).css("background-color", "#efefef");;
            $("#" + jqxGridId + " div[title='next']").jqxButton({ disabled: true }).css("background-color", "#efefef");;
        } else {
            $("#" + jqxGridId + " div[title='last']").jqxButton({ disabled: false }).css("background-color", "#efefef");;
            $("#" + jqxGridId + " div[title='next']").jqxButton({ disabled: false }).css("background-color", "#efefef");;
        };
    }


    var linkrenderer_tasksmagnifier = function (row, column, value) {
        return linkrendertask('jqxPreviewGrid', row, column, value);

        $("#" + jqxGridId + " div[title='last']").jqxButton({ disabled: false });
        $("#" + jqxGridId + " div[title='next']").jqxButton({ disabled: false });
    }
    function disableJqxPagerButtonsOnLoad(jqxGridId) {
        var paginginformation = $('#' + jqxGridId).jqxGrid('getpaginginformation');
        if (paginginformation.pagenum == 0 && (paginginformation.pagescount == 0 || paginginformation.pagescount == 1)) {
            $("#" + jqxGridId + " div[title='first']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='previous']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='last']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='next']").jqxButton({ disabled: true });
        } else if (paginginformation.pagenum == 0 && paginginformation.pagescount > 1) {
            $("#" + jqxGridId + " div[title='first']").jqxButton({ disabled: true });
            $("#" + jqxGridId + " div[title='previous']").jqxButton({ disabled: true });

            //Uses to bind tasks in both projects and tasks grid in magnifier
        
        }
    }
    $(document).ready(function () {
        $("body").on("mouseup", "input", function (e) {
            var id = $(this).attr("id");
        });
 
        // $(".widget").draggable();
        //$('#trash-can').droppable({
        //    drop: function (event, ui) {
        //        $(ui.draggable).remove();
        //    }
        // });

        //$('.clsdisablecutcopypaste').bind('copy paste cut', function (e) {
        //    var vrTxtNumVal = $(this).val();
        //    if (!isNaN(vrTxtNumVal)) {
        //    return false;//disable cut,copy,paste
        //}
        //    //alert('cut,copy & paste options are disabled !!');
        //});

        $(".clsdisablecutcopypaste").on("paste", function () {
            var vrTxtNumVal = $(this).val();
            var vrTxtId = $(this).attr("id");
            var element = this;
            setTimeout(function () {
                var text = $(element).val();
                if(isNaN(text)){
                    $("#" + vrTxtId).val(vrTxtNumVal);
                }
                // do something with text
            }, 5);
        });
        $("#ddlTaskTrailProject").mousedown(function () {
            //if ($.browser.msie) {
            $(this).width("css", "120px");
            //}
        });
        //To validate email in customers,users and deployment
        $(".clsvalidateemailkeypress").keypress(function (event) {
            if ((event.keyCode >= 33 && event.keyCode <= 42) || event.keyCode == 94) {
                return false;
            }
        });
        //END of adding regarding email validation
    });
//Clear all cookies and make user to logout
function logOutUser() {
    localStorage.removeItem("LoggedEmpId");
    localStorage.removeItem("LoggedEmpName");
    localStorage.removeItem("LoggedUserTokenId");
    localStorage.removeItem("LoggedUserRole");
    window.location.href = "default.htm";
    return;
}
function FormatTimesOnExport(value) {
    var valTimeRes = typeof value == 'undefined' || $.trim(value).length == 0 ? _vrDefaultFmt : value.toString();
    var valTimeFormat = displayFormat(valTimeRes);
    return valTimeFormat;
}
function exportJqxGridData(gridNameToExport, XlName) {//gridNameToExport is a vraiable pass a parameter from home.html. Also add a function named exportTaskTrailData in export on click in the task trail
    try {
        if (gridNameToExport == _vrJqxTasksGrid) {
            $("#" + gridNameToExport).jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID');
        }
        var data = new Array();
        var noofrows = $("#" + gridNameToExport).jqxGrid('getrows').length;
        var vrExportBillHrs = '';
        var vrExportExpHrs = '';
        var vrTimeBillHrs = '';
        var vrTimeExpectHrs = '';
        var vrNonBill = '',vrApprovedHours='',vrBillComments;
        //var sortColumnName = $("#" + _vrJqxTasksGrid).jqxGrid('getGridParam', 'sortname');
        //var sortOrder = $("#" + _vrJqxTasksGrid).jqxGrid('getGridParam', 'sortorder');
        if (gridNameToExport === _vrJqxTasksGrid) {// _vrJqxTasksGrid is a vraiable declared in the gloabl.js
            for (var i = 0; i < noofrows; i++) {
                vrTimeBillHrs = $('#' + gridNameToExport).jqxGrid('getcellvalue', i, "BillableHours");
                vrExportBillHrs = FormatTimesOnExport(vrTimeBillHrs);
                vrTimeExpectHrs = $('#' + gridNameToExport).jqxGrid('getcellvalue', i, "ExpectedHours");
                vrExportExpHrs = FormatTimesOnExport(vrTimeExpectHrs);
                data[i] = $('#' + gridNameToExport).jqxGrid('getrowdata', i);
                data[i].BillableHours = vrExportBillHrs;
                data[i].ExpectedHours = vrExportExpHrs;
            }
        } else if (gridNameToExport === _vrBillingRprtGrid) {
            $("#" + gridNameToExport).jqxGrid('setcolumnproperty', 'Date', 'cellsformat', 'dd/MM/yyyy HH:mm:ss');
            for (var i = 0; i < noofrows; i++) {
                vrTimeBillHrs = $('#' + gridNameToExport).jqxGrid('getcellvalue', i, "BillableHours");
                vrExportBillHrs = FormatTimesOnExport(vrTimeBillHrs);
                vrNonBill = $('#' + gridNameToExport).jqxGrid('getcellvalue', i, "NonBillableHours");
                vrNonBill = FormatTimesOnExport(vrNonBill);
                vrApprovedHours = $('#' + gridNameToExport).jqxGrid('getcellvalue', i, "ApprovedBillableHours");
                vrApprovedHours = FormatTimesOnExport(vrApprovedHours);
                vrBillComments = $('#' + gridNameToExport).jqxGrid('getcellvalue', i, "Comments");
                vrBillComments = vrBillComments.replace(_vrNonBillDiv, _vrNonBillSepText);
                data[i] = $('#' + gridNameToExport).jqxGrid('getrowdata', i);
                data[i].BillableHours = vrExportBillHrs;
                data[i].NonBillableHours = vrNonBill;
                data[i].ApprovedBillableHours = vrApprovedHours;
                data[i].Comments = vrBillComments;
            }
        }
        else {
            for (var i = 0; i < noofrows; i++) {
                data[i] = $('#' + gridNameToExport).jqxGrid('getrowdata', i);
            }
        }
        var sortColumnName= $("#" + gridNameToExport).jqxGrid("sortcolumn");
        var sortOrder = $("#" + gridNameToExport).jqxGrid("sortdirection").ascending;
        if ($.trim(sortColumnName).length!=0) {
            data.sort(function (a, b) {
                if (sortOrder) {
                    return $.trim(a[sortColumnName]).localeCompare($.trim(b[sortColumnName]));
                }else{
                    return $.trim(b[sortColumnName]).localeCompare($.trim(a[sortColumnName]));
                }//return (a.CountryName - b.CountryName);
            });
        }
        var arrGridColumns = [];
        var cols = $("#" + gridNameToExport).jqxGrid("columns");
        for (var vrLoop = 0; vrLoop < cols.records.length; vrLoop++) {
            if (!cols.records[vrLoop].hidden) {
                var vrObjCols = { datafield: "", datacol: "" };
                vrObjCols.datafield = cols.records[vrLoop].datafield;
                vrObjCols.datacol = cols.records[vrLoop].text;
                arrGridColumns.push(vrObjCols);
                // colstoSend = colstoSend +cols.records[vrLoop].text+",";
            }
        }
        _vrObjExportData.jqxSource = data;
        _vrObjExportData.jqxColumns = arrGridColumns;

        //if (gridNameToExport === _vrJqxTasksGrid) {
        $("#" + gridNameToExport).jqxGrid('exportdata', 'xls', XlName, true, data);
        // }
        if (gridNameToExport == _vrJqxTasksGrid) {
            $("#" + gridNameToExport).jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID <img src="img/Status.png" title="Status" class="clsstatushdrimg">');
        }
    }
    catch (e) {

    }
}
    function exportJqxData(GridId, XlName) {
        try {
            if (GridId == _vrJqxTasksGrid) {
                $("#" + GridId).jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID');
            }
            if (GridId == "jqxBillingReport") {
                $("#" + GridId).jqxGrid('setcolumnproperty', 'Date', 'cellsformat', 'dd/MM/yyyy h:mm tt');
                // $("#" + GridId).jqxGrid('setcolumnproperty', 'BillableHours', 'cellsformat', 'h:mm');
            }
            $("#" + GridId).jqxGrid('exportdata', 'xls', XlName);
            if (GridId == _vrJqxTasksGrid) {
                $("#" + GridId).jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID <img src="img/Status.png" title="Status" class="clsstatushdrimg">');
            }
        } catch (e) {

        }
    }
    function CheckAllColumns() {
        var vrIsCheckAll = $("#chkdynselectall").prop('checked');
        if (vrIsCheckAll) {
            $(".clschkdyncolumns").prop('checked', true);
        }
        else {
            $(".clschkdyncolumns").prop('checked', false);
        }
    }
    function ShowNHideColumns(GridName) {//function to hide and show columns in grid on submit button click
        var vrIsCheck = '';
        var gridcols = $("#" + GridName).jqxGrid('columns');
        for (var i = 0; i < gridcols.records.length; i++) {
            vrIsCheck = $("#chkdyn" + i).prop("checked");
            if (gridcols.records[i].datafield == 'ApprovedBillableHours' && (_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId)) {
                // $("#" + GridName).jqxGrid("hidecolumn", gridcols.records[i].datafield);
                $("#chkdyn" + i).prop("checked", false);
            }
            else {
                $("#" + GridName).jqxGrid(vrIsCheck ? "showcolumn" : "hidecolumn", gridcols.records[i].datafield);
            }
                
    }
    }
    function getGridColumns(GridId) {
        _vrUserPrefBtnClick = GridId;
        $("#divListOfJqxColumns").empty();
        // var textData = new Array();
        var cols = $("#" + GridId).jqxGrid("columns");
        // var dataFlds = $("#" + GridId).jqxGrid("datafields");
        if (typeof cols != 'undefined') {
            if (GridId == _vrJqxTasksGrid) {
                $("#" + GridId).jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID');
            }
            $("#divListOfJqxColumns").append("<div class='cls" + GridId + "'><input id='chkdynselectall' data-colname='Select all'  value='-1' type='checkbox' class='clschkdyncolumns'  /><label for='chkdynselectall'>Select all</label></div>");
            for (var i = 0; i < cols.records.length; i++) {
                //textData[i] = cols.records[i].text;
                $("#divListOfJqxColumns").append("<div class='cls" + GridId + "'><input id='chkdyn" + i + "' data-colname=" + cols.records[i].datafield + " class='clschkdyncolumns' value='" + cols.records[i].text + "' type='checkbox' checked /><label for='chkdyn" + i + "'>" + cols.records[i].text + "</label></div>");
                if (cols.records[i].hidden) {
                    $("input[value='" + cols.records[i].text + "']").prop('checked', false);
                }
                if (cols.records[i].datafield == 'ApprovedBillableHours' && (_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId)) {
                    $("#chkdyn" + i).css("display", "none");
                    $("label[for='chkdyn" + i + "']").css("display", "none");
                }
            }
            // var vrApprBillId = $(".clschkdyncolumns").attr("data-colname");
            checkUserPrefSelectAll(GridId);
            $(".dropdown-menu").css("display", "block");
            if (GridId == _vrJqxTasksGrid) {
                $("#" + GridId).jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID <img src="img/Status.png" title="Status" class="clsstatushdrimg">');
            }
        } else {
            $(".dropdown-menu").css("display", "none");
        }
    }

    $(function () {
        $('body').on('click', '.clsgetgridcolumns', function (e) {
            var vrX = e.pageX;
            var vrY = e.pageY;

            $(".dropdown-menu").css('left',vrX+'px');
            $(".dropdown-menu").css('top',vrY+'px');
            $(".dropdown-menu").css("display", "block");
        });
        $('body').on('click', '.clsgetMagnifygridcolumns', function (e) {
            var vrX = e.pageX;
            var vrY = e.pageY;

            $(".dropdown-menu").css('left', vrX + 'px');
            $(".dropdown-menu").css('top', vrY + 'px');
            $(".dropdown-menu").css("display", "block");
        });
        $("#divListOfJqxColumns").on("click", ".clschkdyncolumns", function () {
            var vrParentId = $(this).parent().attr("class");
            var vrCheckId = $(this).attr("id");
            if (vrCheckId !== 'chkdynselectall') {
                checkUserPrefSelectAll(vrParentId);
            }
            else {
                CheckAllColumns();
            }
        });
        //$("#divListOfJqxColumns").on("click", ".clschkdyncolumns", function () {
        //    var vrParentId = $(this).parent().attr("class");
        //    vrParentId = vrParentId.replace('cls','');
        //    var vrCheckId=$(this).attr("id");
        //    // $("label[for=" + vrCheckId + "]").text();
        //    // _vrArrTaskTrDetails = [];
        //    var vrIsChecked=$(this).prop('checked');
        //    var dataFieldShow = $(this).attr("data-colname");
        //    $("#" + vrParentId).jqxGrid(vrIsChecked ? "showcolumn" : "hidecolumn", dataFieldShow);
        //    //       $("#jqxTasksgrid").jqxGrid('hidecolumn', dataFieldShow);
        //    //$("#divListOfJqxColumns input[type=checkbox]").each(function () {
        //    //    if ($(this).prop('checked')) {
        //    //        objArrJqxColumns.jqxTasksgrid.push($(this).val());
        //    //       var dataFieldShow= $(this).attr("data-colname");
        //    //       $("#jqxTasksgrid").jqxGrid('hidecolumn', dataFieldShow);
        //    //       // $("#jqxTasksgrid").jqxGrid(event.args.checked ? "showcolumn" : "hidecolumn", 'TaskID');
        //    //        //TaskID
        //    //    }
        //    //});
        //});
        $(".gridster").click(function () {
            $(".dropdown-menu").css("display", "none");
        });
        $("#MagnifierDialog").click(function (e) {
             $(".dropdown-menu").css("display", "none");

        });
        $("#MagnifierDialog").on("dialogdrag", function (event, ui) { $(".dropdown-menu").css("display", "none"); });
    });
    function checkUserPrefSelectAll(GridId) {
    var vrCheckLength = $('.clschkdyncolumns:checkbox:not(":checked")').length;
    var vrDefLen = 1;
    if (GridId == "jqxBillingReport" && _UserRoleId != 1 && $("#chkdynselectall").prop("checked") == false) {
        if ((vrCheckLength == 1 || vrCheckLength == 2)) {
            $("#chkdynselectall").prop('checked', true);
        }
    }
    else if (vrCheckLength == 1 && $("#chkdynselectall").prop("checked") == false) {
       $("#chkdynselectall").prop('checked', true);
   } else {
          $("#chkdynselectall").prop('checked', false);
   }
}
function pagerDisplay() {
    //  $magnClose.find($(".jqx-grid-pager").find("div:nth-child(6)")).css("width", "58%");
    $(".jqx-grid-pager").find("div:nth-child(6)").css("width", "58%");
}

function pagerMagnifyDisplay(widgetclose) {
    $widgetSizeX = $('' + widgetclose).attr("data-sizex");
    $widgetSizeY = $('' + widgetclose).attr("data-sizey");
    if ($widgetSizeX === "1" && $widgetSizeY === "1") {
        //If widget is 1 column up on clicking resizer
        $('' + widgetclose).find($(".jqx-grid-pager").find("div:nth-child(6)")).css("width", "62%");//.css("text-align", "left");
    }
    else {
        //If widget is of 2 columns up on clicking resizer.
        $('' + widgetclose).find($(".jqx-grid-pager").find("div:nth-child(6)")).css("width", "23%").css("text-align", "right");//.css("text-align","right");
    }
    //  $magnClose.find($(".jqx-grid-pager").find("div:nth-child(6)")).css("width", "58%");
    //$(".jqx-grid-pager").find("div:nth-child(6)").css("width", "58%");
}
function pagerMgnfierDisplay($widget, $widgetSizeX, $widgetSizeY) {

    $widgetSizeX = $widget.closest(".widget").attr("data-sizex");
    $widgetSizeY = $widget.closest(".widget").attr("data-sizey");
    if ($widgetSizeX === "1" && $widgetSizeY === "1") {
        $widget.find($(".jqx-grid-pager").find("div:nth-child(6)")).css("width", "62%").css("text-align", "left");
        if ($widget.context.id == _vrBtnTaskWidgetResize) {
            _vrBtnWidgetResize = 0;
            checkBtnResizePositionInTask('btnResizeTasksWidget', ++_vrBtnWidgetResize);
        }
        if ($widget.context.id == _vrBtnBugTrailWidgetResize) {
            _vrBtnBugTrailResize = 0;
            checkBtnResizePositionInTask('btnResizeBugTrailWidget', ++_vrBtnBugTrailResize);
        }
        if ($widget.context.id == _vrBtnDeployWidgetResize) {
            _vrBtnDeployResize = 0;
            checkBtnResizePositionInDeploy('btnResizeDeployWidget', ++_vrBtnDeployResize);
        }
    }
    else {
        //var paginginformation = $widget.jqxGrid('getpaginginformation');
        $widget.find($(".jqx-grid-pager").find("div:nth-child(6)")).css("width", "23%").css("text-align", "right");
        if ($widget.context.id == _vrBtnTaskWidgetResize) {
            _vrBtnWidgetResize = 0;
            checkBtnResizePositionInTask('btnResizeTasksWidget', _vrBtnWidgetResize);
        }
        if ($widget.context.id == _vrBtnBugTrailWidgetResize) {
            _vrBtnBugTrailResize = 0;
            checkBtnResizePositionInTask('btnResizeBugTrailWidget', _vrBtnBugTrailResize);
        }
        if ($widget.context.id == _vrBtnDeployWidgetResize) {
            _vrBtnDeployResize = 0;
            checkBtnResizePositionInDeploy('btnResizeDeployWidget', _vrBtnDeployResize);
        }
    }

}
function LoadCountDataToCustUserProjSilde() {
    if (_UserRoleId != _vrUserRoleId && _UserRoleId != _vrClientRoleId) {
        _BaseUrl = _vrLocationOrigin + '/User/GetCustProjUserCount?strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindRecordsCount);//Count of Customers,Users and projects.
    }
}

function bindToReportsddl(data, ddlmember) {
    //$.each(data, function (i, item) {
    //    //$('#' + ddlMember).append($('<option>', {
    //    //    value: item[ddlId],
    //    //    text: item[ddlText],
    //    //    title: item[ddlText]
    //    //}));
    //    $("#" + ddlMember).append('<option value="' + item[ddlId] + '" text="' + $.trim(convertDoubleInvertedtoCode(item[ddlText])) + '">' + $.trim(item[ddlText]) + '</option>');
    //});
    
        for (var index = 0; index < data.length; index++) {
           if(index==4||index==6){
            $("#" + ddlmember).append('<option value="' + index + '" text="' + $.trim(data[index]) + '">' + $.trim(data[index]) + '</option>');
        }        }
        }
//    }
//}


function CloseMadmifyFunction() {
  if (_vrReportMagnifyStatus != "") {
        _vrReportMagnifyStatus = "";
        //_vrattachedStatus = "";
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
        if ($("#dialog").dialog('isOpen') == false) {
            $("#dialog").dialog('close');
        } else {
            ViewReport();
            getReports(_vrFromdate, _vrTodate);
        }
    } else if (_vrUserDialogOpen != "") {
        $("#dialog").dialog('close');
    }
}
function setRecordCountPosition(vrGridId) {
    $widget = $("#" + vrGridId).parents('.widget');


    $widgetSizeX = $widget.attr('data-sizex');
    $widgetSizeY = $widget.attr('data-sizey');
    pagerMgnfierDisplay($widget, $widgetSizeX, $widgetSizeY);
    if (parseInt($widgetSizeX) == 2) {//If widget is resized
        if (vrGridId == _vrJqxTasksGrid) {//If tasks grid widget x value is 2.
            checkBtnResizePositionInTask(_vrBtnTaskWidgetResize, 0);
            //
        } else if (vrGridId == _vrJqxBugsGrid) {//If tasks grid widget y value is 2.
            checkBtnResizePositionInTask(_vrBtnBugTrailWidgetResize, 0);
        }
        else if (vrGridId == _vrDeployGrid) {//If tasks grid widget y value is 2.
            checkBtnResizePositionInDeploy('btnResizeDeployWidget', 0);
        }
    }    
}
    function LoadCountDataToCustUserProjSilde() {
        if (_UserRoleId != _vrUserRoleId && _UserRoleId != _vrClientRoleId) {
            _BaseUrl = _vrLocationOrigin + '/User/GetCustProjUserCount?strTokenID=' + _vrUserTokenId;
            ajaxCall(_BaseUrl, bindRecordsCount);//Count of Customers,Users and projects.
        }
    }
    // Prevent the backspace key from navigating back.
    $(document).unbind('keydown').bind('keydown', function (event) {
        var doPrevent = false;
        if (event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' &&
                 (
                     d.type.toUpperCase() === 'TEXT' ||
                     d.type.toUpperCase() === 'PASSWORD' ||
                     d.type.toUpperCase() === 'FILE' ||
                     d.type.toUpperCase() === 'EMAIL' ||
                     d.type.toUpperCase() === 'SEARCH' ||
                     d.type.toUpperCase() === 'DATE')
                 ) ||
                 d.tagName.toUpperCase() === 'TEXTAREA') {
                doPrevent = d.readOnly || d.disabled;
            }
            else {
                doPrevent = true;
            }
        }

        if (doPrevent) {
            event.preventDefault();
        }
    });
//Generic function to get the index of object based on property and value ***Satish***
    function getIndexOfObjBasedOnValue(array, objProperty, widgetIDValue) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty(objProperty) && array[i][objProperty] === widgetIDValue) {
                return i;
            }
        }
        return -1;
    }

//To check is binding values are present in dropdown values or not by Ashok on 11thFeb2014***START***
    function checkDropdownValues(ddlMemberId, value) {
        var vrDdlVal = $("#" + ddlMemberId + " option[value='" + value + "']").val();
        return vrDdlVal;
    }
//END of function by Ashok.

//To clear local storage data.
    function clearLocalStorage() {
        localStorage.removeItem("jqxGridjqxBillingReport");
        localStorage.removeItem("jqxGridjqxBugTrial");
        localStorage.removeItem("jqxGridjqxCustomerTrial");
        localStorage.removeItem("jqxGridjqxProjectsGrid");
        localStorage.removeItem("jqxGridjqxTasksgrid");
        localStorage.removeItem("jqxGridjqxUserTrial");
        localStorage.removeItem("jqxGridjqxDeployGrid");
    }
//END of clearing local storage data
    function setLocalStorageFromDialog(jqxId, Gridwidth) {
        var vrTaskUserPref = (JSON.parse(localStorage.getItem("jqxGrid" + jqxId)));
        if (vrTaskUserPref != null) {
            vrTaskUserPref.width = Gridwidth;
            localStorage.setItem("jqxGrid" + jqxId, JSON.stringify(vrTaskUserPref));
        }
    }