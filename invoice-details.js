//
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(new URLSearchParams(window.location.search).get("id")); // to give each invoice a unique id
console.log("Selected Invoice ID:", id);

let invoiceContent = document.querySelector(".main-details-content");
let innerInvoice = document.querySelector(".inner-invoice");
let deleteInvoice = document.querySelector(".delete-invoice");
let editInvoiceForm = document.querySelector("#edit-invoice-form");
let editInvoice = document.querySelector(".edit-invoice");
let editModal = document.querySelector(".edit-modal");
let cancel = document.querySelector(".cancel-btn");
let markAsPaidBtn = document.querySelector(".mark-as-paid");
let invoiceStatus = document.querySelector(".invoice-status");
let statusResult = document.querySelector(".status-result");

let senderStreetInput = document.querySelector("#edit-from-street");
let senderCityInput = document.querySelector("#edit-from-city");
let senderPostCodeInput = document.querySelector("#edit-from-post");
let senderCountryInput = document.querySelector("#edit-from-country");
let clientNameInput = document.querySelector("#edit-client-name");
let clientEmailInput = document.querySelector("#edit-client-email");
let clientStreetInput = document.querySelector("#edit-to-street");
let clientCityInput = document.querySelector("#edit-to-city");
let clientPostInput = document.querySelector("#edit-to-post");
let clientCountryInput = document.querySelector("#edit-to-country");
let dateIssuedInput = document.querySelector("#edit-invoice-date");
let projectDescInput = document.querySelector("#edit-project-desc");
let itemNameInput = document.querySelector("#edit-item-name");
let quantityInput = document.querySelector("#edit-item-qty");
let priceInput = document.querySelector("#edit-item-price");

// puts all the current data back into the modal for editing
const filledEditModal = (invoice) => {
  editModal.style.display = "block";

  senderStreetInput.value = invoice.senderStreet;
  senderPostCodeInput.value = invoice.senderPostCode;
  senderCityInput.value = invoice.senderCity;
  senderCountryInput.value = invoice.senderCountry;
  clientNameInput.value = invoice.clientName;
  clientEmailInput.value = invoice.clientEmail;
  clientStreetInput.value = invoice.clientStreet;
  clientCityInput.value = invoice.clientCity;
  clientPostInput.value = invoice.clientPost;
  clientCountryInput.value = invoice.clientCountry;

  dateIssuedInput.value = invoice.dateIssued;
  projectDescInput.value = invoice.projectDesc;

  itemNameInput.value = invoice.itemName;
  quantityInput.value = invoice.quantity;
  priceInput.value = invoice.price;
};



cancel.addEventListener("click", () => {
  editModal.style.display = "none"; // hides the modal again
});

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
console.log(invoices);

console.log("Invoice ID from URL:", id);
console.log("Invoices from localStorage:", invoices);

const findInvoice = () => {
  const invoice = invoices.find((invoice) => invoice.id == id);
  return invoice;
};

