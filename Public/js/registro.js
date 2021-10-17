
window.addEventListener('load',function(){
    console.log('archivo de validación FE vinculado')

  let name= document.querySelector('#name')
  let lastName= document.querySelector('#apellido')
  let fechaNacimiento= document.querySelector('#date')
  let email= document.querySelector('#email')

  
  let cuenta= document.querySelector('#profile')
  let password1= document.querySelector('#password1')
  let password2= document.querySelector('#password2')
  let fotoPerfil= document.querySelector('#fotoPerfil')

  let form=document.querySelector('#register-form')
  let submit=document.querySelector('#submit')
  
  let arregloDeErrores=document.querySelectorAll('#arregloDeErrores')

  let errores={}
  var emails= {}
////////////////////////////////////////////////////////////////////
 function noAlfanumerico(cadena) {
    let longitud=cadena.length
    let charC
    //"ABC".charCodeAt(0) // returns 65
    //Rangos de números y letras
    // 0-9   48-57
    // A-Z   65-90
    // a-z   97-122
    for(let i=0;i<longitud;i++){
       charC=cadena.charCodeAt(i)
        if(charC<65 || charC>122 || (charC>90 && charC<97)){
            return true
        }
    }
            return false
 }
function nameF(){
    if(name.value==''){
        errores.name='El nombre no debe estar vacio'
        arregloDeErrores[0].innerHTML=errores.name
        console.log('nombre vacio')
        name.style.borderColor='red'
        return true
    }else if(noAlfanumerico(name.value)){
        errores.name='El nombre no deberá tener alfanúmericos'
        arregloDeErrores[0].innerHTML=errores.name
        console.log('El nombre no deberá tener alfanúmericos')
        name.style.borderColor='red'
        return true
    }else if(name.value.length<2 || name.value.length>50){
        errores.name='El nombre deberá tener al menos dos caracteres'
        arregloDeErrores[0].innerHTML=errores.name
        console.log('nombre con menos de dos caracteres')
        name.style.borderColor='red'
        return true
    }
    delete errores.name
    arregloDeErrores[0].innerHTML=''
    name.style.borderColor='green'
    return false
 }
 function lastNameF(){ 
    if(lastName.value==''){
        errores.lastName='El apellido no debe estar vacio'
        arregloDeErrores[1].innerHTML=errores.lastName
        console.log('Apellido vacio')
        lastName.style.borderColor='red'
        return true
    }else if(noAlfanumerico(lastName.value)){
        errores.lastName='El apellido no deberá tener alfanúmericos'
        arregloDeErrores[1].innerHTML=errores.lastName
        console.log('El apellido no deberá tener alfanúmericos')
        lastName.style.borderColor='red'
        return true
    }else if(lastName.value.length<2){
        errores.lastName='El apellido deberá tener al menos dos caracteres'
        arregloDeErrores[1].innerHTML=errores.lastName
        console.log('apellido con menos de dos caracteres')
        lastName.style.borderColor='red'
        return true
    }
    delete errores.lastName
    arregloDeErrores[1].innerHTML=''
    lastName.style.borderColor='green'
    return false
 }
 function fechaNacimientoF(){
let fechaDeNacimiento=fechaNacimiento.value
//console.log(fechaDeNacimiento)
if(fechaDeNacimiento==""){
    errores.fechaNacimiento='Ingresa tu fecha de nacimiento'
    arregloDeErrores[2].innerHTML=errores.fechaNacimiento
    fechaNacimiento.style.borderColor='red'
    return true}

let yearBirth=fechaDeNacimiento.slice(0,4)
let monthBirth=fechaDeNacimiento.slice(5,7)
let dayBirth=fechaDeNacimiento.slice(8,10)
let date=new Date()
let day=date.getDate()//Dia del mes
let month=date.getMonth()+1//0=enero,1=febrero,...
let year=date.getFullYear()
console.log(fechaNacimiento.value)
let edad=0
if(month<monthBirth){
edad=year-yearBirth-1
}else if(month>monthBirth){
    edad=year-yearBirth
}else{
    if(day<dayBirth){
        edad=year-yearBirth-1
    }else{
        edad=year-yearBirth
    }
}
    if(edad>110){
        errores.fechaNacimiento='Ingresa una fecha de nacimiento valida'
        arregloDeErrores[2].innerHTML=errores.fechaNacimiento
        fechaNacimiento.style.borderColor='red'
        return true
    }
     if(edad<13){
        errores.fechaNacimiento='Debes tener al menos 13 años para crear tu cuenta'
        arregloDeErrores[2].innerHTML=errores.fechaNacimiento
        console.log('Menor de 13')
        fechaNacimiento.style.borderColor='red'
        return true
    }
    delete errores.fechaNacimiento
    arregloDeErrores[2].innerHTML=''
    fechaNacimiento.style.borderColor='green'
    return false
    
 }
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

 async function solicitarEmails() {
    let boolean= await fetch('http://localhost:3031/users/signup/emails')
     emails= await  boolean.json()
     console.log('x='+emails)
}

  function emailEstaEnBD(){
       solicitarEmails()
        let numEmails=emails.total
        for(let i=0;i<numEmails;i++){
            console.log(emails.data[i].email)
            console.log(emails.data[i].email==email.value)
            if(emails.data[i].email==email.value){
                return true
            }
        }
        return false
   
 }

 function emailF(){
    if(email.value==''){
        errores.email='El email no debe estar vacio'
        arregloDeErrores[3].innerHTML=errores.email
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
    let emailBD=emailEstaEnBD()
    if( emailBD){
        errores.email='Email ya existe, usa otro'
        arregloDeErrores[3].innerHTML=errores.email
        email.style.borderColor='red'
        console.log('Email ya existe')
        return true
    }
    }

    delete errores.email
    arregloDeErrores[3].innerHTML=''
    email.style.borderColor='green'
    return false
    
 }
 function cuentaF(){
     let valor=cuenta.value
     if(valor=='seller'||valor=='user'){
         delete errores.cuenta
        arregloDeErrores[4].innerHTML=''
        cuenta.style.borderColor='green'
         return false
     }
     errores.cuenta='Selecciona una opción'
     arregloDeErrores[4].innerHTML=errores.cuenta
    cuenta.style.borderColor='red'
     return true
 }
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
        arregloDeErrores[5].innerHTML=errores.password1
        password1.style.borderColor='red'
         return true
     }else if(password1.value.length<8){
        errores.password1='Ingresa una contraseña de al menos 8 caracteres'
        arregloDeErrores[5].innerHTML=errores.password1
        password1.style.borderColor='red'
        return true
     }else if(verificarCaracteres()){
        errores.password1='La contraseña deberá tener letras mayúsculas,minúsculas, un número y un carácter especial'
        arregloDeErrores[5].innerHTML=errores.password1
        password1.style.borderColor='red'
        return true
     }
     
    password1.style.borderColor='green'
    delete errores.password1
    arregloDeErrores[5].innerHTML=''
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
        arregloDeErrores[6].innerHTML=errores.password2
        password2.style.borderColor='red'
         return true
     }else if(compararPasswords()){
        errores.password2='Las contraseñas no coinciden'
        arregloDeErrores[6].innerHTML=errores.password2
        password2.style.borderColor='red'
        return true
     }
     if(password1.style.borderColor=='green'){
    password2.style.borderColor='green'}
    delete errores.password2
    arregloDeErrores[6].innerHTML=''
     return false
 }
 function verificarImage(){         
    let longitud=fotoPerfil.value.length
    let cadena=fotoPerfil.value
    let subcadena=cadena.slice(longitud-4)
    
    if(subcadena=='JPEG'||subcadena=='jpeg'){return false}
    subcadena=subcadena.slice(1)
    if(subcadena=='JPG'||subcadena=='jpg'){return false}
    if(subcadena=='PNG'||subcadena=='png'){return false}
    if(subcadena=='GIF'||subcadena=='gif'){return false}
    return true
 }
 function fotoPerfilF() {
     if(fotoPerfil.value==''){
        errores.fotoPerfil='Este campo no debe estar vacio'
        arregloDeErrores[7].innerHTML=errores.fotoPerfil
        fotoPerfil.style.borderColor='red'
         return true
     }else if(verificarImage()){
        errores.fotoPerfil='Debes subir un archivo válido(JPG, JPEG, PNG, GIF)'
        arregloDeErrores[7].innerHTML=errores.fotoPerfil
        fotoPerfil.style.borderColor='red'
        return true
     }
    
    fotoPerfil.style.borderColor='green'
    delete errores.fotoPerfil
    arregloDeErrores[7].innerHTML=''
     return false
 }

/////////////////////////////////////////////////////////////////////////
name.addEventListener('blur',function(){nameF()})
lastName.addEventListener('blur',function(){lastNameF()})
fechaNacimiento.addEventListener('blur',function(){fechaNacimientoF()})
email.addEventListener('blur',function(){emailF()})
cuenta.addEventListener('blur',function(){cuentaF()})
password1.addEventListener('blur',function(){password1F(), password2F()})
password2.addEventListener('blur',function(){password2F()})
fotoPerfil.addEventListener('blur',function(){fotoPerfilF()})

form.addEventListener('submit',function(e){
    
    let nameB=!nameF()
    let lastNameB=!lastNameF()
    let fechaNacimientoB=!fechaNacimientoF()
    let emailB= !emailF()
    let cuentaB=!cuentaF()
    let password1B=!password1F()
    let password2B=!password2F()
    let fotoPerfilB=!fotoPerfilF()

    if(nameB&&lastNameB&&fechaNacimientoB&&emailB&&cuentaB&&password1B&&password2B&&fotoPerfilB ){
        console.log(" submit exitoso")
        //form.submit()
    }else{
        console.log("Hay errores por resolver")
        e.preventDefault()
    }

})
})
