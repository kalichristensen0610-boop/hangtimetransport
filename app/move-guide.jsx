import React from 'react';
import { Button, Kicker } from './move-tools';
import { MoveChecklist, PlanFinder } from './move-guide-tools';
import { prepKit } from './move-data';

const stages = [
  ['Before you book','Start with your route and dates','Gather your pickup and delivery ZIP codes, your preferred move date, and the size of your home or office. Make a note of stairs, elevators, parking restrictions, and bulky items at both stops. Those details help us understand the work involved.'],
  ['One week before','Get your prep kit and move guide',prepKit.timing+' Your guide explains how to use the bins and what to keep in a duffel bag.'],
  ['Pickup day','Get the load ready to roll','Follow your plan for prep and packing, and confirm who’s handling the loading. Keep the path to the truck clear and set aside the things you’ll need during the trip. Hang Time handles the driving on all three plans.'],
  ['Delivery day','Get settled at the new place','Confirm who’s unloading and unpacking under your plan. Labeling boxes by room makes it easier for everyone to put things where they belong. Keep one box for the essentials you’ll want to open first.'],
];

export function ProcessIntro() {
  return <section className="peach"><div className="shell section split"><div><Kicker>FROM BOOKING TO DELIVERY</Kicker><h2>Know what happens next.</h2></div><div><p className="lead">See what to share when you book, what we ship one week before your move, and what to have ready when the truck arrives.</p><Button href="/how-it-works/" secondary>Walk through your move</Button></div></div></section>;
}

export function MoveGuide() {
  return <>
    <section className="guide-hero dark"><div className="shell section"><Kicker>THE HANG TIME MOVE GUIDE</Kicker><h1>From packing to <em>front door.</em></h1><p className="lead">Here’s what to expect from planning through delivery, plus a checklist you can work through as you get ready.</p><div className="actions"><Button href="#checklist">Open the checklist</Button><Button href="#find-my-plan" secondary>Find my plan</Button></div></div></section>
    <section className="shell section"><Kicker>YOUR MOVE TIMELINE</Kicker><h2>Four stages of your move.</h2><ol className="move-timeline">{stages.map(([when,title,copy])=><li key={when}><p className="number">{when}</p><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
    <section className="guide-prep" id="checklist"><div className="shell section split guide-split"><div><Kicker>BEFORE PICKUP</Kicker><h2>Your moving checklist.</h2><p className="lead">Work through this list as you get ready. Your progress stays in this browser.</p></div><MoveChecklist/></div></section>
    <section className="shell section split guide-split" id="find-my-plan"><div><Kicker>DECIDE WHO DOES WHAT</Kicker><h2>Find the right amount of help.</h2><p className="lead">Choose how much of the work you’d like to handle and see which plan fits.</p></div><PlanFinder/></section>
  </>;
}
