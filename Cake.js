import { Link } from "react-router-dom"



function Cake(props) {
  //  console.log("props cake recieved",props)
  return (
    <div >

      <div class="card customizedcakecard" style={{ width: "18rem" }}>
        <Link to={'cake/' + props.cakedata.cakeid}>
          <img class="card-img-top container-fluid" src={props.cakedata.image} style={{
            height: "200px", marginTop: "20px"
          }} alt="Card image cap" />
        </Link>
        <div class="card-body">
          <h5 class="card-title">{props.cakedata.name}</h5>

        </div>
      </div>



    </div>


  )
}

export default Cake