import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProfile } from '../../core/models/userProfile.model';
import { UserProfileService } from '../../core/services/user-profile.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  profile!: IProfile;

  constructor(private _profileService: UserProfileService) {}

  ngOnInit() {
    this._profileService.getProfile().subscribe({
      next: (data) =>{
        console.log("PROFILE FROM API: ", data);
        this.profile = data},
      error: (err) => console.log(err)

    });
  }

}
