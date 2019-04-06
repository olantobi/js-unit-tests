
module.exports.getCustomerSync = function(id) {
    console.log('Reading a customer from MongoDB...');

    return {id: id, points: 11, email: 'olantobi@gmail.com'};    
}

module.exports.getCustomer = async function(id) {
      
    //let myId = id;
    // let outerClass = this;  

    return new Promise((resolve, reject) => {
        console.log('Reading a customer from MongoDB...');

        setTimeout(() => {
            resolve ({id: id, points: 11, email: 'olantobi@gmail.com'});    
        }, 2000);
    });        
}