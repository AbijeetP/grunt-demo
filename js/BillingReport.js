var vrBlnBeyondScope = false;
var _vrEmpId = '';
var _vrProjectId = '';
var _vrblnProjId = false;
var _vrblnEmpId = false;
var _vrblnFromDate = false;
var _vrblnToDate = false;
var _BaseUrl = '';
var _varSource = '';
var vrBillRprtBillableHrs = 0, vrBillRprtNonBillableHrs = 0, vrBillRprtTotalHrs = 0;
var vrBillingFlag = false;
$(document).ready(function () {
    $(".clsBillingReport").css("display", "none");
    $("#jqxBillingReport").on('cellbeginedit', function (event) {
        var args = event.args;
        $("#cellbegineditevent").text("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    });
    $(".gridster").on("click", "#btnRefreshBillingReportGrid", function () {
        _BRIndexNO = -1;
        $("#imgBIllingReportrMagnify").attr("disabled", true);
        $("#ddlBillingRprtEmpName").val(_EmpId);/* bug id 5161*/
        $("#ddlBillingRprtProjectName").val(0);/* bug id 5161*/
        $("#divBillingReportLoading").css("display", "block");
        $("#chkBillingReportBeyondScope").prop("checked",false);
        loadFieldsDataToBillRprt();
        $("#imgBIllingReportrMagnify").attr("disabled", false);
    });

    $("#jqxBillingReport").on('cellendedit', function (event) {
        var args = event.args;
        $("#cellendeditevent").text("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    });
    $("#jqxBillingReport").bind('cellendedit', function (event) {
        var args = event.args;
        var columnDataField = args.datafield;
        var rowIndex = args.rowindex;
        var cellValue = args.value;
        var oldValue = args.oldvalue;
    });
    
  
});
var linkrenderer_timeformatForBillingReport = function (row, column, value) {
    var valRes = typeof value == 'undefined' || $.trim(value).length == 0 ? _vrDefaultFmt : value.toString();
    if (valRes != _vrDefaultFmt) {
        var valFormat = displayFormat(valRes);
        return "<div class='clsformatfields' title='" + valFormat + "'>" + valFormat + "</div>";
    }
    else {
        return;
    }
}
function RefreshBillingReportData() {
    $("#divBillingReportLoading").css("display", "block");
        loadFieldsDataToBillRprt();

    $("#divBillingReportLoading").css("display", "none");
}
function loadFieldsDataToBillRprt() {
    
    var dates = $("#txtBillingRprtFromDate,#txtBillingRprtToDate").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy',
        maxDate: new Date(),
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        onClose: function (e) {
            var ev = window.event;
            if (ev.srcElement.innerHTML == 'Clear')
                this.value = "";

        },
        closeText: 'Clear',
        buttonText: '',
        onSelect: function (date) {
            if ($.trim($("#txtBillingRprtFromDate").val()).length > 0) {
                $("#txtBillingRprtFromDate").removeClass('error');
                for (var i = 0; i < dates.length; ++i) {
                    if (dates[i].id > this.id)
                        $(dates[i]).datepicker('option', 'minDate', date);
                }
            }

        }
    });

    $('#txtBillingRprtToDate').datepicker('option', 'minDate', '-1d');//addeed by harish 14/1/2014
    $("#txtBillingRprtFromDate").datepicker("setDate", -1);
    $("#txtBillingRprtToDate").datepicker("setDate", new Date());
    //setTimeout(function () {

    //    // do something with text
    //}, 500);
    bindDataToBillingRprtDropDownDyn();
   // $("#jqxBillingReport").jqxGrid({ pagesize: _vrBillingGridPagerSize });
    if (_vrBRCheckCallFromLogin != 1) {
        loadjqxBillingReportGrid();
    }
    vrLoginRoleId = _UserRoleId;
    if (vrLoginRoleId == 1) {
        $("#chkBillingReportBeyondScope").show();
        $("#lblBillingRprtBeyondScope").show();
    }
    else {
        $("#chkBillingReportBeyondScope").hide();
        $("#lblBillingRprtBeyondScope").hide();
    }
}


function loadjqxBillingReportGrid() {
    //if (_vrBillingLoadingFlag == _vrBillingGridInit) {
    //    $("#txtBillingRprtFromDate").datepicker("setDate", -1);
    //    $("#txtBillingRprtToDate").datepicker("setDate", new Date());
    //}
    try {
        $("#divBillingReportLoading").css("display", "inline");

    if (_vrDragDropBillRprt.length > 0) {
        _vrDragDropBillRprt = '';
        _vrEmpId = _EmpId;
      
    } else {
        _vrEmpId = $("#ddlBillingRprtEmpName").val();
        _vrEmpId = _vrEmpId == null ? _EmpId : _vrEmpId;
    }
  
    _vrProjectId = $("#ddlBillingRprtProjectName").val();
    _vrProjectId = _vrProjectId == null ? '0' : _vrProjectId;
    var fromDate = $("#txtBillingRprtFromDate").val().split("/");
    if (fromDate != "" && fromDate != undefined) {
        _vrFromDate = fromDate[2] + '-' + fromDate[1] + '-' + fromDate[0];
    }
    else {
        _vrFromDate = 0;
    }
    var ToDate = $("#txtBillingRprtToDate").val().split("/");
    if (ToDate != "" && ToDate != undefined) {
        _vrToDate = ToDate[2] + '-' + ToDate[1] + '-' + ToDate[0];
    }
    else {
        _vrToDate =     0;
    }
    _vrblnEmpId = _vrEmpId == '0' ? false : true;
    _vrblnProjId = _vrProjectId == '0' ? false : true;
    _vrblnFromDate = _vrFromDate == '0' ? false : true;
    _vrblnToDate = _vrToDate == '0' ? false : true;
    _vrFilterClickInBillingReport = 0;
    FilterBillingReport();
  //  $("#divBillingReportLoading").css("display", "none");
    } catch (e) {
        $("#divBillingReportLoading").css("display", "none");
    }
}
function loadJqBillingModifiedsGrid() {
    bindDataToJqx("jqxBillingReport", _vrBillingReportData, _vrBillingReportcolumns, _vrMagnifyGridWidth);//Calls by clicking on magnifier icon.
    $("#jqxBillingReport").jqxGrid({ source: _vrBillingReportData });
    if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'ProjectName', 'width', '140px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'TaskName', 'width', '210px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'Comments', 'width', '240px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '95px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'NonBillableHours', 'width', '125px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'EmpFirstName', 'width', '120px');
        $("#jqxBillingReport").jqxGrid('hidecolumn', 'ApprovedBillableHours');
        $("#btnUpdateAprroveBillHour").css("display", "none");
    }
    //if (vrLoginRoleId == 1) {
    //    $("#btnUpdateAprroveBillHour").css("display", "block");
    //}
    //else {
    //    $("#btnUpdateAprroveBillHour").css("display", "none");
    //}
    disableJqxPagerButtonsOnLoad("jqxBillingReport");
}

function decreaseJqxBillingReportGrid() {
    setLocalStorageFromDialog("jqxBillingReport", _vrBillingReportGridWidth);
    bindDataToJqx("jqxBillingReport", _vrBillingReportData, _vrBillingReportcolumns, _vrBillingReportGridWidth);
    filterProjectsJqxGrid();
    if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'TaskName', 'width', '130px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'Comments', 'width', '187px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '95px');
        $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'NonBillableHours', 'width', '108px');
        $("#jqxBillingReport").jqxGrid('hidecolumn', 'ApprovedBillableHours');
    }
    else {
        $("#btnUpdateAprroveBillHour").css("display", "block");
    }
}
function bindBillingReportData(source) {
    var _vrLocaldata = '';

    //varSource = source;
    var data = source.MultipleResults;
    if (source.RecordCount > 0) {
        _vrLocaldata = data[0].LstBillingDetails;
    }
    else {
        _vrLocaldata = [];
    }
    //if (typeof localStorage.jqxGridjqxBillingReport != 'undefined') {
    //        $("#jqxBillingReport").jqxGrid('loadstate', JSON.parse(localStorage.jqxGridjqxBillingReport));
    //}
    var vrSortColumnName = '', vrSortOrder = '';
    var colsort = sortingcolumns("jqxBillingReport");
    vrSortColumnName = colsort.vrSortColumnName;
    vrSortOrder = colsort.vrSortOrder;
    var data = source.MultipleResults;
        _vrBillingReportData = {
            datatype: "json",
            type: "POST",
            cache: false,
            datafields: _vrBillingReportDataFields,
            localdata: _vrLocaldata
        };
        //var vrJqxBillRprt = JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"));

        var opened = $("#MagnifierDialog").dialog("isOpen");
        $("#divBillingReportLoading").css("display", "inline");
    if (!opened) {
        if (vrLoginRoleId == 1) {
            $("#divBillingReportLoading").css("display", "inline");
           // bindDataToJqx("jqxBillingReport", _vrBillingReportData, _vrBillingReportcolumns, _vrBillingReportGridWidth);
            if (_vrBillReportFlag != "") {
                bindDataToJqx("ReportGrid", _vrBillingReportData, _vrBillingReportcolumns, _vrMagnifyGridWidth);
            } else {
                bindDataToJqx("jqxBillingReport", _vrBillingReportData, _vrBillingReportcolumns, _vrBillingReportGridWidth);
            }
            $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '10.5%');
            $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'ApprovedBillableHours', 'width', '7.7%');
            $("#btnUpdateAprroveBillHour").css("display", "block");
        }
        else {
            $("#divBillingReportLoading").css("display", "inline");
            if (_vrBillReportFlag != "") {
                bindDataToJqx("ReportGrid", _vrBillingReportData, _vrBillingReportcolumns, _vrMagnifyGridWidth);
            } else {
                bindDataToJqx("jqxBillingReport", _vrBillingReportData, _vrBillingReportcolumns, _vrBillingReportGridWidth);
            }
            if(typeof data !='undefined'){
            if ((_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId) && typeof (data[0].IsProjectManager) != 'undefined') {
                if (data[0].IsProjectManager == false) {
                    // if (data[0].IsProjectManager == false) {
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'TaskName', 'width', '23%');
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'Comments', 'width', '17%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '12.6%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'NonBillableHours', 'width', '13.6%');
                    $("#jqxBillingReport").jqxGrid('hidecolumn', 'ApprovedBillableHours');
                    $("#btnUpdateAprroveBillHour").css("display", "none");
                    // }
                }
                else {
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'ApprovedBillableHours', 'width', '10%');
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'TaskName', 'width', '17%');
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'Comments', 'width', '15%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '8%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'NonBillableHours', 'width', '8.2%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'ApprovedBillableHours', 'width', '10%');
                    $("#jqxBillingReport").jqxGrid('showcolumn', 'ApprovedBillableHours');
                    $("#btnUpdateAprroveBillHour").css("display", "block");
                }
            }
            else {
            
                $("#btnUpdateAprroveBillHour").css("display", "none");
            }
        }
            
        }
    }
    else {

        $("#divBillingReportLoading").css("display", "inline");
        bindDataToJqx("jqxBillingReport", _vrBillingReportData, _vrBillingReportcolumns, _vrMagnifyGridWidth);
        if (typeof data != 'undefined') {
            if ((_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId) && typeof (data[0].IsProjectManager) != 'undefined') {
                if (data[0].IsProjectManager == false) {
                    // if (data[0].IsProjectManager == false) {
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'TaskName', 'width', '23%');
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'Comments', 'width', '17%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '13.6%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'NonBillableHours', 'width', '16%');
                    $("#jqxBillingReport").jqxGrid('hidecolumn', 'ApprovedBillableHours');
                    $("#btnUpdateAprroveBillHour").css("display", "none");
                    // }
                }
                else {
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'ApprovedBillableHours', 'width', '10%');
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'TaskName', 'width', '17%');
                    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'Comments', 'width', '15%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'BillableHours', 'width', '10.8%');
                    $("#jqxBillingReport").jqxGrid('setcolumnproperty', 'NonBillableHours', 'width', '11%');
                    $("#jqxBillingReport").jqxGrid('showcolumn', 'ApprovedBillableHours');
                    $("#btnUpdateAprroveBillHour").css("display", "block");
                }
            }
        }
        else {
            $("#btnUpdateAprroveBillHour").css("display", "block");
        }
        //$("#idSearchCustomer").attr("disabled", false);
    }
    $("#jqxBillingReport").jqxGrid({ source: _vrBillingReportData });
    vrBillRprtBillableHrs = 0;
    vrBillRprtNonBillableHrs = 0;
    vrBillRprtTotalHrs = 0;
    var dataSource = typeof _vrBillingReportData.localdata != 'undefined' ? _vrBillingReportData.localdata : 0;
    for (var vrLoop = 0; vrLoop < dataSource.length; vrLoop++) {
        var vrBillRprtBillVal = isNaN(dataSource[vrLoop].BillableHours) ? 0 : dataSource[vrLoop].BillableHours;
        var vrBillRprtNonBillVal = isNaN(dataSource[vrLoop].NonBillableHours) ? 0 : dataSource[vrLoop].NonBillableHours;
        vrBillRprtBillableHrs += parseFloat(vrBillRprtBillVal);
        vrBillRprtNonBillableHrs += parseFloat(vrBillRprtNonBillVal);
    }
    vrBillRprtTotalHrs = parseFloat(vrBillRprtBillableHrs) + parseFloat(vrBillRprtNonBillableHrs);

    cropText($("#lblBillRprtBillVal"), displayFormat(vrBillRprtBillableHrs), _varMaxTimecharlen);
    cropText($("#lblBillRprtNonBillVal"), displayFormat(vrBillRprtNonBillableHrs), _varMaxTimecharlen);
    cropText($("#lblBillRprtTtlBillVal"), displayFormat(vrBillRprtTotalHrs), _varMaxTimecharlen);
    //    = jQuery.grep(_vrBillingReportData.localdata, function (element, index) {
    //    return parseFloat(vrBillRprtBillableHrs)+parseFloat(element.BillableHours); // retain appropriate elements
    //});
    //var vrVal = vrBillRprtBillableHrs;

	
    $("#divBillingReportLoading").css("display", "none");
    $("#imgBIllingReportrMagnify").attr("disabled", false);
    if (_vrBillingLoadingFlag == _vrBillingGridInit) {
        $("#txtBillingRprtFromDate").datepicker("setDate", -1);
        $("#txtBillingRprtToDate").datepicker("setDate", new Date());
        $('#txtBillingRprtToDate').datepicker('option', 'minDate', '-1d');//addeed by harish 14/1/2014
        _vrBillingLoadingFlag = '';
    }
    if (_vrWidgetCOntrolData.length > 0) {
        if (_BRIndexNO > -1) {
            if (Object.keys(_vrWidgetCOntrolData[_BRIndexNO]).length > 0) {
                $("#txtBillingRprtToDate").datepicker("option", 'minDate', _vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtFromDate);
                $("#txtBillingRprtToDate").datepicker("setDate", _vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtToDate);
                $("#txtBillingRprtFromDate").datepicker("setDate", _vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtFromDate);
            }
        }
    }

    //$("#jqxBillingReport").jqxGrid('setcolumnproperty', 'ApprovedBillableHours', 'editable', true);//To set approved billable hours to editable.
    //$("#jqxBillingReport").jqxGrid('refreshData');
    if (_vrBillReportFlag == "") {
        disableJqxPagerButtonsOnLoad("jqxBillingReport");
    }
    setRecordCountPosition("jqxBillingReport");//To set pager count position in jqxgrid up on dynamically adding.
    sortOrderUserPref("jqxBillingReport", vrSortColumnName, vrSortOrder);
    $("#divBillingReportLoading").css("display", "none");
    $("#imgMainLoader").css("display","none");
    _vrBRCheckCallFromLogin = '';
    }
    

