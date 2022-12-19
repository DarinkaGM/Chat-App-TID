import Button from "../components/Button";
import ClearIcon from "@mui/icons-material/Clear";

const MailTag = ({ onClick, text, icon, value }) => {
  return (
    <div className={"tags-container"}>
      <Button
        type="button"
        value={value}
        text={text}
        icon={<ClearIcon sx={{ fontSize: 12 }} />}
        className={"fixed-btn secondary tiny with-icon"}
        onClick={onClick}
      >
        {text} {icon}
      </Button>
    </div>
  );
};

MailTag.defaultProps = {
  icon: <ClearIcon />,
  className: "fluid-btn secondary",
};

export default MailTag;