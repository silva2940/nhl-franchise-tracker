const app = document.getElementById("root");
let teams = [];

function render() {
  app.innerHTML = `
    <h1>Franchise Tracker</h1>
    <form id="teamForm">
      <input type="text" id="teamName" placeholder="Enter team name" required />
      <button type="submit">Add Team</button>
    </form>
    <div id="teams">
      ${teams
        .map(
          (team, i) => `
        <div>
          <h2>${team.name}</h2>
          <form onsubmit="addPlayer(event, ${i})">
            <input type="text" placeholder="Name" id="playerName${i}" required />
            <input type="text" placeholder="Position" id="playerPosition${i}" required />
            <input type="number" placeholder="Number" id="playerNumber${i}" required />
            <input type="number" placeholder="Goals" id="playerGoals${i}" />
            <input type="number" placeholder="Assists" id="playerAssists${i}" />
            <input type="number" placeholder="Points" id="playerPoints${i}" />
            <input type="number" placeholder="Games Played" id="playerGames${i}" />
            <input type="text" placeholder="Photo URL" id="playerPhoto${i}" />
            <button type="submit">Add Player</button>
          </form>
          <ul>
            ${team.players
              .map(
                (p) => `
              <li>
                <strong>#${p.number} ${p.name}</strong> - ${p.position}<br/>
                G: ${p.goals}, A: ${p.assists}, P: ${p.points}, GP: ${p.games}
                ${p.photo ? `<br/><img src="${p.photo}" alt="${p.name}" width="100"/>` : ""}
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  document.getElementById("teamForm").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("teamName").value;
    teams.push({ name, players: [] });
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

  render();
}

render();
