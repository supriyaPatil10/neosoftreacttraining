


import Cake from "./Cake"
import axios from "axios"
import { useEffect, useState } from "react"
import queryString from "query-string"


function Search(props) {

    const parsed = queryString.parse(props.location.search)
    console.log("parsed", parsed)
    let [cakesresult, setCakes] = useState([])
    // let searchcakesapi="https://apibyashu.herokuapp.com/api/searchcakes?q="+parsed.seacrhtext
    // let searchcakesapi = "https://apibyashu.herokuapp.com/api/searchcakes?q=" + parsed.searchtext
    var baseurl = process.env.REACT_APP_BASE_URL;
    let searchcakesapi = baseurl + "/api/searchcakes?q=" + parsed.searchtext

    console.log(searchcakesapi)
    useEffect(() => {

        axios({

            method: "get",
            url: searchcakesapi
        }).then((response) => {
            console.log("response from search cake api", response.data)
            setCakes(response.data.data)
        }, (error) => {
            console.log("response from search error cake api", error)
        })
    }, [props.location.search])

    console.log(props)
    return (
        <div className="container">

            <div className="row">


                {cakesresult?.length > 0 ? cakesresult.map((each, index) => {
                    return <Cake cakedata={each} index={index} />
                }) : <div className="alert alert-danger">No result found for your search.Please try some other cake</div>}


            </div>
            <br />
            {/* <Product/> */}
        </div>
    )
}
export default Search