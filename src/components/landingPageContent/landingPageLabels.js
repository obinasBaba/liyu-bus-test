const LandingPageLabels = ({ label, onClick }) => {
  return (
    <label
      className="uppercase text-6xl font-extrabold"
      style={{
        fontWeight: 900,
      }}
    >
      {label}
    </label>
  );
};

export default LandingPageLabels;
