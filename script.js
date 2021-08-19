const form = document.getElementById("message-form");
const addMessage = document.getElementById("add-message");
const list = document.getElementById("list");
const alert = document.getElementById("alert");

document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(window.localStorage.getItem("items"));
  items.forEach((items) => {
    const tr = document.createElement("tr");
    tr.setAttribute('id', `${items.id}`)
    tr.innerHTML = `
        <td class = "td" >${items.id}</td>
        <td class = "td">${items.name}</td>
        <td><button class = "td btn btn-danger">Delete</button></td>
        `;
    list.appendChild(tr);
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (addMessage.value != "") {
    const tr = document.createElement("tr");
    const rand = Math.floor(Math.random() * 1000 + 1);
    tr.setAttribute("id", `${rand}`);
    tr.innerHTML = `
        <td class = "td">${rand}</td>
        <td class = "td">${addMessage.value}</td>
        <td><button class = "td btn btn-danger">Delete</button></td>
        `;
    list.appendChild(tr);
    let items;
    items = window.localStorage.getItem("items")
      ? JSON.parse(window.localStorage.getItem("items"))
      : [];
    items.push({ id: rand, name: addMessage.value });
    window.localStorage.setItem("items", JSON.stringify(items));
    addMessage.value = "";
    alert.classList.add("alert-success");
    alert.innerHTML = "Item Added Successfully !";
    setTimeout(() => {
      alert.classList.remove("alert-success");
      alert.innerHTML = "";
    }, 3000);
  } else {
    alert.classList.add("alert-warning");
    alert.innerHTML = "Please Add Items !";
    setTimeout(() => {
      alert.classList.remove("alert-warning");
      alert.innerHTML = "";
    }, 3000);
  }
});
//Delete

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
      let items = JSON.parse(window.localStorage.getItem('items'));
      const id = event.target.parentElement.parentElement.getAttribute('id');
      items = items.filter( (item) => {
          return item.id != id;
      })
      window.localStorage.setItem('items',JSON.stringify(items));
    event.target.parentElement.parentElement.remove();
  }
});
