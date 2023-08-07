import React, { useEffect } from 'react'
import { Customer as CustomerModel } from '@prisma/client';
import CustomerTable from '@/components/(customer)/Customer';

async function getCustomers() {
  return (await fetch(`${process.env.NEXTAUTH_URL}/api/customers`)).json();
}

async function Customers() {
  const customers: CustomerModel[] = await getCustomers();
  return (
    <section>
      <header>
        Customers
      </header>
      <CustomerTable customers={customers} />
    </section>
  )
}

export default Customers;