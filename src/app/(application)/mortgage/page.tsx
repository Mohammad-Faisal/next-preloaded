'use client'
import React from 'react'
import PersonalDetailsForm from './_form/personal-details-form'
import IncomeDetailsForm from './_form/income-details-form'

const Page = () => {
  const storeValues = (values: any) => {
    localStorage.setItem('personalDetails', JSON.stringify(values))
  }

  return (
    <section className="flex gap-16 p-4">
      <PersonalDetailsForm onSubmitForm={storeValues} />
      <IncomeDetailsForm />
    </section>
  )
}

export default Page
