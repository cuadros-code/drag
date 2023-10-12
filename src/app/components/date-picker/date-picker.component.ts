import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  datePicker = this.fb.group({
    day   : ['', Validators.required],
    month : ['', Validators.required],
    year  : ['', Validators.required],
  })

  availableYears: number[] = [];
  availableMonth = ["Enero", "Febrero", "Marzo", "Abril", 
           "Mayo", "Junio", "Julio", "Agosto", 
           "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  availableDay: any = []

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      this.availableYears.push(i);
    }

    this.datePicker.valueChanges.subscribe(form => {
      if(form.year && form.month){
        const currentMonth = this.availableMonth.indexOf(form.month)
        const days = this.getDaysInMonth(form.year, currentMonth + 1)
        this.availableDay = Array(days)
      }
    })

  }

  getDaysInMonth(year: any, month: any) {
    const date = new Date(year, month , 0);
    return date.getDate();
  }

}
