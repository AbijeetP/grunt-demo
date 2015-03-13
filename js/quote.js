$(document).ready(function () {
    $("#txtQuoteDate").css("width", "195px").attr("disabled", true);
    $("#lblTestingQuote").text(_vrTestingQuote + _vrCalType);
    $("#lblDocumentationQuote").text(_vrDocumentationQuote + _vrCalType);
    $("#lblSupportQuote").text(_vrSupQuote + _vrCalType);
    $("#lblDeployQuote").text(_vrDepQuote + _vrCalType);

    $("#btnAddRowQuote").click(function () {
        $("#jqxQuoteGrid").jqxGrid('addrow', null, {});
		var rowscount = $("#jqxQuoteGrid").jqxGrid('getdatainformation').rowscount;
        var newrowId = rowscount - 1;
        $("#jqxQuoteGrid").jqxGrid('setcellvalue', newrowId, "TaskCategoryType", "Feature addition/development");
        $("#jqxQuoteGrid").jqxGrid('setcellvalue', newrowId, "IsTaskCreated", true);
        //solved a issue which was creating destroying the structure of the grid.
        $("#jqxQuoteGrid").jqxGrid('refreshData');
    });

    $("#btnDeleteRowQuote").on('click', function () {
        var selectedrowindex = $("#jqxQuoteGrid").jqxGrid('getselectedrowindex');
        var rowscount = $("#jqxQuoteGrid").jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $("#jqxQuoteGrid").jqxGrid('getrowid', selectedrowindex);
            var vrRowdata = $('#jqxQuoteGrid').jqxGrid('getrowdata', id);
            var commit = $("#jqxQuoteGrid").jqxGrid('deleterow', id);
            
            var vrQuoteVal = vrRowdata.QuoteDetailsID;
            if (parseInt(vrQuoteVal)>0) {
            _BaseUrl = _vrLocationOrigin + '/Customer/DeleteQuoteHistoryDetails?intQuoteDetailsID=' + vrQuoteVal + '&strTokenID=' + _vrUserTokenId;
            ajaxCallBindDropDown(_BaseUrl, deleteSelQuoteRec);
        }
        }
        //Customer/DeleteQuoteHistoryDetails/ intQuoteDetailsID, string strTokenID
        //$('#jqxQuoteGrid').jqxGrid('selectrow', id);
    });
    $("#jqxQuoteGrid").bind('cellendedit', function (event) {
        var vrTtlPercent = parseInt(_vrTestingQuote) + parseInt(_vrDocumentationQuote) + parseInt(_vrSupQuote) + parseInt(_vrDepQuote);
        var vrDevPercent = _vrTotalPercent-vrTtlPercent;
        var args = event.args;
        var columnDataField = args.datafield;
        var rowIndex = args.rowindex;
        var cellValue = args.value;
        var oldValue = args.oldvalue;
        //if (parseFloat(cellValue) > 0) {
        //    cellValue = (cellValue / vrDevPercent);
        //}
        if (_vrQuoteCellValue == columnDataField) {
            //cellValue = displayFormat(cellValue);
            var vrTestValRes = (cellValue * (_vrTestingQuote / _vrTotalPercent));
            var vrDocRes = (cellValue * (_vrDocumentationQuote / _vrTotalPercent));
            var vrDepRes=(cellValue * (_vrDepQuote/ _vrTotalPercent));
            var vrSupRes=(cellValue * (_vrSupQuote / _vrTotalPercent));
            var vrTtlValue = parseFloat(cellValue) + parseFloat(vrTestValRes) + parseFloat(vrDocRes) + parseFloat(vrDepRes) + parseFloat(vrSupRes);
         
            $("#jqxQuoteGrid").jqxGrid('setcellvalue', rowIndex, "Testing", vrTestValRes);
            $("#jqxQuoteGrid").jqxGrid('setcellvalue', rowIndex, "Documentation", vrDocRes);
            $("#jqxQuoteGrid").jqxGrid('setcellvalue', rowIndex, "Deployment", vrDepRes);
            $("#jqxQuoteGrid").jqxGrid('setcellvalue', rowIndex, "Support", vrSupRes);

            $("#jqxQuoteGrid").jqxGrid('setcellvalue', rowIndex, "TotalHours", (vrTtlValue));
            var vrTotalHours = $("#jqxQuoteGrid").jqxGrid('getcolumnaggregateddata', 'TotalHours', ['sum']).sum;
            $("#lblTtlHrsExt").text(displayFormat(vrTotalHours));
        }
    });
    $("#ddlQuoteClientName").change(function () {
        $("#ddlQuoteProjectName").attr("disabled", false);

        var vrDdlQuoteCustomerVal = $("#ddlQuoteClientName").val();
        if (vrDdlQuoteCustomerVal != 0) {
            _BaseUrl = _vrLocationOrigin + '/project/GetProjectNames?intID=' + vrDdlQuoteCustomerVal + '&strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
            ajaxCallBindDropDown(_BaseUrl, bindQuoteProjectDdl);

        } else {
            $("#ddlQuoteProjectName").empty();
            $("#ddlQuoteProjectName").append("<option value='0'>Select project</option>");
            $("#ddlQuoteProjectName").attr("disabled", true);
        }
    });
    $(".clsquotemandatory").change(function () {
        if($.trim($(this).val())>0){
            $(this).removeClass("error");
            if ($(".error").length > 0) {
                $("#lblQuoteMandatoryError").css("display", "none");
            }
        }
    });
    $("#ddlQuoteStatus").change(function () {
        if ($("#ddlQuoteStatus").val() == _vrQuoteClienbtApprove) {
            setEditableDisable();
    }
    else{
            setEditableEnable();
}
    });

});

