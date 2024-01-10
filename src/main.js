const form = document.getElementById("songForm");
const deleteButton = document.getElementById("delete")
const songsList = document.getElementById("songsList")
const url = "https://javascript30g-default-rtdb.asia-southeast1.firebasedatabase.app/songList/.json"


const postSong = async (song) => {
    const response = await fetch(url, {method: 'POST', body: JSON.stringify(song)})
    const data = await response.json()
    console.log({data});
}

const getSongs = async () =>{
    const response = await fetch(url)
    const data = await response.json()
    console.log({data})
    return data
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the values from the form inputs
  const user = document.getElementById("name").value;
  const title = document.getElementById("songName").value;
  const author = document.getElementById("intérprete").value;
  const songData = {user, title, author}
  console.log(songData);

  postSong(songData)

  form.reset();
});

const loadSongs = async () => {
    const songs = await getSongs();
    const firstSong = Object.values(songs)[0]
    console.log(firstSong);

    // You can now work with 'songs' and 'firstSong' here

    // Example: Adding the first song to the list
    if (firstSong) {
        addSongToList(firstSong);
    }
};
const addSongToList = ({author, title, user}) =>{
    let songLi = document.createElement('li')
    let userP = document.createElement('p')
    let songNameP = document.createElement('p')
    let bandNameP = document.createElement('p')
    userP.innerText = `Creado por ${user}`
    songNameP.innerText = `${title}`
    bandNameP.innerText = `${author}`

    let favoriteButton = document.createElement("button")
    let deleteButton = document.createElement("button")
    favoriteButton.classList.add("btn-primary")
    deleteButton.classList.add("btn-danger")
    favoriteButton.innerText = "Agregar a favoritos"
    deleteButton.innerText = "Eliminar"

    songLi.classList.add("flex", "gap-4", "text-white", "items-center")

    songLi.append(userP, songNameP, bandNameP, favoriteButton, deleteButton)
    songsList.append(songLi)
}


loadSongs()
    
