
var vrUserEmpId = '', vrUserFirstName = '', vrUserName = '', vrUserMobile = '', vrUserAddress = '', varEmpPrflPicNme = '';
var dtToday = new Date(); _vrMagnifyUserTrailGridWidth = 1048;

$(document).ready(function () {
    //$("#idSearchCustomer").blur(function () {
    //    $(".clscustomertrailSearch").css("margin-left","186px");
    //});
    $("#userProfilePicture")
  .error(function () {
      //$("#userProfilePicture").attr("src", _vrUploadEmpPicdefault);
  });
    $("#txtNewUserDateOfBirth").datepicker({
        showOn: "button",
        buttonImage: "img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        maxDate: new Date() ,
        yearRange: _vrMinYear + ":" + dtToday.getFullYear(),
        showButtonPanel: true,
        onClose: function (e) {
            var ev = window.event;
            if (ev.srcElement.innerHTML == 'Clear')
                this.value = "";

        },
        closeText: 'Clear',
        buttonText: ''

    });
    var dates = $("#txtNewUserDateOfJoin,#txtNewUserResignDate").datepicker({
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
            if ($.trim($("#txtNewUserDateOfJoin").val()).length > 0) {
                $("#txtNewUserDateOfJoin").removeClass('error');
                    for(var i = 0; i < dates.length; ++i) {
                        if(dates[i].id > this.id)
                            $(dates[1]).datepicker('option', 'minDate', date);
                            $(dates[1]).datepicker('option', 'maxDate', null);
                } 
            }
            if ($(".error").length == 0) {
                $(".clsmandatoryuserreqfield").css("display", "none");
            }
        }
    });
   
    $(".clscheckcharacters").keypress(function (e) {
        var eVal = String.fromCharCode(e.which);
        var vrVal = '~`#$%&^*|\\{}[]:;<>,.?/+=';
        if (vrVal.indexOf(eVal) > -1) {
            return false;
        }

    });
        
    $(".gridster").on("click", "#btnRefreshUserGrid", function () {
        _userIndexNO = -1;
        $("#imgUserMagnify").attr("disabled", true);
        $("#divUserLoading").css("display", "block");
        _vrSelUserStatus = _vrDefaultActiveStatus;//For active
        $("#txtUserSearch").val("");
        _vrLocalUserDataOnUserClick = null;
        LoadUserDataToWidget();
        LoadCountDataToCustUserProjSilde();
        $("#imgUserMagnify").attr("disabled", false);
        $("#divUserLoading").css("visibility", "none");
       // $("#jqxUserTrial").jqxGrid("render");
    });
    $("#ddlNewUserDesignation").change(function () {
        if ($.trim($("#ddlNewUserDesignation").val()).length > 0) {
            $("#ddlNewUserDesignation").removeClass("error");
            if ($("#idShowNewUser .error").length == 0) {
                $("#mandatoryUserReqField").css("display", "none");
            }
        }
    });
    $(".gridster").on("click", "#btnUserResetSearch", function () {
        $('#txtUserSearch').val("");
        filterUserJqxGrid();
    });
    $("#iddeployemail").keypress(function (event) {
        if ((event.keyCode >= 33 && event.keyCode <= 42) || event.keyCode == 94) {
            return false;
        }
    });

});
function CheckBrowserNAddCSS() {
    if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        $("#txtUserSearch").css("padding-right", "0px");
        $("#txtProjTrProjects").css("padding-right", "0px");
        $("#idSearchCustomer").css("padding-right", "0px");
        $("#txtUserSearch").css("width", "120px");
        $("#txtProjTrProjects").css("width", "119px");
        $("#idSearchCustomer").css("width", "112px");
    }
    else {
        $("#txtUserSearch").css("padding-right", "20px");
        $("#txtProjTrProjects").css("padding-right", "20px");
        $("#idSearchCustomer").css("padding-right", "20px");
        $("#idSearchCustomer").css("margin-left", "0px");
    }
}
var vrUserEmpId = '', vrUserFirstName = '', vrUserName = '', vrUserMobile = '', vrUserAddress = '';
function LoadUserDataToWidget() {
    _BaseUrl = _vrLocationOrigin + '/User/GetEmployeeData';
    var objEmployees = {//Parameters for getting the Users data 
        EmpID: 0,
        UserRoleID: 0,
        GetStatus: false,
        Active: '',
        TokenID: _vrUserTokenId
    };
    ajaxCallWithObject(_BaseUrl, objEmployees, bindUsersData); // ajax call to fetch get the usr details data 
}
function bindUsersData(source) { //function to bind the result into respective columns
    try {

        var vrSortColumnName = '', vrSortOrder = '';
        var colsort = sortingcolumns("jqxUserTrial");
        vrSortColumnName = colsort.vrSortColumnName;
        vrSortOrder = colsort.vrSortOrder;
        var data = source.MultipleResults;

        
        _vrUsersData = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrUserDataFields,
            localdata: data,
            pagesize: _vrDefaulUserSizer
        };

        if ($('#MagnifierDialog').dialog("isOpen") === true && ($('#MagnifierDialog').dialog('option', 'title')) === 'Users') {
            bindDataToJqx("jqxUserTrial", _vrUsersData, _vrUserColumns, _vrMagnifyUserTrailGridWidth);// function call to generate the grid append the data to the grid
        } else {
            bindDataToJqx("jqxUserTrial", _vrUsersData, _vrUserColumns, _vrUsersGridWidth);// function call to generate the grid append the data to the grid
        }

        //bindDataToDropDown(source.MultipleResults[0].LstCustomers, 'ddlProjCustomer', 'CustomerID', 'CompanyName');
        if (_vrSelUserStatus.length > 0 || _vrSelUserStatus == _vrSelCustomerUserStatusText) {
            if (_vrSelUserStatus != _vrSelCustomerUserStatusText) {
                $("#ddlUserstatus").val(_vrSelUserStatus);
            }
        } else {
            $("#ddlUserstatus").val(_vrDefaultActiveStatus);
        }
        if (_vrWidgetCOntrolData.length > 0) {
            if (_userIndexNO > -1) {
                if (Object.keys(_vrWidgetCOntrolData[_userIndexNO]).length > 0) {
                    $("#ddlUserstatus").val(_vrWidgetCOntrolData[_userIndexNO].ddlUserstatus);
                    $("#txtUserSearch").val(_vrWidgetCOntrolData[_userIndexNO].txtUserSearch);
                    _userIndexNO = -1;
                }
            }
        }
        filterUserJqxGrid();
        $("#divUserLoading").css("display", "none");
        CheckBrowserNAddCSS();
        LoadPageNumForUser();
        $("#imgUserMagnify").attr("disabled", false);
        setRecordCountPosition("jqxUserTrial");//To set pager count position in jqxgrid up on dynamically adding.
        sortOrderUserPref("jqxCustomerTrial", vrSortColumnName, vrSortOrder);
    } catch (e) {
        $("#imgUserMagnify").attr("disabled", false);
        $("#divUserLoading").css("display", "none");
    }
}
//var linkrenderer_userActiveStatusValue = function (row, column, value) {
//    return linkrenderuserActiveStatusValues('jqxUserTrial', row, column, value);
//}
var linkrenderer_uservalue = function (row,column,value) {
    return linkrenderuseridvalues('jqxUserTrial', row, column, value);
}

