import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-painel-principal',
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css']
})
export class PainelPrincipalComponent implements OnInit {

  //declarando o gráfico vazio
  grafico: Chart = new Chart();

  constructor() { }

  ngOnInit(): void {

    //desenhando o gráfico
    var dados: any[] = [
      {
        name: 'Prioridade Baixa',
        y: 6,
        color: '#5cb85c'
      },
      {
        name: 'Prioridade Média',
        y: 8,
        color: '#f0ad4e'
      },
      {
        name: 'Prioridade Alta',
        y: 16,
        color: '#d9534f'
      }
    ];

    var nomes: any[] = [
      ['PRIORIDADE BAIXA'],
      ['PRIORIDADE MÉDIA'],
      ['PRIORIDADE ALTA']
    ];

    this.grafico = new Chart({
      chart: { type: 'column' },
      title: { text: 'Quantidade de tarefas por prioridade' },
      subtitle: { text: 'Contagem de tarefas de acordo com a prioridade' },
      xAxis: { categories: nomes },
      yAxis: { title: { text: 'Quantidade de tarefas por prioridade' } },
      legend: { enabled: false },
      credits: { enabled: false },
      series: [
        { data: dados, type: undefined as any }
      ],
      tooltip: {
        headerFormat: '<span style="font-size: 12pt">{point.key}</span><table>',
        pointFormat: '<tr><td style="padding: 0">Quantidade de tarefas: <strong>{point.y}</strong></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      }
    });
  }

}
