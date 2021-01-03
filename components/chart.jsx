import { useMemo } from 'react';
import styled from 'styled-components';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { Line } from '@nivo/line'


import activityData from '../data/activities.csv';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: scroll;
  height: 800px;
`

const isAm = (date) => date.includes('AM');

const Chart = () => {
  const parsedData = () => {
    console.log(activityData);
    const monthData = activityData.filter(d => d["Activity Type"] === 'Run').reduce((accum, curr) => {
      const date = curr["Activity Date"];
      const distance = curr["Distance"] / 1609.34;
      const parsedDate = new Date(date);
      const month = parsedDate.getMonth();
      const day = parsedDate.getDate();
      const year = parsedDate.getFullYear();
      const newDate = `${year}-${month + 1}`

      if (isAm(date)) {
        if (!accum.amData[newDate]) {
          accum.amData[newDate] = distance
          accum.pmData[newDate] = accum.pmData[newDate] || 0
        } else {
          const currAmDis = accum.amData[newDate];
          const newAmDist = currAmDis + distance;
          accum.amData[newDate] = newAmDist
        }
      } else {
        if (!accum.pmData[newDate]) {
          accum.pmData[newDate] = distance
          accum.amData[newDate] =accum.amData[newDate] || 0
        } else {
          const currPmDis = accum.pmData[newDate];
          const newPmDist = currPmDis + distance;
          accum.pmData[newDate] = newPmDist
        }
      }

      return accum;

    }, {amData: {}, pmData: {}})

    const amData = Object.keys(monthData.amData).map((date) => {
      return {x: date, y: monthData.amData[date]}
    })

    const pmData = Object.keys(monthData.pmData).map((date) => {
      return {x: date, y: monthData.pmData[date]}
    })




    return [{id: 'am', data: amData, color: 'hsl(243, 89%, 48%)'}, {id: 'pm', data: pmData, color: 'hsl(352, 89%, 48%)'}]
  }

  return (
    <Wrapper>
      <Line
        width={1000}
        height={500}
        data={parsedData()}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: 'date',
            legendOffset: 80,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'distance (miles)',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={3}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        colors={{ scheme: 'category10' }}
        useMesh={true}
        enableArea={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </Wrapper>
  )
}

export default Chart;