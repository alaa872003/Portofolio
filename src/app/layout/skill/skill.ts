import { Component, OnInit } from '@angular/core';
import { SkillCard } from './skill-card/skill-card';
import { ISkill } from '../../core/models/skill.model';
import { SkillService } from '../../core/services/skill.service';

@Component({
  selector: 'app-skill',
  standalone:true,
  imports: [SkillCard],
  templateUrl: './skill.html',
  styleUrl: './skill.css',
})
export class Skill implements OnInit {

  skills: ISkill[] = []; 

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
      },
      error: (err) => console.log(err),
    });
  }
}
