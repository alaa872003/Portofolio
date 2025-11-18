import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { IProject } from '../../core/models/project.model';

@Component({
  selector: 'app-dashboard-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-project.html',
  styleUrl: './dashboard-project.css',
})
export class DashboardProject implements OnInit {

  projectForm!: FormGroup;
  projects: IProject[] = [];

  selectedFile!: File | null;
  previewImg: string | null = null;

  editingTitle: string | null = null;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      githubLink: [''],
      liveLink: [''],
    });

    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data: IProject[]) => (this.projects = data),
      error: err => console.error(err),
    });
  }

  onFileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => (this.previewImg = reader.result as string);
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(): void {
    const formData = new FormData();

    Object.keys(this.projectForm.value).forEach(key => {
      formData.append(key, this.projectForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('projectImg', this.selectedFile);
    }

    if (!this.editingTitle) {
      this.projectService.addProject(formData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProjects();
        },
      });
    } else {
      formData.append('newTitle', this.projectForm.value.title);

      this.projectService.updateProject(this.editingTitle, formData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProjects();
        },
      });
    }
  }

  startEdit(p: IProject): void {
    this.editingTitle = p.title;

    this.previewImg = `http://localhost:3000/projectFiles/${p.image}`;
    this.selectedFile = null;

    this.projectForm.patchValue({
      title: p.title,
      description: p.description,
      githubLink: p.githubLink,
      liveLink: p.liveLink,
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.projectForm.reset();
    this.previewImg = null;
    this.selectedFile = null;
    this.editingTitle = null;
  }

  deleteProject(title: string): void {
    this.projectService.deleteProject(title).subscribe({
      next: () => this.loadProjects(),
      error: err => console.error(err),
    });
  }
}
