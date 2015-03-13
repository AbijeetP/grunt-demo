var StatusType = [];
var TaskCount = [];
var vrAllTasksCount = '';
function refreshProjCountGraph() {
    _DashboardIndexNo = -1;//clear the control values on refresh click;
    $("#txtCltTasksToDate").datepicker("setDate", new Date());
    $("#txtCltTasksFromDate").datepicker("setDate", '-1M');
    var fromdate = $("#txtCltTasksFromDate").val();
    $('#txtCltTasksToDate').datepicker('option', 'minDate', fromdate);
    loadDdlInTasksCount(); FilterTasksCountGraph();
}

function loadDdlInTasksCount() {
    $("#divProjTotalCount").css("display", "none");
    if (_UserRoleId == _vrClientRoleId) {
        var objFilterParams = {
            ClientID: _EmpId,
            TokenID: _vrUserTokenId
        };
        _BaseUrl = _vrLocationOrigin + '/Customer/GetClientActivePrjs';
        ajaxCallWithObject(_BaseUrl, objFilterParams, bindActiveProjDropdown);
    }
    if (_UserRoleId != _vrClientRoleId) {
        //_BaseUrl = _vrLocationOrigin + '/Customer/GetClientActivePrjs';
        _BaseUrl = _vrLocationOrigin + '/Project/GetAllProjects?&strTokenID=' + _vrUserTokenId;
        ajaxCall(_BaseUrl, bindActiveProjDropdown);
    }
}
function bindActiveProjDropdown(source) {
    //$(".clslimitdatepicker").datepicker({
    //    showOn: "button",
    //    buttonImage: "img/calendar.gif",
    //    buttonImageOnly: true,
    //    buttonText: "Select date",
    //    dateFormat: 'dd/mm/yy',
    //    changeMonth: true,
    //    changeYear: true,
    //    maxDate: new Date(),
    //    yearRange: _vrMinYear + ":" + dtToday.getFullYear()

    //});
    var dates = $("#txtCltTasksFromDate,#txtCltTasksToDate").datepicker({
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
            if ($.trim($("#txtCltTasksFromDate").val()).length > 0) {
                for (var i = 0; i < dates.length; ++i) {
                    if (dates[i].id > this.id)
                        $(dates[i]).datepicker('option', 'minDate', date);
                }
            }

        }
    });

    //$('#txtCltTasksToDate').datepicker('option', 'minDate', "-1d");
    $("#txtCltTasksToDate").datepicker("setDate", new Date());
    $("#txtCltTasksFromDate").datepicker("setDate", '-1M');
    var fromdate = $("#txtCltTasksFromDate").val();
    $('#txtCltTasksToDate').datepicker('option', 'minDate', fromdate);
    var vrResult = 0;
    if (_UserRoleId == _vrClientRoleId) {
        var data = source.MultipleResults;
    }
    else if (_UserRoleId != _vrClientRoleId) {
        var data = source;
    }
   // var vrArrData = data;
    //vrResult = jQuery.grep(vrArrData, function (element, index) {
    //    return (element.StatusID == _vrInProgId || element.StatusID == _vrPlannedId); // retain appropriate elements
    //});
    $("#lblActiveProjects").text(source.RecordCount);
    if (typeof data == 'undefined') {
        FilterTasksCountGraph();
        return false;
    }
    if(   data.length >0){
    $("#ddlClientProjects").empty();
}
    bindDataToDropDown(data, 'ddlClientProjects', 'ProjectID', 'ProjectName');
    if (_DashboardIndexNo > -1) {
        if (Object.keys(_vrWidgetCOntrolData[_DashboardIndexNo]).length > 0) {
            $("#ddlClientProjects").val(_vrWidgetCOntrolData[_DashboardIndexNo].ddlClientProjects);
            $("#txtCltTasksToDate").datepicker('option', 'minDate', _vrWidgetCOntrolData[_DashboardIndexNo].txtCltTasksFromDate);
            $("#txtCltTasksFromDate").datepicker("setDate", _vrWidgetCOntrolData[_DashboardIndexNo].txtCltTasksFromDate);
            $("#txtCltTasksToDate").datepicker("setDate", _vrWidgetCOntrolData[_DashboardIndexNo].txtCltTasksToDate);

        }
    }
    FilterTasksCountGraph();
}

