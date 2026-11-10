'use client';
import React, { useState } from 'react';
import { Button, Kicker } from './move-tools';
import states from './coverage-states.json';

export function CoverageMap({heading="Wherever you’re headed, we’ll get you there.", initialPickup="", initialDestination=""}) {
  const [pickup, setPickup] = useState(initialPickup);
  const [destination, setDestination] = useState(initialDestination);
  const [editing, setEditing] = useState(initialPickup ? 'destination' : 'pickup');
  const [progress, setProgress] = useState(48);
  const pickupCenter = states.find(state => state.name === pickup)?.center;
  const destinationCenter = states.find(state => state.name === destination)?.center;
  const hasRoute = Boolean(pickupCenter && destinationCenter);
  const start = pickupCenter || [0, 0];
  const end = destinationCenter || start;
  const bend = pickup === destination ? 0 : Math.min(68, Math.hypot(end[0]-start[0], end[1]-start[1])*.18);
  const middle = [(start[0]+end[0])/2, (start[1]+end[1])/2-bend];
  const t = progress/100;
  const truck = start.map((value, axis) => (1-t)**2*value+2*(1-t)*t*middle[axis]+t**2*end[axis]);
  const route = new URLSearchParams({pickupState:pickup, destinationState:destination});
  function choose(state) {
    if (editing === 'pickup') {
      setPickup(state);
      setEditing('destination');
    } else {
      setDestination(state);
    }
    setProgress(48);
  }

  return <section className="coverage-section" id="coverage"><div className="shell section">
    <Kicker>WHERE WE MOVE</Kicker>
    <h2>{heading}</h2>
    <p className="lead">We move households and businesses across all 48 contiguous states. Tap a state to explore your route.</p>
    <div className="coverage-grid">
      <div className="map-board">
        <div className="map-mode" role="group" aria-label="Choose which stop to set on the map">
          <button type="button" aria-pressed={editing==='pickup'} onClick={()=>setEditing('pickup')}>Set pickup</button>
          <button type="button" aria-pressed={editing==='destination'} onClick={()=>setEditing('destination')}>Set destination</button>
        </div>
        <svg className="coverage-map" viewBox="0 0 760 472" aria-label="Interactive map of the 48 contiguous United States">
          {states.map(state=><path key={state.name} d={state.path} data-selected={state.name===pickup || state.name===destination} role="button" tabIndex={0} aria-label={state.name} onKeyDown={event=>{if (event.key==='Enter' || event.key===' ') {event.preventDefault();choose(state.name);}}} onClick={()=>choose(state.name)}><title>{state.name}</title></path>)}
          {hasRoute && <g pointerEvents="none" aria-hidden="true">
            <path className="route-line" d={`M${start.join(' ')} Q${middle.join(' ')} ${end.join(' ')}`}/>
            <circle cx={start[0]} cy={start[1]} r="6"/>
            <circle cx={end[0]} cy={end[1]} r="6"/>
            <image href="/truck-marker.svg" x={truck[0]-29} y={truck[1]-21} width="58" height="24"/>
          </g>}
        </svg>
        <label className="route-slider">Slide to drive the truck <input type="range" disabled={!hasRoute} min="0" max="100" value={progress} onChange={event=>setProgress(Number(event.target.value))}/></label>
      </div>
      <div className="form-card route-card">
        <p className="number">BUILD YOUR ROUTE</p>
        <label>Pickup state<select value={pickup} onChange={event=>{setPickup(event.target.value);setEditing(event.target.value ? 'destination' : 'pickup');setProgress(48);}}><option value="">Choose pickup</option>{states.map(({name})=><option key={name}>{name}</option>)}</select></label>
        <label>Destination state<select value={destination} onChange={event=>{setDestination(event.target.value);setProgress(48);}}><option value="">Choose destination</option>{states.map(({name})=><option key={name}>{name}</option>)}</select></label>
        {hasRoute ? <><p className="route-result" aria-live="polite"><strong>{pickup} to {destination}</strong><br/>{pickup===destination?'Tell us more about your route. We review local moves case by case.':'Both states are in our service area. We’ll confirm availability when we review your move.'}</p>
        <Button href={'/quote/?'+route}>Estimate this move</Button></> : <p className="route-result">Choose your pickup and destination to see your route.</p>}
        <p className="helper">The map illustrates your route. Use your map app for driving miles.</p>
      </div>
    </div>
  </div></section>;
}
