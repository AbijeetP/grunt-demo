var vrstatus = "";
var _vrattachedStatus = "";
var _vrEditStatusReport = "";
var _vrattachedTask = "";
var _vrAttachedEmpID = "";
var _vrReportProjVal = "";
var _vrReportMagnifyStatus = "";
var _vrSummaryReportDialog = "";
var _vrReportCount = "";
var _vrattachedFiles = "";
var _vrSummaryBillingFlag = "";
var _vrSuccessSource = "";
var _vrNonSuccessSource = "";
var _vrBillReportFlag = "";
$(document).ready(function () {
//starting code for associate similar tasks
    $("#ddlAssTask").on('change', function () {
        var vrAsstaskId = $("#ddlAssTask").val();
        var vrAssTaskName = "";
        var vrAssTaskProjectId = 0;
        vrAssTaskName = $("#ddlAssTask option:selected").text();
        vrAssTaskProjectId = $("#ddlAssTask option:selected").data('taskprojectid');
        if(vrAsstaskId>0)
        {
            taskLink(vrAsstaskId, vrAssTaskProjectId, vrAssTaskName);
        }
        else
        {

        }
     });
    //end code for associate similar tasks
    $(".clshidetemporarily").remove();
    var _vrUploadedFile = '', _vrExt = '', vrLoginEmpId = '', vrLoginEmpName = '', _vrddlNewTskValue = '', vrLoginTokenId = '', vrIsProjMgr = '', _vrLoggedCheckHome = '';

    _vrFlagBindDataToDdl = _vrResponseId;//Just to set flag to load all values in dropdown in bug details.
    // $.ui.dialog.prototype._focusTabbable = $.noop
    //Gets values from cookies which are setted in login page. 
    $(".slide").draggable({ containment: ".gridster" });
    _vrLoggedCheckHome = $.cookie("LoggedNow");
    if (_vrLoggedCheckHome != _vrLoggedCheckDefault) {
        logOutUser();
    }

    vrLoginEmpId = localStorage.getItem("LoggedEmpId");
    vrLoginEmpName = localStorage.getItem("LoggedEmpName");
    vrLoginRoleId = localStorage.getItem("LoggedUserRole");
    vrLoginTokenId = localStorage.getItem("LoggedUserTokenId");
    vrIsProjMgr = localStorage.getItem("LoggedIsProjManager");
    vrIsProjMgr = vrIsProjMgr == "false" && vrIsProjMgr != "" ? false : true;
    if ($.trim(vrLoginEmpId).length == 0 || $.trim(vrLoginEmpName).length == 0 || $.trim(vrLoginTokenId).length == 0) {
        window.location.href = "default.htm";
        return false;
    }
    $("#btnFilter").on('click', function () {
         if (_vrSummaryBillingFlag != "") {
            viewBillingSummaryReport();
        } else {

            getReports();
        }
    });
$("#templatedownloader").on('click', function () {
   // downloadTemplate();
    window.open(_vrLocationOrigin + "/AttachedFiles/Template for task multiple creation.xls", '_blank');
    });
    $("#txtFromDate").attr("title", "From date");
    $("#txtToDate").attr("title", "To date");
    $("#ddlReportPoj").on('change', function () {
        _vrReportProjVal = $("#ddlReportPoj").val();
    });
  $("#ddlReports").on("change", function () {
        $("#ddlReportPoj").css("display", "none")
        _vrattachedStatus = "";
        $("#lblReportProj").css("display", "none")
        var _vrReportvalue = $("#ddlReports").val();
        if (_vrReportvalue == 4) {
            _vrSummaryBillingFlag = 1;
            $("#idEffortsInfo").css("display", "block");
            viewBillingSummaryReport();
            $('#dailog').dialog('option', 'title', _vrDialogBoxProjBillSummary);
            $("#idEmpReport").css("display", "none");
            $("#idProjBillReport").css("display", "inline");
            $("#idAttachedFilesLink").css("display", "none");
        } else {
            if (_vrReportvalue == 6) {
                $("#idProjBillReport").css("display", "none");
                
                $("#idEmpBillReport").css("display", "none");
                $("#idAttachedFilesLink").css("display", "inline");
                _vrSummaryBillingFlag = "";
                $("#idEffortsInfo").css("display", "none");
                $('#dailog').dialog('option', 'title', _vrSummRprtHdr);
                getReports();
            }
            else if (_vrReportvalue == 0) {
                $("#idEffortsInfo").css("display", "block");
                viewBillingReport();
                $('#dailog').dialog('option', 'title', _vrDialogBoxBillSummary);
                $("#idEmpReport").css("display", "none");
                $("#idProjBillReport").css("display", "inline");
                $("#idAttachedFilesLink").css("display", "none");
            }
            //_vrSummaryBillingFlag = "";
            $("#idEffortsInfo").css("display", "none");
        }
    });
 $("body").on('click',"#imgCloseIcon", function () {
        $("#divSuccesTaskCreationDiv").empty();
        $("#divSuccesTaskCreationDiv").css("display","none");
    });
    $("body").on('click',"#imgCloseFailIcon", function () {
        $("#divNonSuccesTaskCreationDiv").empty();
        $("#divNonSuccesTaskCreationDiv").css("display", "none");
    });
    $("#idEmpBillReport").on('click', function () {
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
        _vrattachedStatus = "";
        $("#ddlReportPoj").css("display", "none")
        
        $("#idEmpBillReport").css("display", "none")
        $("#lblReportProj").css("display", "none")
        $("#idEmpReport").css("display", "none");
        $("#idProjBillReport").css("display", "inline");
        viewBillingSummaryReport(_vrFromdate, _vrTodate);
    });
	  $("#idCreateEcelTask").on("click", function () {
        createProjectwithExcel();
    });
    $("#txtNewTskDueDate").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy',
        minDate: 0,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        beforeShow: function (textbox, instance) {
            instance.dpDiv.css({
                marginTop: '0px',
                marginLeft: (textbox.offsetWidth-($(".ui-datepicker").width())) + 'px'
            });
        },
        onClose: function (e) {
            var ev = window.event;
            if (ev.srcElement.innerHTML == 'Clear')
                this.value = "";

        }, beforeShow: function (textbox, instance) {
            instance.dpDiv.css({
                marginTop: '0px',
                marginLeft: (textbox.offsetWidth - ($(".ui-datepicker").width())) + 'px'
            });
        },
        closeText: 'Clear',
        buttonText: ''
        
    });
    $("#txtDueDate").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy',
        minDate: 0,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        onClose: function (e) {
            var ev = window.event;
            if (ev.srcElement.innerHTML == 'Clear')
                this.value = "";

        },
        closeText: 'Clear',
        buttonText: ''
    });
  $("#idDisplayCreatedTasks").on('click', function () {
        $("#divNonSuccesTaskCreationDiv").css("display", "none");
        $("#divSuccesTaskCreationDiv").css("display", "inline");
        $("#divSuccesTaskCreationDiv").empty();
        var _vrSplitSucessDiv = _vrSuccessSource.split(';');
$("#divSuccesTaskCreationDiv").append("<div id='divcloseIcon'><img src='img/close.png' title='close' id='imgCloseIcon'/></div>");
        for (var index = 0; index < _vrSplitSucessDiv.length; index++) {
            $("#divSuccesTaskCreationDiv").append("<div id='divTskCreatedlbl'><label class='clsInnerExcelMsg' title='" + _vrSplitSucessDiv[index] + "'>" + _vrSplitSucessDiv[index] + "</label></div>");
        }
    });
    $("#idDisplayNonCreatedTasks").on('click', function () {
        $("#divSuccesTaskCreationDiv").css("display", "none");
        $("#divNonSuccesTaskCreationDiv").css("display", "inline");
        $("#divNonSuccesTaskCreationDiv").empty();

        //_vrNonSuccessSource = data.SingleResult.NonCreatedTasks;
        var _vrSplitNonSucessDiv = _vrNonSuccessSource.split(';');
$("#divNonSuccesTaskCreationDiv").append("<div id='divcloseIcon'><img src='img/close.png' title='close' id='imgCloseFailIcon'/></div>");
        for (var index = 0; index < _vrSplitNonSucessDiv.length; index++) {
            $("#divNonSuccesTaskCreationDiv").append("<div id='divTskCreatedlbl'><label class='clsNonCreatedTsk' title='" + _vrSplitNonSucessDiv[index] + "'>" + _vrSplitNonSucessDiv[index] + "</label></div>");
        }
    });
    var Reportdates = $("#txtFromDate,#txtToDate").datepicker({
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
            if ($.trim($("#txtFromDate").val()).length > 0) {

                for (var i = 0; i < Reportdates.length; ++i) {
                    if (Reportdates[i].id > this.id)
                        $(Reportdates[i]).datepicker('option', 'minDate', date);
                }
            }

        }
    });
    $("#idEmpReport").on("click", function () {
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
        _vrattachedStatus = "";
        $("#ddlReportPoj").css("display", "none");
        $("#lblReportProj").css("display", "none");
        $("#idEmpReport").css("display", "none");
        $("#idAttachedFilesLink").css("display", "inline");
        ViewReport();
        getReports(_vrFromdate, _vrTodate);
    });
 $("#idProjBillReport").on('click', function () {
        $("#idAttachedFilesLink").click();
    });
    $("#idAttachedFilesLink").on('click', function () {
       var title = $("#dailog").dialog("option", "title");
        if (title == _vrDialogBoxProjBillSummary) {
            $("#idEmpReport").css("display", "none");
            $("#idAttachedFilesLink").css("display", "none");
            $("#idEmpBillReport").css("display", "inline");
            $("#idProjBillReport").css("display", "none");
            $("#lblReportProj").css("display", "inline");
            $("#ddlReportPoj").css("display", "inline");
            var _vrblnSummaryReport = true;
        } else {
            $("#idEmpReport").css("display", "inline");
            $("#idAttachedFilesLink").css("display", "none");
            
            $("#lblReportProj").css("display", "inline");
            $("#ddlReportPoj").css("display", "inline");
            var _vrblnSummaryReport = false;
        }
        _vrattachedTask = 1;
        _vrattachedStatus = 1;
        _vrattachedFiles = 1;
        $("#divMainLoader").css("display", "inline");
        _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrReportProjects);
        var _vrreportProjVal = $("#ddlReportPoj").val();
        if (_vrreportProjVal == null) {
            $("#ddlReportPoj").append("<option value='0'>Select project</option>");
            $("#ddlReportPoj").attr("title", "Select project");
        }
        //$("#ddlReportPoj").css("display", "inline");
        //$("#lblReportProj").css("display", "inline");
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
        _BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?strTokenID=' + _vrUserTokenId;
        var blnEmpId = "";
        var empid = "";
        var _vrEmpID = $("#ddlEmployee").val();
        if (_vrEmpID != "0") {
            blnEmpId = true;
            empid = $("#ddlEmployee").val();
        }
        else {
            blnEmpId = false;
            empid = _vrEmpID;
        }
        objSummaryReport = {
            BlnFromDate: true,
            BlnToDate: true,
            BlnEmpID: blnEmpId,
            BlnProjectID: false,
            EmpID: empid,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            ProjectID: 0,
            TokenID: _vrUserTokenId,
IsSummaryReport: _vrblnSummaryReport
        }
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadReportAttachedGrid);
        //ajaxCallBindDropDown(_BaseUrl,loadReportAttachedGrid,"");
    });
    var dtToday = new Date();
    //Initializes under development dailog box.
    initializeCommDialog('divUnderDevelopment', '450', '270');
    initializeCommDialog('divBugRecorddetails', '1100', '552');
    initializeCommDialog('divDeployFilesDailog', '450', '270');
    initializeCommDialog('divSprintStatusalert', '450', '270');
    //divSprintStatusalert
    //Initialises "Add Comment" dialog box.
    // initializeCommDialog('MagnifierDialog', '800', '550');magn
    initializeCommDialog('MagnifierDialog', '1100', '552');
   // initializeCommDialog('boosterDialog','1100','552');
    //Initialises dialog box whose id is "dailog"
    initializeCommentdDialog();
    $(".ui-datepicker-trigger").css("width", "20px").css("margin-left", "2px");
    $("#lblLogin").text(vrLoginEmpName);
    _EmpId = vrLoginEmpId; // decodeURIComponent(vrLoginEmpId);
    _UserRoleId = vrLoginRoleId;
    _vrUserTokenId = vrLoginTokenId;
    GetUserPreferences();//To get user preferences for jqxgrids
    _vrUserIsProjManager = vrIsProjMgr;
    
    if (_UserRoleId == _vrUserRoleId) {//Removes dashboard slider for normal user
        //$(".clsusertasks").attr("data-row", "1").attr("data-col", "1");
        //$(".clsbugtrail").attr("data-row", "1").attr("data-col", "2");
        
        $(".clsshowforclient").remove();
    }
    if (_UserRoleId == _vrUserRoleId) {
        $(".clsshowforadmin").remove();
        $("#lnkNewQuote").css("display", "none");

    }
    //if (_UserRoleId == _vrClientRoleId) {
    //    $("#lnkNewQuote").css("display", "none");
    //    $(".clsquotationslider").remove();
    //}
    if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
        $("#lnkNewTask").css("color", "#B3BFCB");
        $("#txtCommMoreHours").attr("disabled", true);

       // $("#imgNewTask").css("display", "none");
        $("#btnRefreshTasksGrid").css("margin-right", "80px");
        $("#btnExportTasks").css("margin-right","-22px");
        $(".clsshowforadmin").remove();

    } else if (_UserRoleId == _vrClientRoleId) {

        if (_vrUserIsProjManager == false) {
             // $("#lnkNewTask").css("color", "#B3BFCB");
            // $("#imgNewTask").css("display", "none");
        $("#txtCommMoreHours").attr("disabled", true);

        $("#btnRefreshTasksGrid").css("margin-right", "80px");
        $("#btnExportTasks").css("margin-right", "-22px");
        }
        $("#lnkRoleDashboard").css("display", "none");
        $(".clshideforclient").remove();
        $(".clsdisableforclient").attr("disabled", true);
        $(".clsdisableforclient").css("color", "#B3BFCB");
        $("#lnkDeployment").css("display", "none");
        $("#lnkBar").css("display", "none");
        $(".clslogin").css("width","392px");
        //$(".clsclientroletskdetcharts").css("display", "block");
        //$(".clsclientroletskdetcharts").attr("data-row", "1").attr("data-col", "1");
        //$(".clsusertasks").attr("data-row", "1").attr("data-col", "2");
        //$(".clsbugtrail").attr("data-row", "1").attr("data-col", "3");
        loadDdlInTasksCount();
    }
    BindValuesToBugFields();//To bind bug trail dropdowns.
    _BaseUrl = _vrLocationOrigin + '/Task/GetStatusDetails?strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, bindStatus);
    _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugTrProject);

    bindLoggedUserTaskCount();

    var todayDate = new Date();
    $("#lblCopyRightYear").text(todayDate.getFullYear());
    var vrFullyear = todayDate.getFullYear();
    var vrMonth = DoubleDigit(todayDate.getMonth() + 1);
    LoadDataToBARControls();
    LoadBARDataToSlider();
     var vrStartDate = vrFullyear + '-' + vrMonth + '-' + '01';
    var vrEndDate = vrFullyear + '-' + vrMonth + '-' + DoubleDigit(todayDate.getDate());
    _vrTodayDate = DoubleDigitNum(todayDate.getDate()) + '/' + DoubleDigitNum(vrMonth) + '/' + vrFullyear;
    $("#txtBugCreatedDate").val(_vrTodayDate);
    //_BaseUrl = _vrLocationOrigin + '/api/User/GetEmpMonthBRData?strFirstDate=' + vrStartDate + '&strLastDate=' + vrEndDate;
     vrStartDate = '2014-10-01';//Harcoded for testing
       vrEndDate = '2014-10-30';//Hardcoded for testing.
     //_BaseUrl = _vrLocationOrigin + '/User/GetEmpMonthBRData?strFirstDate=' + vrStartDate + '&strLastDate=' + vrEndDate;
     //ajaxCall(_BaseUrl, getBRPoints);

    //To fetch tip of the day.
    //_BaseUrl = _vrLocationOrigin + '/User/FetchTpOfTheDay?strTokenID='+_vrUserTokenId;
    //ajaxCall(_BaseUrl, bindTechTip);
    //Fetches  task status like planned/inprogress
    // getTasksStatus();
    //function getTasksStatus() {
    //}
    //To fetch monthly,weekly,daily billing status of logged in person 
    _BaseUrl = _vrLocationOrigin + '/Task/GetBillingDetails?intEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, bindBillingHours);

    //Get employee fixed bugs count
    _BaseUrl = _vrLocationOrigin + '/mobile/PrjctBugDetails?intEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFixedBugsCount);
    //PrjctBugDetails?intEmployeeID=85&&strTokenID=kkkkk
    //END of getting employee fixed bugs count
    //To bind customers,users and projects count
    //if (_UserRoleId != _vrUserRoleId && _UserRoleId != _vrClientRoleId) {
    //    _BaseUrl = _vrLocationOrigin + '/User/GetCustProjUserCount?strTokenID=' + _vrUserTokenId;
    //    ajaxCall(_BaseUrl, bindRecordsCount);//Count of Customers,Users and projects.
    //}
    LoadCountDataToCustUserProjSilde();//Added to load count up on for customers,users,projects
    LoadDeploymentCountDetails();
	LaodQuoteCategoryDetails();
    //function call to check the browser and css for close icon
    CheckBrowserNAddCSS();
    //END of binding customers,users and projects by ashok
