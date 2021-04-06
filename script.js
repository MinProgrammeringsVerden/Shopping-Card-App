if (document.readyState =="loading"){
    document.addEventListener("DOMContentLoaded" , ready )
} else { 
    ready() 
} 


function ready(){ 
      
    var removeItemFromCart = document.getElementsByClassName('btn-danger')
    for(var i = 0 ; i < removeItemFromCart.length; i++){
        var btn = removeItemFromCart[i]
        btn.addEventListener('click' , removeCartItem)
    }

    var quantityInputsFromCart = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputsFromCart.length; i++) {
        var input = quantityInputsFromCart[i]
        input.addEventListener('change', quantityChanged)
    }

    var addItemToCart = document.getElementsByClassName('shop-item-btn')
    for (var i = 0; i < addItemToCart.length; i++) {
        var item = addItemToCart[i]
        item.addEventListener('click', addItem )
       
    }

      document.getElementsByClassName('btn-purchase')[0].addEventListener('click' , purchaseClicked)
     
     
    


   }

   function purchaseClicked(){
       alert('Takk for din bestilling ')
       var purchaseItems = document.getElementsByClassName('cart-row-items')[0]
       while (purchaseItems.hasChildNodes() ){
        purchaseItems.removeChild(purchaseItems.firstChild)
         
       }
        updateCartTotal()
       
       
    }


   function removeCartItem (event) {
    //console.log("clicked"); 
    var clickedBtn = event.target
    //console.log (clickedBtn); 
    //var parent = clickedBtn.parentElement
    //console.log (parent); 
    clickedBtn.parentElement.parentElement.remove();
   // console.log (parent); 
    updateCartTotal()


    }

   function quantityChanged(event) { 
       var input = event.target 
       if (isNaN(input.value) || input.value <= 0) {
           input.value = 1
       }
       updateCartTotal()

   }

   function addItem(event){
      var itemBtn = event.target 
      //console.log(itemBtn);
      itemBtn.parentElement
      var shopItem = itemBtn.parentElement.parentElement
      var itemTitle = shopItem.getElementsByClassName('shop-item-title')[0].innerText
      //console.log(itemTitle);
      var itemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText
      //console.log(itemPrice);
      var itemImg = shopItem.getElementsByClassName('shop-item-img')[0].src
      //console.log(itemImg);

        addItemToCart(itemTitle , itemPrice , itemImg)
        updateCartTotal()
                  
   } 
   
   function addItemToCart(itemTitle , itemPrice , itemImg){
    var newCartRow = document.createElement('div')
    newCartRow.classList.add('cart-row')
    //console.log(newCartRow.innerText );
    var cartRowItems = document.getElementsByClassName('cart-row-items')[0]
    var cartItemTitles = cartRowItems.getElementsByClassName('cart-item-title')
   // console.log(cartItemTitles);
   for (var i = 0 ; i < cartItemTitles.length; i++){
       var cartItemTitle = cartItemTitles[i]
       //console.log(itemTitle);
       if(cartItemTitle.innerText == itemTitle ){
          alert('Denne varen er allerede lagt til handlekurven')
          return
       }
   }


    var content = `
            <div class="cart-item cart-column">
                <img  class="cart-item-img"src="${itemImg}" width="75px" height="75px">
                <span class="cart-item-title">${itemTitle}</span>
            </div>
            <span class="cart-price cart-column ">${itemPrice}</span>
            <div class="cart-quantity cart-column">
                <input  class="cart-quantity-input"type="number" value="1">
                <button class="btn btn-primary btn-danger" type="button">Remove </button>
            </div>`
      
            newCartRow.innerHTML = content
            cartRowItems.append(newCartRow)
            newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
            newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
            
            
 

 
   
   }



  



 function updateCartTotal(){
   var cartItemsContainer = document.getElementsByClassName('cart-row-items')[0];
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    var total = 0
   for(var i = 0 ; i < cartRows.length ; i++ ) {
       var cartRow = cartRows[i]
       var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
       //console.log (cartPrice ); 
       var cartQuantity = cartRow.getElementsByClassName("cart-quantity-input")[0]
       //console.log (cartQuantity ); 
       var price = parseFloat(cartPrice.innerText.replace("$" , ""))
       var quantity = cartQuantity.value
       //console.log(price ); 
      // console.log (quantity) ; 
       total = total +(price * quantity);
       
    }
    
      
      total = Math.round(total * 100)/100
    
      
      document.getElementsByClassName("cart-total-price")[0].innerText = total+'kr'
  
    
}
