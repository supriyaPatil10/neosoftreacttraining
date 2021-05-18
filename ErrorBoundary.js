import {component} from "react"


class ErrorBoundary extends component{

// constructor{
// this.state
// return{
//     hasError:true
// }

// }
componentDidCatch(error,errorInfo)
{

}

render(){

if(this.state.hasError)
{

    return(
<div>
<h1>Oops some error occured</h1>

</div>

    )
}
else{
    return this.props.children
}

}


}

export default ErrorBoundary