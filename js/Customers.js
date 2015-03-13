var vrCustId = '', vrCustCompany = '', vrContactName = '', vrCmpEmailId = '', vrWebsite = '', vrCustomerProjData='',vrCustCompanyShow='';
var objCustomerDetailsMagnify = '';
var str = "";
var count = 0;
$(document).ready(function () {

    $(".gridster").on("click", "#btnRefreshCustomerGrid", function () {
        _custIndexNO = -1;
        $("#imgCustomerMagnifier").attr("disabled", true);
        $("#idCustomerLoding").css("display", "block");
        _vrSelCustomerStatus = _vrDefaultActiveStatus;//For active
        $("#idSearchCustomer").val("");
        bindCustomersDetails();
        LoadCountDataToCustUserProjSilde();
        $("#imgCustomerMagnifier").attr("disabled", false);
        $("#idCustomerLoding").css("visibility", "none");
    });
    $("#txtWebsite").blur(function () {
      var vrWebsite=  $(this).val();
      validateWebsite(vrWebsite);
    });
    $("#txtEmail").blur(function () {
        var vrEmailId = $(this).val();
        validateEmail(vrEmailId);
    });
    $("#ddlCountryList").change(function () {
        if ($.trim($("#ddlCountryList").val()).length >0 ) {
            $("#ddlCountryList").removeClass("error");
            if ($("#idShowCustomerDetails .error").length ==0) {
                $("#errNewCustomerError").css("display", "none");
            }
        }
    });
    
    $(".gridster").on("click", "#btnCustomerResetSearch", function () {
        $("#idSearchCustomer").val("");
        filterCustomersJqxGrid();
     
    });
    var Keycount = 0;
   
    var position = 0;
    $('.clsmobilevalidatefield').keypress(function (event) {
        
        if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 43 || event.keyCode == 45 || event.keyCode == 8) {
            count++;
            position = 1;
            if (count > 1) {
                if (event.keyCode == 43) {
                    return false;
                  
                }
                
            }

            if ($("#txtPhone").val().length == 1)
            {
                if (event.keyCode == 45) {
                    return false;
                }
            }

            if ($("#txtNewUserContact").val().length == 1) {
                if (event.keyCode == 45) {
                    return false;
                }
            } 
            if ($("#txtNewUserEmerContactNo").val().length == 1) {
                if (event.keyCode == 45) {
                    return false;
                }

            }
            }
            else {
                return false;
            }
        
    }); 
    $("#txtPhone").keydown(function (event) {
        
        if (event.keyCode == 8 || event.keyCode == 46) {
                 var length = $("#txtPhone").val();
                if ($("#txtPhone").val().length<=1) {
                    count = 0;
                }
            }
        
    });

    $("#txtNewUserContact").keydown(function (event) {

        if (event.keyCode == 8 || event.keyCode == 46) {
            var length = $("#txtNewUserContact").val();
            if ($("#txtNewUserContact").val().length == 1) {
                count = 0;
            }
        }

    });

      

    }); 
    $("#txtNewUserEmerContactNo").keydown(function (event) {

        if (event.keyCode == 8) {
            var length = $("#txtPhone").val();
            if ($("#txtPhone").val().length == 1) {
                count = 0;
            }
        }

    });


function bindCustomersDetails() {
    var objCustomerDetails = {
        GetStatus: false,
        Active: '',
        GetCustomerID: false,
        CustomerID: 0,
        TokenID: _vrUserTokenId
    };
    // $("#ddlCustomerProject").empty();
    if ($("#ddlCustomerProject").val() == null) {
        _BaseUrl = _vrLocationOrigin + '/User/GetActiveStatusDetails?strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBindStatusRole);
}
    _BaseUrl = _vrLocationOrigin + '/customer/getcustomerdata';
    ajaxCallWithObject(_BaseUrl, objCustomerDetails, bindCustomersData);
}
function bindCustomersData(source) {
    var data = source.MultipleResults;
    //  bindDataToJqx();
    var vrSortColumnName = '', vrSortOrder = '';
    setLocalStorageFromDialog("jqxCustomerTrial", _vrCustomersGridWidth);
    var colsort = sortingcolumns("jqxCustomerTrial");
    vrSortColumnName = colsort.vrSortColumnName;
    vrSortOrder = colsort.vrSortOrder;
    _DataFields = [
        
            { name: 'CustomerID' },
            { name: 'ContactPerson' },
            { name: 'Email' },
            { name: 'Phone' },
            { name: 'Website' },
            { name: 'Address' },
            { name: 'CustomerNotes' },
            { name: 'CustomerCountryID' },
            { name: 'Active', type: 'bool' },
            { name: 'CustomerCompanyName' }
    ];
    _vrCustomersData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _DataFields,
        localdata: data,
        pagesize: _vrDefaultCustomerSizer
    };
    
    bindDataToJqx("jqxCustomerTrial", _vrCustomersData, _vrCustColumns, _vrCustomersGridWidth);
    if (_vrSelCustomerStatus.length > 0 || _vrSelCustomerStatus == _vrSelCustomerUserStatusText) {
        if (_vrSelCustomerStatus != _vrSelCustomerUserStatusText) {
            $("#ddlCustomerProject").val(_vrSelCustomerStatus);
        } 
    } else {
        $("#ddlCustomerProject").val(_vrDefaultActiveStatus);
    }
    if (_vrWidgetCOntrolData.length > 0) {
        if (_custIndexNO > -1) {
            if (Object.keys(_vrWidgetCOntrolData[_custIndexNO]).length > 0) {
                $("#ddlUserstatus").val(_vrWidgetCOntrolData[_custIndexNO].ddlUserstatus);
                $("#txtUserSearch").val(_vrWidgetCOntrolData[_custIndexNO].txtUserSearch);
               
            }
        }
    }
    filterCustomersJqxGrid();
    CheckBrowserNAddCSS();
    LoadPageNumForCustomer();
    $("#imgCustomerMagnifier").attr("disabled", false);
    $("#idCustomerLoding").css("display", "none");
    setRecordCountPosition("jqxCustomerTrial");//To set pager count position in jqxgrid up on dynamically adding.
    sortOrderUserPref("jqxCustomerTrial", vrSortColumnName, vrSortOrder);
    _custIndexNO = -1;
}

