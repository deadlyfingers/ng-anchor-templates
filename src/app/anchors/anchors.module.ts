import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnchorsRoutingModule } from "./anchors-routing.module";
import { AnchorsComponent } from "./anchors.component";
import { InputAnchorComponent } from "./components/input-anchor/input-anchor.component";
import { PreviewAnchorsComponent } from "./components/preview-anchors/preview-anchors.component";

@NgModule({
  declarations: [
    AnchorsComponent,
    InputAnchorComponent,
    PreviewAnchorsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnchorsRoutingModule,
    FlexLayoutModule,
  ],
  providers: [
  ],
})
export class AnchorsModule { }
