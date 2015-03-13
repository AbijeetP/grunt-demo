
var vrProjId = '', vrInProgTasks = '', vrProjectName = '', vrProjectManager = '', vrProjVersionNumber = '', vrProjManagersIds = '', vrProjectManagers = '', vrProjectNameShow = '', _vrFirstTimeProjectLoading = '1', _vrProjectLoaded = '';
var rowIDs = new Array();
var SprintStatus = '', vrJqxId = '';
var _vrSprintStatus = '';
$(document).ready(function () {
    $("#addrowbutton").jqxButton();
    $('.clspercentagenumeric').keypress(function (event) {
        if (event.keyCode >= 48 && event.keyCode <= 57) {

        }
        else {
            return false;
        }
    });
    $('.clspercentagenumeric').keypress(function (event) {
        if (event.keyCode >= 48 && event.keyCode <= 57) {

        }
        else {
            return false;
        }
    });
    $(".gridster").on("click", "#btnRefreshProjectsGrid", function () {
        _projIndexNO = -1;
        $("#btnMagnifyProject").attr("disabled", true);
        _vrSelProjStatus = '', _vrSelProjCustomer = '';
        $("#divProjectLoading").css("display", "block");
        $("#txtProjTrProjects").val("");
        fetchProjectsData();
        LoadCountDataToCustUserProjSilde();
        $("#btnMagnifyProject").attr("disabled", false);
        $("#divProjectLoading").css("visibility", "none");

    });
    $(".gridster").on("click", "#btnProjectResetSearch", function () {
        $("#txtProjTrProjects").val("");
        filterProjectsJqxGrid();
    });

    $("#ddlFirstReleaseVersion").change(function () {
        var ddlFirstReleaseVal = $("#ddlFirstReleaseVersion option:selected").text();
        $("#ddlFirstReleaseVersion").prop('title', ddlFirstReleaseVal);
    });
    $("#ddlSecondReleaseVersion").change(function () {
        var ddlSecondReleaseVal = $("#ddlSecondReleaseVersion option:selected").text();
        $("#ddlSecondReleaseVersion").prop('title', ddlSecondReleaseVal);
    });
    $("#divCreateNewProject").on("change", ".error", function () {
        if ($.trim($(this).val()).length > 0) {
            $(this).removeClass("error");
            if ($("#divCreateNewProject .error").length == 0) {
                $(".clserrorprojlbl").css("display", "none");
            }
        }
    });
    //$("#JqxGridSprint").on('cellendedit', function (event) {
    //    var args = event.args;
    //    var columnDataField = args.datafield;
    //    var rowIndex = args.rowindex;
    //    var cellValue = args.value;
    //    var oldValue = args.oldvalue;
    //    $('#JqxGridSprint').jqxGrid('render');
    //});
    $("#divProjAttachedFiles").on("click", ".clsupdatedprojectfileremove", function () {
        var vrProjectStrikenVal = $(this).closest('.clsprojattachedfiles').find('a').prop("title");
        $(this).closest('.clsprojattachedfiles').addClass('clsremoveprojectfileonupdate');
        $(this).css("display", "none");
        $(this).closest('.clsprojattachedfiles').find('.clsprojfileremovecancel').css("display", "inline");

    });
    $("#divProjAttachedFiles").on("click", ".clsprojfileremovecancel", function () {
        var vrProjectStrikenVal = $(this).closest('.clsprojattachedfiles').find('a').prop("title");
        $(this).closest('.clsprojattachedfiles').removeClass('clsremoveprojectfileonupdate');
        $(this).css("display", "none");
        $(this).closest('.clsprojattachedfiles').find('.clsupdatedprojectfileremove').css("display", "inline");
    });


});
function fetchProjectsData() {
    $("#divProjectLoading").css("display", "block");
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
    ajaxCallWithObject(_BaseUrl, objProjectDetails, bindProjectsData);
}

function bindProjectsData(source) {
    try {
        var vrSortColumnName = '', vrSortOrder = '';
        var data = '';
        if (source.RecordCount > 0) {
            data = source.MultipleResults[0].LstProjects;
        } else {
            data = [];
        }
        var colsort = sortingcolumns("jqxProjectsGrid");
        vrSortColumnName = colsort.vrSortColumnName;
        vrSortOrder = colsort.vrSortOrder;
        _vrProjectsData = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrProjDataFields,
            localdata: data,
            pagesize: _vrDefaultProjSizer
        };
        $("#ddlProjCustomer").empty();
        $("#ddlProjTrStatus").empty();
        $("#ddlProjectStatus").empty();
        $("#ddlProjCustomer").append("<option value='0'>Select customer</option>");
        $("#ddlProjTrStatus").append("<option value='0'>Select status</option>");
        bindDataToDropDown(source.MultipleResults[0].LstCustomers, 'ddlProjCustomer', 'CustomerID', 'CompanyName');
        bindDataToDropDown(source.MultipleResults[0].LstProjStatus, 'ddlProjTrStatus', 'StatusId', 'StatusType');
        bindDataToDropDown(source.MultipleResults[0].LstProjStatus, 'ddlProjectStatus', 'StatusId', 'StatusType');
        if (_vrSelProjStatus.length > 0) {
            $("#ddlProjTrStatus").val(_vrSelProjStatus);
        } else {
            $("#ddlProjTrStatus").val(_vrInProgId);
        }
        if (_vrSelProjCustomer.length > 0) {
            $("#ddlProjCustomer").val(_vrSelProjCustomer);
        }
        if (_projIndexNO > -1) {
            var vrProjStatusVal = parseInt(_vrWidgetCOntrolData[_projIndexNO].ddlProjTrStatus)
            if ((vrProjStatusVal > 0) && (vrProjStatusVal != NaN)) {
                $("#ddlProjTrStatus").val(vrProjStatusVal);
            }
            var vrProjVal = parseInt(_vrWidgetCOntrolData[_projIndexNO].ddlProjCustomer)
            if ((vrProjVal > 0) && (vrProjVal != NaN)) {
                $("#ddlProjCustomer").val(vrProjVal);
            }
            $("#txtProjTrProjects").val(_vrWidgetCOntrolData[_projIndexNO].txtProjTrProjects);
            _projIndexNO = -1;
        }
        //_vrFirstTimeProjectLoading = _vrProjectLoaded;
        if ($(".clsprojwidget #divProjectsTrail").length == '0') {
            loadJqxProjectsGrid();
        } else {
            bindDataToJqx("jqxProjectsGrid", _vrProjectsData, _vrProjColumns, _vrProjectsGridWidth);
            filterProjectsJqxGrid();
        }
        if (_UserRoleId == _vrClientRoleId) {
            $(".search-wrapper-proj").css("margin-left", "160px");
        }

        $("#btnMagnifyProject").attr("disabled", false);
        // $("#divProjectLoading").css("display", "none");
        //$("#divMainLoader").css("display", "none");
        $("#btnCreateProject").css("disabled", false);
        CheckBrowserNAddCSS();
        LoadPageNumForProj();
        setRecordCountPosition("jqxProjectsGrid");//To set pager count position in jqxgrid up on dynamically adding.
        sortOrderUserPref("jqxProjectsGrid", vrSortColumnName, vrSortOrder);

    } catch (e) {

    }

}

var linkrenderer_projects = function (row, column, value) {

    return linkrendervalues('jqxProjectsGrid', row, column, value);
}
var linkrenderer_projectsmagnifier = function (row, column, value) {

    return linkrendervalues('jqxPreviewGrid', row, column, value);
}

