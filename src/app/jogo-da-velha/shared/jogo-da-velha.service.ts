import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JogoDaVelhaService {
  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: Array<Array<number>> = [];
  public numMovimento: number;
  private vitoria: any;

  private _jogador: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;
  private venceu: boolean = false;

  constructor() {}

  inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimento = 0;
    this._jogador = this.X;
    this.vitoria = false;
    this.inicializarTabuleiro();
  }

  inicializarTabuleiro(): void {
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }

  get showInicio(): boolean {
    return this._showInicio;
  }

  get showTabuleiro(): boolean {
    return this._showTabuleiro;
  }

  get showFinal(): boolean {
    return this._showFinal;
  }

  get jogador(): number {
    return this._jogador;
  }

  iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;
  }

  jogar(posX: number, posY: number): void {
    if (this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria !== false) {
      return;
    }

    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimento++;
    this.vitoria = this.fimJogo(posX, posY);
    this._jogador = this._jogador === this.X ? this.O : this.X;

    if (!this.vitoria && this.numMovimento < 9) {
      this.cpuJogar();
    }

    if (this.vitoria !== false) {
      this._showFinal = true;
    }

    if (!this.vitoria && this.numMovimento === 9) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }

  fimJogo(linha: number, coluna: number): any {
    let fim: any = false;
    const tabuleiro = this.tabuleiro;

    // valida linha
    if (
      tabuleiro[linha][0] === this.jogador &&
      tabuleiro[linha][1] === this.jogador &&
      tabuleiro[linha][2] === this.jogador
    ) {
      fim = [
        [linha, 0],
        [linha, 1],
        [linha, 2],
      ];
    }

    // valida coluna
    if (
      tabuleiro[0][coluna] === this.jogador &&
      tabuleiro[1][coluna] === this.jogador &&
      tabuleiro[2][coluna] === this.jogador
    ) {
      fim = [
        [0, coluna],
        [1, coluna],
        [2, coluna],
      ];
    }

    // valida diagonais
    if (
      tabuleiro[0][0] === this.jogador &&
      tabuleiro[1][1] === this.jogador &&
      tabuleiro[2][2] === this.jogador
    ) {
      fim = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }

    if (
      tabuleiro[0][2] === this.jogador &&
      tabuleiro[1][1] === this.jogador &&
      tabuleiro[2][0] === this.jogador
    ) {
      fim = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    return fim;
  }

  cpuJogar(): void {
    // verificar possibilidade de vitória
    let jogada: number[] = this.obterJogada(this.O);

    // tentar evitar derrota
    if (jogada.length <= 0) {
      jogada = this.obterJogada(this.X);
    }

    // jogada aleatória
    if (jogada.length <= 0) {
      let jogadas: any = [];

      for (let i = 0; i < this.TAM_TAB; i++) {
        for (let j = 0; j < this.TAM_TAB; j++) {
          if (this.tabuleiro[i][j] === this.VAZIO) {
            jogadas.push([i, j]);
          }
        }
      }

      let k = Math.floor(Math.random() * (jogadas.length - 1));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }

    this.tabuleiro[jogada[0]][jogada[1]] = this._jogador;
    this.numMovimento++;
    this.vitoria = this.fimJogo(jogada[0], jogada[1]);
    this._jogador = this._jogador === this.X ? this.O : this.X;
  }

  obterJogada(jogador: number): number[] {
    let tab = this.tabuleiro;

    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.VAZIO) {
          continue;
        }

        tab[lin][col] = jogador;
        if (this.fimJogo(lin, col)) {
          return [lin, col];
        }
        tab[lin][col] = this.VAZIO;
      }
    }
    return [];
  }

  exibirX(posX, posY): boolean {
    return this.tabuleiro[posX][posY] === this.X;
  }

  exibirO(posX, posY): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }

  exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (const pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }

    return exibirVitoria;
  }
}