var linkrenderer_customers = function (row, column, value) {
    return linkrendercustomervalues('jqxCustomerTrial', row, column, value);
}

var linkrendercustomervalues = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        vrCustId = rowdata['CustomerID'];
        vrCustCompany = rowdata['CustomerCompanyName'];
        vrCustCompanyShow = convertDoubleSingleQuotetoChar(rowdata['CustomerCompanyName'].toString());
        vrContactName = convertDoubleSingleQuotetoChar(rowdata['ContactPerson']);
        vrCmpEmailId = convertDoubleSingleQuotetoChar(rowdata['Email'].toString());
        vrWebsite = convertDoubleSingleQuotetoChar(rowdata['Website'].toString());
    }
    // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
    return "<div class='clscustcompanyvalues clsaddellipsis'><a href='#' onclick='customerValuesLink(" + vrCustId + "," + vrContactName + "," + vrCmpEmailId + "," + vrWebsite + "," + vrCustCompanyShow + ")' >" + vrCustCompany + "</a></div>";
}


function customerValuesLink(CustId, custName, custEmailId, custWebsite, custCompanyName) {
    _vrCustDetails = 1;
    _vrCustDialogOpen = 1;
    //_vrLocalCustDataOnCustClick = null;
    //_vrLocalCustDataOnCustClick = JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"));
    var vrDialogTitleName = $("#MagnifierDialog").dialog("option", "title");
    if (vrDialogTitleName == _vrCustomerDialogHdr) {// User click on maginfying the user widget  
        _vrLocalCustDataOnCustClick = null;
        _vrLocalCustDataOnCustClick = JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"));
    }
    else {//user click on the widget itself.
        if (vrDialogTitleName != _vrDialogBoxCustomerTrail) {
            _vrLocalCustDataOnCustClick = null;
            _vrLocalCustDataOnCustClick = JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"));
        }
    }
    $(".clslblgetvalue").text("");
    checkWidgetsAndAppend();
    $(".clslnkcustomercontact").css("display","inline");
    $(".clsmagcompanyname").css("display", "block");
    $("#divMainLoader").css("display", "block");
    $("#divMagnifyHdrTitle").css("height", "80px");
    _vrMagnifyCustId = CustId;
    _vrCustContName = custName;
    _vrCustEmailId = custEmailId;
    _vrCustWebsiteName = custWebsite;
    _vrCustName = custCompanyName;
    custName = convertCharToDoubleSingle(custName);
    custEmailId = convertCharToDoubleSingle(custEmailId);
    custWebsite = convertCharToDoubleSingle(custWebsite);
    custCompanyName = convertCharToDoubleSingle(custCompanyName);
    if (typeof custWebsite !='undefined' && custWebsite.indexOf(_vrHostAddressDefault) == '-1') {
        custWebsite = _vrHostAddressDefault + custWebsite;
    }
    $("#lblMagCompanyFieldValue").text(custCompanyName);
    $("#lblMagfieldtext1").text(_vrCustNameLbl);
    $("#lblMagfieldtext2").text(_vrCustEmailIdLbl);
    $("#lblMagfieldtext3").text(_vrCustWebsite);
    $("#lblMagFieldVal1").text(custName);
    $("#lblMagFieldVal2").text('');
    $("#lblMagFieldVal3").text('');
    $("#lnkCompanyEmailId").text(custEmailId);
    $("#lnkCompanyWebsite").text(custWebsite);
    $("#lnkCompanyEmailId").attr("href", "mailto:" + custEmailId);
    $("#lnkCompanyWebsite").attr("href",custWebsite);
    _BaseUrl = _vrLocationOrigin + '/Project/GetProjectData';
    var objProjectDetails = {
        ProjectName: 0,
        ProjectCustomerID: 0,
        ProjectStatusID: "0",
        ProjectID: 0,
        TokenID: _vrUserTokenId
    };
    if (_vrCustDetCnt == 0) {
        ajaxCallWithObject(_BaseUrl, objProjectDetails, customerProjValues);
    }
    else if (_vrCustDetCnt==1)
    {
        $("#divMagnifyHdrTitle").css("display", "block");

        openMagnifyDialogBox(_vrCustomerDetDialogHdr, 'jqxPreviewGrid', _vrDefaultPreviewPager);
        $("#divMagnifierGrid").css("display", "inline");
        if (_vrJqxMagnifyLoadedFlag != _vrProjectsMagnifyLoaded) {
            //_vrCustDetails = 0;
            vrCustomerProjData = {
                datatype: "json",
                type: "GET",
                cache: false,
                datafields: _vrProjDataFields,
                localdata: _vrCustSourceData
                //pagesize: _vrDefaultPreviewPager
            };

            bindDataToJqxInMagnifier("jqxPreviewGrid", vrCustomerProjData, _vrProjeMagnifierCustValues, __vrCustProjMagTasksWidth);
            if (_vrTaskDataOnCPUOnTaskClick != null) {
              
                $("#jqxPreviewGrid").jqxGrid('gotopage', _vrTaskDataOnCPUOnTaskClick.pagenum);
            }
            _vrTaskDataOnCPUOnTaskClick = null;
            _vrCustDetCnt = 0;
        }
        _vrJqxMagnifyLoadedFlag = _vrProjectsMagnifyLoaded;
        $(".clsmagnifyeditbuttons").css("display", "none");
        $("#btnEditCustomerFields").css("display", "inline");
        $("#divMainLoader").css("display", "none");
        _vrCustDetCnt = 0;
        //_vrCustSourceData = '';
    }
    
    event.preventDefault();
}