const generateInvoiceDetails = (invoice) => {
  const status = invoice.status || "Pending";
  const statusClass =
    status === "Paid" ? "paid" : status === "Pending" ? "pending" : "draft";

  if (invoice) {
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

    return `
    <div>
          <a class="back" href="./index.html">
            <i class="ri-arrow-left-s-fill"></i>
            <p>Go Back</p>
          </a>
        </div>
        <div class="status-actions">
          <div class="status">
            <h4>Status</h4>
            <div class="invoice-status ${statusClass}">
              <p class="dot"><i class="ri-circle-fill"></i></p>
              <p class="status-result">${invoice.status}</p>
            </div>
          </div>
          <div class="status-btns">
            <button class="edit-invoice">Edit</button>
            <button class="delete-invoice">Delete</button>
            <button class="mark-as-paid">Mark As Paid</button>
          </div>
        </div>
        <div class="inner-invoice">
       <div class="all-details">
            <div class="all-details-info">
              <div class="info-top">
                <div class="top-left">
                  <div class="invoice-id">
                    <span>#</span>
                    <h4>${id}</h4>
                  </div>
                  <p class="invoice-desc">${projectDesc}</p>
                </div>
                <div class="top-right">
                  <p>${senderStreet}</p>
                  <p>${senderCity}</p>
                  <p>${senderPostCode}</p>
                  <p>${senderCountry}</p>
                </div>
              </div>
              <div class="info-bottom">
                <div class="details-dates">
                  <div>
                    <p>Invoice Date</p>
                    <h4>${dateIssued}</h4>
                  </div>
                  <div>
                    <p>Payment Due</p>
                    <h4>Date/2</h4>
                  </div>
                </div>
                <div class="client-details">
                  <p>Bill To</p>
                  <h4>${clientName}</h4>
                  <p>${clientStreet}</p>
                  <p>${clientCity}</p>
                  <p>${clientPost}</p>
                  <p>${clientCountry}</p>
                </div>
                <div class="client-mail">
                  <p>Sent To</p>
                  <h4>${clientEmail}</h4>
                </div>
              </div>
            </div>
            <div class="item-container">
              <div class="item-details">
                <div>
                  <h5>Item Name</h5>
                  <h4>${itemName}</h4>
                </div>
                <div>
                  <h5>QTY.</h5>
                  <p>${quantity}</p>
                </div>
                <div>
                  <h5>Price</h5>
                  <p><span>$</span> ${price}</p>
                </div>
                <div>
                  <h5>Total</h5>
                  <h4><span>$</span> ${total}</h4>
                </div>
              </div>
              <div class="amount-details">
                <h5>Amount Due</h5>
                <h2><span>$</span> ${total}</h2>
              </div>
            </div>
          </div>
          </div>
          </div>
      `;
  } else {
    console.log("Invoice Not Found");
  }
};
const invoice = findInvoice();
if (invoice) {
  invoiceContent.innerHTML = generateInvoiceDetails(invoice);

const editInvoice = document.querySelector(".edit-invoice");
const deleteInvoice = document.querySelector(".delete-invoice");
const markAsPaidBtn = document.querySelector(".mark-as-paid");


editInvoice.addEventListener("click", () => {
  const invoice = findInvoice();
  if (invoice) {
    filledEditModal(invoice); // opens the edit modal
  }
});


deleteInvoice.addEventListener("click", () => {
  const currentInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
  // Get the current data from localStorage
  // use filter to remove the invoice you want to delete
  const invoicesAfterDelete = currentInvoices.filter(
    (invoice) => invoice.id != id
  );

  localStorage.setItem("invoices", JSON.stringify(invoicesAfterDelete));

  window.location.href = "index.html";

  alert("Invoice deleted"); // pop-up message to notify that it has been deleted

  console.log("Before deletion:", invoices);
  console.log("ID to delete:", id);
  console.log("After deletion:", invoicesAfterDelete);
});


  markAsPaidBtn.addEventListener("click", () => {
    const index = invoices.findIndex((inv) => inv.id == id);
    if (index !== -1) {
      invoices[index].status = "Paid";
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }

    const updatedInvoice = invoices[index];
    invoiceContent.innerHTML = generateInvoiceDetails(updatedInvoice);

    // const invoiceStatus = document.querySelector(".invoice-status");
    // const statusResult = document.querySelector(".status-result");

    // if (invoiceStatus && statusResult) {
    //   invoiceStatus.classList.remove("pending", "draft");
    //   invoiceStatus.classList.add("paid");
    //   statusResult.textContent = "Paid";
    // }

    const newStatus = document.querySelector(".invoice-status");
    const newResult = document.querySelector(".status-result");

    if (newStatus && newResult) {
      newStatus.classList.remove("pending", "draft");
      newStatus.classList.add("paid"); // Add the 'paid' class to change background color
      newResult.textContent = "Paid";
      newResult.style.color = "rgb(9, 223, 116)";
      document.querySelector(".dot").style.color = "rgb(9, 223, 116)";
    }

    markAsPaidBtn.style.backgroundColor = "rgba(124, 93, 250, 0.433)";

    window.location.href = "index.html";
  });
} else {
  invoiceContent.innerHTML = "<p>Invoice not found.</p>";
}

editInvoiceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editedInvoice = {
    ...findInvoice(),
    senderStreet: senderStreetInput.value,
    senderCity: senderCityInput.value,
    senderPostCode: senderPostCodeInput.value,
    senderCountry: senderCountryInput.value,
    clientName: clientNameInput.value,
    clientEmail: clientEmailInput.value,
    clientStreet: clientStreetInput.value,
    clientCity: clientCityInput.value,
    clientPost: clientPostInput.value,
    clientCountry: clientCountryInput.value,
    dateIssued: dateIssuedInput.value,
    projectDesc: projectDescInput.value,
    itemName: itemNameInput.value,
    quantity: parseInt(quantityInput.value),
    price: parseFloat(priceInput.value),
    total: parseInt(quantityInput.value) * parseFloat(priceInput.value),
  };

  const index = invoices.findIndex(
    (invoice) => invoice.id === editedInvoice.id
  );
  invoices[index] = editedInvoice;
  localStorage.setItem("invoices", JSON.stringify(invoices)); //updates it in the local storage
  editModal.style.display = "none"; // Hides the modal again
  location.reload(); // reloads the page to show the updates
});

// statusResult.innerHTML = "Pending";
// invoiceStatus.style.backgroundColor = "rgba(255, 149, 0, 0.592)";
// invoiceStatus.style.color = "rgb(255, 149, 0)";

// markAsPaidBtn.addEventListener("click", () => {
//   statusResult.innerHTML = "Paid";
//   invoiceStatus.style.backgroundColor = "rgba(92, 185, 138, 0.419)";
//   statusResult.style.color = "rgb(9, 223, 116)";
//   document.querySelector(".dot").style.color = "rgb(9, 223, 116)";

//   markAsPaidBtn.style.backgroundColor = "rgba(124, 93, 250, 0.433)";
// });

