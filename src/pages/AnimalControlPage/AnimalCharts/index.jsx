import React, { useState } from 'react';
import { useStyles } from './styles';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { Dialog, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { chartData, chartDetailOptions, chartOptions } from './constants';

function AnimalCharts() {
  const classes = useStyles();
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <Grid container xs={12} className={classes.container}>
      <Grid item container lg={7} xs={12}>
        <Grid item container xs={12} spacing={2} justify={'center'} className={classes.cardContainer}>
          {
            chartData.map(chart => <Grid key={`chart-detail-${chart.id}`} item md={4} xs={12}>
                <Paper elevation={1} className={classes.userItemContainer} onClick={() => setOpenDetail(true)}>
                  <Typography color={'primary'} align={'center'} className={classes.userItemNumber}>
                    {chart.number}
                  </Typography>
                  <Typography variant={'body2'} align={'center'} className={classes.userItemText}>
                    {chart.text}
                  </Typography>
                  <div className={classes.percentage}>
                    {chart.percentage > 0 ?
                      <TrendingUpIcon className={clsx(classes.icon, classes.iconAsc)} />
                      :
                      <TrendingUpIcon className={clsx(classes.icon, classes.iconDesc)} />
                    }
                    <Typography variant={'body2'} align={'center'}
                                className={clsx(classes.percentageText, chart.percentage < 0 ? classes.descTex : classes.ascText)}>
                      {`${chart.percentage}%`}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            )
          }
        </Grid>
      </Grid>
      <Grid item container lg={5} xs={12} justify={'center'} className={classes.highchartContainer}>
        <Paper className={classes.highchart}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Paper>
      </Grid>
      <Dialog
        open={openDetail}
        fullWidth
        onClose={()=>setOpenDetail(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paperFullWidth: classes.modal}}
      >
        <HighchartsReact highcharts={Highcharts} options={chartDetailOptions} />
      </Dialog>
    </Grid>
  );
};

export default AnimalCharts;