function deleteSelQuoteRec(data) {
    var vrSrc = data;
}

function setEditableDisable() {
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Section', 'editable', false);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'IsTaskCreated', 'editable', false);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Requirement', 'editable', false);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Comments', 'editable', false);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Category', 'editable', false);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Development', 'editable', false);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'TaskCategoryType', 'editable', false);
    $(".clsquotationfields").attr("disabled", true);
    $(".clshidequotebtns").css("display", "none");
    $(".clscreatequotefields").find(".ui-datepicker-trigger").css("display", "none");
    $("#txtQuoteDate").css("width", "195px").attr("disabled", true);
    $("#btnCreateTaskRowQuote").css("display", "inline");
}

function setEditableEnable() {
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Section', 'editable', true);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'IsTaskCreated', 'editable', true);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Requirement', 'editable', true);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Comments', 'editable', true);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Category', 'editable', true);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'Development', 'editable', true);
    $("#jqxQuoteGrid").jqxGrid('setcolumnproperty', 'TaskCategoryType', 'editable', true);
    $(".clsquotationfields").attr("disabled", false);
    $("#ddlQuoteStatus").attr("disabled", false);
    $(".clshidequotebtns").css("display", "inline");
    $("#btnCreateTaskRowQuote").css("display", "none");
    //$(".clscreatequotefields").find(".ui-datepicker-trigger").css("display", "none");
    //$("#txtQuoteDate").css("width", "173px").attr("disabled", false);
    $(".clscreatequotefields").find(".ui-datepicker-trigger").css("display", "none");
}


function createNewQuote() {
    _vrQuoteProjId = _vrDefaultQuoteId;
    _vrQuoteCustId = _vrDefaultQuoteId;
    _vrQuoteEffEst = _vrDefaultQuoteId;
    _vrQuoteRevBy = _vrDefaultQuoteId;
    _vrQuoteStatus = _vrDefaultQuoteId;
    $("#ddlQuoteProjectName").empty();
    $("#ddlQuoteProjectName").append("<option value='0'>Select project</option>");
    loadDialogFields();
    var vrSource = [];
    $("#btnSaveQuote").css("display", "inline");
    $("#btnUpdateQuote").css("display", "none");
    loadQuotationDetailsGrid(vrSource);
    $(".clsquotemandatory").removeClass("error");
    _vrQuoteTaskCreateStatus = 0;
}
function loadDialogFields() {
    _BaseUrl = _vrLocationOrigin + '/customer/GetCustomerNames?strTokenID=' + _vrUserTokenId + '&intEmpID=' + _EmpId + '&intRoleId=' + _UserRoleId;
    ajaxCallBindDropDown(_BaseUrl, bindQuoteCustDropdown);
   // getQuoteCustomers();
    _BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
    ajaxCallBindDropDown(_BaseUrl, bindActiveUsers);
    _BaseUrl = _vrLocationOrigin + '/customer/GetQuoteStatusDetails?strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindQuotationStatus);
    $('#dailog').dialog('option', 'title', _vrDialogBoxNewQuote);
    // _vrDialogBoxTitle = _vrDialogBoxNewBug;
    $(".clsdailogfields").css("display", "none");
    $("#divCreateQuote").css("display", "inline-block");
    $(".clshidequotebtns").css("display", "inline");
    $("#btnCreateTaskRowQuote").css("display","none");
    $('#dailog').dialog('open');
    $("#txtQuoteDate").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy',
        minDate: 0,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true
        //,
        //onClose: function (e) {
        //    var ev = window.event;
        //    if (ev.srcElement.innerHTML == 'Clear')
        //        this.value = "";

        //},
        //closeText: 'Clear',
        //buttonText: ''
    });
    $("#txtQuoteDate").datepicker("setDate", new Date());
    var data = [];
}

