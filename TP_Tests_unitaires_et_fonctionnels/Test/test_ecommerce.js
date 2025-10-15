const {
    Basket,
    addToBasket,
    removeFromBasket,
    transactionAllowed,
    payBasket,
} = require('../app_ecommerce/basket.js');



// --- Tests demandés ---

function TestAdd(){
    const basket = new Basket();
    const items = {name: 'Carte mère', price: 100};
    addToBasket(basket,items);
    return basket.totalPrice === 100  && basket.items.length === 1
}



function TestRemove(){
    const basket = new Basket()
    const item1 = {name: 'carte mère', price: 100}
    addToBasket(basket,item1)
    removeFromBasket(basket,item1)
    return basket.totalPrice === 0 && basket.items.length === 0;
}



function testAddRemove(){
    const basket = new Basket();
    const item1 = {name: 'carte mère', price: 100};
    addToBasket(basket,item1);
    const AddOk = basket.totalPrice === 100 && basket.items.length === 1;
    removeFromBasket(basket,item1)
    const RemoveOk = basket.totalPrice === 0 && basket.items.length === 0;
    return AddOk && RemoveOk
}




function testTransactionAllowed(){
    const user = {name: "Enzo", balance: 500}
    const transaction1 = transactionAllowed(user,400) === true
    const transaction2 = transactionAllowed(user,600) === false
    return transaction1 && transaction2
}



function testPayBasket(){
    const user = {name: "Enzo", balance: 500}
    const basket = new Basket()
    const item = {name: 'carte mère', price: 300}
    addToBasket(basket,item)
    payBasket(user,basket)
    const transaction1 = user.balance === 200
    payBasket(user,basket)
    const transaction2 = user.balance === 200
    return transaction1 && transaction2
}




function testAppEcommerce(){
    let reussite_test = TestAdd()
    reussite_test = reussite_test && TestRemove()
    reussite_test = reussite_test && testAddRemove()
    reussite_test = reussite_test && testTransactionAllowed()
    reussite_test = reussite_test && testPayBasket()
    if(reussite_test){
        console.log('OK')
    }else{
        console.log('ERREUR')
    }
    return reussite_test
}



console.log("Test de TestAdd : " , TestAdd())
console.log("Test de TestRemove : ", TestRemove())
console.log("Test de testAddRemove :" , testAddRemove())
console.log("Test de testTransactionAllowed : " , testTransactionAllowed())
console.log("Test de testPayBasket : " , testPayBasket())
console.log("-----Resultat Global-----")


if (require.main === module) {
    testAppEcommerce();
}


module.exports = {
    TestAdd,
    TestRemove,
    testAddRemove,
    testTransactionAllowed,
    testPayBasket,
    testAppEcommerce,
};