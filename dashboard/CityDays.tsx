import {Key, ReactNode, useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import {OneDay} from './OneDay'

type CityDaysProps = {
  forecastday?: any[]
  city?: string
}

const CityDays = (props: CityDaysProps) => (
  <>
    {props.forecastday &&
      props.forecastday.map((oneCity, i) => {
        return (
          <div key={i} className="grid-wrapper">
            {oneCity.days.length > 0 &&
              oneCity.days.map((oneDay: {date_epoch: string}) => <OneDay key={oneDay.date_epoch} oneDay={oneDay} city={props.city} />)}
          </div>
        )
      })}
  </>
)

export {CityDays}
