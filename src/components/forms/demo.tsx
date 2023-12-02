'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from './elements/input-element'
import TextAreaElement from './elements/text-area-element'
import SelectElement from './elements/select-element'
import SwitchElement from './elements/switch-element'
import RadioGroupElement from './elements/radio-group-element'
import DatePickerElement from './elements/date-picker-element'
import ComboboxElement from './elements/combobox-element'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
]

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  marketing_emails: z.boolean().default(false).optional(),

  eligible: z.boolean(),
  dob: z.date(),
  notification: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
})

const DemoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      description: '',
      eligible: false,
      dob: new Date(),
      notification: 'all',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputElement
          name="username"
          label={'User Name'}
          control={form.control}
        />
        <TextAreaElement
          name="description"
          label={'Description'}
          control={form.control}
        />

        <SwitchElement
          name="marketing_emails"
          control={form.control}
          label={'Marketing Emails'}
          description=""
        />

        <SelectElement
          name="email"
          label={'Email'}
          control={form.control}
          options={[
            {
              label: 'First',
              value: 'first@example.com',
            },
            {
              label: 'Second',
              value: 'second@example.com',
            },
          ]}
        />

        <RadioGroupElement
          name="notification"
          label={'Notify me about'}
          control={form.control}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Mentions',
              value: 'mentions',
            },
            {
              label: 'None',
              value: 'none',
            },
          ]}
        />

        <DatePickerElement
          name="dob"
          control={form.control}
          label={'Date of Birth'}
        />

        <ComboboxElement
          name="language"
          label={'Language'}
          control={form.control}
          form={form}
          placeholder={'Select language'}
          options={languages}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default DemoForm