var linkrenderer_projectname = function (row, column, value) {
    return linkrendererprojectnamevalues('jqxProjectsGrid', row, column, value);
}
var linkrenderer_projectnamemagnifier = function (row, column, value) {
    return linkrendererprojectnamevalues('jqxPreviewGrid', row, column, value);
}

var linkrendervalues = function (jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            vrInProgTasks = rowdata['InProgressTasks'];
            vrProjId = rowdata['ProjectID'];
            vrProjectName = convertDoubleSingleQuotetoChar(rowdata['ProjectName']);
            vrProjectManager = convertDoubleSingleQuotetoChar(rowdata['ProjectManager']);
            // vrProjVersionNumber = convertDoubleSingleQuotetoChar(rowdata['VersionNumber']);
        }
        // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
        return "<div><a href='#' onclick='projInProgLink(" + vrProjId + "," + vrProjectName + "," + vrProjectManager + ")' class='clsprojinprogcount'>" + vrInProgTasks + "</a></div>";
    } catch (e) {

    }
}

var linkrendererprojectnamevalues = function (jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            vrInProgTasks = rowdata['InProgressTasks'];
            vrProjId = rowdata['ProjectID'];
            vrProjectNameShow = $.trim(rowdata['ProjectName']);
            vrProjectName = convertDoubleSingleQuotetoChar(rowdata['ProjectName']);
            vrProjectManager = convertDoubleSingleQuotetoChar(rowdata['ProjectManager']);
            // vrProjVersionNumber = convertDoubleSingleQuotetoChar(rowdata['VersionNumber']);
        }
        // return "<label class='clsprojinprogcount'>" + vrInProgTasks + "</label>";
        return "<div  class='clsprojnameprojects clsaddellipsis'><a href='#' onclick='projInProgLink(" + vrProjId + "," + vrProjectName + "," + vrProjectManager + ")'>" + vrProjectNameShow + "</a></div>";
    } catch (e) {

    }

}

//var linkrenderer_projectmanagers = function (row, column, value) {
//    var rowdata = $('#jqxProjectsGrid').jqxGrid('getrowdata', row);
//    try {
//        vrProjManagersIds = JSON.stringify(rowdata['ProjectManagerIds']);
//        if (vrProjManagersIds.indexOf(',')>-1) {
//        vrProjectManagers = JSON.stringify(rowdata['ProjectManager']);
//    }else{
//    vrProjectManagers='Multiple managers';
//    }
//        return "<div class='clsprojectmanagers'>" + JSON.parse(vrProjectManagers) + "</div>";
//    } catch (e) {

//    }
//}


//var linkrenderer_projectmanagersmagnifier = function (row, column, value) {
//    var rowdata = $('#jqxPreviewGrid').jqxGrid('getrowdata', row);
//    try {
//        vrProjManagersIds = JSON.stringify(rowdata['ProjectManagerIds']);
//        if (vrProjManagersIds.indexOf(',') > -1) {
//            vrProjectManagers = JSON.stringify(rowdata['ProjectManager']);
//        } else {
//            vrProjectManagers = 'Multiple managers';
//        }
//        return "<div class='clsprojectmanagers'>" + vrProjectManagers + "</div>";
//    } catch (e) {

//    }
//}
$('#txtProjTrProjects').on("mouseleave", function () {
    //$("p:first", this).text("mouse leave");
    //$("p:last", this).text(++n);
    $('#txtProjTrProjects').css('cursor', 'none');
})
function projInProgLink(projId, projectName, projectManager) {
    _vrReportMagnifyStatus = "";
    var vrdialogTitleInProj = $('#MagnifierDialog').dialog('option', 'title');
    if (vrdialogTitleInProj == _vrProjectsTitle) {
        _vrLocalTaskDataOnProjClick = null;
        _vrLocalTaskDataOnProjClick = JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"));
    }
    else {
        if (vrdialogTitleInProj != _vrProjDetDialogHdr) {
            _vrLocalTaskDataOnProjClick = null;
            _vrLocalTaskDataOnProjClick = JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"));
        }
    }
    _vrProjDialogOpen = 1;
    //$('#txtProjTrProjects').css('cursor', 'pointer');
    $(".clslblgetvalue").text("");
    try {
        var vrMaginifierDialogName = $("#MagnifierDialog").dialog("option", "title");
        if (vrMaginifierDialogName == _vrDialogBoxCustomerTrail) {
            _vrTaskDataOnCPUOnTaskClick = null;
            _vrTaskDataOnCPUOnTaskClick = $('#jqxPreviewGrid').jqxGrid('getpaginginformation');
        }
        checkWidgetsAndAppend();
        projectName = convertCharToDoubleSingle(projectName);
        projectManager = convertCharToDoubleSingle(projectManager);
        //projVersionNumber = convertCharToDoubleSingle(projVersionNumber);
        $("#divMainLoader").css("display", "block");
        $("#divMagnifyHdrTitle").css("display", "block");
        _vrSelectedProjectProjId = projId;
        $("#lblMagfieldtext1").text(_vrProjectNameLbl);
        $("#lblMagfieldtext2").text(_vrProjectManagerLbl);
        $("#lblMagfieldtext3").text("");
        $("#lblMagFieldVal1").text(projectName);
        projectManager = typeof projectManager != 'undefined' ? projectManager : '';


        // projVersionNumber = projVersionNumber == '!^' || projVersionNumber == '.' ? '' : projVersionNumber;
        //projVersionNumber = typeof projVersionNumber != 'undefined' ? projVersionNumber.replace(/\!\^/g, '.') : projVersionNumber;

        cropText($("#lblMagFieldVal2"), projectManager, _vrTextFieldUserManagerLen);
        //$("#lblMagFieldVal3").text(projVersionNumber);//write version number
        $("#lblMagFieldVal3").text("");
        //$("#ddlTaskTrailEmployee").val(_vrDefaultTskTrEmp);
        _BaseUrl = _vrLocationOrigin + '/Task/GetInProgTasksByProjId?intProjId=' + _vrSelectedProjectProjId + '&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindInProgTasks);
        event.preventDefault();
    } catch (e) {

    }

}

function bindInProgTasks(source) {
    $(".clsmagnifyeditbuttons").css("display", "none");
    if (_UserRoleId != _vrClientRoleId) {
        $("#btnEditProject").css("display", "inline");
    }
    var data = source;
    if ($("#MagnifierDialog").dialog("isOpen") === false) {
        //selectCount = 0;
        openMagnifyDialogBox(_vrProjDetDialogHdr, 'jqxPreviewGrid', _vrDefaultPreviewPager);
    } else {
        _vrMagnifyCloneTitle = _vrProjDetDialogHdr;
        $('#MagnifierDialog').dialog('option', 'title', _vrProjDetDialogHdr);
    }
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
        if (_vrTaskDataOnCPUOnTaskClick != null) {
            $("#jqxPreviewGrid").jqxGrid({ source: _vrProjectsTasksData });
            $("#jqxPreviewGrid").jqxGrid('gotopage', _vrTaskDataOnCPUOnTaskClick.pagenum);
        }
        else {
            $("#jqxPreviewGrid").jqxGrid({ source: _vrProjectsTasksData });
        }
        _vrTaskDataOnCPUOnTaskClick = null;
        disableJqxPagerButtonsOnLoad("jqxPreviewGrid");
        $("#jqxPreviewGrid").on("pagechanged", function (event) {
            disableEnablePagingButtons("jqxPreviewGrid", event);
        });
    }
    _vrJqxMagnifyLoadedFlag = _vrTasksMagnifyLoaded;
    //event.preventDefault();
    $("#divMainLoader").css("display", "none");
    $("#imgMagnifydialogLoader").css("display", "none");

}

