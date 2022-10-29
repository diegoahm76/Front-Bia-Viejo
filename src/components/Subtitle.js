const Subtitle = ({ title, mt, mb }) => {
  return (
    <div
      className={`col-12 col-sm-12 border rounded-pill px-3 mt-${mt} mb-${mb}`}
      style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}
    >
      <h5 className="font-weight-bolder my-2 text-light">{title}</h5>
    </div>
  );
};
export default Subtitle;
