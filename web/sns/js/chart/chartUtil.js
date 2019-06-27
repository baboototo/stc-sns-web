
function chartValueSum(chartData) {
    var valueSum = 0;
    for (var idx = 0; idx < chartData.length; idx++) {
        valueSum += chartData[idx]["value"];
    }
    return valueSum;
}
