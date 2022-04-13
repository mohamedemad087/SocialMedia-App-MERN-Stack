import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    zIndex: "1000",
    fontSize: "40px",
    position: "fixed",
    left: "50%",
    top: "50%",
    backgroundColor: "rgba(0,0,0, .8)",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  }
}));