//var linkrenderuserActiveStatusValues=function(jqxGridID, row, column, value){
//   if(value==true)||()
//}
var linkrenderuseridvalues = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        vrUserEmpId = rowdata['EmpID'];
        vrUserFirstName = checkIsUndefined(rowdata['EmpFirstName']).toString();
        vrUserName = (checkIsUndefined(rowdata['EmpFirstName']).toString() + " " + checkIsUndefined(rowdata['EmpLastName']).toString());
        vrUserName = convertDoubleSingleQuotetoChar(vrUserName);//&@%!~ for double inverted and #%&%# for single inverted.
        vrUserMobile = JSON.stringify(checkIsUndefined(rowdata['Phone'])).toString();
        vrUserAddress = convertDoubleSingleQuotetoChar(checkIsUndefined(rowdata['Address']).toString());
    }
    // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
    return "<div><a href='#' onclick='userValueLink(" + vrUserEmpId + "," + vrUserName + "," + vrUserMobile + "," + vrUserAddress + ")'  class='clsalluservaluesalign'>" + vrUserEmpId + "</a></div>";

}

var linkrenderer_user = function (row, column, value) {

    return linkrenderuservalues('jqxUserTrial', row, column, value);
}

function checkIsUndefined(value) {
    var vrValType = '';
    if (typeof value != 'undefined') {
        vrValType = value;
    }
    return vrValType;
}

var linkrenderuservalues = function (jqxGridID, row, column, value) {
    var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
    if (rowdata != null) {
        vrUserEmpId = rowdata['EmpID'];
        vrUserFirstName = checkIsUndefined(rowdata['EmpFirstName']).toString();
      //  var vrViewUserFirstName = CropTextHtml(rowdata['EmpFirstName'], _vrDefUserFirstNameLen);
        vrUserName = (checkIsUndefined(rowdata['EmpFirstName']).toString() + " " + checkIsUndefined(rowdata['EmpLastName']).toString());
        vrUserName = convertDoubleSingleQuotetoChar(vrUserName);//&@%!~ for double inverted and #%&%# for single inverted.
        vrUserMobile = JSON.stringify(checkIsUndefined(rowdata['Phone'])).toString();
        vrUserAddress = convertDoubleSingleQuotetoChar(checkIsUndefined(rowdata['Address']).toString());
    }
    // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
    return "<div class='clsaddellipsis'><a href='#' onclick='userValueLink(" + vrUserEmpId + "," + vrUserName + "," + vrUserMobile + "," + vrUserAddress + ")'  class='clsalluservalues clsaddellipsis'>" + vrUserFirstName + "</a></div>";
    //return "<div><a href='#' onclick='userValueLink(" +  vrUserEmpId + "," + vrUserName + "," + vrUserMobile+ "," + vrUserAddress + ")'  class='clsalluservalues'>" + vrUserFirstName + "</a></div>";
}

