const searchBox = document.getElementById('search-box');
const overlay = document.getElementById('overlay');

searchBox.addEventListener('focus', function () {
    overlay.classList.add('active');
    searchBox.style.zIndex = "3";
});

searchBox.addEventListener('blur', function () {
    overlay.classList.remove('active');
    searchBox.style.zIndex = "2";
});

overlay.addEventListener('click', function () {
    searchBox.blur();
});



document.addEventListener('DOMContentLoaded', function () {
    const boxFilter = document.querySelector('.box_filter');

    function toggleBoxFilter() {
        const hasSelectedProject = Array.from(document.querySelectorAll('.dropdown-list input[type="checkbox"]:not([value="all"])'))
            .some(checkbox => checkbox.checked);
        const hasSelectedCategory = Array.from(document.querySelectorAll('.dropdown-list-category input[type="checkbox"]:not([value="all"])'))
            .some(checkbox => checkbox.checked);

        if (hasSelectedProject || hasSelectedCategory) {
            boxFilter.style.display = 'flex';
        } else {
            boxFilter.style.display = 'none';
        }
    }


    function clearFilters() {
        document.querySelectorAll('.dropdown-list input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelector('.down_project input').value = 'همه موضوعات';

        document.querySelectorAll('.dropdown-list-category input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelector('.down_category input').value = 'همه دسته بندی‌ها';

        boxFilter.style.display = 'none';
    }

    boxFilter.addEventListener('click', function () {
        clearFilters();
    });

    function setupProjectSection() {
        const downProject = document.querySelector('.down_project');
        const arrowIcon = document.querySelector('.arrow-icon');
        const dropdownList = document.querySelector('.dropdown-list');
        const searchBoxProject = document.querySelector('.down_project input');
        const allTopicsCheckbox = dropdownList.querySelector('input[type="checkbox"][value="all"]');
        const otherCheckboxes = dropdownList.querySelectorAll('input[type="checkbox"]:not([value="all"])');

        arrowIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            downProject.classList.toggle('active');
        });

        dropdownList.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function (e) {
            if (!downProject.contains(e.target)) {
                downProject.classList.remove('active');
            }
        });

        function updateSearchBoxText() {
            const selectedItems = Array.from(otherCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.parentElement.textContent.trim());

            if (allTopicsCheckbox.checked) {
                searchBoxProject.value = 'همه موضوعات';
            } else if (selectedItems.length > 0) {
                searchBoxProject.value = selectedItems.join('، ');
            } else {
                searchBoxProject.value = '';
            }

            toggleBoxFilter();
        }

        allTopicsCheckbox.addEventListener('change', function () {
            if (this.checked) {
                otherCheckboxes.forEach(function (checkbox) {
                    checkbox.checked = false;
                });
            }
            updateSearchBoxText();
        });

        otherCheckboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    allTopicsCheckbox.checked = false;
                }
                updateSearchBoxText();
            });
        });
    }

    function setupCategorySection() {
        const downCategory = document.querySelector('.down_category');
        const arrowIconCategory = document.querySelector('.arrow-icon-category');
        const dropdownListCategory = document.querySelector('.dropdown-list-category');
        const searchBoxCategory = document.querySelector('#search-box-category');

        arrowIconCategory.addEventListener('click', function (e) {
            e.stopPropagation();
            downCategory.classList.toggle('active1');
        });

        dropdownListCategory.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function (e) {
            if (!downCategory.contains(e.target)) {
                downCategory.classList.remove('active1');
            }
        });

        function updateSearchBoxTextCategory() {
            const selectedItems = Array.from(dropdownListCategory.querySelectorAll('input[type="checkbox"]:not([value="all"])'))
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.parentElement.textContent.trim());

            if (dropdownListCategory.querySelector('input[type="checkbox"][value="all"]').checked) {
                searchBoxCategory.value = 'همه دسته بندی‌ها';
            } else if (selectedItems.length > 0) {
                searchBoxCategory.value = selectedItems.join('، ');
            } else {
                searchBoxCategory.value = '';
            }

            toggleBoxFilter();
        }

        dropdownListCategory.querySelector('input[type="checkbox"][value="all"]').addEventListener('change', function () {
            if (this.checked) {
                dropdownListCategory.querySelectorAll('input[type="checkbox"]:not([value="all"])').forEach(function (checkbox) {
                    checkbox.checked = false;
                });
            }
            updateSearchBoxTextCategory();
        });

        dropdownListCategory.querySelectorAll('input[type="checkbox"]:not([value="all"])').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    dropdownListCategory.querySelector('input[type="checkbox"][value="all"]').checked = false;
                }
                updateSearchBoxTextCategory();
            });
        });
    }

    setupProjectSection();
    setupCategorySection();
});



