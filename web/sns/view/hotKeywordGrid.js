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
            url: "/sns/js/grid/language_ko.json"
        },
        info: false,
        paging: false,
        order: [],
        searching: false,
        scrollY: '400',
        scrollCollapse: true,
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
                targets: 0, width: '10%', className: 'dt-body-center', orderable: true
            },
            {
                targets: 1, width: '45%', className: 'dt-body-center'
            },
            {
                targets: 2, width: '45%', className: 'dt-body-center'
            },
        ]
    });

    $('#hotKeywordGrid tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }else {
            hotKeywordGridTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            sendEventListener(hotKeywordGridTable.row( this ).data().name);
        }
    } );

    $('#hotKeywordGrid tbody').on('click', 'td.a-control', function () {
        var tr = $(this).closest('tr');
        var row = hotKeywordGridTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            var parameters = "?startDate=" + startDate + "&endDate=" + endDate + "&channels=" + channels;
            var url = "/wordCloud/v1.0/words/" + keyword + "/" + encodeURIComponent(row.data().name) + parameters;

            requestGet(url, function (resultData) {
                row.child( addSubTableHTML(resultData) ).show();
                tr.addClass('shown');
            });
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