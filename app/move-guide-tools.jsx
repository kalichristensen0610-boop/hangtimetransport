'use client';
import React, { useEffect, useState } from 'react';
import { plans, rate } from './move-data';
import { Button } from './move-tools';

const tasks = [
  'Confirm pickup and delivery details',
  'Review who handles prep and packing',
  'Check parking, stairs, and elevator access at both stops',
  'Read the move guide and check your prep kit',
  'Label boxes by room and set aside travel essentials',
  'Confirm who will be there for loading and unloading',
];
const checklistKey = 'hang-time-move-checklist';

export function MoveChecklist() {
  const [checked, setChecked] = useState([]);
  useEffect(()=>{
    try {
      const saved = JSON.parse(localStorage.getItem(checklistKey) || '[]');
      if (Array.isArray(saved)) setChecked(tasks.filter(task=>saved.includes(task)));
    } catch {}
  },[]);
  function update(task) {
    const next = checked.includes(task) ? checked.filter(item=>item!==task) : [...checked,task];
    setChecked(next);
    try { localStorage.setItem(checklistKey,JSON.stringify(next)); } catch {}
  }
  return <div className="form-card guide-checklist"><p aria-live="polite"><strong>{checked.length} of {tasks.length} complete</strong></p><progress aria-label="Checklist progress" max={tasks.length} value={checked.length}/>{tasks.map(task=><label key={task}><input type="checkbox" checked={checked.includes(task)} onChange={()=>update(task)}/>{task}</label>)}</div>;
}

const preferences = ['I want help from packing through unpacking','I want to split the work with a crew','I have my own crew for both stops'];

export function PlanFinder() {
  const [selected,setSelected] = useState(null);
  const plan = selected===null ? null : plans[selected];
  return <div className="form-card plan-finder"><fieldset><legend>How much help do you want?</legend>{preferences.map((label,index)=><label key={label}><input type="radio" name="move-help" checked={selected===index} onChange={()=>setSelected(index)}/>{label}</label>)}</fieldset><div aria-live="polite">{plan && <><p><strong>{plan.name}</strong> · {rate(plan.rate)} per mile</p><p>{plan.description} {plan.id!=='economical' && 'Hourly labor is quoted separately.'}</p><div className="actions"><Button href={'/moving-plans/?plan='+plan.id} secondary>See plan details</Button><Button href={'/quote/?plan='+plan.id}>Estimate this plan</Button></div></>}</div></div>;
}
