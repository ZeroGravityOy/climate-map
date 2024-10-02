import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {useContext} from "react";
import {UserContext} from "../User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "800px",
      minWidth: "800px",
      width: "100%",
    },
    columns: {
      display: "flex",
      flexDirection: "row",
      alignItems: "top",
      margin: "20px 0 0 0",
      width: "100%",
    },
    profileIcon: {
      margin: "20px 0 0 0",
      fontSize: "2.5rem",
    },
    userName: {},
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      width: "50%",
    },
    greyInfoBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      width: "33%",
      margin: "5px",
      padding: "5px",
      backgroundColor: "#EEEEEE"
    },
    greenInfoBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      width: "100%",
      margin: "20px 0 0 0",
      backgroundColor: "#C7DAD5"
    },
    header2: {
      margin: "20px 0 0 0",
    },
    header3: {
      margin: "20px 0 0 0",
    },
    paragraph: {
      margin: "0 0 0 0",
    },
    spacedParagraph: {
      margin: "5px",
    }
  })
);

const OwnBuilding = () => {
  const classes = useStyles({});
  const { userProfile }: any = useContext(
    UserContext
  );

  return (
    <div className={classes.root}>
      <div className={classes.columns}>
        <div className={classes.content}>
          <h2 className={classes.header2}>BUILDING INFO</h2>

          <h3 className={classes.header3}>Building name</h3>
          <p className={classes.paragraph}>Building name</p>

          <h3 className={classes.header3}>Address</h3>
          <p className={classes.paragraph}>Street 123, 00001 Helsinki</p>

          <h3 className={classes.header3}>Property ID</h3>
          <p className={classes.paragraph}>12-3-45-6</p>

          <h3 className={classes.header3}>Type of building</h3>
          <p className={classes.paragraph}>Apartment building with residential apartments</p>

          <h3 className={classes.header3}>Year of construction</h3>
          <p className={classes.paragraph}>1980</p>

          <h3 className={classes.header3}>Heated surface area (m2)</h3>
          <p className={classes.paragraph}>12000</p>

          <h3 className={classes.header3}>Heated volume (m3)</h3>
          <p className={classes.paragraph}>12300</p>

          <h3 className={classes.header3}>Energy efficiency class + date</h3>
          <p className={classes.paragraph}>A 2023</p>

          <h3 className={classes.header3}>Number of inhabitants</h3>
          <p className={classes.paragraph}>87</p>
        </div>
        <div className={classes.content}>
          <img src={"/img/sampleBuilding.png"}/>
          <div className={classes.greenInfoBox}>
            <p className={classes.spacedParagraph}>Kuluneen vuoden kulutus</p>
            <p className={classes.spacedParagraph}>Taloyhtiössä on maalämpö</p>
            <p className={classes.spacedParagraph}>Taloyhtiössä ei ole aurinkoenergiaa</p>
            <p className={classes.spacedParagraph}>Taloyhtiössä ei varastoida energiaa</p>
          </div>
        </div>
      </div>
      <div className={classes.columns}>
        <div className={classes.greyInfoBox}>
          <h2 className={classes.header2}>FORM OF HEATING</h2>

          <h3 className={classes.header3}>District heating</h3>
          <p className={classes.paragraph}>Yes</p>

          <h3 className={classes.header3}>Other (What?)</h3>
          <p className={classes.paragraph}>Oil</p>
        </div>
        <div className={classes.greyInfoBox}>
          <h2 className={classes.header2}>FORM OF COOLING</h2>

          <h3 className={classes.header3}>No options for cooling</h3>
        </div>
        <div className={classes.greyInfoBox}>
          <h2 className={classes.header2}>AIR EXCHANGE</h2>

          <h3 className={classes.header3}>Painovoimainen ilmanvaihto</h3>
          <p className={classes.paragraph}>Kyllä</p>
        </div>
      </div>
      <div className={classes.columns}>

        <div className={classes.content}>
          <h2 className={classes.header2}>RENOVATIONS</h2>

          <h3 className={classes.header3}>Exterior renovations</h3>
          <p className={classes.paragraph}>Yes</p>

          <h3 className={classes.header3}>Insulation of roof</h3>
          <p className={classes.paragraph}>56 mm</p>
        </div>
        <div className={classes.content}>
          <h2 className={classes.header2}>CONTACT DETAILS</h2>

          <h3 className={classes.header3}>Contact person</h3>
          <p className={classes.paragraph}>{userProfile.name}</p>

          <h3 className={classes.header3}>Email</h3>
          <p className={classes.paragraph}>{userProfile.email}</p>
        </div>
      </div>
    </div>
  )
};

export default OwnBuilding;
