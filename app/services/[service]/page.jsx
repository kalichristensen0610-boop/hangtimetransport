import React from 'react';
import { ServiceDetail } from '../../services';
import { services } from '../../services-data';

export const dynamicParams = false;
export function generateStaticParams() {
  return services.filter(item => item.id !== 'interstate').map(item => ({service:item.id}));
}
export async function generateMetadata({params}) {
  const {service} = await params;
  const item = services.find(entry => entry.id === service);
  return {title:item.title, description:item.intro};
}
export default async function Page({params}) {
  const {service} = await params;
  return <ServiceDetail service={services.find(item => item.id === service)}/>;
}
