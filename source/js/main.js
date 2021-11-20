const page = document.body;
const menu = document.querySelector('.page-header');
const navigationToggle = menu.querySelector('.page-header__toggle');

/*======ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ ============*/
if (menu) {

  menu.classList.remove('page-header--nojs');

  const closeMenu = () => {
    menu.classList.add('page-header--closed');
    menu.classList.remove('page-header--opened');
    page.classList.remove('page-no-scroll');
  };

  const openMenu = () => {
    menu.classList.remove('page-header--closed');
    menu.classList.add('page-header--opened');
    page.classList.add('page-no-scroll');
  };

  navigationToggle.addEventListener('click', () => {
    if (menu.classList.contains('page-header--closed')) {
      openMenu();
      return;
    }
    closeMenu();
  });
}
