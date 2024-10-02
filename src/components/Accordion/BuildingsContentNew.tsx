import React, {useContext} from 'react'
import {Button, createStyles, makeStyles} from '@material-ui/core';
import {AOAccordion, AOAccordionLink} from './AOAccordion';
import {getEnergyEfficiencyColor} from "../../map/layers/buildings/utils";
import {UserContext} from "../User";
import {StateContext} from "../State";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    legendBox: {
      backgroundColor: (props: any) => props.color,
      border: "1px solid black",
      width: "1rem",
      height: "1rem",
      padding: 5,
      margin: "0 5px -2px 0",
      display: "inline-block",
    },
    dataButton: {
      margin: "16px 16px 16px 16px",
      fontSize: 14,
    },
  }),
);


const BuildingsContentNew = () => {
  const classes = useStyles({});

  const { isLoggedIn }: any = useContext(UserContext);
  const { setProfileState, setIsProfileOpen }: any = useContext(StateContext);

  const handleClick = () => {
    setProfileState("building");
    setIsProfileOpen("true");
  };

  return (<div className={classes.root}>
    <AOAccordionLink
      href="/layers/fi-buildings/"
      label={"Building details"}
    />
    <AOAccordion groupName={'buildings--energy-efficiency-class'} label={"Energy Efficiency Class"} content={<EnergyEfficiencyClassContent/>} />
    {isLoggedIn && (
      <Button
        variant="contained"
        color="secondary"
        className={classes.dataButton}
        onClick={handleClick}
      >
        Manage own building
      </Button>
    )}
  </div>);
}

const LegendBox = (props) => {
  const classes = useStyles({ color: props.color });
  return (
    <span>
      <span className={classes.legendBox}></span>
      {props.title}
    </span>
  );
};

const EnergyEfficiencyClassContent = () => (
  <div>
    <legend
      id="building-efficiency-class"
      style={{ display: "flex", flexDirection: "column", padding: "6px 0 0 0" }}
    >
      <LegendBox color={getEnergyEfficiencyColor("A")} title="A" />
      <LegendBox color={getEnergyEfficiencyColor("B")} title="B" />
      <LegendBox color={getEnergyEfficiencyColor("C")} title="C" />
      <LegendBox color={getEnergyEfficiencyColor("D")} title="D" />
      <LegendBox color={getEnergyEfficiencyColor("E")} title="E" />
      <LegendBox color={getEnergyEfficiencyColor("F")} title="F" />
      <LegendBox color={getEnergyEfficiencyColor("G")} title="G" />
      <LegendBox color='white' title="Estimated energy efficiency class" />
    </legend>
  </div>
);

export default BuildingsContentNew
