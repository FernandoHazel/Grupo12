
window.addEventListener('load',function(){
    console.log('archivo de validación FE vinculado')

    let name= document.querySelector('#name')
    let lastName= document.querySelector('#apellido')
    let fechaNacimiento= document.querySelector('#date')
    let email= document.querySelector('#email')

    
    let cuenta= document.querySelector('#profile')
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
 function cuentaF(){
    let valor=cuenta.value
    if(valor=='seller'||valor=='user'){
        delete errores.cuenta
    arregloDeErrores[3].innerHTML=''
    cuenta.style.borderColor='green'
        return false
    }
    errores.cuenta='Selecciona una opción'
    arregloDeErrores[3].innerHTML=errores.cuenta
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
        arregloDeErrores[4].innerHTML=errores.fotoPerfil
        fotoPerfil.style.borderColor='red'
         return true
     }else if(verificarImage()){
        errores.fotoPerfil='Debes subir un archivo válido(JPG, JPEG, PNG, GIF)'
        arregloDeErrores[4].innerHTML=errores.fotoPerfil
        fotoPerfil.style.borderColor='red'
        return true
     }
    
    fotoPerfil.style.borderColor='green'
    delete errores.fotoPerfil
    arregloDeErrores[4].innerHTML=''
     return false
 }

/////////////////////////////////////////////////////////////////////////
name.addEventListener('blur',function(){nameF()})
lastName.addEventListener('blur',function(){lastNameF()})
fechaNacimiento.addEventListener('blur',function(){fechaNacimientoF()})
email.addEventListener('blur',function(){emailF()})
cuenta.addEventListener('blur',function(){cuentaF()})
fotoPerfil.addEventListener('blur',function(){fotoPerfilF()})

form.addEventListener('submit',function(e){
    
    let nameB=!nameF()
    let lastNameB=!lastNameF()
    let fechaNacimientoB=!fechaNacimientoF()
    let emailB= !emailF()
    let cuentaB=!cuentaF()
    let fotoPerfilB=!fotoPerfilF()

    if(nameB&&lastNameB&&fechaNacimientoB&&emailB&&cuentaB&&fotoPerfilB ){
        console.log(" submit exitoso")
        //form.submit()
    }else{
        console.log("Hay errores por resolver")
        e.preventDefault()
    }

})
})
