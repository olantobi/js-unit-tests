
const db = require('./db');

console.log("Running sync request...");
const result = db.getCustomerSync(3);
console.log(result);

console.log("Running async request...");
db.getCustomer(3).then((result) => {
    console.log(result);
});
