import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// A BehaviorSubject so components can receive live updates
// Methods: get all, get by id, add, update, delete
// Why we use BehaviorSubject?
// So when you add, update or delete an assignment, the list automatically updates on the screen.

export interface Assignment {
  id: number;
  title : string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'In progress' | 'Completed';
  priority?: 'Low' | 'Medium' | 'High';
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private assignments: Assignment[] = [
{    
    id: 1,
    title: 'Math Homework',
    description: 'Complete exercises 1-10 on page 42',
    dueDate: '2024-07-01',
    status: 'pending',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Science Project',
    description: 'Build a model of the solar system',
    dueDate: '2024-07-15',
    status: 'In progress',
    priority: 'Medium'
  }
  ];

  private assignmentsSubject = new BehaviorSubject<Assignment[]>(this.assignments);
  
  // use asObservable() so other components cannot accidentally change the data directly.
  getAssignments(): Observable<Assignment[]>{
    return this.assignmentsSubject.asObservable();
  }
  // Find one assignment by its id
  getAssignmentById(id: number):Assignment | undefined {
    return this.assignments.find(a=> a.id ===id);
  }

  addAssignment(assignment: Omit<Assignment, 'id'>): void{
    const newAssignment: Assignment = {
      ...assignment, 
      id: Math.max(0, ...this.assignments.map(a=> a.id)) + 1
      };
      this.assignments.push(newAssignment);
      this.assignmentsSubject.next([...this.assignments]);
  }

  updateAssignment(updated: Assignment): void {
    const index =this.assignments.findIndex(a=>a.id === updated.id);
    if(index !== -1){
      this.assignments[index] = { ...updated};
      this.assignmentsSubject.next([...this.assignments]);
    }
  }
  deleteAssignment(id: number): void {
    this.assignments = this.assignments.filter(a=> a.id !== id);
    this.assignmentsSubject.next([...this.assignments]);
  }


  
  constructor() { }
}