function customerProjValues(source) {
    $("#divMagnifyHdrTitle").css("display", "block");
    // $("#jqxPreviewGrid").jqxGrid('clear');
    //_vrCustDetails = 0;
    var data = source.MultipleResults[0].LstProjects;
    var vrFilterCustomerData = jQuery.grep(data, function (element, index) {
        return element.ProjectCustomerID == parseInt(_vrMagnifyCustId); // retain appropriate elements
    });

    openMagnifyDialogBox(_vrCustomerDetDialogHdr, 'jqxPreviewGrid', _vrDefaultPreviewPager);
    $('.ui-dialog :button').focus();
    $("#divMagnifierGrid").css("display", "inline");
    if (_vrJqxMagnifyLoadedFlag != _vrProjectsMagnifyLoaded) {
         vrCustomerProjData = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrProjDataFields,
            localdata: vrFilterCustomerData
            //pagesize: _vrDefaultPreviewPager
        };
         bindDataToJqxInMagnifier("jqxPreviewGrid", vrCustomerProjData, _vrProjeMagnifierCustValues, __vrCustProjMagTasksWidth);
         _vrCustSourceData = vrFilterCustomerData;
        
    } else {
        vrCustomerProjData.localdata = vrFilterCustomerData;
        _vrCustSourceData = vrFilterCustomerData;
        $("#jqxPreviewGrid").jqxGrid({ source: vrCustomerProjData });

        disableJqxPagerButtonsOnLoad('jqxPreviewGrid');
        $("#jqxPreviewGrid").on("pagechanged", function (event) {
            disableEnablePagingButtons("jqxPreviewGrid", event);
        });



        //disableJqxPagerButtonsOnLoad("jqxPreviewGrid");
        //$("#jqxPreviewGrid").on("pagechanged", function (event) {
        //    disableEnablePagingButtons("jqxPreviewGrid", event);
        //});

    }
    _vrJqxMagnifyLoadedFlag = _vrProjectsMagnifyLoaded;
    $(".clsmagnifyeditbuttons").css("display", "none");
    $("#btnEditCustomerFields").css("display", "inline");
    $("#divMainLoader").css("display", "none");
    event.preventDefault();
}

