import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule} from "@angular/material/button"
import { MatCardModule} from "@angular/material/card";
import { MatIconModule} from "@angular/material/icon";
import { MatInputModule} from "@angular/material/input";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatTableModule} from "@angular/material/table";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatChipsModule} from "@angular/material/chips";
import { MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatChipsModule,
    MatGridListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatChipsModule,
    MatGridListModule
  ],

})
export class MaterialModule { }