function userValueLink(UserEmpId, Username, UserMobile, Useraddress) {
    _vrUserDialogOpen = 1;
    $(".clslblgetvalue").text("");
    _vrEmpProfilePicImage = '';
    var vrDialogTitleName = $("#MagnifierDialog").dialog("option", "title");
    if (vrDialogTitleName == 'Users') {// User click on maginfying the user widget  
        _vrLocalUserDataOnUserClick = null;
        _vrLocalUserDataOnUserClick = JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"));
    }
    else {//user click on the widget itself.
        if (vrDialogTitleName != _vrUserDetDialogHdr) {
            _vrLocalUserDataOnUserClick = null;
            _vrLocalUserDataOnUserClick = JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"));
        }
    }
    checkWidgetsAndAppend();

    $("#divMainLoader").css("display", "block");
    _vrMagnifyUserId = UserEmpId;
    $("#divMagnifyHdrTitle").css("display", "block");
    Username = convertCharToDoubleSingle(Username);//&@%!~ for double inverted and #%&%# for single inverted;
    Useraddress = convertCharToDoubleSingle(Useraddress);
    $("#lblMagfieldtext1").text(_vrUserNameLbl);
    $("#lblMagfieldtext2").text(_vrUserMobileLbl);
    $("#lblMagfieldtext3").text(_vrUserAddressLbl);
    $("#lblMagFieldVal1").text(Username);
    $("#lblMagFieldVal2").text(UserMobile);
    cropText($("#lblMagFieldVal3"), Useraddress, _vrTextFieldUserManagerLen);
    bindTasksBasedOnClientID(_vrDdlDefault, UserEmpId, _vrBlnExcludeDefault, bindUserMagnifyGrid);
    //_BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID?intProjectid=' + _vrDdlDefault + '&intEmployeeID=' + UserEmpId + '&blnExcludeCSD=' + _vrBlnExcludeDefault + '&strTokenID=' + _vrUserTokenId;
    //ajaxCall(_BaseUrl, bindUserMagnifyGrid);
 return false;}

function bindUserMagnifyGrid(data) {
    var data = data;
    openMagnifyDialogBox(_vrUserDetDialogHdr, 'jqxPreviewGrid', _vrDefaultPreviewPager);
    $("#divMagnifierGrid").css("display", "inline");
    $('.ui-dialog :button').focus();
    if (_vrJqxMagnifyLoadedFlag != _vrTasksMagnifyLoaded) {
        _vrProjectsTasksData = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrTasksDataFields,
            localdata: data
            // pagesize: _vrDefaultPreviewPager
        };
        bindDataToJqxInMagnifier("jqxPreviewGrid", _vrProjectsTasksData, _vrTasksMagnifierColumns, _vrProjectsMagTasksWidth);

    } else {
        _vrProjectsTasksData.localdata = data;
        $("#jqxPreviewGrid").jqxGrid({ source: _vrProjectsTasksData });
        LoadTaskPageNumForUserInMaginfy();

        disableJqxPagerButtonsOnLoad("jqxPreviewGrid");
        $("#jqxPreviewGrid").on("pagechanged", function (event) {
            disableEnablePagingButtons("jqxPreviewGrid", event);
        });
    }
    _vrJqxMagnifyLoadedFlag = _vrTasksMagnifyLoaded;
    $(".clsmagnifyeditbuttons").css("display", "none");
    $("#btnEditUserFields").css("display", "inline");
    $("#divMainLoader").css("display", "none");
    $("#imgMagnifydialogLoader").css("display", "none");
    $("#MagnifierDialog").parent().find('button').attr("disabled", false);
    _vrMagnifyCloneTitle = _vrDialogBoxUser;
    //event.preventDefault();    
}

function loadJqxUserMagifyClickGrid() {
    bindDataToJqx("jqxUserTrial", _vrUsersData, _vrUserColumns, _vrMagnifyUserTrailGridWidth);
    filterUserJqxGrid();
    LoadPageNumForUser();
}
function decreaseJqxUserGrid() {
    try {
        setLocalStorageFromDialog("jqxUserTrial", _vrUsersGridWidth);
        bindDataToJqx("jqxUserTrial", _vrUsersData, _vrUserColumns, _vrUsersGridWidth);
        filterUserJqxGrid();
    } catch (e) {

    }
}
//function loadJqxUserGrid() {
//    $("#jqxUserTrial").jqxGrid({ source: _vrUsersData });
//}

function showUserDetails() {
    _vrMagnifyUserId = _EmpId;
    editUserProfile();
}

function editUserProfile() {
    //$("#MagnifierDialog").dialog('close');
    UpdateExistingUser(_vrMagnifyUserId);
    $('#ddlNewUserTimeZone').empty();
    $('#ddlNewUserDesignation').empty();
    $('#ddlNewUserBloodGrp').empty();
    $('#ddlNewUserRole').empty();
    //
    _vrEditUserProfile = _vrUserEditProfileDefault;
    $("#divMainLoader").css("display", "inline");

}
function bindUserStatus() {
    // $("#ddlUserstatus").empty();
    if ($("#ddlUserstatus").val() == null) {
        _BaseUrl = _vrLocationOrigin + '/User/GetActiveStatusDetails?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagBindStatusRoleUser);
    }
}

