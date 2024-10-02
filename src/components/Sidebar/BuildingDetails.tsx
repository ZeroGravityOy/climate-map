import {NavLink} from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useEffect} from "react";
import {Container, Paper, TableCell} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import * as LayerGroupState from "../../map/LayerGroupState";
import {genericPopupHandler} from "../../map/map";
import {GeoJsonProperties} from "geojson";
import {observable, useObservable} from "micro-observables";

const LAYER_ID = "hel-energy-efficiency-class-fill";
const GROUP_ID = "buildings--energy-efficiency-class";

const selectedBuilding = observable<GeoJsonProperties>([]);

genericPopupHandler(LAYER_ID, (ev) => {
  if(ev.features && ev.features.length>0) {
    selectedBuilding.set(ev.features[0].properties);
  } else {
    selectedBuilding.set(null);
  }
});

function BuildingInformation() {
  const building = useObservable(selectedBuilding.readOnly());

  console.log(building)
  if(!building) {
    return (<Paper>
      <p>"Zoom in to Helsinki and click a building for detailed report"</p>
    </Paper>)
  }
  const propertyId = building.kiinteistötunnus
    ? (<div>Property ID: <b>{building.kiinteistötunnus}</b><br/></div>)
    : (<></>);

  return (
    <Container>
      <Paper>
        <b>{building["rakennuksen_nimi"]}</b><br/>
        {propertyId}
        Building Type: <b>{building.rakennusluokka}</b><br/>
        Year of construction: <b>{building.rakennuksen_valmistumisvuosi}</b><br/>
        Heated surface area: <b>{building.lämmitetty_nettoala}</b><br/>
        Energy Efficiency Class: <b>{building.e_luokka} ${building.versio}</b><br/>
        Heating Type: <b>{building.lämmitysjärjestelmän_kuvaus}</b><br/>
      </Paper>
    </Container>
  );
}

export default function BuildingDetails() {
  useEffect(() => {
    LayerGroupState.setGroupState(GROUP_ID, true);
  }, [])

  return (
    <div
      className={"grid-parent grid-parent-report-closed"}
    >
      <Paper className="grid-col1" elevation={5}>
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <NavLink to="/" className="neutral-link" style={{ display: "flex" }}>
                      <ExpandMoreIcon style={{ transform: "rotate(90deg)" }} />
                      Building details
                    </NavLink>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <br />
          <BuildingInformation/>
        </Container>
      </Paper>
    </div>
  );
}
