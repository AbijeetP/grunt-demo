$(document).ready(function () {

    //$("#jqxgrid").jqxGrid(
    // {
    //     source: dataAdapter,
    //     rowdetails: true,
    //     filterable: true, //Allows to filter function for the data.
    //     sortable: true, //sort The data.if required.
    //     initrowdetails: initrowdetails,
    //     rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true },
    //     ready: function () {
    //         $("#jqxgrid").jqxGrid('showrowdetails', 1);
    //     },
    //     autoheight: true, //Sets the total height of the grid.
    //     autorowheight: true, //Sets the row height automatically.
    //     pageable: _boolOuterPage,
    //     pagesizeoptions: ['50', '70', '100'],
    //     //method to stop the enter event and act as normal.                
    //     columns: _Column
    // });
});
function LoadNewProcDialog() { //Function to load a new policy
    try{
    $("#divMainLoader").css("display", "block");
    ResetProcsFields();

    $('#dailog').dialog('option', 'title', _vrAddProcHdr);
    _vrDialogBoxTitle = _vrAddProcHdr;
    $(".clsdailogfields").css("display", "none");
    $("#idShowNewPolicy").css("display", "inline-block");
    // $('#dailog').dialog('open');
    $('#dailog').dialog('open');
   $("#divMainLoader").css("display", "none");
    }catch (e) {

    }
}

function ResetProcsFields() {
    $('.clsclearnewpolicyfields').val('');
}

function SubmitSavePolicy() {
    if (validateNewPolicyFields()) {

    }
}
function CancelNewPolicy() {
    $('#btnCloseNewPolicy').dialog('close');
}

function validateNewPolicyFields() {
    $(".clsnewpolicymandatory").each(function (index) {
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass('error');
        }
    });
    if ($('.error').length > 0) {
        $("#mandatoryPolicyReqField").css("display", "inline");
        return false;
    }
    else {
        $("#mandatoryPolicyReqField").css("display", "none");
        return true;
    }

}
function LoadProcsNTemlate(drpdownvalue) {
    //For Template
    if (_ProcAndTemplate == "1") {
        _dbURL = "/WebstationDBConnector.asmx/GetTemplateHistoryDetails";
        _insertHeading = "Add new template";
        _editHeading = "Edit template";
    }
        //For Policy
    else if (_ProcAndTemplate == "2") {

        _dbURL = "/WebstationDBConnector.asmx/GetPolicyHistoryDetails";
        _insertHeading = "Add new policy";
        _editHeading = "Edit policy";
    }
        //Done by Aslam...Task id:3513
        //For Standards
    else if (_ProcAndTemplate == "3") {

        _dbURL = "/WebstationDBConnector.asmx/GetStandardsHistoryDetails";
        _insertHeading = "Add new standards";
        _editHeading = "Edit standards";
        // return;
    }

}