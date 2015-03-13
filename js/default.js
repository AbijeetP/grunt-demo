$(document).ready(function () {
    var vrLoginMail = '', vrLoginPsw = '';
    //Initialises forgot password fields.
    
   // initializeCommDialog('dgForgotPassword', '450', '140');
    //Initialises info about expiration of mail link for reset password.
   // initializeCommDialog('dgLnkExpiration', '450', '140');
    //Initialises with reset password fields.
   // initializeCommDialog('dgResetPassword', '450', '140');
    //Initialises to show error in jquery ui dialog box.
  //  initializeCommDialog('divError', '450', '255');
   // $(".clsErrorText").html(_vrErrorMsg);
    //$('#divError').dialog('option', 'title', _vrAlert);
    var todayDate = new Date();
    $("#lblCopyRightYear").text(todayDate.getFullYear());
    //$("#txtEmail").focus();
    // $('#dgResetPassword').dialog('open');
    //To catch enter event and triggers on login button.
    $('.clsInput').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $("#btnLogin").click();
            return false;
        }
    });
    //$(".clsInput").focus(function () {
    //    $("#divInvlaidCred").css("display", "none");
    //});
    //To verify querystring and opens dialog fields with reset password fields
    var queryString = new Array();
    if (window.location.search.split('?').length > 1) {
        var params = window.location.search.split('?')[1].split('&');
        for (var i = 0; i < params.length; i++) {
            var key = params[i].split('=')[0];
            var value = decodeURIComponent(params[i].split('=')[1]);
            queryString[key] = value;
        }
        _VrFrgtPswrdGuid = queryString["FrgtPswrd"];
        _BaseUrl = _vrLocationOrigin + '/User/CheckFrgtPswGuidStatus?strGuid=' + encodeURIComponent(_VrFrgtPswrdGuid);
        returnBool(_BaseUrl, showDailogBasedGuid);
    }
    if ($.trim(_VrFrgtPswrd).length != 0) {
        $('#dgResetPassword').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
    }
    //Remember me functionality
    //if ($.cookie("LoggedEmaiId") != null && $.cookie("LoggedPassword") != null) {
    //    var vrEmailId = $.cookie("LoggedEmaiId");
    //    var vrPersonPassword = $.cookie("LoggedPassword");
    //    $("#txtEmail").val(vrEmailId);
    //    $("#txtPassword").val(vrPersonPassword);
    //    $("#chkRememberMe").prop('checked',true);
    //}
    if (localStorage.getItem("LoggedEmailId") != null &&localStorage.getItem("LoggedPassword") != null) {
        var vrEmailId = localStorage.getItem("LoggedEmailId");
        var vrPersonPassword = localStorage.getItem("LoggedPassword");
        $("#txtEmail").val(vrEmailId);
        $("#txtPassword").val(vrPersonPassword);
        $("#chkRememberMe").prop('checked', true);
    }
    //END of using remembe me functinoality
    //Triggers by clicking on login.
    $("#btnLogin").click(function () {
        vrLoginMail = $.trim($("#txtEmail").val());
        vrLoginPsw = $.trim($("#txtPassword").val());
        if (vrLoginMail.length > 0 && vrLoginPsw.length > 0) {
            $("#imgLoginLoader").css("display", "inline");
        }
        else {
            if (vrLoginMail.length == 0 && vrLoginPsw.length == 0) {
                $("#lblInvalid").text(_vrValidateBoth);
                $("#divInvlaidCred").css("display", "block");
            }
            else if (vrLoginPsw.length == 0) {
                $("#lblInvalid").text(_vrValidatePsw);
                $("#divInvlaidCred").css("display", "block");
            }
            else if (vrLoginMail.length == 0) {

                $("#lblInvalid").text(_vrValidateEmail);
                $("#divInvlaidCred").css("display", "block");

            }
            return false;
        }
        var vrRememberMeChecked = $("#chkRememberMe").prop('checked');
        //if (vrRememberMeChecked) {
        //    $.cookie("LoggedEmailId", vrLoginMail, { expires: 365 });
        //    $.cookie("LoggedPassword", vrLoginPsw, { expires: 365 });
        //} else {
        //    $.removeCookie("LoggedEmailId");
        //    $.removeCookie("LoggedPassword");
        //}
        if (vrRememberMeChecked) {
            localStorage.setItem("LoggedEmailId",vrLoginMail);
            localStorage.setItem("LoggedPassword", vrLoginPsw);
            
        } else {
            localStorage.clear();
        }
        var _BaseUrl = _vrLocationOrigin + '/USer/EncryptPswrd';
        var objUserValidate = {
            EmpUserName: vrLoginMail,
            EmpPassword:vrLoginPsw
        }
        $.ajax({
            type: 'POST',
            url: _BaseUrl,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(objUserValidate),
            processData: false,
            crossDomain: true,
            dataType: 'json',
            timeout: 18000,
            success: function (data) {
                if (data.RecordCount == '1') {
                    var validated = data.SingleResult;
                    var EmpName = validated.EmpFirstName + ' ' + validated.EmpLastName;
                    var EmpId = validated.EmpID;
                    var vrTokenId = validated.TokenId;
                    var EmpRoleId = validated.UserRoleID;
                    var vrProjManager = validated.IsProjectManager;
                    $.cookie("LoggedNow", _vrLoggedCheckDefault);
                    localStorage.setItem("LoggedEmpId", EmpId);
                    localStorage.setItem("LoggedEmpName", EmpName);
                    localStorage.setItem("LoggedUserRole", EmpRoleId);
                    localStorage.setItem("LoggedUserTokenId", vrTokenId);
                    localStorage.setItem("LoggedIsProjManager", vrProjManager);
                    clearLocalStorage();
                    window.location.href = "home.html";//?EmpID=" + encodeURIComponent(validated.EmpID) + "&EmpName=" + encodeURIComponent(EmpName);
                }
                else {
                    $("#lblInvalid").text(_vrValidateCred);
                    $("#divInvlaidCred").css("display", "block");
                    $("#imgLoginLoader").css("display", "none");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#divError').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
                $("#imgLoginLoader").css("display", "none");
                return false;
            }
        });
    });
    //For forgot password dialog box.
    $("#lblForgotPassword").click(function () {
        //$(".ui-dialog-titlebar").css("font-size", "14px");
        //$("#txtForgotEmail").css("line-height","20px");
        //$('#dgForgotPassword').dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
        $('#dgForgotPassword').dialog('open');
        $("#txtForgotEmail").val('');
    });

    /*$("#txtForgotEmail").focus(function () {
        $("#lblEmailEmpty").css("display", "none");
    });*/
    //Sends email for provided mail id.
    $("#btnReset").click(function () {
        var vrEmpEmail = $("#txtForgotEmail").val();
        if (vrEmpEmail.length > 0) {
            _BaseUrl = _vrLocationOrigin + '/User/CheckIfUserExists?strEmpEmail=' + encodeURIComponent(vrEmpEmail);
            returnBool(_BaseUrl, EmailUser);
            $('#dgForgotPassword').dialog('close');
        }
        else {
            $("#lblEmailEmpty").css("display", "inline");
        }
    });
    $("#btnResetPsw").click(function () {
        if ($("#txtNewPassword").val() == $("#txtReNewPassword").val()) {
            $("#lblPswInfo").css("display", "none");
        } else {
            $("#lblPswInfo").css("display", "inline");
        }

    });
    $("#btnCloseErrDialog").click(function () {
        $('#divError').dialog('close');
    });
});

//About result message after sending mail to provided mail id.
function EmailUser(data) {
    if (data == true) {

        // alert(_vrCheckMailInfo);

    }
    else {
        // alert(_vrMailidMessage);
    }
}

function showDailogBasedGuid(data) {

}