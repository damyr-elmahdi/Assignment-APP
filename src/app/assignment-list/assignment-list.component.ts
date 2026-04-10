import { Component , EventEmitter , Input , Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../assignment.service';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-list.component.html',
})
export class AssignmentListComponent {
@Input( ) assignments: Assignment[] = [];

@Output() viewDetails = new EventEmitter<Assignment>();
@Output() ViewUpdate = new EventEmitter<Assignment>();
@Output() delete = new EventEmitter<number>();
@Output() addNew = new EventEmitter<void>(); 

onAddNew(){
  this.addNew.emit();
}

onViewDetails(assignment: Assignment){
  this.viewDetails.emit(assignment);
}

onViewUpdate(assignment: Assignment){
  this.viewDetails.emit(assignment);
}
onDelete(id: number){
  this.delete.emit(id);
}

}