const allBooks = [
    { id: 1, title: "محکم در آغوشم بگیر", writer: "سمانه پرهیزکاری", time: "29 دقیقه", star: 4.5, category: "رشد فردی", pic: ["01.jpg"] },
    { id: 2, title: "با تو شروع نشده", writer: "مارک ولن", time: "70 دقیقه", star: 3.1, category: "مهارت های اجتماعی", pic: ["02.jpg"] },
    { id: 3, title: "بدن فراموش نمی کند", writer: "بسل ون درکولک", time: "15 دقیقه", star: 5, category: "رهبری", pic: ["03.jpg"] },
    { id: 4, title: "365 روز بدون تو", writer: "بسل ون درکولک", time: "80 دقیقه", star: 4.4, category: "روانشناسی", pic: ["04.jpg"] },

    { id: 5, title: "انجمن شاعران مرده", writer: " ان.اچ.کلاین بام", time: "22 دقیقه", star: 4.5, category: "رشد فردی", pic: ["15.jpg"] },
    { id: 6, title: "وقتی نیچه گریست", writer: "آروین د. یالوم", time: "80 دقیقه", star: 3.1, category: "مهارت های اجتماعی", pic: ["06.jpg"] },
    { id: 7, title: "شب های روشن", writer: "فیودور داستایفسکی", time: "85 دقیقه", star: 5, category: "روانشناسی", pic: ["07.jpg"] },
    { id: 8, title: "هردو در نهایت می میرند", writer: "آدام سیلورا", time: "54 دقیقه", star: 4.4, category: "کسب و کار", pic: ["08.jpg"] },

    { id: 9, title: "سمفونی مردگان", writer: "عباس معروفی", time: "39 دقیقه", star: 4.5, category: "رشد فردی", pic: ["09.jpg"] },
    { id: 10, title: "بازی های میراث", writer: "جنیفر لین بارنز", time: "70 دقیقه", star: 3.1, category: "مدیریت", pic: ["10.jpg"] },
    { id: 11, title: "یاد او", writer: "کالین هوور", time: "15 دقیقه", star: 5, category: "روابط عاطفی و خانواده", pic: ["11.jpg"] },
    { id: 12, title: "بیگانه", writer: "آلبر کامو", time: "80 دقیقه", star: 4.4, category: "روانشناسی", pic: ["12.jpg"] },

    { id: 13, title: "انسان در جستجوی معنا", writer: "انه پرهیزکاری", time: "29 دقیقه", star: 4.5, category: "رشد فردی", pic: ["20.jpg"] },
    { id: 14, title: "النور و پارک", writer: "ریتبو راول", time: "70 دقیقه", star: 3.1, category: "مهارت های اجتماعی", pic: ["26.jpg"] },
    { id: 15, title: "چراغ ها را من خاموش می کنم", writer: "زویا پیرزاد", time: "15 دقیقه", star: 5, category: "روانشناسی", pic: ["25.jpg"] },
    { id: 16, title: "صد سال تنهایی", writer: "گابریل گارسیا", time: "80 دقیقه", star: 4.4, category: "اعتماد بنفس", pic: ["23.jpg"] },

    { id: 17, title: "عقل و احساس", writer: "جین آستین", time: "29 دقیقه", star: 4.5, category: "رشد فردی", pic: ["22.jpg"] },
    { id: 18, title: "چگونه با هر کسی صحبت کنیم؟", writer: "مهدی قراچه", time: "70 دقیقه", star: 3.1, category: "مهارت های اجتماعی", pic: ["21.jpg"] },
    { id: 19, title: "قصر آبی", writer: "جین آستین", time: "15 دقیقه", star: 5, category: "روابط عاطفی و خانواده", pic: ["16.jpg"] },
    { id: 20, title: "افسانه عادی بودن", writer: "گبور مته", time: "80 دقیقه", star: 4.4, category: "توسعه مهارت های فردی", pic: ["19.jpg"] },
];

