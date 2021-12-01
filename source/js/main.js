(function () {
  const KEY_ESC = 27;
  const KEYCODE_TAB = 9;

  const page = document.body;
  const menu = document.querySelector('.page-header--general');
  const navigationToggle = menu.querySelector('.page-header__toggle');

  const itemsAccordionFaq = document.querySelectorAll('.faq__item');
  const triggersFaq = document.querySelectorAll('.faq__button');

  const itemsAccordionFilter = document.querySelectorAll('.catalog-filter__fieldset');
  const triggersFilter = document.querySelectorAll('.catalog-filter__button--legend');

  const slider = document.querySelector('.swiper-conteiner');

  const formFooter = document.querySelector('.page-footer__form');
  const inputEmailFooter = formFooter.querySelector('#email');

  const linkLogin = document.querySelector('.page-header__link-navigation-user--login');

  const overlayPopupLogin = document.querySelector('.modal--login');
  const buttonPopupLoginClose = overlayPopupLogin.querySelector('.modal__toggle--login');

  const formPopupLogin = overlayPopupLogin.querySelector('.modal__form--login');
  const inputEmailPopupLogin = formPopupLogin.querySelector('#email-modal');
  const inputPasswordPopupLogin = formPopupLogin.querySelector('#password-modal');
  const linkSignUpPopup = formPopupLogin.querySelector('.login__link-signup');

  const linkFilter = document.querySelector('.catalog-filter__button--filter');

  const overlayPopupFilter = document.querySelector('.modal--filter');
  const buttonPopupFilterClose = document.querySelector('.modal__toggle--filter');

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

  if (itemsAccordionFaq) {
    itemsAccordionFaq.forEach((itemAccordionFaq) => {
      itemAccordionFaq.classList.remove('accordion__item--nojs');
    });

    triggersFaq.forEach((triggerFaq, index) => {
      triggerFaq.addEventListener('click', () => {
        const itemAccordionCurrent = itemsAccordionFaq[index];
        toggleContentVisibility(itemAccordionCurrent);
      });
    });
  }

  if (itemsAccordionFilter) {
    itemsAccordionFilter.forEach((itemAccordionFilter) => {
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

    const setPaginationDefault = (index, className) =>  `<span class='${className}'>${index + 1}</span>`;


    const swiper = new window.Swiper(slider, {
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
        renderBullet: setPaginationDefault,
      },

      breakpoints: {
        '1024': {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },

        '768': {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: setPaginationDefault,
          },
        },

        '0': {
          slidesPerView: 2,
          slidesPerGroup: 2,

          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return `<span class='${currentClass}'></span>`
                + 'of' +
                `<span class='${totalClass}'></span>`;
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

  const getItemLocalStorage = (email) => {
    try {
      storageEmail = localStorage.getItem('email');
    } catch (err) {
      isStorageSupport = false;
    }

    if (storageEmail) {
      email.value = storageEmail || '';
    }
  };

  if (inputEmailFooter) {
    getItemLocalStorage(inputEmailFooter);
  }

  /*================МОДАЛЬНЫЕ ОКНА======================*/
  //Закрытие модальных окон
  const closePopup = (popup) => {
    popup.classList.remove('modal--show');
    page.classList.remove('page-no-scroll');
  };


  if (overlayPopupLogin) {
    overlayPopupLogin.addEventListener('click', (evt) => {
      if (evt.target.matches('.modal--login')) {
        evt.stopPropagation();
        closePopup(overlayPopupLogin);
        formPopupLogin.reset();
      }
    });

    buttonPopupLoginClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      closePopup(overlayPopupLogin);
      formPopupLogin.reset();
    });
  }

  if (overlayPopupFilter) {
    overlayPopupFilter.addEventListener('click', (evt) => {
      if (evt.target.matches('.modal--filter')) {
        evt.stopPropagation();
        closePopup(overlayPopupFilter);
      }
    });

    buttonPopupFilterClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      closePopup(overlayPopupFilter);
    });
  }

  //Обработчик ESC
  const onDocumentEscKeydown = (evt) => {
    if (evt.keyCode === KEY_ESC) {
      evt.preventDefault();
      if (overlayPopupLogin.classList.contains('modal--show')) {
        closePopup(overlayPopupLogin);
        formPopupLogin.reset();
      }
      if (overlayPopupFilter.classList.contains('modal--show')) {
        closePopup(overlayPopupFilter);
      }
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  //открытие модальных окон
  const openPopup = (popup) => {
    popup.classList.add('modal--show');
    page.classList.add('page-no-scroll');
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  if (linkLogin) {
    linkLogin.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (menu.classList.contains('page-header--opened')) {
        closeMenu();
      }
      openPopup(overlayPopupLogin);
      inputEmailPopupLogin.focus();
      getItemLocalStorage(inputEmailPopupLogin);
    });
  }

  if (linkFilter) {
    linkFilter.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(overlayPopupFilter);
    });
  }

  if (linkSignUpPopup) {
    linkSignUpPopup.addEventListener('keydown', (evt) => {
      const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);
      if (!isTabPressed) {
        return;
      }
      if (document.activeElement === linkSignUpPopup) {
        inputEmailPopupLogin.focus();
        evt.preventDefault();
      }
    });
  }

  /*================ОТПРАВКА ФОРМ==============*/
  if (formFooter) {
    formFooter.addEventListener('submit', (evt) => {
      if (!inputEmailFooter.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('email', inputEmailFooter.value);
        }
      }
    });
  }

  if (formPopupLogin) {
    formPopupLogin.addEventListener('submit', (evt) => {
      if (!inputPasswordPopupLogin || !inputEmailPopupLogin.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('email', inputEmailPopupLogin.value);
        }
        getItemLocalStorage(inputEmailFooter);
      }
    });
  }
})();
