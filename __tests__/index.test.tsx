import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import Home from '@/pages/index'
import mockFetch from '../__mocks__/mockFetch'
import config from '../config'

beforeEach(() => {
  // return jest.spyOn(window, 'fetch').mockImplementation(() => mockFetch(config.ipFetcher))
  return jest.fn().mockImplementation(mockFetch)
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

it('should display current weather', async () => {
  render(<Home />)

  const data = await waitFor(() => screen.findByTestId('conditions--header'))
  expect(data).toBeTruthy()
})
