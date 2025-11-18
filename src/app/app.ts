import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/shared/header/header';
import { Footer } from './layout/shared/footer/footer';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { Skill } from './layout/skill/skill';
import { Project } from './layout/project/project';
import { ContactUs } from './layout/contact-us/contact-us';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,Home,About,Skill,Project,ContactUs],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portofolio');
}
