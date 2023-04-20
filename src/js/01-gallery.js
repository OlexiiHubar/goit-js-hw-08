// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line
const gallery = document.querySelector(".gallery");

const galleryMarkup = createGalary(galleryItems);

gallery.insertAdjacentHTML("afterbegin", galleryMarkup);

function createGalary(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt = "${description}";
        />
      </a>
    </li>`
  }).join("");
}

const lightbox = new SimpleLightbox('.gallery .gallery__link', {
        captionsData: "alt",
        captionsDelay: 250,
    })


console.log(galleryItems);

