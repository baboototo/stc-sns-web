var hotKeywordGridTable;
var hotKewordApiPathVariable;

function searchHotKeywordGrid(apiUrl, apiPathVariable) {
    hotKewordApiPathVariable = $.extend({}, apiPathVariable);

    requestGet(apiUrl, setHotKeywordGrid);
}

function drawHotKeywordGrid() {
    hotKeywordGridTable.draw();
}

function clearHotKeywordGrid() {
    hotKeywordGridTable.clear();
    hotKeywordGridTable.draw();

    sendEventListener(hotKeywordGridTable.row(":eq(0)").data());
}

function setHotKeywordGrid(data) {
    hotKeywordGridTable.clear();
    hotKeywordGridTable.rows.add(data);
    hotKeywordGridTable.draw();
    $('.dataTables_scrollBody #hotKeywordGrid').prepend('<caption class="font_blind">body화제어리스트</caption>');

    sendEventListener(hotKeywordGridTable.row(":eq(0)").data());
}

function initHotKeywordGrid() {
    hotKeywordGridTable = $('#hotKeywordGrid').DataTable({
        language: {
            url: "./sns/js/grid/language_ko.json"
        },
        info: false,
        paging: false,
        order: [],
        searching: false,
        scrollY: '416',
        scrollCollapse: true,
        autoWidth: true,
        columns: [
            {
                className:      'a-control',
                orderable:      false,
                defaultContent: '',
                data:           null,
                render: function ( data, type, row ) {
                    return '<button type="button" ></button>';
                }
            },
            {data: 'name'},
            {
                data: 'value',
                render: function (data, type, row) {
                    if (type == 'display') {
                        data = addNumberComma(data) + " 건";
                    }
                    return data;
                }
            }
        ],
        columnDefs: [
            {
                targets: 0, width: "20%"
            },
            {
                targets: 1, width: "40%",className: 'dt-body-center'
            },
            {
                targets: 2, width: "40%", className: 'dt-body-center'
            }
        ]
    });

    $('#hotKeywordGrid tbody').on('click', 'td', function () {
        var tr = $(this).closest('tr');

        if ($(this).hasClass("a-control")) {
                var row = hotKeywordGridTable.row(tr);

                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                } else {

                    hotKewordApiPathVariable["subKeyword"] = encodeURIComponent(row.data().name);

                    var apiUrl = requestApiUrl(Api.wordCloudSubKeywordApi, hotKewordApiPathVariable);

                    requestGet(apiUrl, function (resultData) {
                        row.child( addSubTableHTML(resultData) ).show();
                        tr.addClass('shown');
                    });
                }
        } else if ($(this).hasClass("dt-body-center")) {
            sendEventListener(hotKeywordGridTable.row( tr ).data());
        }
    });
}

function addSubTableHTML (data) {
    var dataHtml = '';
    $.each(data, function () {
        dataHtml +='<tr>'
            + ' <td style="text-align:center">' + this.name + '</td>'
            + ' <td style="text-align:center">' + addNumberComma(this.value) + ' 건</td>'
            + '</tr>';

    });
    var html = '<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; summary="연관검색어 데이터입니다.">'
        +   '   <caption class="font_blind">연관검색어목록</caption>'
        +   '   <thead>'
        +   '       <tr>'
        +   '       <th colspan="2" align="left">연관 검색어</th>'
        +   '       </tr>'
        +   '       <tr>'
        +   '           <th scope="col">키워드</th>'
        +   '           <th scope="col">문서수</th>'
        +   '       </tr>'
        +   '   </thead>'
        +   '   <tbody>'
        +   dataHtml
        +   '   </tbody>'
        +   '   </table>';
    return html;
}

function sendEventListener(valueObj) {
    callSendEventListener("hotKeywordCollectionDataAreaZoomChart", valueObj);
}