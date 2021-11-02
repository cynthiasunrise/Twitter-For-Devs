import './ColorPicker.css';
import RadioColor from './RadioColor';

function ColorPicker({ value, onChange }) {
  return (
    <div className="color-picker">
      <RadioColor color="red" onChange={onChange} checked={value === 'red'} />
      <RadioColor
        color="orange"
        onChange={onChange}
        checked={value === 'orange'}
      />
      <RadioColor
        color="yellow"
        onChange={onChange}
        checked={value === 'yellow'}
      />
      <RadioColor
        color="green"
        onChange={onChange}
        checked={value === 'green'}
      />
      <RadioColor color="blue" onChange={onChange} checked={value === 'blue'} />
      <RadioColor
        color="purple"
        onChange={onChange}
        checked={value === 'purple'}
      />
    </div>
  );
}

export default ColorPicker;
