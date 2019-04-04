import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { UserService } from '../Core/user.service';
import { element } from 'protractor';
import { empty } from 'rxjs';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
 
 
export class LibrosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'nombre_libro' ];
  public items = [];
  public items2;
  public dataSource2;
  public datos;
  public sortingOrder = 'name'; //default sort
  applyFilter(filterValue: string) {
   // this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  constructor(public UserServices: UserService) {
 
     
    //this.dataSource2 =   new MatTableDataSource(this.datos);

   }

  ngOnInit() {
    this.UserServices.getPerfiles().subscribe(actionArray => {
      this.items = actionArray.map(item => {
          return {
              id : item.payload.doc.id,
              ...item.payload.doc.data()
          }
      })
    })
    this.items2 = this.items;
    this.dataSource2 = this.items;
  }
  filter(event){
    debugger;
    this.items =  this.items.filter( x =>  event.target.value in x.nombre );
    if(this.items.length == 0 ){
      this.items = this.items2;
    }
    console.log(this.items );
  }
    
    initApp($scope, $filter) {
   
    // init
    // $scope.sortingOrder = sortingOrder;
    $scope.pageSizes = [5,10,25,50];
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 6;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.searchbook = "";
    $scope.items = this.items2;
    
    var searchMatch = function (haystack, needle) {
      if (!needle) {
          return true;
      }
      return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };

  // init the filtered items
  $scope.search = function () {
      $scope.filteredItems = $filter('filter')($scope.items, function (item) {
          for(var attr in item) {
              if (searchMatch(item[attr], $scope.query))
                  return true;
          }
          return false;
      });
      // take care of the sorting order
      if ($scope.sortingOrder !== '') {
          $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
      }
      $scope.currentPage = 0;
      // now group by pages
      $scope.groupToPages();
  };
  
  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.filteredItems.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };

  // functions have been describe process the data for display
  $scope.search();

  // change sorting order
  // $scope.sort_by = function(newSortingOrder) {
  //     if ($scope.sortingOrder == newSortingOrder)
  //         $scope.reverse = !$scope.reverse;

  //     $scope.sortingOrder = newSortingOrder;

  //     // icon setup
  //     $('th i').each(function(){
  //         // icon reset
  //         $(this).removeClass().addClass('icon-sort');
  //     });
  //     if ($scope.reverse)
  //         $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
  //     else
  //         $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
  // };
};
// ctrlRead.$inject = ['$scope', '$filter'];

}