function filterCustomerTrStatus() {
    _custIndexNO = -1;
    filterCustomersJqxGrid();
    _vrSelCustomerStatus = $("#ddlCustomerProject").val();
    /*bug id 5160*/  var vrCustStatusDrpDwnVal = $("#ddlCustomerProject option:selected").text();
    $("#ddlCustomerProject").attr("title", "");
    /*bug id 5160*/ $("#ddlCustomerProject").attr("title", vrCustStatusDrpDwnVal);
    if (_vrSelCustomerStatus.length == 0) {
        _vrSelCustomerStatus = _vrSelCustomerUserStatusText;
    }
}
function LoadCustomerDetails() {
    setTimeout(function () {
        filterCustomersJqxGrid();
    }, 5);
}
function SearchCustomer()//Filteration based on text entered on search textbox.
{
    filterCustomersJqxGrid();
}
function filterCustomersJqxGrid() {
    try {
    var vrCustomerStatus = $("#ddlCustomerProject").val();
    var vrCustomerName = $("#idSearchCustomer").val().toLowerCase();
    var vrDynCustomerData = _vrCustomersData;
    var vrDynCustomerLocalData = _vrCustomersData.localdata;
    var vrFilteredData = vrDynCustomerLocalData;
    if (vrCustomerStatus != null && $("#ddlCustomerProject").val().length > 0) {
        vrFilteredData = jQuery.grep(vrDynCustomerLocalData, function (element, index) {
            return element.Active == parseInt(vrCustomerStatus); // retain appropriate elements
        });
    }
        if ($.trim(vrCustomerName).length > 0) {
        vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
            return element.CustomerCompanyName.toLowerCase().indexOf(vrCustomerName) > -1; // retain appropriate elements
        });
    }
        if ($.trim(vrCustomerName).length == 0 && $("#ddlCustomerProject").val().length == 0) {
        vrFilteredData = vrDynCustomerLocalData;
     }
    vrDynCustomerData.localdata = vrFilteredData;
    $("#jqxCustomerTrial").jqxGrid({ source: vrDynCustomerData });
    _vrCustomersData.localdata = vrDynCustomerLocalData;
    disableJqxPagerButtonsOnLoad('jqxCustomerTrial');
    $("#idCustomerLoding").css("visibility", "none");

    } catch (e) {

    }
}


function loadJqxCustomersGrid() {
    try {

        bindDataToJqx("jqxCustomerTrial", _vrCustomersData, _vrCustColumns, _vrMagnifyGridWidth);//Calls during magnifier icon click
    filterCustomersJqxGrid();
    } catch (e) {

    }
    // $("#jqxCustomerTrial").jqxGrid({ source: _vrCustomersData });

}

function decreaseJqxCustomersGrid() {
    try {
    bindDataToJqx("jqxCustomerTrial", _vrCustomersData, _vrCustColumns, _vrCustomersGridWidth);
    filterCustomersJqxGrid();
    } catch (e) {

    }
}

//To open new Customer create dialog box.
function createNewCustomer() {

    try {
        $("#ddlCountryList").removeClass("error");
        $('#errUserExist').css('display', 'none');
        $('#errDataNotInserted').css('display', 'none');
        $("#txtCustomerName").removeClass('error');
        $('.clstextfieldwidth').val('');
        $('#errEmail').css('display', 'none');
        $('#errWebsite').css('display', 'none');
        $("#errNewCustomerError").css("display", "none");
        $('#dailog').dialog('option', 'title', _vrDialogBoxCustomerAddingTrail);
        _vrDialogBoxTitle = _vrDialogBoxCustomerAddingTrail;
        $(".clsdailogfields").css("display", "none");
        $("#idShowCustomerDetails").css("display", "inline-block");
        $(".clsexistedcustomerfields").css("display", "none");
        _BaseUrl = _vrLocationOrigin + '/Customer/GetCountries?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBindCountrys);
        $("#chkActive").prop('checked', true);
        count = 0;
        //$("#txtCustomerName").focus();
        //$("#txtWebsite").attr('tabindex', 2);
        //$("#txtPrimaryContact").attr('tabindex', 3);
        //$("#ddlCountryList").attr('tabindex', 4);
        //$("#txtEmail").attr('tabindex', 5);
        //$("#txtWebsite").attr('tabindex', 2);
        //$("#txtWebsite").attr('tabindex', 2);
        //$("#txtWebsite").attr('tabindex', 2);
        //$("#txtWebsite").attr('tabindex', 2);
        //$("#txtWebsite").attr('tabindex', 2);
        //$("#txtWebsite").attr('tabindex', 2);
        $('#dailog').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
        $("#btnSave").css("display", "inline");
        $("#btnUpdate").css("display", "none");

        //$("#txtCustomerName").focus();
    } catch (e) {

    }
}
//Function to Save Customer Details

