import { useState, FC, useEffect } from "react";
import ColorFilter from "./ColorFilter/ColorFilter";
import ColorList from "./ColorList/ColorList";
import "./SecondForm.scss";

type Props = {
  colors?: (string | null)[];
  isUpdate?: boolean;
  onUpdateColors: (elements: (string | null)[]) => void;
};

const SecondForm: FC<Props> = ({ colors, isUpdate, onUpdateColors }) => {
  const [colorList, setColorList] = useState<(string | null)[]>();

  useEffect(() => {
    setColorList(colors);
  }, [isUpdate]);

  const removeColorHandler = (element: string) => {
    const updatedColors = colorList?.filter((color) => color !== element);
    setColorList(updatedColors);
    localStorage.setItem("colors", JSON.stringify(updatedColors));
    onUpdateColors(updatedColors!);
  };

  return (
    <section className="secondForm-container">
      <h2 className="secondForm-heading">Colors filter</h2>
      <ColorFilter />
      <ColorList colors={colorList} onRemoveColor={removeColorHandler} isUpdate={isUpdate}/>
    </section>
  );
};

export default SecondForm;
