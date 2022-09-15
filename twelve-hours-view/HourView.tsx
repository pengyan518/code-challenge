import {forwardRef, useImperativeHandle} from 'react'

import useRect from '../hooks/Swipe/useRect'
import useResize from '../hooks/Swipe/useResize'

interface IProps {
  oneHour: any
}

const Hours = (props: IProps, ref: React.Ref<unknown> | undefined) => {
  const {condition, temp_f, time_epoch, time, feelslike_f, wind_mph, wind_dir, humidity, cloud, chance_of_rain} = props.oneHour
  const {root, changeSize, size} = useRect<HTMLDivElement>([])

  useResize(() => changeSize())

  useImperativeHandle(
    ref,
    () => ({
      top: size.top,
    }),
    [size.top]
  )

  return (
    <div ref={root}>
      <details className="DayPartDetail">
        <summary className="DaypartDetails--Summary">
          <div className="Disclosure--SummaryDefault">
            <div className="DetailsSummary grid">
              <h3 data-testid="daypartName" className="DetailsSummary--daypartName--2FBp2">
                {time.split(' ')[1]}
              </h3>
              <div data-testid="detailsTemperature" className="DetailsSummary--temperature--1Syw3">
                <span data-testid="TemperatureValue" className="DetailsSummary--tempValue--1K4ka">
                  {temp_f}°
                </span>
              </div>
              <div data-testid="wxIcon" className="DetailsSummary--condition--24gQw">
                <img src={`https://${condition.icon}`} alt="" width={48} height={48} />
                <span className="DetailsSummary--extendedData--365A_">{condition.text}</span>
              </div>
              <div data-testid="Precip" className="DetailsSummary--precip--1ecIJ">
                <svg className="DetailsSummary--precipIcon" viewBox="0 -2 5 10">
                  <title>Rain</title>
                  <path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z" />
                </svg>
                <span data-testid="PercentageValue">67%</span>
              </div>
              <div data-testid="wind" className="DetailsSummary--wind--2rkTO DetailsSummary--extendedData--365A_">
                <svg className="DetailsSummary--conditionsIcon" viewBox="0 0 24 24">
                  <title>Wind</title>
                  <path
                    d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span data-testid="Wind" className="Wind--windWrapper--3aqXJ undefined">
                  {wind_dir} {wind_mph} mph
                </span>
              </div>
            </div>
            <svg className="Disclosure--SummaryIcon" viewBox="0 0 24 24">
              <path d="M12 16.086l7.293-7.293a1 1 0 1 1 1.414 1.414l-8 8a1 1 0 0 1-1.414 0l-8-8a1 1 0 1 1 1.414-1.414L12 16.086z" />
            </svg>
          </div>
        </summary>
        <div className="DaypartDetails--contentGrid">
          <div
            data-cq-observe="true"
            data-cq-breakpoints='{"DetailsTable--twoColumn--3ybwq":0,"DetailsTable--threeColumn--1Sk9J":480}'
            className="DetailsTable--threeColumn--1Sk9J">
            <ul className="DetailsTable--DetailsTable">
              <li data-testid="FeelsLikeSection" className="DetailsTable--listItem">
                <svg className="Icon--icon" viewBox="0 0 24 24">
                  <title>Feels-Like Temperature</title>
                  <path d="M9.94 15.406v.323c.974.358 1.671 1.325 1.671 2.461 0 1.441-1.122 2.61-2.505 2.61-1.384 0-2.506-1.169-2.506-2.61 0-1.136.697-2.103 1.67-2.461v-.323a2.088 2.088 0 0 1-1.252-1.914V5.488a2.088 2.088 0 1 1 4.176 0v8.004c0 .856-.516 1.592-1.253 1.914zM9.15 4.9a.75.75 0 0 0-.75.75v5.33h1.5V5.65a.75.75 0 0 0-.75-.75zM15.4 8a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <div className="DetailsTable--field--3ZKJV">
                  <span data-testid="FeelsLikeTitle" className="DetailsTable--label--3Va-t">
                    Feels Like
                  </span>
                  <span data-testid="TemperatureValue" className="DetailsTable--value--1q_qD">
                    {feelslike_f}°
                  </span>
                </div>
              </li>
              <li data-testid="WindSection" className="DetailsTable--listItem">
                <svg className="Icon--icon" viewBox="0 0 24 24">
                  <title>Wind</title>
                  <path
                    d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="DetailsTable--field--3ZKJV">
                  <span data-testid="WindTitle" className="DetailsTable--label--3Va-t">
                    Wind
                  </span>
                  <span data-testid="Wind" className="Wind--windWrapper--3aqXJ DetailsTable--value--1q_qD">
                    {wind_dir} {wind_mph} mph
                  </span>
                </div>
              </li>
              <li data-testid="HumiditySection" className="DetailsTable--listItem">
                <svg className="Icon--icon" viewBox="0 0 24 24">
                  <title>Humidity</title>
                  <path
                    fillRule="evenodd"
                    d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"
                  />
                </svg>
                <div className="DetailsTable--field--3ZKJV">
                  <span data-testid="HumidityTitle" className="DetailsTable--label--3Va-t">
                    Humidity
                  </span>
                  <span data-testid="PercentageValue" className="DetailsTable--value--1q_qD">
                    {humidity}%
                  </span>
                </div>
              </li>
              <li data-testid="uvIndexSection" className="DetailsTable--listItem">
                <svg className="Icon--icon" viewBox="0 0 24 24">
                  <title>UV Level</title>
                  <path d="M7.4 5.598a.784.784 0 0 1 .25-.92c.335-.256.824-.197 1.02.062.066.063.066.063.08.085l2.406 3.152-.626.238a3.983 3.983 0 0 0-1.097.633l-.522.424L7.4 5.598zm4.539 2.358c-.21 0-.418.017-.625.05l-.664.106.09-.666.438-3.266c.013-.072.013-.072.012-.057a.783.783 0 0 1 .666-.616.78.78 0 0 1 .872.639l.006.038.507 3.933-.662-.108a3.957 3.957 0 0 0-.64-.053zm-7.781 3.19l.026-.004 3.934-.507-.108.662a3.98 3.98 0 0 0-.003 1.266l.105.664-.665-.09-3.265-.439a.784.784 0 0 1-.676-.679c-.054-.42.238-.809.63-.869l.022-.004zm11.504-.617a3.98 3.98 0 0 0-.632-1.097l-.425-.522.623-.256 3.056-1.256a.787.787 0 0 1 .916.253c.256.337.199.817-.104 1.063l-.045.037-3.151 2.405-.238-.627zm-1.205-1.672a3.984 3.984 0 0 0-1.095-.637l-.626-.24.41-.532 2.008-2.602c.059-.07.059-.07.046-.052a.78.78 0 0 1 1.306.227c.076.185.079.39.02.54l-.021.06-1.528 3.662-.52-.426zM4.595 7.793c.162-.387.611-.58.971-.441.017.004.017.004.055.02L9.283 8.9l-.425.52a3.985 3.985 0 0 0-.636 1.094l-.24.627-3.144-2.425a.784.784 0 0 1-.243-.924zm14.443 7.367c.054.045.054.045.044.04a.784.784 0 0 1 .199.884c-.163.386-.61.58-.964.443-.024-.006-.024-.006-.062-.022l-3.662-1.529.426-.52a3.98 3.98 0 0 0 .636-1.094l.241-.626 3.142 2.424zm1.332-3.303c.053.422-.239.809-.63.87l-.035.006-3.945.508.108-.662a3.999 3.999 0 0 0 .003-1.266l-.105-.663.665.09 3.272.44c.068.012.068.012.052.01a.784.784 0 0 1 .615.667zm-3.894 6.421c.024.068.024.068.017.053a.786.786 0 0 1-.27.87c-.332.25-.816.194-1.047-.091-.022-.023-.022-.023-.05-.058l-2.406-3.154.626-.237a3.977 3.977 0 0 0 1.097-.632l.523-.425 1.51 3.674zm-8.26-4.932c.151.397.365.767.633 1.097l.424.522-.622.256-3.054 1.255a.787.787 0 0 1-.92-.25.781.781 0 0 1-.154-.58c.027-.199.127-.379.227-.452.045-.046.045-.046.075-.069l3.153-2.406.238.627zm3.723 2.572c.209 0 .417-.016.625-.049l.662-.103-.089.664-.438 3.26-.012.062a.785.785 0 0 1-.666.618c-.048.005-.048.005-.101.006-.386 0-.714-.28-.764-.612-.01-.043-.01-.043-.014-.072l-.507-3.934.662.108c.213.035.427.052.642.052zM7.366 18.27l.006-.015L8.9 14.592l.52.426a3.99 3.99 0 0 0 1.094.636l.626.241-.41.531-2.012 2.609-.04.046a.788.788 0 0 1-.886.2.787.787 0 0 1-.428-1.011z" />
                  <path d="M11.911 14.322a2.411 2.411 0 1 0 0-4.822 2.411 2.411 0 0 0 0 4.822zm0 2a4.411 4.411 0 1 1 0-8.822 4.411 4.411 0 0 1 0 8.822z" />
                </svg>
                <div className="DetailsTable--field--3ZKJV">
                  <span data-testid="uvIndexTitle" className="DetailsTable--label--3Va-t">
                    UV Index
                  </span>
                  <span data-testid="UVIndexValue" className="DetailsTable--value--1q_qD">
                    0 of 10
                  </span>
                </div>
              </li>
              <li data-testid="CloudCoverSection" className="DetailsTable--listItem">
                <svg className="Icon--icon" viewBox="0 0 24 24">
                  <title>Cloud</title>
                  <path d="M21.786 11.898a3.322 3.322 0 0 0-4.04-2.357l-.356.095a4.911 4.911 0 0 0-9.599.546l-.129-.034a2.804 2.804 0 0 0-3.486 3.032l-1.203.323a1.312 1.312 0 0 0 .42 2.576h15.103s.626-.029.94-.113a3.322 3.322 0 0 0 2.35-4.068" />
                </svg>
                <div className="DetailsTable--field--3ZKJV">
                  <span data-testid="CloudCoverTitle" className="DetailsTable--label--3Va-t">
                    Cloud Cover
                  </span>
                  <span data-testid="PercentageValue" className="DetailsTable--value--1q_qD">
                    {cloud}%
                  </span>
                </div>
              </li>
              <li data-testid="AccumulationSection" className="DetailsTable--listItem">
                <svg className="Icon--icon" viewBox="0 0 1024 1024">
                  <title>Rain</title>
                  <path d="M424.755 39.731c3.891-12.902-4.71-26.214-19.251-29.696-12.902-3.072-26.01 2.662-31.744 13.107L134.758 392.396c-4.915 6.963-8.806 14.541-11.469 22.938-13.107 43.418 15.77 88.064 64.512 99.533 48.128 11.469 97.485-13.722 111.206-56.32L424.754 39.731zm463.667-29.696c-14.336-3.482-29.082 3.072-35.226 14.541h-.205l-497.254 767.59c-8.806 12.288-15.77 26.01-20.275 40.96-23.347 77.414 28.262 156.877 115.098 177.766 86.221 20.48 174.899-24.576 198.861-101.171h.205l119.603-397.926c.205-.41.41-1.024.614-1.434L909.517 45.67l.614-2.253c3.891-14.541-5.53-29.491-21.709-33.382z" />
                </svg>
                <div className="DetailsTable--field--3ZKJV">
                  <span data-testid="AccumulationTitle" className="DetailsTable--label--3Va-t">
                    Chance of Rain
                  </span>
                  <span data-testid="AccumulationValue" className="DetailsTable--value--1q_qD">
                    {chance_of_rain}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  )
}

const HoursView = forwardRef(Hours)

export {HoursView}
