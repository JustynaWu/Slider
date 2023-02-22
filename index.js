let i = 0; // Start Point
let images = []; // Images Array

// Image List
images[0] =
  "https://images.unsplash.com/photo-1675295952455-848b18698574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60";
images[1] =
  "https://plus.unsplash.com/premium_photo-1675431318990-710f8adf1e96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=61";
images[2] =
  "https://images.unsplash.com/photo-1675625431865-b49f02d779c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=62";
images[3] =
  "https://images.unsplash.com/photo-1675534496184-40ecb9853869?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=63";

const prevBtn = document.getElementById("btnPrev");
const nextBtn = document.getElementById("btnNext");

// Change Image
const changeImg = () => (document.slide.src = images[i]);

const handlePrevImage = () => {
  i--;
  if (i < 0) {
    i = images.length - 1;
  }
  changeImg();
};

const handleNextImage = () => {
  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  changeImg();
};

prevBtn.addEventListener("click", handlePrevImage);
nextBtn.addEventListener("click", handleNextImage);

// Run function when page loads
window.onload = changeImg();
