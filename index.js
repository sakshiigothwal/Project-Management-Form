var token = '90932142|-31949220718704412|90963738';
var dbname = 'COLLEGE-DB';
var relation = "PROJECT-TABLE";
var baseUrl = "http://api.login2explore.com:5577";
function resetForm() {
    $("#pid").val('');
    $("#pname").val('');
    $("#assignedto").val('');
    $("#adate").val('');
    $("#dl").val('');
}

function disableAll() {
    resetForm();
    $("#pid").prop("disabled", false);
    $("#pid").focus();
    $("#pname").prop("disabled", true);
    $("#assignedto").prop("disabled", true);
    $("#adate").prop("disabled", true);
    $("#dl").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
}
disableAll();
function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "\,"
            + "\"createTime\":"
            + createTime
            + "\,"
            + "\"updateTime\":"
            + updateTime
            + "\n"
            + "}";
    return value1;
}

function findpid(ele) {
    var pid = ele.value;
    var obj = {
      Project_ID: pid
    };
    var jsnobj = JSON.stringify(obj);
    var request = createGET_BY_KEYRequest(token, dbname, relation, jsnobj);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(request, "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (res.status === 400) {
        $("#pname").prop("disabled", false);
        $("#pname").focus();
        $("#assignedto").prop("disabled", false);
        $("#adate").prop("disabled", false);
        $("#dl").prop("disabled", false);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    } else {
        $("#pname").prop("disabled", false);
        $("#pid").prop("disabled", true);
        $("#assignedto").prop("disabled", false);
        $("#adate").prop("disabled", false);
        $("#dl").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        // console.log(res);
        var data = JSON.parse(res.data).record;
        // console.log(data);
        $("#pname").val(data.Full_Name);
        $("#assignedto").val(data.Assigned_to);
        $("#adate").val(data.Assignment_date);
        $("#dl").val(data.deadline);

    }
}
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
function saveData() {
    $("#ajax").html("wait");
    var pid = $("#pid").val();
    var pname = $("#pname").val();
    var assignedto = $("#assignedto").val();
    var adate = $("#adate").val();
    var dl = $("#dl").val();
    if(pid===''){
        $("#pid").focus();
        return;
    }
    if(pname===''){
        alert("Name is a required field");
        $("#pname").focus();
        return;
    }if(assignedto===''){
        alert("Assigned To is a required field");
        $("#assignedto").focus();
        return;
    }if(adate===''){
        alert("Assignment Date is a required field");
        $("#adate").focus();
        return;
    }if(dl===''){
        alert("Deadline is a required field");
        $("#dl").focus();
        return;
    }
    var obj = {
        Project_ID: pid,
        Project_Name: pname,
        Assigned_To: assignedto,
        Assignment_Date: adate,
        Deadline: dl,
    };
    var jsonobj = JSON.stringify(obj);
    var req = createPUTRequest(token, jsonobj, dbname, relation);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}
function createSETRequest(token, jsonStr, dbName, relName, type, primaryKey, uniqueKeys, foreignKeys) {
    if (type === undefined) {
        type = "DEFAULT";
    }
    var req = {
        token: token,
        cmd: "SET",
        dbName: dbName,
        rel: relName,
        type: type,
        jsonStr: JSON.parse(jsonStr)
    };
    if (primaryKey !== undefined) {
        req.primaryKey = primaryKey;
    }
    if (uniqueKeys !== undefined) {
        req.uniqueKeys = uniqueKeys;
    }
    if (foreignKeys !== undefined) {
        req.foreignKeys = foreignKeys;
    }
    req = JSON.stringify(req);
    return req;
}

function updateData(){
    var pid = $("#roll").val();
    var pname = $("#pname").val();
    var assignedto = $("#assignedto").val();
    var adate = $("#adate").val();
    var dl = $("#dl").val();

    if(pname===''){
        $("#pname").focus();
        return;
    }if(assignedto===''){
        $("#assignedto").focus();
        return;
    }if(adate===''){
        $("#adate").focus();
        return;
    }if(dl===''){
        $("#dl").focus();
        return;
    }
    var obj = {
      Project_ID: pid,
      Project_Name: pname,
      Assigned_To: assignedto,
      Assignment_Date: adate,
      Deadline: dl,
    };
    var jsonobj = JSON.stringify(obj);
    var req=createSETRequest(token,jsonobj,dbname,relation,'UPDATE','Project_ID');
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml/set");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}