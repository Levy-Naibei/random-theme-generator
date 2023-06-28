import ThemeGenerator from './ThemeGenerator';
import './main.css';

const Main = () => {
  return (
    <div className="app">
      <h1 className="app-header">Random Theme Generator</h1>
      <ThemeGenerator />
    </div>
  );
};
export default Main;