LoadBARDataToSlider();//To bind score up on loading file.

    $(".bx-viewport").css("background-color", "transparent").css("border", "none").css("margin-top", "15px");
    $(".bx-default-pager").css("margin-top", "95px");
    //Adds decoration to navigator pane by hovering.
    $(".clsnav").hover(function () {
        $(this).css("text-decoration", "underline");
    });
    //Removes text decoration to navigator pane by leaving from particular item.
    $(".clsnav").mouseleave(function () {
        $(this).css("text-decoration", "none");
    });
    //It is for logged in name to add text decoration by hover
    $("#lblLogin").hover(function () {
        $(this).css("text-decoration", "underline");
    });
    //To remove text decoration by leaving mouse.
    $("#lblLogin").mouseleave(function () {
        $(this).css("text-decoration", "none");
    });
    //Triggers by mouse down on the slider
    $(".slide").mousedown(function (e) {
        _idSlider = $(this).find(":button").attr("id");
        //_idSlider = $(this).attr("id");
        if (_idSlider == _idTasks) {
            
        }
        $droppableEl = $('.gridster-container .gridster');
    });
    $("body").on("change", "#divTaskTrailSprint", function () {
        _taskIndexNO = -1;
        $("#idSpnLoading").css("display", "block");
        filterTaskTrailSprintDataJqxGrid();
        var vrToolTipSprint = $("#ddlTaskTrailSprint option:selected").text();
        $("#ddlTaskTrailSprint").attr("title", vrToolTipSprint);//regarding sprint tool tip in the widget
        $("#idSpnLoading").css("display", "none");
    });
	$("body").on("change", "#ddlNewTskSprint", function () {
        var vrToolTipSprintInNewTask = $("#ddlNewTskSprint option:selected").text();
        var vrstatus = $("#ddlNewTskSprint option:selected").data("status");
        if (vrstatus == 0) {
            $('#divSprintStatusalert').dialog('option', 'title', "Sprint status");
            $(".clsremainingfields").html(_vrFreezeSprintStatus);
            $("#divSprintStatusalert").dialog('open');
            $("#divSprintStatusalert").dialog("widget").effect("shake", { times: 2 }, 200);
        }
        //else if (vrstatus == 2) {
        //    $('#divSprintStatusalert').dialog('option', 'title', "Sprint Status");
        //    $(".clsremainingfields").html(_vrCloseSprintStatus);
        //    $("#divSprintStatusalert").dialog('open');
        //    $("#divSprintStatusalert").dialog("widget").effect("shake", { times: 2 }, 200);
        //}
        //$("#ddlNewTskSprint").attr("title", vrToolTipSprintInNewTask);//regarding sprint tool tip in the widget
    });
    $("#btnSaveExitComm").click(function () {
        _vrSaveExitClick = _vrSaveExitFlag;
        $("#btnSaveComm").click();
        if (_vrLocalBRDataOnTaskClick != null) {
            var tempLocalBRData = JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"));
           tempLocalBRData.pagenum = _vrLocalBRDataOnTaskClick.pagenum;
           localStorage.setItem("jqxGridjqxBillingReport", JSON.stringify(tempLocalBRData));
           $("#jqxBillingReport").jqxGrid('gotopage', tempLocalBRData.pagenum);
        }
    });
    $("#ddlEmployee").on("change", function () {

        $("#btnFilter").click();
    });
    $("#ddlReportPoj").on("change", function () {

        $("#btnFilter").click();
    });

    //Triggers by click on save in add comment dialog box.
    $("#btnSaveComm").click(function () {
        //Checks condition for non billable hours text box in add comment dialog.
       
        var vrtxtNonBillHrs = $("#txtCommNonBillableHours").val();
        vrtxtNonBillHrs = vrtxtNonBillHrs.replace(':', '.');
        if (parseFloat(vrtxtNonBillHrs) > 0 && $.trim(vrtxtNonBillHrs).length > 0 && $.trim($("#txtCommNonBillableHours").val()).length != 0) {
            if ($.trim($("#txtNonBillableComm").val()).length == 0) {
                $("#divNonBillWarningMsg").css("display", "block");
                return false;
            }
        }

        $("#divMainLoader").css("display", "inline");
        $("input[type = submit]").attr("disabled", true);//To prevent button for double click.
        var flUpload = $("#flCommUpload").val();
        //If there is attached file it uploads file and gets file name and it is send as attach file to insert comments..
        if (flUpload.length != 0) {
            _BaseUrl = _vrLocationOrigin + '/Task/ToFilesUpload?strPicFileName=' + _DefaultAttachedFileName + '&strTokenID=' + _vrUserTokenId;
            uploadFile(_BaseUrl, InsertTaskComments, 'flCommUpload');
            FilterBugTrail();
        }
        else {
            InsertTaskComments(''); //If there is no need of upload file will insert data directly.

        }

       // reloadComments();
        //loadjqxBillingReportGrid();


       
    });

    //Inserts data other than hours and return task history id.
    function InsertTaskComments(data) {
var vrCDate = $("#txtCommdate").val();
        var vrTime="00:00:00"
        var vrCreatedOn = "";
        var vrCommOn="";
        if (vrCDate != "")
        {
            var vrCoDate = vrCDate.split("/");
            var vrCommDate = vrCoDate[2] + "-" + vrCoDate[1] + "-" + vrCoDate[0] + " " + vrTime;
             
            vrCreatedOn =  vrCommDate;
            var vrCommentedOn = vrCoDate[1] + "/" + vrCoDate[0] + "/" + vrCoDate[2] + " " + vrTime;
           
            vrCommOn=vrCommentedOn;
        }
        else {
             vrCreatedOn = "";
             vrCommOn="";
        }
        var vrTxtInformTo = '', vrInformTo = '', vrInformToIndivid = '';
        var vrHrsNonBill = $("#txtCommNonBillableHours").val().length == 0 ? 0 : $("#txtCommNonBillableHours").val();
        var vrtxtTaskComments = $("#txtTaskComments").val();
        var vrTxtNonCommBill = $("#txtNonBillableComm").val();
        if ($.trim(vrHrsNonBill) != '0' || _vrNonBillableTask == true) {
            if ($.trim(vrTxtNonCommBill).length != 0) {
                vrtxtTaskComments = vrtxtTaskComments + _vrNonBillDiv + vrTxtNonCommBill;
            }

        }
        _vrUpdatedInformToText = GetInformToIds('ddlCommInformTo', 'txtCommInformTo');
        // $("#ddlCommInformTo option[text=Abhishek]").val()
        var vrAttachedFiles = typeof data.Value === 'undefined' ? '' : data.Value;
        var vrAssignTo = $("#ddlAssignTo").val();
        vrAssignTo = vrAssignTo == null ? _EmpId : vrAssignTo;
        var vrLblTaskId = $("#lblTaskId").text();
        var vrChkBeyondScope = $("#chkBeyondScope").prop('checked');
        _vrBeyondScope = vrChkBeyondScope;
        var vrStatus = $("#ddlStatus").val();
        var vrDueDate = $("#txtDueDate").val();
        var vrModuleName = $("#ddlSelectModule").val(),//$("#ddlSelectModule option:selected").val().length != 0 ? $("#ddlSelectModule option:selected").text() : '';
        vrHrsNonBill = $("#txtCommNonBillableHours").val().length == 0 ? 0 : replaceColon($("#txtCommNonBillableHours").val());
        var vrBillHrs = $('#txtCommBillHours').val().length == 0 ? 0 : replaceColon($('#txtCommBillHours').val());

        var vrMoreHours = $("#txtCommMoreHours").val().length == 0 ? 0 : replaceColon($("#txtCommMoreHours").val());
       // var vrCreatedOn = "";//getCurrentDate();
        var vrAssignedBy = $("#lblLogin").text();
        var vrTskSubject = $("#lblTskSubject").text();
        var vrTskProjId = $("#txtTskProjId").text();
        var objTaskHstry = {
            TaskID: vrLblTaskId, AssignedTo: vrAssignTo, PriorityID: _vrTaskPriorityId, CreatedOn: vrCreatedOn, Comments: vrtxtTaskComments, AttachedFiles: vrAttachedFiles, AssignedBy: vrAssignedBy, TaskHstryStatusID: vrStatus, TaskDueDate: vrDueDate, BeyondScope: vrChkBeyondScope, TaskModulename: vrModuleName,
            BillableHours: vrBillHrs, NonBillableHours: vrHrsNonBill, MoreHours: vrMoreHours, PresentEmpID: _EmpId, EmployeeID: _EmpId, CreatedDate: vrCreatedOn, CommentedOn: vrCommOn, Path: _vrExt, TokenID: _vrUserTokenId
        };

        _BaseUrl = _vrLocationOrigin + '/Task/InsertTaskHistory/';
        ajaxCallWithObject(_BaseUrl, objTaskHstry, updateTaskStatus);
        //$('#AddCommDialog').dialog('close')
        //$(".clsAddCommDialogFields").css("display", "none");
        //$(".clsshowcomments").css("display", "block");
    }
    //To reset comments in addcomment dialog box.
    $("#btnResetComm").click(function () {

        $("#txtDueDate").val($("#lblDueDate").text());
        $("#ddlStatus").val(_vrTaskStatusId);
        $("#txtCommInformTo").val(_vrInformToText);
        $("#ddlAssignTo").val(_vrAssignedTo);
        $(".clscommhours").val('');
        $("#txtTaskComments").val('');
        $("#txtNonBillableComm").val('');
        $("#ddlCommInformTo").val('-1');
        _vrTaskModule = $.trim(_vrTaskModule).length == 0 ? ' ' : _vrTaskModule;

        $('#chkBeyondScope').prop('checked', _vrBeyondScope);
        $('#flCommUpload').replaceWith($('#flCommUpload').clone());
        $("#txtFlUpload").val('');
           if (_vrNonBillableTask == true) {
            $("#txtNonBillableComm").css("display", "block");
        } else {
            $("#txtNonBillableComm").css("display", "none");
        }
        $("#divNonBillWarningMsg").css("display", "none");
      //  if (_vrOpenBugs != 0 && $("#ddlStatus").val() == "4") {
        onDdlStatusChange(_vrCheckDdlChange);
       // }
        $("#txtCommMoreHours").val('');
        if ($.trim(_vrTaskModule).length > 0 && _vrTaskModule != '-1') {
            $("#ddlSelectModule").val(_vrTaskModule);
        } else {
            $("#ddlSelectModule").val('');
        }
       $("#txtCommdate").val("");
    });
    //Canceling of comment.
    $(".clsCancelComm").click(function () {
        // $('#AddCommDialog').dialog('close')
        //$(".clsAddCommDialogFields").css("display", "none");
        //$(".clsshowcomments").css("display", "block");


    });
    //Triggers by clicking on booster A Rooster filter button
    $(".gridster").on("click", "#btnBRFilter", function () {
        $("#btnBRFilter").attr("disabled", true);
        _vrSetWidthOfGraph = 860;
        _vrSetHeightOfGraph = 320;
        _selMonthInBAR = $("#ddlBRMonth option:selected").val();
        _selYearInBAR= $("#ddlBRYear option:selected").val();
        $("#idBARLoading").css("display", "block");
        loadBARData();
    });
    $("#MagnifierDialog").on("click", "#btnBRFilter", function () {
        $("#btnBRFilter").attr("disabled", true);
        _vrSetWidthOfGraph = 1080;
        _vrSetHeightOfGraph = 400;
        _selMonthInBAR = $("#ddlBRMonth option:selected").val();
        _selYearInBAR = $("#ddlBRYear option:selected").val();
        $("#divMainLoader").css("display", "inline");
        loadBARData();
    });
    //For log out
    $("#lblSignOut").click(function () {

        logOutUser();
    });
    //Checks value in non billable text box.
    $("#txtCommNonBillableHours").blur(function () {
        if (!_vrNonBillableTask) {
            var vrtxtNonBillHrs = $("#txtCommNonBillableHours").val();
            vrtxtNonBillHrs = vrtxtNonBillHrs.replace(':', '.');
            if (parseFloat(vrtxtNonBillHrs) > 0 && $.trim(vrtxtNonBillHrs).length > 0) {
                $("#divCommNonBillable").css("display", "inline");

                $("#txtNonBillableComm").css("display", "inline");
                
            } else {
                $("#divCommNonBillable").css("display", "none");
                $("#divNonBillWarningMsg").css("display", "none");
                $("#txtNonBillableComm").val("");
                // $("#txtCommNonBillableHours").val("0");
            }
        }
    });

    //To make user only to enter specific characters up on key press
    $(".clscommhours").keypress(function (e) {

        if (e.which != 46 && e.which != 8 && e.which != 58 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
        else {

            var eventValue = String.fromCharCode(e.which);
            var vrVal = $(this).val();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
            var vrSelected = vrVal.substring(start, end);
            if ($.trim(vrSelected).length != vrVal.length) {

                var vrTxtValue = $(this).val() + parseFloat(eventValue);
                if (vrTxtValue.indexOf('.') > -1 || vrTxtValue.indexOf(':') > -1) {
                    if (e.which == 46 || e.which == 58) {
                        return false;
                    }
                    var vrSplitColon = vrTxtValue.split(':');
                    if (parseFloat(vrSplitColon[1]) > 59) {
                        //  $(this).val(eventValue)

                        return false;
                    }
                }
                vrTxtValue = vrTxtValue.replace(':', '.');
                if (parseFloat(vrTxtValue) > 24) {
                    return false;
                }

                else {
                    _vrEventVal = eventValue;
                }
                //setTimeout(function () {
                //    var vrTxtId = $(this).attr("id");
                //    if (typeof vrSplitColon != 'undefined' && vrSplitColon[0] == 2) {
                //        if (vrSplitColon[1][2] > 4) {
                //            $("#" + vrTxtId).val(vrVal);
                //        }
                //    }
                //}, 5);
                //if(typeof vrSplitColon !='undefined' && vrSplitColon[0]==2)
                // {
                //     if (vrSplitColon[1][2] >4 )
                //     {
                //         if (e.which >= 53 && e.which <= 58)
                //             {
                //         return false;

                //         }
                //     }
                // }


            }
        }
    });

    //$("body").on("click", "#lblCheckQuote", function () {

    //    _BaseUrl = _vrLocationOrigin + '/customer/GetQuoteDetails?strTokenID=' + _vrUserTokenId + '&intQuoteID=5';
    //    ajaxCall(_BaseUrl, getDataToEdit);
    //});
    //$('#txtCommBillHours').keypress(function (e) {
    //    var eventValue = String.fromCharCode(e.which);
    //    var vrVal = $(this).val();
    //    if(varVal>24)
    //    {
    //        if (e.which >= 52 && e.which == 58) {
    //            return false;
    //        }
    //    }

    //});
    $('.clscommhours').bind('copy paste cut', function (e) {
        return false;//disable cut,copy,paste
        //alert('cut,copy & paste options are disabled !!');
    });
    $('.clscommhours').click(function () {
        $(this).select();
    });
    //Checks values in effort planned text box.
    $(".clsspecifichours").keypress(function (e) {
        if (e.which != 46 && e.which != 8 && e.which != 58 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        } else {
            var eventValue = String.fromCharCode(e.which);
            var vrVal = $(this).val();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
            var vrSelected = vrVal.substring(start, end);
            if ($.trim(vrSelected).length != vrVal.length) {
                var vrTxtValue = $(this).val() + parseFloat(eventValue);
                if (vrTxtValue.indexOf('.') > -1 || vrTxtValue.indexOf(':') > -1) {
                    if (e.which == 46 || e.which == 58) {
                        return false;
                    }
                    var vrSplitColon = vrTxtValue.split(':');
                    if (parseFloat(vrSplitColon[1]) > 59) {
                        return false;
                    }
                }
            }
        }
    });
    //Checks values after losting focus from effort planned text box.
    $(".clstxthrs").blur(function (e) {
        var vrHrs = $(this).val();
        var vrId = $(this).attr('id');

        var vrVal = vrHrs.replace(':', '.');
        vrVal = parseFloat(vrVal);
        if (vrVal == 0.0) {
            $("#" + vrId).val('');
            return false;
        }
        if (vrId == _vrTskProjBudgetPlannedId) {
            _vrMaxLengthTxt = _vrMaxLengthProjBudget;
        } else {
            _vrMaxLengthTxt = _vrMaxEffLength;
        }
        $(this).val(displayFormat(vrHrs));
        _vrMaxLengthTxt = _vrMaxEffLength;
        if (vrVal > _vrDayHrs && (vrId == 'txtCommBillHours' || vrId == 'txtCommNonBillableHours')) {
            $("#" + vrId).val('');
        }

    });

    //Loads values in add comments dialog box.
    $("#lnkAddComment").click(function () {
        event.preventDefault();

    });

  $("#lnkNewTask").click(function () {
        _vrProjectIDedit = "";
        _ddlTaskTrailProject = parseInt($("#ddlTaskTrailProject").val());
        _ddlTaskTrailSprint = $("#ddlTaskTrailSprint").val();
        createNewTask(_vrTaskStatus);
  });
  $("body").on("click", "#btnNewTaskInMaginfier", function () {
        $("#lnkNewTask").click();
    }); 

    //Loads the reports to the jqx grid
    $("#lnkViewReports").click(function () {
        _vrReportProjVal = "";
        $("#ddlReportPoj").empty();
        $("#idAttachedFilesLink").css("display", "inline");
        $("#idEmpReport").css("display", "none");
        $("#idEffortsInfo").css("display", "none");
        $("#ddlReportPoj").css("display", "none");
        $("#lblReportProj").css("display", "none");
$("#idProjBillReport").css("display", "none");
        $("#idEmpBillReport").css("display", "none");
        _vrattachedStatus ="";
        _vrattachedTask = "";
        _vrReportMagnifyStatus = "";
        _vrSummaryReportDialog = 1;
        _vrEditTaskDetails = 1;
_vrSummaryBillingFlag = "";
        //_vrTaskDataOnCPUOnTaskClick = null;
        ViewReport();
          });

    //Loads fields values for new deployment in dialog box
    $("#lnkDeployment").click(function () {
        createNewDeployment();
    });
    //Updating the values of particular deployment details.
    //$("#lnkUpdateDeploy").click(function () {
    //    UpdateDeploymentDialog(734);
    //});
    //$("#lnkBar").click(function () {
    //    addBoosterARooster();
       
    //});

    //Loads values in project dropdown based on customer field.
    $("#ddlNewTskCustomer").change(function () {

        _vrProjectIDedit = "";

        _ddlTaskTrailProject = 0;

        $("#ddlNewTskProject").empty();
        $("#ddlNewTskModule").empty();
        $("#ddlNewTskAssignTo").empty();
        $("#ddlNewTskInformTo").empty();
        $("#ddlNewTskSprint").empty();
        $("#ddlNewTskSprint").append("<option value=''>Select sprint</option>");
        $("#ddlNewTskProject").append("<option value=''>Select project</option>");
        $("#ddlNewTskModule").append("<option value=''>Select module</option>");
        $("#ddlNewTskAssignTo").append("<option value=''>Select assign to</option>");
        $("#ddlNewTskInformTo").append("<option value=''>Select inform to</option>");
        $("#ddlNewTskOwner").append("<option value=''>Select owner</option>");
        $("#txtNewTskInformTo").val("");
        $("#txtNewTskInformTo").attr("title", "");
        _vrddlNewTskValue = $("#ddlNewTskCustomer").val();
  $("#ddlAssTaskList").empty().trigger("chosen:updated");
        if (_vrddlNewTskValue>0)
        {
            $("#ddlNewTskProject").attr('disabled', false);
            //$("#ddlNewTskAssignTo").attr('disabled', false);
            //$("#ddlNewTskInformTo").attr('disabled', false);
        }
        else {
            $("#ddlNewTskProject").attr('disabled', true);
            $("#ddlNewTskSprint").attr('disabled', true);
            $("#ddlNewTskModule").attr('disabled', true);
            $("#ddlNewTskAssignTo").attr('disabled', true);
            $("#ddlNewTskInformTo").attr('disabled', true);
            $("#ddlAssTaskList").attr('disabled', true).trigger("chosen:updated");

        }
        if ($.trim(_vrddlNewTskValue).length > 0) {
            _BaseUrl = _vrLocationOrigin + '/project/GetProjectNames?intID=' + _vrddlNewTskValue + '&strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskProject);
      
        }
    });

    //Loads values to module and project members to dropdowns based on selected project.
    $("#ddlNewTskProject").change(function () {
        _vrddlNewTskValue = $("#ddlNewTskProject").val();

        if (_vrddlNewTskValue > 0) {
            $("#ddlNewTskProject").attr('disabled', false);
            $("#ddlNewTskSprint").attr('disabled', false);
            $("#ddlNewTskModule").attr('disabled', false);
            $("#ddlNewTskAssignTo").attr('disabled', false);
            $("#ddlNewTskInformTo").attr('disabled', false);
            $("#ddlAssTaskList").attr('disabled', false).trigger("chosen:updated");
        }
        else {
            $("#ddlNewTskSprint").attr('disabled', true);
            $("#ddlNewTskModule").attr('disabled', true);
            $("#ddlNewTskAssignTo").attr('disabled', true);
            $("#ddlNewTskInformTo").attr('disabled', true);
            $("#ddlAssTaskList").attr('disabled', true).trigger("chosen:updated");
        }


        if (_vrddlNewTskValue == null || _vrddlNewTskValue == 'undefined') {
            _vrEditStatusReport = 1;
            _BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + _vrProjectIDedit + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskModules);
        } else {
            if (_vrddlNewTskValue.length > 0) {
                _BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + _vrddlNewTskValue + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
                ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTskModules);
            }
            else {
                $("#ddlNewTskModule").empty();
                $("#ddlNewTskAssignTo").empty();
                $("#ddlNewTskInformTo").empty();
                $("#ddlNewTskOwner").empty();
                $("#ddlNewTskModule").append("<option value=''>Select module<option>");
                $("#ddlNewTskAssignTo").append("<option value=''>Select assign to<option>");
                $("#ddlNewTskInformTo").append("<option value=''>Select inform to<option>");
                $("#ddlNewTskOwner").append("<option value=''>Select owner</option>");
            }
        }
    });

    //To make disable or enable of billable text box based on selected task status.
    $("#ddlStatus").change(function () {
        onDdlStatusChange(_vrDdlStatusChange);//To find dropdown changed.
    });

    function onDdlStatusChange(vrChangeStatus) {
        var vrDdlStatusVal=$("#ddlStatus").val();
        if ($("#ddlStatus").val() == 1 || _vrNonBillableTask == true) {
            $("#txtCommBillHours").prop('disabled', true);
            $("#txtCommBillHours").val('');
            $("#txtCommBillHours").css("background-color", "rgb(131, 131, 131)");
        }
        else {
            $("#txtCommBillHours").prop('disabled', false);
            $("#txtCommBillHours").css("background-color", "transparent");
        }
        if (_vrOpenBugs != 0 && (vrDdlStatusVal == "4" || vrDdlStatusVal == "6" || vrDdlStatusVal=="8") && vrChangeStatus == '1') {
            $("#ddlStatus").val(_vrPlannedId);
            displayMessage(_vrAlert, "Please fix the Open Bugs under this task.");
            $("#txtCommBillHours").prop('disabled', true);
            $("#txtCommBillHours").val('');
            $("#txtCommBillHours").css("background-color", "rgb(131, 131, 131)");
        }
        _vrSaveCommentClick = '';
        _vrPrevDdlSelStatus = $("#ddlStatus").val();
    }
    //Loads values for inform to dropdown
    $("#ddlCommInformTo").change(function () {
        InformToOnChange('ddlCommInformTo', 'txtCommInformTo');

    });
    //Loads values in textbox based on selected inform to person. 
    $("#ddlNewTskInformTo").change(function () {
        InformToOnChange('ddlNewTskInformTo', 'txtNewTskInformTo');
        var vrSelProjManagers = $("#txtNewTskInformTo").val();
        $("#txtNewTskInformTo").attr("title", vrSelProjManagers);
    });

    //To exclude or include of tasks based on selected check box.
    $("body").on("click", "#chkFilterTasks", function () {
        getTasksBasedEmployee();
        //getTasksBasedCSDEmployee();
    });
    $("body").on("click", "#lnkBar", function () {

        openBoostrroosterallotpoints();
        //getTasksBasedCSDEmployee();
    });
    $("body").on("click", "#btnAddScore", function () {
        openBoostrroosterallotpoints();
    });


    function openBoostrroosterallotpoints() {
        $("#BtnAllotPoints").hide();
        $("#divBARInnerFieldsDeatils").show();
        addBoosterARooster('1');
    }
    //To get tasks depending on selected userid 
    $("body").on("change", "#ddlTaskTrailEmployee", function () {
        _vrLocalTaskDataOnTaskClick = null;
        _taskIndexNO = -1;
        var ddlTaskEmpval = $("#ddlTaskTrailEmployee option:selected").text();
        $("#ddlTaskTrailEmployee").prop('title', ddlTaskEmpval);
        getTasksBasedEmployee();
    });
    $(".gridster").on("click", "#btnRefreshTasksGrid", function () {
        _taskIndexNO = -1;
        _ddlTaskTrailProject = 0;
        $("#imgTasksMagnify").attr("disabled", true);
        _vrLocalTaskDataOnTaskClick = null;
        bindDataToTaskDropDownDyn();
       // $("#chkFilterTasks").prop("checked", true);
        //_BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
        //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskProj);
        //$("#ddlTaskTrailSprint").val("0");
        $("#ddlTskTrailStatus").val("0");
        $("#ddlTaskTrailSprint").empty();
        $("#ddlTaskTrailSprint").append("<option value='0'>Select sprint</option>");
        $("#ddlTaskTrailProject").empty()
        $("#ddlTaskTrailProject").append("<option value='0'>Select project</option>");
        if ($("#ddlTaskTrailEmployee option[value='" + _EmpId + "']").val() !== undefined) {
            $("#ddlTaskTrailEmployee").val(_EmpId);
        }
         /* bug id 5161*/
        getTasksBasedEmployee();

        if ($("#ddlTaskTrailEmployee").val() == null) {
            $("#ddlTaskTrailEmployee").val("0"); /* bug id 5161*/
        }/* bug id 5161*/
        //taskTrailProjectChange();
        $("#imgTasksMagnify").attr("disabled", false);
    });
    //$(".gridster").on("click", "#btnExportTasksGrid", function () {
        
    //});
    //To get tasks based on project
    $("body").on("change", "#ddlTaskTrailProject", function () {
        _taskIndexNO = -1;
        var vrProjectIDForSelectedProject = $("#ddlTaskTrailProject").val();
        $("#ddlTaskTrailSprint").empty();
        if (vrProjectIDForSelectedProject == 0) {
            $("#ddlTaskTrailSprint").append("<option value='0'>Select sprint</option>");
        }
        else {
            $("#ddlTaskTrailSprint").append("<option value='0'>Select sprint</option>");
            _BaseUrl = _vrLocationOrigin + '/project/GetSprintDetails?intProjectID=' + vrProjectIDForSelectedProject + '&strTokenID=' + _vrUserTokenId + '';
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagTaskWidgetSprintName);
        }
        $("#ddlTaskTrailProject").attr("title", $("#ddlTaskTrailProject option:selected").text());//regarding project name tool tip in the widget
        //taskTrailProjectChange();
        getTasksBasedEmployee();
        $("#ddlTaskTrailProject").attr("title", $("#ddlTaskTrailProject option:selected").text());//regarding project name tool tip in the widget
    });
    //$("body").on("change", "#ddlTaskTrailSprint", function () {
    //    $("#ddlTaskTrailSprint").attr("title", $("#ddlTaskTrailSprint option:selected").attr("title"));//regarding sprint tool tip in the widget
    //});
    //$("body").on("change", "#divTaskTrailSprint", function () {
    //    $("#idSpnLoading").css("display", "block");
       
    //    filterTaskTrailSprintDataJqxGrid();
    //    var vrToolTipSprint = $("#ddlTaskTrailSprint option:selected").text();
    //    $("#ddlTaskTrailSprint").attr("title", vrToolTipSprint);//regarding sprint tool tip in the widget
    //    $("#idSpnLoading").css("display", "none");
    //});
    $("body").on("change", "#ddlNewTskSprint", function () {
        var vrToolTipSprintInNewTask = $("#ddlNewTskSprint option:selected").text();
        //$("#ddlNewTskSprint").attr("title", vrToolTipSprintInNewTask);//regarding sprint tool tip in the widget
    });
    //$('#ddlTskTrailStatus').on('close', function (event) {
    //    var items = $("#ddlTskTrailStatus").jqxDropDownList('getCheckedItems');
    //    var itemsStatusChecked = '';
    //    if (items.length > 0)
    //    {
    //        for (var i = 0; i < items.length; i++)
    //        {
    //            if (items[i].label != 'Select all' && i< (items.length-1) )
    //            {
    //                itemsStatusChecked += items[i].value+",";
    //            }
    //            else if (items[i].label != 'Select all' && i == (items.length-1))
    //            {
    //                itemsStatusChecked += items[i].value;
    //            }
    //        }
    //    }
    //});
    
    //$("#ddlBugStatus").on('close', function (event) {
    //    var items = $("#ddlBugStatus").jqxDropDownList('getCheckedItems');
    //    var itemsStatusChecked = '';
    //    if (items.length > 0) {
    //        for (var i = 0; i < items.length; i++) {
    //            if (items[i].label != 'Select all' && i < (items.length - 1)) {
    //                itemsStatusChecked += items[i].value + ",";
    //            }
    //            else if (items[i].label != 'Select all' && i == (items.length - 1)) {
    //                itemsStatusChecked += items[i].value;
    //            }
    //        }
    //    }
    //});
    //Regarding procs and template change
    $("body").on("change", "#ddlProcsstatus", function () {
        $("#").css("display", "block");//loader image
        var _ProcAndTemplate=$('##ddlProcsstatus').val();
        LoadProcsNTemlate(_ProcAndTemplate);
        $("#ddlProcsstatus").attr("title", $("#ddlProcsstatus option:selected").text());//regarding the tooltip in task trail widget
        $("#").css("display", "none");

    });
    // started commented on 17_01_2014 
    $("body").on("change", "#ddlTskTrailStatus", function () {
        $("#idSpnLoading").css("display", "block");
        filterTaskTrailSprintDataJqxGrid();
        $("#ddlTskTrailStatus").attr("title", $("#ddlTskTrailStatus option:selected").text());//regarding the tooltip in task trail widget
		$("#idSpnLoading").css("display", "none");

    });
    ///ending commented on 17_01_2014
    //Verifying of mandatory field values.
    $(".clsNewUserMandatory").blur(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
        }
        if ($('.error').length == 0) {
            $("#mandatoryUserReqField").css("display", "none");
        }
    });
    //Verifying of mandatory field values.
    $(".clsNewTskMandatory").blur(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
        }
        if ($('.error').length == 0) {
            $("#errNewTskError").css("display", "none");
        }
    });
    //Saves values to create new task.
    $("#btnNewTaskSave").click(function () {
        _vrCloseDialog = '1';
        validateNewTskFields();

    });

    //Saves values of creating new task and keeps dialog box open.
    $("#btnNewTaskSaveNew").click(function () {
        _vrCloseDialog = '0';
        validateNewTskFields();
    });

    //Closes dialog box of creating new task.
    $("#btnNewTaskCancel").click(function () {
        _vrCloseDialog = '1';
        ClearNewTaskFields();
        $("#idSpnLoading").css("display", "none");
    });
    //To load tasks dropdown in widget up on selected project name.
    $("body").on("change", "#ddlBugTrProject", function () {
        _BTIndexNO = -1;
        $("#ddlBugTrTaskName").empty();
        $("#ddlBugTrTaskName").append("<option value='0'>Select task</option>");
        _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + $("#ddlBugTrProject").val() + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugTrTask);
        var ddlBugProjval = $("#ddlBugTrProject option:selected").text();
        $("#ddlBugTrProject").prop('title', ddlBugProjval);
        $("#btnFilterBugTrail").click();
    });
    $("body").on("change", "#ddlTskOpenBugTrProject", function ()
    {
        $("#ddlTskOPenBugTrTaskName").empty();
        $("#ddlTskOPenBugTrTaskName").append("<option value='0'>Select task</option>");
        _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + $("#ddlTskOpenBugTrProject").val() + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrTskOpenBugsTsk);
        var ddlBugProjval = $("#ddlTskOPenBugTrTaskName option:selected").text();
        $("#ddlTskOPenBugTrTaskName").prop('title', ddlBugProjval);
        $("#btnTskOpenFilterBugTrail").click();
    });
    //To load based on changed emp name in Open task widget
    $("body").on("change", "#ddlTskOpenBugTrEmp", function () {
        var ddlTskBugEmpval = $("#ddlTskOpenBugTrEmp option:selected").text();
        $("#ddlTskOpenBugTrEmp").prop('title', ddlTskBugEmpval);
        $("#btnTskOpenFilterBugTrail").click();
    });

    //To load based on changed task name Open task in widget
    $("body").on("change", "#ddlTskOPenBugTrTaskName", function () {
        var ddlTskBugTaskval = $("#ddlTskOPenBugTrTaskName option:selected").text();
        $("#ddlTskOPenBugTrTaskName").prop('title', ddlTskBugTaskval);
        $("#btnTskOpenFilterBugTrail").click();
    });

    //To load based on changed statusin Open task widget
    $("body").on("change", "#ddlTskOpenBugStatus", function () {
        var ddlTskBugTaskval = $("#ddlTskOpenBugStatus option:selected").text();
        $("#ddlTskOpenBugStatus").prop('title', ddlTskBugTaskval);
        $("#btnTskOpenFilterBugTrail").click();
    });
    //To load based on changed task name in widget
    $("body").on("change", "#ddlBugTrEmp", function () {
        var ddlBugEmpval = $("#ddlBugTrEmp option:selected").text();
        $("#ddlBugTrEmp").prop('title', ddlBugEmpval);
        $("#btnFilterBugTrail").click();
    });

    //To load based on changed task name in widget
    $("body").on("change", "#ddlBugTrTaskName", function () {
        var ddlBugTaskval = $("#ddlBugTrTaskName option:selected").text();
        $("#ddlBugTrTaskName").prop('title', ddlBugTaskval);
        $("#btnFilterBugTrail").click();
    });

    //To load based on changed task name in widget
    $("body").on("change", "#ddlBugStatus", function () {
        var ddlBugTaskval = $("#ddlBugStatus option:selected").text();
        $("#ddlBugStatus").prop('title', ddlBugTaskval);
        $("#btnFilterBugTrail").click();
    });
    
    //Loads task dropdown in the bug dialog box based on selected project name.
    $("#ddlBugProjectName").change(function () {
        if ($("#ddlBugProjectName").val() != _vrDdlDefault) {
            _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + $("#ddlBugProjectName").val() + '&strTokenID=' + _vrUserTokenId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagNewBugTrTask);
        }
        else {
            $("#ddlNewBugTask").empty();
            $("#ddlNewBugTask").append("<option value='0'>Select task</option>");
        }
    });

    //To show selected browsers in the text box.
    $("#ddlCreateBugBrowser").change(function () {
        InformToOnChange('ddlCreateBugBrowser', 'txtBrowsers')
    });
    $("body").on("change", "#ddlBRYear", function () {
        _varcheckDragDropBAR++;
        _selYearInBAR = $("#ddlBRYear option:selected").val();
        $("#ddlBRYear").attr("title", _selYearInBAR);
    });
    $("body").on("change", "#ddlBRMonth", function () {
        _varcheckDragDropBAR++;
        _selMonthInBAR = $("#ddlBRMonth option:selected").val();
        var vrMonthToolTip = $("#ddlBRMonth option:selected").text();
        $("#ddlBRMonth").attr("title", vrMonthToolTip);
    });
    //For creation of new bug.
    $("#lnkCreateBug").click(function () {
        createNewBug();
    });
    //For viewing reports


    //For getting of bugs based on selected fields in bug trail.
    $("body").on("click", "#btnFilterBugTrail", function () {
        $("#idBugTrailLoading").css("display", "block");
        _vrLocalBTDataOnBugClick = null;
        _vrddlProjId = $("#ddlBugTrProject").val();
        _vrddlTaskId = $("#ddlBugTrTaskName").val();
        _vrddlStatus = $("#ddlBugStatus").val();
        _vrddlEmpName = $("#ddlBugTrEmp").val();
        _vrblnProjId = _vrddlProjId == '0' ? false : true;
        _vrblnTaskId = _vrddlTaskId == '0' ? false : true;
        _vrblnStatus = _vrddlStatus == '0' ? false : true;
        _vrblnEmpName = _vrddlEmpName == '0' ? false : true;
        FilterBugTrail();
    });
    //For getting bugs on selected fields in task open bug trail
    $("body").on("click", "#btnTskOpenFilterBugTrail", function () {
        $("#idTskBugTrailLoading").css("display", "block");
        _vrTskddlProjId = $("#ddlTskOpenBugTrProject").val();
        _vrTskddlTaskId = $("#ddlTskOPenBugTrTaskName").val();
        _vrTskddlStatus = $("#ddlTskOpenBugStatus").val();
        _vrTskddlEmpName = $("#ddlTskOpenBugTrEmp").val();
        _vrTskblnProjId = _vrTskddlProjId == '0' ? false : true;
        _vrTskblnTaskId = _vrTskddlTaskId == '0' ? false : true;
        _vrTskblnStatus = _vrTskddlStatus == '0' ? false : true;
        _vrTskblnEmpName = _vrTskddlEmpName == '0' ? false : true;
        FilterTskOpenBugTrail();
    });
    //To verify of mandatory fields values in Deploy trail dialog box.
    $(".clsnewbugmandatory").change(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
        }
        if ($('.error').length == 0) {
            $("#divErrNewBug").css("display", "none");
        }
    });
    //Fires by clicking save in create bug dialog box
    $("#btnSaveBug").click(function () {
        _vrFunctionalityStatus = _vrBugSaveStatus;
        submitBugData();
    });
    //Triggers by clicking save and new in create bug dialog box.
    $("#btnSaveNewBug").click(function () {
        _vrSaveNewBug = _vrResponseId;
        vrstatus = true;
        _vrFunctionalityStatus = _vrBugSaveStatus;
        submitBugData();
    });
    //Fires for update button in bug trail dialog box.
    $("#btnUpdateBug").click(function () {
        _vrFunctionalityStatus = _vrBugUpdateStatus;
        _vrLocalBTDataOnBugClick = null;
        _vrLocalBTDataOnBugClick = JSON.parse(localStorage.getItem('jqxGridjqxBugTrial'));
        if ($("#divBugAttachedFiles .clsremovefileonupdate").length > 0) {
            var vrAttchFileName = '';
            $(".clshrefupdatedbug").each(function (index) {
                if ($(this).hasClass("clsremovefileonupdate") == true) {
                    var vrFileName = $(this).find('a').prop("title");
                    vrAttchFileName = vrAttchFileName + vrFileName + "~";
                }
            });
            _BaseUrl = _vrLocationOrigin + '/Bug/DeleteFile';
            var objBugDetails = {
                FileName: vrAttchFileName,
                TokenID: _vrUserTokenId
            };
            ajaxCallWithObject(_BaseUrl, objBugDetails, submitBugData);
        } else {
            submitBugData();
        }
    });

    //For removing of attached file individually.
    $(".clsuploadedfiles").on('click', '.clsnewbugfileremove', function () {
        var vrAttchFileName = $(this).closest('.clsbugdynfilename').prop("title");
        _BaseUrl = _vrLocationOrigin + '/Bug/DeleteFile';
        var objBugDetails = {
            FileName: vrAttchFileName,
            TokenID: _vrUserTokenId
        };
        ajaxCallWithObject(_BaseUrl, objBugDetails, loadBugFileName);
        $(this).closest(".clsnewbugdynupload").remove();
        event.preventDefault();
    });

    //Clears all fields to set them to default up on clear button in bug trail dialog box.
    $("#btnClearBug").click(function () {
        if (_vrFileUploading.length != 0) {
            _vrFileUploading = _vrFileUploadCanceled;
        }
        $('#dailog').dialog('option', 'title', _vrDialogBoxNewBug);
        deleteUploadedFile();
        vrstatus = false;
        clearBugDetailsFields();
    });
    //To catch enter event and triggers on login button.
    $('#txtBugSearch').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $("#btnSearchBugId").click();
            return false;
        }
    });
    //Gets data for particular bug.
    $("#btnSearchBugId").click(function () {
        deleteUploadedFile();
        vrstatus = false;
        if ($.trim($("#txtBugSearch").val()) > 0) {
            _BaseUrl = _vrLocationOrigin + "/Bug/GetBugTrailData?intBugID=" + $("#txtBugSearch").val() + '&strTokenID=' + _vrUserTokenId;
            ajaxCall(_BaseUrl, BindBugFields);
        }
    });

    //Shows all comments for particular task through bug id.
    $("#btnGoToTask").click(function () {
        if (_vrFileUploading.length != 0) {
            _vrFileUploading = _vrFileUploadCanceled;
        }
        deleteUploadedFile();
        taskLink(_vrExistingBugTaskId, _vrExistingBugProjId, _vrExistingBugTaskSubject);
    });
    //Fires by clicking on plus icon in task trail widget to open create new task dialog box
    $(".gridster").on("click", "#imgNewTask", function () {
        _vrLocalTaskDataOnTaskClick = null;
        _vrLocalTaskDataOnTaskClick = JSON.parse(localStorage.getItem('jqxGridjqxTasksgrid'));
        var vrAddId = $(this).attr("id");

        _ddlTaskTrailProject = parseInt($("#ddlTaskTrailProject").val());
        _ddlTaskTrailSprint = $("#ddlTaskTrailSprint").val();
        createNewTask(_vrTaskStatus);


    });
    //Fires by clicking on plus icon in bug trail widget to opem create new bug dialog box.
    $(".gridster").on("click", "#imgNewBug", function () {
        _vrLocalBTDataOnBugClick = null;
        _vrLocalBTDataOnBugClick = JSON.parse(localStorage.getItem('jqxGridjqxBugTrial'));
        createNewBug();
    });
    $("body").on("click", ".clsnewnavfields", function () {
        var vrNavFields = $(this).html();
        var vrlblId = $(this).find("label").attr("id");
        if (vrlblId == 'lblLogin') {
            vrNavFields = 'User details';
        }
        if (vrNavFields.length == 0) {
            vrNavFields = _vrBugRecorded;
        }
        $('#divUnderDevelopment').dialog('option', 'title', vrNavFields);
        $(".clsremainingfields").html(_vrUnderDevelop);
        //$("#divUnderDevelopment").dialog({ autoOpen: true, position: "center", dialogClass: 'dialogUnderDevelopment' });
        $("#divUnderDevelopment").dialog('open');
        $("#divUnderDevelopment").dialog("widget").effect("shake", { times: 2 }, 200);
    });

    $("#btnSubmitDevelopment").click(function () {
        $("#flCommUpload").replaceWith($("#flCommUpload").clone());
        $("#flNewTskAttachFile").replaceWith($("#flNewTskAttachFile").clone());
        $("#divUnderDevelopment").dialog('close');
        
    });
	$("#btnSubmitSprintStatus").click(function () {
        $("#divSprintStatusalert").dialog('close');
        $("#ddlNewTskSprint").val(0);
		//$("#ddlNewTskSprint").attr("title", "Select sprint");
        if (_vrEditTaskFlagSprint == 1)
        {
            $("#ddlNewTskSprint").val(_vrEditSprintID);
            //$("#ddlNewTskSprint").attr("title", _vrEditSprintID);
            var sprintSelected = $("#ddlNewTskSprint").val();
            if (sprintSelected == null)
            {
                $("#ddlNewTskSprint").val(0);
                //$("#ddlNewTskSprint").attr("title", "Select sprint");
            }
        }
    });
    $("#txtSearchWebstation").focus(function () {
        $("#lblSearchDevelopment").css("display", "inline");
        $(this).removeAttr('placeholder');
    });
    //var title = $("em").attr("title");
    $("#txtSearchWebstation").focusout(function () {
        $(this).attr('placeholder', 'Search any thing in Webstation');
    });
    $("#txtSearchWebstation").blur(function () {
        $("#lblSearchDevelopment").css("display", "none");
    });
    $(".gridster-container").click(function () {
        $(".jqx-menu").css("display", "none");
        $(".clsDatePicker").datepicker('hide');
    });
    $("#imgFlUpload").click(function () {
        $("#txtFlUpload").val('');
        $("#flCommUpload").replaceWith($("#flCommUpload").clone());
        $("#flCommUpload").click();
    });

    $("#btnSubmitPreferences").click(function () {
        if (_vrUserPrefBtnClick.length > 0) {
            ShowNHideColumns(_vrUserPrefBtnClick);
        }
        var vrWidPref = '';
        $('.info').html("Saving user preferences");
        showStatusDiv();
        if ($(".clsusertasks .clstasksfields").length > 0) {
            $("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID');
        }
        //$(".clsuserprefwidget").each(function (index) {
        //    if ($(this).prop("checked")) {
        //        if ($.trim(vrWidPref).length >0) {
        //            vrWidPref += ",";
        //        }
        //        vrWidPref += $(this).attr("id");
        //    }
        //});
        var vrObjGridster = { col: "", row: "", xaxisval: "", yaxisval: "", WidgetId: "", vrAllWidgetContrlData: [] };
        var vrObjWidgetControlData = {};
        var vrWidgetCntrlID = '';
        var vrWidgetCntrlValue = '';
        var finalserializer = [];
        var vrTempAllWidgetContrlData = [];
        var vrIsCheck = '';
        $('.widget').each(function () {
          
            var widgetId = $(this).attr("id");
            //var currentfinal = "{'col':" + colval + ",'row':" + rowval + ",'size_x':" + xaxisval + ",'size_y':" + yaxisval + "}";//,'WidgetFetch':" + widgetId + "
            if (typeof widgetId !='undefined') {
                var chkWidgetId = widgetId.replace("divWidget", "chk");
                if ($("#" + chkWidgetId).prop("checked")) {
                    vrObjGridster = { col: "", row: "", xaxisval: "", yaxisval: "", WidgetId: "", vrAllWidgetContrlData: [] };
                    vrObjWidgetControlData = {};
                    vrTempAllWidgetContrlData = [];
                    vrObjGridster.xaxisval = $(this).attr("data-sizex");
                    vrObjGridster.yaxisval = $(this).attr("data-sizey");
                    vrObjGridster.col = $(this).attr("data-col");
                    vrObjGridster.row = $(this).attr("data-row");
                    vrObjGridster.WidgetId = widgetId;
                    var widgetControlData = $("#" + widgetId).find('.clscontroluserpref');
                    for (var i = 0; i < widgetControlData.length; i++) { //Loop to get the values from the controls.
                        vrWidgetCntrlID = widgetControlData[i].id
                        if (vrWidgetCntrlID == 'chkFilterTasks' || vrWidgetCntrlID == 'chkHoldBugs' || vrWidgetCntrlID == 'chkBillingReportBeyondScope') {
                            vrIsCheck = $("#" + vrWidgetCntrlID).prop("checked");
                            vrObjWidgetControlData[vrWidgetCntrlID] = vrIsCheck;
                        }
                        else {
                            vrObjWidgetControlData[vrWidgetCntrlID] = $("#" + vrWidgetCntrlID).val();
                        }
                    }
                    vrTempAllWidgetContrlData.push(vrObjWidgetControlData);
                    vrObjGridster.vrAllWidgetContrlData = vrTempAllWidgetContrlData;
                    finalserializer.push(vrObjGridster);
                }
            }
        });
        //finalserializer = finalserializer + "]";
        //var vrGridSerilaizer = finalserializer;
        //var vrGridPositions = [];
        //vrGridPositions.push(finalserializer);
        //var vrVal=JSON.stringify(vrGridPositions);
        //alert(finalserializer);
        _vrObjJqxGrids.jqxGridjqxBillingReport = JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"));
        if (_vrObjJqxGrids.jqxGridjqxBillingReport != null) {
            _vrObjJqxGrids.jqxGridjqxBillingReport.pagesize = _vrBillingGridPagerSize;
            _vrObjJqxGrids.jqxGridjqxBillingReport.width = _vrBillingReportGridWidth;
        }
        _vrObjJqxGrids.jqxGridjqxBugTrial = JSON.parse(localStorage.getItem("jqxGridjqxBugTrial"));
        if (_vrObjJqxGrids.jqxGridjqxBugTrial != null) {
            _vrObjJqxGrids.jqxGridjqxBugTrial.pagesize = _vrDefaultBugSizer;
            _vrObjJqxGrids.jqxGridjqxBugTrial.width = _vrProjectsTasksWidth;
        }
        _vrObjJqxGrids.jqxGridjqxCustomerTrial = JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"));
        if (_vrObjJqxGrids.jqxGridjqxCustomerTrial !=null) {
            _vrObjJqxGrids.jqxGridjqxCustomerTrial.pagesize = _vrDefaultCustomerSizer;
            _vrObjJqxGrids.jqxGridjqxCustomerTrial.width = _vrCustomersGridWidth;
        }
        _vrObjJqxGrids.jqxGridjqxProjectsGrid = JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"));
        if (_vrObjJqxGrids.jqxGridjqxProjectsGrid !=null) {
            _vrObjJqxGrids.jqxGridjqxProjectsGrid.pagesize = _vrDefaultProjSizer;
            _vrObjJqxGrids.jqxGridjqxProjectsGrid.width = _vrProjectsGridWidth;
        }
        _vrObjJqxGrids.jqxGridjqxTasksgrid = JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"));
        if (_vrObjJqxGrids.jqxGridjqxTasksgrid != null) {
            _vrObjJqxGrids.jqxGridjqxTasksgrid.pagesize = _vrDefaultTaskSizer;
            _vrObjJqxGrids.jqxGridjqxTasksgrid.width = _vrProjectsTasksWidth;
            //localStorage.setItem("jqxGridjqxTasksgrid", JSON.stringify(_vrObjJqxGrids.jqxGridjqxTasksgrid));
        }
        _vrObjJqxGrids.jqxGridjqxUserTrial = JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"));
        if (_vrObjJqxGrids.jqxGridjqxUserTrial !=null) {
            _vrObjJqxGrids.jqxGridjqxUserTrial.pagesize = _vrDefaulUserSizer;
            _vrObjJqxGrids.jqxGridjqxUserTrial.width=_vrUsersGridWidth;

        }
        _vrObjJqxGrids.jqxGridjqxDeployGrid = JSON.parse(localStorage.getItem("jqxGridjqxDeployGrid"));
        if (_vrObjJqxGrids.jqxGridjqxDeployGrid != null) {
            _vrObjJqxGrids.jqxGridjqxDeployGrid.pagesize = _vrDefaultDeploySizer;
            _vrObjJqxGrids.jqxGridjqxDeployGrid.width = _vrProjectsTasksWidth;
        }
        _vrObjJqxGrids.gridsterWidgets = finalserializer;
        if (_vrObjJqxGrids.jqxGridjqxTasksgrid !=null) {
        _vrObjJqxGrids.jqxGridjqxTasksgrid.columns.TaskID.text = "Task ID";//As due to image tag getting error during json parse.
        }
        _BaseUrl = _vrLocationOrigin + '/user/InsertUserPreferenceDetails';
        var objUserPreferenceDetails = {
            TokenID: _vrUserTokenId,
            EmpID: _EmpId,
            Preferences: JSON.stringify(_vrObjJqxGrids)// JSON.stringify(_vrObjJqxGrids)
        }
        ajaxCallWithObject(_BaseUrl, objUserPreferenceDetails, GetInsertedResponse);
     
        if ($(".clsusertasks .clstasksfields").length > 0) {
            $("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'TaskID', 'text', 'Task ID <img src="img/Status.png" title="Status" class="clsstatushdrimg">');
        }
    });

    $("#imgUserPref").click(function () {
        _vrUserPrefBtnClick = '';
        $("#btnSubmitPreferences").click();
    });
    
//    ///   $(".clsnewbugmandatory").each(function (index) {
//    if ($.trim($(this).val()) == '0' || $.trim($(this).val()).length == 0) {
//        $(this).addClass('error');
//    }
    //});
    //getUserPrefWidgets(_vrUserPreferredWidgets);
});

