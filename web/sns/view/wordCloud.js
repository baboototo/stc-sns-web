
$(document).ready(function(){
    initWordCloud();
    initEvent();
});


var chart, option, maskImage, addEventSearchEnd;

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
            gridSize: 20,
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
}

function initEvent() {
    $("#wordCloudOption").change(function(){
        setWordCloudImage();
    });
}


function setChartData(data) {
    if (addEventSearchEnd) {
        addEventSearchEnd(data.length);
    }

    if (data && data.length > 0) {
        maskImage.onload = function () {
            option.series[0].maskImage
            option.series[0].data = data;
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
    this.addEventSearchEnd = addEventSearchEnd;
    chart.clear();
    requestGet(apiUrl, setChartData);
}
