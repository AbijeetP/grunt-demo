
var _vrLocationOrigin = 'http://10.0.0.19:8087/webapi';   // 'http://localhost:54405';  //'http://localhost:54405';// 'http://10.0.0.19/webapi'; //'http://testbetawebstation.osmosystems.com/api';////'http://localhost:54405';//'http://10.0.0.19/webapi'; //'http://10.0.0.19/webapi';//

var _vrLocalUrl = 'http://10.0.0.19:8087/webapi';//'http://localhost:54405'; //'http://10.0.0.87/webapi';// 'http://10.0.0.87/webapi';//
//var _vrMainWebstationPath = 'http://webstation.osmosystems.com/Images/EmpProfilePic/';
//var _vrAttachedFilesPath = 'http://webstation.osmosystems.com/AttachedFiles/';

//var _vrMainWebstationPath = 'http://10.0.0.19:8087/webapi/EmpPics/';
//var _vrAttachedFilesPath = 'http://10.0.0.19:8087/webapi/AttachedFiles/';

var _vrMainWebstationPath = 'http://testbetawebstation.osmosystems.com/EmpPics/';
var _vrAttachedFilesPath = 'http://testbetawebstation.osmosystems.com/AttachedFiles/';
//var _vrAttachedFilesPath = 'http://10.0.0.19:8087/webapi/AttachedFiles/';
var _vrDialogBoxProjBillSummary = "Project billing summary report";
var _vrDragDropBillRprt = '';
var _vrLoggedCheckDefault = '1';
var _vrLoggedCheckHome = '';
var _vrGetInfrmUpdCount = '';
var _vrHostAddressDefault = 'http://';
var _vrUserTokenId = '';
var _vrBtnWidgetResize = 0;//Regarding resize button click in the task trail widget.
var _vrBtnBugTrailResize = 0;//Regarding resize button click in the bug trail widget.
var _vrBtnDeployResize = 0;//Regarding resize button click in the deploy widget.
var _vrBtnTaskWidgetResize = 'btnResizeTasksWidget';
var _vrBtnBugTrailWidgetResize = 'btnResizeBugTrailWidget';
var _vrBtnDeployWidgetResize = 'btnResizeDeployWidget';
var _vrUserPrefWidgetWidth = 1;
var _vrUserAlternateEmailTxtBoxName = 'txtNewUserAltEmail';
//storing in an array for all jqxgrids userpreferences ids
//var _vrArrJqxGrids = [jqxGridjqxBillingReport,jqxGridjqxBugTrial,jqxGridjqxCustomerTrial,jqxGridjqxProjectsGrid,jqxGridjqxTasksgrid,jqxGridjqxUserTrial];
var _vrUserPreferredWidgets = '';
var _vrObjJqxGrids = { jqxGridjqxBillingReport: '', jqxGridjqxBugTrial: '', jqxGridjqxCustomerTrial: '', jqxGridjqxProjectsGrid: '', jqxGridjqxTasksgrid: '', jqxGridjqxUserTrial: '', gridsterWidgets: '' };
var _vrMonthShortHand = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var _vrUserIsProjManager = '';
var _vrNonBillDiv = "<div class='commntsnonbill'>*Comments for Non-billable hours*</div>";
var _vrNonBillTextDiv = "*Comments for Non-billable hours*";
var _vrNonBillReplace = "&^%&*";
var _vrNonBillSepText = '\r\n*Comments for Non-billable hours*\r\n';
var _vrNonBillMailComments = '\r\nComments for Non-billable hours:\r\n';
var _vrNonBillableTask = '', _vrTskProjBudgetPlannedId = 'txtNewProjBudgetEfforts', _vrMaxLengthProjBudget = 7, _vrMaxEffLength = 5, _vrMaxLengthTxt = 5;
var _vrMinYear = 1960;
var _vrErrResponseId = '-1', _vrInProgId = '2';
var _vrErrorMsg = "Unable to process request. Please try again.";
var _vrPicExt = '.jpg';
var _EmpDefaultPic = "default_profile.jpg";
var _vrUploadEmpPicdefault = "img/userProfilePic.jpg";
var _DefaultAttachedFileName = '';//It is just to send value if attached one is image for employee
var _SemiUploadedPath = '/UploadedFiles/';// '/api/UploadedFiles/';
var _vrFileSize = 3680000;//In Bytes --Approximate to 3.5 MB;
var _vrMaxFileSize = 3.5;
var _vrLimitFileName = 40;
var _vrLimitBugFileName = 25;
var _vrUpdateLimitFileName = 25;
var _vrChkEmpLength = 15;
var _vrAssignedByName = 20;
var _vrTaskSubLen = 14, _vrMonthHrs = 3, _vrWeekHrs = 2, _vrHrsLengthDefault = 5;
var _vrPlannedId = '1';
var _vrResponseId = '1';
var _vrResponseFailureId = '0';
var _vrCloseDialog = '';
var _vrDefaultTskCatogery = 1;
var _VrGridID = '';
var _VrDefaultFileSize = 0;
var _vrBlnExcludeDefault = true;
var _vrAttachedFileMessage = 'Attached file size should be less than or equal to 3.5MB.';
var _vrFilesCount = "Group of file names length should be less than 200.";
var _vrFileSizeMsg = "Attached file doesn't contains any data.";
var _vrFileNameMsg = 'This file has already been selected';
var _vrValidateEmail = 'Email is required.';
var _vrValidatePsw = 'Password is required.';
var _vrValidateBoth = 'Email and Password are required.';
var _vrValidateCred = 'Invalid Credentials.';
var _vrblnProjId = false, _vrblnTaskId = false, _vrblnStatus = false, _vrFilterDates = true, _vrblnEmpName = false;
var _vrddlProjId = '0', _vrddlTaskId = '0', _vrddlStatus = '0', _vrddlEmpName = '0', _vrBugTrFromDate = '', _vrBugTrToDate = '';
var _vrFlagPriority = '1', _vrFlagTaskCategory = '2', _vrFlagNewBugTrTask = '3', _vrFlagTskCustomer = '4', _vrFlagTskProject = '5', _vrFlagTskModules = '6', _vrFlagLoadBugTrEmp = '7', _vrFlagBugStatus = '8', _vrFlagBugTrTask = '9', _vrFlagBugTrProject = '10', _vrFlagNewBugFields = '11', _vrFlagUpdateBugFields = '12', _vrFlagBugProj = '13', _vrFlagBugEmp = '14', _vrFlagTaskProj = '15', _vrFlagTaskEmp = '16', _vrFlagBindStatusRole = '17', _vrFlagBindStatusRoleUser = '18', _vrFlagBindCountrys = '19', _vrFlagBindUpdatedCountrys = '20', _vrFlagNewUserRole = '21', _vrFlagBindUpdatedCountrys = '22', _vrFlagBIllingReportBindProjects = '23', _vrFlagBIllingReportBindEmployees = '24', _vrFlagTaskNewTaskSprintName = '25', _vrFlagTaskWidgetSprintName = '26', _vrTskOpenBugsTsk = '27', _vrTskOpenBugsTaskStatus = '28', _vrFlagDeployProject = '29', _vrFlagDeployTask = '30', _vrFlagDeployApplication = '31', _vrFlagActiveEmployees = '32', _vrFlagCategory = '33', _vrFlagSubCategory = '34', _vrFlagBrActiveEmployees = '35', _vrFlagBrClick = '1', _vrFlagBrDates = '0' , _vrFlagTaskAssociate = '40', _vrFlagTaskListAssociate='41';

