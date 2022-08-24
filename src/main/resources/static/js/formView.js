const FORM_TAG = "[[form-input]]";

function translateSolidityToForm(solidityString, formAppendTarget) {
  formAppendTarget.empty();
  let rawTextArray = solidityString.split(";");
  let inputIdx = -1;
  $.each(rawTextArray, function (idx, line) {
    if (line.includes(FORM_TAG)) {
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
      } else {
        varType = "text";
      }
      // find var name
      let temp = line.substring(0, line.lastIndexOf(FORM_TAG));
      temp = temp.substring(0, temp.lastIndexOf("="));
      let tempArray = temp.split(" ");
      let varName = tempArray[tempArray.length - 2];

      // html append
      let htmlSource = '<div class ="form-group row" style="margin:30px">'
          + '<span class = "btn btn-success col-3" disabled>' + varName
          + '</span>'
          + '<input style="width:auto;margin-left:20px" class="form-control col-9" type="'
          + varType + '" id="var' + inputIdx + '" name="var' + inputIdx + '">'
          + '</div>';

      formAppendTarget.append(htmlSource);
    }
  })
}

$(function () {
  // 부모 페이지에서 solidity String 가져오기
  let solidityString = opener.$("#solidity").val();
  // 자식 페이지에서 form view를 출력할 id 가져오기
  let formAppendTarget = $("#form-append-target");
  // solidity String 파싱 -> form view 출력
  translateSolidityToForm(solidityString, formAppendTarget);

  // 입력 완료 버튼 클릭 시 입력 값 순회하며 solidity string 대체하기
  $("#formCompleted").click(function () {
    let inputValue;
    // 모든 input에 대해 아래 로직 반복 수행
    // input에 입력한 값으로 solidity를 대체
    $('input').map(function() {
      // input value 가져오기
      inputValue = $(this).val();
      // 입력 값이 없을 경우 기존 form tag를 그대로 출력
      if (inputValue.length === 0) {
        inputValue = FORM_TAG;
      }
      // 입력 값이 문자열인 경우 쌍따옴표 추가
      if (inputValue !== FORM_TAG && $(this).attr('type') === "text") {
        inputValue = '"' + inputValue + '"';
      }
      // solidity string 대체
      solidityString = solidityString.replace(FORM_TAG, inputValue);
    });
    // 최종적으로 만들어진 string을 부모 페이지에 보내기
    $("#solidity", opener.document).val(solidityString);

    // 자식 페이지 종료
    window.close();
  });
});