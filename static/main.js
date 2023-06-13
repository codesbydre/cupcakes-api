// helper function to add a single cupcake to the DOM
function addCupcake(cupcake) {
  let imageSource = cupcake.image
    ? cupcake.image
    : "https://tinyurl.com/demo-cupcake";

  $("#cupcakes-list").append(`
        <li>
            Flavor: ${cupcake.flavor}, Size: ${cupcake.size}, Rating: ${cupcake.rating}
            <br>
            <img src="${imageSource}" alt="cupcake image">
        </li>
    `);
}

// function to get all cupcakes and add them to the DOM
async function getCupcakes() {
  const response = await axios.get("/api/cupcakes");
  const cupcakes = response.data.cupcakes;

  for (let cupcake of cupcakes) {
    addCupcake(cupcake);
  }
}

getCupcakes(); // get cupcakes when page loads

// handle the form submission
$("#new-cupcake-form").on("submit", async function (event) {
  event.preventDefault();

  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();

  const response = await axios.post("/api/cupcakes", {
    flavor: flavor,
    size: size,
    rating: rating,
    image: image,
  });

  const newCupcake = response.data.cupcake;
  addCupcake(newCupcake);

  $("#new-cupcake-form").trigger("reset");
});