function editProjectProfile() {

    //$("#MagnifierDialog").dialog('close');
    createNewProject(_vrGetProjDataById);
    _vrSetProjUpdateFlag = _vrGetProjDataById;

}


function bindProjectData(data) {
    $(".clsupdateprojfields").css("display", "inline");
    $("#btnSaveNewProject").css("display", "none");
    $("#ddlFirstReleaseVersion").css("display", "none");
    $("#ddlSecondReleaseVersion").css("display", "none");
    $("#ddlFirstReleaseVersion").empty();
    $("#ddlSecondReleaseVersion").empty();
    var source = data;
    var data = data[0];
    var vrVersionNum = data.VersionNumber.split('!^');
    var vrVersionReleaseDate = data.VersionReleaseDate.split('_');
    var vrGetPrjManagers = data.ProjectManager != 'undefined' && data.ProjectManager != '0' ? getInformPersonNames('ddlNewProjManager', data.ProjectManager) : '';
    var vrGetInfrmUpdates = data.InformUpdates != 'undefined' && data.InformUpdates != '0' ? getInformPersonNames('ddlNewProjManager', data.InformUpdates) : '';


    var items = $("#JqxWidget").jqxDropDownList('getItems');/* Code written by Anvesh.p regarding the checking of proj managers---Start */
    var varCheckEmpList = data.InformUpdates.split(",");
    if (varCheckEmpList.length == items.length - parseInt(1)) {
        $("#JqxWidget").jqxDropDownList('checkIndex', 0);
    }
    else {
        var itemsEmpID = '';
        for (var i = 0; i < items.length; i++) {
            if (i != items.length - 1) {
                itemsEmpID += items[i].value + ",";
            }
            else { itemsEmpID += items[i].value; }
        }
        var varItemsAllEmpID = itemsEmpID.split(",");
        var vrIndexTobeChecked;

        for (var j = 0; j < varCheckEmpList.length; j++) {
            if (varCheckEmpList[j] != "Select all") {
                vrIndexTobeChecked = varItemsAllEmpID.indexOf(varCheckEmpList[j]);
                $("#JqxWidget").jqxDropDownList('checkIndex', vrIndexTobeChecked);
            }
        }
    }/*End*/
    _vrNewProjectAttachedFiles = typeof data.ProjectAtchDocmnt != 'undefined' ? data.ProjectAtchDocmnt : '';
    var vrProjAttachedFiles = _vrNewProjectAttachedFiles != '' ? _vrNewProjectAttachedFiles.split('~') : '';
    $.each(vrProjAttachedFiles, function (index, value) {
        if ($.trim(value).length > 0) {
            $("#divProjAttachedFiles").css("border", "1px solid rgb(210, 208, 208)");
            $("#divProjAttachedFiles").append("<div class='clsprojattachedfiles'><a href='" + _vrAttachedFilesPath + value + "' title='" + value + "' target='_blank'>" + CropTextHtml(value, _vrUpdateLimitFileName) + "</a><img src='img/closeicon.ico' class='clsupdatedprojectfileremove'/><img src='img/revert.ico' class='clsprojfileremovecancel'/></div>");
        }
    });
    if ($.trim(vrVersionReleaseDate[0]).length > 0 && vrVersionReleaseDate[0] != 'undefined') {
        $("#ddlFirstReleaseVersion").css("display", "inline");
        if ($('#ddlFirstReleaseVersion option[value="' + vrVersionReleaseDate[0] + '"]').length == 0) {
            $("#ddlFirstReleaseVersion").append("<option value='" + vrVersionReleaseDate[0] + "'>" + vrVersionReleaseDate[0] + "</option>");
        }
    }
    if ($.trim(vrVersionReleaseDate[1]).length > 0 && vrVersionReleaseDate[1] != 'undefined') {
        $("#ddlSecondReleaseVersion").css("display", "inline");
        if ($('#ddlSecondReleaseVersion option[value="' + vrVersionReleaseDate[1] + '"]').length == 0) {
            $("#ddlSecondReleaseVersion").append("<option value='" + vrVersionReleaseDate[1] + "'>" + vrVersionReleaseDate[1] + "</option>");
        }
    }

    if ($('#ddlNewCustomer option[value=' + data.ProjectCustomerID + ']').length > 0) {
        $("#ddlNewCustomer").val(data.ProjectCustomerID);
    }
    var vrProjectBudgetHours = typeof data.ProjectBudget != 'undefined' ? data.ProjectBudget : '0';

    $("#txtNewProjName").val(data.ProjectName);
    $("#txtNewModuleNames").val(data.ModuleName);

    $("#ddlNewProjTechnology").val(data.TechnologyID);
    $("#ddlNewProjPriority").val(data.ProjectPriorityID);
    $("#txtSelectedProjManager").val(vrGetPrjManagers);
    $("#txtSelectedProjManager").attr("title", vrGetPrjManagers);
    $("#txtSelectedEmp").val(vrGetInfrmUpdates);
    $("#txtSelectedEmp").attr("title", vrGetInfrmUpdates);
    //var empInfrmcount = (vrGetInfrmUpdates.match(/,/g) || []).length + parseInt(1);//As at last there wont be comma
    // if (_vrGetInfrmUpdCount == empInfrmcount) {
    //  $("#JqxWidget").jqxDropDownList('checkIndex', 0);
    //}
    //_vrGetInfrmUpdCount = '';
    $("#txtNewProjBudgetEfforts").val(displayFormat(vrProjectBudgetHours));
    $("#txtPMPercentage").val(data.ProjectAlertPM);
    $("#ddlReleaseDate option:contains(" + data.ReleaseType + ")").attr('selected', 'selected');
    //$("# option:selected").text();
    $("#ddlProjectStatus").val(data.ProjectStatusID);
    $("#txtVersionNumStart").val(vrVersionNum[0]);
    $("#txtVersionNumEnd").val(vrVersionNum[1]);
    $("#txtNewProjDescription").val(data.ProjectDescription);
    $("#divMainLoader").css("display", "none");
    var ddlFirstReleaseVal = $("#ddlFirstReleaseVersion option:selected").text();
    $("#ddlFirstReleaseVersion").prop('title', ddlFirstReleaseVal);
    var ddlSecondReleaseVal = $("#ddlSecondReleaseVersion option:selected").text();
    $("#ddlSecondReleaseVersion").prop('title', ddlSecondReleaseVal);
    var ddlReleaseDateVal = $("#ddlReleaseDate option:selected").text();
    $("#ddlReleaseDate").prop('title', ddlReleaseDateVal);
    $('#divProjAttachFiles').css("border", "none");
    if ($.trim(source[0].SprintName).length > 0) {
        var vrSprintFields = {
            datatype: "json",
            type: "GET",
            cache: false,
            datafields: _vrProjSprintDataFields,
            localdata: source,
            pagesize: _vrDefaultTaskSizer,

        };
        bindDataToJqx('JqxGridSprint', vrSprintFields, _vrSprintColumns, 650);
    }
}
var linkrenderer_sprintstatus = function (row, column, value) {
    return linkrendersprintstatus('JqxGridSprint', row, column, value);
}
function linkrendersprintstatus(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var status = JSON.stringify(rowdata['SprintStatus']).toString();
            if (status == 0) {
                return '<span style="margin: 4px; line-height: 1.9;" title="Freeze sprint">' + "Freeze sprint" + '</span>';
            }
            else if (status == 1) {
                return '<span style="margin: 4px; line-height: 1.9;" title="Select status">' + "Select status" + '</span>';
            }
            else if (status == 2) {
                return '<span style="margin: 4px; line-height: 1.9;" title="Close sprint">' + "Close sprint" + '</span>';
            }
        }
    } catch (e) {

    }
}