function commentFileUpload(File) {
    var fileName = File.files[0].name;
    $("#txtFlUpload").val(fileName);
}
//Clears fields in bug trai dailog box.
function clearBugDetailsFields() {
    var vrBugProjName = $("#ddlBugProjectName").val();
    $("#divBugInnerFields select").prop('selectedIndex', 0);
    if (vrstatus) {
        if (_vrBugProjFields.length != 0) {
            $("#ddlBugProjectName").val(_vrBugProjFields);
            $("#ddlNewBugTask").val(_vrBugTaskField);
        } else {
            $("#ddlNewBugTask").empty();
            $("#ddlNewBugTask").append("<option value='0'>Select task</option>");
        }
    }
    else {
        $("#ddlBugProjectName").val("0");
        $("#ddlNewBugTask").empty();
        $("#ddlNewBugTask").append("<option value='0'>Select task</option>");
    }
    $("#txtBrowsers").text("");
    $("#txtBugComments").text("");
    $('#flCtBugMultiUpload').replaceWith($('#flCtBugMultiUpload').clone());
    $("#divBugAttachedFiles").empty();
    $("#divInnerAttachedFiles").empty();
    _vrNewBugAttachedFiles = '';
    //$(".clsdailogfields").css("display", "none");
    $(".clsexistedbugfields").css("display", "none");
    $(".clssavebug").css("display", "inline-block");

    $("#txtBugCreatedDate").val(_vrTodayDate);
    $("#txtBugSearch").val("");
    $("#lblBugId").text("");
    $("#txtBrowsers").val("");
    $("#txtBugComments").val("");
    $(".clsnewbugmandatory").each(function (index) {
        $(this).removeClass('error');
    });
    $("#divErrNewBug").css("display", "none");
    $("#imgLoaderFileUpload").css("display", "none");
    $("#flCtBugMultiUpload").prop("disabled", false);
    $(".clsinsertbugdata").prop("disabled", false);
}

