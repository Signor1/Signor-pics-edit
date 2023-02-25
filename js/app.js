//Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

//DOM selections
const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  saveImgBtn = document.querySelector(".save-img"),
  chooseBtn = document.querySelector(".choose-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

//applying filter effect to image
const applyFilters = () => {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
};

//load image in the preview box
const loadImage = () => {
  //getting selected image
  let file = fileInput.files[0];
  if (!file) return; //return if not selected
  //previewing the selected img file
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    resetFilterBtn.click();
    document.querySelector(".panelContainer").classList.remove("disable");
  });
};

//filter options
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding eventlistener to filter btns
    document.querySelector(".filter .active").classList.remove("active"); //removing active class
    option.classList.add("active"); //adding active class to the clicked btn
    filterName.innerText = option.innerText;

    switch (option.id) {
      case "brightness":
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
        break;
      case "saturation":
        filterSlider.max = "200";
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
        break;

      case "inversion":
        filterSlider.max = "100";
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
        break;

      case "grayscale":
        filterSlider.max = "100";
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
        break;

      default:
        break;
    }
  });
});

//rotate buttons
rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding eventlistener to rotate btns
    switch (option.id) {
      case "left":
        rotate -= 90; //rotate by -90
        break;
      case "right":
        rotate += 90; // rotate by 90
        break;
      case "horizontal":
        flipHorizontal = flipHorizontal === 1 ? -1 : 1; // toggle flip on x-axis
        break;
      case "vertical":
        flipVertical = flipVertical === 1 ? -1 : 1; //toggle flip on y-axis
        break;
      default:
        break;
    }
    applyFilters();
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  //getting active filter button
  const selectedFilter = document.querySelector(".filter .active");

  switch (selectedFilter.id) {
    case "brightness":
      brightness = filterSlider.value;
      break;
    case "saturation":
      saturation = filterSlider.value;
      break;
    case "inversion":
      inversion = filterSlider.value;
      break;
    case "grayscale":
      grayscale = filterSlider.value;
      break;
    default:
      break;
  }

  //calling the filter apply function
  applyFilters();
};

//reset filter function
const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;

  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click(); //setting brightness active after reset
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas"); //creating canvas element
  const ctx = canvas.getContext("2d"); //returning drawing context
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2); //centering the canvas image
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180); //rotating canvas image
  }
  ctx.scale(flipHorizontal, flipVertical); //adding effect to canvas image

  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a"); //creating anchor element
  link.download = "image.jpg"; //adding download attr
  link.href = canvas.toDataURL(); //adding href value as canvas data url
  link.click(); //trigger image download
};

//file event
fileInput.addEventListener("change", loadImage);
//input range eventlistener
filterSlider.addEventListener("input", updateFilter);
//reset filter even listener
resetFilterBtn.addEventListener("click", resetFilter);
//onclick target hidden file input & click
chooseBtn.addEventListener("click", () => fileInput.click());
//save img btn event listener
saveImgBtn.addEventListener("click", saveImage);

//key
// TfpzE9h3cVBVCzmWvaXBJJqH
