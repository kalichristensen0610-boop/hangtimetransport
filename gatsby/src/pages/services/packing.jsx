import React from 'react';
import { ServiceDetail } from '../../../../app/services';
import { services } from '../../../../app/services-data';
const service = services.find(item => item.id === 'packing');
export default function Page() { return <ServiceDetail service={service}/>; }
export const Head = () => <title>{service.title} | Hang Time Transport</title>;