function FilterTasksCountGraph() {
    $("#divPrjTsksCountLoader").css("display", "block");
    var vrTasksToDate = $("#txtCltTasksToDate").val();
    var vrTasksFromDate = $("#txtCltTasksFromDate").val();
    var fromdate = $("#txtCltTasksFromDate").val();
    $('#txtCltTasksToDate').datepicker('option', 'minDate', fromdate);
    var vrSplitToDate = vrTasksToDate.split("/");
    var vrSplitFromDate = vrTasksFromDate.split("/");
    vrTasksToDate = vrSplitToDate[2] + '-' + vrSplitToDate[1] + '-' + vrSplitToDate[0];
    vrTasksFromDate = vrSplitFromDate[2] + '-' + vrSplitFromDate[1] + '-' + vrSplitFromDate[0];
    var vrSelProject = $("#ddlClientProjects").val();
    var vrSelProjName = $("#ddlClientProjects option:selected").text();
    cropText($("#lblDshPrjName"), vrSelProjName, _vrDshProjLen);
    if (vrSelProject=='0') {
        $("#lblDshPrjName").text("None");
    }
    var objFilterParams = {
        intProjectId: vrSelProject,
        FromDate: vrTasksFromDate,
        ToDate: vrTasksToDate,
        ClientID: _EmpId,
        TokenID: _vrUserTokenId
    };
    //_vrLocationOrigin
    _BaseUrl = _vrLocationOrigin + '/Customer/GetProjTskDetails';
    ajaxCallWithObject(_BaseUrl, objFilterParams, bindProjDetailsGraph);
    _DashboardIndexNo = -1;// clearing the flag value after setting the control data
}

function bindProjDetailsGraph(source) {
    var data = source.MultipleResults[0];
    OrganisePrjctDtlsData(data);
}

function OrganisePrjctDtlsData(data) {
    vrAllTasksCount = 0;
    StatusType = [];
    TaskCount = [];

    var objArrStatusType = data.lstTasksStatus;
    var objArrTaskCount =data.lstPrjTasksCount;
    for (var intLoop = 0; intLoop < objArrStatusType.length; intLoop++) {
        StatusType[intLoop] = objArrStatusType[intLoop].StatusType;
        TaskCount[intLoop] = 0;
    }
    for (var intLoop = 0, intArray = 0; intLoop < objArrTaskCount.length; intLoop++, intArray++) {
        var vrStatusType = objArrTaskCount[intArray].StatusType;
        var vrStatusCount  = objArrTaskCount[intArray].StatusCount;
        var vrIndex = jQuery.inArray(vrStatusType, StatusType);
        TaskCount[vrIndex] = vrStatusCount;
    }
    //for (var intLoop = 0; intLoop < TaskCount.length; intLoop++)
    //{
    //    if (TaskCount[intLoop] > 1)
    //    {
    //        break;
    //    }
    //    else if (TaskCount[intLoop] == 1)
    //    {
    //        TaskCount[intLoop]=
    //    }
    //}
    
    $.each(TaskCount, function () {
        vrAllTasksCount += parseInt(this);
    });
    $("#lblDshTasksCount").text(vrAllTasksCount);
    BindPrjTskDetailsChart();
}

function BindPrjTskDetailsChart() {
    $(".highcharts-container svg").css("background-color", "transparent");
    $(function () {
        $('#divPrjctTskDtlsChart').highcharts({
            chart: {
                type: 'bar',
                events: {
                    load: function (event) {

                        var vDivs = $('.highcharts-container svg rect');
                        for (var i = 0; i < vDivs.length; i++) {
                            if ($(vDivs[i]).css('fill') == "rgb(255, 255, 255)" || $(vDivs[i]).css('fill') == "#ffffff") {
                                $(vDivs[i]).css('fill', 'none');
                            }
                        }
                    }
                }
            },
            title: {
                text: ''
            },

            xAxis: {
                categories: StatusType,
                labels: {
                    //rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '11px',
                        fontColor: 'black',
                        fontFamily: 'Verdana, sans-serif',
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'No. of tasks'
                },
                minTickInterval: 1
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    colorByPoint: true, 
                    pointPadding: 0.1,
                    borderWidth: 0

                }
            },
            series: [{
                showInLegend: false,
                name: 'No. of tasks',
                data: TaskCount

            }]
        });
    });
    //$(".highcharts-container svg").css("background-color", "transparent");
    ChangeColorOfGraphText();
    $("#divPrjTsksCountLoader").css("display","none");
}

function ChangeColorOfGraphText() {
    // var color = $(".highcharts-axis-labels text").css('fill', 'black');//to change the color of the text

    var color = $(".highcharts-series-group>g>rect");//to change the color of the bars
    $(color[0]).css('fill', 'rgb(59, 197, 216)');
    $(color[1]).css('fill', 'rgb(240, 93, 93)');
    $(color[2]).css('fill', 'rgb(207, 80, 121)');
    $(color[3]).css('fill', 'yellow');
    $(color[4]).css('fill', 'rgb(110, 138, 248)');
    $(color[5]).css('fill', 'rgb(0, 196, 55)');
    $(color[6]).css('fill', 'rgb(168, 32, 173)');
    $(color[7]).css('fill', 'rgb(255, 227, 186)');
    $(color[8]).css('fill', 'black');
}

//Bind of different colors for chart

