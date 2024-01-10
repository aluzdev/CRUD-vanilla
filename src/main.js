const form = document.getElementById("songForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the values from the form inputs
  const name = document.getElementById("name").value;
  const songName = document.getElementById("songName").value;
  const bandName = document.getElementById("intérprete").value;

  const songData = {name, songName, bandName}

  form.reset();
});
