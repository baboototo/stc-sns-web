var originalWebDocumentGridTable;

function searchOriginalWebDocumentGrid(apiUrl) {
    requestGet(apiUrl, setDataOriginalWebDocumentGrid);
}

function clearDataOriginalWebDocumentGrid() {
    originalWebDocumentGridTable.clear();
    originalWebDocumentGridTable.draw();
}

function setDataOriginalWebDocumentGrid(data) {
    originalWebDocumentGridTable.clear();
    originalWebDocumentGridTable.rows.add(data);
    originalWebDocumentGridTable.draw();
    $('.dataTables_scrollBody #originalWebDocumentGrid').prepend('<caption class="font_blind">body원문데이터리스트</caption>');
    $('.dataTables_scrollBody').next('.dataTables_scrollFoot').children(".dataTables_scrollFootInner").children("table").prepend('<caption class="font_blind">footer원문데이터리스트</caption><tbody><tr><th scope="row" class="blind"></th></tr></tbody>');
}

function initOriginalWebDocumentGrid() {
    originalWebDocumentGridTable = $('#originalWebDocumentGrid').removeAttr('width').DataTable({
        language: {
            url: "./sns/js/grid/language_ko.json"
        },
        info: true,
        paging: true,
        pagingType: "full_numbers",
        order: [],
        searching: true,
        scrollY: '320',
        scrollCollapse: true,
        columns: [
            {data: 'CHNL_LCLS_NM'},
            {data: 'CHNL_MCLS_NM'},
            {data: 'CHNL_SCLS_NM'},
            {data: 'TTL_NM'},
            {data: 'LINK_NM'},
            {data: 'BASE_DATE'}
        ],
        columnDefs: [
            {
                targets: 0, width: '8%', className: 'dt-body-center'
            },
            {
                targets: 1, width: '10%', className: 'dt-body-center'
            },
            {
                targets: 2, width: '10%', className: 'dt-body-center'
            },
            {
                targets: 3, width: '40%', className: 'dt-body-left'
            },
            {
                targets: 4, width: '21%', className: 'dt-body-left',
                render: function ( data, type, row ) {
                    return '<a href="'+ data +'" target="_blank">'+ data +'</a>';
                }
            },
            {
                targets: 5, width: '11%', className: 'dt-body-center',
                render: function ( data, type, row ) {
                    return addDateFormat(data, "-");
                }

            }
        ]


    });
}
