const form = document.getElementById("songForm");
const deleteButton = document.getElementById("delete");
const songsList = document.getElementById("songsList");
const url =
  "https://javascript30g-default-rtdb.asia-southeast1.firebasedatabase.app/songList/.json";

const postSong = async (song) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(song),
  });
  const data = await response.json();
  console.log({ data });
};

const getSongs = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log({ data });
  return data;
};

const deleteSong = async (key) => {
  console.log(`deleting song ${key}`);
  const url = `https://javascript30g-default-rtdb.asia-southeast1.firebasedatabase.app/songList/${key}/.json`;

  const response = await fetch(url, { method: "DELETE" });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the form inputs
  const user = document.getElementById("name").value;
  const title = document.getElementById("songName").value;
  const author = document.getElementById("intérprete").value;
  const songData = { user, title, author };
  console.log(songData);

  await postSong(songData);
  loadSongs();

  form.reset();
});

const loadSongs = async () => {
  const songs = await getSongs();
  const songsArray = Object.keys(songs).map((key) => ({ ...songs[key], key }));
  console.log(songsArray);
  songsList.innerHTML = "";

  if (songsArray) {
    songsArray.forEach((song) => addSongToList(song));
  }
};

const addSongToList = ({ author, title, user, key }) => {
  let songLi = document.createElement("li");
  let userP = document.createElement("p");
  let songNameP = document.createElement("p");
  let bandNameP = document.createElement("p");
  userP.innerText = `${user}`;
  userP.classList.add("min-w-[80px]", "text-center", "max-w-[80px]");
  songNameP.innerText = `${title}`;
  songNameP.classList.add("min-w-[155px]", "text-center", "max-w-[155px]");
  bandNameP.innerText = `${author}`;
  bandNameP.classList.add("min-w-[70px]", "text-center", "max-w-[70px]");

  let favoriteButton = document.createElement("button");
  favoriteButton.classList.add("btn-primary");
  favoriteButton.innerText = "Agregar a favoritos";

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-danger");
  deleteButton.innerText = "Eliminar";
  deleteButton.addEventListener("click", async () => {
    await deleteSong(key);
    loadSongs();
  });

  songLi.classList.add(
    "flex",
    "gap-4",
    "text-white",
    "items-center",
    "justify-between"
  );

  songLi.append(userP, songNameP, bandNameP, favoriteButton, deleteButton);
  songsList.append(songLi);
};

loadSongs();
