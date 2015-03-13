var _vrJsonOutput = "";
var X = XLS;
      var XW = {
          /* worker message */
          msg: 'xls',
          /* worker scripts */
          //rABS: './xlsworker2.js',
          //norABS: './xlsworker1.js',
          //noxfer: './xlsworker.js'
      };

      var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";


      var wtf_mode = false;

      function fixdata(data) {
          var o = "", l = 0, w = 10240;
          for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
          return o;
      }

      function ab2str(data) {
          var o = "", l = 0, w = 10240;
          for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
          return o;
      }

      function s2ab(s) {
          var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
          for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
          return [v, b];
      }

      function xw_noxfer(data, cb) {
          var worker = new Worker(XW.noxfer);
          worker.onmessage = function (e) {
              switch (e.data.t) {
                  case 'ready': break;
                  case 'e': console.error(e.data.d); break;
                  case XW.msg: cb(JSON.parse(e.data.d)); break;
              }
          };
          var arr = rABS ? data : btoa(fixdata(data));
          worker.postMessage({ d: arr, b: rABS });
      }

      function xw_xfer(data, cb) {
          var worker = new Worker(rABS ? XW.rABS : XW.norABS);
          worker.onmessage = function (e) {
              switch (e.data.t) {
                  case 'ready': break;
                  case 'e': console.error(e.data.d); break;
                  default: xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r"); console.log("done"); cb(JSON.parse(xx)); break;
              }
          };
          if (rABS) {
              var val = s2ab(data);
              worker.postMessage(val[1], [val[1]]);
          } else {
              worker.postMessage(data, [data]);
          }
      }

      function xw(data, cb) {
          transferable =false;
          if (transferable) xw_xfer(data, cb);
          else xw_noxfer(data, cb);
      }

      function get_radio_value(radioName) {
          var radios = document.getElementsByName(radioName);
          for (var i = 0; i < radios.length; i++) {
              if (radios[i].checked || radios.length === 1) {
                  return radios[i].value;
              }
          }
      }

      function to_json(workbook) {
          var result = {};
          //var _vrTaskNameSplit = workbook.Strings[0].t.split(' ');
          //var taskname = _vrTaskNameSplit[0] + _vrTaskNameSplit[1];
          //var _vrPrijectNameSplit = workbook.Strings[1].t.split(' ');
          //var projectnamename = _vrPrijectNameSplit[0] + _vrPrijectNameSplit[1];
          //var _vrhoursSplit = workbook.Strings[2].t.split(' ');
          //var hours = _vrhoursSplit[0] + _vrhoursSplit[1];
          //workbook.Strings[0].r = taskname;
          //workbook.Strings[1].r = projectnamename;
          //workbook.Strings[2].r = hours;
       if (typeof (workbook) != "undefined") {
          workbook.SheetNames.forEach(function (sheetName) {
              //workbook.Sheets[sheetName].A1.v = taskname;
              //workbook.Sheets[sheetName].B1.v = projectnamename;
              //workbook.Sheets[sheetName].C1.v = hours;
              var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              if (roa.length > 0) {
                  result[sheetName] = roa;
              }
          });
}
          return result;
      }





      function process_wb(wb) {
          if (use_worker) XLS.SSF.load_table(wb.SSF);
          var output = "";
     
       
                  output = JSON.stringify(to_json(wb), 2, 2);
             
          
         
          //if (out.innerText === undefined) out.textContent = output;
          //else out.innerText = output;
          //if (typeof console !== 'undefined') console.log("output", new Date());
                   _vrJsonOutput = JSON.parse(output);
          //        var vrTskName = "task name";
          //        var projname = "project name";
          //var hoursestimate=""
                  
      }

      var idChooseExcel = document.getElementById('idChooseExcel');
      function handleFile(e) {
          //rABS = document.getElementsByName("userabs")[0].checked;
          //use_worker = document.getElementsByName("useworker")[0].checked;
          try {
              $("#errNewExcelTskError").css("display", "none");
              $("#divSuccesTaskCreationDiv").empty();
              $("#divSuccesTaskCreationDiv").css("display", "none");
              $("#divNonSuccesTaskCreationDiv").empty();
              $("#divNonSuccesTaskCreationDiv").css("display","none");
              $("#errExcelFile").css("display", "none");
              $("#idDisplayCreatedTasks").css("display", "none");
              $("#idDisplayNonCreatedTasks").css("display","none");
          rABS = false;
          use_worker = false;
          var files = e.target.files;
          var f = files[0];
          {
              var reader = new FileReader();
              var name = f.name;
              reader.onload = function (e) {
                  if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
                  var data = e.target.result;
                  if (use_worker) {
                      xw(data, process_wb);
                  } else {
                      var wb;
                      if (rABS) {
                          wb = X.read(data, { type: 'binary' });
                      } else {
                          var arr = fixdata(data);
try{
                          wb = X.read(btoa(arr), { type: 'base64' });
}
catch(e){
$("#errExcelFile").css("display", "inline");
                                  $('#idChooseExcel').replaceWith($('#idChooseExcel').clone());
}
                      }
                      process_wb(wb);
                  }
              };
              if (rABS) reader.readAsBinaryString(f);
              else reader.readAsArrayBuffer(f);
          }
}catch(e){
}
      }
