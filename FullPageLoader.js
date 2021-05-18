import { Component } from "react/cjs/react.development";
import { connect } from "react-redux";

class FullPageLoader extends Component {
   
    state = {}
    render() {

       

//const loading=this.props;
        // if(!loading) return null;

        var laoderimage="loadergifimg.gif";
        return (

            <div className="loader-container">

                <div className="loader">
                 <img src={laoderimage}/>

                </div>
            </div>
        );
    }
}


// export default connect(function(state,props){
// return{
// user:state?.user,
// loading:state?.loading
// }

// }) (FullPageLoader);

const mapStateToProps = state=>({loading:state.reducer.loading})
export default FullPageLoader