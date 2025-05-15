//
let modal = document.querySelector(".modal");
let discard = document.querySelector(".delete-btn");
let newInvoice = document.querySelector(".new-invoice");
let invoiceForm = document.querySelector("#invoice-form");
let submit = document.querySelector(".send-btn");
let list = document.querySelector(".invoice-container");
let invoiceLength = document.querySelector("#invoice-length");
let addNewItem = document.querySelector(".add-item");

newInvoice.addEventListener("click", () => {
  modal.style.display = "block";
});

discard.addEventListener("click", () => {
  modal.style.display = "none";
});

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

console.log(invoices);

invoiceLength.innerHTML = invoices.length;

invoiceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let senderStreet = document.querySelector("#from-street").value;
  let senderCity = document.querySelector("#from-city").value;
  let senderPostCode = document.querySelector("#from-post").value;
  let senderCountry = document.querySelector("#from-country").value;
  let clientName = document.querySelector("#client-name").value;
  let clientEmail = document.querySelector("#client-email").value;
  let clientStreet = document.querySelector("#to-street").value;
  let clientCity = document.querySelector("#to-city").value;
  let clientPost = document.querySelector("#to-post").value;
  let clientCountry = document.querySelector("#to-country").value;

  let dateIssued = document.querySelector("#invoice-date").value;
  let projectDesc = document.querySelector("#project-desc").value;

  let itemName = document.querySelector("#item-name").value;
  let quantity = document.querySelector("#item-qty").value;
  let price = document.querySelector("#item-price").value;

  let total = parseInt(price) * parseInt(quantity);
  let id = Math.floor(Math.random() * 10000 + 1);
  console.log(id);

  const invoice = {
    id,
    status: "Pending",
    senderStreet,
    senderCity,
    senderPostCode,
    senderCountry,
    clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientPost,
    clientCountry,
    dateIssued,
    projectDesc,
    itemName,
    quantity,
    price,
    total,
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));
  generateInvoices(invoices);
  console.log(invoices);

  invoiceForm.reset();
});

const generateInvoices = (invoices) => {
  console.log(invoices);

  const invoiceList = invoices?.map((invoice, index) => {
    let {
      id,
      status,
      senderStreet,
      senderCity,
      senderPostCode,
      senderCountry,
      clientName,
      clientEmail,
      clientStreet,
      clientCity,
      clientPost,
      clientCountry,
      dateIssued,
      projectDesc,
      itemName,
      quantity,
      price,
      total,
    } = invoice;

    const statusClass =
      invoice.status === "Paid"
        ? "paid"
        : invoice.status === "Pending"
        ? "pending"
        : "draft";

    return `
    <a class="invoice-link" href="invoice-details.html?id=${id}">
      <div class="invoice">
      <div class="invoice-left">
                <div class="invoice-id">
                  <span>#</span>
                  <h4>${id}</h4>
                </div>
                <div class="due-date"><p>Due ${dateIssued}</p></div>
                <div class="order-name"><p>${clientName}</p></div>
              </div>
              <div class="invoice-right">
                <div class="invoice-amount"><h4>$ ${total}</h4></div>
                <div class="invoice-status ${statusClass}">
                  <p class="dot"><i class="ri-circle-fill"></i></p>
                  <p>${status || "Pending"}</p>
                </div>
              </div>
              </div>
    </a>
    `;
  });
  list.innerHTML = invoiceList.join("");
};
generateInvoices(invoices);
console.log(invoices);

if (invoices.length === 0) {
  document.querySelector(".no-inv").style.display = "block";
}
