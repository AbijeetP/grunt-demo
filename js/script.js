var _idSlider;
var _idTasks = "idTasksSlide";
var _idBugs = "idBugsSlide", _idProjects = "idProjectsSlide";
var _idImgMagnify = "imgTasksMagnify";
//var _idImgBugTrMagnify = "imgBugTrMagnify";
var _idImgUserMagnify = "imgUserMagnify";
var _idImgBillingReportMagnify = "imgBIllingReportrMagnify";
var _idUser = "idUserSlide";
var _idBillingReport = "idBillingReportSlide";
var _idImgCustomerTrMagnify = "imgCustomerMagnifier";
var _idImgBugTrMagnify = "imgBugTrMagnify", _idImgProjTrMagnify = "btnMagnifyProject", _idbtnImgBARMagnify="btnImgBAR";
var _idCustomer = "idCustomerSlide";
var _idDashboard = "idDashboardslide";
var _idProcSlide = 'idProcSlide', _idQuote = "idQuotationSlide";
var _idDeployment = "idDeploymentSlide";
var _idImgDeployMagnify = "imgDeployMagnify";
var _idBarScore = 'idBARSlide';
var _idImgQuoteMagnify="imgQuotationMagnify";
function startupModule(module) {
    jQuery(function () {
        if (module.init) {
            module.init();
        }
    });

    return module;
}

/**
 * Code for the slider.
 */
var topSlider = startupModule(function ($, document, undefined) {
    var $sliders, $slides;
    var init = function () {
        $sliders = $('.slider'), $slides = $('.slider .slide');

        $slides.draggable({
            appendTo: "body",
            helper: "clone",
            cursor: "move"
        });

      
            $sliders.bxSlider({
                mode: 'horizontal',
                slideWidth: 215,
                minSlides: 2,
                maxSlides: 5,
                moveSlides: 1,
                slideMargin: 16,
                responsive: true,
                infiniteLoop: false,
                hideControlOnEnd: true,
                pager: false
            });
        
            $('.add_to_grid').click(function (event, ui) {
               
             var fetch = $(this).data('fetch');
             if (fetch) {
                gridster.addToWidget(fetch);
               // $(".close_widget").prop("disabled", "true");/* bud id 5165*/
            }
           // $(".close_widget").attr("disabled", false);/* bud id 5165*/
        });
    };

    return {
        init: init
    };
}(jQuery, document));


/**
 * Code for the gridster
 */
