'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2025-05-26T21:31:17.178Z',
    '2025-05-24T07:42:02.383Z',
    '2025-05-23T09:15:04.904Z',
    '2025-05-29T10:17:24.185Z',
    '2025-05-27T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-04-29T23:36:17.929Z',
    '2025-03-01T10:51:36.790Z',
  ],
};
// test

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2025-07-12T08:45:23.182Z',
    '2025-06-28T15:34:55.911Z',
    '2025-06-15T11:29:13.477Z',
    '2025-06-01T22:14:48.203Z',
    '2025-05-18T05:42:31.004Z',
    '2025-04-30T19:07:16.789Z',
    '2025-04-10T16:23:09.342Z',
    '2025-03-25T01:56:44.125Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2025-05-26T21:31:17.178Z',
    '2025-05-24T07:42:02.383Z',
    '2025-05-23T09:15:04.904Z',
    '2025-05-29T10:17:24.185Z',
    '2025-05-27T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-04-29T23:36:17.929Z',
    '2025-03-01T10:51:36.790Z',
    '2025-02-12T14:18:36.524Z',
    '2025-01-30T09:47:22.816Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2025-05-26T21:31:17.178Z',
    '2025-05-24T07:42:02.383Z',
    '2025-05-23T09:15:04.904Z',
    '2025-05-29T10:17:24.185Z',
    '2025-05-27T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-04-29T23:36:17.929Z',
    '2025-03-01T10:51:36.790Z',
    '2025-02-12T14:18:36.524Z',
    '2025-01-30T09:47:22.816Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// selcting one more element
