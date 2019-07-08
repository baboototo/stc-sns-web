var ChartPie = function (charPieId) {
    this._id = charPieId;
    this._dom = document.getElementById(this._id);
    this._chartDom = echarts.init(this._dom);
    this._chartLoaing = ChartLoading();
    this._chartOptions = {
        title: {
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
            y: 'bottom'
        },
        toolbox: {
            show : true,
            padding:[10, 40, 0, 0],
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
                            funnelAlign: 'center'
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
                radius : ['30%', '60%'],
                roseType : 'radius',
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: function (dataSetObj) {
                                if (dataSetObj.series.type == 'pie') {
                                    return dataSetObj.name + "\n" + chartValueNumberComma(dataSetObj.data.value) + "건\n("+ dataSetObj.percent + "%)";
                                }
                                return dataSetObj.name + " - " + chartValueNumberComma(dataSetObj.data.value) + "건";
                            }
                        },
                        labelLine : {
                            show : true
                        }
                    }
                }
            }
        ],
        noDataLoadingOption: ChartNoDataLoadingOption()
    };

    this._addEventChartNoData;

    return this;
};
ChartPie.prototype.resize = function () {
    this._chartDom.resize();
};
ChartPie.prototype.clear = function () {
    this._chartDom.clear();
};
ChartPie.prototype.setOptions = function (options) {
    this._chartOptions = options;
};
ChartPie.prototype.addEventChartNoData = function (noDataCallBackFunction) {
    this._addEventChartNoData = noDataCallBackFunction;
};

ChartPie.prototype.searchKeyword = function (apiUrl) {
    var viewId = this._id;
    var chartDom = this._chartDom;
    var chartOptions = this._chartOptions;
    var addEventChartNoData = this._addEventChartNoData;

    chartDom.clear();
    chartDom.showLoading(this._chartLoaing);

    function apiCallBackFunction(data) {
        if (data) {
            var channelSum = chartValueSum(data["series"]);
            chartOptions["title"]["text"]       = addNumberComma(channelSum) + "건";
            chartOptions["legend"]["data"]      = data["legend"];
            chartOptions["toolbox"]["feature"]["magicType"]["option"]["funnel"]["max"] = channelSum;
            chartOptions["series"][0]["data"]      = data["series"];

            if (data["legend"].length == 0) {
                if(addEventChartNoData) { addEventChartNoData(); }
            }
        }

        if (chartOptions && typeof chartOptions === "object") {
            chartDom.hideLoading();
            chartDom.setOption(chartOptions, true);

            window.onresize = function () {
                console.log("onresize");
                chartDom.resize();
            }
        }
        return chartOptions;
    }

    requestGet(apiUrl, apiCallBackFunction);
};

var ChartDataAreaZoom = function (chartDataAreaZoomId) {
    this._id = chartDataAreaZoomId;
    this._dom = document.getElementById(this._id);
    this._chartDom = echarts.init(this._dom);
    this._chartLoaing = ChartLoading();
    this._chartOptions = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            orient : 'horizontal',
            x : 'center',
            y: 440
        },
        toolbox: {
            show : true,
            padding:[10, 40, 0, 0],
            itemSize: 15,
            itemGap: 10,
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            feature: {
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled'],
                    title: {
                        line: '라인',
                        bar: '바',
                        stack: '스택',
                        tiled: '타일드'
                    }
                },
                dataZoom : {
                    show: true,
                    title: {
                        dataZoom: '차트 확대',
                        dataZoomReset: '차트 확대 되돌리기'
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
            y: 390,
            start : 40,
            end : 100
        },
        grid : {
            x: 40,
            y: 60,
            x2: 40,
            y2: 100
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ]
    };
    this._addEventChartNoData;
    return this;
};
ChartDataAreaZoom.prototype.resize = function () {
    this._chartDom.resize();
};
ChartDataAreaZoom.prototype.clear = function () {
    this._chartDom.clear();
};
ChartDataAreaZoom.prototype.setOptions = function (options) {
    this._chartOptions = options;
};
ChartDataAreaZoom.prototype.addEventChartNoData = function (noDataCallBackFunction) {
    this._addEventChartNoData = noDataCallBackFunction;
};
ChartDataAreaZoom.prototype.searchKeyword = function (apiUrl) {
    var chartDataAreaZoom = this._chartDom;
    var chartDataAreaZoomOptions = this._chartOptions;
    var addEventChartNoData = this._addEventChartNoData;

    chartDataAreaZoom.clear();
    chartDataAreaZoom.showLoading(this._chartLoaing);

    function apiCallBackFunction(data) {
        if (data) {
            chartDataAreaZoomOptions["legend"]["data"]    = data["legend"];
            chartDataAreaZoomOptions["xAxis"][0]["data"]  = data["xaxis"];
            chartDataAreaZoomOptions["series"]            = data["series"];

            if (data["legend"].length == 0) {
                if(addEventChartNoData) { addEventChartNoData(); }
            }
        }

        if (chartDataAreaZoomOptions && typeof chartDataAreaZoomOptions === "object") {
            chartDataAreaZoom.hideLoading();
            chartDataAreaZoom.setOption(chartDataAreaZoomOptions, true);
            window.onresize = function () {
                chartDataAreaZoom.resize();
            }
        }
    }
    requestGet(apiUrl, apiCallBackFunction);
};


