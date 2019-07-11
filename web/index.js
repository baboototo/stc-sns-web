var apiPathVariable;                        // 검색 조회 파라미터
var selectedChannels = new Array();         // 선택된 채널 정보
var channelCollectionSumPieChart;           // 채널별추이 차트
var channelCollectionDataAreaZoomChart;     // 수집추이 차트
var hotKeywordCollectionDataAreaZoomChart;  // 화제어 채널별 추이 차트

$(document).ready(function(){

    initData();
    initChart();
    initViewEvent();
    browserCheck(); //브라우저 체크
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


function cleanView() {
    clearHotKeywordGrid();
    clearDataOriginalWebDocumentGrid();

    channelCollectionSumPieChart.clear();
    channelCollectionDataAreaZoomChart.clear();
}

function searchWordCloud() {

    // 조회 조건값 설정
    apiPathVariable = {
        keyword: encodeURIComponent($("#keyword").val()),
        chnlCd: "",
        channels: selectedChannels.join(","),
        startDate: getStartDate(),
        endDate: getEndDate()
    };

    // 선택된 채널에 따른 조회 조건값 변경
    if (selectedChannels.length == 1) {
        delete apiPathVariable.channels;
        apiPathVariable.chnlCd = selectedChannels[0];
    } else {
        delete apiPathVariable.chnlCd;
    }

    // 워드클라우드 조회
    $("#wordCloudIframe").get(0).contentWindow.searchWordCloud(requestApiUrl(Api.wordCloudApi, apiPathVariable), searchChartGrid);
}

function searchChartGrid(searchWordCloudCount) {
    if (searchWordCloudCount > 0) {
        // 화제어 키워드 / 원문 리스트 Grid 조회
        searchHotKeywordGrid(requestApiUrl(Api.wordCloudApi, apiPathVariable), apiPathVariable);
        searchOriginalWebDocumentGrid(requestApiUrl(Api.originalWebDocumentApi, apiPathVariable), apiPathVariable);

        // 채널별추이 / 수집추이 / 화재어 채널별 추이 조회
        if (selectedChannels.length == 1) {
            channelCollectionSumPieChart.searchKeyword(requestApiUrl(Api.channelDetailCollectionSumApi, apiPathVariable));
            channelCollectionDataAreaZoomChart.searchKeyword(requestApiUrl(Api.channelDetailCollectionApi, apiPathVariable));
        } else {
            channelCollectionSumPieChart.searchKeyword(requestApiUrl(Api.channelCollectionSumApi, apiPathVariable));
            channelCollectionDataAreaZoomChart.searchKeyword(requestApiUrl(Api.channelCollectionApi, apiPathVariable));
        }
    }
}


// 데이터 초기화
function initData() {
    // 조회날짜 설정
    setSearchDate("startDate", "endDate");
}

// 차트 초기화
function initChart() {
    channelCollectionDataAreaZoomChart      = new ChartDataAreaZoom("channelCollectionDataAreaZoomChart");
    hotKeywordCollectionDataAreaZoomChart   = new ChartDataAreaZoom("hotKeywordCollectionDataAreaZoomChart");
    channelCollectionSumPieChart            = new ChartPie("channelCollectionSumPieChart");
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
            var dataBoxCount = $("article > div").length;
            var dataBoxIdx = 0;

            $("article > div").animate({width:"100%",marginLeft:"0"});
            $(".graph-right").css({marginTop:"40px"});
        }else{

            var dataBoxCount = $(".graph-left, .graph-right").length;
            var dataBoxIdx = 0;

            $(".graph-left, .graph-right").animate({width:"47.8%"});
            $(".graph-right").css({marginTop:"0",marginLeft:"40px"});

        }

        setTimeout(function() {
            channelCollectionSumPieChart.resize();           // 채널별추이 차트
            channelCollectionDataAreaZoomChart.resize();     // 수집추이 차트
            hotKeywordCollectionDataAreaZoomChart.resize();  // 화제어 채널별 추이 차트

            drawHotKeywordGrid();
            drawDataOriginalWebDocumentGrid();
        }, 1500);

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

        // 선택된 채널 가져오기
        selectedChannels = getSelectedChannels();
        if (selectedChannels.length == 0) {
            alert("하나 이상의 채널을 선택해 주세요.");
            return;
        }

        cleanView();
        searchWordCloud();
    });

    $("#siteOption").change(function(){
        var siteCode = $("#siteOption option:selected").val();
        $("iframe").each(function(){
            var fContentWindow = $(this).get(0).contentWindow;
            fContentWindow.searchWordCloud(requestApiUrl(Api.wordCloudApi, apiPathVariable));

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
function callSendEventListener(target, valueObj) {

    if (target == "hotKeywordCollectionDataAreaZoomChart") {

        if (!valueObj) {
            $("#hotKeyword").html("");
            hotKeywordCollectionDataAreaZoomChart.clear();
            return;
        }

        $("#hotKeyword").html(" - " + valueObj.name);

        var hotKeywordApiPathVariable = $.extend({}, apiPathVariable);
        hotKeywordApiPathVariable.keyword = encodeURIComponent(valueObj.name);

        if (hotKeywordApiPathVariable.chnlCd) {
            hotKeywordCollectionDataAreaZoomChart.searchKeyword(requestApiUrl(Api.channelDetailCollectionApi, hotKeywordApiPathVariable));
        } else {
            hotKeywordCollectionDataAreaZoomChart.searchKeyword(requestApiUrl(Api.channelCollectionApi, hotKeywordApiPathVariable));
        }
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

// 조회조건 선택된 채널 코드값 반환
function getSelectedChannels() {
    var channels = new Array();
    $("input:checkbox[name=chkChannel]:checked").each(function () {
        channels.push(this.value);
    });
    return channels;
}
function browserCheck(){
	(function(){ // 외부 라이브러리와 충돌을 막고자 모듈화.
		// 브라우저 및 버전을 구하기 위한 변수들.
		'use strict';
		var agent = navigator.userAgent.toLowerCase(),
		name = navigator.appName,
		browser;
		
		// MS 계열 브라우저를 구분하기 위함.
		if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
			browser = 'ie';
			if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
				agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
				browser += parseInt(agent[1]);
				if(parseInt(agent[1]) <= 9){ // IE 9
					
				}
			} else { // IE 11+
				if(agent.indexOf('trident') > -1) { // IE 11
					browser += 11;
				} else if(agent.indexOf('edge/') > -1) { // Edge
					browser = 'edge';
				}
			}
		} else if(agent.indexOf('safari') > -1) { // Chrome or Safari
			if(agent.indexOf('opr') > -1) { // Opera
				browser = 'opera';
			} else if(agent.indexOf('chrome') > -1) { // Chrome
				browser = 'chrome';
				
			} else { // Safari
				browser = 'safari';
			}
		} else if(agent.indexOf('firefox') > -1) { // Firefox
			browser = 'firefox';
		}

		// IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
		document.getElementsByTagName('html')[0].className = browser;
	}());
}