var _vrTskOpenBugsEmp = '39';
var _vrReportEmp = '36', _vrUserReports = '37', _vrReportProjects = '38';

var _vrDataStatus = 'Task created successfully.';
var _vrAdminRoleId='1',_vrUserRoleId = '2', _vrClientRoleId = '3';//For user role id "2" doesn't have any permission for create new task.'3' for client role id.
var _vrDdlDefault = '0', _vrDefaultBugStatus = '1', _vrBugSaveStatus = 'Save', _vrBugUpdateStatus = 'Update', _vrFunctionalityStatus = '', _vrBugStatus = '';
var _vrDialogBoxNewTask = 'New task', _vrDialogBoxBugTrail = 'Bug trail', _vrDialogBoxTaskTrail = 'Task details', _vrTaskTrailTitle = 'Task trail', _vrDialogBoxCustomerTrail = 'Customer details', _vrProjectsTitle = 'Projects', _vrDialogBoxUser = 'User details', _vrUserTitle = 'Users', _vrDialogBoxCustomerUpdateTrail = 'Edit customer details', _vrDialogBoxCustomerAddingTrail = 'Add customer', _vrBillingReportTitle = 'Billing report details', _vrDialogBoxNewBug = 'New bug', _vrDialogBoxBugDetails = 'Bug details', _vrDialogBoosterAdd = "Boost a rooster";