function getQuoteCustomers() {
        _BaseUrl = _vrLocationOrigin + '/Project/GetProjectData';
        var objProjectDetails = {
            ProjectName: 0,
            ProjectCustomerID: 0,
            ProjectStatusID: "0",
            ProjectID: 0,
            EmpID: _EmpId,
            RoleID: _UserRoleId,
            TokenID: _vrUserTokenId
        };
        ajaxCallWithObject(_BaseUrl, objProjectDetails, bindQuoteCustDropdown);
}
function loadQuotationDetailsGrid(data) {
    if (typeof data == 'undefined') {
        data = [];
    }
    if (data.length == 1 && data[0].QuoteDetailsID == 0) {
        data = [];
    }
    try {
    var vrQuoteData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _vrQuoteDetailsDataFields,
        localdata: data,
        pagesize: _vrDefaultCustomerSizer
    };
    //if (_vrQuoteUpdateId != _vrDefaultQuoteId) {
    //loadDialogFields();
    //}
    //if (_vrLoadQuoteDetGrid != _vrDefaultQuoteId) {
    //    $("#jqxQuoteGrid").jqxGrid({ source: vrQuoteData });
    //    $('#jqxQuoteGrid').jqxGrid('refreshaggregates');
    //    return true;
    //} 
    //if (_vrLoadQuoteDetGrid == _vrDefaultQuoteId) {
    //    _vrLoadQuoteDetGrid = _vrGridQuoteDetailsLoaded;
    //}
    // bindDataToJqx("jqxQuoteGrid", vrQuoteData, _vrQuoteColumns, _vrCustomersGridWidth);
   // $("#jqxQuoteGrid").jqxGrid('clear');
    var dataAdapter = new $.jqx.dataAdapter(vrQuoteData);
    $("#jqxQuoteGrid").jqxGrid(
 {
     width: 1035,
     source: dataAdapter,
     //selectionmode: 'multiplerowsextended',
     sortable: true,
     //  pageable: true,
     //pagerbuttonscount: 3,
     autoheight: true,
     enabletooltips: true,
     editable: true,
     columnsresize: true,
     // pagermode: 'simple',
     filterable: true,
     editable: true,
     //autosavestate: true,
     // autoloadstate: true,
     editmode: 'click',
     showaggregates: true,
     showstatusbar: true,
     statusbarheight: 25,
     columns: [// 
                 { text: 'QuoteID', columntype: 'textbox', datafield: 'QuoteID', cellsalign: 'right', width: '50px', align: 'center',hidden:true },
                 { text: 'QuoteDetailsID', columntype: 'textbox', datafield: 'QuoteDetailsID', cellsalign: 'right', width: '50px', align: 'center',hidden:true },
                 { text: 'Sl. No', columntype: 'textbox', datafield: 'SLNo', cellsalign: 'right', width: '50px', align: 'center', hidden: true },

                {
                    text: 'Tasks', columntype: 'checkbox', datafield: 'IsTaskCreated', align: 'center', cellsalign: 'right', checked: false, hasThreeStates: false, width: '40px',checked: true,createeditor: function (row, column, editor) {
                        //editor.jqxCheckBox({ checked: true });
                    },
                    //
                },
             { text: 'Section', columntype: 'textbox', datafield: 'Section', width: '65px', align: 'center' },
             { text: 'Requirement', columntype: 'textbox', datafield: 'Requirement', width: '100px', align: 'center' },
             { text: 'Comments', columntype: 'textbox', datafield: 'Comments', width: '160px', align: 'center' },
             {
                 text: 'Category', columntype: 'dropdownlist', datafield: 'TaskCategoryType', width: '180px', align: 'center', createeditor: function (row, column, editor) {
                     editor.jqxDropDownList({ autoDropDownHeight: true, source: _vrQuoteCategory, placeHolder: "Select category", promptText: "Select category",  width: 180 });
                 },
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                     var Quotecategoty = $('#jqxQuoteGrid').jqxGrid('getcellvalue', row, "TaskCategoryType");
                     if (newvalue == "") { return Quotecategoty };
                 },
             },//displayfield: 'TaskCategoryID', valuefield: 'TaskCategoryID',displayMember: 'TaskCategoryType', valueMember: 'TaskCategoryID',
             {
                 text: 'Dev', columngroup: 'Efforts(In hours)', columntype: 'textbox', datafield: 'Development', width: '80px', align: 'center', cellsalign: 'right', editable: true, columntype: 'numberinput', inputMode: 'simple', aggregates: ['sum'],
                 createeditor: function (row, cellvalue, editor) {
                     editor.jqxNumberInput({ decimalDigits: 2, digits: 8, min: 0 });
                 }, cellsrenderer: linkrenderer_timeformatForBillingReport,
                 aggregatesrenderer: function (aggregates) {
                     var renderstring = "", vrResval = 0;
                     var name = 'Total';
                     $.each(aggregates, function (key, value) {
                         vrResval += value;

                     });
                     renderstring += '<div style="position: relative; margin: 4px; overflow: hidden;">' + name + ': ' + displayFormat(vrResval) + '</div>';
                     //$("#jqxQuoteGrid").jqxGrid('setcellvalue', 0, "Phone", cellValue);
                     return renderstring;
                 }
             },
             {
                 text: 'Test', columngroup: 'Efforts(In hours)', columntype: 'textbox', datafield: 'Testing', width: '80px', align: 'center', editable: false, columntype: 'numberinput', inputMode: 'simple', aggregates: ['sum'],
                 createeditor: function (row, cellvalue, editor) {
                     editor.jqxNumberInput({ decimalDigits: 2, digits: 8, min: 0 });
                 }, cellsrenderer: linkrenderer_timeformatForBillingReport
                 ,
                 aggregatesrenderer: function (aggregates) {
                     var renderstring = "", vrResval = 0;
                     var name = 'Total';
                     $.each(aggregates, function (key, value) {
                         vrResval += value;

                     });
                     renderstring += '<div style="position: relative; margin: 4px; overflow: hidden;">' + name + ': ' + displayFormat(vrResval) + '</div>';
                     //$("#jqxQuoteGrid").jqxGrid('setcellvalue', 0, "Phone", cellValue);
                     return renderstring;
                 }
             },
             {
                 text: 'Doc', columngroup: 'Efforts(In hours)', columntype: 'textbox', datafield: 'Documentation', width: '80px', align: 'center', editable: false, columntype: 'numberinput', inputMode: 'simple', aggregates: ['sum'],
                 createeditor: function (row, cellvalue, editor) {
                     editor.jqxNumberInput({ decimalDigits: 2, digits: 8, min: 0 });
                 }, cellsrenderer: linkrenderer_timeformatForBillingReport
                 ,
                 aggregatesrenderer: function (aggregates) {
                     var renderstring = "", vrResval = 0;
                     var name = 'Total';
                     $.each(aggregates, function (key, value) {
                         vrResval += value;

                     });
                     renderstring += '<div style="position: relative; margin: 4px; overflow: hidden;">' + name + ': ' + displayFormat(vrResval) + '</div>';
                     //$("#jqxQuoteGrid").jqxGrid('setcellvalue', 0, "Phone", cellValue);
                     return renderstring;
                 }
             },
             {
                 text: 'Sup', columngroup: 'Efforts(In hours)', columntype: 'textbox', datafield: 'Support', width: '80px', align: 'center', editable: false, columntype: 'numberinput', inputMode: 'simple', aggregates: ['sum'],
                 createeditor: function (row, cellvalue, editor) {
                     editor.jqxNumberInput({ decimalDigits: 2, digits: 8, min: 0 });
                 }, cellsrenderer: linkrenderer_timeformatForBillingReport
                 ,
                 aggregatesrenderer: function (aggregates) {
                     var renderstring = "", vrResval = 0;
                     var name = 'Total';
                     $.each(aggregates, function (key, value) {
                         vrResval += value;

                     });
                     renderstring += '<div style="position: relative; margin: 4px; overflow: hidden;">' + name + ': ' + displayFormat(vrResval) + '</div>';
                     //$("#jqxQuoteGrid").jqxGrid('setcellvalue', 0, "Phone", cellValue);
                     return renderstring;
                 }
             },
             {
                 text: 'Dep', columngroup: 'Efforts(In hours)', columntype: 'textbox', datafield: 'Deployment', width: '80px', align: 'center', editable: false, columntype: 'numberinput', inputMode: 'simple', aggregates: ['sum'],
                 createeditor: function (row, cellvalue, editor) {
                     editor.jqxNumberInput({ decimalDigits: 2, digits: 8, min: 0 });
                 }, cellsrenderer: linkrenderer_timeformatForBillingReport
                 ,
                 aggregatesrenderer: function (aggregates) {
                     var renderstring = "", vrResval = 0;
                     var name = 'Total';
                     $.each(aggregates, function (key, value) {
                         vrResval += value;

                     });
                     renderstring += '<div style="position: relative; margin: 4px; overflow: hidden;">' + name + ': ' + displayFormat(vrResval) + '</div>';
                     //$("#jqxQuoteGrid").jqxGrid('setcellvalue', 0, "Phone", cellValue);
                     return renderstring;
                 }
             },
             {
                 text: 'Hours per task', columntype: 'textbox', datafield: 'TotalHours', width: '90px', align: 'center', editable: false, columntype: 'numberinput', inputMode: 'simple', aggregates: ['sum'],
                 createeditor: function (row, cellvalue, editor) {
                     editor.jqxNumberInput({ decimalDigits: 2, digits: 8, min: 0 });
                 }, cellsrenderer: linkrenderer_timeformatForBillingReport
                 ,
                 aggregatesrenderer: function (aggregates) {
                     var renderstring = "", vrResval = 0;
                     var name = 'Total';
                     $.each(aggregates, function (key, value) {
                         vrResval += value;

                     });
                     renderstring += '<div style="position: relative; margin: 4px; overflow: hidden;">' + name + ': ' + displayFormat(vrResval) + '</div>';
                     //$("#jqxQuoteGrid").jqxGrid('setcellvalue', 0, "Phone", cellValue);
                     return renderstring;
                 }
             }
     ],
     columngroups: [
              { text: 'Efforts(In hours)', align: 'center', name: 'Efforts(In hours)', align: 'center' }

     ]
 });
    
    // $('#jqxQuoteGrid').jqxGrid('refreshaggregates');
    var vrQuoteTotalHours = $("#jqxQuoteGrid").jqxGrid('getcolumnaggregateddata', 'TotalHours', ['sum']).sum;
    $("#lblTtlHrsExt").text(displayFormat(vrQuoteTotalHours));
    $("#divMainLoader").css("display", "none");
    } catch (e) {
        $("#divMainLoader").css("display", "none");
    }
}
function bindQuoteCustDropdown(data) {
    $("#ddlQuoteClientName").empty();
    $("#ddlQuoteProjectName").empty();
    $("#ddlQuoteProjectName").append("<option value='0'>Select project</option>");
    var source = data;
    
    $("#ddlQuoteClientName").append("<option value='0'>Select customer</option>");
    bindDataToDropDown(data, 'ddlQuoteClientName', 'CustomerID', 'CustomerCompanyName');
    setTimeout(function () {
        if (!isNaN(checkDropdownValues("ddlQuoteClientName", _vrQuoteCustId))) {
            $("#ddlQuoteClientName").val(_vrQuoteCustId);
            if (_vrQuoteCustId != _vrDefaultQuoteId) {
                $("#ddlQuoteClientName").change();
            }
        }
    }, _vrQuoteCustomerInterval);
   
 
}
function bindQuoteProjectDdl(data) {
    $("#ddlQuoteProjectName").empty();
    var source = data;
    $("#ddlQuoteProjectName").append("<option value='0'>Select project</option>");
    if(typeof data != 'undefined'){
    bindDataToDropDown(data, 'ddlQuoteProjectName', 'ProjectID', 'ProjectName');
    if (!isNaN(checkDropdownValues("ddlQuoteProjectName",_vrQuoteProjId))) {
        $("#ddlQuoteProjectName").val(_vrQuoteProjId);
    }
}
}