function filterProjTrStatus() {
    _projIndexNO = -1;
    filterProjectsJqxGrid();
    _vrSelProjStatus = $("#ddlProjTrStatus").val();
    var vrProjStatusDrpDownVal = $("#ddlProjTrStatus option:selected").text();
    $("#ddlProjTrStatus").attr("title", "");
    $("#ddlProjTrStatus").attr("title", vrProjStatusDrpDownVal);

}

function filterProjCustomer() {
    filterProjectsJqxGrid();
    _vrSelProjCustomer = $("#ddlProjCustomer").val();
    var ddlSelProjCust = $("#ddlProjCustomer option:selected").text();
    $("#ddlProjCustomer").prop('title', ddlSelProjCust);
}
function LoadProjectDetails() {
    setTimeout(function () {
        filterProjectsJqxGrid();
    }, 5);
}
function filterProjName() {
    filterProjectsJqxGrid();
}

function filterProjectsJqxGrid() {
    try {
        var vrPrjStatus = $("#ddlProjTrStatus option:Selected").text();
        var vrPrjCustomer = $("#ddlProjCustomer").val();
        var vrPrjName = $("#txtProjTrProjects").val().toLowerCase();
        var vrDynProjData = _vrProjectsData;
        var vrDynProjLocalData = _vrProjectsData.localdata;
        var vrFilteredData = '';
        if ($("#ddlProjTrStatus").val() != '0' && $("#ddlProjCustomer").val() != '0') {
            vrFilteredData = jQuery.grep(vrDynProjLocalData, function (element, index) {
                return element.Status == vrPrjStatus && element.ProjectCustomerID == vrPrjCustomer; // retain appropriate elements
            });
        } else if ($("#ddlProjTrStatus").val() != '0') {
            vrFilteredData = jQuery.grep(vrDynProjLocalData, function (element, index) {
                return element.Status == vrPrjStatus; // retain appropriate elements
            });
        } else if ($("#ddlProjCustomer").val() != '0') {
            vrFilteredData = jQuery.grep(vrDynProjLocalData, function (element, index) {
                return element.ProjectCustomerID == vrPrjCustomer; // retain appropriate elements
            });
        }
        else {
            vrFilteredData = vrDynProjLocalData;
        }
        if ($.trim(vrPrjName).length > 0) {
            vrFilteredData = jQuery.grep(vrFilteredData, function (element, index) {
                return element.ProjectName.toLowerCase().indexOf(vrPrjName) > -1; // retain appropriate elements
            });
        }
        //$("#txtProjTrProjects").css('cursor','none');
        vrDynProjData.localdata = vrFilteredData;
        $("#jqxProjectsGrid").jqxGrid({ source: vrDynProjData });
        _vrProjectsData.localdata = vrDynProjLocalData;
        disableJqxPagerButtonsOnLoad('jqxProjectsGrid');
        $("#divProjectLoading").css("display", "none");

    } catch (e) {
        $("#divProjectLoading").css("display", "none");
    }
}

function loadJqxProjectsGrid() {
    bindDataToJqx("jqxProjectsGrid", _vrProjectsData, _vrProjColumns, _vrMagnifyGridWidth);
    filterProjectsJqxGrid();
    LoadPageNumForProj();
}

function decreaseJqxProjectsGrid() {
    setLocalStorageFromDialog("jqxProjectsGrid", _vrProjectsGridWidth);
    bindDataToJqx("jqxProjectsGrid", _vrProjectsData, _vrProjColumns, _vrProjectsGridWidth);
    filterProjectsJqxGrid();
}