function fillWithBooks(filteredBooks) {
    const container = document.getElementById("bookContainer");
    container.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("books_items");

        bookItem.innerHTML = `
                <img src="img/${book.pic[0]}" alt="${book.title}">
                <h3>${book.title}</h3>
                <h4>${book.writer}</h4>
                <div class="detail">
                    <div class="min">
                        <img src="images/min.png" alt="زمان">
                        <p class="time">${book.time}</p>
                    </div>
                    <div class="star">
                        <img src="images/star.png" alt="رتبه">
                        <p>${book.star}</p>
                    </div>
                </div>
                <div class="cart_buy">
                    <img src="images/save.png">
                    <p>افزودن به کتابخانه</p>
                </div>
            `;
        container.appendChild(bookItem);
    });
}


fillWithBooks(allBooks);

document.getElementById("filter_high_rated").addEventListener("click", function () {
    const highRatedBooks = allBooks.filter(book => book.star >= 4);
    fillWithBooks(highRatedBooks);
});

document.getElementById("filter_all_books").addEventListener("click", function () {
    fillWithBooks(allBooks);
});

document.getElementById("filter_popular").addEventListener("click", function () {
    const populardBooks = allBooks.filter(book => book.star >= 4.5);
    fillWithBooks(populardBooks);
});

document.getElementById("filter_short").addEventListener("click", function () {
    const shortBooks = allBooks.filter(book => {
        const timeInMinutes = parseInt(book.time.split(" ")[0], 10);

        return timeInMinutes <= 30;
    });

    fillWithBooks(shortBooks);
});


document.getElementById("filter_long").addEventListener("click", function () {
    const longBooks = allBooks.filter(book => {
        const timeInMinutes = parseInt(book.time.split(" ")[0], 10);

        return timeInMinutes > 60;
    });

    fillWithBooks(longBooks);
});



document.getElementById("search-box").addEventListener("input", function () {
    const searchValue = this.value.trim().toLowerCase();
    if (searchValue === "") {
        fillWithBooks(allBooks);
    } else {
        const filteredBooks = allBooks.filter(book =>
            book.title.toLowerCase().includes(searchValue) ||
            book.writer.toLowerCase().includes(searchValue)
        );
        fillWithBooks(filteredBooks);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const categoryCheckboxes = document.querySelectorAll('.dropdown-list-category input[type="checkbox"]');
    const projectCheckboxes = document.querySelectorAll('.dropdown-list input[type="checkbox"]');

    function filterBooks() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.value !== 'all')
            .map(checkbox => checkbox.value);

        const selectedProjects = Array.from(projectCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.value !== 'all')
            .map(checkbox => checkbox.value);

        const filteredBooks = allBooks.filter(book => {
            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(book.category);
            const isProjectMatch = selectedProjects.length === 0 || selectedProjects.includes(book.category);
            return isCategoryMatch && isProjectMatch;
        });

        fillWithBooks(filteredBooks);
    }

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterBooks);
    });

    projectCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterBooks);
    });

    filterBooks();

});


document.addEventListener('DOMContentLoaded', function () {
    const boxFilter = document.querySelector('.box_filter');
    const categoryCheckboxes = document.querySelectorAll('.dropdown-list-category input[type="checkbox"]');
    const projectCheckboxes = document.querySelectorAll('.dropdown-list input[type="checkbox"]');

    function filterBooks() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.value !== 'all')
            .map(checkbox => checkbox.value);

        const selectedProjects = Array.from(projectCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.value !== 'all')
            .map(checkbox => checkbox.value);

        const filteredBooks = allBooks.filter(book => {
            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(book.category);
            const isProjectMatch = selectedProjects.length === 0 || selectedProjects.some(project => book.category === project);

            return isCategoryMatch && isProjectMatch;
        });

        fillWithBooks(filteredBooks);
    }

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterBooks);
    });

    projectCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterBooks);
    });

    filterBooks();

    function clearFilters() {
        document.querySelectorAll('.dropdown-list input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelector('.down_project input').value = 'همه موضوعات';
        document.querySelector('.down_category input').value = 'همه دسته بندی‌ها';
        boxFilter.style.display = 'none';
        fillWithBooks(allBooks);
    }

    boxFilter.addEventListener('click', function () {
        clearFilters();
    });

    document.querySelector('.dropdown-list input[value="all"]').addEventListener('change', function () {
        if (this.checked) {
            categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
            fillWithBooks(allBooks);
        }
    });

    document.querySelector('.dropdown-list-category input[value="all"]').addEventListener('change', function () {
        if (this.checked) {
            projectCheckboxes.forEach(checkbox => checkbox.checked = false);
            fillWithBooks(allBooks);
        }
    });

    fillWithBooks(allBooks);
});


