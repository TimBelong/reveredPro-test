import './styles/style.sass'


window.addEventListener('DOMContentLoaded', function () {
    // mobile menu

    let buregerBtn = document.querySelector('.burger__menu'),
        mobileMenu = document.querySelector('.header__nav');

    buregerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('_active');
        buregerBtn.classList.toggle('_active');
    })

    // Функция активации элементов с классом ".price-item" с постепенным добавлением класса "active".

    let priceItems = document.querySelectorAll(".price-item");
    priceItems.forEach(function (item, index) {
        setTimeout(function () {
            item.classList.add("active");
        }, index * 500);
    });

    // Функционал конвертирования цен

    let currencyIcons = document.querySelectorAll('.currency');
    let amountElements = document.querySelectorAll('.amount');

    let currency = 'dollar';

    let originalAmounts = Array.from(amountElements).map(function (amountElement) {
        return parseFloat(amountElement.textContent);
    });

    let originalAmountsDividedBy30 = originalAmounts.map(function (amount) {
        return amount / 30;
    });

    currencyIcons.forEach(function (currencyIcon) {
        currencyIcon.addEventListener('click', function () {
            if (currency === 'dollar') {
                currency = 'ruble';
                updateAmounts(89.82, 0);
            } else if (currency === 'ruble') {
                currency = 'euro';
                updateAmounts(1 / 96.56, 0);
            } else if (currency === 'euro') {
                currency = 'dollar';
                if (isDayMode) {
                    updateAmounts(0, 0, true, originalAmountsDividedBy30);
                } else {
                    updateAmounts(0, 0, true);
                }
            }

            updateCurrencyIcons();
        });
    });

    function updateAmounts(conversionRate, decimalPlaces, isRestoreOriginal, customOriginalAmounts) {
        amountElements.forEach(function (amountElement, i) {
            if (isRestoreOriginal) {
                if (customOriginalAmounts) {
                    amountElement.textContent = customOriginalAmounts[i].toFixed(decimalPlaces);
                } else {
                    amountElement.textContent = originalAmounts[i].toFixed(decimalPlaces);
                }
            } else {
                let currentAmount = parseFloat(amountElement.textContent);
                amountElement.textContent = (currentAmount * conversionRate).toFixed(decimalPlaces);
            }
        });
    }

    function updateCurrencyIcons() {
        let newCurrencyIcon;
        if (currency === 'dollar') {
            newCurrencyIcon = '$';
        } else if (currency === 'ruble') {
            newCurrencyIcon = '₽';
        } else if (currency === 'euro') {
            newCurrencyIcon = '€';
        }

        currencyIcons.forEach(function (currencyIcon) {
            currencyIcon.textContent = newCurrencyIcon;
        });
    }

    updateCurrencyIcons();

    // Логика перевода цен день/месяц

    let periodElements = document.querySelectorAll('.period');
    let isDayMode = false;

    periodElements.forEach(function (periodElement, index) {
        periodElement.addEventListener('click', function () {
            if (isDayMode) {
                periodElements.forEach(function (element) {
                    element.textContent = 'Month';
                });

                amountElements.forEach(function (amountElement) {
                    let currentAmount = parseFloat(amountElement.textContent.replace(',', '.'));
                    if (!isNaN(currentAmount)) {
                        amountElement.textContent = (currentAmount * 30).toFixed(0);
                    }
                });

            } else {
                periodElements.forEach(function (element) {
                    element.textContent = '/Day';
                });

                amountElements.forEach(function (amountElement) {
                    let currentAmount = parseFloat(amountElement.textContent.replace(',', '.'));
                    if (!isNaN(currentAmount)) {
                        amountElement.textContent = (currentAmount / 30).toFixed(2);
                    }
                });
            }

            isDayMode = !isDayMode;
        });
    });
});