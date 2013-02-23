function switchActiveMenuTab(event) {
    var id = event.target.id;
    switchTabWithId(id);
    history.pushState({ path: this.path }, '', '#' + id);
}

function switchTabWithId(id) {
    var menuTabs = tabs;
    $("#" + id).addClass("active");
    $("div." + id).fadeIn();
    for (tab in menuTabs) {
        if (menuTabs[tab] != id) {
            $("#" + menuTabs[tab]).removeClass("active");
            $("div." + menuTabs[tab]).css("display", "none");
        }
    }
}

$(window).bind('popstate', function() {
  var possibleTab = location.href.match(/#(.+)/);
  if(possibleTab) {
      switchTabWithId(possibleTab[1])
  }
});

$(document).ready(function() {
    $(".menu > li").click(switchActiveMenuTab)
});