// database

const products = {
  lunchbox1: {
    name: "lunchbox1",
    price: 25000,
    amount: 0,
    calory: 200,
    get totalPrice() {
      return this.price * this.amount;
    },
    get totalCalory() {
      return this.calory * this.amount;
    },
  },
  lunchbox2: {
    name: "lunchbox2",
    price: 30000,
    amount: 0,
    calory: 300,
    get totalPrice() {
      return this.price * this.amount;
    },
    get totalCalory() {
      return this.calory * this.amount;
    },
  },
  lunchbox3: {
    name: "lunchbox3",
    price: 40000,
    amount: 0,
    calory: 350,
    get totalPrice() {
      return this.price * this.amount;
    },
    get totalCalory() {
      return this.calory * this.amount;
    },
  },
};

// listener for buttons

const $cardBtns = document.querySelectorAll(".card__btn");
(orderBtn = document.querySelector(".order__btn")),
  (modalCloseBtn = document.querySelector(".modal__close")),
  (modalPayBtn = document.querySelector(".modal__pay")),
  (modal = document.querySelector(".modal")),
  (modalProduct = document.querySelector(".modal__products"));

$cardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".card"),
      product = products[parent.getAttribute("id")],
      cardCount = parent.querySelector(".card__count"),
      cardTotalPrice = parent.querySelector(".card__total-price span"),
      cardCalory = parent.querySelector(".card__calory span");

    if (btn.getAttribute("data-symbol") === "+" && product.amount < 9) {
      ++product.amount;
    } else if (btn.getAttribute("data-symbol") === "-" && product.amount > 0) {
      --product.amount;
    }

    cardCount.innerHTML = product.amount;
    cardTotalPrice.innerHTML = product.totalPrice;
    cardCalory.innerHTML = product.totalCalory;

    let arrayProducts = [],
      totalName = "",
      totalPrice = 0,
      totalCalory = 0;

    orderBtn.addEventListener("click", () => {
      for (const key in products) {
        const product = products[key];
        if (product.amount > 0) {
          arrayProducts.push(product);
        }
      }
      arrayProducts.forEach((element) => {
        totalName += `${element.name} x ${element.amount} <br>`;
        totalPrice += element.totalPrice;
        totalCalory += element.totalCalory;
      });
      modalProduct.innerHTML = `<span>Your order:</span><span>${totalName}</span><span>Calories: ${totalCalory}</span><span>Price: ${totalPrice}</span>`;
    });
  });
});

// Cheque

orderBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 0);
});

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
  setTimeout(() => {
    modal.style.opacity = "0";
  }, 0);
});

modalPayBtn.addEventListener("click", () => {
  location.reload();
});

// View

const view = document.querySelector(".view"),
  viewClose = view.querySelector(".view__close"),
  viewImg = view.querySelector("img");
info = document.querySelectorAll(".card__img");

info.forEach((el) =>
  el.addEventListener("dblclick", (e) => {
    const image = e.target.getAttribute("src");
    viewImg.setAttribute("src", image);
    view.classList.add("active");
  })
);

viewClose.addEventListener("click", () => view.classList.remove("active"));

// Level
const level = document.querySelector(".header__level span");

let time = 100;
const levelFunction = (i = 0) => {
  level.innerHTML = i;
  if (level.innerHTML === "100") {
    return;
  } else if (level.innerHTML === "50") {
    time = 150;
  } else if (level.innerHTML === "75") {
    time = 200;
  } else if (level.innerHTML === "90") {
    time = 300;
  } else if (level.innerHTML === "95") {
    time = 600;
  }
  i++;
  setTimeout(() => {
    levelFunction(i);
  }, time);
};

levelFunction();
