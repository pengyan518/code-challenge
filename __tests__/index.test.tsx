import {render, screen} from '@testing-library/react'
import Home from '@/pages/index'

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

  it('matches snapshot with currentForecast hourly', () => {
    const component = mount(<Header currentForecast="hourly" />)

    expect(component).toMatchSnapshot()
  })
})
