import React, {useEffect, useState } from 'react'
import './theme.css'

const ThemeGenerator: React.FC = () => {
    const [colorPalette, setColorPalette] = useState<string[]>([]);
    const [designStyle, setDesignStyle] = useState<string>("");
    const [savedThemes, setSavedThemes] = useState<string[]>([]);
    // const [colorSelected, setSelectedColor] = useState<string>("");
  
    useEffect(() => {
      loadSavedThemes();
    }, [])
  
    const getRandomHexColor = () => {
      let hexColor = '#';
      const baseHexColorCode = '0123456789ABCDEF';
      for (let i = 0; i < 6; i++) {
        hexColor += baseHexColorCode[Math.floor(Math.random() * 16)];
      }
      return hexColor;
    }
  
    const generateColorPalette = () => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        let randomColor = getRandomHexColor();
        colors.push(randomColor);
      }
      setColorPalette(colors);
    }
  
    const generateDesign = () => {
      const designStyles = ["vintage", "futuristic", "minimalistic"];
      const n = designStyles.length;
      let randomDesign = designStyles[Math.round(Math.random() * n)];
      setDesignStyle(randomDesign);
    }
  
    const saveThemes = () => {
      try {
        const data = localStorage.getItem("savedThemes");
        console.log("data", data);
        const saveThemes = data ? JSON.parse(data) : [];
        const newTheme = { colorPalette, designStyle };
        const updatedThemes = [...saveThemes, newTheme];
        localStorage.setItem("savedThemes", JSON.stringify(updatedThemes));
        setSavedThemes(updatedThemes);
      } catch (error) {
        console.log("Error occured!");
      }
    }
  
    console.log("saved items ", savedThemes);
  
    const loadSavedThemes = () => {
      const savedThemesData = localStorage.getItem('savedThemes');
      const savedThemes = savedThemesData ? JSON.parse(savedThemesData) : [];
      setSavedThemes(savedThemes);
    };
  
    const clearSavedThemes = () => {
      localStorage.removeItem('savedThemes');
      setSavedThemes([]);
    };
  
    return (
      <div className="container">
        <div className="theme_container">
          <button onClick={generateColorPalette}>Generate Pallete</button>
          <div className="color_palette">
            {colorPalette.map((color, index) => {
              return (
                <div
                  // onMouseDown={selectedColor(color)}
                  className="palette"
                  style={{ backgroundColor: `${color}` }}
                  key={index}
                >
                </div>
              )
            })}
          </div>
        </div>
  
        <div className="theme_container">
          <button onClick={generateDesign}>Generate Style</button>
          <div className='design_style'>
            {designStyle}
          </div>
        </div>
  
        <div className="theme_container">
          <button onClick={saveThemes}>Save Theme</button>
          <div>
            {savedThemes.map((theme, index) => (
              (
                // <>
                <div key={index}>
                  <div>Color Palette</div>
                  <div className="color_palette">
                    {colorPalette.map((color, index) => {
                      return (
                        <div
                          className="palette"
                          style={{ backgroundColor: `${color}` }}
                          key={index}
                        >
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <div>Design Style</div>
                    {designStyle}
                  </div>
                </div>
                // </>
              )
            ))}
          </div>
        </div>
        <div className="theme_container">
          <button onClick={clearSavedThemes}>Clear Saved</button>
        </div>
      </div>
    )
}

export default ThemeGenerator;