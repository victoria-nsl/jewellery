const page = document.body;
const menu = document.querySelector('.page-header');
const navigationToggle = menu.querySelector('.page-header__toggle');

const itemsAccordionFaq = document.querySelectorAll('.faq__item');
const triggersFaq = document.querySelectorAll('.faq__button');

/*======ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ ============*/
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

if (menu) {
  menu.classList.remove('page-header--nojs');
  navigationToggle.addEventListener('click', () => {
    if (menu.classList.contains('page-header--closed')) {
      openMenu();
      return;
    }
    closeMenu();
  });
}

/*================АККОРДЕОН==========================================*/
const changeContentDisplay = (item) => {
  if (item.classList.contains('accordion__item--active')) {
    item.classList.remove('accordion__item--active');
    item.classList.add('accordion__item--closed');
    return;
  }
  item.classList.add('accordion__item--active');
  item.classList.remove('accordion__item--closed');
};

//для раздела FAQ
if (itemsAccordionFaq) {
  itemsAccordionFaq.forEach ((itemAccordionFaq) => {
    itemAccordionFaq.classList.remove('accordion__item--nojs');
  });

  triggersFaq.forEach((triggerFaq, index) => {
    triggerFaq.addEventListener('click', () => {
      const itemAccordionCurrent = itemsAccordionFaq[index];
      changeContentDisplay(itemAccordionCurrent);
    });
  });
}
