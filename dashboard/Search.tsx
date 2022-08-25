import {ReactNode, useEffect, useState} from 'react'
import AutoCompleteForm from "../autoComplete/AutoCompleteForm";

type SearchProps = {
  title?: string
  description?: string
  children?: ReactNode
}

const Search = (props: SearchProps) => {
  return (
    <div className={`max-w-screen-lg mx-auto px-3`}>
      <AutoCompleteForm />
    </div>
  )
}

export {Search}