function bindActiveUsers(data) {
    var source = data;
    $("#ddlQuoteEffEstimated").empty();
    $("#ddlQuoteReviewedBy").empty();
    $("#ddlQuoteEffEstimated").append("<option value='0'>Select estimated by </option>");
    bindDataToDropDown(data, 'ddlQuoteEffEstimated', 'EmpID', 'EmpFirstName');
    $("#ddlQuoteReviewedBy").append("<option value='0'>Select reviewed by</option>");
    bindDataToDropDown(data, 'ddlQuoteReviewedBy', 'EmpID', 'EmpFirstName');
    if (!isNaN(checkDropdownValues("ddlQuoteEffEstimated",_vrQuoteEffEst))) {
        $("#ddlQuoteEffEstimated").val(_vrQuoteEffEst);
    }
    if (!isNaN(checkDropdownValues("ddlQuoteReviewedBy",_vrQuoteRevBy))) {
        $("#ddlQuoteReviewedBy").val(_vrQuoteRevBy);
    }
}
function bindQuotationStatus(data) {
    try {
    var source = data;
    $("#ddlQuoteStatus").empty();
    $("#ddlQuoteStatus").append("<option value='0'>Select status </option>");
    bindDataToDropDown(data, 'ddlQuoteStatus', 'StatusID', 'StatusType');
    $("#ddlQuoteStatus").val(_vrQuoteStatus);
    if (_vrQuoteClienbtApprove == _vrQuoteStatus) {
        $(".clsquotationfields").attr("disabled", true);
        $(".clshideinsertdatabtns").css("display", "none");
        $("#ddlQuoteStatus").attr("disabled", true);
        $(".clshidequotebtns").css("display", "none");
        $("#btnCreateTaskRowQuote").css("display", "inline");
        setEditableDisable();
    }
    if (_vrQuoteTaskCreateStatus != 0) {
        $("#btnCreateTaskRowQuote").css("display","none");
    }
    } catch (e) {

    }
}
function updateQuotation() {
    _vrQuoteRecStatus = _vrQuoteUpd;
    saveQuotation(_vrQuoteUpdateId);
}
function saveQuotation(valId) {
    var vrQuoteData = [], vrTxtQuoteDate = '', vrQuotationId = 0;
    if(!validateQuoteMandatory()){
        return false;
    }
    var rows = $("#jqxQuoteGrid").jqxGrid('getrows');
    for (var vrLoop = 0; vrLoop < rows.length; vrLoop++) {
        //var vrSource = $('#jqxQuoteGrid').jqxGrid('getrowdata', vrLoop);
        vrQuoteData.push($('#jqxQuoteGrid').jqxGrid('getrowdata', vrLoop));
        if ($.trim(vrQuoteData[vrLoop].TaskCategoryType) == "Bug on Production") {
            vrQuoteData[vrLoop].Category =2 ;
        } else if ($.trim(vrQuoteData[vrLoop].TaskCategoryType) == "Coding") {
            vrQuoteData[vrLoop].Category =3 ;
        } else if ($.trim(vrQuoteData[vrLoop].TaskCategoryType) == "Documentation") {
            vrQuoteData[vrLoop].Category =5 ;
        } else if ($.trim(vrQuoteData[vrLoop].TaskCategoryType) == "Feature addition/development") {
            vrQuoteData[vrLoop].Category =1 ;
        } else if ($.trim(vrQuoteData[vrLoop].TaskCategoryType) == "Independent Testing") {
            vrQuoteData[vrLoop].Category = 4;
        } else {
            vrQuoteData[vrLoop].Category = 6;
        }
        
      
    }
    vrQuotationId = valId;
    var vrCustomerId = $("#ddlQuoteClientName").val();
    var vrProjectId = $("#ddlQuoteProjectName").val();
    var vrQuoteEffEstimatedBy = $("#ddlQuoteEffEstimated").val();
    var vrQuoteReviewedBy = $("#ddlQuoteReviewedBy").val();
   
    var vrQuoteStatus = $("#ddlQuoteStatus").val();
    var vrTxtQuotedFormatDate = $("#txtQuoteDate").val();
    if ($.trim(vrTxtQuotedFormatDate).length > 0) {
        var vrTxtSplitQuoteDate = vrTxtQuotedFormatDate.split("/");
        vrTxtQuoteDate = vrTxtSplitQuoteDate[2] + "-" + vrTxtSplitQuoteDate[1] + "-" + vrTxtSplitQuoteDate[0];
    }
    $("#divMainLoader").css("display","block");
    var objQuoteDetails = {
        QuoteID: vrQuotationId,
        CustomerID: vrCustomerId,
        ProjectID: vrProjectId,
        Date: vrTxtQuoteDate,
        EffortsEstimatedBy:vrQuoteEffEstimatedBy,
        EffortsReviewedBy:vrQuoteReviewedBy,
        QuoteStatus: vrQuoteStatus,
        QuoteHistoryDetails: vrQuoteData,
        TokenID: _vrUserTokenId
    }
    _BaseUrl = _vrLocationOrigin + '/customer/InsertQuoteDetails';
    ajaxCallWithObject(_BaseUrl, objQuoteDetails, reloadQuotations);
}
function reloadQuotations(data) {
    $('#dailog').dialog('close');
    var source = data;
    loadQuotationFields();
    $("#divMainLoader").css("display", "none");
    if(data.ResponseId > 0){
        $(".info").html(_vrQuoteRecStatus);
        showStatusDiv();
        _vrQuoteRecStatus = _vrQuoteSucc;
}

}

