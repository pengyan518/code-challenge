import {render, screen} from '@testing-library/react'
import Home from '@/pages/index'
import {Current} from '../current/Current'

describe('Home', () => {
  // it('renders a heading', () => {
  //   render(<Home />)
  //
  //   const heading = screen.getByRole('heading', {
  //     name: /welcome to next\.js!/i,
  //   })
  //
  //   expect(heading).toBeInTheDocument()
  // })

  it('does not call onGetCurrentLocation', () => {
    const component = mount(<App />)
    <Current
    const instance = component.instance()

    component.state().updating = true

    spyOn(instance, 'onGetCurrentLocation')

    instance.onGPSLocationClick()

    expect(instance.onGetCurrentLocation).not.toBeCalled()
  })
})
