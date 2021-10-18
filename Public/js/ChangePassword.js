
window.addEventListener('load',function(){
    console.log('archivo de validación FE vinculado')

    let password1= document.querySelector('#password1')
    let password2= document.querySelector('#password2')

    let form=document.querySelector('#register-form')
    let submit=document.querySelector('#submit')
    
    let arregloDeErrores=document.querySelectorAll('#arregloDeErrores')

    let errores={}
////////////////////////////////////////////////////////////////////
function verificarCaracteres(){
    //Posiciones mayuscula,minuscula,número,caracter especial
    let arreglo=[0,0,0,0]
    let cadena=password1.value
    let longitud=cadena.length
    let charC
    for(let i=0;i<longitud;i++){
        //console.log('ABC'.charCodeAt(0))
       charC=cadena.charCodeAt(i)
       console.log(charC)
        if(charC>=65 && charC<=90){
            arreglo[0]++
        }else if(charC>=97 && charC<=122){
           arreglo[1]++
        }else if(charC>=48 && charC<=57){
           arreglo[2]++
        }else{
           arreglo[3]++
        }
    }
    if(arreglo[0]>0 && arreglo[1]>0 && arreglo[2]>0 && arreglo[3]>0){
        return false
    }
    return true
}
function password1F(){
    if(password1.value==''){
    errores.password1='Este campo no debe estar vacio'
    arregloDeErrores[0].innerHTML=errores.password1
    password1.style.borderColor='red'
    return true
    }else if(password1.value.length<8){
    errores.password1='Ingresa una contraseña de al menos 8 caracteres'
    arregloDeErrores[0].innerHTML=errores.password1
    password1.style.borderColor='red'
    return true
    }else if(verificarCaracteres()){
    errores.password1='La contraseña deberá tener letras mayúsculas,minúsculas, un número y un carácter especial'
    arregloDeErrores[0].innerHTML=errores.password1
    password1.style.borderColor='red'
    return true
    }
     
    password1.style.borderColor='green'
    delete errores.password1
    arregloDeErrores[0].innerHTML=''
    return false
}
function compararPasswords(){
    if(password1.value==password2.value){
        return false
    }
    return true
}
function password2F(){
if(password2.value==''){
    errores.password2='Este campo no debe estar vacio'
    arregloDeErrores[1].innerHTML=errores.password2
    password2.style.borderColor='red'
        return true
    }else if(compararPasswords()){
    errores.password2='Las contraseñas no coinciden'
    arregloDeErrores[1].innerHTML=errores.password2
    password2.style.borderColor='red'
    return true
    }
    if(password1.style.borderColor=='green'){
    password2.style.borderColor='green'}
    delete errores.password2
    arregloDeErrores[1].innerHTML=''
    return false
}

/////////////////////////////////////////////////////////////////////////

password1.addEventListener('blur',function(){password1F(), password2F()})
password2.addEventListener('blur',function(){password2F()})

form.addEventListener('submit',function(e){

    let password1B=!password1F()
    let password2B=!password2F()

    if(password1B&&password2B){
        console.log(" submit exitoso")
        //form.submit()
    }else{
        console.log("Hay errores por resolver")
        e.preventDefault()
    }

})
})
