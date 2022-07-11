import calcScroll from "./scroll";

const modals = (state) => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                if (modal.classList.contains('popup_calc_profile')) {
					if (!state.form || !state.width || !state.height) {
						item.removeEventListener();
					}
				}

				if (modal.classList.contains('popup_calc_end')) {
					if (!state.type || !state.profile) {
						item.removeEventListener();
					}
				}

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');
    
           });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let isAnyModalShown = false;
 
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (window.getComputedStyle(item).display !== 'none') {
                    isAnyModalShown = true;
                }
            });
 
            if (!isAnyModalShown) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                scroll = calcScroll();
            }
        }, time);
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design','.popup-design','.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation','.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true );
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;