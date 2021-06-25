import React, { useState } from 'react'

export const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);
  const onChange = (event: React.BaseSyntheticEvent) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  return {
    form,
    onChange,
    setForm
  }
}