var _vrDialogBoxTitle = '';
var _vrNewBugAttachedFiles = "", _vrExistingBugTaskId = '', _vrExistingBugProjId = '', _vrExistingBugTaskSubject = '', _vrTodayDate = '', _vrCommentCreatedFlag = '', _vrTaskCreation = '', _vrCustomerCreation = '';
var _vrTskCreatedStatus = 'Task created successfully', _vrBugCreatedStatus = 'Bug created successfully', _vrBugUpdatedStatus = 'Bug updated successfully', _vrCommentInsertStatus = 'Comments added successfully';
var _widgetBugHeader = '<div class="widget clshomepage clsbugtrail" id="divWidgetBugsSlide">';
var _widgetCustomerHeader = '<div class="widget clshomepage clscustomertrail" id="divWidgetCustomerSlide">', _widgetEnd = '</div>';
var _widgetBillingReportHeader = '<div class="widget clshomepage clsBillingReport" id="divWidgetBillingReportSlide">';
var _widgetTasksHeader = '<div class="widget clsusertasks" id="divWidgetTasksSlide">', _widgetProjectHeader = '<div class="widget clsprojwidget " id="divWidgetProjectsSlide" >';
var _widgetUserHeader = '<div class="widget clshomepage clsuser" id="divWidgetUserSlide">';
var _widgetProcsHeader = '<div class="widget clshomepage clsprocs clsprocstrail" id="divWidgetProcSlide">';
var _widgetDeploymentHeader = '<div class="widget clshomepage clsdeploy clsdeploytrail" id="divWidgetDeploymentSlide">';
var _DefaultWidget = '<div class="widget"><button class="resize_widget"><img src="img/resize.png" alt="Resize grid" title="Resize grid"></button><button class="magnify_widget"><img src="img/magnifier.png" alt="Magnify grid" title="Magnify grid"></button><button class="close_widget"><img src="img/close.png" alt="Close grid" title="Close grid"></button><div class="clsunderDevelopmentWidget">Under Development</div></div>';
var _widgetProjTasksCount = "<div class='widget clsclientroletskdetcharts' id='divWidgetDashboardslide'>";
var _widgetQuoteHeader = "<div class='widget clsquotation' id='divWidgetQuotationSlide'>";
var _widgetBAR = "<div class='widget clshomepage clsbrPoints' id='divWidgetBARSlide'>";
var _vrCheckMailInfo = 'Please check your email for Reset Password', _vrMailidMessage = 'Please provide valid Email.';
var _vrSetTime = '2000';
var _vrDdlProject = '', _vrDdlEmployee = '';
var _vrFileNameLength = '170';//Actually it can be 200 but extra added text will be 30 characters. 
var _vrSomeThingError = 'Unable to add comment. Please try again.';
var _VrFrgtPswrd = '';
var _VrReloadEmpHours = '';
var _vrBugIdDiv = '', _vrBugRecorded = 'Bug Recorded', _vrAlert = 'Alert', _vrUnderDevelop = 'Under Development', _vrFileNameVeirfy = 'Invalid file name. It can contain only _@()- and alphanumeric characters.';

var _vrDefaultHours = '00', _vrDefaultFmt = '00:00';
var _vrTasksData = '', _vrBugsData = '', _vrProjectsData = '', _vrUsersData = '', _vrProjectsGridWidth = 838, _vrCustomersGridWidth = 838, _vrBillingReportGridWidth = 840, _vrBrPointsData = '', _vrQuoteData = '';
var _vrUsersGridWidth = 838, _vrQuoteGridWidth = 838;;

