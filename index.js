const form = document.querySelector(".search-form");
form.addEventListener("submit", gererSoumettre);

function gererSoumettre(e) {
  e.preventDefault();
  let meta = document.querySelector(".search-input").value;
  getResults(meta);
}

function getResults(meta) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=10&utf8=&format=json&srsearch=>${meta}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      putResults(data.query.search);
      console.log(data);
    })

    .catch((e) => console.log(`ERROR : ${e}`));
}

function putResults(sResults) {
  const searchResults = document.querySelector(".results");
  searchResults.textContent = "";
  sResults.forEach((result) => {
    const url = encodeURI(`https://en.wikipedia.org/wiki/>${result.title}`);

    searchResults.innerHTML += `<div class="result">
      <h3 class="result-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
      </h3>
      <span class="result-snippet">${result.snippet}</span><br>
      <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
      <p>${result.timestamp}</p>
    </div>`;
  });
}
