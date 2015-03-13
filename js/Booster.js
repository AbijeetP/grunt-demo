// JavaScript source code

var vrEmpID = '0';
var vrEmpSelect = true;
var vrCurSelmonth = 0;
$(document).ready(function () {
    //clearBoostaroosterFields();
    $(".clsnewBoostermandatory").change(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
        }
        if ($('.error').length == 0) {
            $("#BRErrorDiv").css("display", "none");

        }
    });
    //
    $(".clsnewBoostermandatory").blur(function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass('error');
        }
        if ($('.error').length == 0) {
            $("#BRErrorDiv").css("display", "none");
            ;
        }
    });
    $("#ddlEmployeeName").change(function () {
        validateEmpName();
    });
    $("body").on("change", "#ddlBRYear", function () {
        //$("#ddlBRYear").change(function () {
        vrCurSelmonth = $("#ddlBRMonth").val();
        loadMonthsData();
        $("#ddlBRMonth").val(vrCurSelmonth);
    });
   
    $("#txtGivenScore").keydown(function () {
        var key = event.charCode || event.keyCode || 0;
        var vrScoreType = $("input:radio[name=pointsTypeRadio]:checked").val();
        // var radioBtnValue = $("#<%=rblScrType.ClientID %> input:checked").val();
        var txtGivenValue = $("#txtGivenScore").val();
        if (txtGivenValue.indexOf("-") > -1) {
            if (key == 8) {
            }
            else if (key == 109) {
                return false;
            }
        }
        else if (vrScoreType == "1") {
            if (key == 109) {
                return false;
            }
        }

        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
        // home, end, period, numpad decimal and '-' minus sign for negative numbers
        //key == 110 || 110 is the value of decimal which is not allowed
        //
        return (
        key==189||
        key == 8 ||
        key == 9 ||
        key == 46 ||
        key == 109 ||
        key == 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
    });
    $("#btnNewBrPointsCancel").click(function () {
        //_vrCloseDialog = '1';
        clearBoostaroosterFields();
        $('#dailog').dialog('close');

    });
});

