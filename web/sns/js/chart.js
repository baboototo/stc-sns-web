var Chart = function(api) {
    this._api = api;
};




(function($) {

    $.getScript("./js/licence.js", function() {});

    // Load echart.js
    $.getScript("./js/echarts.js", function() {
        initChart();
    });

})(jQuery);