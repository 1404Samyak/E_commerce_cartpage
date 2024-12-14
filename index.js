let totalprice=0
let itemarray=[]
let pricearray=[]


function displayprice(price){
    let p=document.getElementById('totalPrice')
    p.innerHTML=`Total Price: $${price}`
}

//All the tasks to add something in  DOM make it as function so that it can be called by both button clicks and from local storage as well  as needed
function additemtoDOM(item, price) {
    itemarray.push(item);
    pricearray.push(price);

    let defaultlist = document.getElementById('default-list');
    if (defaultlist) defaultlist.remove();

    let list = document.getElementById('cartItems');
    let listitem = document.createElement('li');
    listitem.innerHTML = `${item} : $${price}`;
    list.appendChild(listitem);

    let deletebutton = document.createElement('button');
    deletebutton.innerHTML = `Remove item`;
    listitem.appendChild(deletebutton);

    totalprice += price;
    displayprice(totalprice);

    // Update localStorage
    localStorage.setItem('item', JSON.stringify(itemarray));
    localStorage.setItem('price', JSON.stringify(pricearray));

    deletebutton.addEventListener('click', () => {
        // Remove from arrays
        let index = itemarray.indexOf(item);
        if (index > -1) {
            totalprice -= pricearray[index]; 
            itemarray.splice(index, 1); 
            pricearray.splice(index, 1); 
        }

        // Update localStorage on deletion also 
        localStorage.setItem('item', JSON.stringify(itemarray));
        localStorage.setItem('price', JSON.stringify(pricearray));

        // Remove from DOM and display the price on deletion also
        listitem.remove();
        displayprice(totalprice);
    });
}

 

document.addEventListener('DOMContentLoaded',()=>{
    let buttons=document.getElementsByTagName('button')//html collection
    let buttonarray=Array.from(buttons)//convert the html collection to array of buttons
    for (const button of buttonarray) {
        button.addEventListener('click',()=>{
            let parent=button.parentElement
            let div=parent.firstElementChild
            let h3=div.firstElementChild
            let p=div.lastElementChild
            let item=h3.innerHTML
            let price=Number(p.innerHTML.slice(-2))
            additemtoDOM(item,price)
        })
    }
    let saveditemarray=JSON.parse(localStorage.getItem('item'))||[]
    let savedpricearray=JSON.parse(localStorage.getItem('price'))||[]
    for(let i=0;i<saveditemarray.length;i++){
        additemtoDOM(saveditemarray[i],savedpricearray[i])
    }

})