//Calls up on adding widget.
function loadQuotationFields() {
    $("#divQuotationLoader").css("display","block");
    _BaseUrl = _vrLocationOrigin + '/customer/GetQuoteStatusDetails?strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, bindQuotationWidgetStatus);
    _BaseUrl = _vrLocationOrigin + '/customer/GetQuoteDetails?strTokenID=' + _vrUserTokenId + '&intQuoteID=' + _vrDefaultQuoteId + '&intRoleID=' + _UserRoleId + '&intCustomerEmpID='+_EmpId;

    ajaxCall(_BaseUrl, bindDataToQuoteGrid);
}
function bindQuotationWidgetStatus(data) {
    try {
    var source = data;
    $("#ddlWidgetQuoteStatus").empty();
    $("#ddlWidgetQuoteStatus").append("<option value='0'>Select status </option>");
    bindDataToDropDown(data, 'ddlWidgetQuoteStatus', 'StatusID', 'StatusType');
    if (_QuoteIndexNO > -1) {
        if (Object.keys(_vrWidgetCOntrolData[_QuoteIndexNO]).length > 0) {
            $("#ddlWidgetQuoteStatus").val(_vrWidgetCOntrolData[_QuoteIndexNO].ddlWidgetQuoteStatus);
        }
    }
    } catch (e) {

    }
}
function bindDataToQuoteGrid(data) {
    var source = data;
    if(typeof source == 'undefined'){
        source = [];
    }
    //jqxQuotationGrid
    _vrQuoteData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _vrQuoteDataFields,
        localdata: source
    };
    bindDataToJqx("jqxQuotationGrid", _vrQuoteData, _vrQuoteWidgetColumns, _vrProjectsGridWidth);   
    if (_QuoteIndexNO > -1) {//CHECK AND FILTER THE DATA
        if (Object.keys(_vrWidgetCOntrolData[_QuoteIndexNO]).length > 0) {
            $("#ddlWidgetQuoteStatus").val(_vrWidgetCOntrolData[_QuoteIndexNO].ddlWidgetQuoteStatus);
            filterBasedOnQuoteStatus();
        }
    }
    $("#divQuotationLoader").css("display", "none");
    $("#imgQuotationMagnify").attr("disabled", false);
}
function getDataToEdit(source) {
    var data = source;
    if (typeof data != 'undefined') {
        
        //$("#txtQuoteDate").
        _vrQuoteCustId = data[0].CustomerID;
        _vrQuoteEffEst = data[0].EffortsEstimatedBy;
        _vrQuoteRevBy = data[0].EffortsReviewedBy;
        _vrQuoteStatus = data[0].QuoteStatus;
        _vrQuoteProjId = data[0].ProjectID;
        _vrQuoteTaskCreateStatus = data[0].QuoteTaskStatus;
        var vrQuotationRecDate = data[0].Date.split(" ");
        $("#txtQuoteDate").val(vrQuotationRecDate[0]);
       // $('#txtQuoteDate').datepicker('option', 'dateFormat', 'dd/mm/yy');
    }
    $('#dailog').dialog('option', 'title', _vrDialogBoxNewQuote);
    // _vrDialogBoxTitle = _vrDialogBoxNewBug;
    $(".clsdailogfields").css("display", "none");
    $("#divCreateQuote").css("display", "inline-block");
    $('#dailog').dialog('open');
    loadQuotationDetailsGrid(data)
    $("#divQuotationLoader").css("display", "none");
    
}

