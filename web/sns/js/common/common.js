


function requestApiUrl(apiUrl, apiPathVariable) {

    var parametersArray = new Array();

    var pathVariable = "";
    for( var pathVariableKey in apiPathVariable ) {

        pathVariable = "{"+ pathVariableKey +"}";

        if (apiUrl.indexOf(pathVariable) == -1) {
            if (apiPathVariable[pathVariableKey]) {
                parametersArray.push(pathVariableKey + "=" + apiPathVariable[pathVariableKey]);
            }
        } else {
            apiUrl = apiUrl.replace(pathVariable, apiPathVariable[pathVariableKey])
        }
    }

    if (parametersArray.length > 0) {
        apiUrl = apiUrl + "?" + parametersArray.join("&");
    }
    return apiUrl;
}



function requestGet(url, callBackFun) {
    var head = {};
    head["Authorization"] = licence.licence;
    $.support.cors = true;
    $.ajax({
        type:"GET",
        url: licence.url + url,
        headers : head,
        contentType : "application/json; charset=UTF-8",
        dataType: 'json',
        success: function(data) {
            callBackFun(data);
        },
        error: function (request, status, error) {
            console.log("조회 중 오류가 발생하였습니다.");
            console.log("code:"+request.status);
            console.log("message:"+request.responseText);
            console.log("error:"+error);
        }
    });
}

function addNumberComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addDateFormat(dateStr, pattern) {
    return dateStr.replace(/(\d{4})(\d{2})(\d{2})/g, '$1'+ pattern +'$2'+ pattern +'$3');
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

function setSearchDate(startDateId, endDateId) {

    var $startDate = $("#" + startDateId);
    var $endDate = $("#" + endDateId);

    if($startDate && $endDate) {
        initDatepickerDefaults();

        // 달력 초기화
        $startDate.datepicker();
        $endDate.datepicker();

        // 달력 기본설정
        $startDate.datepicker("setDate", "-1M");
        $endDate.datepicker("setDate", "0D");

        $startDate.change(function () {
            $endDate.datepicker("option", "minDate", $startDate.datepicker("getDate"));
            $endDate.datepicker("option", "maxDate", "0D");
        });
        $endDate.change(function () {
            $startDate.datepicker("option", "minDate", "-1Y");
            $startDate.datepicker("option", "maxDate", $endDate.datepicker("getDate"));
        });
    }
}

function initDatepickerDefaults() {
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd'      // Input Display Format 변경
        , showOtherMonths: true     // 빈 공간에 현재월의 앞뒤월의 날짜를 표시
        , showMonthAfterYear: true  // 년도 먼저 나오고, 뒤에 월 표시
        , changeYear: false         // 콤보박스에서 년 선택 가능
        , changeMonth: false        // 콤보박스에서 월 선택 가능

        // ,showOn: "both"             // button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
        // ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        // ,buttonImageOnly: false //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        // ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트

        , yearSuffix: "년 " //달력의 년도 부분 뒤에 붙는 텍스트
        , minDate: "-1Y"    //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        , maxDate: "0D"     //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)

        , monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] //달력의 월 부분 텍스트
        , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip 텍스트
        , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 부분 텍스트
        , dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 부분 Tooltip 텍스트
    });
}
