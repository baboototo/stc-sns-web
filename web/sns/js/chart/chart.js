var Chart = function(api) {
    this._api = api;
};




(function($) {
    $.getScript("../js/common/licence.js", function() {});

    // Load echart.js
    $.getScript("../js/chart/echarts.js", function() {
        initChart();
    });
})(jQuery);