import React from 'react';
import UikChart from '../../@uik/UikChart';
import '../../@uik/UikChart/chartjs.scss';
import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikDivider,
  UikContentTitle
} from '../../@uik';
import { DoughnutOptions } from './DoughnutOptions';

export const WeekProgressChart = props => {
  const { pointsExpected, pointsEarned } = props;

  const styles = {
    width: '300px',
    margin: '20px'
  };

  return (
    <div style={styles}>
      <UikWidget>
        <UikWidgetHeader style={{ minHeight: '50px' }}>
          Week Progress
          <span>
            <h5 style={{ color: '#CCC', margin: 0, padding: 0 }}>
              Goal: {`${pointsExpected}`}
            </h5>
          </span>
        </UikWidgetHeader>
        <UikWidgetContent style={{ padding: '10px' }}>
          <div style={{ display: 'flex' }}>
            <UikChart
              chartType='Doughnut'
              data={{
                datasets: [
                  {
                    data: [
                      pointsEarned,
                      pointsEarned < pointsExpected
                        ? pointsExpected - pointsEarned
                        : 0
                    ],
                    backgroundColor: ['#FFD166', '#CCC']
                  }
                ]
              }}
              height={175}
              width={175}
              options={DoughnutOptions}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <h1>{pointsEarned}</h1>
              <UikContentTitle>Points{'\n'}Earned</UikContentTitle>
              <UikDivider />
            </div>
          </div>
        </UikWidgetContent>
      </UikWidget>
    </div>
  );
};
