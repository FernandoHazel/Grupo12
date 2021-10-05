window.addEventListener("load", function(){
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    let form = document.querySelector("form#form-buy")
    console.log(form)
    console.log("This funciotn")
    form.addEventListener("submit", function(e){
        // console.log()

        let count = document.querySelector("#cantidad")
        let price = document.querySelector("#p-price")
        let discount =document.querySelector("#p-d")

        price = parseFloat(price.value)
        discount = parseFloat(discount.value)
        count = parseFloat(count.value)

        console.log(price, discount, count)
        let total = (price - (price*discount/100)) * count
        console.log(total)
        let conf = confirm("Desea comprar '"+count +"' productos?\nTOTAL:   $"+total+" MXN")

        if(!conf){
            e.preventDefault()
        }
        else{
            console.log("Enviando")
        }
    })


})