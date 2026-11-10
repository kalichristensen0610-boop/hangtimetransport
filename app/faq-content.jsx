import React from 'react';
import { prepKit } from './move-data';
import { Button, Kicker } from './move-tools';

const questions = [
  ['Where does Hang Time Transport offer interstate moving?', 'We move households and businesses across all 48 contiguous U.S. states. Use the coverage map to select your pickup and destination states. We confirm availability after reviewing your route, timing, and load.'],
  ['How much does an interstate move cost per mile?', 'Full Service is $5.00 per mile, Hybrid is $4.50 per mile, and Economical is $3.50 per mile. Hourly labor is quoted separately for Full Service and Hybrid. With Economical, you provide the labor. The moving calculator shows an estimated transportation subtotal based on the driving miles you enter.'],
  ['What’s the difference between Full Service, Hybrid, and Economical?', 'With Full Service, we arrange packing, loading, unloading, and unpacking. With Hybrid, you can pack yourself and have a crew help load and unload, or talk to us about a different split. With Economical, you bring your own crew and we provide the truck and driver.'],
  ['How much weight can the moving truck carry?', 'We can load up to 8,000 pounds of cargo. Tell us about large furniture and heavy items when you share your move details so we can review your load.'],
  ['What moving supplies are included?', `Each plan includes dollies, furniture blankets, shrink wrap, and moving tape. ${prepKit.timing}`],
  ['When will I receive instructions for packing and moving day?', 'After you book, we send your move guide one week before the move. It explains what to pack in duffel bags and bins, how to prepare your items, and what to expect on moving day.'],
  ['Do you handle local moves?', 'We review local moves case by case. Share your pickup and destination ZIP codes, preferred date, and move size so we can review your request.'],
  ['Do you move businesses as well as households?', 'Yes. We handle residential and commercial moves. Select Office or Commercial in the estimate form for help arranging a custom estimate call.'],
  ['How do I estimate the cost of my move?', 'Look up the driving distance in your map app, then enter the miles in our moving calculator. You can compare all three plans, add your ZIP codes and move details, and save a draft in your browser. The final price depends on the route and scope.'],
];
export function FAQ({preview=false}) {
  return <section className={preview?'peach faq-section':'faq-section faq-page'}><div className="shell section split">
    <div><Kicker>GOOD TO KNOW</Kicker>{preview?<h2>Moving questions.</h2>:<h1>Moving questions.</h1>}<p className="lead">Answers about interstate moving costs, packing supplies, and what to expect before moving day.</p>{preview?<Button href="/faq/" secondary>Read all moving FAQs</Button>:<Button href="/quote/">Estimate my move</Button>}</div>
    <div>{questions.slice(0,preview?4:questions.length).map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </div></section>;
}
