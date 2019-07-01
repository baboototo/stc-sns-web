
$(document).ready(function(){
    initWordCloud();
    initEvent();
});


var chart, option, maskImage;

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
            sizeRange: [15, 100],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 5,
            shape: 'pentagon',
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

    window.onresize = function () {
        chart.resize();
    }
}

function initEvent() {
    $("#wordCloudOption").change(function(){
        setWordCloudImage();
    });
}


function setChartData(data) {
    maskImage.onload = function () {
        option.series[0].maskImage
        option.series[0].data = data;
        chart.setOption(option);
    }

    setWordCloudImage();
}


function setWordCloudImage() {
    var imageName = $("#wordCloudOption option:selected").val();
    maskImage.src = "../images/wordcloud/"+ imageName +".png";
}

function searchWordCloud(keyword, parameters) {
    requestGet(Api.wordCloudApi + "/" + keyword + "?" + parameters, setChartData);
}
