
function setKeyword(keyword) {
    requestGet(licence.url + "/pie/v1.0/channels?keyword=" + keyword, createChannelTotal);
}

function createChannelTotal(data) {
    var dom = document.getElementById("channelTotal");
    var myChart = echarts.init(dom);
    var channelSum = chartValueSum(data.seriesData);

    var option = {
        title: {
            text: addNumberComma(channelSum) + "건",
            x: 'center',
            y: 'center',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle : {
                color: '#000000',
                fontWeight : 'bold'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}<br/>{c}건 ({d}%)",
            textStyle: {
                align: 'center'
            }
        },

        legend: {
            orient : 'horizontal',
            x : 'center',
            y: 'bottom',
            data: data.legendData
        },
        toolbox: {
            show : true,
            itemSize: 20,
            itemGap: 20,

            feature : {
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    title: {
                        pie: '원형 차트 보기',
                        funnel: '깔대기 차트 보기'

                    },
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: channelSum
                        }
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
        calculable : false,
        series : [
            {
                type:'pie',
                radius : ['50%', '70%'],
                roseType : 'radius',
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: function (dataSetObj) {
                                if (dataSetObj.series.type == 'pie') {
                                    return dataSetObj.name + "\n" + dataSetObj.data.value + "건 ("+ dataSetObj.percent + "%)";
                                }
                                return dataSetObj.name + " - " + dataSetObj.data.value + "건";
                            }
                        },
                        labelLine : {
                            show : true
                        }
                    }
                },
                data: data.seriesData
            }
        ]
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
    $.getScript("../js/chart/echarts.js", function() {});
})(jQuery);


