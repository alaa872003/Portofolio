import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css',
})
export class SkillCard {
   @Input() name!: string;
   @Input() percentage!: number;
   @Input() icon!: string;

getIconClass() {
  const brands = ['html5', 'angular', 'react', 'node', 'github', 'linkedin'];

  if (brands.includes(this.icon.toLowerCase())) {
    return ['fa-brands', `fa-${this.icon}`];
  }

  return ['fa-solid', `fa-${this.icon}`];
}

}
