import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: false
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchText: string): any {
    if (!data) {
      return [];
    }
    
    if (!searchText) {
      return data;
    }
    let returnArray = data.filter((item: any) => {
      return JSON.stringify(item).includes(searchText);
    })
    return returnArray;
  }

}
