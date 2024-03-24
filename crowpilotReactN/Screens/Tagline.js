import { Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import { StylesContext } from '../Contexts/ThemeContext.js';

export default function Tagline () {

const {styles} = useContext(StylesContext)

const taglineArray = [
    "Broaden your horizons",
    "Change your perspective",
    "Elevate your view"
];

const [activeTagline, setActiveTagline] = useState(`${taglineArray[0]}`);

let current = 0;

useEffect(() => {
  const taglineCycler = () => {
    if (current === 2) {
      current = 0;
    } else {
      current += 1;
    }
    setActiveTagline(taglineArray[current]);
  };
  const intervalId = setInterval(() => {
    taglineCycler();
  }, 10000);
  return () => clearInterval(intervalId);
}, []);


return (
  <>
     <Text className = {styles.tagline}>{activeTagline}</Text>
      </>
)
}

