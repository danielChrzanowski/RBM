import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Order } from 'src/app/models/order-model/order-model';
import { DishService } from 'src/app/services/dish-service/dish.service';

@Component({
  selector: 'app-restauramt-menu',
  templateUrl: './restauramt-menu.component.html',
  styleUrls: ['./restauramt-menu.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class RestauramtMenuComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Order>;

  tableDef: Array<any> = [
    {
      key: 'danie_id',
      header: 'Nr'
    }, {
      key: 'nazwa',
      header: 'Nazwa'
    },
    {
      key: 'kategoria',
      header: 'Kategoria'
    },
    {
      key: 'cena',
      header: 'Cena (zł)'
    }
  ];
  columnsToDisplay = ['danie_id', 'nazwa', 'kategoria', 'cena'];
  expandedElement: Order | null;

  chartCategories: Array<string> = [];
  chartCaloriesData: Array<number> = [];
  chartCategoriesCount: Array<number> = [];
  chartCaloriesDataFilled: Array<number> = [];

  constructor(
    private dishService: DishService,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.findAllDishes();
  }

  findAllDishes() {
    this.dishService.findAllDishes()
      .subscribe(
        data => {
          data.forEach((element) => {
            let objectURL = 'data:image/jpeg;base64,' + element.zdjecie;
            element.zdjecie = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
          });

          for (let dish of data) {
            this.chartCategories.push(dish.kategoria);
            this.chartCaloriesData.push(dish.kalorie);
          }
          this.chartCategories = this.removeDuplicates(this.chartCategories, this.chartCaloriesData);

          this.chartDatasets = [
            { data: this.chartCaloriesDataFilled, label: 'Kaloryczność' }
          ];
          this.chartLabels = this.chartCategories;

          this.dataSource = new MatTableDataSource<Order>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => console.log(error));
  }

  deleteCategory(category: string) {
    const index: number = this.chartCategories.indexOf(category);
    if (index !== -1) {
      this.chartCategories.splice(index, 1);
    }
  }

  removeDuplicates(data, calories) {
    let i = 0;
    let sameItemIndex = new Array;
    let unique = new Array;
    data.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element);
        this.chartCaloriesDataFilled.push(calories[i]);
        sameItemIndex.push(i);
        this.chartCategoriesCount.push(1);
      } else {
        //dodaj kalorie do tej samej kategorii
        var index = data.indexOf(element);
        if (index !== -1) {
          this.chartCategoriesCount[index]++;
          this.chartCaloriesDataFilled[index] = this.chartCaloriesDataFilled[index] + calories[i];
        }
      }

      i++;
    });

    for (let j = 0; j < this.chartCaloriesDataFilled.length; j++) {
      this.chartCaloriesDataFilled[j] = this.chartCaloriesDataFilled[j] / this.chartCategoriesCount[j];
    }

    return unique;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(101, 186, 105, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(101, 186, 105, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "white",
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: "white",
        }
      }]
    }
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
