var cloudName = "dacwtore8"; // replace with your own cloud name
var uploadPreset = "xkitthvf"; // replace with your own upload preset
var title;
var category;

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      title = result.info.url;
      document.getElementById("uploadedimage").setAttribute("src", result.info.url);
      
    }
  }
);

var uploadPost = async (event) => {
  if (title) {
    const selectElement = document.getElementById("selectedCategory");
    category = selectElement.options[selectElement.selectedIndex].value;
    const post_text = "Hello World";
    const response = await fetch('/api/petpic/', {
      method: 'POST',
      body: JSON.stringify({ title, category, post_text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // reload the page to generate the content shown for the user after logging in
      console.log(response);
      document.location.replace('/dashboard');
    } else {
      document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
      document.querySelector('.custom-login-modal').classList.remove("hidden");
    }
  }
};

document.getElementById("test_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

const closeModal = (event) => {
  document.querySelector('.custom-login-modal').classList.add("hidden");
};

document.getElementById("create-new-post").addEventListener("click",uploadPost);
document.getElementById('dismiss-modal').addEventListener('click', closeModal);
