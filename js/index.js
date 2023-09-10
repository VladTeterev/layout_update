// Array with images, descriptions, titles
let images = [
  {
    url: "images/image1.jpg",
    title: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don<br>LCD admiral",
    area: "81 m2",
    time: "3.5 months",
  },
  {
    url: "images/image2.jpg",
    title: "Sochi Thieves",
    city: "Sochi<br>Thieves",
    area: "105 m2",
    time: "4 months",
  },
  {
    url: "images/image3.jpg",
    title: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don<br>Patriotic",
    area: "93 m2",
    time: "3 months",
  },
];

// Array for the second slider of the mobile version
let imagesForSecondMobileSlider = [
  { url: "images/firstSlide.png" },
  { url: "images/living_room2.png" },
  { url: "images/living_room3.png" },
];

// Function for show conten of the first section with interval
function showTitleOfPage() {
  const contentOfTitle = document.querySelector(".hero-container");
  const pageTitle = contentOfTitle.querySelector(".title");
  const pageDescription = contentOfTitle.querySelector(".p-text");
  const btnCalculate = contentOfTitle.querySelector(".btn-calculate");
  const btnApplication = contentOfTitle.querySelector(".btn-application");
  setInterval(() => {
    pageTitle.style.opacity = 1;
  }, 1000);
  setInterval(() => {
    pageDescription.style.opacity = 1;
  }, 2000);
  setInterval(() => {
    btnCalculate.style.opacity = 1;
    btnApplication.style.opacity = 1;
  }, 2800);
}

// Active elements of page
function activeElementsOfPage() {
  showTitleOfPage()
  initLaptopSlider();
  initFirstMobileSlider();
  initSecondMobileSlider();
}

// Slider for laptop version
function initLaptopSlider() {
  // Check array width image
  if (!images || !images.length) return;
  // find element
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__navig");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderTitles = document.querySelector(".slider__titles");
  let infoCity = document.querySelector(".info_city");
  let infoArea = document.querySelector(".info_area");
  let infoTime = document.querySelector(".info_time");

  sliderActive();
  initArrows();
  initAutoplay();

  // Slider activation
  function sliderActive() {
    // Add images for slider from array
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;

      // Dots for slider
      let dotsDiv = `<div class="dot_item n${index} ${
        index === 0 ? "dot__active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dotsDiv;

      sliderDots.querySelectorAll(".dot_item").forEach((dot) => {
        dot.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });

      // Titles for image, and ability to swith slide
      let titlesDiv = `<div class="slider__title n${index} ${
        index === 0 ? "title__active" : ""
      }" data-index="${index}">${images[index].title}</div>`;
      sliderTitles.innerHTML += titlesDiv;

      sliderTitles.querySelectorAll(".slider__title").forEach((title) => {
        title.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });

      // description paragraph
      let cityDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].city}</p>`;
      infoCity.innerHTML += cityDiv;

      let areaDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].area}</p>`;
      infoArea.innerHTML += areaDiv;

      let timeDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].time}</p>`;
      infoTime.innerHTML += timeDiv;
    });
  }

  // Switch arrows
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  // Autoplay slider
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, 5000);
  }

  //Changing the state of elements when switching slides
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    sliderDots.querySelector(".dot__active").classList.remove("dot__active");
    sliderDots.querySelector(".n" + num).classList.add("dot__active");
    sliderTitles
      .querySelector(".title__active")
      .classList.remove("title__active");
    sliderTitles.querySelector(".n" + num).classList.add("title__active");
    infoCity.querySelector(".cards__active").classList.remove("cards__active");
    infoCity.querySelector(".n" + num).classList.add("cards__active");
    infoArea.querySelector(".cards__active").classList.remove("cards__active");
    infoArea.querySelector(".n" + num).classList.add("cards__active");
    infoTime.querySelector(".cards__active").classList.remove("cards__active");
    infoTime.querySelector(".n" + num).classList.add("cards__active");
  }
}

// First slider for mobile version
function initFirstMobileSlider() {
  // Check array width image
  if (!images || !images.length) return;

  const sliderWrapp = document.querySelector(".mobile-slider-first");
  const sliderImages = sliderWrapp.querySelector(".mobile-slider-first__img");
  const sliderArrows = sliderWrapp.querySelector(
    ".mobile-slider-first__arrows"
  );
  const sliderDescriptionWrapp = document.querySelector(".mobile__description");
  const infoCity = sliderDescriptionWrapp.querySelector(".info_city");
  const infoArea = sliderDescriptionWrapp.querySelector(".info_area");
  const infoTime = sliderDescriptionWrapp.querySelector(".info_time");

  initImages();
  initArrows();
  initTitles();
  initAutoplay();

  // Create element for image and add
  function initImages() {
    images.forEach((image, index) => {
      let imageElement = document.createElement("div");
      imageElement.className = `image n${index} ${index ? "" : "active"}`;
      imageElement.dataset.index = index;
      imageElement.style.backgroundImage = `url(${image.url})`;
      sliderImages.appendChild(imageElement);
    });
  }

  // Active arrows for slider
  function initArrows() {
    sliderArrows.querySelectorAll(".mobile-slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left-arrow")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initTitles() {
    images.forEach((image, index) => {
      let cityDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].city}</p>`;
      infoCity.innerHTML += cityDiv;

      let areaDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].area}</p>`;
      infoArea.innerHTML += areaDiv;

      let timeDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].time}</p>`;
      infoTime.innerHTML += timeDiv;
    });
  }

  // For slider autoplay
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, 5000);
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    infoCity.querySelector(".cards__active").classList.remove("cards__active");
    infoCity.querySelector(".n" + num).classList.add("cards__active");
    infoArea.querySelector(".cards__active").classList.remove("cards__active");
    infoArea.querySelector(".n" + num).classList.add("cards__active");
    infoTime.querySelector(".cards__active").classList.remove("cards__active");
    infoTime.querySelector(".n" + num).classList.add("cards__active");
  }
}

// Second slider for mobile version
function initSecondMobileSlider() {
  // Check array width image
  if (!imagesForSecondMobileSlider || !imagesForSecondMobileSlider.length)
    return;

  const sliderWrapper = document.querySelector(".mobile-slider-second");
  const sliderImages = sliderWrapper.querySelector(
    ".mobile-slider-second__img"
  );
  const sliderArrows = sliderWrapper.querySelector(
    ".mobile-slider-second__arrows"
  );

  initImages();
  initArrows();
  initAutoplay();

  // Create element for image and add
  function initImages() {
    imagesForSecondMobileSlider.forEach((image, index) => {
      let imageElement = document.createElement("div");
      imageElement.className = `image n${index} ${index ? "" : "active"}`;
      imageElement.dataset.index = index;
      imageElement.style.backgroundImage = `url(${image.url})`;
      sliderImages.appendChild(imageElement);
    });
  }

  // Active arrows for slider
  function initArrows() {
    sliderArrows.querySelectorAll(".mobile-slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left-arrow")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  // For slider autoplay
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, 5000);
  }
  // Change slider images
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
  }
}

chooseCategory();

// Choose and active category of the list
function chooseCategory() {
  const categoriesOfRoom = document.querySelector(".living-room__list");
  categoriesOfRoom.querySelectorAll(".living-room__item").forEach((item) => {
    item.addEventListener("click", () => {
      categoriesOfRoom
        .querySelector(".active-item")
        .classList.remove("active-item");
      item.classList.add("active-item");
    });
  });
}

document.addEventListener("DOMContentLoaded", activeElementsOfPage());
