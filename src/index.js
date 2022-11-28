const apiKey = "inn8v3EzTTHwbgyrt98w9AJOPPAX4nr0";
const apiUrl =
  "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=&rating=g";
const reloadButton = document.getElementsByClassName("refreshButton");
let productList = document.getElementsByClassName("productList");
let productFocus = document.getElementsByClassName("productFocus");
const image = document.getElementsByClassName("loadingImg");
const bigImage = document.getElementsByClassName("bigImage");
let productIdNr = 0;
let i = 0;
let ranOnce = false;

function run(productAmount) {
  // The main function, calls functions a custom amount of times
  i = 0;
  while (i < productAmount) {
    document.getElementsByClassName("loadingImg")[0].style.display = "block";
    getApi(apiUrl);
    i++;
    if (i >= productAmount) {
      setTimeout(
        () => (
          (document.getElementsByClassName("loadingImg")[0].style.display =
            "none"),
          (ranOnce = false)
        ),
        2000
      );
    }
  }
}

async function getApi(url) {
  // Gets the api and sends requests
  const response = await fetch(url);
  var data = await response.json();
  displayGiphy(data);
  productIdNr++;
}

function displayGiphy(data) {
  // Creates new products and places them in the product list
  const giphyUrl = data.data.images.original.url;
  const image = new Image();
  image.src = giphyUrl;
  image.setAttribute("alt", "Giphy");
  image.setAttribute("class", "giphyImage");
  image.setAttribute("id", productIdNr);
  image.setAttribute("onClick", "showProduct(this)");
  productList[0].appendChild(image);
}

function showProduct(image) {
  // Show selected image
  productFocus[0].style.display = "block";
  document.body.style.overflow = "hidden";

  let imageNr = document.getElementById(image.id);
  let prevNr = imageNr.id - 1;
  let nextNr = parseInt(imageNr.id) + 1;

  if (imageNr.id == 0) {
    // If first image of list selected, hide previous option
    nextNr = 1;
    prevNr = 0;
    document.getElementsByClassName("previousImage")[0].style.visibility =
      "hidden";
    document.getElementsByClassName("nextImage")[0].style.visibility =
      "visible";
  } else if (imageNr.id == productList[0].children.length - 1) {
    // If last image of list selected, hide next option
    nextNr = imageNr.id;
    document.getElementsByClassName("nextImage")[0].style.visibility = "hidden";
    document.getElementsByClassName("previousImage")[0].style.visibility =
      "visible";
  } else {
    // If neither, show both options
    document.getElementsByClassName("previousImage")[0].style.visibility =
      "visible";
    document.getElementsByClassName("nextImage")[0].style.visibility =
      "visible";
  }

  // Give main image the id of selected image
  document.getElementsByClassName("bigImage")[0].src = imageNr.src;
  document.getElementsByClassName("bigImage")[0].id = imageNr.id;

  // Give 'previous image' id of selected image - 1
  let prevImg = document.getElementById(prevNr);
  document.getElementsByClassName("previousImage")[0].src = prevImg.src;
  document.getElementsByClassName("previousImage")[0].id = prevImg.id;

  // Give 'next image' id of selected image + 1
  let nextImg = document.getElementById(nextNr);
  document.getElementsByClassName("nextImage")[0].src = nextImg.src;
  document.getElementsByClassName("nextImage")[0].id = nextImg.id;
}

function hideProduct() {
  // Hide product focus, go back to home page
  productFocus[0].style.display = "none";
  document.body.style.overflow = "visible";
}

function changeImage(image) {
  // Go to previous or next image in the list
  let imageNr = document.getElementById(image.id);
  document.getElementsByClassName("bigImage")[0].src = imageNr.src;
  showProduct(image);
}

function reloadPage() {
  // Reloads the entire page
  window.location.reload();
}

function reloadProductList(productAmount) {
  // Reload the product list with new products
  productList[0].innerHTML = "";
  productIdNr = 0;
  run(productAmount);
}

window.addEventListener("scroll", () => {
  // When page is scrolled all the way down, load more products
  let pageHeight =
    productList[0].scrollHeight +
    document.getElementsByClassName("headerDiv")[0].scrollHeight;
  let pageScrolled = window.innerHeight + window.scrollY;
  if (pageHeight <= pageScrolled && ranOnce == false) {
    run(4);
    ranOnce = true;
  }
});
