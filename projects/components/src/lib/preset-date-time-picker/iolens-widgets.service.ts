import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

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
      startTime: moment().unix(),
      endTime: moment().unix(),
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
        timeOb.startTime = moment()
          .startOf('day')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        if (timeOb.startTime > moment().unix())
          timeOb.startTime = moment()
            .startOf('day')
            .subtract(1, 'day')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
        timeOb.endTime = moment().unix();
        break;
      case 'yesterday':
        timeOb.startTime = moment()
          .subtract(1, 'd')
          .startOf('day')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment().subtract(1, 'day').endOf('day').unix();
        break;
      case 'currentWeek':
        timeOb.startTime = moment()
          .startOf('week')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment().unix();
        break;
      case 'currentMonth':
        timeOb.startTime = moment()
          .startOf('month')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment().unix();
        break;
      case 'currentYear':
        timeOb.startTime = moment()
          .startOf('year')
          .add(cycleTimeHr, 'hours')
          .add(cycleTimeMin, 'minutes')
          .unix();
        timeOb.endTime = moment().unix();
        break;
      case 'previousXDays':
        if (includeToggle) {
          timeOb.startTime = moment()
            .subtract(durationNumber - 1, 'days')
            .startOf('day')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment().unix();
        } else {
          timeOb.startTime = moment()
            .subtract(durationNumber, 'days')
            .startOf('day')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment().subtract(1, 'day').endOf('day').unix();
        }
        break;
      case 'previousXWeeks':
        if (!includeToggle) {
          if (moment().day() < selectedDay) {
            timeOb.startTime = moment()
              .subtract(durationNumber + 1, 'week')
              .startOf('week')
              .add(selectedDay, 'day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            timeOb.endTime = moment()
              .subtract(1, 'week')
              .startOf('week')
              .add(selectedDay, 'day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          } else {
            // Calculate the start of the previous week
            var startOfPreviousWeek = moment()
              .startOf('week')
              .subtract(durationNumber, 'week');

            // Calculate timeOb.startTime
            timeOb.startTime = startOfPreviousWeek
              .add(selectedDay, 'days')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();

            // Calculate timeOb.endTime
            var endOfPreviousWeek = moment()
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
          timeOb.startTime = moment()
            .subtract(durationNumber - 1, 'week')
            .startOf('week')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment().unix();
        }
        break;
      case 'previousXMonths':
        if (!includeToggle) {
          if (moment().date() < selectedDate) {
            let prevMonthDays = moment()
              .subtract(durationNumber + 1, 'month')
              .daysInMonth();
            let lastMonthDays = moment().subtract(1, 'month').daysInMonth();
            const currentDate =
              selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
            const prevDate =
              selectedDate > lastMonthDays ? lastMonthDays : selectedDate;
            console.log({ currentDate, prevDate });
            timeOb.startTime = moment()
              .subtract(durationNumber + 1, 'month')
              .date(currentDate)
              .startOf('day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            timeOb.endTime = moment()
              .subtract(1, 'month')
              .date(prevDate)
              .startOf('day')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          } else {
            timeOb.startTime = moment()
              .startOf('month')
              .subtract(durationNumber, 'month')
              .date(selectedDate)
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            // Calculate the last day of the month for endTime
            timeOb.endTime = moment()
              .subtract(1, 'month')
              .endOf('month')
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          }
        } else {
          timeOb.startTime = moment()
            .subtract(durationNumber - 1, 'month')
            .startOf('month')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment().unix();
        }
        break;
      case 'previousXYears':
        if (!includeToggle) {
          const monthNumber = selectedMonth - 1;
          if (moment().month() < monthNumber) {
            let prevMonthDays = moment()
              .subtract(durationNumber + 1, 'year')
              .startOf('year')
              .month(monthNumber)
              .daysInMonth();
            const currentDays =
              selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
            timeOb.startTime = moment()
              .subtract(durationNumber + 1, 'year')
              .startOf('year')
              .month(monthNumber)
              .date(currentDays)
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
            timeOb.endTime = moment()
              .subtract(1, 'year')
              .startOf('year')
              .month(monthNumber)
              .date(currentDays)
              .add(cycleTimeHr, 'hours')
              .add(cycleTimeMin, 'minutes')
              .unix();
          } else {
            let prevMonthDays = moment()
              .startOf('year')
              .subtract(durationNumber, 'year')
              .month(monthNumber)
              .daysInMonth();
            let currentDays =
              selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
            if (
              (moment().date() >= currentDays &&
                moment().month() == monthNumber) ||
              moment().month() > monthNumber
            ) {
              timeOb.startTime = moment()
                .startOf('year')
                .subtract(durationNumber, 'year')
                .month(monthNumber)
                .date(currentDays)
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
              // Calculate the end of the previous year
              timeOb.endTime = moment()
                .subtract(durationNumber, 'year')
                .endOf('year')
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
            } else {
              prevMonthDays = moment()
                .subtract(durationNumber, 'year')
                .startOf('year')
                .month(monthNumber)
                .daysInMonth();
              currentDays =
                selectedDate > prevMonthDays ? prevMonthDays : selectedDate;
              timeOb.startTime = moment()
                .subtract(durationNumber + 1, 'year')
                .startOf('year')
                .month(monthNumber)
                .date(currentDays)
                .startOf('day')
                .add(cycleTimeHr, 'hours')
                .add(cycleTimeMin, 'minutes')
                .unix();
              timeOb.endTime = moment()
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
          timeOb.startTime = moment()
            .subtract(durationNumber - 1, 'year')
            .startOf('year')
            .add(cycleTimeHr, 'hours')
            .add(cycleTimeMin, 'minutes')
            .unix();
          timeOb.endTime = moment().unix();
        }
        break;
      default:
        break;
    }
    if (timeOb.endTime > moment().unix() || timeOb.startTime == timeOb.endTime)
      timeOb.endTime = moment().unix();
    if (!isUnix) {
      timeOb.startTime *= 1000;
      timeOb.endTime *= 1000;
    }
    return timeOb;
  }
}