//var _vrDefaultTaskSizer = 9, _vrMagnifierTaskSizer = 14, _vrDefaultBugSizer = 8, _vrMagnifierBugSizer = 15, _vrMagnifierCustomerSizer = 16, _vrDefaultCustomerSizer = 11, _vrDefaultUserSizer = 11, _vrMagnifierUserSizer = 16, _vrDefaultBillingReportSizer = 15, _vrBillingGridPagerSize = 9, _vrDefaultProjSizer = 11, _vrMagnifierProjSizer = 16, _vrDefaulUserSizer = 11, _vrDefaultBARSizer=12,_vrDefaultDeploySizer=9;
var _vrDefaultTaskSizer = 9, _vrMagnifierTaskSizer = 14, _vrDefaultBugSizer = 8, _vrMagnifierBugSizer = 14, _vrMagnifierCustomerSizer = 14, _vrDefaultCustomerSizer = 11, _vrDefaultUserSizer = 11, _vrMagnifierUserSizer = 14, _vrDefaultBillingReportSizer = 14, _vrBillingGridPagerSize = 9, _vrDefaultProjSizer = 11, _vrMagnifierProjSizer = 14, _vrDefaulUserSizer = 11, _vrDefaultBARSizer = 12, _vrDefaultDeploySizer = 9;

var _vrArrPlanned = '', _vrArrInProgress = '', _vrPlannedVal = 'Planned', _vrInProgVal = 'In Progress';
var _vrFlagData = '1';
var _vrEventVal = '';
var _vrFlagBindDataToDdl = '';
var _vrSameFileName = '', _vrSaveNewBug = '';
var _vrArrFileNames = [];
var _vrFileUploading = '', _vrFileUploadDefault = '1', _vrFileUploadCanceled = '2', _vrUploadedCancFile = '';
var _vrFileUploadComplete = '';//This will be static through out application.Nothing will assing to this variable.
var _vrBugStatus = '';
var _vrTaskProjId = '0', _vrBugProjFields = '', _vrBugTaskField = '', _Columns = '', _DataFields = '';
var _vrCustomerCreatedStatus = 'Customer Created Successfully';//Customer Created Status
//
var _vrDialogBoxNewProj = 'New project', _vrGetProjFields = '20', _vrProjCreationStatus = '', _vrProjInsertionStatus = '1', _vrProjCrtStatus = 'Project created successfully', _vrProjUpdatedStatus = 'Project updated successfully', _vrProjDataStatus = '';
var _vrBugsFileUpload = '1', _vrNewProjFileUpload = '2';
var _vrMagnifyCloneTitle = '', _vrDefaultProjId = 0;
var _vrDefaultTskTrEmp = '0';
var _vrProjDetDialogHdr = 'Project details', _vrCustomerDialogHdr = 'Customers', _vrCustomerDetDialogHdr = 'Customer details', _vrUserDetDialogHdr = 'User details', _vrAddUserHdrDetails = 'Add user', _vrAddProcHdr = 'Add new policy', _vrTaskTrEmp = '', _vrTskTrProj = '', _vrSelectedProjectProjId = 0, _vrGetProjDataById = '1', _vrSetProjUpdateFlag = '', _vrClearProjUpdateFlag = '';
var _VrProjFileUploading = '', _VrProjFileUploaded = '1', _vrMagnifyCustId = '', _vrMagnifyUserId = '', _vrUserFirstName = '', _vrUserLastName = '';
var _vrCustContName = '', _vrCustEmailId = '', _vrCustWebsiteName = '', _vrCustname = '', _vrCustSourceData, _vrUserSourceData;
var _vrCustDetCnt = '0', _vrCustDetails = '0', _vrUsrDeCnt = '0';
//

var _vrCustomerUpdatedStatus = 'Customer updated successfully';
var _vrUserCreatedStatus = 'User created successfully', _vrUserUpdatedStatus = 'User updated successfully';
//
//Declartaions in magnifier dialog box for labels
var _vrProjectNameLbl = 'Project name', _vrProjectEditLbl = 'Edit project details', _vrProjectManagerLbl = "Project manager", _vrVersionNumberLbl = "Version number", _vrCustNameLbl = 'Contact name', _vrCustEmailIdLbl = 'Email ID', _vrCustWebsite = 'Website', _vrUserNameLbl = 'Username', _vrUserMobileLbl = 'Mobile', _vrUserAddressLbl = 'Address';
var _vrIndiaStandardTime = 'India Standard Time';
var _vrSaveExitClick = '', _vrSaveExitFlag = '1';
var _vrTasksMagnifyLoaded = '1', _vrProjectsMagnifyLoaded = '2', _vrJqxMagnifyLoadedFlag = '';
_VrDefaultUserRole = '2';
var _vrCheckUserUpdate = '0', _vrCheckUserSave = '1', _vrCheckDefaultUpdate = '';

