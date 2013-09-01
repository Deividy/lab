$(function() {
    var btnBack, btnNext;

    btnBack = new Button('Back', 'sa-btnBack');
    btnBack.setClass('btn-info')
        .setIcon('left', 'icon-arrow-left')
        .onClick(function() {
            alert('Back');
        }
    );
    
    btnNext = new Button('Next', 'sa-btnNext');
    btnNext.setClass('btn-success')
        .setIcon('right', 'icon-arrow-right')
        .onClick(function() {
            alert('Next');
        }
    );

    var btnFetch = new Button('Fetch', 'sa-btnFetch');
    btnFetch.setIcon('left', 'icon-calendar').onClick(function() {
        alert('Fetch');
    });

    var btnHtml = new ButtonAdapterHtml("weirdLink", "<a href='#'>Testing it</a>");
    
    var tbTop = new Toolbar('tbTop');
    tbTop.addButton('left', btnFetch);
    tbTop.addButton('right', btnHtml);
    tbTop.render('#top');

    var tbFooter = new Toolbar('tbFooter');
    tbFooter.addButton('left', btnBack);
    tbFooter.addButton('right', btnNext);
    tbFooter.render('#footer');
});