function SaveCustomer() {
    _vrLocalCustDataOnCustClick = null;
    _vrLocalCustDataOnCustClick = JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"));
    $("#divMainLoader").css("display", "inline");
    var varCompanyName = $("#txtCustomerName").val();
    var varPrimaryContact = $("#txtPrimaryContact").val();
    var varEmail = $("#txtEmail").val();
    var varAddress = $("#txtAddress").val();
    var varWebsite = $("#txtWebsite").val();
    var varCountryCode = $("#ddlCountryList").val();
    var varPhone = $("#txtPhone").val();
    var varNotes = $("#txtNotes").val();
    if (varCompanyName == "" || $.trim($("#ddlCountryList").val()).length == 0) {
        if ($.trim(varCompanyName).length == 0) {
            $("#txtCustomerName").addClass('error');
        }
        if ($.trim($("#ddlCountryList").val()).length == 0) {
            $("#ddlCountryList").addClass("error");
        }
        $('#errUserExist').css('display', 'none');
        if ($('.error').length > 0) {
            $("#divMainLoader").css("display", "none")
            $("#errNewCustomerError").css("display", "inline");
            return false;
        }
        $("input[type = submit]").attr("disabled", true);
    }
    else {
        if (validateEmail(varEmail)) {
            if (validateWebsite(varWebsite)) {
        // var varActive = $("#chkActive").val();
                    if ($('#chkActive').is(":checked")) {
                        // it is checked
                        varActive = 1;
                    }
                    else {
                        varActive = 0;
                    }

                    var objInsertCustomerDetails =
                        {
                            ContactPerson: varPrimaryContact,
                            CustomerCompanyName: varCompanyName,
                            Email: varEmail,
                            Phone: varPhone,
                            Website: varWebsite,
                            Address: varAddress,
                            CustomerNotes: varNotes,
                            CustomerCountryID: varCountryCode,
                            Active: varActive,
                            TokenID: _vrUserTokenId
                        };
                    _BaseUrl = _vrLocationOrigin + '/Customer/InsertCustomer';
                    ajaxCallToInsertObject(_BaseUrl, objInsertCustomerDetails);
                
            }
        }
            //else
            //{
            //    $('#errWebsite').css('display', 'inline');
                
            //    $("#divMainLoader").css("display", "none");
            //}
        
        //else {
        //    $('#errEmail').css('display', 'inline');
        //    $("#divMainLoader").css("display", "none");
        //}
    }
}
//Function To Check Uniqueness Of Customers
function CheckExistingCompanys(varCompanyName) {
    var vrLength = _vrCustomersData.localdata.length;
    for (var i = 0; i < vrLength; i++) {
    
    if (_vrCustomersData.localdata[i].CustomerCompanyName == varCompanyName) {
        return true;
    }
  
    }
    return false;
}
function LoadPageNumForCustomer() {
    try{
        if (_vrLocalCustDataOnCustClick != null) {
            localStorage.setItem("jqxGridjqxCustomerTrial", JSON.stringify(_vrLocalCustDataOnCustClick));
            $("#jqxCustomerTrial").jqxGrid('gotopage', _vrLocalCustDataOnCustClick.pagenum);
        }
        LoadTaskPageNumForUserInMaginfy();
    }
    catch(e){
    
    }
}
function LoadPageNumForUser() {
    try {
        if (_vrLocalUserDataOnUserClick != null) {
            localStorage.setItem("jqxGridjqxUserTrial", JSON.stringify(_vrLocalUserDataOnUserClick));
            $("#jqxUserTrial").jqxGrid('gotopage', _vrLocalUserDataOnUserClick.pagenum);
        }
    }
    catch (e) {

    }
}

function LoadTaskPageNumForUserInMaginfy() {
    try {
        if (_vrTaskDataOnCPUOnTaskClick != null) {
            $("#jqxPreviewGrid").jqxGrid('gotopage', _vrTaskDataOnCPUOnTaskClick.pagenum);
        }
    }
    catch (e) {

    }
}
function LoadPageNumForProj() {
    try {
        if (_vrLocalTaskDataOnProjClick != null) {
            localStorage.setItem("jqxGridjqxProjectsGrid", JSON.stringify(_vrLocalTaskDataOnProjClick));
            $("#jqxProjectsGrid").jqxGrid('gotopage', _vrLocalTaskDataOnProjClick.pagenum);
        }
    }
    catch (e) {

    }
}

//Function To Insert Customers

