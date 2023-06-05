import "./styles.css";

const dogs = ["Malamute", "Dalmatian", "Corgi", "Shiba", "Husky"];

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  document.getElementById("app").innerHTML = "<h1>Dog Breeds</h1>";
  for (let i = 0; i < 5; i++) {
    fetchImage(i);
  }
}

//https://stackoverflow.com/questions/25092849/how-to-append-html-template-inside-a-for-loop-in-javascript
function addElement(sum, src, i) {
  var toAdd = document.createDocumentFragment();
  console.log(src);
  const newDiv = document.createElement("div");
  newDiv.className = "container";
  newDiv.innerHTML =
    '<div class="wiki-item" >  \
      <h1 class="wiki-header">' +
    dogs[i] +
    '</h1> \
    <div class="wiki-content"> \
       <p class="wiki-text"> \
         ' +
    sum +
    ' \
       </p> \
       <div class="img-container"> \
         <img class="wiki-img" src="' +
    src +
    '"> \
       </div> \
       </div> \
    </div>';
  toAdd.appendChild(newDiv);
  document.getElementById("app").appendChild(toAdd);
}

//}

//https://medium.com/geekculture/fetch-image-data-from-api-in-javascript-9a7f5f3048ab
async function fetchImage(i) {
  let Imgsrc = "";
  let src =
    "https://dog.ceo/api/breed/" + dogs[i].toLowerCase() + "/images/random";
  const response = await fetch(src)
    .then((res) => res.json())
    .then((result) => {
      Imgsrc = result.message;
      fetchSummary(Imgsrc, i);
    })
    .catch((err) => console.log(err));
}

async function fetchSummary(img, i) {
  let summary = "";
  let src = "https://en.wikipedia.org/api/rest_v1/page/summary/" + dogs[i];
  const res = await fetch(src)
    .then((res) => res.json())
    .then((result) => {
      summary = result.extract;
      console.log(summary);
    });
  console.log(img);
  addElement(summary, img, i);
}
