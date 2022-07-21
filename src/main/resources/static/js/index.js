$(function(){

    // 언어 선택 라디오 버튼 이벤트
    $("input[name='typeOfCode']").click(function() {
        if ($("input[name='typeOfCode']:checked").val() === "sonamu") {
            $(".extension").text(".sol");
        }
        else {
            $(".extension").text(".sonamu");
        }
    })

    // 파일 불러오기 onChange event
    $("#openCode").change(function() {
        const content = $("#solidity");
        const file = this.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            content.text(reader.result);
            // resizeTextArea(); // 파일 불러오기 이후 창 크기 수정
        }, false);

        if (file) {
            reader.readAsText(file);
        }
    });

    // 파일 저장하기 onClick event
    $("#saveCode").click(function() {
        let fileName = $("#fileName").val();
        // 입력 언어에 따라 저장 언어의 확장자 자동 지정
        fileName += ".sol";
        const content = $("#solidity").val();

        if (fileName) {
            downloadFile(fileName, content);
        } else {
            alert("저장할 파일의 이름을 입력하세요!");
        }
    })

    // inputText에 코드 입력 시 textarea 크기 자동 조절
    // $("#inputText").on('propertychange change keyup paste input', function () {
    //     $(this).height(1).height($(this).prop('scrollHeight')+5 );
    // });

    // 페이지 최초 로드 시 textarea 크기 자동 조절
    // resizeTextArea();

    // 페이지 최초 로드 시 textarea에 줄 번호 표시
    $('.lined').linedtextarea();

});

// function resizeTextArea() {
//     $("#inputText").height(1).height($("#inputText").prop('scrollHeight')+5 );
//     $("#outputText").height(1).height($("#outputText").prop('scrollHeight')+5 );
// }

function downloadFile(fileName, content) {

    // 저장할 파일과 주소 생성
    const blob = new Blob([content], { type: 'plain/text' });
    const fileUrl = URL.createObjectURL(blob);

    // click 될 a 태그 생성
    const element = $("<a>").hide();
    element.attr('href', fileUrl);
    element.attr('download', fileName);

    // click 후 remove
    element[0].click();
    element.remove();
}



