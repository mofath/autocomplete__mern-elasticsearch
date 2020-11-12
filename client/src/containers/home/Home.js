import classes from "./Home.module.css";

function HomeScreen() {
  return (
    <div className={[classes.HomeScreen, "screen"].join(" ")}>
      <aside></aside>
      <main className="vertical-layout"></main>
    </div>
  );
}

export default HomeScreen;
