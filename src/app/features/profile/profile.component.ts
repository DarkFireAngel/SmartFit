import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName = 'Angelo';
  userEmail = 'angelo@example.com';

  dailyCalorieGoal = 2000;
  dailyWaterGoal = 2.5;
  proteinGoal = 140;
  carbsGoal = 260;
  fatsGoal = 130;

  constructor(
    public themeService: ThemeService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void { }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  exportData(): void {
    this.storageService.downloadDataAsFile();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.storageService.uploadDataFromFile(file)
        .then(success => {
          if (success) {
            alert('Dati importati con successo!');
            window.location.reload();
          } else {
            alert('Errore durante l\'importazione dei dati');
          }
        });
    }
  }
}
