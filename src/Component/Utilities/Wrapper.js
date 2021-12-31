const Wrapper = (props) => {
  return (
    <div
      style={{
        marginTop: "80px",
        backgroundColor: "#faf5f2",
      }}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
