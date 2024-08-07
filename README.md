# Project Management Form
A form for managing project data with fields for Project ID, Project Name, Assigned To, Assignment Date, and Deadline. This form ensures data is properly validated and stored in the `login2explore` database using `JSONPowerDB`. The form includes functionalities for saving, updating, and resetting data entries.
# Benefits of using JsonPowerDB
- JSONPowerDB is a Database Server with Developer-friendly REST API services.
- High Performance, Light Weight, Ajax Enabled, Serverless, Simple to Use, Real-time Database.
- Easy and fast to develop database applications without using any server-side programming/scripting or installing any kind of database.
# Release History
JSONPowerDB Version : 0.3.2

TO create PUT request
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