var _vrCheckUserResponseID = '0';
var _vrEditUserProfile = '', _vrUserEditProfileDefault = '1', _vrUpdateDialogBoxUser = 'Edit user details';
var _vrSelProjStatus = '', _vrSelProjCustomer = '';

var _vrSelCustomerStatus = '', _vrSelCustomerUserStatusText = 'All', _vrDdlSelectCustUserAll = '', _vrSelUserStatus = '';
var _vrTextFieldUserManagerLen = 110;
var _vrEmpProfilePicImage = '';
var _vrNewProjectAttachedFiles = '';
var _vrFileExtension = 'Please select jpg format file.';
var _vrExpiredTokendIdResponse = '9999';
var _vrUserSelEmpId = '';
var _vrArrValidExtensions = ["jpg", "jpeg", "bmp", "gif", "doc", "xlsx", "pdf", "xls", "txt", "png"];
var _vrValidFileFormatExtMessage = "Invalid file format.Allows file formats like jpg, jpeg, bmp, gif, png, doc, xlsx, pdf, xls, txt.";
var _vrBillingLoadingFlag = '', _vrBillingGridInit = '1';

var _vrCustMagLen = 20, _vrCustLen = 10, _vrCustDefLen = 10;
var _vrProjMagLen = 40, _vrProjLen = 23, _vrProjDefLen = 23;
var _vrMinTextLength = 3, _vrUsersSliderTextLength = 2;
var _vrDshProjLen = 13;
var _vrOpenBugs = 0;
var _vrSaveReset = '';
//var _vrJqxTasksGrid = 'jqxTasksgrid', _vrJqxBRGrid = 'jqxBillingReport';
//To hold data for local checked columns grid
var _vrArrTaskTrDetails = [];
var objArrJqxColumns = {};
objArrJqxColumns.jqxTasksgrid = [];

var _vrUserMagnifyDialog = 0, _vrUserDialogOpen = 0, _vrProjMagnifyDialog = 0, _vrProjDialogOpen = 0, _vrCustDialogOpen = 0, _vrCustMagnifyDialog = 0;


var _vrDayHrs = 24;
var _varcheckDragDrop = 0;

var _varMaxTimecharlen = 5;

var htmlTags = ["<script>", "<a>", "marquee>"];
var _vrCheckNewTaskSprintDropDown = 0; _vrCheckWidgetSprintDropDown = 1, _varMaxTimecharlen = 7, _vrMaxTimecharlenTotal = 10;
var _vrDdlStatusChange = '1', _vrCheckDdlChange = '0';
var _vrDdlStatusChange = '1', _vrCheckDdlChange = '0';
var _vrStoppedStatus = 9, _vrDeliveredStatus = 8, _vrDoneStatus = 6;
var vrPrefDynSelectall = "chkdynselectall";
var _vrDisplayBugErrorMsg = "There is no data to display for this bug id.";
//For exporting of jqxgrid data to excel.
var _vrJqxBRGrid = "jqxTasksgrid";
//END of jqx grids ids.

//array to store category data of boost a rooster 
var arrData = new Array();
var _vrJqxTasksGrid = "jqxTasksgrid";
var _vrJqxBugTrailGrid = "jqxBugTrial";
//END of jqx grids ids.
var _vrDialogBoxNewDeployment = "New deployment", _vrEditDeploy = "Edit deployment";

//var _vrJqxTasksGrid = "jqxTasksgrid";

