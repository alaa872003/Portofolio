import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { SkillService } from '../../core/services/skill.service';
import { ISkill } from '../../core/models/skill.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-skill',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-skill.html',
  styleUrls: ['./dashboard-skill.css'],
})
export class DashboardSkill implements OnInit {

  skills: ISkill[] = [];
  skillForm!: FormGroup;
  editingSkillName: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private _skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.skillForm = this._fb.group({
      name: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    });

    this.loadSkills();
  }

  loadSkills(): void {
    this._skillService.getSkills().subscribe({
      next: (data: ISkill[]) => (this.skills = data),
      error: (err: unknown) => console.error(err),
    });
  }

  startEdit(skill: ISkill): void {
    this.editingSkillName = skill.name;
    this.skillForm.patchValue({
      name: skill.name,
      percentage: skill.percentage,
    });
  }

  cancelEdit(): void {
    this.editingSkillName = null;
    this.skillForm.reset();
  }

  addSkill(): void {
    if (this.skillForm.invalid || this.editingSkillName) return;

    this._skillService.addSkill(this.skillForm.value as ISkill).subscribe({
      next: () => {
        this.skillForm.reset();
        this.loadSkills();
      },
      error: (err: unknown) => console.error(err),
    });
  }

  updateSkill(): void {
    if (!this.editingSkillName || this.skillForm.invalid) return;

    this._skillService.updateSkill(
      this.editingSkillName,
      this.skillForm.value as ISkill
    ).subscribe({
      next: () => {
        this.editingSkillName = null;
        this.skillForm.reset();
        this.loadSkills();
      },
      error: (err: unknown) => console.error(err),
    });
  }

  deleteSkill(name: string): void {
    this._skillService.deleteSkill(name).subscribe({
      next: () => this.loadSkills(),
      error: (err: unknown) => console.error(err),
    });
  }
}