const accountClosed = document.querySelector('.account-delet');
// selecting one more element
const loanAprroved = document.querySelector('.Loan-amount-accepted');
//selecting one more element
const loanRejected = document.querySelector('.Loan-amount-was-rejected');
const timer = document.querySelector('.timer');
// This is the Logout
// Creating a sperate function for the logout just to exprot the logout functionality
let current_date = new Date();
let logout;
const logoutLogic = function () {
  // we need to reset the time to minuets
  let time = 300; // here we have converted the 5 minuets into the seconds
  // updating the timmer every second to the ui
  const tick = function () {
    // convert them to string and usign pad start adding zero to start
    const mins = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    timer.textContent = `${mins}:${sec}`;
    if (time === 0) {
      clearInterval(logout);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    // Decreasing the time by 1 sec everytime
    time--;
  };
  tick();
  logout = setInterval(tick, 1000);
  return logout;
};
console.log(logout);
// creating a logic where we dont have to write the logic of clearing the timer every time and action or login is done
const LogoutTimer = function () {
  if (logout > 0) clearInterval(logout);
  logout = logoutLogic();
};
//  This is for the transcations in the account

const calcsummary = function (acc) {
  let incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}💲`;
  let out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}💲`;
  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(i => i >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${intrest.toFixed(2)}💲 `;
};
console.log('---Postive balance');
// calcsummary(account1.movements);
const displayMovements = function (current_acc) {
  // This is to remove the all the current html in the elemtns
  containerMovements.innerHTML = '';
  const movs = current_acc.movements;
  movs.forEach(function (Elements, index) {
    //  to get the date of the each transcation we use the index so that we can get the dates
    let transcation_Dates = new Date(current_acc.movementsDates[index]);
    const day = transcation_Dates.getDate(); // ✅
    const month = transcation_Dates.getMonth() + 1;
    const year = transcation_Dates.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    // Here we check wheter the transcation is either a deposti or a withdrawl
    const type = Elements > 0 ? 'deposit' : 'withdrawal';
    // Here we haved pasted the html wiich are sleceted
    const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      index + 1
    }  ${type}</div> 
   <div>${displayDate}</div>
   
            <div class="movements__value">${Elements.toFixed(2)}  </div>
          </div>`;
    // here we have used a method of js and afeterbegin porperty which will put the elemtn after the container
    // console.log(typeof html);
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // Important
    // afterbeign will start from the end of the array or object
    // beforebeing will be start from the the start of the array or object
    // After beign will show the new elements in the begings
    // so bascially the before being will allways show the new elments added in the array at the last
  });
};
// This is to dsiplay Balnce on the Top
// Important
// displayMovements(account1.movements);
// Here we calaculate the balnce in the account
const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}$ `;

  // labelBalance.textContent = `${account.balance}$ `;
  // console.log(balance);
};
// console.log('---test');
// calcPrintBalance(accounts);
// Important
// calcPrintBalance(account1.movements);
const getMax = function (mov) {
  const max = mov.reduce(function (acc, curr) {
    // console.log(acc);
    if (acc > curr) {
      return acc;
    } else {
      return curr; // you need to return this manually everytime as a new accumlaitor
    }
  }, mov[0]);
  // console.log(max);
};
getMax(account1.movements);
// Now calculating the the over all depostis in the Account and displayin in the in and also the withdrawls and showing in the out
// Computing UserName  for each object creating a new property
const userName = function (acc) {
  acc.forEach(function (user) {
    user.username = user.owner
      .split(' ') // first we use the split method to split the whole string into single indvidual letters and
      .map(a => a[0]) // as there are 2 elements in the array adn we are using the map method it will get each element of the string indvidual
      .join('')
      .toLowerCase(); // this to set everything into and lowecase
  });
};
userName(accounts);
// Login feature
//topic updateUi this to update the ui bacscially we update the current balnce movents and everyhting in the ui
const updateUi = function () {
  displayMovements(current); // now as we have written the movents function up overe there we are now calling that function overe here with current.movents the current holds the current user id and password inculding the data stored in the object
  // Important
  calcPrintBalance(current); // here we only need to get the blance of the current account

  // Display summary
  calcsummary(current);
};

// here we decided the current login users to start the futher logic bulding
let current;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // this will prevent form from submiting
  current = accounts.find(acc => acc.username === inputLoginUsername.value); // The value proeprty over here is to get the value inputed by the user
  //if the user directly enters the pin and clicks the enter button then we gwt and error of undefined because the pin poerty get undefined to comapre with to solev this we use simple mwthod

  if (current && current.pin === Number(inputLoginPin.value)) {
    console.log('Login Scusesfull');
    console.log(current);
    // need to make sure timer every time rest when the login happens
    LogoutTimer();
    // Starting the Logout timmer

    //  Display ui and welcome message
    labelWelcome.textContent = `WelcomeBack , ${current.owner.split(' ')[0]}`;

    // Dsiplay Movements
    containerApp.style.opacity = 100; // here if the login is sucesfull we set the opactiy from 0 to 100
    // Clearing the Input fileds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // after login so the cursor is over here so we use the blur method to remove the foucs
    // dsiplay balance
    updateUi(current);
  } else {
    console.log('Wrog creds');
    labelWelcome.textContent = 'Please Enter Correct Creds To Login';
  }
});
// Implemting Transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value); // geting the amount and converting that to and Integer
  const reciverAccount = accounts.find(
    transferUser => transferUser.username === inputTransferTo.value
  ); // this will return the whole object of that containg username
  // now removing the money transferd
  if (
    amount > 0 &&
    reciverAccount &&
    current.balance >= amount &&
    reciverAccount.username !== current.username
  ) {
    // doing the transfer
    let transfer_Date = current_date;
    current.movementsDates.push(transfer_Date.toISOString());
    current.movements.push(-amount); // this will also perform the task of updating the blance and movents becuase it has allready been done in the reduce calucalting the summary

    reciverAccount.movements.push(amount);
    reciverAccount.movementsDates.push(transfer_Date.toISOString());
    updateUi(current); // this will perform the 3 task to update the ui

    console.log('transfer valid');
    LogoutTimer();
  } else {
    console.log('transfer invalid');
    LogoutTimer();
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});
// topic here we implement the logic of close account
// the findIndex method finds the index intead of the element // these methods were added in es6
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === current.username &&
    Number(inputClosePin.value) === current.pin
  ) {
    console.log('correct');
    // now to delet the account we use findIndex method to remove that account for the accounts array
    const index = accounts.findIndex(acc => acc.username === current.username);
    console.log(index); // this should return the index at which the object is present
    accounts.splice(index, 1); //now here the splice will recive the index from the ondex variable adn then it will delet element or remove the element according to the index so the one overe deceid hwo many elemnts you want remove starting from that postion
    console.log(accounts);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
    accountClosed.style.opacity = 100;
    accountClosed.style.display = 'block';
  } else {
    console.log('wrong');
  }
});
// topic request Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputLoanAmount.value);
  console.log(amount);
  if (amount > 0 && current.movements.some(e => e >= amount / 10)) {
    logoutLogic();
    const transfer_date = new Date();
    current.movements.push(amount);
    current.movementsDates.push(transfer_date.toISOString());
    updateUi(current);
    inputLoanAmount.value = '';
    loanAprroved.style.opacity = 100;
    loanAprroved.style.display = 'block';
    setTimeout(function () {
      loanAprroved.style.opacity = 0;
      loanAprroved.style.display = 'none';
    }, 1000);
    LogoutTimer();
  } else {
    loanRejected.style.opacity = 100;
    loanRejected.style.display = 'block';
    setTimeout(function () {
      loanRejected.style.display = 'none';
      loanRejected.style.opacity = 0;
    }, 1000);
    LogoutTimer();
  }
});
// Sort Order Logic
const sortMovents = function (movent, sort = false) {
  // the slice is used to make a shallow copy so that it doesnt change the orginal array
  let sortedmovents = sort ? movent.slice().sort((a, b) => a - b) : movent;
  displayMovements(sortedmovents); // Here we call the dispaly Movents function with the sortedMovents varibales
};

// adding the event listner so that whenever the btn is clicked it will set the sort to true
//  to reste the sort
let sort = false; // intally the sort will start with the false
btnSort.addEventListener('click', function (e) {
  e.preventDefault(); // preventing not refreshing the page whenever is clicked
  sortMovents(current.movements, !sort);
  sort = !sort;
});
// Updating the dates on the current balance

const balance_date = setInterval(function () {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(now);
  labelDate.textContent = formatter;
}, 1000);

console.log(account1);
console.log(account2);

const test = new Date();
console.log();

console.log(account1);