var _vrStoppedStatus = 9, _vrDeliveredStatus = 8, _vrDoneStatus = 6;
var _vrBtnWidgetResize = 0;//Regarding resize button click in the task trail widget.
var _vrBtnBugTrailResize = 0;//Regarding resize button click in the bug trail widget.
var _vrBtnTaskWidgetResize = 'btnResizeTasksWidget';
var _vrBtnBugTrailWidgetResize = 'btnResizeBugTrailWidget';
var _vrPageNumForTaskWidget = 0, _vrPageNumForBugTrailWidget = 0, _vrPageNumForBRWidget = 0, _vrPageNumForProjectsWidget = 0, _vrPageNumForUserWidget = 0, _vrPageNumForCustWidget = 0;
var _vrLocalTaskDataOnTaskClick = null, _vrLocalBTDataOnBugClick = null; _vrLocalCustDataOnCustClick = null, _vrLocalUserDataOnUserClick = null, _vrLocalBRDataOnTaskClick = null, _vrLocalTaskDataOnProjClick = null, _vrLocalDeployData=null;
//var _vrTaskLocalData = '', _vrBugLocalData = '', _vrCustLocalData='';
var _vrUserEmailTxtBoxName = 'txtNewUserEmail', _vrUserAlternateEmailTxtBoxName = 'txtNewUserAltEmail';
var _vrBtnTaskResize = 0;//Regardin new ui for task trail.
var _vrTaskDataOnCPUOnTaskClick = null;

var _vrBugSaveNNewClick = 0;// regarding save and new button click in bug trail.

//END of jqx grids ids.

var _vrJqxTasksGrid = "jqxTasksgrid", _vrJqxBugsGrid = "jqxBugTrial", _vrBillingRprtGrid = "jqxBillingReport";
//END of jqx grids ids.
//Flag to check /uncheck select all.
var _vrCheckUserPref = 1, _vrCheckDefaultIndex = 1, _vrCheckSelectBill = 2;
var _vrCheckIdSlider = "";
//END of checkboxes preferences.
var _vrTxtTskProjName = '', _vrTxtTskId = '', _vrTskSubject = '';
var _vrTskOpenBugDialog = 0, _vrTxtTskProjId = 0;
var _vrTskblnProjId = false, _vrTskblnTaskId = false, _vrTskblnStatus = false, _vrTskFilterDates = true, _vrTskblnEmpName = false;
var _vrTskddlProjId = '0', _vrTskddlTaskId = '0', _vrTskddlStatus = '0', _vrTskddlEmpName = '0', _vrTskBugTrFromDate = '', _vrTskBugTrToDate = '';
var _vrTskCreatOn = '';
//END of checkboxes preferences.
var _vrObjExportData = { jqxSource: "", jqxColumns: "" };
var _vrDialogBoxNewQuote = "Create quote";
var _vrObjExportData = { jqxSource: "", jqxColumns: "" };
var _ddlTaskTrailProject = "", _ddlTaskTrailSprint = '', _vrGetBacklogID = '';
var _ProcAndTemplate = '';//flag to check the choice whether policies or standards or templates.
var _vrbacklog = 'backlog';// floag to set backlog as default value on selecting a project in drop down.
var _vrUserPrefBtnClick = '';//flag to check on which widget, user preferences icon is clicked.
var _ProcAndTemplate = '';//flag to check the choice whether policies or standards or templates.
var _vrQuoteCellValue = "Development";
var _vrTestingQuote = "60", _vrSupQuote = "8", _vrDepQuote = "8", _vrDocumentationQuote = "8", _vrTotalPercent = 100; _vrCalType = "%";
var _vrDepInsertStatus = 'succ', _vrDepUpdateStatus = 'updatesucc', _vrDeployStatusId = '';//_vrDeployInsertSucess = "Insert deployment successfully", _vrDeployUpdateSucess = "Update deployment successfully",
var _vrDeployInsertSucess = "Deployment inserted successfully", _vrDeployUpdateSucess = "Deployment updated successfully";
var _vrChecklistID = 0, _vrDeployFilesData = '';
var _vrDialogDeployment = 'Deployment details';
var _vrMagnifierDeploySizer = 14, _vrDeployData = '', _vrMagnifyDeployGridWidth = 1035, _vrDeployGridPagerSize = 9, _vrQuoteGridPagerSize = 10;
var _vrDeploymentData = '';
var _vrDefaultQuoteId = 0, _vrQuoteProjId = 0, _vrQuoteCustId = 0, _vrQuoteEffEst = 0, _vrQuoteRevBy = 0, _vrQuoteStatus = 0, _vrQuoteUpdateId = 0;
var _vrLoadQuoteDetGrid = 0, _vrGridQuoteDetailsLoaded = 1;
var _selYearInBAR = '', _selMonthInBAR = '', _varcheckDragDropBAR = 0, _BARTitle = 'Boost a rooster points', _vrSetWidthOfGraph = '', _vrSetHeightOfGraph = '', _vrBARInsertSucess = 'Points added successfully';
var _vrHTMLBRWidget = '';//To use even if widget is closed.
var _vrQuotation = 'Quotation', _vrEditTaskDialog = "";
var _vrChecklistAppID = 0, _vrCheklistProjectId = 0, _vrChecklistTaskId = [];
var _vrsliderDates = 0, _vrGridDeployMagnify = 0;
var _vrDeployGrid = "jqxDeployGrid";
var _vrPointsAllot = 'Points allotted successfully';
var _vrMailTskPrjName = '', _vrMailTskOwnerName = '', _vrMailTaskName = '', _vrMailTskOwnerID = 0;
var _vrSelTaskNames = [];
var _vrTxtOpenBugTaskId = 0;
var _vrTskBugOpend = 0;
var _vrQuoteCustomerInterval = 1000;
var _vrFromDate = '';
var vrToDate = '';
var _vrQuotation = 'Quotation', _vrEditTaskDialog = "";
var _vrChecklistAppID = 0, _vrCheklistProjectId = 0, _vrChecklistTaskId = [];
var _vrsliderDates = 0, _vrGridDeployMagnify = 0;
var _vrDeployGrid = "jqxDeployGrid";
var _vrPointsAllot = 'Points allotted successfully';
var _vrMailTskPrjName = '', _vrMailTskOwnerName = '', _vrMailTaskName = '', _vrMailTskOwnerID = 0;
var _vrSelTaskNames = [];
var _vrTxtOpenBugTaskId = 0;

