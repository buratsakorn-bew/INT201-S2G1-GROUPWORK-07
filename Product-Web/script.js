import {products} from './product.js';

//Div ID : feed
const feed = document.querySelector('#feed');
//Show all product when start page
showProduct();

//Button (Icon) ID : search
//Div ID : searchpanel
const button = document.querySelector('#search');
const searchpanel = document.querySelector('#searchpanel');
//Toggle search panel.
let toggle = false; //Default if off.
button.addEventListener("click" , ()=> {
    toggle = !toggle;
    console.log(toggle);
    if(toggle){
        //Create Search panel and button for search.
        searchpanel.innerHTML += `<span style="display: inline-block ;width: 100% ;">
                                        <input type = 'text' placeholder="Search..." id="searchValue" class="form-control rounded">
                                 </span>
                                 <button id='active' class="me-4 ms-4 btn btn-outline-light">search</button>`;
        //Button ID : active
        const active = document.querySelector('#active');

        //Click to find items that match the search box.
        active.addEventListener("click" , ()=>{
            showProduct(item);
        })

        //Add items to Array to use in search.
        let item =[];
        searchValue.addEventListener('keyup' , () =>{
            //Collect data from <input> for use in searches.
            let value = new RegExp(searchValue.value , 'i');
            let itemsearch = [];
            products.map((p) => {
                if (p.name.match(value) != null) {
                    itemsearch.push(p);
                }
            })
            item = itemsearch;

            //If in search box is Empty String Show All Product.
            let empty ='';
            if(empty.match(value) != null){
                showProduct(products)
            }
        } 
        )
    }else
        //If toggle is false delect Search panel from Div
        searchpanel.innerHTML = "";
    
})

//Function ShowProduct
function showProduct(list = products){
    feed.innerHTML = "";
    for(let pd of list){
        //Create Div for store ProductList
        const productList = document.createElement("div");
        productList.setAttribute('id', pd.id);
        productList.setAttribute("class", "m-2 container col-xs-12 col-md-6 col-lg-6 col-xl-3 card rounded-0 bg-light border-light");
        productList.setAttribute("style", "margin-bottom: 10px; text-align: center; ")

        //Create Div for each Product
        const productItem = document.createElement("div");
        productItem.setAttribute("class", "card-body");
    
        //Create Tag Img for each Product
        const productImg = document.createElement("img");
        productImg.setAttribute("src", pd.img);
        productImg.setAttribute("height", 200);
    
        //Create Tag p for each Product to store ID
        const productId = document.createElement('p');
        productId.textContent = ` ID : ${pd.id}`;
    
        //Create Tag p for each Product to store Name
        const productName = document.createElement('p');
        productName.textContent = ` Name : ${pd.name}`;
    
        //Create Tag p for each Product to store Price
        const productPrice = document.createElement('p');
        productPrice.textContent = ` Price : ${pd.price}` + ' Baht ';
    
        //Create Tag p for each Product to store Stock
        const productStock = document.createElement('p');
        productStock.textContent = ` Stock : ${pd.stock}`;
        
        //Create Button for each Product to Buy Product
        const productButtom = document.createElement('buttom');
        productButtom.setAttribute("type", "button");
        productButtom.setAttribute("class", " btn btn-outline-dark rounded-0 cart");
        productButtom.textContent = "Add Now";
    
        //AppendChild to Div(productItem)
        productItem.appendChild(productImg);
        productItem.appendChild(productId);
        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
        productItem.appendChild(productStock);
        productItem.appendChild(productButtom);
    
        //AppendChild to Div(productList) and show in Feed
        productList.appendChild(productItem);
        feed.appendChild(productList);

        //Click for Add Product to Cart
        productButtom.addEventListener('click',()=>{
            //Check productId is it the same as ID in itemIdIncart or not?
            //If not
            if(!cart.itemIdIncart.includes(pd.id)){
                //Add productId to itemIdIncart
                //to keep as a history 
                cart.itemIdIncart.push(pd.id);
                //And push product to cart items.
                cart.items.push({ product: pd.name , 
                                  productId: pd.id ,
                                  qty: 0,
                                  price: pd.price});
            }
            //Reset Total Price and TotalQty in cart
            //to recalculate
            cart.totalPrice = 0;
            cart.totalQty = 0;

            //Calculate
            cart.items.forEach((pc) => {
                //If that same productId qty +1 but if it's not the same, stay the same.
                pc.productId == pd.id ? pc.qty+= 1 : pc.qty;
                //Calculate TotalPrice
                cart.totalPrice += pc.price * pc.qty;
                //Calculate TotalQuantity
                cart.totalQty += pc.qty
            })
            //Write Total Price and TotalQuantity that is recalculated for display.
            numqty.textContent = cart.totalQty;
            totalprice.textContent = cart.totalPrice;
        })

    }

}

//All attributes for cart.
const numqty= document.querySelector('#numqty');
const totalprice= document.querySelector('#totolprice');
const cartIcon = document.querySelector('#cart');
//Array to store data cart.
let cart = { items: [], totalPrice: 0, itemIdIncart: [], totalQty: 0 };

//Button ID: clear
const buttonclear= document.querySelector('#clear');
//Clear all item in cart
//And set TotalPrice & Quantity = 0
buttonclear.addEventListener('click',()=>{
    cart.itemIdIncart = [];
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalQty = 0;
    numqty.textContent = "0";
    totalprice.textContent = "0";
})

//Alert All item in cart
cartIcon.addEventListener('click', ()=>{
    alert(showCart());
})

//Return toStirng all item in cart
function showCart(){
    let string =""
    for(let i of cart.items){
        string += `${i.product} Price : ${i.price} Qty : ${i.qty}\n`
    }
    return string;
}