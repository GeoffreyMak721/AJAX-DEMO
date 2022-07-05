const form = document.querySelector("form");
const previewArea = document.querySelector(".preview-area");
const search = document.querySelector("#search");

form.addEventListener("submit", handleSearch);
function handleSearch(e) {
  e.preventDefault();
  const searchText = search.value;
  getResult(searchText);
}

// function getResult(searchText) {
//   if (searchText) {
//     const url = `https://api.github.com/users/${searchText}`;
//     const request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.send();
//     request.onload = function () {
//       if (request.status === 200) {
//         const { avatar_url, name } = JSON.parse(request.responseText);
//         previewArea.innerHTML = getPreview(avatar_url, name);
//       } else {
//         previewArea.innerHTML = getError(searchText);
//       }
//     };
//   }
// }
function getResult(searchText) {
  if (searchText) {
    const url = `https://api.github.com/users/${searchText}`;
    fetch(url)
      .then(function (res) {
        if (res.ok) {
          console.log(res.json());
          return res.json();
        }
      })
      .then(function (res) {
        const { avatar_url, name } = res;
        previewArea.innerHTML = getPreview(avatar_url, name);
      })
      .catch(function (error) {
        previewArea.innerHTML = getError(searchText);
      });
    console.log("toto");
  }
}

function getPreview(avatar_url, name) {
  return ` 
  <div class="content">
    <img src="${avatar_url}" alt="${name}" />
    <p>Profil de :${name}</p>
  </div>`;
}

function getError(searchText) {
  return ` 
  <div class="content">
    <p>Aucun résultat trouvé pour "${searchText}"</p>
  </div>`;
}
