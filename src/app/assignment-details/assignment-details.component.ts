import { Component,EventEmitter,Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../assignment.service';

@Component({
  selector: 'app-assignment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-details.component.html',
  styles: ``
})
export class AssignmentDetailsComponent {
@Input() assignment?: Assignment;
@Output()back = new EventEmitter<void>();

onBack(){
  this.back.emit();
}
}



