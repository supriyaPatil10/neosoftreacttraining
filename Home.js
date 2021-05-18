import Carousel from "./Carousel"

import Cake from "./Cake"
import axios from "axios"
// import cakes from "./data.js"
import CakeDetails from "./CakeDetails"
import { useEffect, useState } from "react"

// var obj={

//     name:"cake truffle",
//     image:"cardimg.jpeg",
//     price:900
// }
function Home() {

    let [cakes, setCakes] = useState([])
    var baseurl = process.env.REACT_APP_BASE_URL;
    let allcakesapi = baseurl + "/api/allcakes"
    // let allcakesapi = "https://apibyashu.herokuapp.com/api/allcakes"

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
    return (
        <div >
            {/* <CakeDetails/> */}
            <Carousel></Carousel>
            <div className="row">
                {/* <Cake image="cardimg.jpeg" name="my cake" /> */}
                {/* <Cake cakedata={obj} /> */}

                {cakes?.length > 0 && cakes.map((each, index) => {
                    return (
                        <Cake cakedata={each} index={index} />
                    )

                })}
                {/* <Cake cakedata={obj} />
     <Cake cakedata={obj} />
     <Cake cakedata={obj} />
     <Cake cakedata={obj} /> */}
                {/* <Cake />
     <Cake />
     <Cake />
     <Cake /> */}
            </div>
            <br />

        </div>
    )
}

export default Home