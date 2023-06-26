import { galleryItems } from "./gallery-items.js";
// Change code below this line

// 1. Знаходимо елемент розмітки списку, в який будемо генерувати код.
const gallery = document.querySelector(".gallery");

// 2. Створюємо функцію, що додає код в розмітку.
function createMurkup(arr) {
  // 2.1 На вхідному масиві данних використовуємо метод 'map', щоб отримати новий масив
  return (
    arr.map(({ preview, original, description }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </li>
    `)
    // 2.2 Пертворємо масив на рядок, щоб мати змогу додати згенерований код в HTML
    .join("")
  );
}

// 3. Додаємо згенеровану розмітку в 01-gallery.html
gallery.insertAdjacentHTML("beforeend", createMurkup(galleryItems));

// 4. Додаємо прослуховувач подій на галерею через взаємодію з 'ul'
gallery.addEventListener("click", handlerClick);

// 5. Створюємо функцію обробника подій 'handlerClick'
function handlerClick(evt) {
  // 5.1 Забороняємо поведінку по замовчанню
  evt.preventDefault();

  // 5.2 Якщо клікаємо не по картинці, перериваємо виконання функції
  if (evt.target === evt.currentTarget) {
    return;
  }

  // 5.3 Якщо клікнули покартинці, використовуємо підключену бібліотеку 'basicLightbox' для перегляду повнорозмірного зображення
  const instance = basicLightbox.create(`
        <img 
            src="${evt.target.dataset.source}"
            width="1400" 
            height="900"
        >
    `);

  instance.show();

  // 5.4 Додаємо прослуховування клавіатури тільки тоді, коли модальне вікно відкрите (бо ми оголошуємо підкючення слухача, якщо не спрацювало 5.2, а отже, модальне вікно відкрито)
  document.addEventListener("keydown", handleKeyDownEsc);

  // 6. Створюємо функцію обробника подій 'handleKeyDown' для закриття модального вікна по натисканню клавіші Escape
  function handleKeyDownEsc(evt) {
    if (evt.key === "Escape") {
      // Закриваємо модальне вікно за допомогою методу бібліотеки basicLightbox
      instance.close();

      // Знімаємо прослуховування клавіатури
      document.removeEventListener("keydown", handleKeyDownEsc);
    }
  }
}

