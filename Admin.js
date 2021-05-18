
import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { useEffect, useState } from "react"
import './index.css';

import Cake from "./Cake"
import axios from "axios"

var rowdata = [];
const Admin = () => {

  let [cakes, setCakes] = useState([])

  var baseurl = process.env.REACT_APP_BASE_URL;

  let allcakesapi = baseurl + "/api/allcakes"

  //let allcakesapi = "https://apibyashu.herokuapp.com/api/allcakes"


  useEffect(() => {

    axios({

      method: "get",
      url: allcakesapi
    }).then((response) => {
      console.log("response from all cake api", response.data)
      setCakes(response.data.data)
    }, (error) => {
      console.log("response from all cake api", error)
    })
  }, [])


  {
    cakes?.length > 0 && cakes.map((cakes, index) => {


      console.log("into table", cakes)
      var name = cakes.name
      console.log("name table", name)



      console.log("name table", name)

      rowdata.push({
        name: cakes.name,
        price: cakes.price,
        image: <img className="card-img-top " src={cakes.image} style={{
          width: "124px",
          height: "116px",
          margin: "auto",
          padding: "10px"
        }} alt="Card image cap" />


      }
      )
    })
  }


  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 50
      },

      {
        label: 'price',
        field: 'price',
        sort: 'asc',
        width: 50
      },

      {
        label: 'image',
        field: 'image',
        sort: 'asc',
        width: 50
      }
    ],
    rows: rowdata
  };

  return (

    <div className="mdbcustom">

      <div className="col-md-12 m-auto pt-4" >
        <MDBDataTable
          striped
          bordered
          small
          bg-white
          data={data}
        />
      </div>
    </div>
  );
}

export default Admin;

// import React from "react";
// import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

// const Admin = () => {
//   return (
//      <MDBRow>
//       <MDBCol>
//         <MDBPagination className="mb-5">
//           <MDBPageItem disabled>
//             <MDBPageNav aria-label="Previous">
//               <span aria-hidden="true">Previous</span>
//             </MDBPageNav>
//           </MDBPageItem>
//           <MDBPageItem active>
//             <MDBPageNav>
//               1 <span className="sr-only">(current)</span>
//             </MDBPageNav>
//           </MDBPageItem>
//           <MDBPageItem>
//             <MDBPageNav>2</MDBPageNav>
//           </MDBPageItem>
//           <MDBPageItem>
//             <MDBPageNav>3</MDBPageNav>
//           </MDBPageItem>
//           <MDBPageItem>
//             <MDBPageNav aria-label="Previous">
//               <span aria-hidden="true">Next</span>
//             </MDBPageNav>
//           </MDBPageItem>
//         </MDBPagination>
//       </MDBCol>
//     </MDBRow>
//   )
// }

// export default Admin;




// // function Admin(){


// //     return(
// // <div> 

// //     <h1>Admin  page</h1>
// // </div>

// //     )
// // }

// // export default Admin