function pushDatatoArray(catData)
{
    for (var vrLoop = 0; vrLoop < catData.length; vrLoop++) {
        var obj = new Object();
        obj.SubCategoryID = catData[vrLoop].SubCategoryID;
        obj.CategoryID = catData[vrLoop].CategoryID;
        obj.Description = catData[vrLoop].Description;
        obj.Points = catData[vrLoop].Points;
        obj.Frequency = catData[vrLoop].Frequency;
        arrData.push(obj);
    }
}
function BindScoreData() {
    var strCatID = $("#ddlSubCatergory").val();
    if (strCatID == '0') {
        $(".clsbrtxtfields").val('');
        $("#lblFrequency").html('');
    }
    else{
    for (var intLoop = 0; intLoop < arrData.length; intLoop++) {
        if (strCatID == arrData[intLoop].SubCategoryID) {
            $("#txtGivenScore").val(arrData[intLoop].Points);
            $("#txtDefaultScore").val(arrData[intLoop].Points);
            if (arrData[intLoop].Frequency == "0") {
                $("#lblFrequency").html('');
            }
            else {
                $("#lblFrequency").html(capitalize(arrData[intLoop].Frequency));
            }

            
        }
    }
    }
}
function InsertBRPoints() {
    if (!validateEmpName()) {
        validateBrFields();
        return false;
    }
    if (validateBrFields()) {
        vrLoginEmpId = parseInt(localStorage.getItem("LoggedEmpId"));
        vrLoginEmpName = localStorage.getItem("LoggedEmpName");

        var vrCategoryID = parseInt($("#ddlCatergory").val());
        var vrCategoryName = $("#ddlCatergory option:selected").text();
        var vrSubCategoryID = parseInt($("#ddlSubCatergory").val());
        var vrSubCategoryName = $("#ddlSubCatergory option:selected").text();
        var vrDefaultScore=parseInt($("#txtDefaultScore").val()); 
        var vrBREmpPoints = parseInt($("#txtGivenScore").val());
        var vrEmpIDs = $('#ddlEmployeeName').val();
        // var vrMentorFirstName=localStorage.getItem("LoggedEmpName");
        var vrPointsGivenDate = getCurrentDate();
        var vrNotes = $('#txtBoosterNotes').val().replace(/\'/g, "''");
        var vrScoreType = parseInt($("input:radio[name=pointsTypeRadio]:checked").val());
        var EmpIds = vrEmpIDs[0];

        for (var intIndex = 1; intIndex < vrEmpIDs.length; intIndex++) {
            EmpIds = EmpIds + "," + vrEmpIDs[intIndex];
        }

        var vrEmpNames = getBrAllotedEmpNames(ddlEmployeeName, EmpIds);

        var objEmpBRScoreDetails = {
            ProjectManagerID: vrLoginEmpId,
            CategoryID: vrCategoryID,
            CategoryName: vrCategoryName,
            SubCategoryID: vrSubCategoryID,
            SubCategoryType: vrSubCategoryName,
            DefaultPoints: vrDefaultScore,
            BREmpPoints: vrBREmpPoints,
            BREmpGivenPoints: vrBREmpPoints,
            EmpIDs: EmpIds,
            MentorFirstName: vrLoginEmpName,
            PointsGivenDate: vrPointsGivenDate,
            Notes: vrNotes,
            ScoreType: vrScoreType,
            TokenID: _vrUserTokenId,
            EmpFirstName: vrEmpNames,
        }
        $("#divMainLoader").css("display", "block");
        _BaseUrl = _vrLocationOrigin + '/user/InsrtEmpBRPnts';
        ajaxCallWithOnlyObject(_BaseUrl, objEmpBRScoreDetails);
        addBoosterARooster('1');
        clearBoostaroosterFields();

    }

}

function ajaxCallWithOnlyObject(WebUrl, ObjData) {
    //$("input[type = submit]").attr("disabled", true);
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
                return false;
            }
             else if (data.ResponseId > 0) {
                $(".info").html(_vrPointsAllot);
                showStatusDiv();
                LoadBARDataToSlider();
                if ($(".clsbrPoints #idShowBARInMagnify").length != '0') {
                    loadBARData();
                }
             }
            $("input[type = submit]").attr("disabled", false);
            $("#divMainLoader").css("display", "none");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            displayError();
            $("#divMainLoader").css("display", "none");
            $(".clsSpnLoading").css("display", "none");
            //_vrCommentCreatedFlag = '';
            //_vrFunctionalityStatus = '';
            $("input[type = submit]").attr("disabled", false);

            return false;
        }
    });
}
function empPointsDetails() {
    
    $("#BtnAllotPoints").show();
    $("#divBARInnerFieldsDeatils").hide();
    $("#BtnEmpPoints").hide();
    $("#employeeDiv").show();
    _vrFlagValue = _vrFlagBrActiveEmployees;
    $('#ddlFltrEmployeeName').empty();
    $('#ddlFltrEmployeeName').append("<option value='0'>Select employee</option>");
    GetAllActiveEmployees(_vrFlagValue);
   
     BindValuesToDateFields();
   
    
    filterBrPoints(); 
}
function BindValuesToDateFields() {
    try {
     
        // intializeDatePicker();
        //Sets jquery ui date picker model for input type text contains class as "clsDatePicker."
        var dates = $("#txtBrPointsFromDate,#txtBrPointsToDate").datepicker({
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
                if ($.trim($("#txtBrPointsFromDate").val()).length > 0) {

                    for (var i = 0; i < dates.length; ++i) {
                        if (dates[i].id > this.id)
                            $(dates[i]).datepicker('option', 'minDate', date);
                    }
                }

            }
        });
        /*chaged on 21/02/2015*/
        var d = new Date();
        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        var startDate = new Date(currYear, currMonth, 1);
        $('#txtBrPointsToDate').datepicker('option', 'minDate', startDate);
        $('.ui-datepicker-current').hide();
        $("#txtBrPointsToDate").datepicker("setDate", d);

        $("#txtBrPointsFromDate").datepicker("setDate", startDate);

        //$('#txtBrPointsToDate').datepicker('option', 'minDate', "-30d");
        //$('.ui-datepicker-current').hide();

        //$("#txtBrPointsToDate").datepicker("setDate", new Date());
        //$("#txtBrPointsFromDate").datepicker("setDate", -30);
        
    } catch (e) {

    }
    
}

