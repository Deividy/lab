/******************************************************************************
*  Programa: Exemplo para uso do Módulo Bluetooth - MSS Eletrônica            *
*  Produto: Módulos bluetooth escravo/Slave                                   *
*  Link: http://www.msseletronica.com/loja/detalhes.php?urlid=                *
*  Desenvolvedor: Misael S. Sales                                             *
*  Versão: 1.0                                                                *
*  Data: 04/11/2012                                                           *
*  PIC: Linha 16F de 40 pinos (Para usar em outros mude o nome das portas )   *
*  Display: HD44780                                                           *
*  Licença: Livre para uso e modificação                                      *
*                                                                             *
*  MSS Eletrônica - www.msseletronica.com - msseletronica@hotmail.com.br      *
*                                                                             *
*******************************************************************************/

#include <16F877A.h>
#device *=16
#device adc=8

#FUSES NOWDT                    //No Watch Dog Timer
#FUSES XT                       //Crystal osc <= 4mhz for PCM/PCH , 3mhz to 10 mhz for PCD
#FUSES NOPUT                    //No Power Up Timer
#FUSES NOPROTECT                //Code not protected from reading
#FUSES NODEBUG                  //No Debug mode for ICD
#FUSES NOBROWNOUT               //No brownout reset
#FUSES NOLVP                    //No low voltage prgming, B3(PIC16) or B5(PIC18) used for I/O
#FUSES NOCPD                    //No EE protection
#FUSES NOWRT                    //Program memory not write protected

#use delay(clock=4000000)
#use rs232(baud=9600,parity=N,xmit=PIN_C6,rcv=PIN_C7,bits=8)

#ZERO_RAM

#include <LCD_MSS.h>//Adiciona a nosso biblioteca para acionamento do diplay de LCD
/******************************************************************************
*  Ligações do LCD                                                            *
*   D7 -> RD7 (PORTD 7)                                                       *
*   D6 -> RD6 (PORTD 6)                                                       *
*   D5 -> RD5 (PORTD 5)                                                       *
*   D4 -> RD4 (PORTD 4)                                                       *
*   RS -> RD3 (PORTD 3)                                                       *
*   EN -> RD2 (PORTD 2)                                                       *
*   R/W -> Deve ser conectado ao GND                                          *
*   VCC -> Deve ser conectado ao +5V                                          *
*   GND -> Deve ser conectado ao GND                                          *
*   VO -> Deve ser conectado ao potenciômetro/trimpot de ajuste de brilho     *
******************************************************************************/

/******************************************************************************
* Ligações do módulo Bluetooth:                                               *
*  RXD -> Pino RC6 (TX) do PORTC                                              *
*  TXD -> Pino RC7 (RX) do PORTC                                              *
*  VCC -> Deve ser conectado ao +5V                                           *
*  GND -> Deve ser conectado ao GND                                           *
*                                                                             *
*  Ligação dos LED´s:                                                         *
*                                                                             *
*  LED vermelho -> RC0                                                        *
*  LED verde -> RC1                                                           *
******************************************************************************/

unsigned char dado = 0;//variável para armazenar o dado recebido pela porta serial (Recebido pelo bluetooth)
short novoDado = 0;//Flag para indicar quando recebeu um novo dado pela porta serial (Deve ser limpado no programa)


#use fast_io(c)//O controle de direção dos pinos (Entrada/Saida) será feito no programa
#use fast_io(d)//O controle de direção dos pinos (Entrada/Saida) será feito no programa

//Nomeação das portas
#byte PORTC = 0x07 //Endereço do PORTC
#byte PORTD = 0x08 //Endereço do PORTD

#bit ledVermelho = PORTC.0 //Pino que deve ser conectado o LED vermelho
#bit ledVerde = PORTC.1 //Pino que deve ser conectado o LED verde

#int_RDA //Interrupção da recepção na porta serial
RDA_isr()
   {
   dado = getchar();//Le o dado recebido 
   novoDado = 1;//Indica que recebeu um novo dado (Um novo caracter)
   }

void main()
{

   setup_adc_ports(NO_ANALOGS);
   setup_adc(ADC_OFF);
   setup_psp(PSP_DISABLED);
   setup_spi(SPI_SS_DISABLED);
   setup_timer_0(RTCC_INTERNAL|RTCC_DIV_1);
   setup_timer_1(T1_DISABLED);
   setup_timer_2(T2_DISABLED,0,1);
   setup_comparator(NC_NC_NC_NC);
   setup_vref(FALSE);
   // TODO: USER CODE!!
   
   enable_interrupts(GLOBAL);//Habilitando a chave geral das interrupções
   enable_interrupts(INT_RDA);//Ativando a interrupção da recepção no canal serial
   
   set_tris_c(0b11111100);//Configurando os pinos que vão receber os LED´s como saida
   set_tris_d(0b00000011);//Configurando todos os pinos do PORTD que estão conectados ao LCD como saida
   
   PORTC = 0;//Inicia com todos os pinos do PORTC em nível baixo
   PORTD = 0;//Inicia com todos os pinos do PORTD em nível baixo
   
   configura_lcd();//Chama a rotina que realiza as configurações básicas para o LCD funcionar
   inicio_lcd();//Coloca o cursor no inicio (Quando usado)
   limpa_lcd();//Limpa os dados do display
   
   linha_1_lcd(1);//Aponta para o primeiro caracter na primeira linha
   caracter_lcd('C');
   caracter_lcd('A');
   caracter_lcd('R');
   caracter_lcd('A');
   caracter_lcd('C');
   caracter_lcd('T');
   caracter_lcd('E');
   caracter_lcd('R');
   caracter_lcd(':');
   caracter_lcd(' ');
   
   linha_2_lcd(2); //Aponta para o Segundo caracter na segunda linha
   caracter_lcd('M');
   caracter_lcd('S');
   caracter_lcd('S');
   caracter_lcd(' ');
   caracter_lcd('E');
   caracter_lcd('L');
   caracter_lcd('E');
   caracter_lcd('T');
   caracter_lcd('R');
   caracter_lcd('O');
   caracter_lcd('N');
   caracter_lcd('I');
   caracter_lcd('C');
   caracter_lcd('A'); //Fim da mensagem
   
   while(1)//Loop infinito do programa
      {
      if(novoDado)//Checa se recebeu um novo dado pela porta serial (Do bluetooth)
         {
         novoDado = 0;//Limpa o flag que indica um novo dado
         switch (dado)//Checa qual caracter recebeu
            {
            case '1': //Se o caracter recebido for "1", acende o LED vermelho
            ledVermelho = 1;
            break;
            
            case '2': //Se o caracter recebido for "2", apaga o LED vermelho
            ledVermelho = 0;
            break;
            
            case '3': //Se o caracter recebido for "3", acende o LED verde
            ledVerde = 1;
            break;
            
            case '4': //Se o caracter recebido for "4", acende o LED verde
            ledVerde = 0;
            break;
            }
         linha_1_lcd(11);//Aponta para o caracter de Nº 11 na primeira linha
         caracter_lcd(dado);//Exibe o caracter recebido
         }
      }

}
