import React from 'react';
import UikChart from '../../@uik/UikChart';
import '../../@uik/UikChart/chartjs.scss';
import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikInput
} from '../../@uik';

export const QuestionChart = props => {
  const {
    title,
    pointsEach,
    creditForEach,
    pointsEarned,
    pointsExpected,
    comment
  } = props;

  const styles = {
    width: '380px'
  };

  return (
    <div style={styles}>
      <UikWidget>
        <UikWidgetHeader>{title}</UikWidgetHeader>
        <UikWidgetContent>
          Points Each: {pointsEach}
          Credit for Each: {creditForEach}
          Points Earned: {pointsEarned}
          Points Expected: {pointsExpected}
          <UikChart
            chartType='doughnut'
            data={{
              datasets: [
                {
                  data: [10, 20, 30]
                }
              ],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: ['Red', 'Yellow', 'Blue']
            }}
            height={300}
          />
        </UikWidgetContent>
      </UikWidget>
      <UikInput label='Comment' defaultValue={comment} style={styles} />
    </div>
  );
};
