$(function(){

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
        let fileName = "solidity.sol"
        const content = $("#solidity").val();
        if (content) {
            downloadFile(fileName, content);
        } else {
            alert("저장할 내용이 없습니다!");
        }
    });

    // Form 버튼 클릭 시 자식 페이지 열기
    $("#toForm").click(function() {
        let child = window.open("formView.html", "_blank",
            "height=600, width=400");
    });
});


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