function filterUserBasedOnStatus() {
    filterUserJqxGrid();
    _vrSelUserStatus = $("#ddlUserstatus").val();
    /*bug id 5160*/ var vrDrpDwnSelectedVal = $("#ddlUserstatus option:selected").text();

    $("#ddlUserstatus").attr("title","");
    /*bug id 5160*/ $("#ddlUserstatus").attr("title", vrDrpDwnSelectedVal);
    if (_vrSelUserStatus.length == 0) {
        _vrSelUserStatus = _vrSelCustomerUserStatusText;
    }
}
function SearchUser() {
    filterUserJqxGrid();
}
function LoadUserDetails() {
   // filterUserJqxGrid();
    setTimeout(function () {
        filterUserJqxGrid();
    }, 5);
}
function filterUserJqxGrid() {
    try {
        var vrUserStatus = $("#ddlUserstatus").val();
        var vrUserName = $("#txtUserSearch").val().toLowerCase();
        var vrDynUserData = _vrUsersData;
        var vrDynUserLocalData = _vrUsersData.localdata;
        var vrFilteredData = vrDynUserLocalData;
        if (vrUserStatus != null && $("#ddlUserstatus").val().length != 0) {
            vrFilteredData = jQuery.grep(vrDynUserLocalData, function (element, index) {
                return element.Active == parseInt(vrUserStatus); // retain appropriate elements
            });
        }

        if ($.trim(vrUserName).length > 0) {
            vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
                return element.EmpFirstName.toLowerCase().indexOf(vrUserName) > -1; // retain appropriate elements
            });

        }
        if ($.trim(vrUserName).length == 0 && $("#ddlUserstatus").val().length == 0) {
            vrFilteredData = vrDynUserLocalData;
        }
        vrDynUserData.localdata = vrFilteredData;
        $("#jqxUserTrial").jqxGrid({ source: _vrUsersData });
        _vrUsersData.localdata = vrDynUserLocalData;
        disableJqxPagerButtonsOnLoad('jqxUserTrial');
        $("#divUserLoading").css("display", "none");
        
    } catch (e) {
        $("#divUserLoading").css("display", "none");
    }
}


/* Code to add a new User */
function LoadNewUserDialog() {
    $("#divMainLoader").css("display", "block");
    _vrEditUserProfile = '';
    ResetUserFields();
    $("#userProfilePicture").attr("src", _vrUploadEmpPicdefault);
    $('.clsshowonupdate').css("display", "inline");
    $('#ddlNewUserTimeZone').empty();
    $('#ddlNewUserDesignation').empty();
    $('#ddlNewUserBloodGrp').empty();
    $('#ddlNewUserRole').empty();
    $("#btnSaveNewUser").css("display", "inline");
    count = 0;
    createNewUser();
    _vrLocalUserDataOnUserClick = null;
    _vrLocalUserDataOnUserClick = JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"));
}
// function To open New User create dialog box. (start)
function createNewUser() {
    try {
        $('#dailog').dialog('option', 'title', _vrAddUserHdrDetails);
        _vrDialogBoxTitle = _vrAddUserHdrDetails;
        $(".clsdailogfields").css("display", "none");
        $("#idShowNewUser").css("display", "inline-block");
       // $('#dailog').dialog('open');
        $('#dailog').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });

        $('.clsshowonupdate').css("display", "none");
        _BaseUrl = _vrLocationOrigin + '/user/GetREmployeesCommonDetails?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrFlagNewUserRole);

    } catch (e) {

    }
}

function CancelNewUser() {
    $('#dailog').dialog('close');
}

function CheckPictureExtension(File) {
    try {
        var vrFileNameLength = '', vrFileNames = '';
        var fileName = File.files[0].name;
        if (fileName !== "") {
            var fileSize = File.files[0].size;//Actual file size

            //var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".png"];
            var _validFileExtensions = [".jpg"];
            var fileNameExtntion = fileName.split('.').pop();
            fileNameExtntion = fileNameExtntion.toLowerCase();
            //if (fileNameExtntion === "jpg" || fileNameExtntion === "gif" || fileNameExtntion === "jpeg" || fileNameExtntion === "png") {
            if (fileNameExtntion === "jpg") {
                // $("#flAttachUserProfilePic").change(function () {
                readURL(File);
                //});
            }
            else {

                displayMessage(_vrAlert, _vrFileExtension);
                //$("#" + File.id + "").val("");
                $("#" + File.id + "").replaceWith($("#" + File.id + "").clone());

            }
        }
    }
    catch (e) {

    }
}
//Function validations

function UserPhoneValidation(valId) {
    var vrPhoneValId = valId.id;

    var vValue = document.getElementById(vrPhoneValId).value;
    //if (!isNaN(vValue)) {
    if (vValue.length == 0) {
        vValue = '';

    }
    else if (vValue.length < 10) {
        vValue = vValue;
    }
    else if (validateNumeric(vValue) == false) {
        vValue = vValue;
    }
    else if (vValue.length == 10) {
        var vFormattedNo = new String('(' + vValue.substr(0, 3) + ')' + vValue.substr(3, 3) + '-' + vValue.substr(6, 4));
        vValue = vFormattedNo;
    }
    document.getElementById(vrPhoneValId).value = vValue;
}

