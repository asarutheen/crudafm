import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }
  dataSet: any;
  displayedColumns = ['fullName', 'city', 'mobile', 'hireDate', 'action'];

  ngOnInit(): void {
    this.employeeService.getAll().subscribe( (res: any) => {
      this.dataSet = res.map(item => {
        const data = item.payload.doc.data();
        data.id = item.payload.doc.id; 
        return data;
      })
      console.log(this.dataSet)
    })
  }

  deleteEmployee(data){
    this.employeeService.delete(data);
    this._snackBar.open("Employee Deleted Successfully", '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['notification', 'warn']})
  }

  editEmployee(data) {
    this.employeeService.populateFormData(data);
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '60%',
    });
  }

  onCreate() {
    this.employeeService.initializeFormGroup();
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '60%',
    });
  }
}