function LoadDataToBARControls() {
    //$("#ddlBRMonth").empty();
    $("#ddlBRYear").empty();
    var todayDate = new Date();
    var vrFullyear='',vrMonth='';
    if(_varcheckDragDropBAR==0){
        vrFullyear = todayDate.getFullYear();
        _selYearInBAR=vrFullyear;
        vrMonth = DoubleDigit(todayDate.getMonth() + 1);
        _selMonthInBAR=vrMonth;
    }
    var vryear = new Date();
    var year = vryear.getFullYear();
    for (var varYear = -2; varYear < 1; varYear++) {
        $("#ddlBRYear").append("<option value=" + (year + parseInt(varYear)) + ">" + (year + parseInt(varYear)) + "</option>");

    }
    $("#ddlBRYear").val(_selYearInBAR);
    loadMonthsData();
    $("#lblMonth").text("Data shown is of :");
    $("#ddlBRMonth").val(_selMonthInBAR); 
    $("#ddlBRYear").val(_selYearInBAR);
    $("#ddlBRYear").attr("title", _selYearInBAR);
    $("#btnBRFilter").attr("disabled", false);
   // $("#idBARLoading").css("display", "none");
    $("#divMainLoader").css("display", "none");
    
}
function filterBrPoints() {
    $("#divMainLoader").css("display", "inline");
    vrEmpID = parseInt($('#ddlFltrEmployeeName').val());
    if (vrEmpID == '0') {
        //vrEmpID = '0';
        vrEmpSelect = false;
    }
    else {
        vrEmpSelect = true;
    }
   
    _vrBrFromDate = $("#txtBrPointsFromDate").val();
    _vrBrToDate = $("#txtBrPointsToDate").val();
    if ($.trim(_vrBrFromDate).length == 0 && $.trim(_vrBrToDate).length == 0) {
        _vrFilterDates = false;
    }
    else {
        var vrArrFromDate = _vrBrFromDate.split("/");
        var vrArrToDate = _vrBrToDate.split("/");
        _vrBrFromDate = vrArrFromDate[2] + "-" + vrArrFromDate[1] + "-" + vrArrFromDate[0];
        _vrBugTrToDate = vrArrToDate[2] + "-" + vrArrToDate[1] + "-" + vrArrToDate[0];
        _vrFilterDates = true;
    }
    _BaseUrl = _vrLocationOrigin + '/user/GetBREmpData?blnEmp=' + vrEmpSelect + '&&strEmpID=' + vrEmpID + '&&strStartDate=' + _vrBrFromDate + '&&strEndDate=' + _vrBugTrToDate + '&&strTokenID=' + _vrUserTokenId;
 
    ajaxCall(_BaseUrl, bindBoosterData);
}

function loadBARData() {
  
    if (_selYearInBAR == new Date().getFullYear()) {
        if (_selMonthInBAR > new Date().getMonth() + 1) {
            _selMonthInBAR = new Date().getMonth() + 1;
        }
    }
    var getDays = new Date(_selYearInBAR, _selMonthInBAR, 1, -1).getDate();
    //vrFullyear = todayDate.getFullYear();
    var vrStartDate = _selYearInBAR + "-" + _selMonthInBAR + "-1";
    var vrEndDate = _selYearInBAR + "-" + _selMonthInBAR + "-" + getDays;
    _BaseUrl = _vrLocationOrigin + '/User/GetEmpMonthBRData?strFirstDate=' + vrStartDate + '&strLastDate=' + vrEndDate + '&strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, getBRPoints);
  

}
function bindBoosterData(sourceGrid) {
   
   
    var result = '';
  
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
        _vrBrPointsData = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrBrDataFields,
            localdata: result,
            pagesize: _vrDefaultBARSizer,
            // pagesizeoptions: "2",
        };
        if (_vrFlagBrClick == 1) {
            $("#jqxgridBrpoints").jqxGrid(
           {
               width: _vrProjectsMagTasksWidth,
               source: _vrBrPointsData,
               
               sortable: true,
               pageable: true,
               pagerbuttonscount: 3,
               autoheight: true,
               enabletooltips: true,
               pagermode: 'simple',
               filterable: true,
               autosavestate: true,
               autoloadstate: true,
               columns: _vrEmpBrPointsColumns,
               columnsresize: true
           });
            disableJqxPagerButtonsOnLoad('jqxgridBrpoints');
            $("#jqxgridBrpoints").on("pagechanged", function (event) {
                disableEnablePagingButtons("jqxgridBrpoints", event);
            });
            _vrFlagBrClick = '0';
            
        }
        else {
            $('#jqxgridBrpoints').jqxGrid({ source: _vrBrPointsData });
            disableJqxPagerButtonsOnLoad('jqxgridBrpoints');
            $("#jqxgridBrpoints").on("pagechanged", function (event) {
                disableEnablePagingButtons("jqxgridBrpoints", event);
            });
        }
        $("#divMainLoader").css("display", "none");
       

}
var linkrenderer_booster = function (row, column, value) {
    return Pointsrenderer('jqxgridBrpoints', row, column, value);
}

