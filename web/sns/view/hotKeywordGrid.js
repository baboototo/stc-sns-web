var hotKeywordGridTable;
var keyword, parameters;

function searchHotKeywordGrid(keyword, parameters) {
    this.keyword = keyword;
    this.parameters = parameters;

    requestGet(Api.wordCloudApi + "/" + this.keyword + "?" + this.parameters, setHotKeywordGridData);
}

function setHotKeywordGridData(data) {
    hotKeywordGridTable.clear();
    hotKeywordGridTable.rows.add(data);
    hotKeywordGridTable.draw();

    if (data.length > 0) {
        sendEventListener(hotKeywordGridTable.row(":eq(0)").data().name);
    }
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
        scrollY: '400',
        scrollCollapse: true,
        autoWidth: true,
        columns: [
            {
                className:      'a-control',
                orderable:      false,
                defaultContent: '',
                data:           null
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
                targets: 1, className: 'dt-body-center'
            },
            {
                targets: 2, className: 'dt-body-center'
            },
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
                    var url = Api.wordCloudApi + "/" + this.keyword + "/" + encodeURIComponent(row.data().name) + "?" + parameters;
                    requestGet(url, function (resultData) {
                        row.child( addSubTableHTML(resultData) ).show();
                        tr.addClass('shown');
                    });
                }
        } else {
            sendEventListener(hotKeywordGridTable.row( tr ).data().name);
        }
    });

}

function addSubTableHTML (data) {
    var dataHtml = '';
    $.each(data, function () {
        dataHtml +='<tr>'
            + ' <td>' + this.name + '</td>'
            + ' <td>' + addNumberComma(this.value) + ' 건</td>'
            + '</tr>';

    });
    var html = '<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">'
        +   '   <thead>'
        +   '       <tr>'
        +   '       <th colspan="2" align="left">연관 검색어</th>'
        +   '       </tr>'
        +   '       <tr>'
        +   '           <th>키워드</th>'
        +   '           <th>문서 수</th>'
        +   '       </tr>'
        +   '   </thead>'
        +   '   <tbody>'
        +   dataHtml
        +   '   </tbody>'
        +   '   </table>';
    return html;
}

function sendEventListener(value) {
    callSendEventListener("hotKeywordCollectionDataAreaZoomChart", value);
}