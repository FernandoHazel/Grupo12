window.addEventListener('load',function(){
   
     let nameProduct= document.querySelector('#title')
     let category= document.querySelector('#category')
     let description= document.querySelector('#description')

     let price= document.querySelector('#price')
     let discount= document.querySelector('#discount')
     let stock= document.querySelector('#stock')

     let imgProduct= document.querySelector('#img')
     let form=document.querySelector('#crea-edit-product')
     let arregloDeErrores=document.querySelectorAll('#arregloDeErrores')
   
     let errores={}
   //////////////////////////////////////////////////////////////////// 
   function nameProductF(){
       if(nameProduct.value==''){
           errores.nameProduct='El nombre del producto no debe estar vacio'
           arregloDeErrores[0].innerHTML=errores.nameProduct
           nameProduct.style.borderColor='red'
           return true
       }else if(nameProduct.value.length<2 || nameProduct.value.length>100){
           errores.nameProduct='El nombre del producto deberá tener al menos dos caracteres'
           arregloDeErrores[0].innerHTML=errores.nameProduct
           nameProduct.style.borderColor='red'
           return true
       }
       delete errores.nameProduct
       arregloDeErrores[0].innerHTML=''
       nameProduct.style.borderColor='green'
       return false
    }
    function categoryF(){
        let valor=category.value
        console.log(category.value)
        //if(valor=='tv'||valor=='audio'||valor=='cables'||valor=='herramientas'||valor=='smartphones'||valor=='tablets'||valor=='computadoras'){
           if(valor != ""){
        delete errores.category
           arregloDeErrores[1].innerHTML=''
           category.style.borderColor='green'
            return false
        }
        errores.category='Selecciona una opción'
        arregloDeErrores[1].innerHTML=errores.category
        category.style.borderColor='red'
        return true
    }
    function descriptionF(){
        if(description.value==''){
            errores.description='La descripción del producto no debe estar vacio'
            arregloDeErrores[2].innerHTML=errores.description
            description.style.borderColor='red'
            return true
        }else if(description.value.length<2 || description.value.length>1000){
            errores.description='La descripción del producto deberá tener al menos dos caracteres y máximo 1000'
            arregloDeErrores[2].innerHTML=errores.description
            description.style.borderColor='red'
            return true
        }
        delete errores.description
        arregloDeErrores[2].innerHTML=''
        description.style.borderColor='green'
        return false
     }
     function priceF(){
         let valor=parseFloat(price.value)
        if(isNaN(valor)){
            errores.price='Debes ingresar un número'
            arregloDeErrores[3].innerHTML=errores.price
            price.style.borderColor='red'
            return true
        }else if(price.value<=0){
            errores.price='El precio debe ser mayor a cero'
            arregloDeErrores[3].innerHTML=errores.price
            price.style.borderColor='red'
            return true
        }
        delete errores.price
        arregloDeErrores[3].innerHTML=''
        price.style.borderColor='green'
        return false
     }
     function discountF(){
        let valor=parseFloat(discount.value)
       if(isNaN(valor)){
           errores.discount='Debes ingresar un número'
           arregloDeErrores[4].innerHTML=errores.discount
           discount.style.borderColor='red'
           return true
       }else if(discount.value<0||discount.value>=100){
           errores.discount='El descuento debe ser mayor o igual a cero y menor a 100'
           arregloDeErrores[4].innerHTML=errores.discount
           discount.style.borderColor='red'
           return true
       }
       delete errores.discount
       arregloDeErrores[4].innerHTML=''
       discount.style.borderColor='green'
       return false
    }
    function stockF(){
        let valor=parseInt(stock.value)
       if(isNaN(valor)){
           errores.stock='Debes ingresar un número entero'
           arregloDeErrores[5].innerHTML=errores.stock
           stock.style.borderColor='red'
           return true
       }else if((parseFloat(stock.value)-valor) > 0){
           errores.stock='Debes ingresar un número entero valido'
           arregloDeErrores[5].innerHTML=errores.stock
           stock.style.borderColor='red'
           return true
       }else if(stock.value<1){
        errores.stock='Debes ingresar un número entero minimo de 1'
        arregloDeErrores[5].innerHTML=errores.stock
        stock.style.borderColor='red'
        return true
    }
       delete errores.stock
       arregloDeErrores[5].innerHTML=''
       stock.style.borderColor='green'
       return false
    }
    function verificarImage(){         
       let longitud=imgProduct.value.length
       let cadena=imgProduct.value
       let subcadena=cadena.slice(longitud-4)
       
       if(subcadena=='JPEG'||subcadena=='jpeg'){return false}
       subcadena=subcadena.slice(1)
       if(subcadena=='JPG'||subcadena=='jpg'){return false}
       if(subcadena=='PNG'||subcadena=='png'){return false}
       if(subcadena=='GIF'||subcadena=='gif'){return false}
       return true
    }
    function imgProductF() {
        if(imgProduct.value==''){
           errores.imgProduct='Este campo no debe estar vacio'
           arregloDeErrores[6].innerHTML=errores.imgProduct
           imgProduct.style.borderColor='red'
            return true
        }else if(verificarImage()){
           errores.imgProduct='Debes subir un archivo válido(JPG, JPEG, PNG, GIF)'
           arregloDeErrores[6].innerHTML=errores.imgProduct
           imgProduct.style.borderColor='red'
           return true
        }
       imgProduct.style.borderColor='green'
       delete errores.imgProduct
       arregloDeErrores[6].innerHTML=''
        return false
     } 
   /////////////////////////////////////////////////////////////////////////
   nameProduct.addEventListener('blur',function(){nameProductF()})
   category.addEventListener('blur',function(){categoryF()})
   description.addEventListener('blur',function(){descriptionF()})
   price.addEventListener('blur',function(){priceF()})
   discount.addEventListener('blur',function(){discountF()})
   stock.addEventListener('blur',function(){stockF()})
   imgProduct.addEventListener('blur',function(){imgProductF()})
   
   form.addEventListener('submit',function(e){
       
       let nameProductB=!nameProductF()
       let categoryB=!categoryF()
       let descriptionB=!descriptionF()
       let priceB=!priceF()
       let discountB=!discountF()
       let stockB=!stockF()
       let imgProductB=!imgProductF()
    
       if(nameProductB&&categoryB&&descriptionB&&priceB&&discountB&&stockB&&imgProductB ){
           console.log(" submit exitoso")
       }else{
           console.log("Hay errores por resolver")
           e.preventDefault()
       }
   })
   })
   