const colors = new Map();
colors.set("LaRioja", { icon: "#c0cb01", text: "rgba(192, 203, 1, 0.8)" });
colors.set("Olive", { icon: "#7c8c03", text: "rgba(124, 140, 3, 0.8)" });
colors.set("FreeSpeechRed", {
  icon: "#db1010",
  text: "rgba(219, 16, 16, 0.8)",
});
colors.set("SteelBlue", { icon: "#5388b4", text: "rgba(83, 136, 180, 0.8)" });
colors.set("VerdunGreen", { icon: "#465902", text: "rgba(70, 89, 2, 0.8)" });

const Button = (props) => {
  return (
    <button
      type={props.submit ? "submit" : null}
      style={{ marginRight: props.marginRight ? props.marginRight : "0em" }}
      onClick={props.onClick ? props.onClick : null}
    >
      <span
        style={{ backgroundColor: colors.get(props.color).icon }}
        className="button-icon"
      >
        {props.icon}
      </span>
      <span
        style={{ backgroundColor: colors.get(props.color).text }}
        className="button-text"
      >
        {props.text}
      </span>
    </button>
  );
};

export default Button;
