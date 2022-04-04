//class

//class calcBudget

class Budget{
  constructor(budget){
    this.budget=budget;
    this.tellBudget=this.budget;
  }
  calcBudget(amount){
   return this.tellBudget-=amount
  }
  
}




//class html

class HtmlUI {
  displayBudgetFull(getUserBudget) {
    budgetTotal.innerHTML = getUserBudget;
    budgetLeft.innerHTML = getUserBudget;
  }

  printMassegeError(message, className) {
    let div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert", "text-center", className);
    let primary = document.querySelector(".primary");
    primary.insertBefore(div, form);
    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  displayList(name, amount) {
    let li = document.createElement("li");
    li.classList =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
    ${name}
    <span class="badge badge-primary badge-pill">${amount}</span>
    `;
    let listGroup = document.querySelector("ul.list-group");
    listGroup.appendChild(li);

    setTimeout(() => {
      form.reset();
    }, 800);
  }

  displayResulte(amount){
    let totalbudget=budget.calcBudget(amount);
    budgetLeft.innerHTML=`${totalbudget}`;
     if (totalbudget<=0) {
       let btn=document.querySelector(".btn-primary");
       btn.disabled=true;
       budgetLeft.innerHTML=0
     }

     if (totalbudget<0) {
      let div = document.createElement("div");
      div.innerHTML = ` ${-totalbudget} تومان بدهکار شده اید`;
      div.classList.add("alert", "text-center",  "alert-danger");
      let primary = document.querySelector(".primary");
      primary.insertBefore(div, form);
    }




     if ((budget.budget/4)>totalbudget) {
      budgetLeft.parentElement.parentElement.classList.remove("alert-success");
      budgetLeft.parentElement.parentElement.classList.add("alert-danger");

     }else if((budget.budget/2)>totalbudget){
      budgetLeft.parentElement.parentElement.classList.remove("alert-success");
      budgetLeft.parentElement.parentElement.classList.add("alert-warning");
     }

  }
}

//varibels
let html;
let budgetTotal = document.querySelector("span#total");
let budgetLeft = document.querySelector("span#left");
let form = document.querySelector("#add-expense");
let budget;
//eventlistener

eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", function () {
    let getUserBudget = prompt("موجودی هفتگی خود را وارد کنید");
    if (
      getUserBudget == "" ||
      getUserBudget == 0 ||
      getUserBudget == null ||
      isNaN(getUserBudget)
    ) {
      window.location.reload();
    } else {
      html = new HtmlUI();
      html.displayBudgetFull(getUserBudget);
      budget=new Budget(getUserBudget);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.querySelector("#expense").value;
        let amount = document.querySelector("#amount").value;
        if (name == "" || amount == "" || isNaN(amount)) {
          html.printMassegeError(
            "اطلاعات را به درستی وارد کنید",
            "alert-danger"
          );
        } else {
          html.displayList(name, amount);
          html.displayResulte(amount);
        }
      });
    }
  });
}
