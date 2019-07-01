var searchKeyword;                          // 검색키워드
var searchOptionParam;                      // 검색 조건 파라미터
var channelCollectionSumPieChart;           // 채널별추이 차트
var channelCollectionDataAreaZoomChart;     // 수집추이 차트
var hotKeywordCollectionDataAreaZoomChart;  // 화제어 채널별 추이 차트

$(document).ready(function(){

    initData();
    initChart();
    initViewEvent();

    initHotKeywordGrid();
    initOriginalWebDocumentGrid();

    var iFrameLoadingCount = 0;
    $("iframe").on("load", function() {
        iFrameLoadingCount++;
        if (iFrameLoadingCount == $("iframe").length) {
            $("#btnSend").trigger("click");
        }
    });
});

function search() {

    searchKeyword = encodeURIComponent($("#keyword").val());
    searchOptionParam = "startDate=" + getStartDate()
        + "&endDate=" + getEndDate()
        + "&channels=" + getSelectedChannels();


    // 아이프레임에 있는 워드클라우드 조회
    $("iframe").each(function(){
        var fContentWindow = $(this).get(0).contentWindow;
        fContentWindow.searchWordCloud(searchKeyword, searchOptionParam);
    });

    // 채널별추이 조회
    channelCollectionSumPieChart.searchKeyword(searchKeyword, searchOptionParam);

    // 수집추이 조회
    channelCollectionDataAreaZoomChart.searchKeyword(searchKeyword, searchOptionParam);

    // 화제어 조회
    searchHotKeywordGrid(searchKeyword, searchOptionParam);

    // 원문 조회
    searchOriginalWebDocumentGrid(searchKeyword, searchOptionParam);
}


// 데이터 초기화
function initData() {
    // 조회날짜 설정
    setSearchDate("startDate", "endDate");

    searchKeyword = encodeURIComponent($("#keyword").val());
    searchOptionParam = "startDate=" + getStartDate()
                        + "&endDate=" + getEndDate()
                        + "&channels=" + getSelectedChannels();
}

// 차트 초기화
function initChart() {
    channelCollectionSumPieChart            = new ChartPie("channelCollectionSumPieChart");
    channelCollectionDataAreaZoomChart      = new ChartDataAreaZoom("channelCollectionDataAreaZoomChart");
    hotKeywordCollectionDataAreaZoomChart   = new ChartDataAreaZoom("hotKeywordCollectionDataAreaZoomChart");
}

