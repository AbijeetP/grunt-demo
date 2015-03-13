function openDashboard() {
    $('#dailog').dialog('option', 'title', _vrDashBoardTitle);
    $(".clsdailogfields").css("display", "none");
    $("#divDashboardGraphs").css("display", "inline-block");
    $('#dailog').dialog('open');

    _BaseUrl = _vrLocationOrigin + '/User/GetActiveEmployeeDetails?strTokenID=' + _vrUserTokenId + '&blnIsProjectManager=' + _vrUserIsProjManager + '&intEmpID=' + _EmpId + '&intRoleID=' + _UserRoleId;
    ajaxCall(_BaseUrl, bindGraphEmployeesDdl);
    if (_vrUserIsProjManager) {
        $("#ddlGraphEmployees").attr("disabled", false);
    }
    else {
        $("#ddlGraphEmployees").attr("disabled", true);
    }
}

function bindGraphEmployeesDdl(data) {
    $("#ddlGraphEmployees").empty();
    $("#ddlGraphEmployees").append("<option value='0'>Select employee</option>");
    if (typeof data != 'undefined') {
        bindDataToDropDown(data, 'ddlGraphEmployees', 'EmpID', 'EmpFirstName');
    }
    $("#ddlGraphEmployees").val(_EmpId);
    $("#ddlGraphEmployees").chosen();
    $("#ddlGraphEmployees").trigger("chosen:updated");
    bindProjectsDdl();
    //bindGraphValues();
}
function bindProjectsDdl() {
   
    $("#ddlGraphProjects").val("0");
    $("#ddlGraphProjects").trigger("chosen:updated");
    var vrDdlEmpVal = $("#ddlGraphEmployees").val();
    var vrUserRoleId = $("#ddlGraphEmployees option:selected").data("userrole");
    
    _BaseUrl = _vrLocationOrigin + '/Project/FetchEmpInfrmUpdtsPrjcts?strEmpID=' + vrDdlEmpVal + '&strEmpUserRoleID=' + vrUserRoleId + '&strTokenID=' + _vrUserTokenId;
    ajaxCall(_BaseUrl, bindGraphProjectDdl);
   
    bindGraphValues();
}

function bindGraphValues() {
    var vrDdlEmpVal = $("#ddlGraphEmployees").val();
    var vrDdlProjVal = $("#ddlGraphProjects").val();

    _BaseUrl = _vrLocationOrigin + "/project/GetAllTaskInPieChart?intProjectID=" + vrDdlProjVal + "&intEmployeeID=" + vrDdlEmpVal + "&strDates='nothing'&intRoleID=1&strTokenID=" + _vrUserTokenId;
     $("#graphloaderImage").css("display", "inline");
    ajaxCall(_BaseUrl, bindAllDataToChart);
}
function bindGraphProjectDdl(data) {
    $("#ddlGraphProjects").empty();
    $("#ddlGraphProjects").append("<option value='0'>Select project</option>");
    if(typeof data !='undefined' ){
        bindDataToDropDown(data, 'ddlGraphProjects', "ProjectID", "ProjectName");
        $("#ddlGraphProjects").chosen();
        $('#ddlGraphProjects').trigger('chosen:updated');
}
    $("#ddlGraphProjects").chosen();
    $("#ddlGraphProjects").trigger("chosen:updated");
}

function bindAllDataToChart(source) {
    var data = source[0];
    GeneratePieChartForBugs(data.LstProjectBugDetails);
    GeneratePieChartForTask(data.LstTaskDetails);
    billingHoursChart(data.ArrBillingData);
}

