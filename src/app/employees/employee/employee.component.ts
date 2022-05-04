import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeComponent>, public employeeService: EmployeeService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.employeeService.form.valid){
      if(!this.employeeService.form.get('id').value){
        this.employeeService.addEmployee(this.employeeService.form.value)
        this._snackBar.open("Employee Added Successfully", '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['notification', 'success']}
           
        )
        // this.notiService.success("Success");
      } else {
        this.employeeService.update(this.employeeService.form.value)
        this._snackBar.open("Employee Update Successfully", '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['notification', 'success']})
      }
      this.dialogRef.close();
    }
  }
  
  onReset() {
    this.employeeService.initializeFormGroup();
  }

  departments = [
    { id: 1, value: 'Dep 1'},
    { id: 2, value: 'Dep 2'},
    { id: 3, value: 'Dep 3'},
  ]

 

}
