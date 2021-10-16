console.log('archivo login')

window.addEventListener('load',function(){
    console.log('archivo de validación FE vinculado')

    // const db = require("../../database/models")
     let email= document.querySelector('#email')
   
     let form=document.querySelector('#login-form')
     let submit=document.querySelector('#ingresar')
     
     let arregloDeErrores=document.querySelector('#arregloDeErrores')
   
     let errores={}
   ////////////////////////////////////////////////////////////////////
   
    function emailValido(){
       let signos=[0,0]
       const longitud=email.value.length
       const cad=email.value
       for(let i=0;i<longitud;i++){
           console.log(cad[i])
           if(cad[i]=='@'){
               signos[0]=i
           }
           if(cad[i]=='.'){
               signos[1]=i
           }
       }
   
       if(signos[0]==0||signos[0]>signos[1]||(signos[1]-signos[0])<2 ||(longitud-signos[1])<3){
           return true
       }
       return false
    }
    function emailF(){
       if(email.value==''){
           errores.email='El email no debe estar vacio'
           arregloDeErrores.innerHTML=errores.email
           console.log('Email vacio')
           email.style.borderColor='red'
           return true
       }else if(emailValido()){
           errores.email='Debes ingresar un email valido'
           arregloDeErrores[3].innerHTML=errores.email
           console.log('Email no valido')
           email.style.borderColor='red'
           return true
       }else{
           delete errores.email
           arregloDeErrores[3].innerHTML=''
           email.style.borderColor='green'
           return false
       }
    }
   
   /////////////////////////////////////////////////////////////////////////
   email.addEventListener('blur',function(){emailF()})
   
   form.addEventListener('submit',function(e){

       if(!emailF()){
           console.log(" submit exitoso")
           //form.submit()
       }else{
           console.log("Hay errores por resolver")
           e.preventDefault()
       }
   
   })
})
   