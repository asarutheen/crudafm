import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private afs: AngularFirestore) { }

  getAll() {
    return this.afs.collection('/data').snapshotChanges();
  }

  addEmployee(data) {
    // to create random unique id 
    // data.$key = this.afs.createId();

    data.hireDate = this.dateFormat(data.hireDate);
    return this.afs.collection('/data').add(_.omit(data,'id'));
  }

  update(data){
    // this.initializeFormGroup();
    data.hireDate = this.dateFormat(data.hireDate);
    return this.afs.collection('/data').doc(data.id).update(_.omit(data,'id'));
  }

  delete(data){
    // console.log(data.id);
    return this.afs.doc('/data/'+data.id).delete();
  }
  
  dateFormat(dateValue) {
    var date = new Date(dateValue), 
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var dateVal =  [mnth, day, date.getFullYear()].join("/");
    return dateVal;
  }

  populateFormData(data) {
    this.form.setValue(data);
    this.form.patchValue({ hireDate: new Date (this.dateFormat(data.hireDate) )});
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('',  Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    city: new FormControl(''),
    gender: new FormControl("1"), 
    department: new FormControl("1"),
    hireDate: new FormControl(new Date()),
    isPermanent: new FormControl(true),
  })
  
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: "1",
      department: "1",
      hireDate: new Date(),
      isPermanent: true,
    })
  }

}
