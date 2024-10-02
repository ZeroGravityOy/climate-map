import { addSource, addLayer, genericPopupHandler, createPopup } from '../../mapbox_map'
import { fillOpacity, pp } from '../../utils'
import { registerGroup } from '../../layer_groups';
import {getEnergyEfficiencyColor} from "./utils";

const printIcon = `<svg width="7" height="7" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.91732 1.66732C2.91732 1.34515 3.17849 1.08398 3.50065 1.08398H10.5007C10.8228 1.08398 11.084 1.34515 11.084 1.66732V5.16732H11.6673C12.1314 5.16732 12.5766 5.35169 12.9048 5.67988C13.2329 6.00807 13.4173 6.45319 13.4173 6.91732V9.83399C13.4173 10.2981 13.2329 10.7432 12.9048 11.0714C12.5766 11.3996 12.1314 11.584 11.6673 11.584H11.084V13.334C11.084 13.6562 10.8228 13.9173 10.5007 13.9173H3.50065C3.17849 13.9173 2.91732 13.6562 2.91732 13.334V11.584H2.33398C1.86986 11.584 1.42474 11.3996 1.09655 11.0714C0.768359 10.7432 0.583984 10.2981 0.583984 9.83399V6.91732C0.583984 6.45319 0.768359 6.00807 1.09655 5.67988C1.42474 5.35169 1.86986 5.16732 2.33398 5.16732H2.91732V1.66732ZM4.08398 12.7507H9.91732V9.25065H4.08398V12.7507ZM11.084 10.4173V8.66732C11.084 8.34515 10.8228 8.08398 10.5007 8.08398H3.50065C3.17849 8.08398 2.91732 8.34515 2.91732 8.66732V10.4173H2.33398C2.17928 10.4173 2.0309 10.3559 1.92151 10.2465C1.81211 10.1371 1.75065 9.9887 1.75065 9.83399V6.91732C1.75065 6.76261 1.81211 6.61424 1.92151 6.50484C2.0309 6.39544 2.17928 6.33398 2.33398 6.33398H11.6673C11.822 6.33398 11.9704 6.39544 12.0798 6.50484C12.1892 6.61424 12.2507 6.76261 12.2507 6.91732V9.83399C12.2507 9.98869 12.1892 10.1371 12.0798 10.2465C11.9704 10.3559 11.822 10.4173 11.6673 10.4173H11.084ZM9.91732 2.25065V5.16732H4.08398V2.25065H9.91732Z" fill="black"/>
                </svg>`
const energyIcon = `<svg width="7" height="10" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.27451 1L2 11.0847H7.33333L7.05882 18L12 8.20339H7.33333L8.27451 1Z" stroke="#7E968E" stroke-width="1.5"/>
                    </svg>`

addSource('hel-energy-efficiency-class', {
    "type": "vector",
    "tiles": ["https://server.avoin.org/data/map/hel-energiatodistukset/{z}/{x}/{y}.pbf?v=3"],
    "maxzoom": 14,
    // Bounds source: https://koordinates.com/layer/4257-finland-11000000-administrative-regions/
    // select ST_Extent(ST_Transform(ST_SetSRID(geom,3067), 4326))
    // from "finland-11000000-administrative-regions" where kunta_ni1='Helsinki';
    bounds: [24, 59, 26, 61],
    attribution: '<a href="https://www.hel.fi">© City of Helsinki</a>',
});
addLayer({
    'id': 'hel-energy-efficiency-class-fill',
    'source': 'hel-energy-efficiency-class',
    'source-layer': 'energiatodistukset',
    'type': 'fill',
    'paint': {
        'fill-color': [
            'match', ['get', 'e_luokka'],
            'A', '#1F964A',
            'B', '#7DAD46',
            'C', '#CCD040',
            'D', '#FFEA43',
            'E', '#ECB234',
            'F', '#D2621F',
            'G', '#C70016',
            'white',
        ],
        'fill-opacity': fillOpacity,
    },
    BEFORE: 'FILL',
})
addLayer({
    'id': 'hel-energy-efficiency-class-outline',
    'source': 'hel-energy-efficiency-class',
    'source-layer': 'energiatodistukset',
    'type': 'line',
    "minzoom": 11,
    'paint': {
        'line-opacity': 0.75,
    },
    BEFORE: 'OUTLINE',
})

addLayer({
    'id': 'hel-energy-efficiency-class-sym',
    'source': 'hel-energy-efficiency-class',
    'source-layer': 'energiatodistukset',
    'type': 'symbol',
    "minzoom": 14,
    'paint': {},
    "layout": {
        "symbol-placement": "point",
        "text-font": ["Open Sans Regular"],
        "text-size": 20,
        "text-field": [
            "case", ["has", "e_luokka"], ["get", "e_luokka"], ""
        ],
    },
    BEFORE: 'LABEL',
})

genericPopupHandler('hel-energy-efficiency-class-fill', ev => {
    let html = '';
    for (const f of ev.features) {
        const p = f.properties;

        const energyUse = p.e_luku * p.lämmitetty_nettoala
        const propertyId = p.kiinteistötunnus
            ? `Property ID: <b>${p.kiinteistötunnus}</b><br/>`
            : '';

        const url = `https://www.energiatodistusrekisteri.fi/energiatodistus?id=${p.todistustunnus}&versio=${p.versio}`
        html = `
        <p>
        <b style="font-size: 0.875rem">${p.rakennuksen_nimi}</b><br/>
        <a target="_blank" href="${url}" ><u>View report ${printIcon}</u></a>
        <div style="background-color:white;border: 1px solid black; padding: 0.75rem">
            <b style="font-size: 0.875rem">Annual consumption</b><br/>
            <div style="display: flex">
              <div style="
                  display:inline-block;
                  border: 8px solid ${getEnergyEfficiencyColor(p.e_luokka)};
                  border-radius: 50%;
                  font-size: 32px;
                  line-height: 45px; /* set to same size as width, height */
                  width: 64px;
                  height: 64px;
                  text-align: center;
                  margin-right: 1rem">
                  <b>${p.e_luokka}</b>
              </div>
              <div>${energyIcon} ${pp(energyUse)} kWh</div>
            </div>
        </div>
        ${propertyId}
        Building Type: <b>${p.rakennusluokka}</b><br/>
        Year of construction: <b>${p.rakennuksen_valmistumisvuosi}</b><br/>
        Heated surface area: <b>${p.lämmitetty_nettoala}</b><br/>
        Energy Efficiency Class: <b>${p.e_luokka} ${p.versio}</b><br/>
        Heating Type: <b>${p.lämmitysjärjestelmän_kuvaus}</b><br/>
        <a href="/layers/fi-buildings">Show all details</a>
        </p>
        `
    }

    createPopup(ev, html);
});

registerGroup('buildings--energy-efficiency-class', [
  'hel-energy-efficiency-class-fill',
  'hel-energy-efficiency-class-outline',
  'hel-energy-efficiency-class-sym'
])
