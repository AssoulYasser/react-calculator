import './App.css';
import './style.css'

function App() {
  return (
    <div className="Calculator">

    <div className='output'>
      <div className='operation'>10+17</div>
      <div className='result'>27</div>
    </div>

    <button className='top'>C</button>
    <button className='top'>+/-</button>
    <button className='top'>%</button>
    <button className='operator'>/</button>
    <button className='number'>7</button>
    <button className='number'>8</button>
    <button className='number'>9</button>
    <button className='operator'>*</button>
    <button className='number'>4</button>
    <button className='number'>5</button>
    <button className='number'>6</button>
    <button className='operator'>-</button>
    <button className='number'>1</button>
    <button className='number'>2</button>
    <button className='number'>3</button>
    <button className='operator'>+</button>
    <button className='number'>.</button>
    <button className='number'>0</button>
    <button className='number'>DEL</button>
    <button className='operator'>=</button>

    </div>
  );
}

export default App;
