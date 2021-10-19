import React, { useEffect, useState } from "react";

function CategoriesInDb() {
  let array=['Acción','Animación','Aventura','Ciencia Ficción']

  const [category,setCategory]=useState([])

  useEffect(()=>{
    fetch('api/products/all')
      .then(respuesta =>{
        return respuesta.json()
      })
      .then(products =>{
       let lengthCategory=Object.keys(products.countByCategory).length
       let categories=products.countByCategory
       console.log('q='+lengthCategory)

       let key
       let valor
       let array=[]
        for(let i=0;i<lengthCategory;i++){
          //setCategory([category,Object.keys(categories)[i]  ])
          console.log('dentrodelFOr')
           key=Object.keys(categories)[i]
           valor=Object.values(categories)[i]
          console.log(key)//nombre de categoria
          console.log(valor)
          array.push({key:key,valor:valor})
        }
      console.log(array)
        setCategory(array)

      })
      .catch(error=>console.log(error))


  },[])
  //lengthCategory=Object.keys(category[0]).length
  //console.log(Object.keys(category[0])[0])
  console.log('categoryArray')
  console.log(category)
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
          Categories in Data Base
          </h5>
        </div>
        <div className="card-body">
          <div className="row">


           { category.map((c) => {
             return(
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">{c.key} (hay {c.valor} productos)</div>
              </div>
            </div>
             )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}
export default CategoriesInDb;
