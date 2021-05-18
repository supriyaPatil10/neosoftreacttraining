
import { faStar, faHeart, faRupeeSign } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from "react-redux";
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"
import swal from 'sweetalert';

const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />
const rupee = <FontAwesomeIcon icon={faRupeeSign} />


var img1 = "cupcakeimage.jpeg";

function CakeDetails(props) {

    let [cakedetails, setCakedetails] = useState({})
    let params = useParams()
    console.log("params are", params)
    // alert(params.cakeid)

    useEffect(() => {
        var baseurl = process.env.REACT_APP_BASE_URL;

        let cakedetailsapi = baseurl + "/api/cake/" + params.cakeid


        // let cakedetailsapi = "https://apibyashu.herokuapp.com/api/cake/" + params.cakeid
        axios({

            method: "get",
            url: cakedetailsapi
        }).then((response) => {
            // console.log("response from search cake api", response.data)
            setCakedetails(response.data.data)

        }, (error) => {
            console.log("response from search cake details api", error)
        })
    }, [])




    let addToCart = function () {
        var baseurl = process.env.REACT_APP_BASE_URL;
        let apiurl = baseurl + "/api/addcaketocart"
        // let apiurl = "https://apibyashu.herokuapp.com/api/addcaketocart"
        var token = localStorage.token
        axios({
            url: apiurl,
            method: "post",
            headers: { authtoken: token },
            data: {
                cakeid: cakedetails.cakeid,
                name: cakedetails.name,
                image: cakedetails.image,
                price: cakedetails.price,
                weight: cakedetails.weight
            }
        }).then((response) => {
            console.log("Add To Cart => ", response.data)
            if (response.data == "Session Expired") {

                alert("Please login")
            }
            else {
                //alert("Item added to cart") 
                props.dispatch({
                    type: "CART",
                    payload: response.data.data,
            
                  });
                swal({
                    title: "Done!",
                    text: "Item Added to cart..",
                    icon: "success",
                    timer: 4000,
                    button: true
                })
              

            }
            props.dispatch({
                type: "UPDATE_CART",
                payload: response.data
            })
        }, (error) => {
            console.log("api Error", error)
            // setError("Invalid Login")
        })

    }




    return (

        <div className="card" style={{ margin: "20px 140px" }}>
            <div className="card-body" style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
                <div className="row">
                    <div className="col-sm-6">
                        <div style={{ margin: "10px 60px" }}>
                            <img src={cakedetails.image}
                                class="card-img-top" alt="..." height="400px" />
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <div style={{ margin: "10px 20px" }}>
                            <h1 className="text-uppercase font-weight-bold pt-5 pb-3" style={{ fontSize: "28px" }} >{cakedetails.name}</h1>
                            <div className="pb-3">
                                <span className="text-warning">{star} 4.5</span>
                                <br /><span style={{ fontSize: "18px" }}>41 reviews</span>
                            </div>
                            <div className="pb-3">{cakedetails.description}</div>
                            <div className="pb-3" style={{ fontSize: "20px" }}><span className="text-uppercase font-weight-bold">
                                Current price:
                            <span className="text-warning"> {rupee}{cakedetails.price}</span>
                            </span>
                            </div>


                            <div className="pb-3" style={{ fontSize: "20px" }}>
                                <span className="text-uppercase font-weight-bold">Weight: 3KG</span></div>
                            <div className="pb-3" style={{ fontSize: "20px" }}>
                                <span className="text-uppercase font-weight-bold">Flavour:
                                <span className="font-italic text-warning"> Hazelnut cake</span>
                                </span>
                            </div>



                            <div className="font-weight-bold" style={{ fontSize: "18px" }}>Ingredient:</div>
                            <div style={{ fontSize: "16px" }}>cream | chocolate | dark chocolate | hazelnut | strawberry</div>

                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6">


                    </div>
                    <div className="col-sm-6" style={{ fontSize: "20px" }}>
                        <button type="button" onClick={addToCart} class="btn btn-warning text-uppercase p-3 text-white mr-2 font-weight-bold">Add to cart</button>
                        <button type="button" class="btn btn-warning p-3 text-white font-weight-bold">{heart}</button>
                    </div>
                </div>
            </div>
        </div>


    )
}



export default connect(function (state, props) {

}
)(CakeDetails)
//export default CakeDetails