function ajaxCallToInsertObject(WebUrl, ObjData) {
    $.ajax({
        type: 'POST',
        url: WebUrl,
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(ObjData),
        processData: false,
        crossDomain: true,
        dataType: 'json',
        timeout: 18000,
        success: function (data) {
            if (data.ResponseId == _vrResponseId) {

                //$("#idSearchCustomer").val("");
                _BaseUrl = _vrLocationOrigin + '/User/GetCustProjUserCount?strTokenID=' + _vrUserTokenId;
                ajaxCall(_BaseUrl, bindRecordsCount);//Count of Customers,Users and projects.
              

                bindCustomersDetails();
                $('#dailog').dialog('close');
                LoadCountDataToCustUserProjSilde();
                //$("#ddlCountryList").html('');
                if (WebUrl == _vrLocationOrigin + '/Customer/UpdateCustomer') {
                    //$("#").val("");
                    $(".info").html(_vrCustomerUpdatedStatus);
                    
                    var varCompanyName = $("#txtCustomerName").val();
                    var varPrimaryContact = $("#txtPrimaryContact").val();
                    var varEmail = $("#txtEmail").val();
                    var txtWebsite = $("#txtWebsite").val();
                    customerValuesLink(_vrMagnifyCustId, varPrimaryContact, varEmail, txtWebsite, varCompanyName);
                   // $("#divMainLoader").css("display", "block");
                    $('#errUserExist').css('display', 'none');
                    //$("#divMainLoader").css("display", "none");
                    
                }
                else {
                    $(".info").html(_vrCustomerCreatedStatus);
                    $('#errUserExist').css('display', 'none');
                }
                if (data.ResponseId == _vrErrResponseId) {
                    displayError();
                }
               // $("#divMainLoader").css("display", "none");
                $("input[type = submit]").attr("disabled", false);
                _vrCustomerCreation = '';
                showStatusDiv();
                $('#errUserExist').css('display', 'none');
            }
            else if (data.ResponseId==_vrResponseFailureId)
            {
                $('#errUserExist').css('display', 'inline');
                $("#divMainLoader").css("display", "none");
            }
            else {
                //alert("Data Not Inserted");
                $('#errDataNotInserted').css('display', 'inline');
                $("#divMainLoader").css("display", "none");
                //$('#dailog').dialog('close');
            }
            if ($('#MagnifierDialog').dialog("isOpen") === false) {
                $("#divMainLoader").css("display", "none");
            }
            $("input[type = submit]").attr("disabled", false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            displayError();
            $("#divMainLoader").css("display", "none");
            _vrCustomerCreatedStatus = '';
            _vrFunctionalityStatus = '';
            $("input[type = submit]").attr("disabled", false);
            return false;
        }
    });
}
//Function to bind data to the country dropdown

//function bindArrayToCountryDropDown(data, ddlMember) {
//    if ($.trim(data).length == 0) {
//        return;
//    }
//    //$("#" + ddlMember).append("<option value='" + '' + "'>Select</option>");
//    for (var vrLoop = 0; vrLoop < data.length; vrLoop++) {
//        $("#" + ddlMember).append("<option value='" + vrLoop + "'>" + data[vrLoop].CountryName + "</option>");
//    }
//}
//To Reset The TextBoxes And DropDowns On Cancel Click
function CancelCustomerDetails() {
    
    $("#ddlCountryList").empty();

    $('.clstextfieldwidth').val('');
    $("#errNewCustomerError").css("display", "none");
    $("#errEmail").css("display", "none");
    count = 0;
    $("#errWebsite").css("display", "none");
    $("#txtCustomerName").removeClass('error');
    $("#txtEmail").removeClass('error');
    $("#txtWebsite").removeClass('error');
    $('#dailog').dialog('close');
  
}

//Function To Validate Email

function validateEmail(varEmail) {
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
                        var index1=1;
                        index1 +=index;
                        var splitindex=splitemail[0].indexOf(splitemail[0].charAt(i), index1);
                        if (splitindex > index && splitindex==index1) {
                            count++;
                        }
                    }
                }
            }
            if (count == 0) {
                var re = /^[a-zA-Z0-9_\!#$%^&*()+-]+(\.[a-zA-Z0-9_\!#$%^&*()+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
                if (varEmail == "") {
                    $('#errEmail').css('display', 'none');
                    return true;
                }
                else if (re.test(varEmail)) {
                    $('#errEmail').css('display', 'none');
                    return true;

                }
                else {
                    $('#errEmail').css('display', 'inline');
                    $("#divMainLoader").css("display", "none");
                    return false;
                }
            }
            else {
                $('#errEmail').css('display', 'inline');
                $("#divMainLoader").css("display", "none");
                return false;
            }
        }
        else {
            $('#errEmail').css('display', 'inline');
            $("#divMainLoader").css("display", "none");
            return false;
        }
    }
    else {

        if (varEmail.length == 0) {
            $('#errEmail').css('display', 'none');
            return true;
        }
        else {
            $('#errEmail').css('display', 'inline');
            $("#divMainLoader").css("display", "none");
            return false;
        }

    }
    //strEmailAddress = varEmail;
    //var at = "@"
    //var dot = "."
    //var lat = strEmailAddress.indexOf(at)
    //var lstr = strEmailAddress.length
    //var ldot = strEmailAddress.lastIndexOf(dot)
    //if (strEmailAddress.indexOf(at) == -1) {
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false
    //}

    //if (strEmailAddress.indexOf(at) == -1 || strEmailAddress.indexOf(at) == 0 || strEmailAddress.indexOf(at) == lstr) {
    //    $('#errEmail').css('display', 'inline');
    //                    $("#divMainLoader").css("display", "none");
    //    return false
    //}

    //if (strEmailAddress.indexOf(dot) == -1 || strEmailAddress.indexOf(dot) == 0 || strEmailAddress.indexOf(dot) == lstr) {
    //    $('#errEmail').css('display', 'inline');
    //                    $("#divMainLoader").css("display", "none");
    //    return false
    //}

    //if (strEmailAddress.indexOf(at, (lat + 1)) != -1) {
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false
    //}

    //if (strEmailAddress.substring(lat - 1, lat) == dot || strEmailAddress.substring(lat + 1, lat + 2) == dot) {
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false
    //}

    //if (strEmailAddress.indexOf(dot, (lat + 2)) == -1) {
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false
    //}

    //if (strEmailAddress.indexOf(" ") != -1) {
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false
    //}
    ////Gopi 1 Start 21-09-2011 Added More Email Validations.
    //var strAfterDot = strEmailAddress.substring(ldot, lstr);
    //var strAfterDotLen = strAfterDot.length - 1;
    //var strAfterAT = strEmailAddress.substring(lat, ldot);
    //var strAfterATLen = strAfterAT.length - 1;
    //var strSPChars = "!,»,/,$,%,?,&,*,(,),<,>,#,^,~,+,-";
    //var arrStrSPChars = new Array();
    //arrStrSPChars = strSPChars.split(',');
    //if (strEmailAddress.indexOf(at) < 2) {
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");// Checks for two letters before @ of Email ID
    //    return false;
    //}
    //if (parseInt(strAfterDotLen) < 2) {           // Checks for two letters after Dot in .com, .net etc...
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false;
    //}
    //if (parseInt(strAfterATLen) < 2) {            // Checks for two letters in between @ and .
    //    $('#errEmail').css('display', 'inline');
    //    $("#divMainLoader").css("display", "none");
    //    return false;
    //}
    //for (var intcount = 0; intcount <= arrStrSPChars.length; intcount++) {
    //    if (strEmailAddress.indexOf(arrStrSPChars[intcount]) ==0) {
    //        $('#errEmail').css('display', 'inline');
    //        $("#divMainLoader").css("display", "none");
    //        return false;
    //    }
    //}
    ////Gopi 1 End 21-09-2011 Added More Email Validations.
    //$('#errEmail').css('display', 'none');
    //return true

}