function showPageTwoWithLoading(book) {
    const loading = document.getElementById('loading');
    loading.style.display = 'flex';

    setTimeout(() => {
        loading.style.display = 'none';

        document.getElementById('page_one').style.display = 'none';
        const pageTwo = document.getElementById('page_two');
        pageTwo.style.display = 'block';

        pageTwo.querySelector('.text_about_book h1').textContent = book.title;
        pageTwo.querySelector('.text_about_book h3').textContent = `نویسنده: ${book.writer}`;
        pageTwo.querySelector('.text_about_book h4').textContent = `مدت زمان: ${book.time}`;
        pageTwo.querySelector('.img_of_one_book img').src = `img/${book.pic[0]}`;
    }, 2000); 
}

document.getElementById('back').addEventListener('click', function () {
    document.getElementById('page_two').style.display = 'none';
    document.getElementById('page_one').style.display = 'block';
});

function fillWithBooks(filteredBooks) {
    const container = document.getElementById("bookContainer");
    container.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("books_items");

        bookItem.innerHTML = `
            <img src="img/${book.pic[0]}" alt="${book.title}" class="book-image">
            <h3>${book.title}</h3>
            <h4>${book.writer}</h4>
            <div class="detail">
                <div class="min">
                    <img src="images/min.png" alt="زمان">
                    <p class="time">${book.time}</p>
                </div>
                <div class="star">
                    <img src="images/star.png" alt="رتبه">
                    <p>${book.star}</p>
                </div>
            </div>
            <div class="cart_buy">
                <img src="images/save.png">
                <p>افزودن به کتابخانه</p>
            </div>
        `;

        const bookImage = bookItem.querySelector('.book-image');
        bookImage.addEventListener('click', function () {
            showPageTwoWithLoading(book); 
        });

        const addToCartButton = bookItem.querySelector('.cart_buy');
        addToCartButton.addEventListener('click', function () {
            addToCart(book); 
        });

        container.appendChild(bookItem);
    });
}

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(book) {
    const existingItem = cartItems.find(item => item.title === book.title);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...book, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartQuantity();
    updateCartList();
}

function updateCartQuantity() {
    const cartQuantity = document.querySelector(".quantity");
    cartQuantity.innerText = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartList() {
    const listCart = document.querySelector(".list_book");
    listCart.innerHTML = '';

    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="book-title">${item.title}</div>
            <div class="book-quantity">تعداد: ${item.quantity}</div>
            <div class="removeFromCart" data-title="${item.title}"></div>
        `;
        listCart.appendChild(li);
    });

    attachRemoveFromCartListeners();
}

function attachRemoveFromCartListeners() {
    const removeButtons = document.querySelectorAll(".removeFromCart");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const bookTitle = button.getAttribute("data-title");
            removeFromCart(bookTitle);
        });
    });
}

function removeFromCart(bookTitle) {
    const item = cartItems.find(item => item.title === bookTitle);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cartItems = cartItems.filter(item => item.title !== bookTitle);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartList();
    updateCartQuantity();
}

const buyButton = document.querySelector(".buy");
const shoppingCart = document.querySelector(".shopping");
const closeCart = document.querySelector(".close");

buyButton.addEventListener("click", function () {
    shoppingCart.classList.toggle("show");
    updateCartList();
});

closeCart.addEventListener("click", function () {
    shoppingCart.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", function () {
    fillWithBooks(allBooks); 
    updateCartList(); 
    updateCartQuantity(); 
});
