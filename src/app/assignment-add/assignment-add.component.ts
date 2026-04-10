import { Component, EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Assignment } from '../assignment.service';
@Component({
  selector: 'app-assignment-update',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './assignment-add.component.html'
  
})
export class AssignmentAddComponent {
  @Output() assignmentAdded = new EventEmitter<Omit<Assignment, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form : FormGroup; 

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      title:['',Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['pending'],
      priority: ['Medium']
    })
  }
  onSubmit(){
    if (this.form.valid){
      this.assignmentAdded.emit(this.form.value);

    }
  }

  onCancel(){
    this.cancel.emit();
  }

}