//Reloads Bug Trail grid.
function reloadBugsGrid() {
    if (_vrSaveNewBug.length == 0) {
        $("#dailog").dialog('close');
        if (_vrTskOpenBugDialog == 0) {
            FilterBugTrail();
        }
        _vrBugProjFields = '';
        _vrBugTaskField = '';
    } else {
        _vrBugProjFields = $("#ddlBugProjectName").val();
        _vrBugTaskField = $("#ddlNewBugTask").val();
        if (_vrTskOpenBugDialog == 0) {
            FilterBugTrail();
        }

    }
    _BaseUrl = _vrLocationOrigin + '/mobile/PrjctBugDetails?intEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFixedBugsCount);
    _vrSaveNewBug = '';
    clearBugDetailsFields();
    if (_vrTskOpenBugDialog == 1) {
        FilterTskOpenBugTrail();
    }
}

//Clears all fields in new task dailog box.
function ClearNewTaskFields() {
    $("#ddlNewTskInformTo").val('');
    $(".clsClearNewTskFields").val('');
    $("#chkNewTskGetUpdates").prop('checked', true);
    $("#chkNewTskNonBillable").prop('checked', false);
    $("#ddlNewTskAssignTo").val('');
    $("#txtNewTskName").val('');
    $("#txtNewTskDueDate").val('');
    $("#txtNewTskEffortPlanned").val('');
    $("#txtNewTskInformTo").val('');
    $("#txtNewTskNotes");
    $("#errNewTskError").css("display", "none");
    $('#flNewTskAttachFile').replaceWith($('#flNewTskAttachFile').clone());
    $('#idChooseExcel').replaceWith($('#idChooseExcel').clone());
    $("#ddlNewTskPriority").val('1');
    $("#txtSelectedProjManager").attr("title", "");
    $("#idSpnLoading").css("display", "none");
    if (_vrCloseDialog == '1') {
        $("#ddlNewTskCustomer").val('');
        $("#ddlNewTskProject").empty();
        $("#ddlNewTskModule").empty();
        $("#ddlNewTskOwner").val(_EmpId);
        $("#ddlNewTskCategory").val('1');
        $(".clsNewTskMandatory").each(function (index) {
            $(this).removeClass('error');
        });
        $('#dailog').dialog('close');
        _vrCloseDialog = '';
    }
    if (_vrCloseDialog == '0') {
       // _vrCloseDialog = ''; removing the statement because the ajax call is made twice for loading the task trail widget.
        $("#ddlNewTskModule").val('');
        $("#ddlNewTskOwner").val(_EmpId);
        $("#ddlNewTskCategory").val(_vrDefaultTskCatogery);
        $(".clsNewTskMandatory").each(function (index) {
            $(this).removeClass('error');
        });
        $("#divMainLoader").css("display", "none");
    }
   
}

