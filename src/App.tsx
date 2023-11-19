import Plot from "react-plotly.js";
import "./App.css";

function App() {
  return (
    <main>
      <section className="plotContainer">
        <CandyPlot />
      </section>
    </main>
  );
}

const candyList = [
  "100 Grand",
  "Gum Drops",
  "Gummy Bears",
  "Heath Bar",
  "Hershey's",
  "KitKat",
  "Lollipops",
  "Mike + Ike",
  "Resses",
  "Skittles",
  "Snickers",
  "Sour Patch",
  "Swedish Fish",
  "Twix",
  "Whoppers",
  "3 Musketeers",
  "Jolly Rancher",
  "Milk Duds",
  "Ring Pop",
  "Smarties",
  "Sour Gummy Worms",
  "Tootsie Rolls",
  "War Heads",
];

const candy2023 = {
  x: candyList,
  y: [1, 1, 1, 1, 2, 5, 5, 1, 5, 3, 2, 4, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
};

const candy2022 = {
  x: candyList,
  y: [0, 0, 0, 0, 6, 6, 6, 1, 3, 1, 3, 2, 0, 2, 4, 1, 3, 1, 1, 5, 2, 1, 1],
};

const total2023 = candy2023.y.reduce((a, b) => a + b, 0);
const total2022 = candy2022.y.reduce((a, b) => a + b, 0);

function CandyPlot() {
  const urlParams = new URLSearchParams(window.location.search);
  const isNormalized = urlParams?.get("normalized") === "1";

  const template = (year: number) =>
    `<b>%{x} (${year})</b><br>` +
    (isNormalized ? " %{y:.1f}%" : " %{y} votes") +
    "<br>" +
    "<extra></extra>";

  return (
    <>
      <Plot
        config={{ responsive: true }}
        data={[
          {
            type: "bar",
            name: `2023 (${total2023} votes)`,
            x: candy2023.x,
            y: isNormalized
              ? candy2023.y.map((x) => (100 * x) / total2023)
              : candy2023.y,
            hovertemplate: template(2023),
          },
          {
            type: "bar",
            name: `2022 (${total2022} votes)`,
            x: candy2022.x,
            y: isNormalized
              ? candy2022.y.map((x) => (100 * x) / total2022)
              : candy2022.y,
            hovertemplate: template(2022),
          },
        ]}
        layout={{
          title: "East Side of PVD Favorite Candy (last 2 years)",
          yaxis: {
            title: isNormalized ? "Percent of Votes (%)" : "Number of Votes",
          },
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.search = isNormalized ? "" : "normalized=1";
        }}
      >
        {isNormalized ? "Total Votes" : "Percent"}
      </button>
    </>
  );
}

export default App;
