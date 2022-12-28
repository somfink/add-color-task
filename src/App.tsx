import { useEffect, useState } from "react";
import "./App.scss";
import FirstForm from "./components/FirstForm/FirstForm";
import SecondForm from "./components/SecondForm/SecondForm";

const App = () => {
  let storageData: string[] = JSON.parse(localStorage.getItem("colors")!);
  const [colors, setColors] = useState<(string | null)[]>(
    storageData ? storageData : []
  );
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    storageData = JSON.parse(localStorage.getItem("colors")!);
  }, [update]);

  const updateColorsList = (elements: (string | null)[]) => {
    setColors(elements);
    setUpdate(true);
    setTimeout(() => {
      setUpdate(false);
    }, 100);
  };

  return (
    <main className="App">
      <FirstForm colors={colors} onUpdateColors={updateColorsList} />
      <SecondForm
        colors={colors}
        isUpdate={update}
        onUpdateColors={updateColorsList}
      />
    </main>
  );
};

export default App;
