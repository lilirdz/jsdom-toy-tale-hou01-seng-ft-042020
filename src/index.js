/* DO NOT TOUCH */
let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
/* DO NOT TOUCH */

const url = "http://localhost:3000/toys";
const toyCollection = document.getElementById("toy-collection");

fetch(url)
  .then((res) => res.json())
  .then((toys) => {
    for (const toy of toys) {
      addToList(toy);
    }
  });

function renderToys(toy) {
  const divCard = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const toyLikes = document.createElement("p");
  const btn = document.createElement("button");

  divCard.classList.add("card");
  h2.innerText = toy.name;
  img.src = toy.image;
  img.classList.add("toy-avatar");
  toyLikes.innerText = `${toy.likes} Likes`;
  btn.classList.add("like-btn");
  btn.innerText = "Like <3";

  btn.addEventListener("click", (e) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: ++toy.likes,
      }),
    };
    fetch(`${url}/${toy.id}`, options)
      .then((res) => res.json())
      .then((toy) => {
        toyLikes.textContent = `${toy.likes} Likes`;
      });
  });

  divCard.append(h2, img, toyLikes, btn);

  return divCard;
}

function addToList(toy) {
  const div = renderToys(toy);
  toyCollection.append(div);
}

const form = document.querySelector(".add-toy-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const toyName = form[0].value;
  const toyImg = form[1].value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImg,
      likes: 0,
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((toy) => {
      addToList(toy);
      form.reset();
    });
});