//To create new project
function createNewProject(FlagFetchProjData) {
    try {
        if ($.trim(SprintStatus).length == 0) {
            LoadJqxSprintGrid();
            SprintStatus = 1;
        }

        // var magnifierName = $('#MagnifierDialog').dialog('option', 'title');
        //if (magnifierName != _vrProjDetDialogHdr) {
        //  _vrLocalTaskDataOnProjClick = null;
        // _vrLocalTaskDataOnProjClick = JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"));
        //}

        selectCount = 0;
        $('#divProjAttachFiles').css("border", "none");
        $('#divProjAttachedFiles').css("border", "none");
        _vrNewProjectAttachedFiles = '';
        $("#ddlFirstReleaseVersion").css("display", "none");
        $("#ddlSecondReleaseVersion").css("display", "none");
        $("#divMainLoader").css("display", "block");
        _vrDialogBoxTitle = _vrDialogBoxNewProj;
        clearProjectFields();
        $(".clsupdateprojfields").css("display", "none");
        $("#btnSaveNewProject").css("display", "inline");
        //if (FlagFetchProjData == _vrGetProjDataById) {
        //    $('#dailog').dialog('option', 'title', _vrProjectEditLbl);
        //} else {
        //    $('#dailog').dialog('option', 'title', _vrDialogBoxNewProj);
        //}
        if (FlagFetchProjData == _vrGetProjDataById) {
            $('#dailog').dialog('option', 'title', _vrProjectEditLbl);
        } else {
            $('#dailog').dialog('option', 'title', _vrDialogBoxNewProj);
            _vrLocalTaskDataOnProjClick = null;
            _vrLocalTaskDataOnProjClick = JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"));
        }
        _vrDialogBoxTitle = _vrDialogBoxNewProj;
        $(".clsdailogfields").css("display", "none");
        $("#divCreateNewProject").css("display", "inline-block");
        //$(".clsexistedcustomerfields").css("display", "none");
        $('#dailog').dialog('open');//.dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
        _BaseUrl = _vrLocationOrigin + '/Project/GetNewProjectFields?strTokenID=' + _vrUserTokenId;
        ajaxCallBindDropDown(_BaseUrl, bindFieldsToDropdown, _vrGetProjFields);

        disableJqxPagerButtonsOnLoad('JqxGridSprint');

    } catch (e) {

    }
}
// method for laosding sprint grid
function LoadJqxSprintGrid() {
    var source = {
        datafields: _vrProjSprintDataFields,
        addrow: function (rowid, rowdata, position, commit) {
            commit(true);
        },
    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    //$("#JqxGridSprint").on('pagechanged', function () {
    //    var datainfo = $("#JqxGridSprint").jqxGrid('getdatainformation');
    //    var paginginfo = datainfo.paginginformation;

    //});
    $("#JqxGridSprint").jqxGrid(
    {
        width: 650,
        source: dataAdapter,
        pageable: true,
        autoheight: true,
        pagerbuttonscount: 3,
        sortable: true,
        pagermode: 'simple',
        enabletooltips: true,
        editable: true,
        editmode: 'click',
        //theme: "orange",
        //selectionmode: 'singlerow',
        columnsresize: false,
        autorowheight: true,
        pagesize: 8,
        //showtoolbar: false,
        columns: _vrSprintColumns


    });

    var count = 0;
    var generaterow = function () {
        var row = {};
        var startdate = linkrenderer_sprintdefaultdate();
        var enddate = linkrenderer_sprintdefaultenddate();
        row["SprintName"] = "";
        row["StartDate"] = startdate;
        row["EndDate"] = enddate;
		row["SprintStatus"] = "Select status";
        return row;
    }
    $("#addrowbutton").on('click', function () {
        var datarow = generaterow();
        //$("#inputdatetimeeditorJqxGridSprintStartDate").addClass("jqx-position-absolute jqx-reset jqx-reset-orange jqx-clear jqx-clear-orange jqx-input-content jqx-input-content-orange jqx-widget-content jqx-widget-content-orange jqx-rc-all jqx-rc-all-orange");
        vrJqxId = $("#JqxGridSprint").jqxGrid('getdatainformation').rowscount;
        $("#JqxGridSprint").jqxGrid('addrow', vrJqxId, datarow);
        disableJqxPagerButtonsOnLoad('JqxGridSprint');


    });



    disableJqxPagerButtonsOnLoad('JqxGridSprint');
    $("#JqxGridSprint").on("pagechanged", function (event) {
        disableEnablePagingButtons("JqxGridSprint", event);
    });

}

//$('.jqx-icon-calendar').addClass('jqx-icon jqx-icon-orange jqx-icon-calendar jqx-icon-calendar-orange jqx-icon-calendar-pressed jqx-icon-calendar-pressed-orange');

//$("div[id*='ViewinnerCalendarjqxWidget']").addClass('jqx-position-absolute jqx-reset jqx-reset-orange jqx-clear jqx-clear-orange jqx-input-content jqx-input-content-orange jqx-widget-content jqx-widget-content-orange jqx-rc-all jqx-rc-all-orange');
//$("tr[id*='calendarTitleViewinnerCalendarjqxWidget']").addClass('jqx-calendar-title-container jqx-calendar-title-container-orange jqx-reset jqx-reset-orange jqx-widget-header jqx-widget-header-orange jqx-calendar-title-header jqx-calendar-title-header-orange');

//$('.jqx-icon-arrow-left.jqx-calendar-title-navigation ').addClass('jqx-calendar-title-navigation jqx-calendar-title-navigation-orange jqx-icon-arrow-left jqx-icon-arrow-left-orange');
//$('.jqx-icon-arrow-right.jqx-calendar-title-navigation ').addClass('jqx-calendar-title-navigation jqx-calendar-title-navigation-orange jqx-icon-arrow-right jqx-icon-arrow-right-orange');

////////////////////


var imagerenderer = function (row, datafield, value) {
    return '<input type="text" id="txtBugTrFromDate" class="clsDatePicker hasDatepicker" readonly="" placeholder="From date" title="From date"><img height="60" width="50" src="http://localhost:61349/images/calendar.gif"/>';
}

function DeleteRow() {
    var rowscount = $("#JqxGridSprint").jqxGrid('getdatainformation').rowscount;
    var rowId = 0;

    for (var intLoop = rowscount; parseInt(rowId) < parseInt(intLoop) ; parseInt(intLoop--))
        // 1.  Remove the row from the grid
    {
        if (rowId >= 0 && rowId < rowscount) {
            var id = $("#JqxGridSprint").jqxGrid('getrowid', rowId);
            var commit = $("#JqxGridSprint").jqxGrid('deleterow', id);
        }
        else {
            break;
        }
    }

}

////////////////////////


function linkrenderer_sprintdefaultdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    //today = mm + '/' + dd + '/' + yyyy;
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function linkrenderer_sprintdefaultenddate() {
    var today = new Date();

    today.setDate(today.getDate() + 7);
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var monthcount = 1;
    monthcount += month;
    if (monthcount < 10) {
        var finalmonth = '0' + monthcount;
    }
    //today = mm + '/' + dd + '/' + yyyy;
    today = date + '/' + finalmonth + '/' + year;
    return today;
}









function clearProjectFields() {

    $(".clsClearNewProjFields").val('');
    $(".clscreatenewddl").empty();
    $("#divProjAttachFiles").empty();
    $("#divProjAttachedFiles").empty();
    $("#divInformToMembers").empty();
    $("#txtNewProjName").removeClass("error");
    $("#ddlNewProjTechnology").removeClass("error");
    $("#ddlNewCustomer").removeClass("error");
    $(".clserrorprojlbl").css("display", "none");
    $(".clserrorsprintlbl").css("display", "none");
    $('#flAttachProjFile').replaceWith($('#flAttachProjFile').clone());
    $("#txtSelectedProjManager").attr("title", "");

    $('#JqxGridSprint').jqxGrid('clear');
    //location.reload();
}

function showprojManager() {
    InformToOnChange('ddlNewProjManager', 'txtSelectedProjManager');
    var vrSelProjManagers = $("#txtSelectedProjManager").val();
    $("#txtSelectedProjManager").attr("title", vrSelProjManagers);
}

function saveNewProject() {
    _vrProjDataStatus = _vrProjCrtStatus;
    _vrSelectedProjectProjId = _vrDefaultProjId;
    submitProjectData();
}

function updateProj() {
    _vrProjDataStatus = _vrProjUpdatedStatus;
    _vrSprintStatus = 1;
    if ($("#divProjAttachedFiles .clsremoveprojectfileonupdate").length > 0) {
        var vrAttchProjectFileName = '';
        $(".clsprojattachedfiles").each(function (index) {
            if ($(this).hasClass("clsremoveprojectfileonupdate") == true) {
                var vrProjectFileName = $(this).find('a').prop("title");
                vrAttchProjectFileName = vrAttchProjectFileName + vrProjectFileName + "~";
            }
        });
        $("#divMainLoader").css("display", "block");
        _BaseUrl = _vrLocationOrigin + '/Bug/DeleteFile';
        var objBugDetails = {
            FileName: vrAttchProjectFileName,
            TokenID: _vrUserTokenId
        };
        ajaxCallWithObject(_BaseUrl, objBugDetails, submitProjectData);
    } else {
        submitProjectData();
    }
    $("#lblMagFieldVal1").text($('#txtNewProjName').val());
    var vrProjManagerTitle = $('#txtSelectedProjManager').val();
    $("#lblMagFieldVal2").attr("title", vrProjManagerTitle);
    cropText($("#lblMagFieldVal2"), vrProjManagerTitle, _vrTextFieldUserManagerLen);
    //_BaseUrl = _vrLocationOrigin + '/Project/GetProjectData';
    //var objProjectDetails = {
    //    ProjectName: 0,
    //    ProjectCustomerID: 0,
    //    ProjectStatusID: "0",
    //    ProjectID: 0,
    //    TokenID: _vrUserTokenId
    //};
    //ajaxCallWithObject(_BaseUrl, objProjectDetails, customerProjValuesRebind);

}
function customerProjValuesRebind(source) {
    var data = source.MultipleResults[0].LstProjects;
    var vrFilterCustomerData = jQuery.grep(data, function (element, index) {
        return element.ProjectCustomerID == parseInt(_vrMagnifyCustId); // retain appropriate elements
    });
    vrCustomerProjData = {
        datatype: "json",
        type: "GET",
        cache: false,
        datafields: _vrProjDataFields,
        localdata: vrFilterCustomerData
        //pagesize: _vrDefaultPreviewPager
    };
    _vrCustSourceData = vrFilterCustomerData;
    event.preventDefault();
    $("#divMainLoader").css("display", "none");
}

function checkProjNameField() {
    if ($.trim($("#txtNewProjName").val()).length > 0) {
        $("#txtNewProjName").removeClass("error");
        if ($("#divCreateNewProject .error").length == 0) {
            $(".clserrorprojlbl").css("display", "none");
        }
    }
}

function submitProjectData() {
    _vrNewProjectAttachedFiles = '';
    $("#divCreateNewProject .clsprojreqfields").each(function (index) {
        var _vrNewProjectAttachedFiles = '';
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass("error");
            $(".clserrorprojlbl").css("display", "block");
        }

    });

    if ($(".error").length > 0) {
        return false;
    }
    var rows = $("#JqxGridSprint").jqxGrid('getrows');
    var data = [];
    var objSprintDetails = [];
    var count = 0;
    // var 
    for (var j = 0; j < rows.length; j++) {
        if (notEmpty(j)) {
            //data.push($('#JqxGridSprint').jqxGrid('getrowdata', j));
            //data[count].CreatedBy = _EmpId;
            //data[count].STATUS = "1";
            //data[count].StartDate = formatSprintFromDate(rows[j].StartDate);
            //data[count].EndDate = formatSprintFromDate(rows[j].EndDate);
            //data[count].Name = rows[j].SprintName;
            //if (rows[j].SprintID != undefined) {
            //    data[count].ID = rows[j].SprintID;
            //}
            //delete data[count].uid;
            //delete data[count].SprintName;
            //delete data[count].SprintID;
            count++;
        }
    }
    if (count != rows.length) {

        $(".clserrorsprintlbl").css("display", "block");
        //return false;
    }
    // $("#divMainLoader").css("display", "block");

    _vrProjCreationStatus = _vrProjInsertionStatus;
    var vrSelectedProjMembers = '';
    $('#divInformToMembers input:checked').each(function () {
        vrSelectedProjMembers += $(this).attr('value') + ',';
    });
    vrSelectedProjMembers = vrSelectedProjMembers.substr(0, vrSelectedProjMembers.length - 1);
    var vrVersionNum = $("#txtVersionNumStart").val() + '!^' + $("#txtVersionNumEnd").val();
    var vrGetSelectedProjManagers = GetInformToIds('ddlNewProjManager', 'txtSelectedProjManager');
    var vrGetSelInfrmUpdates = GetSelProjManagerIds();
    var vrProjAttachedFiles = '';
    //To prevent button for double click.
    $(".clsprojdynfilename").each(function (index) {
        var vrFileName = $(this).prop("title");
        _vrNewProjectAttachedFiles = _vrNewProjectAttachedFiles + vrFileName + "~";
    });
    $(".clsprojattachedfiles").each(function (index) {
        if ($(this).hasClass("clsremoveprojectfileonupdate") == false) {
            var vrFileName = $(this).find('a').prop("title");
            _vrNewProjectAttachedFiles = _vrNewProjectAttachedFiles + vrFileName + "~";
        }
    });
    var vrVersionReleaseDate = $("#ddlFirstReleaseVersion option:selected").text() + "_" + $("#ddlSecondReleaseVersion option:selected").text();
    vrVersionReleaseDate = vrVersionReleaseDate.replace(/\'/g, "''");

    if (count == rows.length) {
        count = 0;
        for (var j = 0; j < rows.length; j++) {
            if (notEmpty(j)) {
                data.push($('#JqxGridSprint').jqxGrid('getrowdata', j));
                data[count].CreatedBy = _EmpId;
                data[count].STATUS = formatSprintStatus(rows[j].SprintStatus);
                data[count].StartDate = formatSprintFromDate(rows[j].StartDate);
                data[count].EndDate = formatSprintFromDate(rows[j].EndDate);
                data[count].Name = rows[j].SprintName.replace(/\'/g, "''");
                if (rows[j].SprintID != undefined) {
                    data[count].ID = rows[j].SprintID;
                }
                delete data[count].uid;
                delete data[count].SprintName;
                delete data[count].SprintID;
                count++;
            }
        }
        $("#divMainLoader").css("display", "block");
        _BaseUrl = _vrLocationOrigin + '/Project/InsertProjDetails';
        var objProjDetails = {
            ProjectID: _vrSelectedProjectProjId,
            ProjectName: $("#txtNewProjName").val().replace(/\'/g, "''"),
            ProjectCustomerID: $("#ddlNewCustomer").val(),
            ModuleName: $("#txtNewModuleNames").val().replace(/\'/g, "''"),
            TechnologyID: $("#ddlNewProjTechnology").val(),
            ProjectPriorityID: $("#ddlNewProjPriority").val(),
            ProjectManager: vrGetSelectedProjManagers,
            ProjectBudget: $("#txtNewProjBudgetEfforts").val(),
            ProjectAlertPM: $("#txtPMPercentage").val(),
            ReleaseType: '',
            VersionNumber: 1,
            ProjectDescription: $("#txtNewProjDescription").val().replace(/\'/g, "''"),
            InformUpdates: vrGetSelInfrmUpdates,
            ProjectAtchDocmnt: _vrNewProjectAttachedFiles,
            VersionReleaseDate: vrVersionReleaseDate,
            ProjectStatusID: $("#ddlProjectStatus").val(),
            TokenID: _vrUserTokenId,
            SprintDetails: data
        }
        ajaxCallWithObject(_BaseUrl, objProjDetails, reloadProjectGrid);
        $(".clserrorsprintlbl").css("display", "none");
        $("input[type = submit]").attr("disabled", false);
        //}
        $("#divProjAttachFiles").empty();
    }
    else {
        $(this).addClass("error");
        $(".clserrorsprintlbl").css("display", "block");
        return false;
        //$("input[type = submit]").attr("disabled", true);
    }

var linkrenderer_sprintname = function (row, column, value) {
    return linkrendersprintname('JqxGridSprint', row, column, value);
}
//Renders for every bug binding to bug jqx grid.
function linkrendersprintname(jqxGridID, row, column, value) {
    try {
        var rowdata = $('#' + jqxGridID).jqxGrid('getrowdata', row);
        if (rowdata != null) {
            var vrsprintname = rowdata['SprintName'];
            return '<div class="clsaddellipsis">' + vrsprintname + '</div>';
        }
    } catch (e) {

    }
}

}
function GetSelProjManagerIds() {
    var items = $("#JqxWidget").jqxDropDownList('getCheckedItems');
    var vrTotalLenOfProManager = items.length;
    var vrTempListOfProjManagers = '';
    var vrListOfProjManagers = '';
    for (var i = 0; i < vrTotalLenOfProManager; i++) {
        vrTempListOfProjManagers = items[i].value;
        if (vrTempListOfProjManagers != 'Select all') {
            vrListOfProjManagers = vrListOfProjManagers + vrTempListOfProjManagers + ',';
        }
    }
    return vrListOfProjManagers.substr(0, vrListOfProjManagers.length - 1);
}
function notEmpty(varnum) {
    var rows = $('#JqxGridSprint').jqxGrid('getrowdata', varnum);
    if (rows.SprintName == "" || rows.StartDate == "" || rows.EndDate == "" || rows.SprintStatus === "") {

        return false;
        //data.push(_EmpId);
    }
    else {
        return true;
    }
}




function checkAllCheckboxes() {
    var vrSelectAllChecked = $("#chkEmpSelectAll").is(':checked');
    if (vrSelectAllChecked) {
        $("#divInformToMembers").find(':checkbox').each(function () {
            $(this).prop("checked", true);
        });
    } else {
        $("#divInformToMembers").find(':checkbox').each(function () {
            $(this).prop("checked", false);
        });
    }

}

function uploadNewProjFile() {
    $("#flAttachProjFile").prop("disabled", true);
    $("#btnSaveProject").prop("disabled", true);
    $("#btnUpdateProj").prop("disabled", true);
    //$("#imgProjFileLoader").css("display", "inline");
    $("#divProjAttachFiles").css("border", "1px solid rgb(210, 208, 208)");
    _BaseUrl = _vrLocationOrigin + '/Task/ToFilesUpload?strPicFileName=' + _DefaultAttachedFileName + '&strTokenID=' + _vrUserTokenId;
    uploadFile(_BaseUrl, loadNewProjFileName, 'flAttachProjFile');
    _VrProjFileUploading = _VrProjFileUploaded;
}

function loadNewProjFileName(data) {
    try {
        $("#imgProjFileLoader").css("display", "none");
        var vrData = (data.Value).toString();
        var vrFileNames = vrData.split(',');
        if ($.trim(data.Value).length > 0 && $("#dailog").dialog("isOpen") === true && _vrDialogBoxNewProj == _vrDialogBoxTitle && $.trim(_VrProjFileUploading).length > 0) {
            for (var i = 0; i < vrFileNames.length; i++) {// this loop is to append files to files list div seperat
                $("#divProjAttachFiles").append("<div class='clsnewprojdynupload'><label class='clsprojdynfilename' title='" + vrFileNames[i] + "'>" + CropTextHtml(vrFileNames[i], _vrLimitFileName) + "<a href='#'class='clsnewprojfileremove' ><img src='img/closeicon.ico'/><a></label></div>");
            }
            $('#flAttachProjFile').replaceWith($('#flAttachProjFile').clone());
            _VrProjFileUploading = '';
        } else if (typeof data.value != 'undefined') {
            deleteUploadedFileFunc(data.Value);
        }

        //$("#imgProjFileLoader").css("display", "none");
        $("#flAttachProjFile").prop("disabled", false);
        $("#btnSaveProject").prop("disabled", false);
        $("#btnUpdateProj").prop("disabled", false);
    } catch (e) {
        //_vrFileUploading = _vrFileUploadComplete;
        $("#imgProjFileLoader").css("display", "none");
        $("#flCtBugMultiUpload").prop("disabled", false);
        $(".clsinsertbugdata").prop("disabled", false);
        $("#btnUpdateProj").prop("disabled", false);
    }
}

function reloadProjectGrid(data) {
    // $("#txtProjTrProjects").val("");
    $("#dailog").dialog('close');

    $("#divMainLoader").css("display", "none");
    fetchProjectsData();
    if ($('#MagnifierDialog').dialog("isOpen") === true) {
        projInProgLink(_vrSelectedProjectProjId, $('#txtNewProjName').val(), $('#txtSelectedProjManager').val());
    }

}

function cancelNewProj() {
    //$(".clscreatenewddl").val('0');
    //selectCount = 0;
    $("#JqxGridSprint").jqxGrid('deleterow', rowIDs);
    $("#dailog").dialog("close");

}
//To show or hide two dropdowns for release versions

Date.prototype.getMonthName = function () {
    var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return monthNames[this.getMonth()];
}



function GetDayName(vIndex) {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (vIndex != null || vIndex != "" || vIndex > 7) {
        return days[vIndex];
    }
    return "";
}

//binding the data to version release drop downs....
function BindData() {
    var ddlReleaseDateVal = $("#ddlReleaseDate option:selected").text();
    $("#ddlReleaseDate").prop('title', ddlReleaseDateVal);
    $("#ddlFirstReleaseVersion").empty();
    $("#ddlSecondReleaseVersion").empty();
    var ddlValue = document.getElementById("ddlReleaseDate").value;
    var ddlValue3 = document.getElementById("ddlFirstReleaseVersion").value;
    var ddlValue4 = document.getElementById("ddlSecondReleaseVersion").value;


    var vCurDate = new Array();
    var vCurMonthDate = new Array();
    d = new Date();
    dateForMonth = new Date();
    var month = d.getMonthName();
    var date = d.getDate();
    var getDays = new Date(d.getYear(), d.getMonth() + 1, 1, -1).getDate();

    //this loop is to get day name and date in a array 'vCurDate'
    for (var intArray = 0; intArray < 7; intArray++) {
        var dayName = GetDayName(dateForMonth.getDay())
        if (dayName == 0) {
            dateForMonth.setDate(dateForMonth.getDate() + 1);
        }
        else {
            //if (getDays != dateForMonth.getDate()) {
            //    if (dateForMonth.getDate() == 1) {
            //        dayName = GetDayName(dateForMonth.getDay()+1);
            //        vCurDate[intArray] = dayName + " " + (dateForMonth.getDate()) + "/" + (parseInt(dateForMonth.getMonth()) + 1) + "/" + dateForMonth.getFullYear(); //Problem was "d.getDate()".Fixed a bugID:341.Done by Aslam.on 21/11/2013
            //        intArray++;
            //    }
            //    vCurDate[intArray] = dayName + " " + (dateForMonth.getDate() + 1) + "/" + (parseInt(dateForMonth.getMonth()) + 1) + "/" + dateForMonth.getFullYear();
            //}
            //dateForMonth.setDate(dateForMonth.getDate() + 1);
            if (getDays != dateForMonth.getDate()) {
                vCurDate[intArray] = dayName + " " + ((dateForMonth.getDate()) + 1) + "/" + (parseInt(dateForMonth.getMonth()) + 1) + "/" + dateForMonth.getFullYear();
                dateForMonth.setDate(dateForMonth.getDate() + 1);
            } else {
                dateForMonth.setDate(dateForMonth.getDate() + 1);
                vCurDate[intArray] = dayName + " " + ((dateForMonth.getDate())) + "/" + (parseInt(dateForMonth.getMonth()) + 1) + "/" + dateForMonth.getFullYear();
            }

        }
    }

    //this loop is to get day name and date in a array 'vCurMonthDate'
    for (var intArray = 0; intArray < 32; intArray++) {
        var dayName = GetDayName(d.getDay())
        if (dayName == 0) {
            d.setDate(d.getDate() + 1);
        }
        else {
            if (getDays != d.getDate()) {
                if (d.getDate() == 1) {
                    dayName = GetDayName(parseInt(d.getDay()) - parseInt(1));
                    dayName = typeof dayName == 'undefined' ? GetDayName(6) : dayName;//If undefined it will show sunday
                    vCurMonthDate[intArray] = dayName + " " + (d.getDate()) + "/" + (parseInt(d.getMonth()) + 1) + "/" + d.getFullYear(); //Problem was "d.getDate()".Fixed a bugID:341.Done by Aslam.on 21/11/2013
                    intArray++;
                    dayName = GetDayName(d.getDay());
                }
                vCurMonthDate[intArray] = dayName + " " + (d.getDate() + 1) + "/" + (parseInt(d.getMonth()) + 1) + "/" + d.getFullYear();
            }
            d.setDate(d.getDate() + 1);
        }
    }

    if (ddlValue == 1 || ddlValue == 3 || ddlValue == 4) {
        document.getElementById("ddlFirstReleaseVersion").style.display = "inline";
        document.getElementById("ddlSecondReleaseVersion").style.display = "none";
        if (ddlValue == 1 || ddlValue == 3) {
            for (var intLoope = 0; intLoope < 7; intLoope++) {
                var Text = "";
                if (vCurDate[intLoope] == undefined) {
                }
                else {
                    Text = vCurDate[intLoope];
                    var Value = vCurDate[intLoope];

                    var opt = document.createElement("option");
                    var ddlFirstVersion = document.getElementById("ddlFirstReleaseVersion");

                    // Add an Option object to Down/List Box
                    document.getElementById("ddlFirstReleaseVersion").options.add(opt);

                    ddlFirstVersion.options[ddlFirstVersion.selectedIndex].value;

                    // Assign text and value to Option object
                    opt.text = Text;
                    opt.value = Value;
                }
            }
        }
        if (ddlValue == 4) {
            document.getElementById("ddlFirstReleaseVersion").innerHTML = "";
            for (var intLoope = 0; intLoope < 32; intLoope++) {
                var Text = "";
                if (vCurMonthDate[intLoope] == undefined) {
                }
                else {
                    Text = vCurMonthDate[intLoope];
                    var Value = vCurMonthDate[intLoope];

                    var opt = document.createElement("option");

                    // Add an Option object to Drop Down/List Box
                    document.getElementById("ddlFirstReleaseVersion").options.add(opt);
                    // Assign text and value to Option object
                    opt.text = Text;
                    opt.value = Value;
                }
            }
        }
    }
    else if (ddlValue == 2 || ddlValue == 5) {
        document.getElementById("ddlFirstReleaseVersion").style.display = "inline"; //this will display drop down
        document.getElementById("ddlSecondReleaseVersion").style.display = "inline";
        if (ddlValue == 2) {
            //in this loop we are doing logic of twice a week
            document.getElementById("ddlFirstReleaseVersion").innerHTML = "";
            document.getElementById("ddlSecondReleaseVersion").innerHTML = "";
            for (var intLoope = 0; intLoope < 7; intLoope++) {
                var DDL3Text = "";
                var DDL3Value = "";
                if (vCurDate[intLoope] == undefined) {

                }
                else {
                    DDL3Text = vCurDate[intLoope];
                    DDL3Value = vCurDate[intLoope];

                    var DDL3opt = document.createElement("option");
                    var DDL4opt = document.createElement("option");

                    // Add an Option object to Drop Down/List Box
                    document.getElementById("ddlFirstReleaseVersion").options.add(DDL3opt);
                    document.getElementById("ddlSecondReleaseVersion").options.add(DDL4opt);
                    // Assign text and value to Option object
                    DDL3opt.text = DDL3Text;
                    DDL3opt.value = DDL3Value;
                    DDL4opt.text = DDL3Text;
                    DDL4opt.value = DDL3Value;
                }
            }
        }
        if (ddlValue == 5) {
            //in this loop we are doing logic of twice a month
            document.getElementById("ddlFirstReleaseVersion").innerHTML = "";
            document.getElementById("ddlSecondReleaseVersion").innerHTML = "";
            for (var intLoope = 0; intLoope < 32; intLoope++) {
                var Text = "";
                if (vCurMonthDate[intLoope] == undefined) {
                }
                else {
                    Text = vCurMonthDate[intLoope];
                    var Value = vCurMonthDate[intLoope];

                    var DDL3opt = document.createElement("option");
                    var DDL4opt = document.createElement("option");

                    document.getElementById("ddlFirstReleaseVersion").options.add(DDL3opt);
                    document.getElementById("ddlSecondReleaseVersion").options.add(DDL4opt);
                    // Assign text and value to Option object
                    DDL3opt.text = Text;
                    DDL3opt.value = Value;
                    DDL4opt.text = Text;
                    DDL4opt.value = Value;
                }
            }
        }
        var ddlFirstReleaseVal = $("#ddlFirstReleaseVersion option:selected").text();
        $("#ddlFirstReleaseVersion").prop('title', ddlFirstReleaseVal);
        var ddlSecondReleaseVal = $("#ddlSecondReleaseVersion option:selected").text();
        $("#ddlSecondReleaseVersion").prop('title', ddlSecondReleaseVal);
    }
    else {
        document.getElementById("ddlFirstReleaseVersion").style.display = "none"; //this will hide the drop down from display
        document.getElementById("ddlSecondReleaseVersion").style.display = "none";
    }
}

function ShowOneDDL() {
    //GlobalValue = 1;
    document.getElementById("ddlFirstReleaseVersion").style.display = "inline";
    document.getElementById("ddlSecondReleaseVersion").style.display = "none";
}

function ShowTwoDDL() {
    // GlobalValue = 2;
    document.getElementById("ddlFirstReleaseVersion").style.display = "inline";
    document.getElementById("ddlSecondReleaseVersion").style.display = "inline";
}

//END of binding data to two dropdowns
function deleteUploadedProjFile() {
    var vrAttachedFiles = '';
    $(".clsprojdynfilename").each(function (index) {
        var vrFileName = $(this).prop("title");
        vrAttachedFiles = vrAttachedFiles + vrFileName + '~';
    });
    deleteUploadedFileFunc(vrAttachedFiles);
}


$(document).ready(function () {
    //For removing of attached file individually.
    $("#divProjAttachFiles").on('click', '.clsnewprojfileremove', function () {
        var vrAttchFileName = $(this).closest('.clsprojdynfilename').prop("title");
        deleteUploadedFileFunc(vrAttchFileName)
        $(this).closest(".clsnewprojdynupload").remove();
        if ($.trim($('#divProjAttachFiles').html()).length == 0) {
            $('#divProjAttachFiles').css("border", "none");
        }
        else {
            $('#divProjAttachFiles').css("border", "1px solid rgb(210, 208, 208)");
        }
        if ($.trim($('#divProjAttachedFiles').html()).length == 0) {
            $('#divProjAttachedFiles').css("border", "none");
        }
        else {
            $('#divProjAttachedFiles').css("border", "1px solid rgb(210, 208, 208)");
        }

        event.preventDefault();
    });
});

function deleteUploadedFileFunc(vrAttchFileName) {
    _BaseUrl = _vrLocationOrigin + '/Bug/DeleteFile';
    var objBugDetails = {
        FileName: vrAttchFileName,
        TokenID: _vrUserTokenId
    };
    ajaxCallWithObject(_BaseUrl, objBugDetails, loadNewProjFileName);
}


//Using same method for projects and tasks.

//Rendering for sprint in projects
var linkrenderer_SprintDatetimeformat = function (row, column, value) {
    var vrFormattedDate = formatSprintDisplayDate(value);
    //var vrFormattedTitle = vlFormattedDate);
    return "<div title='" + vrFormattedDate + "' class='clssprintprojects'><label title='" + vrFormattedDate + "'>" + vrFormattedDate + "</label></div>";

}

//function trimLastComma(value) {
//    value = typeof value == 'undefined' ? '' : value;
//    if (value.lastIndexOf(',') == value.length) {
//        value = value.substr(0,value.length-1);
//    }
//    return value;
//}