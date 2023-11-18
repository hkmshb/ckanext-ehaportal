$(document).ready(function() {
  bindHomePage();
});

function bindHomePage() {
  const masthead = $('#home-masthead');
  if (!masthead) return;

  const trackScrolling = () => {
    const isCollapsed = masthead.hasClass('collapsed');
    const mastRectTop = masthead.get(0).getBoundingClientRect().top;

    if (!isCollapsed && mastRectTop <= -10) {
      masthead.addClass('collapsed');
    } else if (isCollapsed && mastRectTop > -1) {
      masthead.removeClass('collapsed');
    }
  };

  $('#header-scroll-down').on('click', function() {
    const isCollapsed = masthead.hasClass('collapsed');
    const toggle = isCollapsed ? masthead.removeClass : masthead.addClass;
    
    window.scrollTo({top: isCollapsed ? 0 : 100, left: 0, behavior: 'smooth'});
    toggle('collapsed');
  });

  document.addEventListener('scroll', trackScrolling);
}
