




var img1 = "cake.jpeg";
var img2 = "cake1.jpeg";
var img3 = "cake3.jpeg";


var carouselImage = {
  height: "400px"
}

function Carousel() {
  return (


    <div>
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img style={carouselImage} class="d-block w-100" src={img1} alt="First slide" />
          </div>
          <div class="carousel-item">
            <img style={carouselImage} class="d-block w-100" src={img2} alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img style={carouselImage} class="d-block w-100" src={img3} alt="Third slide" />
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

export default Carousel