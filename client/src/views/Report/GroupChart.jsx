import React from 'react';
import UikChart from '../../@uik/UikChart';
import '../../@uik/UikChart/chartjs.scss';
import { UikWidget, UikWidgetHeader, UikWidgetContent } from '../../@uik';

export const GroupChart = props => {
  const { groupPoints } = props;

  const styles = {
    width: '600px',
    margin: '20px'
  };

  const pointsData = Object.values(groupPoints).reduce(
    (acc, curr) => {
      acc.labels.push(curr.name);
      acc.currentWeekPoints.push(curr.currentWeekPoints);
      acc.previousWeekPoints.push(curr.previousWeekPoints);
      return acc;
    },
    {
      labels: [],
      currentWeekPoints: [],
      previousWeekPoints: []
    }
  );

  return (
    <div style={styles}>
      <UikWidget>
        <UikWidgetHeader>Group Points</UikWidgetHeader>
        <UikWidgetContent>
          <UikChart
            chartType='Bar'
            data={{
              labels: pointsData.labels,
              datasets: [
                {
                  label: 'Current Week',
                  backgroundColor: '#0D3B95',
                  data: pointsData.currentWeekPoints
                },
                {
                  label: 'Previous Week',
                  backgroundColor: '#CCC',
                  data: pointsData.previousWeekPoints
                }
              ],
              options: {
                scales: {
                  xAxes: [
                    {
                      barThickness: 500
                    }
                  ]
                }
              }
            }}
            height={174}
          />
        </UikWidgetContent>
      </UikWidget>
    </div>
  );
};