//Function validate to Website

function validateWebsite(varWebsite) {
    //varWebsite= $("#txtWebsite").val();
    //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var re = /^((http|https|ftp):\/\/(www\.)?|www\.)[a-zA-Z0-9\_\-]+\.([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})(\/[a-zA-Z0-9\-\._\?\&=,'\+%\$#~]*)*$/;
 
    //^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$

    var re = /^((http|https|ftp):\/\/(www\.)?|www\.)[a-zA-Z0-9\_\-]+\.([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})(\/[a-zA-Z0-9\-\._\?\&=,'\+%\$#~]*)*$/;

    if (varWebsite=="" || varWebsite==undefined)
    {
        $('#errWebsite').css('display', 'none');
        return true;
    }
    else if (re.test(varWebsite)) {
        $('#errWebsite').css('display', 'none');
        return true;
    }
    $('#errWebsite').css('display', 'inline');
    $("#divMainLoader").css("display", "none");
    return false;
}


//Function To Update Customer Profile

function editCustomerProfile() {
    $("#divMainLoader").css("display", "inline");
    
    $("#divMainLoader").css("display", "inline");
    $('#errUserExist').css('display', 'none');
    //$("#MagnifierDialog").dialog("close");
    $('#dailog').dialog('option', 'title', _vrDialogBoxCustomerUpdateTrail);
    $('#dailog').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
    $(".clscustomererrordiv").css("display", "none");
    $("#txtCustomerName").removeClass('error');

    $("#ddlCountryList").removeClass('error');

    objCustomerDetailsMagnify = {
        GetCustomerID: true,
        CustomerID: _vrMagnifyCustId,
        TokenID: _vrUserTokenId
    };
    _BaseUrl = _vrLocationOrigin + '/Customer/GetCountries?strTokenID=' + _vrUserTokenId;
    ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBindUpdatedCountrys);

}

function UpdateFunction(source) {
    $("#divMainLoader").css("display", "block");
    $("#txtCustomerName").val(source.MultipleResults[0].CustomerCompanyName);
    $("#txtPrimaryContact").val(source.MultipleResults[0].ContactPerson);
    $("#txtEmail").val(source.MultipleResults[0].Email);
    $("#txtAddress").val(source.MultipleResults[0].Address);
    $("#txtWebsite").val(source.MultipleResults[0].Website);
    $("#txtPhone").val(source.MultipleResults[0].Phone);
    $("#txtNotes").val(source.MultipleResults[0].CustomerNotes);
    $("#ddlCountryList").val(source.MultipleResults[0].CustomerCountryID);
    if (source.MultipleResults[0].Active == _vrResponseId) {
        $("#chkActive").prop('checked', true);
    }
    else {
        $("#chkActive").prop('checked', false);
    }
    //$('#dailog').dialog('option', 'title', _vrDialogBoxCustomerTrail);
    _vrDialogBoxTitle = _vrDialogBoxCustomerTrail;
    $(".clsdailogfields").css("display", "none");
    $("#idShowCustomerDetails").css("display", "inline-block");
    $(".clsexistedcustomerfields").css("display", "none");
    $("#btnSave").css("display", "none");
    $('#errEmail').css('display', 'none');
    $('#errWebsite').css('display', 'none');
    $("#btnUpdate").css("display", "inline");
    $("#divMainLoader").css("display", "none");
    
}

//Function To Update Customer Profile 

function UpdateCustomerDetails() {
 
        var varCompanyName = $("#txtCustomerName").val();
        var varPrimaryContact = $("#txtPrimaryContact").val();
        var varEmail = $("#txtEmail").val();
        var txtAddress = $("#txtAddress").val();
        var txtWebsite = $("#txtWebsite").val();
        var txtPhone = $("#txtPhone").val();
        var txtNotes = $("#txtNotes").val();
        var vrcountryid = $("#ddlCountryList").val();
    //var vrActive = $("#chkActive").val();
    

        if ($("#chkActive").prop('checked')==true) {
            vrActive = 1;
        }
        else {
            vrActive = 0;
        }
        if (varCompanyName == "" || $.trim($("#ddlCountryList").val()).length == 0) {
            if ($.trim(varCompanyName).length == 0) {
            $("#txtCustomerName").addClass('error');
        }
            if ($.trim($("#ddlCountryList").val()).length == 0) {
        $("#ddlCountryList").addClass("error");
        }

            if ($('.error').length > 0) {
                $("#divMainLoader").css("display", "none")
                $("#errNewCustomerError").css("display", "inline");
                return false;
            }
            $("input[type = submit]").attr("disabled", true);
        }
        else {
            if (validateEmail(varEmail)) {
                if (validateWebsite(txtWebsite)) {
                  
                        objCustomer = {
                            CustomerID: _vrMagnifyCustId,
                            ContactPerson: varPrimaryContact,
                            CustomerCompanyName: varCompanyName,
                            Email: varEmail,
                            Phone: txtPhone,
                            Website: txtWebsite,
                            Address: txtAddress,
                            CustomerNotes: txtNotes,
                            CustomerCountryID: vrcountryid,
                            Active: vrActive,
                            TokenID: _vrUserTokenId
                        };
                        $("#divMainLoader").css("display", "block");
                        $('#errUserExist').css('display', 'none');
                        $("#errNewCustomerError").css("display", "none");
                        _BaseUrl = _vrLocationOrigin + '/Customer/UpdateCustomer';
                        ajaxCallToInsertObject(_BaseUrl, objCustomer);
                }
                else
                {
                    $('#errWebsite').css('display', 'inline');
                }
            }
            else {
                //alert("please enter valid Email")
                $('#errEmail').css('display','inline');
            }
       
        }
        
}


//Function to validate Phone number


function PhoneValidation() {
    var vValue = document.getElementById("txtPhone").value;
    //if (!isNaN(vValue)) {
    if (vValue.length == 0) {
        vValue = '';
    }
    else 
    {
        
 
         if (vValue.length < 10) {
            vValue = vValue;
        }
        else if (validateNumeric(vValue) == false) {
            vValue = vValue;
        }
        else if (vValue.length == 10) {
            var vFormattedNo = new String('(' + vValue.substr(0, 3) + ')' + vValue.substr(3, 3) + '-' + vValue.substr(6, 4));
            vValue = vFormattedNo;
        }
        }
        document.getElementById("txtPhone").value = vValue;
    
    
    //}
    //else {
    //    document.getElementById("txtPhone").value = "";
    //}
}


function validateNumeric(strValue) {
    var objRegExp = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;

    //check for numeric characters
    return objRegExp.test(strValue);
}





function GetCustomerName() {
    if ($("#txtCustomerName").val().length > 0) {
        $("#txtCustomerName").removeClass('error');
        if ($("#idShowCustomerDetails .error").length == 0) {
            $("#errNewCustomerError").css("display", "none");
        }
    }
    else {
        $("#errNewCustomerError").css("display", "inline");
        $("#txtCustomerName").addClass('error');

        $("#divMainLoader").css("display", "none");

    }
    $("#errUserExist").css("display", "none");
 
}