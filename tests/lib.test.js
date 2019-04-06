
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);    
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);    
    });
    
    it('should return zero if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);    
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        let name = 'Tobi';
        const result = lib.greet(name);
        // expect(result).toMatch(/Tobi/);
        expect(result).toEqual(expect.stringContaining(name));
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');
    });    
});

describe('getProduct', () => {
    it('should return product with given id', () => {
        let productId = 4;
        const result = lib.getProduct(4);
        // expect(result).toEqual({id: 4, price: 10});
        expect(result).toMatchObject({id: 4, price: 10});        
    });
});

describe('registerUser', () => {
    it ('should throw if username is falsy', () => {             
        const args = [null, undefined, NaN, '', 0, false];

        args.forEach((arg) => {
            expect(() => { lib.registerUser(arg)} ).toThrow();
        });        
    });

    it('should return a user object if valid username is passed', () => {
        let username = 'olantobi';
        const user = lib.registerUser(username);
        expect(user).toHaveProperty('username', username);
        expect(user).toMatchObject({'username': username});
        expect(user.id).toBeGreaterThan(0);
    });
});

describe('fizzbuzz', () => {
    it('it should throw exception if input is not a number', () => {        

        expect(() => { lib.fizzbuzz('Tobi') }).toThrow();
    })

    it('it should return fizzbuzz input is divisible by both 3 and 5', () => {
        const result = lib.fizzbuzz(60);
        expect(result).toBe('FizzBuzz');
    })

    it('it should return fizz input is divisible by 3 and not 5', () => {
        const result = lib.fizzbuzz(9);
        expect(result).toBe('Fizz');
    })

    it('it should return buzz input is divisible by 5 and not 3', () => {
        const result = lib.fizzbuzz(20);
        expect(result).toBe('Buzz');
    })

    it('it should return the input if input is NOT divisible by either 3 or 5', () => {
        let input = 13;

        const result = lib.fizzbuzz(input);
        expect(result).toBe(input);
    })
})

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log("Fake reading customer...");
            return {id: customerId, points: 20};
        }

        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
})

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        
        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1, totalPrice: 150});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');

        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
        expect(mail.send.mock.calls[0][1]).toMatch(/150/);

        // expect(mail.send).toHaveBeenCalledWith('a', '...');
    })
})
