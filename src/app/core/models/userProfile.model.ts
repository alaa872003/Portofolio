export interface IProfile{
   name:string,
    title:string,
    profileImg:string|File,
    headline:string,
    about:string,
    location:string,
    socialLinks:{
      platform: string,
      url: string
    }[];

}