function bindDataToBillingRprtDropDownDyn() {
    try {
        //To fetch all active employees of osmosys in task trail.
        if (_UserRoleId != _vrClientRoleId) {
             _BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBIllingReportBindEmployees);
        } else {
            _BaseUrl = _vrLocationOrigin + '/customer/GetCustomerProjectEmployees?intCustomerEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId;
            ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBIllingReportBindEmployees);
        }
        //Fetches all employees under particular project in task trail.
        _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + _EmpId + '&strEmpUserRoleID=' + _UserRoleId+'&strTokenID='+ _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBIllingReportBindProjects);
    } catch (e) {
    }
}

function FilterBillingReport() {
    _BaseUrl = _vrLocationOrigin + '/Task/FilterBillingDetails';
    var objBillingReportFilterDetails = {
        BlnEmpID: _vrblnEmpId,
        EmpID: _vrEmpId,
        BlnProject: _vrblnProjId,
        ProjectID: _vrProjectId,
        BlnFromDate: _vrblnFromDate,
        FromDate: _vrFromDate,
        BlnToDate: _vrblnToDate,
        ToDate: _vrToDate,
        IsBeyondScope: vrBlnBeyondScope,
        TokenID: _vrUserTokenId,
        ProjectManager: _EmpId,
        RoleID: _UserRoleId,
        IsProjectManager: _vrUserIsProjManager,
        LoggedInEmpID:_EmpId
    };
    //ProjectManager: "95",
    //BlnProject: false,
    //ProjectID: "0",
    //EMpID:"0",
    //BlnFromDate: true,
    //TokenID: "31bd129d-0cd3-444f-90bf-6ba960e240d1",
    //IsProjectManager:true
    vrBillingFlag = true;
    ajaxCallWithObject(_BaseUrl, objBillingReportFilterDetails, bindBillingReportData);
    if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
        $("#ddlBillingRprtEmpName").attr("disabled", true);
    }

}
function GetBeyondScopeFilteringDetails() {

    $("#divBillingReportLoading").css("display", "block");
    _vrEmpId = $("#ddlBillingRprtEmpName").val();
    _vrProjectId = $("#ddlBillingRprtProjectName").val();
    var fromDate = $("#txtBillingRprtFromDate").val().split("/");
    vrBlnBeyondScope = $("#chkBillingReportBeyondScope").prop("checked");
    if (fromDate != "" && fromDate != undefined) {
        _vrFromDate = fromDate[2] + '-' + fromDate[1] + '-' + fromDate[0];
    }
    else {
        _vrFromDate = 0;
    }
    var ToDate = $("#txtBillingRprtToDate").val().split("/");
    if (ToDate != "" && ToDate != undefined) {
        _vrToDate = ToDate[2] + '-' + ToDate[1] + '-' + ToDate[0];
    }
    else {
        _vrToDate = 0;
    }
    _vrblnEmpId = _vrEmpId == '0' ? false : true;
    _vrblnProjId = _vrProjectId == '0' ? false : true;
    _vrblnFromDate = _vrFromDate == '0' ? false : true;
    _vrblnToDate = _vrToDate == '0' ? false : true;
    _vrFilterClickInBillingReport = 0;
    FilterBillingReport();
}
function FilterBillingReportDetail() {
    _BRIndexNO = -1;
    FilterBillingReportDetails();
}
function FilterBillingReportDetails() {
    $("#divBillingReportLoading").css("display","block");
    _vrEmpId = $("#ddlBillingRprtEmpName").val();
    _vrProjectId = $("#ddlBillingRprtProjectName").val();
    var fromDate = $("#txtBillingRprtFromDate").val().split("/");
    if (fromDate != "" && fromDate != undefined) {
        _vrFromDate = fromDate[2] + '-' + fromDate[1] + '-' + fromDate[0];
    }
    var ToDate = $("#txtBillingRprtToDate").val().split("/");
    if (ToDate != "" && ToDate != undefined) {
        _vrToDate = ToDate[2] + '-' + ToDate[1] + '-' + ToDate[0];
    }
    _vrblnEmpId = _vrEmpId == '0' ? false : true;
    _vrblnProjId = _vrProjectId == '0' ? false : true;
    _vrblnFromDate = _vrFromDate == '0' ? false : true;
    _vrblnToDate = _vrToDate == '0' ? false : true;
    vrBlnBeyondScope = $("#chkBillingReportBeyondScope").prop("checked");
    FilterBillingReport();
}



