$(function() {
    var tbTop, bFetch, bHistory, bWip, bPrint,
        bTires, bCreateRo, bDone, bUser,
        tbBottom, bBack, bNext, bPark, bNew, bNavBar;


    // btn print (dealSummary)
    bPrint = E.btnDropdown('btnDealSummary', 'View/Print');
    bPrint.icon('left', 'icon-print');
    
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
    bDone.elClass('btn-success').icon('left', 'icon-thumbs-up').onClick(function () {
        alert('Done');
    });
    
    // btn logged in user
    bUser = E.button('loggedInUser', 'user');
    bUser.icon('left', 'icon-user').onClick(function() {
        alert('User');
    });

    // btn back
    bBack = E.button('btnBack', 'Back');
    bBack.icon('left', 'icon-arrow-left').elClass('btn-info').onClick(function() {
        alert('Back');
    });
    
    // btn next
    bNext = E.button('btnNext', 'Next');
    bNext.icon('right', 'icon-arrow-right').elClass('btn-success').onClick(function() {
        alert('Next');
    });
    
    // btn navBar
    bNavBar = E.btnDropdown('btnNavBar', 'Test');
    bNavBar.type = 'dropdown';
    bNavBar.add("Test", "test", "icon-edit");
    bNavBar.add("write", "Write up", "icon-edit");

    tbBottom = E.toolbar('tbFooter');
    tbBottom.elClass('navbar-fixed-bottom');
    tbBottom.addElement('left', bUser);
    tbBottom.addElement('right', E.button("Testis", "Testis"));

    tbBottom.renderTo('#footer')

    tbTop = E.toolbar('tbTop');
    tbTop.elClass('navbar-fixed-top');
    
    tbTop.addElement('left', bBack);
    tbTop.addElement('left', bNavBar);
    
    tbTop.addElement('right', bPrint);
    
    tbTop.addElement('right', bDone);
    tbTop.addElement('right', bNext);
    
    tbTop.renderTo('#top');
});


