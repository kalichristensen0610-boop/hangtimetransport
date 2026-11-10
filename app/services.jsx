import React from 'react';
import { Button, Kicker } from './move-tools';

import { services, servicePath } from './services-data';

export function ServiceOverview() {
  return <section className="shell section services-overview"><Kicker>MOVING SERVICES</Kicker><h2>What kind of move are you planning?</h2><p className="lead">Find your move type, then choose how much help you want with the work.</p><div className="cards service-grid">{services.map((service,index)=><a className="service-card" key={service.id} href={servicePath(service.id)}><span className="number">0{index+1}</span><h3>{service.title}</h3><p>{service.intro}</p><span className="service-more">Explore service <span aria-hidden="true">→</span></span></a>)}</div></section>;
}

export function ServicesPage() {
  return <><section className="peach"><div className="shell section"><Kicker>HANG TIME TRANSPORT</Kicker><h1>Moving <em>services.</em></h1><p className="lead">Tell us where you’re headed and what you’re taking. We’ll help you figure out what to prepare and which plan fits.</p><div className="actions"><Button href="/quote/" priority>Get an estimate</Button><Button href="/moving-plans/" secondary>Compare plans</Button></div></div></section>
  <ServiceOverview/></>;
}

const servicePhotos = {
  local:['texas','Hang Time movers preparing for a move at a Texas home'],
  apartment:['apartment','Hang Time movers carrying furniture into a Texas apartment building'],
  commercial:['commercial','Hang Time movers preparing furniture for an Austin office move'],
  statewide:['texas','A Hang Time truck and movers at a Texas home'],
  packing:['texas','Hang Time movers handling boxes outside a Texas home'],
};

export function ServiceDetail({service}) {
  const [photo,alt] = servicePhotos[service.id];
  return <>
    <section className="peach service-hero"><div className="shell section split"><div><Kicker>TEXAS BASED MOVING COMPANY</Kicker><h1>{service.title}</h1><p className="lead">{service.intro}</p><div className="actions"><Button href="/quote/" priority>Get an estimate</Button><Button href="/services/" secondary>All moving services</Button></div></div><figure className="service-photo"><img src={'/service-'+photo+'.webp'} width="1536" height="1024" alt={alt} fetchPriority="high"/></figure></div></section>
    <section className="shell section split service-detail"><div><h2>Planning your move</h2><p className="lead">{service.detail}</p><div className="actions"><Button href={service.link || '/moving-plans/'} secondary>{service.action || 'Compare moving plans'}</Button>{service.id==='local' && <Button href="/services/statewide/" secondary>Explore statewide moves</Button>}</div></div><aside><h3>Before you get an estimate</h3><p>{service.prep}</p><Button href="/how-it-works/" secondary>See the move guide</Button></aside></section>
  </>;
}