//linkrenderer_QuoteId

var linkrenderer_QuoteId = function (row, column, value) {
    return linkrendercustomerquote('jqxQuotationGrid', row, column, value);
}

var linkrendercustomerquote = function (jqxGridID, row, column, value) {
    var _vrQuoteId = '';
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        _vrQuoteId = JSON.stringify(rowdata['QuoteID']).toString();

    }
    return "<div class='clstsktrltaskname clsaddellipsis'><a  href='#' onclick='quoteLink(" + _vrQuoteId + ")'>" + value + "</a></div>";
}
function quoteLink(vrVal) {
    $(".clsquotationfields").attr("disabled", false);
    $("#ddlQuoteStatus").attr("disabled",false);
    $("#divMainLoader").css("display", "block");
    $(".clsquotemandatory").removeClass("error");
     loadDialogFields();
    $("#btnSaveQuote").css("display", "none");
    $("#btnUpdateQuote").css("display","inline");
    _vrQuoteUpdateId = vrVal;
    _vrQuoteTaskCreateStatus = 0;
    _BaseUrl = _vrLocationOrigin + '/customer/GetQuoteDetails?strTokenID=' + _vrUserTokenId + '&intQuoteID=' + vrVal + '&intRoleID=' + _UserRoleId + '&intCustomerEmpID=' + _EmpId;
    ajaxCall(_BaseUrl, getDataToEdit);
   // loadDialogFields();
    event.preventDefault();
    
}

