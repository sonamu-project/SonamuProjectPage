$(function() {
  $("#raw-text").on('propertychange change keyup paste input', function () {
    $("#form-append-target").empty();
    let rawTextArray = $("#raw-text").val().split(";");
    let inputIdx = -1;
    $.each(rawTextArray, function(idx, line) {
      if (line.includes("[form-input]")) {
        inputIdx++;
        // separate line
        if (line.indexOf("}") !== -1) {
          line = line.substring(line.indexOf("}"));
        }
        // find var type
        let varType = "";
        if (line.includes("string")) {
          varType = "text";
        } else if (line.includes("int")) {
          varType = "number";
        }
        else {
          varType = "text";
        }
        // find var name
        let temp = line.substring(0, line.lastIndexOf("[form-input]"));
        temp = temp.substring(0, temp.lastIndexOf("="));
        let tempArray = temp.split(" ");
        let varName = tempArray[tempArray.length - 2];

        // html append
        let htmlSource =
            '<div class ="form-group row" style="margin:30px">' +
              '<span class = "btn btn-success col-md-3" disabled>' + varName + '</span>' +
              '<input style="width:auto;margin-left:20px" type="' + varType + '" class="form-control col-md-7" id="var' + inputIdx + '" name="var' + inputIdx + '">' +
            '</div>';

        $("#form-append-target").append(htmlSource);
      }
    })
    });
});