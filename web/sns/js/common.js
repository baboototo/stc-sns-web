function requestGet(url, sendOption, callBackFun) {
    var head = {};
    head["Authorization"] = licence.licence;

    $.ajax({
        type:"GET",
        url: url,
        headers : head,
        contentType : "application/json; charset=UTF-8",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            callBackFun(sendOption, data);
        },
        error: function (request,status,error) {
            console.log("조회 중 오류가 발생하였습니다.");
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

