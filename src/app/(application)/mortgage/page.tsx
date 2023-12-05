import React from 'react'
import PersonalDetailsForm from './_form/personal-details-form'
import IncomeDetailsForm from './_form/income-details-form'

const Page = () => {
  return (
    <section className="w[400px]">
      <PersonalDetailsForm />
      <IncomeDetailsForm />
    </section>
  )
}

export default Page