function Pointsrenderer(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            _Brpointstype = JSON.stringify(rowdata['BREmpPointsType']).toString();
             _BrPositive = JSON.stringify(rowdata['BREmpPstvPoints']).toString();
             _BrNegative = JSON.stringify(rowdata['BREmpNgtvPoints']).toString();
            if (parseInt(_Brpointstype) == 0) {
                return "<div class='pointsclass' title='"+_BrNegative+"'>" + _BrNegative + "</div>";
            }
            else {
                return "<div class='pointsclass' title='" + _BrPositive + "'>" + _BrPositive + "</div>";//JSON.stringify(rowdata
            }

        }
    } catch (e) {

    }
}
var linkrender_delete = function (row, column, value) {
    return deleteRowrenderer('jqxgridBrpoints', row, column, value);
}

function deleteRowrenderer(jqxGridID, row, column, value) {
    var vrRecordId = "";
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata.RecordCount != 0) {
        vrRecordId = (rowdata['BRID']).toString();

    }
    return "<img title='delete' src='img/trash.png ' class='clsbrPointimginner' onclick='delteBrPoint(" + parseInt(vrRecordId) + "," + row + ")'/>";//_TaskId + "</a>";

}
//function delteBrPoint(vrRecordId,row) {
//   var id = $("#jqxgridBrpoints").jqxGrid('getrowid', row);
//    _BaseUrl = _vrLocationOrigin + '/user/DeleteEmpBRpoints?intEmpBRID=' + vrRecordId + '&&strTokenID=' + _vrUserTokenId;
//    ajaxCall(_BaseUrl, DeleteData);
//    $('#jqxgridBrpoints').jqxGrid('deleterow', id);

//}
function delteBrPoint(vrRecordId, row) {
    $("#btnSubmitDelete").css("display", "block");
   
    _vrDeleteBRRecId = vrRecordId;
    _vrDeleteRowIndex = row;
    displayMessage(_vrAlert, _vrDeleteMsg);
    $("#btnSubmitDelete").click(function () {
        var vrRowid = $("#jqxgridBrpoints").jqxGrid('getrowid', _vrDeleteRowIndex);
        _BaseUrl = _vrLocationOrigin + '/user/DeleteEmpBRpoints?intEmpBRID=' + _vrDeleteBRRecId + '&&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, DeleteData);
        $('#jqxgridBrpoints').jqxGrid('deleterow', vrRowid);
        $("#divUnderDevelopment").dialog('close');
    });

}
function DeleteData(sourceGrid) {
    var temp = 1;
    $(".info").html(_vrBRDeleteStatus);
    showStatusDiv();
   loadBARData();
}

