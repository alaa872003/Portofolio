import { Component, Input } from '@angular/core';
import { IProject } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
    standalone:true,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
    @Input() project!: IProject;

}