// View Event 초기화
function initViewEvent() {
    // 차트/그리드 박스 마우스 이벤트
    $(".data-box").each(function(idx, el){
        $(this).hover(
            function(){
                // 마우스 오버일 경우에 실행
                $(this).parent(".data").addClass("line");
            },
            function(){
                // 마우스 오버일 경우에 실행
                $(this).parent(".data").removeClass("line");
            }
        );
    });

    // 화면(리스트/배열) 구성 설정 버튼 이벤트
    $(".list-btn button").on("click",function(){
        $(this).addClass("on").siblings().removeClass("on");

        if($(".list-btn .list01").hasClass("on")){
            $("article > div").animate({width:"100%",marginLeft:"0"}, 1000, function(){
                channelCollectionSumPieChart.resize();           // 채널별추이 차트
                channelCollectionDataAreaZoomChart.resize();     // 수집추이 차트
                hotKeywordCollectionDataAreaZoomChart.resize();  // 화제어 채널별 추이 차트
            });
            $(".graph-right").css({marginTop:"40px"});
        }else{
            $(".graph-left, .graph-right").animate({width:"47.8%"}, 1000, function(){
                channelCollectionSumPieChart.resize();           // 채널별추이 차트
                channelCollectionDataAreaZoomChart.resize();     // 수집추이 차트
                hotKeywordCollectionDataAreaZoomChart.resize();  // 화제어 채널별 추이 차트
            });
            $(".graph-right").css({marginTop:"0",marginLeft:"40px"});

        }

        // setTimeout(function() {
        //     channelCollectionSumPieChart.resize();           // 채널별추이 차트
        //     channelCollectionDataAreaZoomChart.resize();     // 수집추이 차트
        //     hotKeywordCollectionDataAreaZoomChart.resize();  // 화제어 채널별 추이 차트
        // }, 2000);

    });

    // 채널 체크박스 선택 이벤트
    $("input:checkbox[name=chkChannel]").click(function () {
        var chkboxChannelCount = $("input:checkbox[name=chkChannel]").length;
        var checkedChannelCount = $("input:checkbox[name=chkChannel]:checked").length;

        var isAllCheck = false;
        if (chkboxChannelCount == checkedChannelCount) {
            isAllCheck = true;
        }

        $("#channelAll").prop("checked", isAllCheck);
    });

    // 채널 체크박스 전체 선택 이벤트
    $("#channelAll").click(function () {
        $("input:checkbox[name=chkChannel]").prop("checked", this.checked);
    });

    // 조회 버튼 이벤트
    $("#btnSend").click(function(){

        var keyword = encodeURIComponent($("#keyword").val());

        if (!keyword || keyword.replace( /^\s+|\s+$/g, "") == ""){
            alert("검색어를 입력해 주세요.");
            return;
        }

        search();
    });

    $("#siteOption").change(function(){
        var siteCode = $("#siteOption option:selected").val();
        $("iframe").each(function(){
            var fContentWindow = $(this).get(0).contentWindow;
            fContentWindow.searchWordCloud(searchKeyword, searchOptionParam);

            if (siteCode == "1") {
                fContentWindow.licence["licence"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTVEMiLCJVU0VSX05BTUUiOiJiYWJvb3RvdG8iLCJMSUNFTlNFX1MiOjE1NTkxNDIwMDAsIkxJQ0VOU0VfRSI6MTU5MDY3ODAwMH0.i9U4W-neXAMREwck4_XPpCqrxWC48Wd4Fgfwn0L0VJ0";
            } else {
                fContentWindow.licence["licence"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTVEMiLCJVU0VSX05BTUUiOiJraXNkIiwiTElDRU5TRV9TIjoxNTYxNTYxMjAwLCJMSUNFTlNFX0UiOjE1OTMwOTcyMDB9.4rZev4nsZzaJDRzvPSF_syybpYOALN676JpbPfjIpMc"
            }

        });

        if (siteCode == "1") {
            licence["licence"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTVEMiLCJVU0VSX05BTUUiOiJiYWJvb3RvdG8iLCJMSUNFTlNFX1MiOjE1NTkxNDIwMDAsIkxJQ0VOU0VfRSI6MTU5MDY3ODAwMH0.i9U4W-neXAMREwck4_XPpCqrxWC48Wd4Fgfwn0L0VJ0";
        } else {
            licence["licence"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTVEMiLCJVU0VSX05BTUUiOiJraXNkIiwiTElDRU5TRV9TIjoxNTYxNTYxMjAwLCJMSUNFTlNFX0UiOjE1OTMwOTcyMDB9.4rZev4nsZzaJDRzvPSF_syybpYOALN676JpbPfjIpMc"
        }
    });
}

// 이벤트 호출
function callSendEventListener(target, value) {
    if (target == "hotKeywordCollectionDataAreaZoomChart") {
        $("#hotKeyword").html(" - " + value);
        hotKeywordCollectionDataAreaZoomChart.searchKeyword(encodeURIComponent(value), searchOptionParam);
    }
}

// 조회조건 시작일자 반환
function getStartDate() {
    return $("#startDate").val().replace(/-/gi, "");
}

// 조회조건 종료일자 반환
function getEndDate() {
    return $("#endDate").val().replace(/-/gi, "");
}

// 조회조건 선택된 채널 코드값 반환 (10,20,30)
function getSelectedChannels() {
    var channels = new Array();
    $("input:checkbox[name=chkChannel]:checked").each(function () {
        channels.push(this.value);
    });
    return channels.join(",");
}
