const Slider = () => {
  return (
    <div>
      <input type="range" min="1" max="100" defaultValue="100" />
    </div>
  );
};

const Filter = () => {
  return (
    <div>
      <Slider />
    </div>
  );
};

export default Filter;