//Validates required fields in Creating task dialog box
function validateNewTskFields() {
    $("#errNewExcelTskError").css("display", "none");
    $("#errExcelFile").css("display", "none");
    $(".clsNewTskMandatory").each(function (index) {
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass('error');
        }
    });
    if ($('.error').length > 0) {
        $("#errNewTskError").css("display", "block");
        return false;
    }
    $("input[type = submit]").attr("disabled", true);
    $("#divMainLoader").css("display", "inline");//Shows loader if validaing all fields.
    var flUpload = $("#flNewTskAttachFile").val();
    if (flUpload.length != 0) {
        _BaseUrl = _vrLocationOrigin + '/Task/ToFilesUpload?strPicFileName=' + _DefaultAttachedFileName + '&strTokenID=' + _vrUserTokenId;
        uploadFile(_BaseUrl, InsertNewTask, 'flNewTskAttachFile');
    }
    else {
        InsertNewTask('');
    }
}

//For insertion of new task to data base from create task dialog box
function InsertNewTask(data) {
    var vrAttachedFiles = typeof data.Value === 'undefined' ? '' : data.Value;
    _vrUpdatedInformToText = GetInformToIds('ddlNewTskInformTo', 'txtNewTskInformTo');
    var vrDdlTskSprintID = $("ddlNewTskSprint").val();
 var tasks = $('#ddlAssTaskList').val();
    if (tasks != null) {
        var vrTaskIds = tasks[0];
        for (var intIndex = 1; intIndex < tasks.length; intIndex++) {
            vrTaskIds = vrTaskIds + "," + tasks[intIndex];
        }
    }
    vrDdlTskSprintID = typeof vrDdlTskSprintID == 'undefined' ? '' : vrDdlTskSprintID;
    var vrNonBillTask=$("#chkNewTskNonBillable").prop("checked") == true?'1':'0';
   // var vrGetUpdates=$("#chkNewTskGetUpdates").prop("checked")==true?'1':'0';
    var objTask = {
        // TaskID: 55,
        TaskName: $("#txtNewTskName").val(),
        TaskProjectName: $("#ddlNewTskProject option:selected").text(),
        TaskSprintID: vrDdlTskSprintID,
        TaskDueDate: $("#txtNewTskDueDate").val(),
        TaskDescription: $("#txtNewTskNotes").val(),
        TaskProjectID: $("#ddlNewTskProject").val(),
        TaskStatusID: _vrPlannedId,
        TaskPriorityID: $("#ddlNewTskPriority").val(),
        TaskCategoryID: $("#ddlNewTskCategory").val(),
        IsUpdate: $("#chkNewTskGetUpdates").prop("checked"),//vrGetUpdates,
        InformTo: _vrUpdatedInformToText,
        TaskReleaseVersion: _vrProjVersionNum,
        // TaskCreatedDate: '07/18/2012',
        NonBillableTask: vrNonBillTask,
        ExpectedHours: replaceColon($("#txtNewTskEffortPlanned").val()),
        //NonBillableTask: 0,
        OwnerID: $("#ddlNewTskOwner").val(),
        ModuleName: $("#ddlNewTskModule").val(),
        SprintID: $("#ddlNewTskSprint").val(),
        EmpID: $("#ddlNewTskAssignTo").val(),
        AssignedTo: $("#ddlNewTskAssignTo").val(),
        AssignedToName: $("#ddlNewTskAssignTo option:selected").text(),
        TaskComments: $("#txtNewTskNotes").val(),
        // CommentedOn: "07/18/2012",
        AssignedBy: $("#lblLogin").text(),
        AttchedFiles: vrAttachedFiles,
        TokenID: _vrUserTokenId,
        AssociatedTasks: vrTaskIds
    };
    _vrTaskCreation = _vrResponseId;//Flag to show task inserted successfully
    _BaseUrl = _vrLocationOrigin + '/Task/insertTask';
    ajaxCallWithObject(_BaseUrl, objTask, reloadTasksGrid);
}

//For filtering of bug trail grid.
function FilterBugTrail() {
    _vrBugTrFromDate = $("#txtBugTrFromDate").val();
    _vrBugTrToDate = $("#txtBugTrToDate").val();
    var fromdate = $("#txtBugTrFromDate").val();
    $('#txtBugTrToDate').datepicker('option', 'minDate', fromdate);
    if ($.trim(_vrBugTrFromDate).length == 0 && $.trim(_vrBugTrToDate).length == 0) {
        _vrFilterDates = false;
    }
    else {
        var vrArrFromDate = _vrBugTrFromDate.split("/");
        var vrArrToDate = _vrBugTrToDate.split("/");
        _vrBugTrFromDate = vrArrFromDate[2] + "-" + vrArrFromDate[1] + "-" + vrArrFromDate[0];
        _vrBugTrToDate = vrArrToDate[2] + "-" + vrArrToDate[1] + "-" + vrArrToDate[0];
        _vrFilterDates = true;
    }
    _vrddlEmpName = _vrddlEmpName == '0' ? _EmpId : _vrddlEmpName;
    $("#idBugTrailLoading").css("display", "block");
    var objBugDetails = {
        blnPrjct: _vrblnProjId,
        strPrjctID: _vrddlProjId,
        blnEmpID: _vrblnEmpName,
        strEmpID: _vrddlEmpName,
        blnTaskId: _vrblnTaskId,
        intTaskId: _vrddlTaskId,
        blnStatus: _vrblnStatus,
        strStatus: _vrddlStatus,
        strFrmDate: _vrBugTrFromDate,
        strToDate: _vrBugTrToDate,
        blnDate: _vrFilterDates,
        strUsrRleID: _UserRoleId,
        boolOnHoldFilter:$("#chkHoldBugs").is(':checked'),
        TokenID: _vrUserTokenId
    };

    _BaseUrl = _vrLocationOrigin + '/Bug/GetBugFilterData';
    ajaxCallWithObject(_BaseUrl, objBugDetails, bindBugTrial);
    if (_vrSuccessStatus == 1) {
        if ($("#dailog").dialog("isOpen")) {
            _vrSuccessStatus = "";
            var fromdate = $("#txtFromDate").val().split('/');
            var todate = $("#txtToDate").val().split('/');
            var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
            var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
            getReports(_vrFromdate, _vrTodate);
        }
    }
    if (_vrSuccessBillingFlag == 1) {
        if ($("#dailog").dialog("isOpen")) {
            _vrSuccessBillingFlag = "";
            var fromdate = $("#txtFromDate").val().split('/');
            var todate = $("#txtToDate").val().split('/');
            var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
            var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
            viewBillingSummaryReport(_vrFromdate, _vrTodate);
        }
    }
}
//To get data for bugs on clicl of open bugs in task.
function FilterTskOpenBugTrail() {
    $("#idTskBugTrailLoading").css("display", "block");
    _vrTskBugTrFromDate = $("#txtTskOpenBugTrFromDate").val();
    _vrTskBugTrToDate = $("#txtTskOpenBugTrToDate").val();
    if ($.trim(_vrTskBugTrFromDate).length == 0 && $.trim(_vrTskBugTrToDate).length == 0) {
        _vrTskBugFilterDates = false;
    }
    else {
        var vrArrFromDate = _vrTskBugTrFromDate.split("/");
        var vrArrToDate = _vrTskBugTrToDate.split("/");
        _vrTskBugTrFromDate = vrArrFromDate[2] + "-" + vrArrFromDate[1] + "-" + vrArrFromDate[0];
        _vrTskBugTrToDate = vrArrToDate[2] + "-" + vrArrToDate[1] + "-" + vrArrToDate[0];
        _vrTskBugFilterDates = true;
    }
    _vrTskddlEmpName = _vrTskddlEmpName == '0' ? _EmpId : _vrTskddlEmpName;
    $("#idTskBugTrailLoading").css("display", "block");
    var objBugDetails = {
        blnPrjct: _vrTskblnProjId,
        strPrjctID: _vrTskddlProjId,
        blnEmpID: _vrTskblnEmpName,
        strEmpID: _vrTskddlEmpName,
        blnTaskId: _vrTskblnTaskId,
        intTaskId: _vrTskddlTaskId,
        blnStatus: _vrTskblnStatus,
        strStatus: _vrTskddlStatus,
        strFrmDate: _vrTskBugTrFromDate,
        strToDate: _vrTskBugTrToDate,
        blnDate: _vrTskBugFilterDates,
        strUsrRleID: _UserRoleId,
        boolOnHoldFilter: $("#chkTskOpenHoldBugs").is(':checked'),
        TokenID: _vrUserTokenId
    };

    _BaseUrl = _vrLocationOrigin + '/Bug/GetBugFilterData';
    ajaxCallWithObject(_BaseUrl, objBugDetails, bindBugTrial);
    
}

//To inserts data for craetion or updation of bug.
function submitBugData() {
    _vrNewBugAttachedFiles = '';
    $(".clsnewbugmandatory").each(function (index) {
        if ($.trim($(this).val()) == '0' || $.trim($(this).val()).length == 0) {
            $(this).addClass('error');
        }
    });
  
    if ($('.error').length > 0) {
        $("#divErrNewBug").css("display", "inline");
        return false;
    }
    $("input[type = submit]").attr("disabled", true);//To prevent button for double click.
    if (_vrFunctionalityStatus != _vrBugUpdateStatus) {
        _vrBugStatus = _vrDefaultBugStatus;
    } else {
        _vrBugStatus = $("#ddlNewBugStatus").val();
    }
    $(".clsbugdynfilename").each(function (index) {
        var vrFileName = $(this).prop("title");
        _vrNewBugAttachedFiles = _vrNewBugAttachedFiles + vrFileName + "~";
    });
    $(".clshrefupdatedbug").each(function (index) {
        if ($(this).hasClass("clsremovefileonupdate") == false) {
            var vrFileName = $(this).find('a').prop("title");
            _vrNewBugAttachedFiles = _vrNewBugAttachedFiles + vrFileName + "~";
        }
    });
    
    //_vrNewBugAttachedFiles = _vrNewBugAttachedFiles.substr(0, _vrNewBugAttachedFiles.length - 1);
    var vrddlBugProjectName = $("#ddlBugProjectName").val();
    var ddlBugTaskName = $("#ddlNewBugTask").val();
    var objBugDetails = {
        PrjctID: vrddlBugProjectName,
        TaskID: ddlBugTaskName,
        BugDscrptn: $("#txtBugComments").val(),
        PriorityID: $("#ddlNewBugPriority").val(),
        SeverityID: $("#ddlNewBugSeverity").val(),
        BugTypeID: $("#ddlNewBugType").val(),
        ReproducibleID: $("#ddlNewBugReproducible").val(),
        BugStatusID: _vrBugStatus,
        CreatedDate: $("#txtBugCreatedDate").val(),
        EmpID: _EmpId,
        AttachedFiles: _vrNewBugAttachedFiles,
        Browsers: $("#txtBrowsers").val(),
        strEmpFulName: $("#lblLogin").text(),
        strAction: _vrFunctionalityStatus,
        BugID: $("#lblBugId").text(),
        TokenID: _vrUserTokenId
    };
    clearAttachedFiles();
    _BaseUrl = _vrLocationOrigin + '/Bug/InsrtBugTrailData';
    ajaxCallWithObject(_BaseUrl, objBugDetails, reloadBugsGrid);
}

