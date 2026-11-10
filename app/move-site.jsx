import React from 'react';
import './mobile-navigation.css';
import { CoverageMap } from './coverage';
import { FAQ } from './faq-content';
import { ProcessIntro } from './move-guide';
import { ServiceOverview } from './services';
import { services, servicePath } from './services-data';
import { Button, Kicker } from './move-tools';

import { plans, prepKit, rate } from './move-data';

const links = [['/services/','Services'],['/moving-plans/','Moving plans'],['/long-distance-moving/','Long distance moving'],['/how-it-works/','How it works'],['/about/','Our story'],['/faq/','FAQs']];

function Wordmark() {
  return <a className="wordmark" href="/" aria-label="Hang Time Transport home"><img src="/lane-wordmark.webp" alt="" width="138"/></a>;
}
function Navigation() {
  return <nav aria-label="Main navigation"><details className="services-menu"><summary>Services</summary><div><a href="/services/">All moving services</a>{services.map(service=><a key={service.id} href={servicePath(service.id)}>{service.title}</a>)}</div></details>{links.filter(([path])=>path!=="/services/" && path!=="/long-distance-moving/").map(([path,label])=><a key={path} href={path}>{label}</a>)}</nav>;
}

export function Frame({children}) {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="site-header"><div className="shell nav-row">
      <Wordmark/>
      <div className="desktop-navigation"><Navigation/></div>
      <Button href="/quote/" priority>Get an estimate</Button>
      <details className="mobile-navigation">
        <summary><span aria-hidden="true">☰</span> Menu</summary>
        <Navigation/>
      </details>
    </div></header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="shell">
      <div className="footer-grid">
        <div className="footer-brand"><img src="/travel-badge.webp" alt="Hang Time Transport travel badge" width="124"/><p>Less stress,<br/>more Hang Time.</p></div>
        <nav aria-label="Footer navigation"><h2>Explore</h2>{links.map(([path,label])=><a key={path} href={path}>{label}</a>)}</nav>
        <div className="footer-contact"><h2>Planning a move?</h2><p>Share your route and compare all three moving plans.</p><Button href="/quote/" priority>Get an estimate</Button><a className="footer-email" href="mailto:hangtimetransport@gmail.com">hangtimetransport@gmail.com</a></div>
      </div>
      <div className="footer-bottom"><span>Hang Time Transport</span><span>Serving all 48 contiguous states</span></div>
    </div></footer>
  </>;
}
export function Home() {
  return <><section className="hero hero-full"><div className="shell hero-grid"><div className="hero-copy"><Kicker>MOVING ACROSS STATE LINES</Kicker><h1>Less stress.<br/>More <em className="hero-brand">Hang Time.</em></h1><p className="lead">Three ways to move across all 48 contiguous states. Pick how much help you want, and we’ll handle the drive.</p><div className="actions"><Button href="/quote/" priority>Estimate my move</Button><Button href="/moving-plans/" secondary>Compare moving plans</Button></div></div><figure className="home-road"><img src="/wrapped-truck.webp" width="1536" height="1024" fetchPriority="high" alt="Concept of a bright orange Hang Time Transport box truck with a bowling mascot wrap on a palm lined California road"/></figure></div></section>
  <div className="fact-bar"><div className="shell facts"><span><strong>48</strong> contiguous states</span><span><strong>3</strong> ways to move</span><span><strong>8,000 lb</strong> cargo capacity</span></div></div>
  <ServiceOverview/>
  <section className="dark"><div className="shell section split home-story"><div><Kicker>OUR STORY</Kicker><h2>We’ve made a move like yours.</h2><p className="lead">In 2024, our family moved from Southern California to Texas. We know what it feels like to pack up your life and start somewhere new. And our name? That goes back to a family night at the bowling alley.</p><Button href="/about/" priority>Read our story</Button></div><img src="/family-game-night.webp" alt="Hang Time family bowling illustration"/></div></section>
  <CoverageMap/>
  <section className="shell section"><Kicker>PICK YOUR PLAN</Kicker><h2>How much help do you want?</h2><div className="cards">{plans.map((plan,index)=><article className="plan-card" key={plan.id}><span className="number">0{index+1} / {plan.tag}</span><h3>{plan.name}</h3><p>{plan.title}</p><p><strong>{rate(plan.rate)}</strong> / mile{plan.id !== 'economical' && ' + hourly labor'}</p><Button href={'/moving-plans/?plan='+plan.id} secondary>Explore {plan.name}</Button></article>)}</div></section>
  <ProcessIntro/>
  <section className="shell section split fleet-feature"><figure className="fleet"><img src="/long-haul-truck.webp" width="1536" height="1024" loading="lazy" alt="Hang Time’s orange wrapped box truck on a winding California highway"/></figure><div><Kicker>THE HANG TIME TRUCK</Kicker><h2>Built for the long haul.</h2><p className="lead">Our International truck has two axles and an extended cab with a bunk behind the seats. It can carry up to 8,000 pounds of cargo.</p><Button href="/long-distance-moving/" secondary>Explore interstate moving</Button></div></section>
  <FAQ preview/></>;
}
export function About() {
  return <><section className="shell section split"><div><Kicker>OUR STORY</Kicker><h1>Family game night.<br/><em>One lucky roll.</em></h1><p className="lead">On a father-daughter bowling outing, the ball hung in the air for a beat before it hit the lane. That little moment gave Hang Time its name.</p></div><figure className="mascot-stage story-stage"><div className="orbit"/><img src="/family-game-night.webp" alt="Family Game Night logo with a father and daughter at a bowling lane"/></figure></section><section className="dark"><div className="shell section split"><div><Kicker>CALIFORNIA TO TEXAS, 2024</Kicker><h2>We made the move ourselves.</h2></div><div><p className="lead">We grew up in Southern California and moved ourselves to Texas in 2024. We know what it takes to pack up a life and start somewhere new.</p><p>Our faith shapes how we serve. We give families and businesses a choice about how much of the work they want to take on, then handle the drive to their next chapter.</p><Button href="/moving-plans/">See how we move</Button></div></div></section></>;
}
export function LongDistance() {
  return <><section className="dark"><div className="shell section split"><div><Kicker>BUILT FOR THE OPEN ROAD</Kicker><h1>Long distance<br/><em>moving.</em></h1><p className="lead">Residential and commercial moves across all 48 contiguous states. We can load up to 8,000 pounds of cargo and review local moves case by case.</p><div className="actions"><Button href="/quote/" priority>Estimate my move</Button><Button href="#coverage" secondary>Explore the route map</Button></div></div><figure className="service-photo"><img src="/long-haul-truck.webp" width="1536" height="1024" alt="Orange Hang Time Transport truck on a winding highway" fetchPriority="high"/></figure></div></section>
  <CoverageMap heading="Explore your interstate route." initialPickup="Texas" initialDestination="California"/>

  <section className="peach"><div className="shell section split"><div><Kicker>YOUR MOVE, STEP BY STEP</Kicker><h2>Get ready to roll.</h2></div><ol className="steps"><li><strong>Choose your plan.</strong> Decide who’s handling prep and packing, loading, and unpacking.</li><li><strong>Get your move guide.</strong> {prepKit.timing} Your move guide explains what to put in duffel bags and bins.</li><li><strong>Load up.</strong> Each plan includes transportation, dollies, blankets, shrink wrap, and moving tape.</li></ol><Button href="/how-it-works/" secondary>See the full move guide</Button></div></section></>;
}
