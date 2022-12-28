import React, { FC, ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type FilterContextType = {
  isRedChecked: boolean;
  isGreenChecked: boolean;
  isBlueChecked: boolean;
  isSaturationChecked: boolean;
  changeRedValue: () => void;
  changeGreenValue: () => void;
  changeBlueValue: () => void;
  changeSaturationValue: () => void;
};

export const FilterContext = createContext<FilterContextType>({
  isRedChecked: false,
  isGreenChecked: false,
  isBlueChecked: false,
  isSaturationChecked: false,
  changeRedValue: () => {},
  changeGreenValue: () => {},
  changeBlueValue: () => {},
  changeSaturationValue: () => {},
});

export const FilterContextProvider: FC<Props> = ({ children }) => {
  const [isRedChecked, setIsRedChecked] = useState<boolean>(false);
  const [isGreenChecked, setIsGreenChecked] = useState<boolean>(false);
  const [isBlueChecked, setIsBlueChecked] = useState<boolean>(false);
  const [isSaturationChecked, setIsSaturationChecked] =
    useState<boolean>(false);

  const changeRedValue = () => {
    setIsRedChecked((state) => !state);
  };
  const changeGreenValue = () => {
    setIsGreenChecked((state) => !state);
  };
  const changeBlueValue = () => {
    setIsBlueChecked((state) => !state);
  };
  const changeSaturationValue = () => {
    setIsSaturationChecked((state) => !state);
  };
  

  return (
    <FilterContext.Provider
      value={{
        isRedChecked: isRedChecked,
        isGreenChecked: isGreenChecked,
        isBlueChecked: isBlueChecked,
        isSaturationChecked: isSaturationChecked,
        changeRedValue: changeRedValue,
        changeGreenValue: changeGreenValue,
        changeBlueValue: changeBlueValue,
        changeSaturationValue: changeSaturationValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
