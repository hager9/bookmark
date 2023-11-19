
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addWebsite");
var searchBookmark = document.getElementById("search");
var alertMessage = document.getElementById("alert");
var mainIndex;
var index = 0;
var websitesContainer; //array
checkStorage();

function checkStorage() {
  if (localStorage.getItem("website") == null) {
    websitesContainer = [];
  }
  else {
    websitesContainer = JSON.parse(localStorage.getItem("website"));
    displayWebsites(websitesContainer);
  }
}

addBtn.addEventListener("click", addWebsite);



function addWebsite() {
  if (validateInputs() == true) {
    alertMessage.innerHTML = "";
    if (addBtn.innerHTML == "Update") {
      addBtn.innerHTML = "Submit"
      let bookmark = {
        name: siteName.value,
        url: siteUrl.value,
      }
      websitesContainer.splice(mainIndex, 1, bookmark);
    } else {
      let website = {
        name: siteName.value,
        url: siteUrl.value,
      }
    websitesContainer.push(website);
      
    }
    localStorage.setItem("website", JSON.stringify(websitesContainer));
    displayWebsites(websitesContainer);
    resetForm();
  } else {
    validateInputs();
  }
 
}


function displayWebsites(array) {
  index = i;
  var box = "";
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

function validate(text, pattern) {
  return pattern.test(text);
}
function updateWebsite(indexNumber) {
  mainIndex = indexNumber
  siteName.value = websitesContainer[indexNumber].name;
  siteUrl.value = websitesContainer[indexNumber].url;
  addBtn.innerHTML = "Update"
}


searchBookmark.addEventListener("input", function () {
  var searchedBookmark = [];
  for (let i = 0; i < websitesContainer.length; i++){
    if (websitesContainer[i].name.toLowerCase().includes(searchBookmark.value.toLowerCase())) {
      searchedBookmark.push(websitesContainer[i]);
    }
  }
  displayWebsites(searchedBookmark);
})

function isUrlExist() {
  for (let i = 1; i < websitesContainer.length; i++) {
    if (websitesContainer[i].url.toLowerCase().includes(siteUrl.value.toLowerCase())) {
      return true;
    } else {
      return false; 
    }
  }
}
function validateInputs() {
  if (isUrlExist() == true) {
    return alertMessage.innerHTML = "Website already marked";
  } else if (validate(siteUrl.value, /^https:\/\/.{2,}\..{2,}$/) == false) {
    return alertMessage.innerHTML =  "URL Shoud Start With https://";
  } 
  return true;
}