function refreshQuotationGrid() {
    _BaseUrl = _vrLocationOrigin + '/customer/GetQuoteDetails?strTokenID=' + _vrUserTokenId + '&intQuoteID=' + _vrDefaultQuoteId + '&intRoleID=' + _UserRoleId + '&intCustomerEmpID=' + _EmpId;
    ajaxCall(_BaseUrl, bindDataToQuoteGrid);
}
function filterBasedOnQuoteStatus() {
    var vrQuoteStatusSel = $("#ddlWidgetQuoteStatus option:selected").text();
    var vrDynQuoteData = _vrQuoteData;
    //if ($.trim(_vrQuoteData.localdata).length == 0 ) {
    //    vrDynQuoteData.localdata = [];
    //}
    var vrDynQuoteLocalData = _vrQuoteData.localdata;
    var vrFilteredData = [];
    if ($("#ddlWidgetQuoteStatus").val() != '0') {
        vrFilteredData = jQuery.grep(vrDynQuoteLocalData, function (element, index) {
            return element.StatusType == vrQuoteStatusSel; // retain appropriate elements
        });
    } else {
        vrFilteredData = _vrQuoteData.localdata;
    }
    vrDynQuoteData.localdata = vrFilteredData;
    $("#jqxQuotationGrid").jqxGrid({ source: vrDynQuoteData });
    _vrQuoteData.localdata = vrDynQuoteLocalData;
    disableJqxPagerButtonsOnLoad('jqxQuotationGrid');
    $("#divQuotationLoader").css("display", "none");
    if (_QuoteIndexNO > -1) {
        _QuoteIndexNO = -1;
    }
}

