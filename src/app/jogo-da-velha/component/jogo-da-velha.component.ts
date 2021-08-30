import { Component, OnInit } from '@angular/core';
import { JogoDaVelhaService } from '../shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css'],
})
export class JogoDaVelhaComponent implements OnInit {
  private venceu: boolean = false;

  constructor(private jogoDaVelhaService: JogoDaVelhaService) {}

  ngOnInit(): void {
    this.novoJogo();
  }

  novoJogo(): void {
    this.venceu = false;
    this.jogoDaVelhaService.inicializar();
  }

  get showInicio(): boolean {
    return this.jogoDaVelhaService.showInicio;
  }

  get numMovimento(): number {
    return this.jogoDaVelhaService.numMovimento;
  }

  get showTabuleiro(): boolean {
    return this.jogoDaVelhaService.showTabuleiro;
  }

  get showFinal(): boolean {
    return this.jogoDaVelhaService.showFinal;
  }
  get playerWins(): boolean {
    return this.venceu;
  }

  iniciarJogo(): void {
    this.jogoDaVelhaService.iniciarJogo();
  }

  jogarPeca(posX: number, posY: number): void {
    this.jogoDaVelhaService.jogar(posX, posY);
    const vitoria: boolean = this.jogoDaVelhaService.exibirVitoria(posX, posY);

    if (vitoria) {
      this.venceu = true;
    }
  }

  exibirX(posX: number, posY: number): boolean {
    return this.jogoDaVelhaService.exibirX(posX, posY);
  }

  exibirO(posX: number, posY: number): boolean {
    return this.jogoDaVelhaService.exibirO(posX, posY);
  }

  exibirVitoria(posX: number, posY: number): boolean {
    return this.jogoDaVelhaService.exibirVitoria(posX, posY);
  }
}
