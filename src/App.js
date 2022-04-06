import "./App.css";
import NavBar from "./Component/Header/NavBar";
import Pagination from "./Component/Pagination/Pagination";
import ItemTable from "./Component/Items/ItemTable";
function App() {
  return (
    <div>
      <NavBar />
      <ItemTable />
      <Pagination />
    </div>
  );
}

export default App;
