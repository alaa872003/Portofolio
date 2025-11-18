import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProfile } from '../../core/models/userProfile.model';
import { UserProfileService } from '../../core/services/user-profile.service';
import { Comment } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

   profile!: IProfile;

  constructor(private profileService: UserProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
              console.log("PROFILE FROM API: ", data);  
        this.profile = data;
        console.log(this.profile)
      },
      error: (err) => console.error(err)
    });
  }

}
