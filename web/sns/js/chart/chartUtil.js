
function chartValueSum(chartData) {
    var valueSum = 0;
    for (var idx = 0; idx < chartData.length; idx++) {
        valueSum += chartData[idx]["value"];
    }
    return valueSum;
}

function addChartDataItemStyleColor(chartData) {
    for (var i = 0; i < chartData.length; i++) {
        chartData[i]["itemStyle"] = createRandomItemStyle();
        chartData[i]["value"] = chartData[i]["value"] * chartData[i]["value"];

        if( i < 5){
        chartData[i]["selected"] = false;
        }
    }
    return chartData;
}

/**
 * RGB 반환
 * @returns {{normal: {color: string}}}
 */
function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}
