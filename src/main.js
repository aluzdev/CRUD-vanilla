const form = document.getElementById("songForm");

const postSong = async (song) => {
    const url = "https://javascript30g-default-rtdb.asia-southeast1.firebasedatabase.app/songList/.json"
    const response = await fetch(url, {method: 'POST', body: JSON.stringify(song)})
    const data = await response.json()
    console.log({data});

}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the values from the form inputs
  const user = document.getElementById("name").value;
  const title = document.getElementById("songName").value;
  const author = document.getElementById("intérprete").value;
  const songData = {user, title, author}

  postSong(songData)

  form.reset();
});


