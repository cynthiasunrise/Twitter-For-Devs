import './ColorPicker.css';

function ColorPicker() {
  return (
    <div className="color-picker">
      <label>
        <input type="radio" name="color" />
        <span className="red"></span>
      </label>

      <label>
        <input type="radio" name="color" />
        <span className="orange"></span>
      </label>

      <label>
        <input type="radio" name="color" />
        <span className="yellow"></span>
      </label>

      <label>
        <input type="radio" name="color" />
        <span className="green"></span>
      </label>

      <label>
        <input type="radio" name="color" />
        <span className="blue"></span>
      </label>

      <input type="radio" name="color" id="purple" />
      <label htmlFor="purple">
        <span className="purple"></span>
      </label>
    </div>
  );
}

export default ColorPicker;