function validateNumeric(strValue) {
    var objRegExp = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    return objRegExp.test(strValue);
}
function ValidateNewUserEmail(txtBoxName) {
    var varUserEmpEmailID = '';
    var varCheckTextBoxBlurEvent = '';
    if (txtBoxName != _vrUserAlternateEmailTxtBoxName) {
        varUserEmpEmailID = $("#txtNewUserEmail").val();
        varCheckTextBoxBlurEvent = 'txtNewUserEmail';
    }
    else {
        varUserEmpEmailID = $("#txtNewUserAltEmail").val();
        varCheckTextBoxBlurEvent = 'txtNewUserAltEmail';
    }
    if ((varUserEmpEmailID.charCodeAt(0) <= 122 && varUserEmpEmailID.charCodeAt(0) >= 97) || (varUserEmpEmailID.charCodeAt(0) <= 90 && varUserEmpEmailID.charCodeAt(0) >= 65)) {
        var splitemail = varUserEmpEmailID.split("@");
        if (splitemail.length == 2) {
            splitemail[0];
            var count = 0;
            for (var i = 0; i < splitemail[0].length; i++) {
                if ((splitemail[0].charCodeAt(i) <= 47) && (splitemail[0].charCodeAt(i) >= 32)) {
                    var index = splitemail[0].indexOf(splitemail[0].charAt(i));
                    if (index > 0) {
                        var index1 = 1;
                        index1 += index;
                        var splitindex = splitemail[0].indexOf(splitemail[0].charAt(i), index1);
                        if (splitindex > index && splitindex==index1) {
                            count++;
                        }
                    }
                }
            }
            if (count == 0) {
                var re = /^[a-zA-Z0-9_\!#$%^&*()+-]+(\.[a-zA-Z0-9_\!#$%^&*()+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
                if (varUserEmpEmailID == "") {
                    $('#mandatoryUserReqField').css("display", "inline");
                    $('#mandatoryCheckUserEmail').css('display', 'none');
                    return false;
                }
                else if (re.test(varUserEmpEmailID)) {
                    $("#mandatoryCheckUserEmailExist").css("display", "none");
                    $('#mandatoryCheckUserEmail').css('display', 'none');
                    return true;
                }
                else {
                    $("#mandatoryCheckUserEmailExist").css("display", "none");
                    $('#mandatoryCheckUserEmail').css('display', 'inline');
                    $("#divMainLoader").css("display", "none");
                    return false;
                }
            }
            else {
                $("#mandatoryCheckUserEmailExist").css("display", "none");
                $('#mandatoryCheckUserEmail').css('display', 'inline');
                $("#divMainLoader").css("display", "none");
                return false;
            }
        }
        else {
            $('#mandatoryCheckUserEmail').css('display', 'inline');
            $('#mandatoryUserReqField').css("display", "none");
            $("#divMainLoader").css("display", "none");
            return false;
        }
    }
    else {
        if ($.trim(varUserEmpEmailID).length == 0) {
            if (varCheckTextBoxBlurEvent != _vrUserAlternateEmailTxtBoxName) {
                $('#mandatoryCheckUserEmail').css("display", "none");
                //$("#txtNewUserEmail").addClass('error');
                //$('#mandatoryUserReqField').css("display", "inline");
            }
            else {
                return true;
            }
        } else {
            $("#mandatoryCheckUserEmailExist").css("display", "none");
            $("#mandatoryCheckUserEmail").css("display", "inline");
            $("#divMainLoader").css("display", "none");
        }
    }
}
function validateNewUserFields() {
    $(".clsNewUserMandatory").each(function (index) {
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass('error');
        }
    });
    if ($('.error').length > 0) {
        $("#mandatoryUserReqField").css("display", "inline");
         $("#mandatoryCheckUserEmailExist").css("display", "none");
        return false;
    }
    else {
        $("#mandatoryUserReqField").css("display", "none");
        return true;
    } 

}
function SubmitSaveUser() {
    $('#mandatoryUserReqField').val("display", "none");
    if (validateNewUserFields()) {
        _vrCheckDefaultUpdate = _vrCheckUserSave;
        SubmitUser();
    }
}
function SubmitUpdateUser() {
    if (validateNewUserFields()) {
        _vrCheckDefaultUpdate = _vrCheckUserUpdate;
        SubmitUser();
    }
}
function SubmitUser() {
    var flUpload = $("#flAttachUserProfilePic").val();
    var varEmpFirstName = $("#txtNewUserFirstName").val();
    var varEmpLastName = $("#txtNewUserLastName").val();
    var vrUploadingUserName = varEmpFirstName + " " + varEmpLastName;
    //If there is attached file it uploads file and gets file name and it is send as attach file to insert comments..
    $("#divMainLoader").css("display", "block");
    if (flUpload.length != 0) {
        vrUploadingUserName = vrUploadingUserName.replace(/\"/g, '_@-').replace(/\'/g, '@_@');
        vrUploadingUserName = encodeURIComponent(vrUploadingUserName);
        _BaseUrl = _vrLocationOrigin + '/Task/ToFilesUpload?strPicFileName=' + vrUploadingUserName+'&strTokenID=' + _vrUserTokenId;
        if (_vrCheckDefaultUpdate === _vrCheckUserSave) {
            uploadFile(_BaseUrl, SubmitNewUserData, 'flAttachUserProfilePic');
        }
        else {
            uploadFile(_BaseUrl, SaveExistingUserDetail, 'flAttachUserProfilePic');
        }
    }
    else {
        if (_vrCheckDefaultUpdate === _vrCheckUserSave) {
            SubmitNewUserData(''); //If there is no need of upload file will insert data directly.
        }
        else {
            SaveExistingUserDetail('');
        }
    }
}

function SubmitNewUserData(data) {
    var vrAttachedFiles = typeof data.Value === 'undefined' ? '' : data.Value;
    var varEmpFirstName = $("#txtNewUserFirstName").val();
    var varEmpLastName = $("#txtNewUserLastName").val();
    var varRole = $("#ddlNewUserRole option:selected").text();
    var varEmpEmailID = $("#txtNewUserEmail").val();
    var varUserRoleID = $("#ddlNewUserRole").val();
    var varAddress = $("#txtAreaNewUserPreAddr").val();
    var varPhone = $("#txtNewUserContact").val();
    var varEmpDesignationID = $('#ddlNewUserDesignation').val();
    var varNotes = $("#txtNewUserNotes").val();
    var varEmergency_Contact_No = $("#txtNewUserEmerContactNo").val();
    var varRelation_to_Employee = $("#txtNewUserRelatnToUsr").val();
    var varDate_Of_Birth = $("#txtNewUserDateOfBirth").val();
    var varBlood_Group = $("#ddlNewUserBloodGrp").val();
    var varDate_Of_Joining = $("#txtNewUserDateOfJoin").val();
    var varDate_Of_Resignation = $("#txtNewUserResignDate").val();
    var varAltrntEmailID = $("#txtNewUserAltEmail").val();
    var varEmrgncyCntcNme = $("#txtNewUserEmerContactName").val();
    var varEmpBloodDonor = $('#chkNewUserBloodGrp').prop("checked");
    if (varEmpBloodDonor) {
        varEmpBloodDonor = 1;
    }
    else {
        varEmpBloodDonor = 0;
    }
    var varEmpPrflPicNme = vrAttachedFiles;
    var varEmpParmanentAddrs = $("#txtAreaNewUserPerAddr").val();
    var varActive = $("#chkNewUserStatus").prop("checked");
    if (varActive) {
        varActive = 1;
    }
    else {
        varActive = 0;
    }
    var varTimezone = $("#ddlNewUserTimeZone").val();

    if (!(($.trim(varEmpFirstName).length > 0) && ($.trim(varEmpEmailID).length > 0) && ($.trim(varPhone).length > 0) && ($.trim(varDate_Of_Joining).length > 0) && ($.trim(varEmpDesignationID).length > 0))) {
        validateNewUserFields();
        if ($('.error').length > 0) {
            $("#divMainLoader").css("display", "none");
            $("#mandatoryUserReqField").css("display", "inline");
            $("#mandatoryUserReqField").addClass('clsmandatoryuserreqfield');
            $("#mandatoryCheckUserEmailExist").css("display", "none");
            return false;
        }
    }
    else {
        if (ValidateNewUserEmail("txtNewUserAltEmail")) {
            if (ValidateNewUserEmail("txtNewUserEmail")) {
                $("input[type = submit]").attr("disabled", true);
                $("#divMainLoader").css("display", "block");
                var objEmployees = {
                    EmpID: _vrMagnifyUserId,
                    EmpFirstName: varEmpFirstName,
                    EmpLastName: varEmpLastName,
                    Role: varRole,
                    EmpEmailID: varEmpEmailID,
                    UserRoleID: varUserRoleID,
                    Address: varAddress,
                    Phone: varPhone,
                    EmpDesignationID: varEmpDesignationID,
                    Notes: varNotes,
                    Emergency_Contact_No: varEmergency_Contact_No,
                    Relation_to_Employee: varRelation_to_Employee,
                    Date_Of_Birth: varDate_Of_Birth,
                    Blood_Group: varBlood_Group,
                    Date_Of_Joining: varDate_Of_Joining,
                    Date_Of_Resignation: varDate_Of_Resignation,
                    AltrntEmailID: varAltrntEmailID,
                    EmrgncyCntcNme: varEmrgncyCntcNme,
                    EmpBloodDonor: varEmpBloodDonor,
                    EmpPrflPicNme: varEmpPrflPicNme,
                    EmpParmanentAddrs: varEmpParmanentAddrs,
                    Active: varActive,
                    Timezone: varTimezone,
                    TokenID: _vrUserTokenId
                };
                $(".info").html(_vrUserCreatedStatus);

                // _BaseUrl = _vrLocationOrigin + '/User/InsertEmployee';
                _BaseUrl = _vrLocationOrigin + '/User/InsertEmployee';
                ajaxCallToInsertUserObject(_BaseUrl, objEmployees);
                $(".info").html(_vrUserCreatedStatus);
            }
        }
     }
}
    //}
    //$("#divMainLoader").css("display", "none");
function ajaxCallToInsertUserObject(Weburl, NewUserObject) {
    $.ajax({
        type: 'POST',
        url: Weburl,
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(NewUserObject),
        processData: false,
        crossDomain: true,
        dataType: 'json',
        timeout: 18000,
        success: function (data) {
            if (data.ResponseId == _vrResponseId) {

                
              //  $('#txtUserSearch').val("");

                if ($('#MagnifierDialog').dialog("isOpen") === true) {
                    var vrUserNameView = $("#txtNewUserFirstName").val() + " " + $("#txtNewUserLastName").val();
                    var vrUserMobileView = $("#txtNewUserContact").val();
                    var vrUserAddressView = $("#txtAreaNewUserPreAddr").val();
                    userValueLink(_vrMagnifyUserId, vrUserNameView, vrUserMobileView, vrUserAddressView);
                    $("#MagnifierDialog").parent().find('button').attr("disabled", true);
                }
                LoadUserDataToWidget();
                LoadCountDataToCustUserProjSilde();//To reload count for users.
                $('#dailog').dialog('close');
                _vrCustomerCreation = '';
                showStatusDiv();
                if (_vrMagnifyUserId == _EmpId) {//To set the employee display name in whole application.(Bug ID:5615)
                var vrDisplayName = _vrUserFirstName + " " + _vrUserLastName;
                $("#lblLogin").text(vrDisplayName);
                localStorage.setItem("LoggedEmpName", vrDisplayName);
                }
            }
            else {
                if (data.ResponseId == _vrCheckUserResponseID) {
                    $("#mandatoryCheckUserEmailExist").css("display", "inline");
                    $("#mandatoryCheckUserEmailExist").addClass('clsmandatoryuserreqfield');
                }
                $("#divMainLoader").css("display", "none");
            }
            if (data.ResponseId == _vrErrResponseId) {
                displayError();
                $("#divMainLoader").css("display", "none");
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
            displayError();
            return false;
        }
    });
}
//function to update existing user
function UpdateExistingUser(UserId) {
    try {
        ResetUserFields();
        $("#mandatoryUserReqField").css("display", "none");
        $("#mandatoryCheckUserEmail").css("display", "none");
        $("#mandatoryCheckUserEmailExist").css("display", "none");
        createNewUser();
        $('#btnSaveNewUser').css("display", "none");
        $('.clsshowonupdate').css("display", "inline-block");
        $('#dailog').dialog('option', 'title', _vrUpdateDialogBoxUser);
        _vrDialogBoxTitle = _vrUpdateDialogBoxUser;
    }
    catch (e) {

    }
}
//function to bind the values to the fields

function checkUsersDataNBind(source) {
    try {
        var data = source;
        var vrEmpPic = typeof data.EmpPrflPicNme == 'undefined' || data.EmpPrflPicNme.length == 0 ? _vrUploadEmpPicdefault : _vrMainWebstationPath + data.EmpPrflPicNme;
        var vrEmpBloodGrp = typeof data.EmpBloodGrp == 'undefined' || data.EmpBloodGrp == '0' || $.trim(data.EmpBloodGrp).length == 0 ? '0' : data.EmpBloodGrp;
        $("#txtNewUserFirstName").val(data.EmpFirstName);
        $("#txtNewUserLastName").val(data.EmpLastName);
        $("#txtNewUserDateOfBirth").val(data.Date_Of_Birth);
        $("#txtNewUserEmail").val(data.EmpEmailID);
        $("#txtNewUserAltEmail").val(data.AltrntEmailID);
        $("#txtNewUserContact").val(data.Phone);
        $("#txtNewUserDateOfJoin").val(data.Date_Of_Joining);
        $("#ddlNewUserBloodGrp").val(vrEmpBloodGrp);
        $("#ddlNewUserDesignation").val(data.EmpDesignationID);
        $("#ddlNewUserRole").val(data.UserRoleID);
        if (_UserRoleId == _vrClientRoleId || _UserRoleId == _vrUserRoleId) {
            $("#ddlNewUserRole").attr('disabled', 'true');
        }
        $("#txtNewUserResignDate").val(data.Date_Of_Resignation);
        $("#txtAreaNewUserPreAddr").val(data.Address);
        $("#txtAreaNewUserPerAddr").val(data.EmpParmanentAddrs);
        
        $("#txtNewUserNotes").val(data.Notes);
        if ((typeof data.TimeZone == undefined)||(data.TimeZone.length==0)) {
            $("#ddlNewUserTimeZone").val(_vrIndiaStandardTime);
        }
        else {
            $("#ddlNewUserTimeZone").val(data.TimeZone);
        }
        $("#txtNewUserEmerContactName").val(data.EmrgncyCntcNme);
        $("#txtNewUserEmerContactNo").val(data.Emergency_Contact_No);
        $("#txtNewUserRelatnToUsr").val(data.Relation_to_Employee);
        $("#txtEmpGeneratedCode").val(data.EmpGeneratedCode);
        //$("#userProfilePicture").removeAttr("src");
        $("#userProfilePicture").attr("src", vrEmpPic+'?timestamp='+new Date().getTime());// As everytime the request was not being made to the server so timestamp was included.
        _vrEmpProfilePicImage = typeof data.EmpPrflPicNme == 'undefined' || data.EmpPrflPicNme.length == 0 ? '' : data.EmpPrflPicNme;

        if (data.Active == 1) {
            $('#chkNewUserStatus').prop("checked", true);
        }
        else {
            $('#chkNewUserStatus').prop("checked", false);
        }
        if (data.EmpBloodDonor === 1) {
            $('#chkNewUserBloodGrp').prop("checked", true);
        }
        else {
            $('#chkNewUserBloodGrp').prop("checked", false);
        }
        $("#divMainLoader").css("display", "none");
    } catch (e) {
        $("#divMainLoader").css("display", "none");
    }
}

//function to clear the values to the fields
function ResetUserFields() {
    $('.clsClearNewUserFields').val('');
    $('.clsClearNewUserFields').removeClass('error');
    $("#mandatoryCheckUserEmail").css("display", "none");
    $("#userProfilePicture").attr("src", _vrUploadEmpPicdefault);
    $("#mandatoryCheckUserEmailExist").css("display", "none");
    $('#mandatoryUserReqField').css("display", "none");
    $('#mandatoryUserNameReqField').css("display", "none");
    $('#mandatoryUserContactReqField').css("display", "none");
    $("#chkNewUserBloodGrp").prop("checked", false);
    $("#chkNewUserStatus").prop("checked", true);
    $("#flAttachUserProfilePic").replaceWith($("#flAttachUserProfilePic").clone());
}
//function to Update the User values into the database
function SaveExistingUserDetail(data) {
    var vrAttachedFiles = typeof data.Value === 'undefined' ? '' : data.Value;
    var varEmpFirstName = $("#txtNewUserFirstName").val();
    _vrUserFirstName = varEmpFirstName;//saving the values to set in the dashboard
    var varEmpLastName = $("#txtNewUserLastName").val();
    _vrUserLastName = varEmpLastName;
    var varRole = $("#ddlNewUserRole option:selected").text();
    var varEmpEmailID = $("#txtNewUserEmail").val();
    var varUserRoleID = $("#ddlNewUserRole").val();
    var varAddress = $("#txtAreaNewUserPreAddr").val();
    var varPhone = $("#txtNewUserContact").val();
    var varEmpDesignationID = $('#ddlNewUserDesignation').val();
    var varNotes = $("#txtNewUserNotes").val();
    var varEmergency_Contact_No = $("#txtNewUserEmerContactNo").val();
    var varRelation_to_Employee = $("#txtNewUserRelatnToUsr").val();
    var varDate_Of_Birth = $("#txtNewUserDateOfBirth").val();
    var varBlood_Group = $("#ddlNewUserBloodGrp").val();
    var varDate_Of_Joining = $("#txtNewUserDateOfJoin").val();
    var varDate_Of_Resignation = $("#txtNewUserResignDate").val();
    var varAltrntEmailID = $("#txtNewUserAltEmail").val();
    var varEmrgncyCntcNme = $("#txtNewUserEmerContactName").val();
    var varEmpBloodDonor = $('#chkNewUserBloodGrp').prop("checked");
    if (varEmpBloodDonor) {
        varEmpBloodDonor = 1;
    }
    else {
        varEmpBloodDonor = 0;
    }
    if (vrAttachedFiles.length > 0) {
        varEmpPrflPicNme = vrAttachedFiles;
    }
    else {
        varEmpPrflPicNme = _vrEmpProfilePicImage;
    }
    var varEmpParmanentAddrs = $("#txtAreaNewUserPerAddr").val();
    var varActive = $("#chkNewUserStatus").prop("checked");
    if (varActive) {
        varActive = 1;
    }
    else {
        varActive = 0;
    }
    var varTimezone = $("#ddlNewUserTimeZone").val();

    if (!(($.trim(varEmpFirstName).length > 0) && ($.trim(varEmpEmailID).length > 0) && ($.trim(varPhone).length > 0) && ($.trim(varDate_Of_Joining).length > 0) && ($.trim(varEmpDesignationID).length > 0))) {
        validateNewUserFields();
        if ($('.error').length > 0) {
            $("#divMainLoader").css("display", "none");
            $("#mandatoryUserReqField").css("display", "inline");
            $("#mandatoryUserReqField").addClass('clsmandatoryuserreqfield');
            return false;
        }
    }
    else {
        if (ValidateNewUserEmail("txtNewUserAltEmail")) {
            if (ValidateNewUserEmail("txtNewUserEmail")) {
                $("#divMainLoader").css("display", "block");
                var objEmployees = {
                    EmpID: _vrMagnifyUserId,
                    EmpFirstName: varEmpFirstName,
                    EmpLastName: varEmpLastName,
                    Role: varRole,
                    EmpEmailID: varEmpEmailID,
                    UserRoleID: varUserRoleID,
                    Address: varAddress,
                    Phone: varPhone,
                    EmpDesignationID: varEmpDesignationID,
                    Notes: varNotes,
                    Emergency_Contact_No: varEmergency_Contact_No,
                    Relation_to_Employee: varRelation_to_Employee,
                    Date_Of_Birth: varDate_Of_Birth,
                    Blood_Group: varBlood_Group,
                    Date_Of_Joining: varDate_Of_Joining,
                    Date_Of_Resignation: varDate_Of_Resignation,
                    AltrntEmailID: varAltrntEmailID,
                    EmrgncyCntcNme: varEmrgncyCntcNme,
                    EmpBloodDonor: varEmpBloodDonor,
                    EmpPrflPicNme: varEmpPrflPicNme,
                    EmpParmanentAddrs: varEmpParmanentAddrs,
                    Active: varActive,
                    Timezone: varTimezone,
                    TokenID: _vrUserTokenId
                };
                $(".info").html(_vrUserUpdatedStatus);
                _BaseUrl = _vrLocationOrigin + '/User/UpdateEmployee';
                ajaxCallToInsertUserObject(_BaseUrl, objEmployees);

            }
        }
        }
    }

function ValidationForNumeric(objControl) {
    objControl.keydown(function (e) {
        if (!((e.which == 8) || (e.which > 47 && e.which < 58) || (e.which > 95 && e.which < 106) || (e.which == 9))) {
            return false;
        }
        else {
            return true;
        }
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#userProfilePicture').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function bindRecordsCount(source) {
    var data = source;
    var vrAdminCount = data[0].admincount;
    var vrUsersCount = data[0].userscount;
    vrAdminCount = $.trim(vrAdminCount).length > _vrMinTextLength ? CropTextHtmlSingleElipses(vrAdminCount, _vrUsersSliderTextLength) : vrAdminCount;
    vrUsersCount = $.trim(vrUsersCount).length > _vrMinTextLength ? CropTextHtmlSingleElipses(vrAdminCount, _vrUsersSliderTextLength) : vrUsersCount;
    $("#lblActiveCust").text(data[0].customeractivecount);
    $("#lblAllCust").text(data[0].customercount);
    $("#lblActiveProjects").text(data[0].projectactivecount);
    $("#lblAllProj").text(data[0].projectcount);
    $("#lblActiveAdmin").text(data[0].admincount);
    $("#lblActiveEmp").text(data[0].userscount);
    $("#lblActiveClients").text(data[0].customerCredcount);

}

function CropTextHtmlSingleElipses(text, length) {
    if (text.length > length) {
        var vrText = text.substr(0, length) + '.';
        return vrText;
    }
    else {
        return text;
    }
}

