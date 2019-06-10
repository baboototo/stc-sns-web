function setKeyword(keyword) {
    requestGet(licence.url + "/dataZoom/v1.0/channel/days/" + keyword, createKeywordChart);
}

function createKeywordChart(data) {
    var dom = document.getElementById("keywordChart");
    var myChart = echarts.init(dom);

    var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: data.legend
        },
        toolbox: {
            show : true,
            feature: {
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled'],
                    title: {
                        line: "라인 차트 보기",
                        bar: "바 차트 보기",
                        stack: "스택 차트  보기",
                        tiled: "타일드 차트 보기",
                    }
                },
                dataZoom : {
                    show: true,
                    title: {
                        dataZoom: "차트 확대",
                        dataZoomReset: "차트 확대 되돌리기"
                    }
                },
                saveAsImage : {
                    show: true,
                    type: 'jpeg',
                    title: '이미지 저장',
                    name: '채널별 수집량',
                    lang: ['저장 합니다.']
                }
            }
        },
        calculable : true,
        dataZoom : {
            show : true,
            realtime : true,
            start : 20,
            end : 80
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : data.xaxis
            }
        ],
        yAxis : [
            {
                type : 'value',
            }
        ],
        series : data.series
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);

        window.onresize = function () {
            myChart.resize();
        }
    }


}

(function($) {
    "use strict"
    $.getScript("../js/common/licence.js", function() {});
    $.getScript("../js/common/common.js", function() {});
    $.getScript("../js/chart/chartUtil.js", function() {});
    $.getScript("../js/chart/echarts.js", {});
})(jQuery);
