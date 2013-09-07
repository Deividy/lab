$(function() {
    var tbTop, bFetch, bHistory, bWip, bPrint,
        bTires, bCreateRo, bDone, bUser,
        tbBottom, bBack, bNext, bPark, bNew, bNavBar;


    // btn print (dealSummary)
    bPrint = E.buttonDropdown('btnDealSummary', 'View/Print');
    bPrint.setIcon('left', 'icon-print');
    
    bPrint.add('btnPrintCheckout', 'Checkout', 'icon-print', function () {
        alert('Checkout');
    });
    
    bPrint.add('btnProductGrid', 'Details', 'icon-th-list', function () {
        alert('Detail');
    });

    bPrint.add('btnPrint', 'Summary', 'icon-file-text', function() {
        alert("Summary");
    });
    
    // btnDone
    bDone = E.button('btnDone', 'Done');
    bDone.setClass('btn-success').setIcon('left', 'icon-thumbs-up').onClick(function () {
        alert('Done');
    });
    
    // btn logged in user
    bUser = E.button('loggedInUser', 'user');
    bUser.setIcon('left', 'icon-user').onClick(function() {
        alert('User');
    });

    // btn back
    bBack = E.button('btnBack', 'Back');
    bBack.setIcon('left', 'icon-arrow-left').setClass('btn-info').onClick(function() {
        alert('Back');
    });
    
    // btn next
    bNext = E.button('btnNext', 'Next');
    bNext.setIcon('right', 'icon-arrow-right').setClass('btn-success').onClick(function() {
        alert('Next');
    });
    
    // btn navBar
    bNavBar = E.buttonDropdown('btnNavBar', 'Test');
    bNavBar.setType('dropdown');
    bNavBar.add("Test", "test", "icon-edit");
    bNavBar.add("write", "Write up", "icon-edit");

    tbBottom = E.toolbar('tbFooter');
    tbBottom.setClass('navbar-fixed-bottom');
    tbBottom.addElement('left', bUser);
    tbBottom.addElement('right', E.button("Testis", "Testis"));

    tbBottom.renderTo('#footer')

    tbTop = E.toolbar('tbTop');
    tbTop.setClass('navbar-fixed-top');
    
    tbTop.addElement('left', bBack);
    tbTop.addElement('left', bNavBar);
    
    tbTop.addElement('right', bPrint);
    
    tbTop.addElement('right', bDone);
    tbTop.addElement('right', bNext);
    
    tbTop.renderTo('#top');

});
