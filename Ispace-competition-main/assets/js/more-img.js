document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const addMoreBtn = document.getElementById("addMoreBtn");
    const preview = document.getElementById("preview");
  
    addMoreBtn.addEventListener("click", function () {
      const newFileInput = document.createElement("input");
      newFileInput.type = "file";
      newFileInput.classList= "form-control mt-2";
      newFileInput.accept = "image/*";
      newFileInput.multiple = true;
  
      newFileInput.addEventListener("change", function () {
        previewImages(this.files);
      });
  
      fileInput.parentNode.insertBefore(newFileInput, addMoreBtn);
      newFileInput.click();
    });
  
    fileInput.addEventListener("change", function () {
      previewImages(this.files);
    });
  
    function previewImages(files) {
      preview.innerHTML = "";
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const image = new Image();
          image.src = e.target.result;
          image.classList.add("preview-img");
          preview.appendChild(image);
        };
  
        reader.readAsDataURL(file);
      }
    }
  });
  