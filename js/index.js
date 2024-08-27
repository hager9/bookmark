
const siteName = document.getElementById("siteName");
const siteUrl = document.getElementById("siteUrl");
const addBtn = document.getElementById("addWebsite");
const searchBookmark = document.getElementById("search");
const alertMessage = document.getElementById("alert");
let mainIndex;
let index = 0;
let websitesContainer;

checkStorage();



function checkStorage() {
  websitesContainer = JSON.parse(localStorage.getItem("website")) || [];
  displayWebsites(websitesContainer);
}


addBtn.addEventListener("click", addWebsite);



function addWebsite() {

  if (validateInputs()) {
    alertMessage.innerHTML = "";

    let website = {
      name: siteName.value.trim(),
      url: siteUrl.value.trim(),
    }

    if (addBtn.innerHTML == "Update") {
      addBtn.innerHTML = "Submit";
      websitesContainer.splice(mainIndex, 1, website);
    } else {
      
    websitesContainer.push(website);
      
    }
    localStorage.setItem("website", JSON.stringify(websitesContainer));
    displayWebsites(websitesContainer);
    resetForm();
  }
}


function displayWebsites(array) {
  index = i;
  let box = "";
  for (var i = 0; i < array.length; i++) {
    box += ` <tr>
                <td>${i + 1}</td>
                <td>${array[i].name}</td>
                <td><a href="${array[i].url}" target="_blank" ><button id="visitWebsite" onclick="visitWebsite(${i})" class="btn px-4 py-2 text-white fw-bold"><i class="fa-solid fa-eye me-1"></i> Visit</button></a></td>
                <td><button id="deleteWebsite" onclick="deleteWebsite(${i})" class="btn px-4 py-2 text-white fw-bold"><i class="fa-solid fa-trash-can me-1"></i> Delete</button></td>
                <td><button id="updateWebsite" onclick="updateWebsite(${i})" class="btn px-4 py-2 text-white fw-bold"><i class="fa-solid fa-pen-to-square me-1"></i> Update</button></td>
            </tr>`;
  }
  document.getElementById("tBody").innerHTML = box;
}

function resetForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteWebsite(indexNumber) {
  websitesContainer.splice(indexNumber, 1);
  localStorage.setItem("website", JSON.stringify(websitesContainer));
  displayWebsites(websitesContainer);
}


function updateWebsite(indexNumber) {
  mainIndex = indexNumber;
  siteName.value = websitesContainer[indexNumber].name;
  siteUrl.value = websitesContainer[indexNumber].url;
  addBtn.innerHTML = "Update";
}


searchBookmark.addEventListener("input", function () {
  const searchValue = searchBookmark.value.toLowerCase();
  const filteredWebsites = websitesContainer.filter(website => 
    website.name.toLowerCase().includes(searchValue) || 
    website.url.toLowerCase().includes(searchValue)
  );
  displayWebsites(filteredWebsites);
})


function validateInputs() {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const isValidUrl = urlRegex.test(siteUrl.value);
  const isEmpty = !siteName.value.trim() || !siteUrl.value.trim();

  if (isEmpty) {
    alertMessage.textContent = 'Please fill both fields';
    return false;
  }


  if (!isValidUrl) {
    alertMessage.textContent = 'Invalid URL. Please start with http:// or https://';
    return false;
  }


  if (addBtn.innerHTML === "Submit") {
    const existingWebsite = websitesContainer.find(website => website.url === siteUrl.value.trim());
    if (existingWebsite) {
      alertMessage.textContent = 'Website already added';
      return false;
    }
  }

  return true;
}