//var linkrenderer_billingformat = function (row,column,value) {
//    return "<input type='text'/>";
//}
var linkrenderer_TaskName = function (row, column, value) {
    return linkrendervaluesbilling('jqxBillingReport', row, column, value);
}
var linkrendervaluesbilling = function (jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var vrProjectName = rowdata['ProjectID'];
            var vrViewTaskName = rowdata['TaskName'].toString();
            var vrTaskName = convertDoubleSingleQuotetoChar(rowdata['TaskName']);
            vrTaskName = JSON.stringify(vrTaskName);
            var vrTaskID = rowdata['TaskID'];
            return "<div class='clsaddellipsis'><a href='#' onclick='taskBRLink(" + vrTaskID + "," + vrProjectName + "," + vrTaskName + ")' class='clsallBillingReportvaluesalign clsaddellipsis'>" + vrViewTaskName + "</a></div>";
        }
    }
    catch (ex) {
    }
}
function getBillingReportBasedEmployee() {
    _BRIndexNO = -1;
    _vrFilterClickInBillingReport = 0;
    FilterBillingReportDetails();
	 var vrProjTitle = $("#ddlBillingRprtProjectName option:selected").text();
    $("#ddlBillingRprtProjectName").prop('title', vrProjTitle);
    var vrEmpTitle = $('#ddlBillingRprtEmpName option:selected').text();
    $("#ddlBillingRprtEmpName").prop('title', vrEmpTitle);
}
var linkrenderer_Datetimeformat = function (row, column, value) {
    var vrFormattedDate = GetBillingReportFormat(value);
    //var vrFormattedTitle = vlFormattedDate);
    return "<div title='" + vrFormattedDate + "' class='clsbillingrptdatefrmt'><label title='" + vrFormattedDate + "'>" + vrFormattedDate + "</label></div>";
}
var linkrenderer_comments = function (row, column, value) {
    var vrComments = value;
    var vrCommentsTitle = vrComments.replace(_vrNonBillDiv, _vrNonBillSepText);
    var vrCroppedComments = vrCommentsTitle;
    vrCroppedComments = vrCroppedComments.replace(/\</g, "<span><</span>");
    vrCommentsTitle = vrCommentsTitle.replace(/\'/g, '&#145').replace(/\'/g, '&#146');

    return "<div class='clsbillingrptcomments clsaddellipsis' title='" + vrCommentsTitle + "'><label title='" + vrCommentsTitle + "' >" + vrCroppedComments + "</label></div>";
}

function GetBillingReportFormat(value) {
    if (typeof (value) != 'undefined' || value != null) {
        var vrDateFmt = value;
        var vrSplitDate = vrDateFmt.split("-");
        if (vrSplitDate.length > 1) {
            var vrSplitTimeFmt = vrSplitDate[2].split("T");
            var vrExactDatFmt = vrSplitTimeFmt[0] + "/" + vrSplitDate[1] + "/" + vrSplitDate[0] + " " + vrSplitTimeFmt[1];

            return vrExactDatFmt;
        } else {
            return;
        }
        //var vrDateFmt
    } else {
        return;
    }
}

function ApproveBillableHourBillingReport() {
    $("#divBillingReportLoading").css("display","block");
    var vrBillingReportRows = $("#jqxBillingReport").jqxGrid('getrows');
    var vrObjApproveBillHoursDetails = { ID: "", ApprvedBillHours:0.0 };
    var ApprovedBillHours = [];
    var ApprovedBillHrs = [];
    
    for (var i = 0; i < vrBillingReportRows.length; i++) {
        vrObjApproveBillHoursDetails = { ID: "", ApprvedBillHours: 0.0, TokenID: "" };
        if  (typeof (vrBillingReportRows[i].ApprovedBillableHours) !== 'undefined' ){
            vrObjApproveBillHoursDetails.ID = vrBillingReportRows[i].ID;
            vrObjApproveBillHoursDetails.ApprvedBillHours = parseFloat(vrBillingReportRows[i].ApprovedBillableHours);
            ApprovedBillHrs.push(vrObjApproveBillHoursDetails);
        }
    }
    
    var objTaskDetails = { ApprovedBillHours: ApprovedBillHrs, TokenID: _vrUserTokenId };
    _BaseUrl = _vrLocationOrigin + '/task/UpdateApprovedHours';

    ajaxCallWithObject(_BaseUrl, objTaskDetails, sucess);
}
function sucess(data) {
    
   // alert(data);
    if (data.ResponseId >= 1) {
        loadjqxBillingReportGrid();
    }
    else {
        $("#divBillingReportLoading").css("display", "none");
    }
}

