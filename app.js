let links = document.querySelectorAll(".nav-link");
links.forEach((item) => {
  item.addEventListener("click", () => {
    var scroll = document.getElementById(item.getAttribute("data-link"));
    scroll.scrollIntoView({ behavior: "smooth", block: "end" });
  });
});

let slideIndex = [1, 1];
displayImage(1, 0);

function changeSclides(n, no) {
  displayImage((slideIndex[no] += n), no);
}

function displayImage(n, no) {
  let imageList = document.getElementsByClassName("slide");
  if (n > imageList.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = imageList.length;
  }
  for (let i = 0; i < imageList.length; i++) {
    imageList[i].style.display = "none";
  }
  imageList[slideIndex[no] - 1].style.display = "block";
}