function validateQuoteMandatory() {
    $(".clsquotemandatory").each(function () {
        if ($.trim($(this).val()) == 0) {
            $(this).addClass("error");
        }
    });
    if ($(".error").length > 0) {
        $("#lblQuoteMandatoryError").css("display", "block");
        return false;
    } else {
        return true;
    }
}

function insertMultipleTask() {
    if (!validateQuoteMandatory()) {
        return false;
    }
    //var vrRowData=[];
    var vrQuoteId=0
    var vrArrTaskData = [];
    var vrQuoteCustId=$("#ddlQuoteClientName").val();
    var vrQuoteProjectId = $("#ddlQuoteProjectName").val();
    var vrArrLoggedName = $("#lblLogin").html();
    var rows = $("#jqxQuoteGrid").jqxGrid('getrows');
    for (var vrLoop = 0; vrLoop < rows.length; vrLoop++) {
        var MultiTasks = {
            TaskName: "",
            TaskDueDate: "",
            TaskDescription: "",
            AssignedTo: "",
            AnticipatedHours: "",
            InformTo: "",
            TaskReleaseVersion: "",
            ModuleName: "",
            SprintID: "",
            Comments: "",
            AttachedFiles: "",
            TaskCategoryID:""

        }
        var vrRowCat=0;
        var vrRowData = $('#jqxQuoteGrid').jqxGrid('getrowdata', vrLoop);
        if (vrRowData.IsTaskCreated == true ) {
            vrRowData = $('#jqxQuoteGrid').jqxGrid('getrowdata', vrLoop);
            MultiTasks.TaskName = vrRowData.Requirement;
            MultiTasks.TaskDueDate = "";
            MultiTasks.TaskDescription = vrRowData.Comments;
            MultiTasks.AssignedTo = 0;
            MultiTasks.AnticipatedHours = 0.0;
            MultiTasks.InformTo="";
            MultiTasks.TaskReleaseVersion="";
            MultiTasks.ModuleName = "";
            MultiTasks.SprintID = 0;
            MultiTasks.Comments = "";
            MultiTasks.AttachedFiles = "";
            if ($.trim(vrRowData.TaskCategoryType) == "Bug on Production") {
                vrRowCat = 2;
            } else if ($.trim(vrRowData.TaskCategoryType) == "Coding") {
                vrRowCat = 3;
            } else if ($.trim(vrRowData.TaskCategoryType) == "Documentation") {
                vrRowCat = 5;
            } else if ($.trim(vrRowData.TaskCategoryType) == "Feature addition/development") {
                vrRowCat = 1;
            } else if ($.trim(vrRowData.TaskCategoryType) == "Independent Testing") {
                vrRowCat = 4;
            } else {
                vrRowCat = 6;
            }
            MultiTasks.TaskCategoryID = vrRowCat;
            vrArrTaskData.push(MultiTasks);

        }
        vrQuoteId=vrRowData.QuoteID;
    }
        var objTaskDetails = {
            MultiTasks: vrArrTaskData,
            TokenID : _vrUserTokenId,
            OwnerID: _EmpId,
            CustomerID: vrQuoteCustId,
            AssignedBy: vrArrLoggedName,
            TaskProjectID: vrQuoteProjectId,
            TokenID: _vrUserTokenId,
            QuoteID: vrQuoteId
        }
        _BaseUrl = _vrLocationOrigin + "/Task/InsertMultipleTasks";
        ajaxCallWithObject(_BaseUrl, objTaskDetails, reloadQuoteTaskGrid);
}

function reloadQuoteTaskGrid(data) {
    var source = data;
    if (source.ResponseId > 0) {
        $(".info").html(_vrQuoteTaskStatus);
        showStatusDiv();
    }
}