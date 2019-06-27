
var myChart;

function setKeyword(keyword, startDate, endDate, channels) {
    var dom = document.getElementById("channelTotal");
    myChart = echarts.init(dom);

    myChart.showLoading({
        text : "Loading...",
        effect : "spin",
        textStyle : {
            fontSize : 20,
        },
        effectOption: {
            backgroundColor: "rgba(0,0,0,0.8)"
        }
    });



    var parameters = "/" + keyword + "?startDate=" + startDate + "&endDate=" + endDate + "&channels=" + channels;
    requestGet("/pie/v1.0/channels" + parameters, createChannelTotal);
}

function createChannelTotal(data) {
    var channelSum = chartValueSum(data["series"]);
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
            y: 'top',
            data: data["legend"]
        },
        toolbox: {
            show : true,
            itemSize: 15,
            itemGap: 10,
            feature : {
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    title: {
                        pie: '원형',
                        funnel: '깔대기'

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
                    title: '저장',
                    name: '채널별 추이',
                    lang: ['다운로드']
                }
            }
        },
        calculable : false,
        series : [
            {
                type:'pie',
                radius : ['40%', '70%'],
                roseType : 'radius',
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: function (dataSetObj) {
                                if (dataSetObj.series.type == 'pie') {
                                    return dataSetObj.name + "\n" + dataSetObj.data.value + "건\n("+ dataSetObj.percent + "%)";
                                }
                                return dataSetObj.name + " - " + dataSetObj.data.value + "건";
                            }
                        },
                        labelLine : {
                            show : true
                        }
                    }
                },
                data: data["series"]
            }
        ],
        noDataLoadingOption: {
            text: "데이터 없음"
        }
    };

    if (option && typeof option === "object") {
        myChart.hideLoading();
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


