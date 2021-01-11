import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputDish } from 'src/app/models/inputDish-model/inputDish-model';
import { DishService } from 'src/app/services/dish-service/dish.service';
import { FileHandle } from './dragDrop.directive';

interface DishCategories {
  value: string;
}

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('ingredientsInput') ingredientsInput: ElementRef;
  @ViewChild('priceInput') priceInput: ElementRef;
  @ViewChild('caloriesInput') caloriesInput: ElementRef;

  files: FileHandle[] = [];
  inputDish: InputDish;

  categories: DishCategories[] = [
    { value: 'Kurczak' },
    { value: 'Makaron' },
    { value: 'Pierogi' },
    { value: 'Pizza' },
    { value: 'Zupa' }
  ];
  selectedCategory;

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  ingredientsFormControl = new FormControl('', [
    Validators.required
  ]);
  priceFormControl = new FormControl('', [
    Validators.required
  ]);
  caloriesFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private dishService: DishService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  deleteFile(): void {
    this.files = [];
  }

  upload(): void {
    this.convertImage(this.files[0].file);
  }

  convertImage(file) {
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this.turnIntoBase64Image.bind(this);
    reader.readAsDataURL(file);
  }

  turnIntoBase64Image(e) {
    let reader = e.target;
    let base64Image = reader.result.substr(reader.result.indexOf(',') + 1);

    let name = this.nameInput.nativeElement.value;
    let ingredients = this.ingredientsInput.nativeElement.value;
    let price = this.priceInput.nativeElement.value;
    let calories = this.caloriesInput.nativeElement.value;

    this.inputDish = new InputDish(name, ingredients, this.selectedCategory, price, calories, base64Image);
    this.addToDatabase();
  }

  addToDatabase() {
    this.dishService.addDish(this.inputDish)
      .subscribe(data => {
        this.router.navigate(["/menu"]);
      }, error => console.log(error));
  }

}
