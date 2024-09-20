import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { IOLensWidgetsService } from './iolens-widgets.service';
import * as moment_ from 'moment';
const moment = moment_;
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'preset-date-time-picker',
  templateUrl: './preset-date-time-picker.component.html',
  styleUrls: ['./preset-date-time-picker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class PresetDateTimePickerComponent implements OnInit {
  @ViewChild('calendarRef') calendarRef: ElementRef | undefined;

  currentStartTime: any;
  currentEndTime: any;

  init: boolean = true;
  showCalendar: boolean = false;
  currentIndex: number;
  activeIndex: number = 0;
  allDurations: any = [
    {
      name: 'Today',
      duration: {
        value: 'today',
        viewValue: 'Today',
      },
      durationNumber: 0,
      periodicities: ['Hourly'],
      includeToggle: false,
      hovered: false,
    },
    {
      name: 'Yesterday',
      duration: {
        value: 'yesterday',
        viewValue: 'Yesterday',
      },
      durationNumber: 0,
      periodicities: ['Hourly'],
      includeToggle: false,
    },
    {
      name: 'This Week (Sun - Today)',
      duration: {
        value: 'currentWeek',
        viewValue: 'Current Week',
      },
      durationNumber: 0,
      periodicities: ['Hourly', 'Daily'],
      includeToggle: false,
    },
    {
      name: 'Last Week (Sun - Sat)',
      duration: {
        value: 'previousXWeeks',
        viewValue: 'Previous X Weeks',
      },
      durationNumber: 1,
      periodicities: ['Daily'],
      includeToggle: false,
    },
    {
      name: 'Last 7 Days',
      duration: {
        value: 'previousXDays',
        viewValue: 'Previous X Days',
      },
      durationNumber: 7,
      periodicities: ['Hourly', 'Daily'],
      includeToggle: false,
    },
    {
      name: 'This Month',
      duration: {
        value: 'currentMonth',
        viewValue: 'Current Month',
      },
      durationNumber: 0,
      periodicities: ['Daily', 'Weekly'],
      includeToggle: false,
    },
    {
      name: 'Last Month',
      duration: {
        value: 'previousXMonths',
        viewValue: 'Previous X Months',
      },
      durationNumber: 1,
      periodicities: ['Daily', 'Weekly'],
      includeToggle: false,
    },
    {
      name: 'Last 30 Days',
      duration: {
        value: 'previousXDays',
        viewValue: 'Previous X Days',
      },
      durationNumber: 30,
      periodicities: ['Daily', 'Weekly'],
      includeToggle: true,
    },
    {
      name: 'Last 90 Days',
      duration: {
        value: 'previousXDays',
        viewValue: 'Previous X Days',
      },
      durationNumber: 90,
      periodicities: ['Weekly', 'Monthly'],
      includeToggle: true,
    },
    {
      name: 'Last 12 Months',
      duration: {
        value: 'previousXMonths',
        viewValue: 'Previous X Months',
      },
      durationNumber: 12,
      periodicities: ['Weekly', 'Monthly'],
      includeToggle: false,
    },
    {
      name: 'This Year',
      duration: {
        value: 'currentYear',
        viewValue: 'Current Year',
      },
      durationNumber: 0,
      periodicities: ['Weekly', 'Monthly', 'Quaterly'],
      includeToggle: false,
    },
    {
      name: 'Last Calendar Year',
      duration: {
        value: 'previousXYears',
        viewValue: 'Previous X Years',
      },
      durationNumber: 1,
      periodicities: ['Weekly', 'Monthly', 'Quaterly'],
      includeToggle: false,
    },
  ];
  activePeriod: string;
  allPeriods: any = [];
  maximumDate: Date;
  selectedDate: any;
  startDate: any = moment_().subtract(7, 'days').startOf('day');
  endDate: any = moment_().startOf('day');

  @Input() type: 'date' | 'date-time-period' | 'date-time' = 'date';
  @Input() defaultDuration: string = 'Last 30 Days';
  @Input() emitInitially: boolean = true;
  @Input() showDurationLabels: boolean = true;
  @Input() timeConfig: any = {
    cycleTimeHr: 0,
    cycleTimeMin: 0,
    selectedDate: 1,
    selectedDay: 0,
    selectedMonth: 1,
  };
  @Output() timeChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    var clickInside = false;
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.contains('mat-calendar-body-cell-content') &&
      event.target.classList.contains('mat-focus-indicator')
    ) {
      clickInside = true;
    } else {
      // Check if the click was inside
      clickInside =
        this.elRef.nativeElement
          .querySelector('.duration-container')
          .contains(event.target) ||
        (this.showCalendar &&
          this.elRef.nativeElement
            .querySelector('.time-calendar-container')
            .contains(event.target));
    }
    if (this.showCalendar && !clickInside) {
      this.showCalendar = false; // Hide the calendar
    }
  }

  // Patterns
  DATE_PATTERN = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
  TIME_PATTERN = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;

  // Form
  timeConfigForm: UntypedFormGroup = new UntypedFormGroup({
    startDate: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.DATE_PATTERN),
    ]),
    startTime: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.TIME_PATTERN),
    ]),
    endDate: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.DATE_PATTERN),
    ]),
    endTime: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.TIME_PATTERN),
    ]),
  });

  constructor(
    private _ioLensWidgetService: IOLensWidgetsService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.markEndDateAsTouched();
    this.maximumDate = this.endDate.toDate();
    this.initPreview();
  }

  markEndDateAsTouched(): void {
    const endDateControl = this.timeConfigForm.get('endDate');
    if (endDateControl) {
      endDateControl.markAsTouched();
    }
  }

  initPreview() {
    // setting default duration to 30 days
    this.activeIndex = this.allDurations.findIndex(
      (duration) => duration.name == this.defaultDuration
    );
    this.currentIndex = this.activeIndex;
    if (this.emitInitially) this.fetchTime();
    else {
      const startTime = moment_().startOf('day');
      const endTime = moment_();
      this.currentStartTime = startTime.unix();
      this.currentEndTime = endTime.unix();
      this.timeConfigForm.patchValue({
        startDate: startTime.format('DD/MM/YYYY'),
        endDate: endTime.format('DD/MM/YYYY'),
        startTime: '00:00',
        endTime: '23:59',
      });
      this.selectedDate = new DateRange(startTime.toDate(), endTime.toDate());
    }
    this.listenToForm();
  }

  setActiveIndex(ind: number) {
    //on preset click
    this.currentIndex = ind;
  }

  changeCalendarToggle() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.currentIndex = this.activeIndex;
    }
  }

  listenToForm() {
    this.timeConfigForm.valueChanges.subscribe((resp) => {
      if (this.timeConfigForm.valid && !this.init) {
        this.currentIndex = -1;
        const startDate = moment_(resp.startDate, 'DD/MM/YYYY').toDate();
        const endDate = moment_(resp.endDate, 'DD/MM/YYYY').toDate();
        this.selectedDate = new DateRange(startDate, endDate);
      }
      this.init = false;
    });
  }

  applyTime() {
    var { startTime, endTime, startDate, endDate } = this.timeConfigForm.value;
    const [startHr, startMin] = startTime.split(':');
    const [endHr, endMin] = endTime.split(':');
    this.currentEndTime = moment_(endDate, 'DD/MM/YYYY')
      .add(+endHr, 'hour')
      .add(+endMin, 'minute')
      .unix();
    this.currentStartTime = moment_(startDate, 'DD/MM/YYYY')
      .add(+startHr, 'hour')
      .add(+startMin, 'minute')
      .unix();
    this.showCalendar = false;
    this.activeIndex = this.currentIndex;
    if (this.currentIndex != -1) {
      this.fetchTime();
      return;
    }
    this.emitTime();
  }

  fetchTime() {
    const timeConfig = this.timeConfig;
    const defaultDuration = this.allDurations[this.activeIndex];
    this.allPeriods = defaultDuration.periodicities;
    this.activePeriod =
      this.allPeriods.find(
        (period) => period == timeConfig.defaultPeriodicity
      ) || this.allPeriods[0];
    const timeOb = this._ioLensWidgetService.getTimeFromNewPicker(
      timeConfig,
      defaultDuration,
      true
    );
    const { startTime, endTime } = timeOb;
    this.currentEndTime = endTime;
    this.currentStartTime = startTime;
    const startDatemoment_ = moment_(startTime * 1000);
    const endDatemoment_ = moment_(endTime * 1000);
    this.timeConfigForm.patchValue({
      startDate: startDatemoment_.format('DD/MM/YYYY'),
      endDate: endDatemoment_.format('DD/MM/YYYY'),
      startTime: startDatemoment_.format('HH:mm'),
      endTime: endDatemoment_.format('HH:mm'),
    });
    this.selectedDate = new DateRange(
      startDatemoment_.toDate(),
      endDatemoment_.toDate()
    );
    this.emitTime();
  }

  emitTime() {
    if (this.type == 'date-time-period')
      this.timeChange.emit({
        startTime: this.currentStartTime,
        endTime: this.currentEndTime,
        periodicity: this.activePeriod,
      });
    else
      this.timeChange.emit({
        startTime: this.currentStartTime,
        endTime: this.currentEndTime,
      });
  }

  setCurrentPeriod(period: string) {
    this.activePeriod = period;
    this.emitTime();
  }

  onSelectedChange(date: any) {
    this.currentIndex = -1;
    var { startTime, endTime } = this.timeConfigForm.value;
    const [startHr, startMin] = startTime.split(':');
    const [endHr, endMin] = endTime.split(':');

    // Handle the case where selectedDate is null or undefined
    const selectedStart = this.selectedDate?.start
      ? moment_(this.selectedDate.start)
      : null;
    const selectedEnd = this.selectedDate?.end
      ? moment_(this.selectedDate.end)
      : null;
    const newDate = moment_(date).startOf('day');

    if (selectedStart && selectedEnd) {
      // Both start and end dates are selected, set new date as the start date
      var startDate = newDate.add(startHr, 'hour').add(startMin, 'minutes');
      var endDate = null;
      this.selectedDate = new DateRange(startDate.toDate(), null);
    } else if (selectedStart && newDate.isBefore(selectedStart)) {
      // Update the start date if the new date is before the current start date
      var startDate = newDate.add(startHr, 'hour').add(startMin, 'minutes');
      var endDate = null;
      this.selectedDate = new DateRange(startDate.toDate(), null);
    } else {
      // Default behavior
      var startDate = selectedStart
        ? selectedStart
            .startOf('day')
            .add(startHr, 'hour')
            .add(startMin, 'minutes')
        : newDate.add(startHr, 'hour').add(startMin, 'minutes');
      var endDate: any = moment_(date)
        .startOf('day')
        .add(endHr, 'hour')
        .add(endMin, 'minutes');

      if (
        this.selectedDate &&
        this.selectedDate.start &&
        date > this.selectedDate.start &&
        !this.selectedDate.end
      ) {
        this.selectedDate = new DateRange(startDate.toDate(), endDate.toDate());
      } else {
        const dateWithCycleTime = newDate
          .add(startHr, 'hour')
          .add(startMin, 'minutes')
          .toDate();
        this.selectedDate = new DateRange(dateWithCycleTime, null);
      }
    }
    this.timeConfigForm.patchValue({
      startDate: startDate.format('DD/MM/YYYY'),
      endDate: endDate == null ? endDate : endDate.format('DD/MM/YYYY'),
    });
  }
}