//To verify if particular person is already in inform to text box and sets value in text box.
function InformToOnChange(ddlInformTo, textInformTo) {

    if ($("#") != '-1') {
        var e = document.getElementById(ddlInformTo);
        var strUser = e.options[e.selectedIndex].text;
        var vrStrValue = e.options[e.selectedIndex].value;
        if (vrStrValue == '-1' || vrStrValue.length == 0) {
            return false;
        }
        var txtValue = document.getElementById(textInformTo).value;
        var txtValueSplit = txtValue.split(',');
        var CntrlFocus = document.getElementById(textInformTo);
        if (strUser != "Select") {
            if (txtValue != "") {
                //this loop is to check whether a employee is already selected or not, if yes it will show alert message and than return,
                //if no then it will be displayed at textbox.
                for (var intIndex = 0; intIndex < txtValueSplit.length; intIndex++) {
                    //  if (strUser.indexOf(txtValueSplit[intIndex]) > -1) {
                    if (strUser == $.trim(txtValueSplit[intIndex])) {
                        var vrStrUser = "'" + strUser + "' is already selected";
                        //displayError();
                        displayMessage(_vrAlert, vrStrUser);
                        return;
                    }
                }

                document.getElementById(textInformTo).value = txtValue + ", " + strUser;
            }
            else {
                document.getElementById(textInformTo).value = strUser;

            }
        }
    }
}
function fetchCommentFields() {
    // $(".clscommhours").val("0");
    $('#flCommUpload').replaceWith($('#flCommUpload').clone());
    $(".clsCommDialogBox").css("display", "inline");
    var tskProjId = $("#txtTskProjId").text();
    var tskId = $("#lblTaskId").text();
    _BaseUrl = _vrLocationOrigin + '/project/FetchPrjctsEmp?strPrjctID=' + tskProjId + '&strEmployeeID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, getTaskRelEmps)
    $("#txtDueDate").val($("#lblDueDate").text());//Assigning of values
    $("#ddlStatus").val(_vrTaskStatusId);//Assigning of values
    if (_vrTaskStatusId == 1 || _vrNonBillableTask == true) {
        $("#txtCommBillHours").prop('disabled', true);
        $("#txtCommBillHours").css("background-color", "rgb(131, 131, 131)");
        //$("#txtTaskComments").prop('placeholder', 'Enter Non-billable comments');       
        if (_vrNonBillableTask == true) {
            $("#txtNonBillableComm").css("display", "inline");
            $("#txtTaskComments").css("display", "none");
        }
    }
    else {
        $("#txtCommBillHours").prop('disabled', false);
        $("#txtCommBillHours").css("background-color", "transparent");
        $("#txtTaskComments").css("display", "block");
        $("#txtNonBillableComm").css("display", "none");
        //$("#txtTaskComments").prop('placeholder', 'Enter billable comments');
    }

    if (_vrBeyondScope == true || _vrBeyondScope == 'True') {
        $('#chkBeyondScope').prop("checked", true);
        _vrBeyondScope = true;
    }
    else {
        $('#chkBeyondScope').prop("checked", false);
        _vrBeyondScope = false;
    }
    //event.preventDefault();
}
//To get inform to values through particular dropdown text.
function GetInformToIds(ddlInformTo, TextInformTo) {
    var vrInformTo = '';
    vrTxtInformTo = $("#" + TextInformTo).val().split(',');
    var vrtxtVal = $("#" + TextInformTo).val();
    for (var i = 0; i < vrTxtInformTo.length; i++) {
        try {
            vrInformToIndivid = $("#" + ddlInformTo + " option[text='" + $.trim(convertDoubleSingleQuotetoNormalChar(vrTxtInformTo[i])) + "']").val();
        } catch (e) {
            continue;
        }

        if (!isNaN(vrInformToIndivid) && vrInformToIndivid.length > 0) {
            vrInformTo = vrInformTo + vrInformToIndivid + ',';
        }
    }
    return vrInformTo.substr(0, vrInformTo.length - 1);
}

//Gets today date.
function getCurrentDate() {
    var dt = new Date();
    var frmDt = DoubleDigit(dt.getMonth() + 1) + '/' + DoubleDigit(dt.getDate()) + '/' + dt.getFullYear() + ' ' +
    DoubleDigit(dt.getHours()) + ':' + DoubleDigit(dt.getMinutes()) + ':' + DoubleDigit(dt.getSeconds());
    return frmDt;
}

//Not necessary due to using user pref checkboxes.

//function taskTrailProjectChange() {
//    var ddlTaskProjval = $("#ddlTaskTrailProject option:selected").text();
//    $("#ddlTaskTrailProject").prop('title', ddlTaskProjval);
//    if ($("#MagnifierDialog .clstasksfields").length > 0) {
//        if ($("#ddlTaskTrailProject").val() != '0') {

//            $("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'TaskName', 'width', '39.6%');
//            $("#jqxTasksgrid").jqxGrid('hidecolumn', 'ProjectName');

//        } else {

//            $("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'TaskName', 'width', '20%');
//            $("#jqxTasksgrid").jqxGrid('showcolumn', 'ProjectName');
//            //$("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'ProjectName', 'width', '105px');

//        }
//        disableJqxPagerButtonsOnLoad('jqxTasksgrid');
//    } else {

//        if ($("#ddlTaskTrailProject").val() != '0') {

//            $("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'TaskName', 'width', '39.6%');
//            $("#jqxTasksgrid").jqxGrid('hidecolumn', 'ProjectName');
//        } else {
//            $("#jqxTasksgrid").jqxGrid('setcolumnproperty', 'TaskName', 'width', '20%');
//            $("#jqxTasksgrid").jqxGrid('showcolumn', 'ProjectName');
//        }
//    }
//}
//function to fetch values from multi select in bug trail



function filterTaskTrailSprintDataJqxGrid() {
    try {
        var vrTaskTrailSprintData = $("#ddlTaskTrailSprint").val();
        var vrTskTrlStatus = $("#ddlTskTrailStatus").val();
        var vrDynTaskTrailSprintData = _vrTasksData;
        var vrDynTaskTrailSprintLocalData = _vrTasksData.localdata;
        var vrFilteredData = vrDynTaskTrailSprintLocalData;
        if ((vrTaskTrailSprintData == 0 && vrTskTrlStatus == 0) || vrTskTrlStatus.length == 0) {
            vrFilteredData = vrDynTaskTrailSprintLocalData;
        } else if (vrTaskTrailSprintData != 0 && vrTskTrlStatus != 0) {
            vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
               // if ($("#chkFilterTasks").prop("checked")) {
                    return element.SprintID == parseInt(vrTaskTrailSprintData) && element.TaskStatusID == parseInt(vrTskTrlStatus); // retain appropriate elements
                //} else {
                //    return element.SprintID == parseInt(vrTaskTrailSprintData) && (element.TaskStatusID == parseInt(vrTskTrlStatus) || element.TaskStatusID == _vrStoppedStatus || element.TaskStatusID == _vrDeliveredStatus || element.TaskStatusID == _vrDoneStatus); // retain appropriate elements
                //}
            });
        } else if (vrTaskTrailSprintData != 0) {
            vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
                return element.SprintID == parseInt(vrTaskTrailSprintData)  // retain appropriate elements
            });
        } else if (vrTskTrlStatus != 0) {
            vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
              //  if ($("#chkFilterTasks").prop("checked")) {
                    return element.TaskStatusID == parseInt(vrTskTrlStatus); // retain appropriate elements
                //} else {
                //    return (element.TaskStatusID == parseInt(vrTskTrlStatus) || element.TaskStatusID == _vrStoppedStatus || element.TaskStatusID == _vrDeliveredStatus || element.TaskStatusID == _vrDoneStatus); // retain appropriate elements
                //}
            });
        }
        vrDynTaskTrailSprintData.localdata = vrFilteredData;
        $("#jqxTasksgrid").jqxGrid({ source: _vrTasksData });
        _vrTasksData.localdata = vrDynTaskTrailSprintLocalData;
        disableJqxPagerButtonsOnLoad('jqxTasksgrid');

    } catch (e) {
        $("#idSpnLoading").css("display", "none");
    }
}
function bindTasksBasedOnClientID(ProjId, EmployeeId, ExcludeVal, BindDataToJqx) {
    if (_UserRoleId != _vrClientRoleId) {
        _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + ProjId + '&intEmployeeID=' + EmployeeId + '&blnExcludeCSD=' + ExcludeVal + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, BindDataToJqx); //List of comments data is sent to "bindJqxGrid" method and binds to jqx grid.
    } else {
        _BaseUrl = _vrLocationOrigin + '/Customer/GetCustomerProjectEmpTaskDetails';
        var objTaskDetails = {
            TokenID: _vrUserTokenId,
            AssignedToEmpID: EmployeeId,
            TaskProjectID: ProjId,
            CustomerID: _EmpId,
            IsExcludeCSD: ExcludeVal
        };
        ajaxCallWithObject(_BaseUrl, objTaskDetails, BindDataToJqx);
    }

}
function GetInsertedResponse(data) {
   // _vrUserPrefGet = 1;
    var source = data;
 
    $('.info').html("Updated user preferences successfully");
    showStatusDiv();
    $(".dropdown-menu").css("display", "none");
    try {
        
        var vrUserPrefDB = JSON.parse(source.MultipleResults[0].Preferences);
        _vrUserPreferredWidgets = typeof vrUserPrefDB.gridsterWidgets == 'undefined' ? '' : vrUserPrefDB.gridsterWidgets;

        if ($.trim(_vrUserPreferredWidgets).length > 0) {
            for (var vrLoop = 0; vrLoop < _vrUserPreferredWidgets.length; vrLoop++) {
                var vrWidgetId = vrwidgetPreferences[vrLoop].WidgetId;
                //_vrUserPrefWidgetWidth = vrwidgetPreferences[vrLoop].xaxisval;
                vrWidgetId = vrWidgetId.replace("divWidget", "chk");
                $("#" + vrWidgetId).prop("checked", true);
             
            }
        }
       // var vrPrefData = source.MultipleResults;
       // BindUserPrefData(vrPrefData);
    } catch (e) {

    }
    
}

function GetUserPreferences() {
    _BaseUrl = _vrLocationOrigin + '/user/GetUserPreferenceDetails?strTokenID=' + _vrUserTokenId + '&intEmpID=' + _EmpId;
    ajaxCall(_BaseUrl, BindUserPrefData);
    //var vrUserId = _EmpId;
    //var vrUserPrefDB = localStorage;
    //localStorage.setItem("jqxGridjqxBillingReport", vrUserPrefDB.jqxGridjqxBillingReport);
    //localStorage.setItem("jqxGridjqxBugTrial", vrUserPrefDB.jqxGridjqxBugTrial);
    //localStorage.setItem("jqxGridjqxCustomerTrial", vrUserPrefDB.jqxGridjqxCustomerTrial);
    //localStorage.setItem("jqxGridjqxProjectsGrid", vrUserPrefDB.jqxGridjqxProjectsGrid);
    //localStorage.setItem("jqxGridjqxTasksgrid", vrUserPrefDB.jqxGridjqxTasksgrid);
    //localStorage.setItem("jqxGridjqxUserTrial", vrUserPrefDB.jqxGridjqxUserTrial);
}
function BindUserPrefData(source) {
    _vrUserPreferredWidgets = '';
    if (typeof source != 'undefined') {
        var data = source[0].Preferences;
        var vrUserPrefDB = JSON.parse($.trim(data));
        try {
            vrUserPrefDB.jqxGridjqxTasksgrid.columns.TaskID.text = 'Task ID <img src="img/Status.png" title="Status" class="clsstatushdrimg">';//As due to image tag getting error
        } catch (e) { }
        // clearLocalStorage();
        var vrUserPrefDeploy = typeof vrUserPrefDB.jqxGridjqxDeployGrid == 'undefined' ? null : vrUserPrefDB.jqxGridjqxDeployGrid;
        localStorage.setItem("jqxGridjqxBillingReport", JSON.stringify(vrUserPrefDB.jqxGridjqxBillingReport));
        localStorage.setItem("jqxGridjqxBugTrial", JSON.stringify(vrUserPrefDB.jqxGridjqxBugTrial));
        localStorage.setItem("jqxGridjqxCustomerTrial", JSON.stringify(vrUserPrefDB.jqxGridjqxCustomerTrial));
        localStorage.setItem("jqxGridjqxProjectsGrid", JSON.stringify(vrUserPrefDB.jqxGridjqxProjectsGrid));
        localStorage.setItem("jqxGridjqxTasksgrid", JSON.stringify(vrUserPrefDB.jqxGridjqxTasksgrid));
        localStorage.setItem("jqxGridjqxUserTrial", JSON.stringify(vrUserPrefDB.jqxGridjqxUserTrial));
        localStorage.setItem("jqxGridjqxDeployGrid", JSON.stringify(vrUserPrefDeploy));
        _vrUserPreferredWidgets = typeof vrUserPrefDB.gridsterWidgets == 'undefined' ? '' : vrUserPrefDB.gridsterWidgets;
        //if (_vrUserPrefGet == 0) {
        if ($.trim(_vrUserPreferredWidgets).length > 0) {
            getUserPrefWidgets(_vrUserPreferredWidgets);
        } else {
            userPreferredWidgets();
        }
    } else {
        userPreferredWidgets();
    }
}
       // } else {
       //     _vrUserPrefGet = 0;
     //   }
   // } else if (typeof source == 'undefined') {
      //  userPreferredWidgets();
        //_BaseUrl = _vrLocationOrigin + '/Task/GetStatusDetails?strTokenID=' + _vrUserTokenId;
        //ajaxCall(_BaseUrl, bindStatus);
        ////Functions to fetch data
        ////Fetches all tasks under logged employee using employee id and excludecsd status as true.
        //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + _vrddlProjId + '&intEmployeeID=' + vrLoginEmpId + '&blnExcludeCSD=' + _vrBlnExcludeDefault + '&strTokenID=' + _vrUserTokenId;
        //ajaxCall(_BaseUrl, bindJqxGrid); //List of comments data is sent to "bindJqxGrid" method and binds to jqx grid..
        ////To fetch all active employees of osmosys.
        //_BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId;
        //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagLoadBugTrEmp);
        ////Fetches all employees under particular project.
        //_BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId + '&strTokenID=' + _vrUserTokenId;
        //ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBugTrProject);
        ////END of fetching data 
        //BindValuesToBugFields();
        //FilterBugTrail();
   // }
    //checkUserPrefWidgets(_vrUserPreferredWidgets);

function userPreferredWidgets(){
    if (_UserRoleId == _vrClientRoleId) {
        _idSlider = "idDashboardslide";
        $("#" + _idSlider).click();
    }

    _idSlider = "idTasksSlide";
    $("#"+_idSlider).click();
    _idSlider = "idBugsSlide";
    $("#" + _idSlider).click();
}
function getUserPrefWidgets(vrwidgetPreferences) {
    //vrwidgetPreferences = vrwidgetPreferences.split(',');
    var vrSliderTasks = "";
    var vrEachWidgetControlData = {};
    for (var vrLoop = 0; vrLoop < vrwidgetPreferences.length; vrLoop++) {
        var vrWidgetId = vrwidgetPreferences[vrLoop].WidgetId;
        //_vrUserPrefWidgetWidth = vrwidgetPreferences[vrLoop].xaxisval;
        vrEachWidgetControlData = {};
        if (typeof vrwidgetPreferences[vrLoop].vrAllWidgetContrlData !== 'undefined') {
            vrEachWidgetControlData = vrwidgetPreferences[vrLoop].vrAllWidgetContrlData[0];
            vrEachWidgetControlData.vrWidgetId = vrWidgetId;
        }
        _vrWidgetCOntrolData.push(vrEachWidgetControlData);
        vrWidgetId = vrWidgetId.replace("divWidget","chk");
        $("#" + vrWidgetId).prop("checked", true);
        _idSlider = vrWidgetId.replace("chk", "id");
        _vrCheckDragNDrop = 1;
        $("#" + _idSlider).click();
       // _vrUserPrefWidgetWidth =_vrUserPreferredWidgets[vrLoop].col;
        if(_idSlider == "idTasksSlide"){
            vrSliderTasks = 1;
        }
    }
    if ($.trim(vrSliderTasks).length == 0) {
        _vrCheckIdSlider = 1;
        _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=0&intEmployeeID=' + _EmpId + '&blnExcludeCSD=' + _vrBlnExcludeDefault + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindJqxGrid);
    }

}