var _vrQuoteCustomerInterval = 1000;
var _vrQuoteClienbtApprove = 1;
var _vrDashBoardTitle = "Dashboard";
var _vrUpdatedStatus = '';
var _vrUserPrefGet = 0;
var _vrFromdate = "", _vrToDate = "";
var _vrDeleteBRRecId = 0, _vrDeleteRowIndex = 0;
var _vrBRDeleteStatus = "Points deleted successfully.";
var _vrFreezeSprintStatus = "You can't add new tasks under this sprint as this sprint is freezed.";
//var _vrCloseSprintStatus = "You can't add new tasks under this sprint as this is close sprint";
var _vrQuoteSucc = "Quotation created successfully", _vrQuoteUpd = "Quotation updated successfully ", _vrQuoteTaskStatus = "Tasks created successfully", _vrQuoteRecStatus = "Quotation created successfully";
var _vrQuoteCategory = "";
var _vrDeleteMsg = "Are you sure you want to delete the selected employee's points?";
var _VrSummRprtPager = 14, _vrProjBillRprtPgr = 13;
var _vrSummRprtHdr = "Summary report";
var _vrTaskChosenTaskName = [];
var _vrTaskCreatedDate = "";
var _vrDialogBoxBillSummary = "Billing report";
//User preferences variables **Start**
var _vrWidgetCOntrolData = [], _vrBugWidgetCOntrolData = '', _vrCheckCallFromLogin = '', _vrCustCheckCallFromLogin = '', _vrBRCheckCallFromLogin = '', _vrWidgetIDProperty = 'vrWidgetId';
var _taskIndexNO = -1, _BTIndexNO = -1, _custIndexNO = -1, _userIndexNO = -1, _BRIndexNO = -1, _projIndexNO = -1, _deployIndexNO = -1, _DashboardIndexNo = -1, _QuoteIndexNO= -1;
var _vrCheckDragNDrop = '', _vrFlagReloadGraph='0';
//User preferences variables **End**
var _vrQuoteTaskCreateStatus = 0;
var _vrTaskProjIdSprint = 0, _vrTskSprintSelectval = 0, _vrTskMoveSprintID = 0, _vrEditTaskFlagSprint=0;