import React from 'react';
import UikChart from '../../@uik/UikChart';
import '../../@uik/UikChart/chartjs.scss';
import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikInput,
  UikDivider
} from '../../@uik';
import { DoughnutOptions } from './DoughnutOptions';

export const QuestionChart = props => {
  const {
    title,
    amount,
    pointsEach,
    creditForEach,
    pointsExpected,
    comment
  } = props;

  const pointsEarned = (creditForEach, amount, pointsEach) => {
    return creditForEach ? amount * pointsEach : amount > 0 ? pointsEach : 0;
  };

  const styles = {
    width: '300px',
    margin: '20px'
  };

  return (
    <div style={styles}>
      <UikWidget style={{ marginBottom: '10px' }}>
        <UikWidgetHeader
          style={{
            minHeight: '100px',
            paddingTop: '5px',
            paddingBottom: '5px'
          }}
        >
          {title}
          <h5 style={{ color: '#CCC', margin: 0, padding: 0 }}>
            {pointsEach} point{pointsEach > 1 ? 's ' : ' '}
            {creditForEach ? 'each' : 'total'}
          </h5>
        </UikWidgetHeader>
        <UikWidgetContent style={{ padding: '10px' }}>
          {/* Points Each: {pointsEach}
          Credit for Each: {creditForEach}
          Points Earned: {pointsEarned}
          Points Expected: {pointsExpected} */}
          <div style={{ display: 'flex' }}>
            <UikChart
              chartType='Doughnut'
              data={{
                datasets: [
                  {
                    data: [100]
                  }
                ],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [`Goal: ${pointsExpected}`]
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
              <h1>{amount}</h1>
              <UikDivider />
              <h3
                style={{
                  textAlign: 'center',
                  paddingBottom: '0px',
                  marginBottom: '0px'
                }}
              >
                Points{'\n'}Earned
              </h3>
              <h3>{pointsEarned(creditForEach, amount, pointsEach)}</h3>
            </div>
          </div>
        </UikWidgetContent>
      </UikWidget>
      <UikInput
        label='Comment'
        defaultValue={comment}
        style={{ width: '89%' }}
      />
    </div>
  );
};