function checkUserPrefWidgets(vrwidgetPreferences) {
    vrwidgetPreferences= vrwidgetPreferences.replace("id", "chk");
//    for (var vrLoop = 0; vrLoop < _vrUserPreferredWidgets.length; vrLoop++) {
//        if (vrwidgetPreferences == _vrUserPreferredWidgets[vrLoop].WidgetId) {
//            //$("#" + vrwidgetPreferences).attr("data-row", _vrUserPreferredWidgets[vrLoop].row).attr("data-col", _vrUserPreferredWidgets[vrLoop].col);
//            //$("#" + vrwidgetPreferences).attr("data-sizex", _vrUserPreferredWidgets[vrLoop].xaxisval).attr("data-sizey", _vrUserPreferredWidgets[vrLoop].yaxisval);
//            vrwidgetPreferences = vrwidgetPreferences.replace("divWidget", "chk");
//            $("#" + vrwidgetPreferences).prop("checked", true);
//            break;
//}
    //    }
    $("#" + vrwidgetPreferences).prop("checked", true);
    
}
function checkUserPrefWidgetsPosition(vrwidgetPreferences) {
    var vrPosWidget = "";
    vrwidgetPreferences = vrwidgetPreferences.replace("id", "divWidget");
    for (var vrLoop = 0; vrLoop < _vrUserPreferredWidgets.length; vrLoop++) {
        if (vrwidgetPreferences == _vrUserPreferredWidgets[vrLoop].WidgetId) {
            vrPosWidget = _vrUserPreferredWidgets[vrLoop].xaxisval + "," + _vrUserPreferredWidgets[vrLoop].yaxisval + "," + _vrUserPreferredWidgets[vrLoop].col + "," + _vrUserPreferredWidgets[vrLoop].row;
            break;
        }
    }
    
    return vrPosWidget;
}
function GetAllActiveEmployees(_vrFlagValue) {
    //To fetch all active employees of osmosys.
    if (_UserRoleId != _vrClientRoleId) {
         _BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
         ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagValue);
    } else {
        _BaseUrl = _vrLocationOrigin + '/customer/GetCustomerProjectEmployees?intCustomerEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagValue);
    }
}
function bindTasksBasedOnConTrolData(data) {//function to load the grid based on the control data.
    if ($.trim(data).length == 0) {
        return;
    }
    var data = data.MultipleResults;
    _vrTasksData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _vrTasksDataFields,
        localdata: data,
        pagesize: _vrDefaultTaskSizer
    };
    _vrCheckCallFromLogin = 1;
    bindDataToJqx('jqxTasksgrid', _vrTasksData, _vrTasksColumns, _vrProjectsTasksWidth);
    var vrProjectID = parseInt(_vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailProject);
    if ((vrProjectID > 0) && (vrProjectID != NaN)) {
        AjaxCallToGetSprintDataBasedOnProjectID(vrProjectID, _vrFlagTaskWidgetSprintName);
    }
    _vrCheckCallFromLogin = '';
    //loadsTasksCount();
    bindLoggedUserTaskCount();
    $('#idSpnLoading').css("display", "none");
    setRecordCountPosition("jqxTasksgrid");// set the page number and widget size
}
function bindTasksBasedOnClientID(ProjId,EmployeeId,ExcludeVal,BindDataToJqx) {
    if (_UserRoleId != _vrClientRoleId) {
        _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + ProjId + '&intEmployeeID=' + EmployeeId + '&blnExcludeCSD=' + ExcludeVal + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, BindDataToJqx); //List of comments data is sent to "bindJqxGrid" method and binds to jqx grid.
    } else {
        _BaseUrl = _vrLocationOrigin +'/Customer/GetCustomerProjectEmpTaskDetails';
        var objTaskDetails = {
            TokenID: _vrUserTokenId,
            AssignedToEmpID: EmployeeId,
            TaskProjectID: ProjId,
            CustomerID: _EmpId,
            IsExcludeCSD: ExcludeVal
        }
        ajaxCallWithObject(_BaseUrl, objTaskDetails, BindDataToJqx);
    }
}




//function to view summary report

function ViewReport() {
    try {
        
            _vrSummaryReportDialog = 1;
       
      

        $("#divMainLoader").css("display", "inline");
        var _vrActiveID = "1";
        //_vrSummaryReportDialog = 1;
        $("#txtFromDate").datepicker("setDate", -1);
        $("#txtToDate").datepicker("setDate", new Date());
        $('#txtToDate').datepicker('option', 'minDate', '-1d')
        _BaseUrl = _vrLocationOrigin + '/User/GetActive?strActiveID=' + _vrActiveID + '&strTokenID=' + _vrUserTokenId ;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrReportEmp);
        _BaseUrl = _vrLocationOrigin + '/User/GetReports?strTokenID=' + _vrUserTokenId ;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrUserReports);
        //$("#ddlReports").val(3);
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
        var blnEmpId = "";
   
        if (vrLoginRoleId != 1) {
            blnEmpId = true;
        }
        else {
            blnEmpId = false;
           
        }
        var objSummaryReport = {
            EmpID: _EmpId,
            BlnFromDate: true,
            BlnToDate: true,
            BlnEmpID: blnEmpId,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            TokenID: _vrUserTokenId
        };
        _BaseUrl = _vrLocationOrigin + '/User/GetTaskSummaryReportDetails';
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadReportGrid);
       // loadReportGrid();
        $(".clsdailogfields").css("display", "none");
        $('#dailog').dialog('option', 'title', _vrSummRprtHdr);
        $("#divCreateReports").css("display", "inline");
        if(((_UserRoleId == _vrClientRoleId )||(_UserRoleId == _vrUserRoleId)) && _vrUserIsProjManager == false){
            $("#ddlEmployee").attr("disabled", true);
        }
        var title = $("#dailog").dialog("option", "title");
        if (title == _vrSummRprtHdr) {
            
            
            $("#ddlReports").val(4);
            
        }
        else if (title == _vrDialogBoxProjBillSummary) {
            
            $("#ddlReports").val(6);
         
        }
        $('#dailog').dialog('open');
      //  $("#divMainLoader").css("display", "none");
       } catch (e) {

    }
}

//function to loaed report grid

function loadReportGrid(data) {
    try {
        // $("#ReportGrid").jqxGrid({ pagesize: 14 });
        if (data.RecordCount > 0) {
            var source = data;
            var vrRprtSourceData = [];
            var empname = data.MultipleResults[0].EmpFirstName
            if (typeof empname != 'undefined') {
                vrRprtSourceData = source.MultipleResults;
            }
            else {
                vrRprtSourceData = [];
            }
        } else {
            vrRprtSourceData = [];
        }
            var _vrReportsData = {
                datatype: "json",
                type: "GET",
                cache: false,
                datafields: _vrReportsDataFields,
                localdata: vrRprtSourceData
                // pagesize: _vrDefaultTaskSizer
                // pagesizeoptions: "2",
            };
            bindDataToJqx('ReportGrid', _vrReportsData, _vrReportColumns, _vrMagnifyGridWidth);
            $("#divMainLoader").css("display", "none");
        
    } catch (e) {
        $("#divMainLoader").css("display", "none");
    }
}

//function to get reports bsed on the user selectio datesgetReports(_vrFromdate, _vrTodate);
function getReports(fromdate, todate) 
{
    $("#divMainLoader").css("display", "none");
    //$('#dailog').dialog('open');
    $(".clsdailogfields").css("display", "none");
    $('#dailog').dialog('option', 'title', _vrSummRprtHdr);
    $("#divCreateReports").css("display", "inline");
    $('#dailog').dialog('open');
    if (fromdate != undefined || todate != undefined) {
        //var _vrFromdate = fromdate;
        //var _vrTodate = todate;
        var _vrFromdate = fromdate;
        var _vrTodate = todate;
        var _vrFromDatepicker = _vrFromdate.split('-');
        var _vrToDatepicker = _vrTodate.split('-');
        $("#txtFromDate").val(_vrFromDatepicker[2] + '/' + _vrFromDatepicker[1] + '/' + _vrFromDatepicker[0]);
        $("#txtToDate").val(_vrToDatepicker[2] + '/' + _vrToDatepicker[1] + '/' + _vrToDatepicker[0]);
    }
    else {
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
    }
    $("#divMainLoader").css("display", "inline");
   // _vrattachedTask = "";
    //var fromdate = $("#txtFromDate").val().split('/');
    //var todate = $("#txtToDate").val().split('/');
    //var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
    //var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
    var blnEmpId = "";
    var empid = "";
    var _vrEmpID = $("#ddlEmployee").val();
    if (_vrEmpID != "0") {
        blnEmpId = true;
        empid = $("#ddlEmployee").val();
    }
    else {
        blnEmpId = false;
        empid = _vrEmpID;
    }
    if (_vrattachedStatus == null || _vrattachedStatus == "") {
        
        var objSummaryReport = {
            EmpID: empid,
            BlnFromDate: true,
            BlnToDate: true,
            BlnEmpID: blnEmpId,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            TokenID: _vrUserTokenId
        };
        _BaseUrl = _vrLocationOrigin + '/User/GetTaskSummaryReportDetails';
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadReportGrid);
    }
    else {
        //_BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?searchQuery=' + " " + '&blnFromDate=' + true + '&strFromDate=' + _vrFromdate + '&blnToDate=' + true + '&strToDate=' + _vrTodate + '&strTokenID=' + _vrUserTokenId;
        //ajaxCallBindDropDown(_BaseUrl, loadReportAttachedGrid, "");
        _BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?strTokenID=' + _vrUserTokenId;
        _vrReportProjVal= $("#ddlReportPoj").val();
        if (_vrReportProjVal.length > 0 && _vrReportProjVal!="0") {
            var blnProjValue = true;
        }
        else {
            var blnProjValue = false;
        }
        objSummaryReport = {
            BlnFromDate: true,
            BlnToDate: true,
            BlnEmpID: blnEmpId,
            BlnProjectID: blnProjValue,
            EmpID: empid,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            ProjectID: _vrReportProjVal,
            TokenID: _vrUserTokenId,
IsSummaryReport:false
        }
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadReportAttachedGrid);
    }
   
}

function loadReportAttachedGrid(data) {
    try{
        if (data.RecordCount == 0) {
            var source = [];
 $("#idTotalHours").text(0);
            $("#idBillableHours").text(0);
            $("#idNonBill").text(0);
        }
        else {
             var source = data.MultipleResults[0].TaskAttachedFileDetails;
            if (typeof (data.MultipleResults[0].ProjectBillingDetails) != 'undefined') {
                $("#idTotalHours").text(displayFormat(data.MultipleResults[0].ProjectBillingDetails[0].TotalProjectHours));
                $("#idBillableHours").text(displayFormat(data.MultipleResults[0].ProjectBillingDetails[0].TotalBillaleHours));
                $("#idNonBill").text(displayFormat(data.MultipleResults[0].ProjectBillingDetails[0].TotalNonBillaleHours));
            }
        }
    var _vrReportsData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _vrReportsFilesDataFields,
        localdata: source,
        pagesize: _vrDefaultTaskSizer
        // pagesizeoptions: "2",
    };
    var title = $("#dailog").dialog("option", "title");
    if (title == _vrDialogBoxProjBillSummary) {
        $("#ReportGrid").jqxGrid({ pagesize: _vrProjBillRprtPgr });
    }
    else {
        $("#ReportGrid").jqxGrid({ pagesize: _VrSummRprtPager });
    }
    bindDataToJqx('ReportGrid', _vrReportsData, _vrReportFilesColumns, _vrMagnifyGridWidth);
    $("#divMainLoader").css("display", "none");
    $("#ddlReportPoj").css("display", "inline");
    $("#lblReportProj").css("display", "inline");
    }
    catch (e) {
        $("#divMainLoader").css("display", "none");
    }
}


var linkrenderer_Reports = function (row, column, value) {
    return linkrenderreportvalues('ReportGrid', row, column, value);
}

var linkrenderreportvalues = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        var vrTaskId = rowdata['TaskID'];
        var vrProjId = rowdata['ProjectID'];
     var vrTaaskName = rowdata['TaskName'];
        //vrCustCompanyShow = convertDoubleSingleQuotetoChar(rowdata['CustomerCompanyName'].toString());
        //vrContactName = convertDoubleSingleQuotetoChar(rowdata['ContactPerson']);
        //vrCmpEmailId = convertDoubleSingleQuotetoChar(rowdata['Email'].toString());
     if (vrTaaskName != null) {
         var vrtskname = convertDoubleSingleQuotetoChar(rowdata['TaskName'].toString());
     }
    }
    // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
    return "<div class='clscustcompanyvalues clsaddellipsis'><a href='#' onclick='SummaryTaskLink(" + vrTaskId + "," + vrProjId + "," + vrtskname + ")' >" + vrTaaskName + "</a></div>";
}

var linkrenderer_ReportsEmployee = function (row, column, value) {
    return linkrenderreportEmpvalues('ReportGrid', row, column, value);
}
var linkrenderreportEmpvalues = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        var vrEmpName = rowdata['EmpFirstName'];
        var vrEmpID = rowdata['EmpID'];
        //var vrProjId = rowdata['ProjectID'];
        //var vrTaaskName = rowdata['TaskName'];
        //vrCustCompanyShow = convertDoubleSingleQuotetoChar(rowdata['CustomerCompanyName'].toString());
        //vrContactName = convertDoubleSingleQuotetoChar(rowdata['ContactPerson']);
        //vrCmpEmailId = convertDoubleSingleQuotetoChar(rowdata['Email'].toString());
        //if (vrEmpName != null) {
        //    var vrtskname = convertDoubleSingleQuotetoChar(rowdata['vrEmpName'].toString());
        //}
     
    }
    //var EmpValues = EmpDetails.split(',');

    // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
    return "<div class='clscustcompanyvalues clsaddellipsis'><a href='#' onclick='RepotEmployeeValues(" + vrEmpID + ")' >" + vrEmpName + "</a></div>";
}
var linkrenderer_ReportsFiles = function (row, column, value) {
    return linkrenderreportFiles('ReportGrid', row, column, value);
}
var linkrenderreportFiles = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        var vrFileName = rowdata['AttachedFiles'];
      

    }
    //var EmpValues = EmpDetails.split(',');

    // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
    var FileLocation = _vrAttachedFilesPath  + vrFileName;
    return "<div class='clscustcompanyvalues clsaddellipsis'><a target='_blanck' href='" + FileLocation + "'  >" + vrFileName + "</a></div>";
}
function RepotEmployeeValues(empid) {
    _vrReportMagnifyStatus = 1;
    _vrAttachedEmpID = empid;
    _BaseUrl = _vrLocationOrigin + '/User/GetEmpPersonalDetails?strTokenID=' + _vrUserTokenId + '&intEmpID=' + empid;
     ajaxCall(_BaseUrl, GetUserDetails);
}
function GetUserDetails(data) {
    var source = data;
    var EmpFirstName = data[0].EmpFirstName;
    var EmpMobile = data[0].PhoneNumber;
    var EmpAddress = data[0].Address;
    var EmpDetails = EmpFirstName + ',' + EmpMobile + ',' + EmpAddress;
    userValueLink(_vrAttachedEmpID,EmpFirstName, EmpMobile, EmpAddress);
    //return "<div class='clscustcompanyvalues clsaddellipsis'><a href='#' onclick='userValueLink(" + EmpFirstName + "," + EmpMobile + "," + EmpAddress + ")' >" + vrEmpName + "</a></div>";
}

function addBoosterARooster(vrclearFlag) {
   // $("#divMainLoader").css("display", "block");
    $("#divBARInnerFieldsDeatils").show();
    $("#BtnEmpPoints").show();
    $("#employeeDiv").hide();
    $("#BtnAllotPoints").hide();
    if (vrclearFlag == '1') {
        clearBoostaroosterFields();
        GetAllActiveEmployees(_vrFlagActiveEmployees);
    }
    $('#dailog').dialog('option', 'title', _vrDialogBoosterAdd);
    _vrDialogBoxTitle = _vrDialogBoosterAdd;
    $(".clsdailogfields").css("display", "none");
    $("#boosterDialog").css("display", "inline-block");
    $('#dailog').dialog('open');
    //_vrFlagValue = ;
  
    var vrScrType = '';
   
    $(".clsscoretype").click(function () {
        vrScrType = $("input:radio[name=pointsTypeRadio]:checked").val();
        _BaseUrl = _vrLocationOrigin + '/user/BoostRoosterCategory?strCategoryType=' + vrScrType + '&&strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagCategory);
    });
    
    $("#ddlCatergory").change(function () {
        vrScrType = $("input:radio[name=pointsTypeRadio]:checked").val();
        var vrCategoryId = $('#ddlCatergory option:selected').val();
        _BaseUrl = _vrLocationOrigin + '/user/BRSubCategoryTypes?strTokenID=' + _vrUserTokenId + '&&strCategoryID=' + vrCategoryId + '&&intPointsType=' + vrScrType;
        $('#ddlSubCatergory').empty();
        $(".clsbrtxtfields").val('');
        $("#lblFrequency").html('');
        $("#ddlSubCatergory").append("<option value='0'>Select subcategory</option>");

        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagSubCategory);
       

    });
    $("#ddlSubCatergory").change(function () {
        BindScoreData();
    });
  
}

//exporting the data in the bugtrail
function showOpenBugs()
{
    //Setting to default values.
    $("#chkTskOpenHoldBugs").prop("checked", false);
    _vrTskblnEmpName = false;
    _vrTskddlEmpName = _EmpId;
    //Setting to default values up on clicking open bugs.
    $("#idTskBugTrailLoading").css("display", "block");
    _vrTskOpenBugDialog = 1;
    $('#MagnifierDialog').dialog('open');
    $('#MagnifierDialog').dialog('option', 'title', _vrDialogBoxBugTrail);
    if ($("#MagnifierDialog #idBugTrail").length > 0) {
        $('#idBugTrail').css("display", "none");
    }
    $("#divProjectsTrail").css("display", "none");
    $("#divMagnifyHdrTitle").css("display", "none");
    $("#divMagnifierGrid").css("display", "none");
    $(".clstasksfields").css("display", "none");
    $("#idTskOpenBugTrail").css("display", "block");
    $(".clsTskbugtrailDates").css("display", "block");
    $('#MagnifierDialog').append($("#idTskOpenBugTrail"));
    BindValuesToBugFieldsTaskBugs();
    GetAllActiveEmployees(_vrTskOpenBugsEmp);
    $("#ddlTskOpenBugTrProject").val(_vrTxtTskProjId);
    _vrTskddlProjId = _vrTxtTskProjId;
    _vrTskblnProjId = true;
    $("#ddlTskOPenBugTrTaskName").empty();
    $("#ddlTskOPenBugTrTaskName").append("<option value='0'>Select task</option>");
    _BaseUrl = _vrLocationOrigin + '/project/GetPrjctRelatdTsk?strPrjctID=' + $("#ddlTskOpenBugTrProject").val() + '&strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrTskOpenBugsTsk);
    _vrTskddlTaskId = _vrTxtTskId;
    _vrTskblnTaskId = true;
    _vrTskddlStatus = 1;
    _vrTskblnStatus = true;
    var vrArrFromDate = _vrTskCreatOn.split("/");
    _vrTskCreatOn = vrArrFromDate[1] + "/" + vrArrFromDate[0] + "/" + vrArrFromDate[2];
    $("#txtTskOpenBugTrFromDate").datepicker("setDate", _vrTskCreatOn);
    var fromdate = $("#txtTskOpenBugTrFromDate").val();
    $('#txtTskOpenBugTrToDate').datepicker('option', 'minDate', fromdate);
    $(".ui-datepicker-trigger").css("width", "20px").css("margin-left", "2px");
    $(".clsSpnLoading").css("display", "none");
    FilterTskOpenBugTrail();
    event.preventDefault();

}
function BindValuesToDeployFields() {
    try {
        //Sets jquery ui date picker model for input type text contains class as "clsDatePicker."
        var dates = $("#txtDeployFromDate,#txtDeployToDate").datepicker({
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
                if ($.trim($("#txtDeployFromDate").val()).length > 0) {

                    for (var i = 0; i < dates.length; ++i) {
                        if (dates[i].id > this.id)
                            $(dates[i]).datepicker('option', 'minDate', date);
                    }
                }

            }
        });
        //$('#txtDeployToDate').datepicker('option', 'minDate', "-1d");
        $('.ui-datepicker-current').hide();
        $("#txtDeployToDate").datepicker("setDate", new Date());
        $("#txtDeployFromDate").datepicker("setDate", -1);
        if (_deployIndexNO > -1) {
            if (Object.keys(_vrWidgetCOntrolData[_deployIndexNO]).length > 0) {
                $("#txtDeployFromDate").datepicker("setDate", _vrWidgetCOntrolData[_deployIndexNO].txtDeployFromDate);
                $("#txtDeployToDate").datepicker('option', 'mindate', _vrWidgetCOntrolData[_deployIndexNO].txtDeployFromDate);
            }
        }
    } catch (e) {

    }
}


