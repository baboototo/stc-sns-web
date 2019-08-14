
$(document).ready(function(){
    initWordCloud();
    initEvent();
});


var chart, option, maskImage, callBackSearchEnd, callBackRowChange;
var gridSize = [20, 15, 10, 7];
var selectedWordCloudIdx = 0;

function initWordCloud() {
    maskImage = new Image();
    chart = echarts.init(document.getElementById('wordCloudChart'));
    option = {
        series: [ {
            type: 'wordCloud',
            left: 'center',
            top: 'center',
            width: '100%',
            height: '100%',
            sizeRange: [10, 80],
            rotationRange: [0, 0],
            rotationStep: 0,
            gridSize: 10,
            shape: 'circle',
            maskImage: maskImage,
            drawOutOfBound: false,
            textStyle: {
                normal: {
                    fontFamily: 'sans-serif',
                    // fontWeight: 'bold',
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    color: 'red'
                }
            }
        } ]
    };
}

function initEvent() {
    $("#wordCloudOption").change(function(){
        setWordCloudImage();
    });

    $("#wordCloudCount").change(function(){
        if (callBackRowChange) {
            callBackRowChange($(this).val());
        }
    });
}


function setChartData(data) {
    if (callBackSearchEnd) {
        callBackSearchEnd(data.length);
    }

    selectedWordCloudIdx = $("#wordCloudCount option").index($("#wordCloudCount option:selected"));

    if (data && data.length > 0) {
        maskImage.onload = function () {
            option.series[0].maskImage
            option.series[0].data = data;
            option.series[0].gridSize = gridSize[selectedWordCloudIdx];
            chart.setOption(option);
        };

        setWordCloudImage();

        window.onresize = function () {
            chart.resize();
        }
    }
}


function setWordCloudImage() {
    var imageName = $("#wordCloudOption option:selected").val();
    maskImage.src = "../images/wordcloud/"+ imageName +".png";
}

function searchWordCloud(apiUrl, addEventSearchEnd) {
    callBackSearchEnd = addEventSearchEnd;
    chart.clear();
    requestGet(apiUrl, setChartData);
}

function addEventWordCloudRowChange( addEventWordCloudRowChange) {
    callBackRowChange = addEventWordCloudRowChange;
}


