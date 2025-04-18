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
};
// test

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
//  This is for the transcations in the account
const calcsummary = function (acc) {
  let incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}💲`;
  let out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = `${Math.abs(out)}💲`;
  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(i => i >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${intrest}💲 `;
};
console.log('---Postive balance');
// calcsummary(account1.movements);
const displayMovements = function (movements) {
  // This is to remove the all the current html in the elemtns
  containerMovements.innerHTML = '';
  movements.forEach(function (Elements, index) {
    // Here we check wheter the transcation is either a deposti or a withdrawl
    const type = Elements > 0 ? 'deposit' : 'withdrawal';
    // Here we haved pasted the html wiich are sleceted
    const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      index + 1
    }  ${type}</div> 
            <div class="movements__value">${Elements}💶</div>
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
  labelBalance.textContent = `${account.balance}$ `;

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
// Login fetaur
//topic updateUi this to update the ui bacscially we update the current balnce movents and everyhting in the ui
const updateUi = function () {
  displayMovements(current.movements); // now as we have written the movents function up overe there we are now calling that function overe here with current.movents the current holds the current user id and password inculding the data stored in the object
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
    current.movements.push(-amount); // this will also perform the task of updating the blance and movents becuase it has allready been done in the reduce calucalting the summary

    reciverAccount.movements.push(amount);
    updateUi(current); // this will perform the 3 task to update the ui

    console.log('transfer valid');
  } else {
    console.log('transfer invalid');
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
    current.movements.push(amount);
    updateUi(current);
    inputLoanAmount.value = '';
    loanAprroved.style.opacity = 100;
    loanAprroved.style.display = 'block';
  } else {
    loanRejected.style.opacity = 100;
    loanRejected.style.display = 'block';
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
