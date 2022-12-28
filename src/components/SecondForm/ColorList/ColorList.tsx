import { FC, useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/FilterContext";
import "./ColorList.scss";

type Props = {
  colors?: (string | null)[];
  onRemoveColor: (color: string) => void;
  isUpdate?: boolean;
};

const PREDEFINED_COLORS = [
  { name: "red", hex: "#FF0000" },
  { name: "green", hex: "#00FF00" },
  { name: "blue", hex: "#0000FF" },
  { name: "white", hex: "#FFFFFF" },
  { name: "black", hex: "#000000" },
];

const ColorList: FC<Props> = ({ colors, onRemoveColor, isUpdate }) => {
  const [sortedColors, setSortedColors] = useState<(string | null)[]>();
  const { isRedChecked, isGreenChecked, isBlueChecked, isSaturationChecked } =
    useContext(FilterContext);

  const convertHexToRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const convertRGBToHex = (r: number, g: number, b: number) => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const calculateSaturation = (r: number, g: number, b: number) => {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    }
    return { r, g, b, s: Math.round(s * 100) };
  };

  const convertedRGBColors = colors?.map((color) => convertHexToRGB(color!));
  const sortedRGBColors = convertedRGBColors?.sort(
    (a, b) => b.r - a.r || b.g - a.g || b.b - a.b
  );
  const convertedHexColors = sortedRGBColors?.map((color) =>
    convertRGBToHex(color.r, color.g, color.b)
  );

  useEffect(() => {
    if (isRedChecked) {
      setSortedColors((prevState) => {
        const convertedColors = prevState?.map((color) =>
          convertHexToRGB(color!)
        );
        const moreThanFiftyRed = convertedColors?.filter((el) => el.r > 127);
        return moreThanFiftyRed?.map((color) =>
          convertRGBToHex(color.r, color.g, color.b)
        );
      });
    }
    if (isGreenChecked) {
      setSortedColors((prevState) => {
        const convertedColors = prevState?.map((color) =>
          convertHexToRGB(color!)
        );
        const moreThanFiftyGreen = convertedColors?.filter((el) => el.g > 127);
        return moreThanFiftyGreen?.map((color) =>
          convertRGBToHex(color.r, color.g, color.b)
        );
      });
    }

    if (isBlueChecked) {
      setSortedColors((prevState) => {
        const convertedColors = prevState?.map((color) =>
          convertHexToRGB(color!)
        );
        const moreThanFiftyBlue = convertedColors?.filter((el) => el.b > 127);
        return moreThanFiftyBlue?.map((color) =>
          convertRGBToHex(color.r, color.g, color.b)
        );
      });
    }

    if (isSaturationChecked) {
      setSortedColors((prevState) => {
        const convertedColors = prevState?.map((color) =>
          convertHexToRGB(color!)
        );
        const colorsWithSaturation = convertedColors?.map((el) =>
          calculateSaturation(el.r, el.g, el.b)
        );
        const moreThanFiftySaturation = colorsWithSaturation?.filter(
          (el) => el.s > 50
        );
        return moreThanFiftySaturation?.map((color) =>
          convertRGBToHex(color.r, color.g, color.b)
        );
      });
    }

    if (
      !isRedChecked &&
      !isGreenChecked &&
      !isBlueChecked &&
      !isSaturationChecked
    ) {
      setSortedColors(convertedHexColors);
    }
  }, [
    isRedChecked,
    isGreenChecked,
    isBlueChecked,
    isSaturationChecked,
    isUpdate,
  ]);

  return (
    <>
      <div className="color-container">
        <h3 className="color-container__heading">Basic Colors:</h3>
        <ul className="color-list">
          {PREDEFINED_COLORS.map((color) => (
            <li className="color-item" key={color.hex}>
              <div className="color-box" data-color={color.name}></div>
              <span className="color-name">{color.hex}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="color-container">
        <h3 className="color-container__heading">Added Colors:</h3>
        <ul className="color-list">
          {!sortedColors &&
            convertedHexColors?.map((color) => (
              <li key={color} className="color-item">
                <div
                  className="color-box"
                  style={{ backgroundColor: `${color}` }}
                  onClick={() => {
                    onRemoveColor(color!);
                  }}
                />
                <span className="color-name">{color?.toUpperCase()}</span>
              </li>
            ))}
          {sortedColors &&
            sortedColors.map((color) => (
              <li key={color} className="color-item">
                <div
                  className="color-box"
                  style={{ backgroundColor: `${color}` }}
                  onClick={() => {
                    onRemoveColor(color!);
                  }}
                />
                <span className="color-name">{color?.toUpperCase()}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ColorList;
