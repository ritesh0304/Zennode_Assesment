// Function to calculate the discount based on the rules
function calculateDiscount(cart, products) { 

    let discount1 = 0;
    let discount2 = 0;
    let discount3 = 0;
    let discount4 = 0; 

    // "bulk_5_discount"
    for (const product in cart) {
        if (cart[product] > 10) {
            discount1 += products[product] * cart[product] * 0.05;
        }
    }

    // "bulk_10_discount"
    const totalQuantity = Object.values(cart).reduce((acc, val) => acc + val, 0);
    if (totalQuantity > 20) {
        discount2 += calculateTotal(cart, products) * 0.1;
    }

    // "tiered_50_discount"
    const maxQuantity = Math.max(...Object.values(cart));
    if (totalQuantity > 30 && maxQuantity > 15) {
        for (const product in cart) {
            if (cart[product] > 15) {
                const originalPrice = products[product];
                const quantityAbove15 = cart[product] - 15;
                discount3 += quantityAbove15 * originalPrice * 0.5;
            }
        }
    }

    // "flat_10_discount"
    const totalAmount = calculateTotal(cart, products);
    if (totalAmount > 200) {
        discount4 += 10;
    }
   let ans=Math.max(discount1,discount2,discount3,discount4);
   if(ans==discount1){
    let ans_name="bulk_5_discount";
    return [discount1, ans_name];
   } 
     if(ans==discount2){
    let ans_name="bulk_10_discount";
    return [discount2, ans_name];
   }  
    if(ans==discount3){
    let ans_name="tiered_50_discount";
    return [discount3, ans_name];
   }   
   if(ans==discount4){
    let ans_name="flat_10_discount";
    return [discount4, ans_name];
   }

}

// Function to calculate the total amount of the cart
function calculateTotal(cart, products) {
    let total = 0;
    for (const product in cart) {
        total += cart[product] * products[product];
    }
    return total;
}

// Function to calculate the shipping fee
function calculateShippingFee(cart) {
    
    const totalQuantity = Object.values(cart).reduce((acc, val) => acc + val, 0);
    const numberOfPackages = Math.ceil(totalQuantity / 10);
    const shippingFee = numberOfPackages * 5;
    return shippingFee;
}


// Function to calculate the gift wrap fee
function calculateGiftWrapFee(cart,gift_Wrap) {
    let wrapFee = 0;
    
    for (const product in cart) {
        if(gift_Wrap[product]===true){
            wrapFee += cart[product];
        }
    }
    return wrapFee;
}

// Main program
const products = {
    "Product A": 20,
    "Product B": 40,
    "Product C": 50
};

const cart = {};
const gift_Wrap={};

// Take input for quantity and gift wrapping
for (const product in products) {
    const quantity = parseInt(prompt(`Enter quantity for ${product}:`), 10);
    cart[product] = quantity;
    const giftWrap = prompt("Do you want gift wrapping for this product? (yes/no)").toLowerCase() === 'yes';
    gift_Wrap[product]=giftWrap;
}

// Calculate subtotal
const subtotal = calculateTotal(cart, products);

// Calculate discount
const discount = calculateDiscount(cart, products);

// Calculate shipping fee
const shippingFee = calculateShippingFee(cart);

// Calculate gift wrap fee
const giftWrapFee = calculateGiftWrapFee(cart,gift_Wrap);

// Calculate total
const total = subtotal - discount[0] + shippingFee + giftWrapFee;



//  Display Results in HTMl Code
let i=1;
let elm1Rows = document.querySelectorAll("#box1 table tr");
for (const product in cart) {
    let tdElements = elm1Rows[i].querySelectorAll("td");
    let temp1=cart[product];
    let temp2=cart[product] * products[product];
    tdElements[1].innerHTML=temp1;
    tdElements[2].innerHTML="$"+temp2;
    i++;
}

document.getElementById('subtotal').innerHTML="$"+subtotal;
document.getElementById('discount').innerHTML="$"+discount[0]+" ("+discount[1]+")";
document.getElementById('shipping').innerHTML="$"+shippingFee;
document.getElementById('gift').innerHTML="$"+giftWrapFee;
document.getElementById('total').innerHTML="$"+total.toFixed(2);





// Display Results in Console
console.log("Product Name\tQuantity\tTotal Amount");
for (const product in cart) {
    console.log(`${product}\t\t${cart[product]}\t\t$${cart[product] * products[product]}`);
}

console.log("\nSubtotal:", `$${subtotal}`);
if(discount[0]==0){
    console.log("No Discount Applied:", "   Discount Amount:",  `$${discount[0]}`);
}else{
console.log("Discount Applied:", discount[1], " Discount Amount: $", discount[0]);
}
console.log("Shipping Fee:", `$${shippingFee}`);
console.log("Gift Wrap Fee:", `$${giftWrapFee}`);
console.log("\nTotal:", `$${total.toFixed(2)}`);