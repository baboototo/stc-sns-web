function setKeyword(keyword, startDate, endDate, channels) {
    var parameters = "/" + keyword + "?startDate=" + startDate + "&endDate=" + endDate + "&channels=" + channels;
    requestGet(licence.url + "/dataZoom/v1.0/channel/collection/days" + parameters, createKeywordChart);
}

function createKeywordChart(data) {
    var dom = document.getElementById("keywordChart");
    var myChart = echarts.init(dom);

    var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            orient : 'horizontal',
            x : 'center',
            y: 'top',
            data: data["legend"]
        },
        toolbox: {
            show : true,
            itemSize: 15,
            itemGap: 10,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled'],
                    title: {
                        line: "라인",
                        bar: "바",
                        stack: "스택",
                        tiled: "타일드"
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
                    title: '저장',
                    name: '수집 추이',
                    lang: ['다운로드']
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
                data : data["xaxis"]
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : data["series"]
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
