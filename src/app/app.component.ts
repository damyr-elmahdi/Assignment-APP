import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssignmentService , Assignment } from './assignment.service';
import { AssignmentListComponent } from "./assignment-list/assignment-list.component";
import { AssignmentAddComponent } from "./assignment-add/assignment-add.component";
import { AssignmentDetailsComponent } from "./assignment-details/assignment-details.component";
import { AssignmentUpdateComponent } from "./assignment-update/assignment-update.component";

// This is a custom type (called TypeScript Union Type).
// It means: the variable currentView can only have one of these 4 values: 'list', 'add', 'details', or 'update'.
// This helps prevent mistakes (Angular will show an error if you type something else).

type viewMode = 'list' | 'add' | 'details' | 'update' ;
@Component({
  selector: 'app-root',
  imports: [CommonModule, AssignmentListComponent, AssignmentAddComponent, AssignmentDetailsComponent, AssignmentUpdateComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
currentView: viewMode = 'list';
assignments: Assignment[] = [];
selectedAssignment?: Assignment ;

constructor (private assignmentService: AssignmentService){} 

//ngOnInit() is a special method that runs after the component is ready.
ngOnInit(): void {
// .subscribe(...): Because the service returns an Observable, we "listen" to it.
  this.assignmentService.getAssignments().subscribe(data => {
    this.assignments = data;
  });
} 
 
showList(){
  this.currentView = 'list';
  this.selectedAssignment = undefined;
}

showAdd(){
  this.currentView = 'add'
}

showDetails(assignment: Assignment){
  this.selectedAssignment = assignment;
  this.currentView = 'details';
}

showUpdate(assignment: Assignment){
  this.selectedAssignment = {...assignment}; // Create a copy to avoid changing the original until we save
  this.currentView = 'update';
}

deleteAssignment(id: number){
  if (confirm('Delete this assignment?  ')){
    this.assignmentService.deleteAssignment(id);
  }
}

onAssignmentAdded(newAssignment: Omit<Assignment, 'id'>) {
  this.assignmentService.addAssignment(newAssignment);
  this.showList();
}

onAssignmentUpdated(updated: Assignment){
  this.assignmentService.updateAssignment(updated);
  this.showList();
}


}