var linkrenderer_ReportCreatedOn = function (row, column, value) {
    return linkrenderreportcreatedon('ReportGrid', row, column, value);
}
var linkrenderreportcreatedon = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null && typeof rowdata['CreatedOn'] != 'undefined') {
        var vrFileName = rowdata['CreatedOn'];
        var _vrCretedOnSplit = vrFileName.split(' ');
        var _vrDateSplit = _vrCretedOnSplit[0].split('/');
        var _vrDate = _vrDateSplit[1] + '/' + _vrDateSplit[0] + '/' + _vrDateSplit[2];
        var _vrFinalDate = _vrDate + ' ' + _vrCretedOnSplit[1];
        //return _vrFinalDate;
        return "<div class='clscustcompanyvalues clsaddellipsis' title='" + _vrFinalDate + "'>" + _vrFinalDate + "</div>";
    }
}
 function createProjectwithExcel() {
    //var _vrExcelFilePath = _vrTaskExcelFileName;
    //objTask = {
    //    FileName: _vrExcelFilePath,
    //    GetUpdates: true,
    //    NonBillableTask: false,
    //    OwnerID: _EmpId,
    //    TaskCategoryID: '1',
    //    TaskComments: "",
    //    TaskDescription: "",
    //    TaskDueDate: "",
    //    TaskPriorityID: "1",
    //    TaskReleaseVersion: "1",
    //    TaskStatusID: "1",
    //    TokenID: _vrUserTokenId
    //}
    $(".clsNewTskMandatory").removeClass("error");
    $("#errNewTskError").css("display", "none");
    $("#errExcelFile").css("display","none");
    var MultiTasks = {
        AnticipatedHours: "",
        AssignedBy:"",
        AssignedTo: "",
        AttachedFiles: "",
        TaskDueDate: "",
        TaskCategoryID: "",
        Comments: "",
        InformTo: "",
        ModuleName: "",
        OwnerID: "",
        SprintID: "",
        TaskDescription: "",
        TaskDueDate: "",
        TaskName: "",
        ProjectName: "",
        TaskReleaseVersion: "",
        TokenID: ""
    }
    var data = [];
    if ( _vrJsonOutput.Sheet1!=null && typeof (_vrJsonOutput.Sheet1) != "undefined") {
        for (var index = 0; index < _vrJsonOutput.Sheet1.length; index++) {
            if (typeof (_vrJsonOutput.Sheet1[index].TaskName) != 'undefined' ) {
                var MultiTasks = {

                    EffortHours: "",
                    TaskName: "",
                    ProjectName: "",

                }
                MultiTasks.EffortHours = _vrJsonOutput.Sheet1[index].EffortHours;
                MultiTasks.TaskName = _vrJsonOutput.Sheet1[index].TaskName;
                MultiTasks.ProjectName = _vrJsonOutput.Sheet1[index].ProjectName;
                data.push(MultiTasks);
            }
        }
        var objTask = {
            AssignedBy: $("#lblLogin").text(),
            AssignedTo: 0,
            AttachedFiles: "",
            TaskDueDate: "",
            TaskCategoryID: 1,
            Comments: "",
            InformTo: "",
            ModuleName: "",
            OwnerID: _EmpId,

            TaskDescription: "",
            TaskDueDate: "",
            TaskReleaseVersion: "",
            TokenID: _vrUserTokenId,
            TaskPriorityID: 1,
            MultiTasks: data

        }
        if (objTask.MultiTasks.length > 0) {
            _BaseUrl = _vrLocationOrigin + '/Task/InsertTaskWithXLS/';

            ajaxCallWithObject(_BaseUrl, objTask, bindTaskCreationData);
            $('#idChooseExcel').replaceWith($('#idChooseExcel').clone());
        }
        else {
            $("#errExcelFile").css("display", "inline");
            $('#idChooseExcel').replaceWith($('#idChooseExcel').clone());
        }
    } else {
        $("#errNewExcelTskError").css("display", "inline");
        $('#idChooseExcel').replaceWith($('#idChooseExcel').clone());
        $("#idDisplayNonCreatedTasks").css("display", "none");
        $("#idDisplayCreatedTasks").css("display", "none");
        $("#divSuccesTaskCreationDiv").empty();
        $("#divSuccesTaskCreationDiv").css("display", "none");
        $("#divNonSuccesTaskCreationDiv").empty();
        $("#divNonSuccesTaskCreationDiv").css("display","none");
    }
    _vrJsonOutput.Sheet1 = null;
}
function bindTaskCreationData(data) {
    _vrSuccessSource = data.SingleResult.CreatedTasks;
    $("#idDisplayCreatedTasks").css("display", "inline");
    
    if (data.SingleResult.NonCreatedTasks.length > 0) {
        $("#idDisplayNonCreatedTasks").css("display", "inline");
        _vrNonSuccessSource = data.SingleResult.NonCreatedTasks;

    }
    $("#idDisplayCreatedTasks").click();
     //var _vrSplitNonSucessDiv = _vrNonSuccessSource.split(';');
     //for (var index = 0; index < _vrSplitNonSucessDiv.length; index++) {
     //    $("#divNonSuccesTaskCreationDiv").append("<label id='idNonSucessTasks' title='" + _vrSplitNonSucessDiv[index] + "'>'" + _vrSplitNonSucessDiv[index] + "'</label>");
     //}
}
var linkrenderer_taskcreatedon = function (row, column, value) {
    return linkrendertaskcreatedon('jqxTasksgrid', row, column, value);
}
var linkrendertaskcreatedon = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null && typeof rowdata['CreatedOn'] != 'undefined') {
        var vrFileName = rowdata['CreatedOn'];
        var _vrCretedOnSplit = vrFileName.split(' ');
        var _vrDateSplit = _vrCretedOnSplit[0].split('/');
        var _vrDate = _vrDateSplit[1] + '/' + _vrDateSplit[0] + '/' + _vrDateSplit[2];
        var _vrFinalDate = _vrDate + ' ' + _vrCretedOnSplit[1];
        //return _vrFinalDate;
        return "<div class='clscustcompanyvalues clsaddellipsis' title='" + _vrFinalDate + "'>" + _vrFinalDate + "</div>";
    }
}
function LaodQuoteCategoryDetails() {
    _BaseUrl = _vrLocationOrigin + '/Task/GetTaskCategories?strTokenID=' + _vrUserTokenId;
    $.ajax({
        type: 'GET',
        url: _BaseUrl,
        contentType: 'application/json;charset=utf-8',
        processData: false,
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            if (data.ResponseId == _vrExpiredTokendIdResponse) {
                logOutUser();
                //return false;
            }
            if (data.RecordCount == 1) {
                sourceGrid = data.SingleResult;
                if (typeof _vrQuoteCategory === 'undefined') {
                    _vrQuoteCategory = data.MultipleResults;
                }
            }
            else {
                _vrQuoteCategory = data.MultipleResults;
                var quotecategorydata = _vrQuoteCategory;
                _vrQuoteCategory = [];
                if (quotecategorydata != "undefined" && quotecategorydata.length > 0) {
                    $.each(quotecategorydata, function (i, item) {
                        _vrQuoteCategory.push(item.TaskCategoryType);
                    });
                }
            }
            //return true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            displayError();
            return false;
        }
    });
}

function viewBillingSummaryReport(fromdate, todate) {
    $(".clsdailogfields").css("display", "none");
    $("#divCreateReports").css("display", "inline");
    if (fromdate != undefined || todate != undefined) {
        //var _vrFromdate = fromdate;
        //var _vrTodate = todate;
        var _vrFromdate = fromdate;
        var _vrTodate = todate;
        var _vrFromDatepicker = _vrFromdate.split('-');
        var _vrToDatepicker = _vrTodate.split('-');
        $("#txtFromDate").val(_vrFromDatepicker[2] + '/' + _vrFromDatepicker[1] + '/' + _vrFromDatepicker[0]);
        $("#txtToDate").val(_vrToDatepicker[2] + '/' + _vrToDatepicker[1] + '/' + _vrToDatepicker[0]);
    }
    else {
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
    }
    //$('#dailog').dialog('open');
    $("#divMainLoader").css("display", "inline");
    // _vrattachedTask = "";
    $('#dailog').dialog('option', 'title', _vrDialogBoxProjBillSummary);
    var blnEmpId = "";
    var empid = "";
    var _vrEmpID = $("#ddlEmployee").val();
    if (_vrEmpID != "0") {
        blnEmpId = true;
        empid = $("#ddlEmployee").val();
    }
    else {
        blnEmpId = false;
        empid = _vrEmpID;
    }
    if (_vrattachedStatus == null || _vrattachedStatus == "") {

        var objSummaryReport = {
            EmpID: empid,

            BlnEmpID: blnEmpId,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            TokenID: _vrUserTokenId
        };
        _BaseUrl = _vrLocationOrigin + '/Project/GetTaskProjectSummaryReprtDtls';
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadSummaryBillingReportGrid);
    }
    else {
        //_BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?searchQuery=' + " " + '&blnFromDate=' + true + '&strFromDate=' + _vrFromdate + '&blnToDate=' + true + '&strToDate=' + _vrTodate + '&strTokenID=' + _vrUserTokenId;
        //ajaxCallBindDropDown(_BaseUrl, loadReportAttachedGrid, "");
        _BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?strTokenID=' + _vrUserTokenId;
        if (_vrReportProjVal.length > 0 && _vrReportProjVal != "0") {
            var blnProjValue = true;
        }
        else {
            var blnProjValue = false;
        }
        objSummaryReport = {
            BlnFromDate: true,
            BlnToDate: true,
            BlnEmpID: blnEmpId,
            BlnProjectID: blnProjValue,
            EmpID: empid,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            ProjectID: _vrReportProjVal,
            TokenID: _vrUserTokenId,
            IsSummaryReport:true
        }
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadReportAttachedGrid);
    }
    $('#dailog').dialog('open');
}
function loadSummaryBillingReportGrid(data) {
    var vrgriddata = [];
    try {
        if (data.RecordCount > 0) {
            $("#idTotalHours").text(displayFormat(data.MultipleResults[0].TotalProjectSummaryBillingDetails[0].TotalProjectHours));
            $("#idBillableHours").text(displayFormat(data.MultipleResults[0].TotalProjectSummaryBillingDetails[0].TotalBillaleHours));
            $("#idNonBill").text(displayFormat(data.MultipleResults[0].TotalProjectSummaryBillingDetails[0].TotalNonBillaleHours));
            vrgriddata = data.MultipleResults[0].ProjectSummaryBillingDetails;
        }
        else {
            vrgriddata = [];
            $("#idTotalHours").text("0");
            $("#idBillableHours").text("0");
            $("#idNonBill").text("0");
        }
        var _vrReportsData = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrBillingSummaryDataFields,
            localdata: vrgriddata,
            pagesize: _vrMagnifierTaskSizer
            // pagesizeoptions: "2",
        };
        bindDataToJqx('ReportGrid', _vrReportsData, _vrBillingSummaryColumns, _vrMagnifyGridWidth);
        $("#divMainLoader").css("display", "none");
    }
    catch(e){
    
    }
}
function viewBillingReport(fromdate, todate) {
    $(".clsdailogfields").css("display", "none");
    $("#divCreateReports").css("display", "inline");
    if (fromdate != undefined || todate != undefined) {
        //var _vrFromdate = fromdate;
        //var _vrTodate = todate;
        var _vrFromdate = fromdate;
        var _vrTodate = todate;
        var _vrFromDatepicker = _vrFromdate.split('-');
        var _vrToDatepicker = _vrTodate.split('-');
        $("#txtFromDate").val(_vrFromDatepicker[2] + '/' + _vrFromDatepicker[1] + '/' + _vrFromDatepicker[0]);
        $("#txtToDate").val(_vrToDatepicker[2] + '/' + _vrToDatepicker[1] + '/' + _vrToDatepicker[0]);
    }
    else {
        var fromdate = $("#txtFromDate").val().split('/');
        var todate = $("#txtToDate").val().split('/');
        var _vrFromdate = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        var _vrTodate = todate[2] + '-' + todate[1] + '-' + todate[0];
    }
    //$('#dailog').dialog('open');
    $("#divMainLoader").css("display", "inline");
    // _vrattachedTask = "";
    $('#dailog').dialog('option', 'title', _vrDialogBoxProjBillSummary);
    var blnEmpId = "";
    var empid = "";
    var _vrEmpID = $("#ddlEmployee").val();
    if (_vrEmpID != "0") {
        blnEmpId = true;
        empid = $("#ddlEmployee").val();
    }
    else {
        blnEmpId = false;
        empid = _vrEmpID;
    }
    if (_vrReportProjVal.length > 0 && _vrReportProjVal != "0") {
        var blnProjValue = true;
    }
    else {
        var blnProjValue = false;
    }
    if (_vrattachedStatus == null || _vrattachedStatus == "") {

        //var objSummaryReport = {
        //    EmpID: empid,

        //    BlnEmpID: blnEmpId,
        //    FromDate: _vrFromdate,
        //    ToDate: _vrTodate,
        //    TokenID: _vrUserTokenId
        //};
        //_BaseUrl = _vrLocationOrigin + '/Project/GetTaskProjectSummaryReprtDtls';
        //ajaxCallWithObject(_BaseUrl, objSummaryReport, loadSummaryBillingReportGrid);
        _BaseUrl = _vrLocationOrigin + '/Task/FilterBillingDetails';
        var objBillingReportFilterDetails = {
            BlnEmpID: blnEmpId,
            EmpID: empid,
            BlnProject: blnProjValue,
            ProjectID: _vrReportProjVal,
            BlnFromDate: true,
            FromDate: _vrFromdate,
            BlnToDate: true,
            ToDate: _vrTodate,
            IsBeyondScope: false,
            TokenID: _vrUserTokenId,
            ProjectManager: _EmpId,
            RoleID: _UserRoleId,
            IsProjectManager: _vrUserIsProjManager,
            LoggedInEmpID: _EmpId
        };
        _vrBillReportFlag = 1;
        ajaxCallWithObject(_BaseUrl, objBillingReportFilterDetails, bindBillingReportData);
    }
    else {
        //_BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?searchQuery=' + " " + '&blnFromDate=' + true + '&strFromDate=' + _vrFromdate + '&blnToDate=' + true + '&strToDate=' + _vrTodate + '&strTokenID=' + _vrUserTokenId;
        //ajaxCallBindDropDown(_BaseUrl, loadReportAttachedGrid, "");
        _BaseUrl = _vrLocationOrigin + '/user/FilterTaskDetailsWithAttachFiles?strTokenID=' + _vrUserTokenId;
        if (_vrReportProjVal.length > 0 && _vrReportProjVal != "0") {
            var blnProjValue = true;
        }
        else {
            var blnProjValue = false;
        }
        objSummaryReport = {
            BlnFromDate: true,
            BlnToDate: true,
            BlnEmpID: blnEmpId,
            BlnProjectID: blnProjValue,
            EmpID: empid,
            FromDate: _vrFromdate,
            ToDate: _vrTodate,
            ProjectID: _vrReportProjVal,
            TokenID: _vrUserTokenId,
            IsSummaryReport: true
        }
        ajaxCallWithObject(_BaseUrl, objSummaryReport, loadReportAttachedGrid);
    }
    $('#dailog').dialog('open');
}
function bindBillingSummaryReportData(data) {
    var source = data;
}function bindLoggedUserTaskCount() {
    _BaseUrl = _vrLocationOrigin + '/Mobile/GetTaskDataUsingEmpID?intEmployeeID=' + _EmpId + '&&strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, loadsTasksCount);
}