
// Pie 차트 웹접근성 데이터 생성
function chartPieWebAccessibility(targetId, searchData) {
    if ($("#" + targetId).length > 0) {
        var id = "#" + targetId;

        var legendCount = searchData["legend"].length;
        if (legendCount > 0) {
            var headerHTML = "";
            var dataHTML = "";

            // 웹접근성 인식 테이블 헤더 HTML 생성
            for (var idx = 0; idx < legendCount; idx++) {
                headerHTML += '<th scope="col">'+ searchData["legend"][idx] +'</th>';
            }
            headerHTML += '<th scope="col">전체건수</th>';

            // 총 합계 계산
            var valueTotal = 0;
            var value = 0;
            for (var idx = 0; idx < legendCount; idx++) {
                value = searchData["series"][idx]["value"];
                valueTotal += value;
            }

            // 웹접근성 인식 테이블 데이터 HTML 생성
            var percent = 0;
            for (var idx = 0; idx < legendCount; idx++) {
                value = searchData["series"][idx]["value"];
                percent = (value / valueTotal * 100).toFixed(2);
                dataHTML += '<td>'+ value +'건 ' + percent +'%</td>';
            }
            dataHTML += '<td>'+ valueTotal +'</td>';

            // 웹접근성 헤더 및 데이터 HTML 삽입
            $(id + " > thead > tr ").empty();
            $(id + " > tbody > tr ").empty();
            $(id + " > thead > tr ").append(headerHTML);
            $(id + " > tbody > tr ").append(dataHTML);
       }
    }
}

function dataAreaZoomWebAccessibility(targetId, searchData) {
    if ($("#" + targetId).length > 0) {
        var id = "#" + targetId;

        var legendCount = searchData["legend"].length;
        if (legendCount > 0) {
            var headerHTML = "";
            var dataHTML = "";

            // 웹접근성 인식 테이블 헤더 HTML 생성
            headerHTML += '<tr>';
            headerHTML += '<th scope="col" rowspan="2" colspan="1" >수집일자</th>';
            headerHTML += '<th scope="col" colspan="'+ legendCount +'" >채널</th>';
            headerHTML += '</tr>';
            headerHTML += '<tr>';
            for (var idx = 0; idx < legendCount; idx++) {
                headerHTML += '<th scope="col">'+ searchData["legend"][idx] +'</th>';
            }
            headerHTML += '<tr>';

            // 웹접근성 인식 테이블 데이터 HTML 생성
            var webAccessibilityDataCount = searchData["webAccessibilityData"].length;
            for (var rowIdx = 0; rowIdx < webAccessibilityDataCount; rowIdx++) {

                dataHTML += '<tr>';
                var waRowData = searchData["webAccessibilityData"][rowIdx];
                for (var tdIdx = 0; tdIdx < waRowData.length; tdIdx++) {
                    dataHTML += '<th>'+ waRowData[tdIdx] +'</th>';
                }
                dataHTML += '/<tr>';
            }

            // 웹접근성 헤더 및 데이터 HTML 삽입
            $(id + " > thead ").empty();
            $(id + " > tbody ").empty();
            $(id + " > thead ").append(headerHTML);
            $(id + " > tbody ").append(dataHTML);
        }
    }
}
