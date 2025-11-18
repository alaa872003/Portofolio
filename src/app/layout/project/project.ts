import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCard } from './project-card/project-card';
import { IProject } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project',
  standalone:true,
  imports: [RouterLink,ProjectCard],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.log(err),
    });
  }
}
