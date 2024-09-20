import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment_ from 'moment';
import { HttpClient } from '@angular/common/http';
const moment = moment_;
const WIDGET_FOR_DASHBOARD = '/api/account/ioLensWidget/';
const ALL_WIDGETS = '/api/account/ioLensUserWidgetVersion';
const ADD_IOLENS_WIDGET = WIDGET_FOR_DASHBOARD + 'add';
const UPDATE_IOLENS_WIDGET = WIDGET_FOR_DASHBOARD + 'update';
const GET_WIDGET_CONFIG = WIDGET_FOR_DASHBOARD + 'config/';
const UPDATE_POSITION = '/api/account/ioLensDashboard/updatePosition';
const FILE_UPLOAD_ENDPOINT = '/api/account/s3/signedUrl';
const IMAGE_UPLOAD_ENDPOINT = '/api/account/localUpload';
const GLOBAL_TIME_PICKER_ROUTE = '/api/account/ioLensDashboard/timePickers/';
const WIDGETS_DATA = '/api/account/ioLensWidget/getWidgetData';
const WIDGETS_DATA2 = '/api/account/ioLensWidget/getWidgetData2';
const STACKED_AREA_CHART_DATA = '/api/account/ioLensWidget/stackedAreaChart';
const BAR_LINE_CHART_V2_DATA = '/api/account/ioLensWidget/getWidgetData';