function validateBrFields(){
        $(".clsnewBoostermandatory").each(function (index) {
            if ($.trim($(this).val()) == 0) {
                $(this).addClass('error');
            }
        });
        if ($('.error').length > 0) {
            $("#BRErrorDiv").css("display", "inline");
            //$("#mandatoryCheckUserEmailExist").css("display", "none");
            return false;
        }
        else {
            $("#BRErrorDiv").css("display", "none");
            return true;
        }

    
}
function validateEmpName() {
    var vrEmpIDs = $('#ddlEmployeeName').val();
    if (vrEmpIDs==null) {
        $(".clsBoosterData").find(".chosen-choices").addClass("error");
    }
    else {
        $(".clsBoosterData").find(".chosen-choices").removeClass("error");
    }
    if ($('.error').length > 0) {
        $("#BRErrorDiv").css("display", "inline");
        //$("#mandatoryCheckUserEmailExist").css("display", "none");
        return false;
    }
    else {
        $("#BRErrorDiv").css("display", "none");
        return true;
    }
}
function showbrEmpgraph() {
   // $("#btnImgBAR").click();
    $('#MagnifierDialog').dialog('option', 'title', _BARTitle);
    $('#MagnifierDialog').dialog('open');
    $("#divMainLoader").css("display", "none");
    $("#idBARLoading").css("display", "inline");

    if (typeof $("#idShowBARInMagnify").html() == 'undefined') {
        $('#MagnifierDialog').html(_vrHTMLBRWidget);
    } else {
        $('#MagnifierDialog').append($("#idShowBARInMagnify"));
    }
    //$("#MagnifierDialog #idShowBARInMagnify").css("height","420px");
    _vrSetWidthOfGraph = 1080;
    _vrSetHeightOfGraph = 400;
    LoadDataToBARControls();
    loadBARData();
}
function clearBoostaroosterFields() {
   $('#ddlEmployeeName').empty().trigger('chosen:updated');
    $("input:radio[name=pointsTypeRadio]").prop('checked', false);
    $(".clsbrtxtfields").val('');
    $("#lblFrequency").html('');
    $('#ddlCatergory').empty();
    $('#ddlCatergory').append("<option value='0'>Select category</option>");
    $('#ddlSubCatergory').empty();
    $("#ddlSubCatergory").append("<option value='0'>Select subcategory</option>");
    GetAllActiveEmployees(_vrFlagActiveEmployees);
    $(".clsBoosterData").find(".chosen-choices").removeClass("error");
    $(".clsnewBoostermandatory").removeClass("error");
    $(".clsnewBoostermandatory").each(function (index) {
        $(this).removeClass('error');
    });
    $(".chosen-choices").each(function (index) {
        $(this).removeClass('error');
    });
    $("#BRErrorDiv").css("display", "none");
    $('#ddlFltrEmployeeName').empty();
    $('#ddlFltrEmployeeName').append("<option value='0'>Select employee</option>");

}
function LoadBARDataToSlider() {
    _BaseUrl = _vrLocationOrigin + '/mobile/GetEmpMonthBRData?intEmpID=' + _EmpId + '&strTokenID=' + _vrUserTokenId + '';
    ajaxCall(_BaseUrl, SetBARDataToSliderLabel);
}
function SetBARDataToSliderLabel(data) {
    if ($.trim(data).length == 0) {
        return;
    }
    if (parseInt(data[0].HighestTotalPoints) > parseInt(data[1].HighestTotalPoints)) {
        $("#lblHdrYourScore").text(data[0].HighestTotalPoints);
        $("#lblHdrHighest").text(data[0].HighestTotalPoints);
    }
    else {
        $("#lblHdrYourScore").text(data[0].HighestTotalPoints);
        $("#lblHdrHighest").text(data[1].HighestTotalPoints);
    }
}

function getBrAllotedEmpNames(ddlMember, vrArrIdsToFetch) {
    var arrInformTo = vrArrIdsToFetch.split(',');
    var vrTextInformed = '';
    for (var i = 0; i < arrInformTo.length; i++) {
        if (arrInformTo[0].length > 0) {
            try {
                vrTextInformed += $("#ddlEmployeeName option[value=" + arrInformTo[i] + "]").html() + ', ';
            } catch (e) {

            }
        }
    }
    return vrTextInformed.substr(0, vrTextInformed.length - 2);
}

function loadMonthsData() {
    var monthName = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    var vrMonth = DoubleDigit(new Date().getMonth() + 1);
    if ($("#ddlBRYear").val() < new Date().getFullYear()) {
        $("#ddlBRMonth").empty();
        for (var varMonth = 1; varMonth < monthName.length; varMonth++) {
            $("#ddlBRMonth").append("<option value=" + varMonth + ">" + monthName[varMonth] + "</option>");
        }
    }
    else {
        vrCurSelmonth = $("#ddlBRMonth").val();
        $("#ddlBRMonth").empty();
        for (var varMonth = 1; varMonth <= vrMonth; varMonth++) {
            $("#ddlBRMonth").append("<option value=" + varMonth + ">" + monthName[varMonth] + "</option>");
        }
        if (vrCurSelmonth >= vrMonth) {
            vrCurSelmonth = vrMonth;
            $("#ddlBRMonth").val(vrCurSelmonth);
        }
    }
    $("#ddlBRMonth").attr("title", monthName[vrCurSelmonth]);

}


function capitalize(value) {
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
    }

function showBAREmpgraph()   // value="B-A-R Graph"
{
    _varcheckDragDropBAR = '0';
    showbrEmpgraph();
}


function refreshBoosterGraph() {
    $("#idBARLoading").css("display","block");
    _varcheckDragDropBAR = 0;
    LoadDataToBARControls();
    loadBARData();
}