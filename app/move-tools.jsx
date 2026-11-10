'use client';
import React, { useEffect, useState } from 'react';
import { plans, prepKit, travelCosts, rate } from './move-data';

export function Kicker({children}) { return <p className="kicker"><Ball/>{children}</p>; }


export function Ball() {
  return <svg className="ball" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#ff641c"/><g fill="#211f1d"><circle cx="12" cy="6" r="1.5"/><circle cx="17" cy="8" r="1.5"/><circle cx="12" cy="11" r="1.5"/></g></svg>;
}
export function Button({href, secondary=false, priority=false, children, ...props}) {
  const style = 'button' + (secondary ? ' secondary' : '') + (priority ? ' priority' : '');
  return href ? <a className={style} href={href} {...props}>{children}<span aria-hidden="true">→</span></a> : <button className={style} {...props}>{children}<span aria-hidden="true">→</span></button>;
}
export function Crew() {
  return <figure className="crew"><img src="/rolling-crew.webp" alt="The Rolling Crew bowling ball mascot pushing a dolly with moving boxes"/></figure>;
}
function useSelectedPlan() {
  const [planId,setPlanId] = useState('hybrid');
  useEffect(()=>{
    const requested = new URLSearchParams(window.location.search).get('plan');
    if (plans.some(plan=>plan.id===requested)) setPlanId(requested);
  },[]);
  return [plans.find(plan=>plan.id===planId),setPlanId];
}
const moveSteps = ['Prep and packing','Loading','Driving','Unloading','Unpacking'];
const planFit = {
  'full-service': 'A good fit if you want us to arrange help on both ends, from getting everything packed to unpacking at your new place.',
  hybrid: 'A good fit if you’re comfortable handling some of the work and want help with specific tasks.',
  economical: 'A good fit if you already have people to help at pickup and delivery and need a truck and driver for the trip.',
};

