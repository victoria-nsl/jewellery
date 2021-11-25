const page = document.body;
const menu = document.querySelector('.page-header');
const navigationToggle = menu.querySelector('.page-header__toggle');

const itemsAccordionFaq = document.querySelectorAll('.faq__item');
const triggersFaq = document.querySelectorAll('.faq__button');

const slider = document.querySelector('.swiper-conteiner');

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
const toggleContentVisibility = (item) => {
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
      toggleContentVisibility(itemAccordionCurrent);
    });
  });
}

/*================СЛАЙДЕР==========================================*/
new Swiper (slider, {
  spaceBetween: 30,
  simulateTouch: false,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  },

  breakpoints: {
    '1024': {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },

    '768': {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    '0': {
      slidesPerView: 2,
      slidesPerGroup: 2,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return `<span class="${ currentClass  }"></span>`
           + 'of' +
          `<span class="${ totalClass  }"></span>`;
        },
      },
    },
  },
});