//Method to get the billing charts 
function billingHoursChart(data) {
   
    var arrBillingReport = new Array();
    var arrNonBillingReport = new Array();
    var arrWeekdayNames = new Array();
    for (var i = 0; i < data.length; i++) {
        arrWeekdayNames.push(data[i].WeekDayName);
        arrBillingReport.push(data[i].BillableHours);
        arrNonBillingReport.push(data[i].NonBillableHours);
    }
    $('#billingHoursChartDiv').highcharts({
        chart: {
            type: 'column',
            width: 349,
            height: 299,
            events: {
                load: function (event) {
                    var vDivs = $('#billingHoursChartDiv svg rect');
                    for (var i = 0; i < vDivs.length; i++) {
                        if ($(vDivs[i]).css('fill') == "rgb(255, 255, 255)" || $(vDivs[i]).css('fill') == "#FFFFFF") {
                            $(vDivs[i]).css('fill', 'none');
                        }
                    }
                    //$('#billingHoursChartDiv svg rect').css('fill', 'none');
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: arrWeekdayNames,
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Billing Report'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Billable Hours',
            data: arrBillingReport

        }, {
            name: 'Non-Billable Hours',
            data: arrNonBillingReport

        }]
    });
    $("#graphloaderImage").css("display", "none");
}

function GeneratePieChartForBugs(data) {
 
    if (typeof data == 'undefined' || data.length == 0) {
        $("#BugsGraphContainer").hide();
        $("#divnoDataBugsPie").show();
       // $("#graphloaderImage").css("display", "none");

        return false;
    } else {
        $("#divnoDataBugsPie").hide();
        $("#BugsGraphContainer").show();
    }
    var open = 0;
    var fixed = 0;
    var closed = 0;
    var onHold = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].BugStatusType == "Open") {
            open = data[i].BugCount;
        }
        if (data[i].BugStatusType == "Fixed") {
            fixed = data[i].BugCount;
        }
        if (data[i].BugStatusType == "Closed") {
            closed = data[i].BugCount;

        }
        if (data[i].BugStatusType == "On Hold") {
            onHold = data[i].BugCount;
        }
    }
    var bugGraphResult = [
        { name: "Open", y: parseInt(open), sliced: true, selected: true },
         { name: "Fixed", y: parseInt(fixed) },
          { name: "Closed", y: parseInt(closed) },
           { name: "On Hold", y: parseInt(onHold) }
    ];
    callBugPieChart(bugGraphResult);
  //  $("#graphloaderImage").css("display", "none");
}

//These method is executed after data is prepared.
function callBugPieChart(bugGraphResult) {
    callTaskPieChart(bugGraphResult, 'BugsGraphContainer', 'Bugs Count', 320, 320);
}


function GeneratePieChartForTask(data) {
   
    //$("#graphloaderImage").css("display", "inline");
    if (typeof data == 'undefined' || data.length == 0) {
        $("#container").hide();
        $("#divnoDataTasksPie").show();
       // $("#graphloaderImage").css("display", "none");
        return false;       
    } else {
        $("#divnoDataTasksPie").hide();
        $("#container").show();
    }
    var planned = 0;
    var inProgress = 0;
    var devTesting = 0;
    var readyLive = 0;
    var liveTesting = 0;
    var done = 0;
    var documentation = 0;
    var delivered = 0;
    var stopped = 0;
    var integrationReady = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i].StatusType == "Planned") {
            planned += 1;
        }
        if (data[i].StatusType == "In Progress") {
            inProgress += 1;
        }
        if (data[i].StatusType == "Dev Testing") {
            devTesting += 1;

        }
        if (data[i].StatusType == "Ready Live") {
            readyLive += 1;
        }
        if (data[i].StatusType == "Live Testing") {
            liveTesting += 1;

        }
        if (data[i].StatusType == "Done") {
            done += 1;

        }
        if (data[i].StatusType == "Documentation") {
            documentation += 1;

        }
        if (data[i].StatusType == "Delivered") {
            delivered += 1;

        }
        if (data[i].StatusType == "Stopped") {
            stopped += 1;
        }
        if (data[i].StatusType == "Integration Ready") {
            integrationReady += 1;
        }
    }
    var taskGraphResult =
    [
        { name: "Planned", y: planned },
         { name: "In Progress", y: inProgress, sliced: true, selected: true },
          { name: "Dev Testing", y: devTesting },
           { name: "Ready Live", y: readyLive },
            { name: "Live Testing", y: liveTesting },
             { name: "Done", y: done },
              { name: "Documentation", y: documentation },
               { name: "Delivered", y: delivered },
                { name: "Stopped", y: stopped },
                 { name: "Integration Ready",y:integrationReady }
    ];

    callTaskPieChart(taskGraphResult, 'container', 'Task Count', 400, 400);
    //$("#graphloaderImage").css("display", "none");
}

//These method declares the highchart and assigned it to the bugs and task graph.
function callTaskPieChart(taskGraphResult, container, shareMsg, widthSize, heightSize) {

    var options = {
        chart: {
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            //renderTo: 'container',
            renderTo: container,
            width: widthSize,
            height: heightSize,
            type: 'pie',
            events: {
                load: function (event) {
                    $('.pieChartGraph svg rect').css('fill', 'none');
                    $('.highcharts-tooltip rect').css('fill', 'white');
                }
            }
        },
        title: {
            text: ''
        },

        tooltip: {
            //  pointFormat: "" + shareMsg + ": <b>{point.y:.2f}</b>"
            pointFormat: "" + shareMsg + ": <b>{point.y}</b>"
        },
        series: [{}]
    };

    options.series[0].data = taskGraphResult;
    var chart = new Highcharts.Chart(options);

}
$(document).ready(function () {
    $("#ddlGraphProjects").on("change", function () {
        bindGraphValues();
    });
    $("#graphloaderImage").css("display", "none");
});