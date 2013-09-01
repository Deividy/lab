$(function() {
    var btnBack, btnNext;

    btnBack = new E.Button('sa-btnBack', 'Back');
    btnBack.setClass('btn-info')
        .setIcon('left', 'icon-arrow-left')
        .onClick(function() {
            alert('Back');
        }
    );
    
    btnNext = new E.Button('sa-btnNext', 'Next');
    btnNext.setClass('btn-success')
        .setIcon('right', 'icon-arrow-right')
        .onClick(function() {
            alert('Next');
        }
    );

    var btnFetch = new E.Button('sa-btnFetch', 'Fetch');
    btnFetch.setIcon('left', 'icon-calendar').onClick(function() {
        alert('Fetch');
    });

    var btnHtml = new E.Html("weirdLink", "<a href='#'>Testing it</a>");
    
    var tbTop = new E.Toolbar('tbTop');
    tbTop.addElement('left', btnFetch);
    tbTop.addElement('right', btnHtml);
    tbTop.renderTo('#top');

    var tbFooter = new E.Toolbar('tbFooter');
    tbFooter.addElement('left', btnBack);
    tbFooter.addElement('right', btnNext);
    tbFooter.renderTo('#footer');
});
