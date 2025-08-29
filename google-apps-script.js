function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  if (e && e.postData && e.postData.contents) {
    var data = JSON.parse(e.postData.contents);
    var rowData = [];

    // Add timestamp as the first column
    rowData.push(new Date());

    // Map answers to columns based on headers
    // This assumes your sheet headers match your question IDs (e.g., "q1", "q2", etc.)
    // You might need to adjust this logic based on your specific sheet structure
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header === "Timestamp") {
        // Skip timestamp as it's already added
        continue;
      }
      rowData.push(data[header] || ""); // Add answer or empty string if not found
    }

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({ result: "success", message: "Data received" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ result: "error", message: "No data received" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  // This function is typically used for testing or simple GET requests.
  // For receiving POST data, doPost is used.
  return ContentService.createTextOutput("Hello, this is your survey backend!");
}

// Optional: Function to set up initial headers if your sheet is empty
function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = ["Timestamp", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q11", "q10"]; // Ensure this matches your question IDs and order
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}