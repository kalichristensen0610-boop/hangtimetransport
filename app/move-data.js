export const plans = [
  {id:'full-service', name:'Full Service', rate:5, tag:'THE WHOLE GAME', title:'Leave the heavy lifting to us.', description:'We arrange packing, loading, unloading and unpacking. You can focus on getting settled.', roles:['Hang Time arranges','Hang Time arranges','Hang Time','Hang Time arranges','Hang Time arranges']},
  {id:'hybrid', name:'Hybrid', rate:4.5, tag:'SPLIT THE WORK', title:'A little help goes a long way.', description:'Pack and prep yourself and let the crew load and unload, or talk with us about a different split.', roles:['You or hired packers','Based on your setup','Hang Time','Based on your setup','You or hired unpackers']},
  {id:'economical', name:'Economical', rate:3.5, tag:'YOU BRING THE CREW', title:'Your crew. Our truck.', description:'You handle packing, loading, unloading and unpacking. We provide the truck and supplies, and our driver supervises loading.', roles:['Your crew','Your crew','Hang Time','Your crew','Your crew']},
];
export const rate = value => '$' + value.toFixed(2);

export const prepKit = {
  timing: 'We ship your prep kit to your home one week before your move.',
  equipment: 'Hand and furniture dollies, furniture blankets, shrink wrap, and moving tape',
};
