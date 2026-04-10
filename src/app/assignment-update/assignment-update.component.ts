import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Assignment } from '../assignment.service';

@Component({
  selector: 'app-assignment-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assignment-update.component.html'
})
export class AssignmentUpdateComponent implements OnInit {  

  @Input() assignment?: Assignment;
  @Output() assignmentUpdated = new EventEmitter<Assignment>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['Pending'],        
      priority: ['Medium']
    });
  }

  ngOnInit() {
    if (this.assignment) {
      this.form.patchValue(this.assignment);
    }
  }

  onSubmit() {                   
    if (this.form.valid && this.assignment) {
      this.assignmentUpdated.emit(this.form.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}