const page = document.body;
const menu = document.querySelector('.page-header--general');
const navigationToggle =  document.querySelector('.page-header__toggle');

const itemsAccordionFaq = document.querySelectorAll('.faq__item');
const triggersFaq = document.querySelectorAll('.faq__button');

const itemsAccordionFilter = document.querySelectorAll('.catalog-filter__fieldset');
const triggersFilter = document.querySelectorAll('.catalog-filter__button--legend');

const slider = document.querySelector('.swiper-conteiner');

const formFooter = document.querySelector('.page-footer__form');
const inputEmailFooter= document.querySelector('#email');

const linkLogin =  document.querySelector('.page-header__link-navigation-user--login');

const overlayPopupLogin = document.querySelector('.modal--login');
const buttonPopupLoginClose = document.querySelector('.modal__toggle--login');

const formPopupLogin = document.querySelector('.modal__form--login');
const inputEmailPopupLogin= document.querySelector('#email-modal');
const inputPasswordPopupLogin= document.querySelector('#password-modal');

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

//для раздела catalog-filter
if (itemsAccordionFilter) {
  itemsAccordionFilter.forEach ((itemAccordionFilter) => {
    itemAccordionFilter.classList.remove('accordion__item--nojs');
  });

  triggersFilter.forEach((triggerFilter, index) => {
    triggerFilter.addEventListener('click', () => {
      const itemAccordionCurrent = itemsAccordionFilter[index];
      toggleContentVisibility(itemAccordionCurrent);
    });
  });
}

/*================СЛАЙДЕР==========================================*/
if (slider) {
  slider.classList.remove('new__slider--no-js');

  const swiper = new window.Swiper (slider, {
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

  window.addEventListener('resize', () => {
    swiper.pagination.render();
    swiper.pagination.update();
  });
}

/*======ПРОВЕРКА LocalStorage============*/

let isStorageSupport = true;
let storageEmail = '';

const setItemLocalStorage = (email) => {
  try {
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageEmail) {
    email.value = storageEmail || '' ;
  }
};

if (inputEmailFooter) {
  setItemLocalStorage(inputEmailFooter);
}

/*================МОДАЛЬНЫЕ ОКНА======================*/

//ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
const closePopup = () => {
  if (overlayPopupLogin.classList.contains('modal--show')) {
    overlayPopupLogin.classList.remove('modal--show');
  }

  setItemLocalStorage (inputEmailPopupLogin);
  page.classList.remove('page-no-scroll');
};

const onOverlayClick = (evt) => {
  if (evt.target.matches('.modal--login')) { //останавливает погружение
    evt.stopPropagation(); //останавливает всплытие
    closePopup();
  }
};

const onButtonCloseClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

if (overlayPopupLogin) {
  overlayPopupLogin.addEventListener('click', onOverlayClick);
  buttonPopupLoginClose.addEventListener('click', onButtonCloseClick);
}

//ОТКРЫТИЕ ФОРМЫ LOGIN
//Обработчик ESC
const onDocumentEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

const openPopupLogin = () => {
  if(menu.classList.contains('page-header--opened')) {
    closeMenu();
  }
  overlayPopupLogin.classList.add('modal--show');
  page.classList.add('page-no-scroll');
  setItemLocalStorage (inputEmailPopupLogin);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

if (linkLogin) {
  linkLogin.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopupLogin();
  });
}

/*=========ОТПРАВКА ФОРМ==============*/
if (formFooter) {
  formFooter.addEventListener('submit', (evt)  => {
    if (!inputEmailFooter.value) {
      evt.preventDefault();
    } else {
      if(isStorageSupport) {
        localStorage.setItem('email', inputEmailFooter.value);
      }
    }
  });
}

if (formPopupLogin) {
  formPopupLogin.addEventListener('submit', (evt)  => {
    if (!inputPasswordPopupLogin|| !inputEmailPopupLogin.value) {
      evt.preventDefault();
    } else {
      if(isStorageSupport) {
        localStorage.setItem('email', inputEmailPopupLogin.value);
      }
    }
  });
}