export function PlanPage() {
  const [plan, choose] = useSelectedPlan();
  const [compare, setCompare] = useState(false);
  return <>
    <section className="peach plans-hero"><div className="shell section split">
      <div><Kicker>MEET THE ROLLING CREW</Kicker><h1>Three ways<br/><em>to move.</em></h1><p className="lead">Decide who handles prep and packing, who lifts the heavy stuff, and how much help you want at your new place. We drive the truck with every plan.</p></div><Crew/>
    </div></section>
    <section className="shell section">
      <Kicker>FIND YOUR FIT</Kicker>
      <div className="pick-row" role="group" aria-label="Choose a moving plan">
        {plans.map(item=><button key={item.id} type="button" aria-pressed={!compare && plan.id===item.id} onClick={()=>{choose(item.id);setCompare(false);}}><Ball/>{item.name}</button>)}
        <button type="button" aria-pressed={compare} onClick={()=>setCompare(!compare)}>Compare all plans</button>
      </div>
      {compare ? <div className="comparison-scroll" tabIndex={0} role="region" aria-label="Moving plan comparison">
        <table className="comparison-table">
          <caption>What each moving plan covers</caption>
          <thead><tr><th scope="col">Move step</th>{plans.map(item=><th scope="col" key={item.id}>{item.name}</th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">Transportation</th>{plans.map(item=><td key={item.id}>{rate(item.rate)} per mile</td>)}</tr>
            {moveSteps.map((step,index)=><tr key={step}><th scope="row">{step}</th>{plans.map(item=><td key={item.id}>{item.roles[index]}</td>)}</tr>)}
            <tr><th scope="row">Labor</th>{plans.map(item=><td key={item.id}>{item.id==='economical'?'Your crew':'Quoted separately'}</td>)}</tr>
            <tr><th scope="row">Estimate</th>{plans.map(item=><td key={item.id}><Button href={'/quote/?plan='+item.id} secondary>Estimate {item.name}</Button></td>)}</tr>
          </tbody>
        </table>
      </div> : <div className="split plan-panel">
        <div aria-live="polite"><p className="number">{plan.tag}</p><h2>{plan.name}</h2><p className="lead">{plan.description}</p><p>{planFit[plan.id]}</p><dl className="roles">{moveSteps.map((step,index)=><div key={step}><dt>{step}</dt><dd>{plan.roles[index]}</dd></div>)}</dl></div>
        <aside className="estimate-card"><span className="number">TRANSPORT RATE</span><strong>{rate(plan.rate)}</strong><p>per mile</p><p>{plan.id==='economical'?'You handle the labor':'Hourly labor quoted separately'}</p><Button href={'/quote/?plan='+plan.id}>Estimate {plan.name}</Button></aside>
      </div>}
    </section>
    <section className="peach faq-section plan-inclusions"><div className="shell section split">
      <div><Kicker>INCLUDED IN EVERY PLAN</Kicker><h2>Get ready before the truck arrives.</h2><p className="lead">{prepKit.timing} You’ll also get a move guide with instructions for packing bins and duffel bags and getting ready for pickup.</p></div>
      <div>
        <details open><summary>What’s in the prep kit?</summary><p>Your kit includes shrink wrap and moving tape.</p></details>
        <details><summary>What equipment is included?</summary><p>{prepKit.equipment} {prepKit.timing}</p></details>
        <details><summary>What travel costs are included?</summary><p>{travelCosts}</p></details>
        <details><summary>What should I do before pickup?</summary><p>Review your move guide and check who is handling prep and packing under your plan. If your timing changes, contact us so we can review your pickup schedule.</p></details>
      </div>
    </div></section>
  </>;
}
const states = 'Alabama|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming'.split('|');
export function RouteCheck() {
  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  return <div className="form-card"><div className="fields">{[['Pickup state',from,setFrom],['Destination state',to,setTo]].map(([label,value,set])=><label key={label}>{label}<select value={value} onChange={e=>set(e.target.value)}><option value="">Choose a state</option>{states.map(state=><option key={state}>{state}</option>)}</select></label>)}</div><p className="route-result" aria-live="polite">{from && to ? from===to ? 'Both stops are in '+from+'. Share your route details so we can review the move. Local moves are reviewed case by case.' : from+' → '+to+' is within our interstate service area. Availability is confirmed when we review your move.' : 'Choose both states to check coverage.'}</p><Button href="/quote/">Open the calculator</Button></div>;
}
const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
const draftKey = 'hang-time-quote-v2';
export function QuotePage() {
  const [plan,choose] = useSelectedPlan();
  const [miles,setMiles] = useState('');
  const [pickupZip,setPickupZip] = useState('');
  const [destinationZip,setDestinationZip] = useState('');
  const [size,setSize] = useState('');
  const commercial = size === 'Office / commercial';
  const validZips = /^[0-9]{5}$/.test(pickupZip) && /^[0-9]{5}$/.test(destinationZip);
  const directions = validZips ? 'https://www.google.com/maps/dir/?'+new URLSearchParams({
    api:'1', origin:pickupZip+', USA', destination:destinationZip+', USA', travelmode:'driving',
  }) : '';
  function changeZip(setZip, value) {
    setZip(value);
    setMiles('');
  }
  const [route,setRoute] = useState(null);
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const pickup = params.get('pickupState');
    const destination = params.get('destinationState');
    if (states.includes(pickup) && states.includes(destination)) setRoute({pickup,destination});
  },[]);
  const [error,setError] = useState('');
  const validMiles = Number.isInteger(Number(miles)) && Number(miles)>0 && Number(miles)<=10000;
  function saveDraft(event) {
    event.preventDefault();
    if (commercial || !validMiles) return;
    const fields = new FormData(event.currentTarget);
    const details = [
      'Hang Time Transport estimate',
      ...(route ? ['Route: '+route.pickup+' to '+route.destination] : []),
      'ZIP codes: '+fields.get('pickup')+' to '+fields.get('destination'),
      'Move date: '+(fields.get('date') || 'Flexible'), 'Move size: '+fields.get('size'),
      'Plan: '+plan.name, 'Estimated driving miles: '+miles,
      'Estimated transport subtotal: '+money(Number(miles)*plan.rate),
      plan.id==='economical' ? 'Customer handles labor.' : 'Hourly labor quoted separately.',
      '',
      'Pickup readiness: A $700 detention fee applies if we arrive and your move needs to wait until the next day because you are not packed. There is no detention fee if you call at least 48 hours before your scheduled pickup.',
    ].join('\n');
    try {
      sessionStorage.setItem(draftKey,details);
      window.location.assign('/thank-you/');
    } catch {
      setError('Your browser could not save the draft. Allow session storage and try again.');
    }
  }
  return <section className="shell section">
    <Kicker>THE MOVING CALCULATOR</Kicker><h1>Roll up an <em>estimate.</em></h1>
    <p className="lead">Check the driving distance between your ZIP codes and compare all three residential moving plans.</p>
    {route && <p className="route-context"><strong>{route.pickup} to {route.destination}</strong> <a href="/#coverage">Change states</a></p>}
    <form className="quote-grid" onSubmit={saveDraft}>
      <div className="form-card">
        <label>Move size<select required name="size" value={size} onChange={event=>setSize(event.target.value)}>
          <option value="" disabled>Choose a size</option><option>Studio</option><option>1 bedroom</option>
          <option>2 bedrooms</option><option>3 bedrooms</option><option>4+ bedrooms</option><option>Other residential move</option><option>Office / commercial</option>
        </select></label>
        {commercial ? <div className="commercial-estimate"><h2>Get a custom commercial estimate.</h2><p>Office and corporate moves are quoted individually. Contact Hang Time to discuss your inventory, building access, and move dates.</p><Button href="mailto:hangtimetransport@gmail.com?subject=Commercial%20moving%20estimate">Email to arrange an estimate call</Button></div> : <>
          <div className="fields quote-fields">
            <label>Pickup ZIP<input name="pickup" required inputMode="numeric" pattern="[0-9]{5}" maxLength="5" placeholder="ZIP code" value={pickupZip} onChange={event=>changeZip(setPickupZip,event.target.value)}/></label>
            <label>Destination ZIP<input name="destination" required inputMode="numeric" pattern="[0-9]{5}" maxLength="5" placeholder="ZIP code" value={destinationZip} onChange={event=>changeZip(setDestinationZip,event.target.value)}/></label>
          </div>
          <p className="helper">{directions ? <a className="guide-link" href={directions} target="_blank" rel="noopener noreferrer">Check driving miles in Google Maps ↗</a> : 'Enter both ZIP codes to open driving directions.'}</p>
          <div className="fields">
            <label>Estimated driving miles<input name="miles" type="number" min="1" max="10000" step="1" required value={miles} onChange={e=>setMiles(e.target.value)} placeholder="e.g. 500"/></label>
            <label>Moving plan<select value={plan.id} onChange={e=>choose(e.target.value)}>{plans.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label>Move date <small>Optional</small><input name="date" type="date"/></label>
          </div>
          <p className="helper">Enter the driving miles shown for your route. Your draft stays in this browser tab.</p>
          <Button type="submit">Save my estimate draft</Button>{error && <p role="alert">{error}</p>}
        </>}
      </div>
      {!commercial && <aside className="estimate-card"><div className="result" aria-live="polite"><p className="number">ESTIMATED TRANSPORT SUBTOTAL</p><strong>{validMiles?money(Number(miles)*plan.rate):'Enter miles'}</strong><p>{validMiles?Number(miles).toLocaleString('en-US')+' miles × ':''}{rate(plan.rate)} per mile</p><p>{plan.id==='economical'?'You handle the labor.':'Hourly labor is quoted separately.'}</p></div><div className="rate-list" role="group" aria-label="Compare and select plans">{plans.map(item=><button type="button" key={item.id} aria-pressed={plan.id===item.id} onClick={()=>choose(item.id)}><Ball/><span>{item.name}</span><b>{validMiles?money(Number(miles)*item.rate):rate(item.rate)+'/mi'}</b></button>)}</div><p className="helper">Planning estimate. Final pricing depends on your route and scope.</p></aside>}
    </form>
  </section>;
}
export function Thanks() {
  const [draft,setDraft] = useState(null);
  const [status,setStatus] = useState('');
  useEffect(()=>{
    try { setDraft(sessionStorage.getItem(draftKey) || ''); }
    catch { setDraft(''); }
  },[]);
  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setStatus('Copied to clipboard.'); }
    catch { setStatus('Select the draft text to copy it.'); }
  }
  return <section className="peach"><div className="shell section split"><div><Kicker>THE ROLLING CREW</Kicker><h1>{draft ? 'Your draft is ready!' : 'Ready to roll?'}</h1>{draft ? <><p className="lead">You’ve got your move details and estimate in one place. Copy them to keep for later.</p><label>Estimate draft<textarea value={draft} readOnly rows={12}/></label><div className="actions"><Button type="button" onClick={copyDraft}>Copy my draft</Button><Button href="/quote/" secondary>Back to calculator</Button></div><p role="status">{status}</p></> : <><p className="lead">Use the calculator to create a moving estimate draft.</p><Button href="/quote/">Open the calculator</Button></>}</div><Crew/></div></section>;
}
