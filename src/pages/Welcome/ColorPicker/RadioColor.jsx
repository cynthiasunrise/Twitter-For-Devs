function RadioColor({ color, onChange, checked }) {
  return (
    <>
      <input
        type="radio"
        name="color"
        id={color}
        value={color}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={color}>
        <span className={color}></span>
      </label>
    </>
  );
}

export default RadioColor;
