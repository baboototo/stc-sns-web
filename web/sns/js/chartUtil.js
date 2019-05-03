
function addChartDataItemStyleColor(chartData) {
    for (var i = 0; i < chartData.length; i++) {
        chartData[i]["itemStyle"] = createRandomItemStyle();
        chartData[i]["value"] = chartData[i]["value"] * chartData[i]["value"];
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
