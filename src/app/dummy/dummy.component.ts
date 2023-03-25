import { Component, Input, OnInit } from '@angular/core';
import { DummyService } from './dummy.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit{


file:File;

constructor(private service:DummyService){
  this.file={} as File;
}

ngOnInit(): void {
  
}

saveData(){
  const form=new FormData();
  form.append("file",this.file);
  this.service.saveImage(form).subscribe((data)=>{
    console.log("success");
  }); 
}

selected(event:any){
  this.file=event.target.files[0];
}

}