@Injectable({
  providedIn: 'root',
})
export class IOLensWidgetsService {
  // Get TIme From GTP V2
  /***
   * @timeConfig : cycleTIme,CycleDay,CycleMonth
   * @durationConfig {daysCount, includeCurrentDay,duration} : incase of previous X days  sent Empty Ob in case of not applicable
   * @isUnix : boolean By Default True
   ***/
  getTimeFromNewPicker(
    timeConfig: any,
    durationConfig: any,
    isUnix: boolean = false
  ) {
    const timeOb = {
      startTime: moment_().unix(),
      endTime: moment_().unix(),
    };
    const {
      cycleTimeHr,
      cycleTimeMin,
      selectedDate,
      selectedDay,
      selectedMonth,
    } = timeConfig;
    const { durationNumber, duration, includeToggle } = durationConfig;
    switch (duration.value) {
      case 'today':
        timeOb.startTime = moment_()
          .startOf('day')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        if (timeOb.startTime > moment_().unix())
          timeOb.startTime = moment_()
            .startOf('day')
            .subtract(1, 'day')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
        timeOb.endTime = moment_().unix();
        break;
      case 'yesterday':
        timeOb.startTime = moment_()
          .subtract(1, 'd')
          .startOf('day')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment_().subtract(1, 'day').endOf('day').unix();
        break;
      case 'currentWeek':
        timeOb.startTime = moment_()
          .startOf('week')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment_().unix();
        break;
      case 'currentMonth':
        timeOb.startTime = moment_()
          .startOf('month')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment_().unix();
        break;
      case 'currentYear':
        timeOb.startTime = moment_()
          .startOf('year')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment_().unix();
        break;
      case 'previousXDays':
        if (includeToggle) {
          timeOb.startTime = moment_()
            .subtract(durationNumber - 1, 'days')
            .startOf('day')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment_().unix();
        } else {
          timeOb.startTime = moment_()
            .subtract(durationNumber, 'days')
            .startOf('day')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment_().subtract(1, 'day').endOf('day').unix();
        }
        break;
      case 'previousXWeeks':
        if (!includeToggle) {
          if (moment_().day() < selectedDay) {
            timeOb.startTime = moment_()
              .subtract(durationNumber + 1, 'week')
              .startOf('week')
              .add(selectedDay, 'day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            timeOb.endTime = moment_()
              .subtract(1, 'week')
              .startOf('week')
              .add(selectedDay, 'day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          } else {
            // Calculate the start of the previous week
            var startOfPreviousWeek = moment_()
              .startOf('week')
              .subtract(durationNumber, 'week');

            // Calculate timeOb.startTime
            timeOb.startTime = startOfPreviousWeek
              .add(selectedDay, 'days')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();

            // Calculate timeOb.endTime
            var endOfPreviousWeek = moment_()
              .startOf('week')
              .subtract(1, 'week')
              .add(selectedDay, 'days')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .add(6, 'days')
              .endOf('day');

            timeOb.endTime = endOfPreviousWeek.unix();
          }
        } else {
          timeOb.startTime = moment_()
            .subtract(durationNumber - 1, 'week')
            .startOf('week')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment_().unix();
        }
        break;
      case 'previousXMonths':
        if (!includeToggle) {
          if (moment_().date() < selectedDate) {
            let prevMonthDays = moment_()
              .subtract(durationNumber + 1, 'month')
              .daysInMonth();
            let lastMonthDays = moment_().subtract(1, 'month').daysInMonth();
            const currentDate =
              selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
            const prevDate =
              selectedDate > lastMonthDays ? lastMonthDays : selectedDate;
            console.log({ currentDate, prevDate });
            timeOb.startTime = moment_()
              .subtract(durationNumber + 1, 'month')
              .date(currentDate)
              .startOf('day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            timeOb.endTime = moment_()
              .subtract(1, 'month')
              .date(prevDate)
              .startOf('day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          } else {
            timeOb.startTime = moment_()
              .startOf('month')
              .subtract(durationNumber, 'month')
              .date(selectedDate)
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            // Calculate the last day of the month for endTime
            timeOb.endTime = moment_()
              .subtract(1, 'month')
              .endOf('month')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          }
        } else {
          timeOb.startTime = moment_()
            .subtract(durationNumber - 1, 'month')
            .startOf('month')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment_().unix();
        }
        break;
      case 'previousXYears':
        if (!includeToggle) {
          const monthNumber = selectedMonth - 1;
          if (moment_().month() < monthNumber) {
            let prevMonthDays = moment_()
              .subtract(durationNumber + 1, 'year')
              .startOf('year')
              .month(monthNumber)
              .daysInMonth();
            const currentDays =
              selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
            timeOb.startTime = moment_()
              .subtract(durationNumber + 1, 'year')
              .startOf('year')
              .month(monthNumber)
              .date(currentDays)
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            timeOb.endTime = moment_()
              .subtract(1, 'year')
              .startOf('year')
              .month(monthNumber)
              .date(currentDays)
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          } else {
            let prevMonthDays = moment_()
              .startOf('year')
              .subtract(durationNumber, 'year')
              .month(monthNumber)
              .daysInMonth();
            let currentDays =
              selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
            if (
              (moment_().date() >= currentDays &&
                moment_().month() == monthNumber) ||
              moment_().month() > monthNumber
            ) {
              timeOb.startTime = moment_()
                .startOf('year')
                .subtract(durationNumber, 'year')
                .month(monthNumber)
                .date(currentDays)
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
              // Calculate the end of the previous year
              timeOb.endTime = moment_()
                .subtract(durationNumber, 'year')
                .endOf('year')
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
            } else {
              prevMonthDays = moment_()
                .subtract(durationNumber, 'year')
                .startOf('year')
                .month(monthNumber)
                .daysInMonth();
              currentDays =
                selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
              timeOb.startTime = moment_()
                .subtract(durationNumber + 1, 'year')
                .startOf('year')
                .month(monthNumber)
                .date(currentDays)
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
              timeOb.endTime = moment_()
                .startOf('year')
                .subtract(1, 'year')
                .month(monthNumber)
                .date(currentDays)
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
            }
          }
        } else {
          timeOb.startTime = moment_()
            .subtract(durationNumber - 1, 'year')
            .startOf('year')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment_().unix();
        }
        break;
      default:
        break;
    }
    if (timeOb.endTime > moment_().unix() || timeOb.startTime == timeOb.endTime)
      timeOb.endTime = moment_().unix();
    if (!isUnix) {
      timeOb.startTime *= 1000;
      timeOb.endTime *= 1000;
    }
    return timeOb;
  }
}
