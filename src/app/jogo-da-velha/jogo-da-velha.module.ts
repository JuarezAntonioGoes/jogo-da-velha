import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoDaVelhaComponent } from './component';
import { JogoDaVelhaService } from './shared';

@NgModule({
  declarations: [JogoDaVelhaComponent],
  imports: [CommonModule],
  providers: [JogoDaVelhaService],
  exports: [JogoDaVelhaComponent],
})
export class JogoDaVelhaModule {}
