let teams = JSON.parse(localStorage.getItem("teams")) || [];

function saveTeams() {
  localStorage.setItem("teams", JSON.stringify(teams));
}

function render() {
  const container = document.getElementById("teams");
  container.innerHTML = "";

  teams.forEach((team, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${team.name}</h2>
      <form onsubmit="addPlayer(event, ${i})">
        <input type="text" id="playerName${i}" placeholder="Name" required />
        <input type="text" id="playerPosition${i}" placeholder="Position" required />
        <input type="number" id="playerNumber${i}" placeholder="Number" required />
        <input type="number" id="playerGoals${i}" placeholder="Goals" />
        <input type="number" id="playerAssists${i}" placeholder="Assists" />
        <input type="number" id="playerPoints${i}" placeholder="Points" />
        <input type="number" id="playerGames${i}" placeholder="Games Played" />
        <input type="text" id="playerPhoto${i}" placeholder="Photo URL" />
        <button type="submit">Add Player</button>
      </form>
      <ul>
        ${team.players
          .map(
            (p) => `
          <li>
            <strong>#${p.number} ${p.name}</strong> - ${p.position}<br/>
            G: ${p.goals}, A: ${p.assists}, P: ${p.points}, GP: ${p.games}
            ${p.photo ? `<br/><img src="${p.photo}" alt="${p.name}"/>` : ""}
          </li>
        `
          )
          .join("")}
      </ul>
    `;
    container.appendChild(div);
  });

  document.getElementById("teamForm").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("teamName").value.trim();
    if (!name) return;
    teams.push({ name, players: [] });
    document.getElementById("teamName").value = "";
    saveTeams();
    render();
  };
}

function addPlayer(e, teamIndex) {
  e.preventDefault();
  const name = document.getElementById(`playerName${teamIndex}`).value;
  const position = document.getElementById(`playerPosition${teamIndex}`).value;
  const number = document.getElementById(`playerNumber${teamIndex}`).value;
  const goals = document.getElementById(`playerGoals${teamIndex}`).value || 0;
  const assists = document.getElementById(`playerAssists${teamIndex}`).value || 0;
  const points = document.getElementById(`playerPoints${teamIndex}`).value || 0;
  const games = document.getElementById(`playerGames${teamIndex}`).value || 0;
  const photo = document.getElementById(`playerPhoto${teamIndex}`).value;

  teams[teamIndex].players.push({
    name,
    position,
    number,
    goals,
    assists,
    points,
    games,
    photo,
  });

  saveTeams();
  render();
}

render();