var gridster = startupModule(function () {
    var gridsterAPI, $gridsterEl;

    if ($(window).width() <= 800 && $(window).width() >= 500) {
        var cols = 1;
        var offset = 40;
        $(".clsbugtrail").attr("data-row", "2");
        $(".clsbugtrail").attr("data-col", "1");
    } else if ($(window).width() < 1200 && $(window).width() > 800) {
        var cols = 2;
        var offset = 30;
        $(".clsbugtrail").attr("data-row", "2");
        $(".clsbugtrail").attr("data-col", "1");
    } else if ($(window).width() >= 1200 && $(window).width() < 1750) {
        var cols = 3;
        var offset = 30;
    } else if ($(window).width() >= 1750) {
        var cols = 4;
        var offset = 30;
    }

    var widgetHTML = _DefaultWidget;
    var widgetHTMLTasks = _widgetTasksHeader + $(".clsusertasks").html() + _widgetEnd;
    var widgetHTMLBug = _widgetBugHeader + $(".clsbugtrail").html() + _widgetEnd;

    var widgetHTMLUser = _widgetUserHeader + $(".clsuser").html() + _widgetEnd;
    var widgetHTMLProject = _widgetProjectHeader + $(".clsprojwidget").html() + _widgetEnd;
    var widgetHTMLCustomer = _widgetCustomerHeader + $(".clscustomertrail").html() + _widgetEnd;
    var widgetHTMLBIllingReport = _widgetBillingReportHeader + $(".clsBillingReportwidget").html() + _widgetEnd;
    var widgetHTMLProjDetChart = _widgetProjTasksCount + $(".clsclientroletskdetcharts").html() + _widgetEnd;
    //var widgetHTMLPolicies = _widgetProcsHeader + $(".clsprocs").html() + _widgetEnd;
    var widgetHTMLDeployment = _widgetDeploymentHeader + $(".clsdeploy").html() + _widgetEnd;
    var widgetHTMLQuotation = _widgetQuoteHeader + $(".clsquotation").html() + _widgetEnd;
    var widgetHTMLBAR = _widgetBAR + $(".clsbrPoints").html() + _widgetEnd;
    _vrHTMLBRWidget = $("#idShowBARInMagnify").html();
    //var _vrHTMLBugWidget = 
    var init = function () {
        $gridsterEl = $('.gridster');
        gridsterAPI = $gridsterEl.gridster({
            widget_selector: '.widget',
            autogrow_cols: true,
            widget_margins: [10, 10],
            min_cols: cols,
            max_cols: cols,
            widget_base_dimensions: [410, 423],  // Ideally 420px should be the best fit, but doesn't seem to be working.
            resize: {
                enabled: true
            },
            serialize_params: function ($w, wgd) {
                return { id: $($w).attr('id'), col: wgd.col, row: wgd.row, size_x: wgd.size_x, size_y: wgd.size_y };
            }
        }).data('gridster');


        $gridsterEl.on('click', '.close_widget', function () {
            $(".clsslideinner").find('button').prop("disabled", false);//disable 
            gridsterAPI.remove_widget($(this).parents('.widget'));
        });

        $gridsterEl.on('click', '.magnify_widget', function () {
            var imgId = $(this).attr('id');
            if (_idImgMagnify === imgId) {
                if ((JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"))) != null) {
                    _vrPageNumForTaskWidget = (JSON.parse(localStorage.getItem("jqxGridjqxTasksgrid"))).pagenum;// check the pagenum in task widget and save the grid data.
                    var vrTaskCountedPageNum = (_vrPageNumForTaskWidget * _vrDefaultTaskSizer) + _vrDefaultTaskSizer;//total number of records based on the page num
                    var vrCountedPageNumInTaskMaginfy = (vrTaskCountedPageNum / _vrMagnifierTaskSizer).toFixed();//get the page num in maginfier
                }
                //Initialises "Add Comment" dialog box.
                openMagnifyDialogBox(_vrTaskTrailTitle, 'jqxTasksgrid', _vrMagnifierTaskSizer);

                $('#MagnifierDialog').append($(".clstasksfields"));
                if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
                    $("#imgTaskUserPref").css("margin-left", "0px");
                    $("#imgTaskUserPref").css("margin-top", "5px");
                }
                $('#btnNewTaskInMaginfier').css("display", "block");
                $("#btnNewTaskInMaginfier").jqxButton();
                $("#ddlTskTrailStatus").css("margin-left", "20px");
                $("#ddlTskTrailStatus").css("margin-top", "5px");
                $("#divBlnExcludeCSD").css("margin-left", "36px");
                $("#imgTaskUserPref").css("display", "block");
                loadJqxTasksGrid(_vrFlagData);
                filterTaskTrailSprintDataJqxGrid();
                if ((_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId) && _vrUserIsProjManager == false) {
                    $("#btnNewTaskInMaginfier").css("display", "none");
                }
                if (_vrBtnWidgetResize > 0) {
                    _vrBtnWidgetResize--;
                }
                else {
                    _vrBtnWidgetResize++;
                }
                if (vrCountedPageNumInTaskMaginfy >= 0) {
                    vrCountedPageNumInTaskMaginfy--;//since the page count start from 0 so decrement 1
                    $("#jqxTasksgrid").jqxGrid('gotopage', vrCountedPageNumInTaskMaginfy);// bind the data based on page num.
                }
            } else if (_idImgBugTrMagnify == imgId) {
                if ((JSON.parse(localStorage.getItem("jqxGridjqxBugTrial"))) != null) {
                    _vrPageNumForBugTrailWidget = (JSON.parse(localStorage.getItem("jqxGridjqxBugTrial"))).pagenum;// check the pagenum in task widget and save the grid data.
                    var vrBTCountedPageNum = (_vrPageNumForBugTrailWidget * _vrDefaultBugSizer) + _vrDefaultBugSizer;
                    var vrCountedPageNumInBTMaginfy = (vrBTCountedPageNum / _vrMagnifierBugSizer).toFixed();
                }
                $("#imgBTUserPref").css("display", "block");
                openMagnifyDialogBox(_vrDialogBoxBugTrail, 'jqxBugTrial', _vrMagnifierBugSizer);
                $("#divBugTrToDate").removeClass("clsbugtrailfields");
                $("#ddlBugStatus").css("margin-left", "10px");
                $("#txtBugTrFromDate, #txtBugTrToDate").css("margin-left", "0px");
                $("#bugTrailCheckBox").css("margin-top", "35px");
                if (_vrBtnBugTrailResize > 0) {
                    _vrBtnBugTrailResize--;
                }
                else {
                    _vrBtnBugTrailResize++;
                }
                $("#divBugTrToDate").addClass("clsbugtrailtodate");
                $('#MagnifierDialog').append($("#idBugTrail"));
                loadJqxBugGrid(_vrFlagData);
                if (vrCountedPageNumInBTMaginfy >= 0) {
                    vrCountedPageNumInBTMaginfy--;
                    $("#jqxBugTrial").jqxGrid('gotopage', vrCountedPageNumInBTMaginfy);
                }
            } else if (_idImgProjTrMagnify == imgId) {
                if ((JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"))) != null) {
                    _vrPageNumForProjectsWidget = (JSON.parse(localStorage.getItem("jqxGridjqxProjectsGrid"))).pagenum;// check the pagenum in task widget and save the grid data.
                    var vrProjectCountedPageNum = (_vrPageNumForProjectsWidget * _vrDefaultProjSizer) + _vrDefaultProjSizer;
                    var vrCountedPageNumInProjectMaginfy = (vrProjectCountedPageNum / _vrMagnifierProjSizer).toFixed();
                    // _vrProjDefLen = _vrProjMagLen;
                }
                $("#imgProjUserPref").css("display", "block");
                _vrProjMagnifyDialog = 1;
                openMagnifyDialogBox(_vrProjectsTitle, 'jqxProjectsGrid', _vrMagnifierProjSizer);
                loadJqxProjectsGrid();
                $('#MagnifierDialog').append($("#divProjectsTrail"));
                $("#btnProjectResetSearch").click(function () {
                    $("#txtProjTrProjects").val("");
                    filterProjectsJqxGrid();
                });
                if (vrCountedPageNumInProjectMaginfy >= 0) {
                    vrCountedPageNumInProjectMaginfy--;
                    $("#jqxProjectsGrid").jqxGrid('gotopage', vrCountedPageNumInProjectMaginfy);
                }
            }
            else if (_idImgCustomerTrMagnify == imgId) {
                _vrLocalCustDataOnCustClick = null;
                if ((JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"))) != null) {
                    _vrPageNumForCustWidget = (JSON.parse(localStorage.getItem("jqxGridjqxCustomerTrial"))).pagenum;// check the pagenum in task widget and save the grid data.
                    var vrCustCountedPageNum = (_vrPageNumForCustWidget * _vrDefaultCustomerSizer) + _vrDefaultCustomerSizer;
                    var vrCountedPageNumInCustMaginfy = (vrCustCountedPageNum / _vrMagnifierCustomerSizer).toFixed();
                    //_vrCustDefLen = _vrCustMagLen;
                }
                _vrCustMagnifyDialog = 1;
                $("#imgCustUserPrefCont").css("display", "block");
                openMagnifyDialogBox(_vrCustomerDialogHdr, 'jqxCustomerTrial', _vrMagnifierCustomerSizer);
                $('#MagnifierDialog').append($(" #idCustomerTrail"));
                loadJqxCustomersGrid();
                // $('#MagnifierDialog').dialog({ autoOpen: true, position: "center", dialogClass: 'dialogPosition' });
                $("#btnCustomerResetSearch").click(function () {
                    $("#idSearchCustomer").val("");
                    filterCustomersJqxGrid();
                });
                if (vrCountedPageNumInCustMaginfy >= 0) {
                    vrCountedPageNumInCustMaginfy--;
                    $("#jqxCustomerTrial").jqxGrid('gotopage', vrCountedPageNumInCustMaginfy);
                }
             }
            else if (_idImgUserMagnify == imgId) { // To check whether the imgId= userMaginfyId
                _vrLocalUserDataOnUserClick = null;//At first time when user clicks on maginfy and closes and again clicks on maginfy old local storage value was retained.
                if ((JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"))) != null) {
                    _vrPageNumForUserWidget = (JSON.parse(localStorage.getItem("jqxGridjqxUserTrial"))).pagenum;// check the pagenum in task widget and save the grid data.
                    var vrUserCountedPageNum = (_vrPageNumForUserWidget * _vrDefaultUserSizer) + _vrDefaultUserSizer;
                    var vrCountedPageNumInUserMaginfy = (vrUserCountedPageNum / _vrMagnifierUserSizer).toFixed();
                }
                _vrUserMagnifyDialog = 1;
                $("#imgWidgetUserPrefContainer").css("display", "block");
                openMagnifyDialogBox(_vrUserTitle, 'jqxUserTrial', _vrMagnifierUserSizer);
                $('#MagnifierDialog').append($("#idUser"));
                loadJqxUserMagifyClickGrid();
                $("#btnUserResetSearch").click(function () {
                    $('#txtUserSearch').val("");
                    filterUserJqxGrid();
                });
                if (vrCountedPageNumInUserMaginfy >= 0) {
                    vrCountedPageNumInUserMaginfy--;
                    $("#jqxUserTrial").jqxGrid('gotopage', vrCountedPageNumInUserMaginfy);
                }
            }
            else if (_idImgBillingReportMagnify == imgId) {
                if ((JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"))) !=null) {
                    _vrPageNumForBRWidget = (JSON.parse(localStorage.getItem("jqxGridjqxBillingReport"))).pagenum;// check the pagenum in task widget and save the grid data.
                    var vrBrCountedPageNum = (_vrPageNumForBRWidget * _vrBillingGridPagerSize) + _vrBillingGridPagerSize;
                    var vrCountedPageNumInBrMaginfy = (vrBrCountedPageNum / _vrDefaultBillingReportSizer).toFixed();
                }
                $("#divBRUserPrefCont").css("display", "block");
                if (_UserRoleId == _vrUserRoleId) {//If login user is an employee.
                    if (_vrUserIsProjManager == false) {//Check whether he is project manager
                        $("#imgBRUserPref").css("margin-left", "440px");
                    }
                    else {
                        $("#imgBRUserPref").css("margin-left", "440px");
                    }
                }
                openMagnifyDialogBox(_vrBillingReportTitle, 'jqxBillingReport', _vrDefaultBillingReportSizer);
                $('#MagnifierDialog').append($("#divInnerBillingReportContent"));
                loadJqBillingModifiedsGrid();
                //_vrCloseDialog = '1';
                if (vrCountedPageNumInBrMaginfy >= 0) {
                    vrCountedPageNumInBrMaginfy--;
                    $("#jqxBillingReport").jqxGrid('gotopage', vrCountedPageNumInBrMaginfy);
                }
            }
                //Magnify widget for deployment -- Anvesh 07-02-15
            else if (_idImgDeployMagnify == imgId) {
                if ((JSON.parse(localStorage.getItem("jqxGridjqxDeployGrid"))) != null) {
                    _vrLocalDeployData = (JSON.parse(localStorage.getItem("jqxGridjqxDeployGrid"))).pagenum;
                    var vrDeployTotalRecords = (_vrLocalDeployData * _vrDeployGridPagerSize) + _vrDeployGridPagerSize;
                    var vrDeployPageNumInMagnify = (vrDeployTotalRecords / _vrMagnifierDeploySizer).toFixed();//Gets the pager value
                }
                openMagnifyDialogBox(_vrDialogDeployment, 'jqxDeployGrid', _vrMagnifierDeploySizer);
                $('#MagnifierDialog').append($("#idDeploy"));
                //$("#divDeploy").css("margin-left", "160px");
                $("#imgDeployUserPref").css("display", "block");
                $(".clsdeployfieldcontent").css("margin-left", "190px");
                $(".clsdeploystatus").css("margin-left", "10px");
                $("#txtDeploySearch").css("margin-left", "10px");
                $("#btnDeployResetSearch").css("margin-right", " 137px");
                $("#jqxDeployGrid").css("margin-left", " 15px");
                $(".clsdeployfieldleft .ui-datepicker-trigger").css("margin-top", " 2px");
                _vrGridDeployMagnify = 1;
                loadJqxDeployMagifyClickGrid();
                filterDeployJqxGrid();
                $("#btnDeployResetSearch").click(function () {
                    $("#txtDeploySearch").val("");
                    filterDeployJqxGrid();
                });
                if (vrDeployPageNumInMagnify >= 0) {//check and redirect to page in magnify pop up based on page number in widget. 
                    $("#jqxDeployGrid").jqxGrid('gotopage', --vrDeployPageNumInMagnify);
                }
            }
            else if (_idbtnImgBARMagnify == imgId) {
                $('#MagnifierDialog').dialog('option', 'title', _BARTitle);

                $('#MagnifierDialog').dialog('open');
                _vrMagnifyCloneTitle= _BARTitle;
                $("#divMainLoader").css("display", "inline");
                $('#MagnifierDialog').append($("#idShowBARInMagnify"));
                _vrSetWidthOfGraph = 1080;
                _vrSetHeightOfGraph = 400;
                //loadBARData();
                showbrEmpgraph();

            }
            else if (_idImgQuoteMagnify == imgId) {
                openMagnifyDialogBox(_vrQuotation, 'jqxQuotationGrid', _vrMagnifierDeploySizer);
                //$('#MagnifierDialog').dialog('option', 'title', _vrQuotation);
                //$('#MagnifierDialog').dialog('open');
                $('#MagnifierDialog').append($(".clsquotetoappend"));
               // $("#jqxQuotationGrid").jqxGrid({ source: _vrQuoteData });
                bindDataToJqx("jqxQuotationGrid", _vrQuoteData, _vrQuoteWidgetColumns, _vrMagnifyGridWidth);
                filterBasedOnQuoteStatus();

            }
           
        });

        $gridsterEl.on('click', '.resize_widget', function () {
            $widget = $(this).parents('.widget');
        
            $widgetSizeX = $widget.attr('data-sizex');
            $widgetSizeY = $widget.attr('data-sizex');
           
            ($widgetSizeX === "1" && $widgetSizeY === "1") ? (gridsterAPI.resize_widget($widget, 2, 2, true)) : (gridsterAPI.resize_widget($widget, 1, 1, true));
            pagerMgnfierDisplay($widget, $widgetSizeX, $widgetSizeY);
        });

        $gridsterEl.on("click", ".gs-resize-handle", function () {
            // var vrParentWidth = $(this).parents('.widget').width();
            // $("#jqxgrid").width($(this).parents('.widget').width());
        });
    };

   
    var addWidget = function appendWidget(fnFetch) {
        try {
            if ($("#MagnifierDialog").dialog("isOpen") === false) {
                $("#divMagnifyHdrTitle").css("display", "none");
            }
            
            if (_idSlider === _idTasks) {
                _vrLocalTaskDataOnTaskClick = null;
                $("#ddlTaskTrailSprint").append("<option value='0'>Select sprint</option>");
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsusertasks').length) {
                    gridster.remove_widget($('.clsusertasks'));
                }
                               
                bindDataToTaskDropDownDyn();
                _BaseUrl = _vrLocationOrigin + '/Task/GetStatusDetails?strTokenID=' + _vrUserTokenId;
                ajaxCall(_BaseUrl, bindStatus);
                if ((_UserRoleId == _vrUserRoleId || _UserRoleId == _vrClientRoleId) && _vrUserIsProjManager == false) {
                    $("#lnkNewTask").css("color", "#B3BFCB");
                    $("#imgNewTask").css("display", "none");
                    $("#btnRefreshTasksGrid").css("margin-right", "80px");
                    $("#btnExportTasks").css("margin-right", "-22px");
                    $(".clslogin").css("width", "350px");
                    $("#lnkBar").css("display", "none");
                }
                //load the grid based on controls values in the task trail widget.
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1){//Check the value is empty 
                    _taskIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetTasksSlide');
                    if (_taskIndexNO > -1) {
                        if (Object.keys(_vrWidgetCOntrolData[_taskIndexNO]).length > 0) {//Check if there are any cntrol id.
                            var objControlData = {
                                EmpID: _vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailEmployee,
                                ProjectID: _vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailProject,
                                SprintID: _vrWidgetCOntrolData[_taskIndexNO].ddlTaskTrailSprint,
                                IsExcludeCSD: _vrWidgetCOntrolData[_taskIndexNO].chkFilterTasks,
                                StatusID: _vrWidgetCOntrolData[_taskIndexNO].ddlTskTrailStatus,
                                TokenID: _vrUserTokenId
                            };
                            _BaseUrl = _vrLocationOrigin + '/Task/GetTaskDataUsingEmpID/';
                            ajaxCallWithObject(_BaseUrl, objControlData, bindTasksBasedOnConTrolData);
                            $("#chkFilterTasks").prop("checked", _vrWidgetCOntrolData[_taskIndexNO].chkFilterTasks);
                            _vrCheckDragNDrop = '';
                        }
                    }
                    else {
                        bindTasksBasedOnClientID(_vrTaskProjId, _EmpId, _vrBlnExcludeDefault, bindJqxGrid);
                        _taskIndexNO = -1;
                    }
                }
                else {
                    bindTasksBasedOnClientID(_vrTaskProjId, _EmpId, _vrBlnExcludeDefault, bindJqxGrid);
                    _taskIndexNO = -1;
                }
                if (_vrBtnWidgetResize > 0) {
                    _vrBtnWidgetResize = 0;
                }
                userPrefPosition(widgetHTMLTasks, _idSlider);
                $("#imgTasksMagnify").attr("disabled", false);
            }
            else if (_idSlider == _idBugs) {
                _vrLocalBTDataOnBugClick = null;
                localStorage.setItem('jqxGridjqxBugTrial', JSON.stringify(_vrLocalBTDataOnBugClick));
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsbugtrail').length) {
                    gridster.remove_widget($('.clsbugtrail'));
                }
                userPrefPosition(widgetHTMLBug, _idSlider);
                setDefaultValuesBugTrail();
                bindDataToBugDropDownDyn();
                BindValuesToBugFields();
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _BTIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetBugsSlide');
                    if (_BTIndexNO > -1) {
                        if (Object.keys(_vrWidgetCOntrolData[_BTIndexNO]).length > 0) {
                            var objContrlBugDetails = {
                                strPrjctID: _vrWidgetCOntrolData[_BTIndexNO].ddlBugTrProject,
                                intTaskId: _vrWidgetCOntrolData[_BTIndexNO].ddlBugTrTaskName,
                                strStatus: _vrWidgetCOntrolData[_BTIndexNO].ddlBugStatus,
                                strFrmDate: _vrWidgetCOntrolData[_BTIndexNO].txtBugTrFromDate,
                                strUsrRleID: _UserRoleId,
                                boolOnHoldFilter: _vrWidgetCOntrolData[_BTIndexNO].chkHoldBugs,
                                TokenID: _vrUserTokenId
                            };
                            var vrArrFromDate = _vrWidgetCOntrolData[_BTIndexNO].txtBugTrFromDate.split("/");
                            var vrArrToDate = _vrWidgetCOntrolData[_BTIndexNO].txtBugTrToDate.split("/");
                            vrArrFromDate = vrArrFromDate[2] + "-" + vrArrFromDate[1] + "-" + vrArrFromDate[0];
                            vrArrToDate = vrArrToDate[2] + "-" + vrArrToDate[1] + "-" + vrArrToDate[0];
                            objContrlBugDetails.strFrmDate = vrArrFromDate;
                            objContrlBugDetails.strToDate = vrArrToDate;
                            objContrlBugDetails.blnDate = ((_vrWidgetCOntrolData[_BTIndexNO].txtBugTrFromDate.length > 0) && (_vrWidgetCOntrolData[_BTIndexNO].txtBugTrToDate.length > 0)) ? true : false;
                            objContrlBugDetails.strEmpID = (parseInt(_vrWidgetCOntrolData[_BTIndexNO].ddlBugTrEmp) > 0) ? _vrWidgetCOntrolData[_BTIndexNO].ddlBugTrEmp : _EmpId;
                            objContrlBugDetails.blnEmpID = (parseInt(_vrWidgetCOntrolData[_BTIndexNO].ddlBugTrEmp) > 0) ? true : false;
                            objContrlBugDetails.blnPrjct = (parseInt(_vrWidgetCOntrolData[_BTIndexNO].ddlBugTrProject) > 0) ? true : false;
                            objContrlBugDetails.blnTaskId = (parseInt(_vrWidgetCOntrolData[_BTIndexNO].ddlBugTrTaskName) > 0) ? true : false;
                            objContrlBugDetails.blnStatus = (parseInt(_vrWidgetCOntrolData[_BTIndexNO].ddlBugStatus) > 0) ? true : false;
                            _BaseUrl = _vrLocationOrigin + '/Bug/GetBugFilterData';
                            ajaxCallWithObject(_BaseUrl, objContrlBugDetails, bindBugTrial);
                            $("#chkHoldBugs").prop("checked", _vrWidgetCOntrolData[_BTIndexNO].chkHoldBugs);
                            _vrCheckDragNDrop = '';
                        }
                    }
                    else {
                        FilterBugTrail();
                        _BTIndexNO = -1;
                    }
                }
                else {
                    FilterBugTrail();
                    _BTIndexNO = -1;
                }
                bindBugStatus();
                if (_vrBtnBugTrailResize > 0) {
                    _vrBtnBugTrailResize = 0;
                }
            }
            else if (_idSlider == _idProjects) {
                _vrLocalTaskDataOnProjClick = null;
                _vrSelProjStatus = '', _vrSelProjCustomer = '';
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsprojwidget').length) {
                    gridster.remove_widget($('.clsprojwidget'));
                }
                userPrefPosition(widgetHTMLProject, _idSlider);
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _projIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetProjectsSlide');
                    _vrCheckDragNDrop = '';
                }
                fetchProjectsData();

                if (_UserRoleId == _vrClientRoleId) {
                    $("#ddlProjCustomer").css("display", "none");
                    $("#btnCreateProject").css("display", "none");
                    $("#btnRefreshProjectsGrid").css("margin-right", "85px");
                    $(".search-wrapper-proj").css("margin-left", "160px");
                    $("#btnExportProjGrid").css("margin-right","-21px");
                }

            }
                //Checks for the customer div
            else if (_idSlider == _idCustomer) {
                _vrSelCustomerStatus = '';
                _vrLocalCustDataOnCustClick = null;
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clscustomertrail').length) {
                    gridster.remove_widget($('.clscustomertrail'));
                }
                $("#ddlCustomerProject").empty();
                userPrefPosition(widgetHTMLCustomer, _idSlider);
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _custIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetCustomerSlide');
                    _vrCheckDragNDrop = '';
                }
                bindCustomersDetails();

            }
                // checks for user div
            else if (_idSlider == _idUser) {
                _vrLocalUserDataOnUserClick = null;
                _vrSelUserStatus = '';
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsuser').length) {
                    gridster.remove_widget($('.clsuser'));
                }
                $("#ddlUserstatus").empty();

                userPrefPosition(widgetHTMLUser, _idSlider);
                bindUserStatus();
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _userIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetUserSlide');
                    _vrCheckDragNDrop = '';
                }
                LoadUserDataToWidget();

            }
                // checks for BIlling Report div
            else if (_idSlider == _idBillingReport) {
                _vrSelUserStatus = '';
                _vrDragDropBillRprt = '1';
                _vrBillingLoadingFlag = _vrBillingGridInit;
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsBillingReport').length) {
                    gridster.remove_widget($('.clsBillingReport'));
                }
                userPrefPosition(widgetHTMLBIllingReport, _idSlider);
                if (_vrWidgetCOntrolData.length > 0 &&_vrCheckDragNDrop == 1) {
                    _BRIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetBillingReportSlide');
                    if (_BRIndexNO > -1) {
                        if (Object.keys(_vrWidgetCOntrolData[_BRIndexNO]).length > 0) {
                            _vrBRCheckCallFromLogin = 1;
                            loadFieldsDataToBillRprt();
                            _BaseUrl = _vrLocationOrigin + '/Task/FilterBillingDetails';
                            var objBRDetails = {
                                EmpID: _vrWidgetCOntrolData[_BRIndexNO].ddlBillingRprtEmpName,
                                ProjectID: _vrWidgetCOntrolData[_BRIndexNO].ddlBillingRprtProjectName,
                                IsBeyondScope: _vrWidgetCOntrolData[_BRIndexNO].chkBillingReportBeyondScope,
                                TokenID: _vrUserTokenId,
                                ProjectManager: _EmpId,
                                RoleID: _UserRoleId,
                                IsProjectManager: _vrUserIsProjManager,
                                LoggedInEmpID: _EmpId
                            };
                            var vrArrFromDate = _vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtFromDate.split("/");
                            var vrArrToDate = _vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtToDate.split("/");
                            vrArrFromDate = vrArrFromDate[2] + "-" + vrArrFromDate[1] + "-" + vrArrFromDate[0];
                            vrArrToDate = vrArrToDate[2] + "-" + vrArrToDate[1] + "-" + vrArrToDate[0];
                            objBRDetails.BlnEmpID = (parseInt(_vrWidgetCOntrolData[_BRIndexNO].ddlBillingRprtEmpName) > 0) ? true : false;
                            objBRDetails.BlnProject = (parseInt(_vrWidgetCOntrolData[_BRIndexNO].ddlBillingRprtProjectName) > 0) ? true : false;
                            objBRDetails.BlnFromDate = (_vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtFromDate.length > 0) ? true : false;
                            objBRDetails.BlnToDate = (_vrWidgetCOntrolData[_BRIndexNO].txtBillingRprtToDate.length > 0) ? true : false;
                            objBRDetails.FromDate = vrArrFromDate;
                            objBRDetails.ToDate = vrArrToDate;
                            //vrBillingFlag = true;
                            ajaxCallWithObject(_BaseUrl, objBRDetails, bindBillingReportData);
                            if (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false) {
                                $("#ddlBillingRprtEmpName").attr("disabled", true);
                            }
                            $("#chkBillingReportBeyondScope").prop("checked", _vrWidgetCOntrolData[_BRIndexNO].chkBillingReportBeyondScope);
                            _vrCheckDragNDrop = '';
                        }
                    }
                    else {
                        loadFieldsDataToBillRprt();
                        _BRIndexNO = -1;
                    }
                }
                else {
                    loadFieldsDataToBillRprt();
                    _BRIndexNO = -1;
                }

            }
            else if (_idSlider == _idDashboard) {
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsclientroletskdetcharts').length) {
                    gridster.remove_widget($('.clsclientroletskdetcharts'));
                }
                // gridsterAPI.add_widget(widgetHTMLProjDetChart, _vrUserPrefWidgetWidth, 1);
                userPrefPosition(widgetHTMLProjDetChart, _idSlider);
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _DashboardIndexNo = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetDashboardslide');
                    if (_DashboardIndexNo > -1) {
                        _vrCheckDragNDrop = '';
                    }
                }
                loadDdlInTasksCount();
            }
                //else if( _idSlider==_idProcSlide) {
                //    $("#" + _idSlider).find("button").prop("disabled", "true");
                //    var gridster = $('.gridster').gridster().data('gridster');
                //    if ($('.gridster .clsprocs').length) {
                //        gridster.remove_widget($('.clsprocs'));
                //    }
                //    userPrefPosition(widgetHTMLPolicies, _idSlider);
                //    }
                //Created for slider of deployment grid by anvesh 06-02-15
            else if (_idSlider == _idDeployment) {
                _vrsliderDates = 1;
                _vrGridDeployMagnify = 0;
                _vrLocalDeployData = null;
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsdeploy').length) {
                    gridster.remove_widget($('.clsdeploy'));
                }
                userPrefPosition(widgetHTMLDeployment, _idSlider);
                BindValuesToDeployFields();
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _deployIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetDeploymentSlide');
                    if (_deployIndexNO > -1) {
                        if (Object.keys(_vrWidgetCOntrolData[_deployIndexNO]).length > 0) {
                            $("#txtDeployFromDate").val(_vrWidgetCOntrolData[_deployIndexNO].txtDeployFromDate);
                            $("#txtDeployToDate").val(_vrWidgetCOntrolData[_deployIndexNO].txtDeployToDate);
                            $("#ddlDeploystatus").val(_vrWidgetCOntrolData[_deployIndexNO].ddlDeploystatus);
                            $("#txtDeploySearch").val(_vrWidgetCOntrolData[_deployIndexNO].txtDeploySearch);
                            _vrCheckDragNDrop = '';
                        }
                    }
                }
                FilterDeploymentDetail();
            }
            else if (_idSlider == _idQuote) {
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsquotation').length) {
                    gridster.remove_widget($('.clsquotation'));
                }
                if (_vrWidgetCOntrolData.length > 0 && _vrCheckDragNDrop == 1) {
                    _QuoteIndexNO = getIndexOfObjBasedOnValue(_vrWidgetCOntrolData, _vrWidgetIDProperty, 'divWidgetQuotationSlide');
                    _vrCheckDragNDrop = '';
                }
                loadQuotationFields();
                userPrefPosition(widgetHTMLQuotation, _idSlider);
            }
            else if (_idSlider == _idBarScore) {
                $("#idBARLoading").css("display", "block");
                $("#" + _idSlider).find("button").prop("disabled", "true");
                var gridster = $('.gridster').gridster().data('gridster');
                if ($('.gridster .clsbrPoints').length) {
                    gridster.remove_widget($('.clsbrPoints'));
                }
                $("#idBARLoading").css("display", "block");
                _varcheckDragDropBAR = 0;
                _vrSetWidthOfGraph = 850;
                _vrSetHeightOfGraph = 320;
                userPrefPosition(widgetHTMLBAR, _idSlider);
                LoadDataToBARControls();
                loadBARData();
                //if (_UserRoleId == _vrClientRoleId || (_UserRoleId == _vrUserRoleId && _vrUserIsProjManager == false)) {
                //    $("#btnAddScore").css("display", "none");
                //    $("#btnRefreshBarGraph").addClass("clsrefreshbarscore");
                //}
            }

            else {
                gridsterAPI.add_widget(widgetHTML, 1, 1);

            }
            $(".dropdown-menu").css("display", "none");
            _vrUserPrefWidgetWidth=1;
            setTimeout(function () {
                checkUserPrefWidgets(_idSlider);
                // do something with text
            }, 1000);
            checkUserPrefWidgets(_idSlider);
       
        }
        catch (e) {
        }
            //end of customer information

    };

    function userPrefPosition(WidgetToAppend, SliderId) {
        var vrPosWidget = checkUserPrefWidgetsPosition(SliderId).split(",");
        if ($.trim(vrPosWidget).length > 0) {
            gridsterAPI.add_widget(WidgetToAppend, parseInt(vrPosWidget[0]), parseInt(vrPosWidget[1]), parseInt(vrPosWidget[2]), parseInt(vrPosWidget[3]));
        } else {
            if (SliderId == _idBarScore) {
                gridsterAPI.add_widget(WidgetToAppend, 2, 1);
            }
            else {
                gridsterAPI.add_widget(WidgetToAppend, 1, 1);
            }
        }
    }
    return {
        init: init,
        addToWidget: addWidget
    }
}(jQuery, document));



/**
*Code for the droppable
*/
var droppable = startupModule(function () {
    var $droppableEl;

    var init = function () {
        $droppableEl = $('.gridster-container .gridster');
        $droppableEl.droppable({
            //activeClass: "ui-state-default",
            hoverClass: "gridster-container-hover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                //console.log('STOP position: ' + ui.position.top +' '+ ui.position.left );
                var fetch = $(this).data('fetch');
                if (fetch) {
                    gridster.addToWidget(fetch);
                }
            }
        });
    };

    return {
        init: init
    }
}(jQuery, document));



//$slides = $(".slider");
//$(".container", $slides).draggable({
//    revert: "invalid", // when not dropped, the item will revert back to its initial position
//    containment: "document",
//    helper: "clone",
//    cursor: "move",
//    start: function () {
//        var role = $(this).closest(".slider").attr("id");
//        // Here, role is either the id or undefined if no role could be found
//    }
//});