function requestGet(url, callBackFun) {
    var head = {};
    head["Authorization"] = licence.licence;
    $.support.cors = true;
    $.ajax({
        type:"GET",
        url: url,
        headers : head,
        contentType : "application/json; charset=UTF-8",
        dataType: 'json',
        success: function(data) {
            callBackFun(data);
        },
        error: function (request,status,error) {
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
