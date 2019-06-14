
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
            sizeRange: [10, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 10,
            shape: 'pentagon',
            maskImage: maskImage,
            drawOutOfBound: false,
            textStyle: {
                normal: {
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
    $("#option").change(function(){
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
    var imageName = $("#option option:selected").val();
    maskImage.src = "../images/wordcloud/"+ imageName +".png";
}

function setKeyword(keyword) {
    requestGet(licence.url + "/wordCloud/v1.0/words?keyword=" + keyword, setChartData);
}


(function($) {
    "use strict"
    $.getScript("../js/common/licence.js", function() {});
    $.getScript("../js/common/common.js", function() {});
    $.getScript("../js/wordcloud/echarts.simple.js", function() {
        $.getScript("../js/wordcloud/echarts-wordcloud.min.js", function() {
            initWordCloud();
            initEvent();

        });
    });
})(jQuery);