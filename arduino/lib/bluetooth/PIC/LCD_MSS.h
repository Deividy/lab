/******************************************************************************
*  Biblioteca para acionamento de displays de LCD 16x2 a 8 bits               *
*  Desenvolvedor: Misael S. Sales                                             *
*  Versão: 1.0                                                                *
*  Data: 27/10/2012                                                           *
*  PIC: Linha 16F de 40 pinos (Para usar em outros mude o nome das portas )   *
*  Displays: HD44780                                                          *
*  Licença: Livre para uso e modificação                                      *
*                                                                             *
*  MSS Eletrônica - www.msseletronica.com - msseletronica@hotmail.com.br      *
*                                                                             *
*******************************************************************************/

/******************************************************************************
*  Instruções:                                                                *
*                                                                             *
*  Coloque o arquivo LCD_MSS.h na mesma pasta do seu projeto                  *
*  Inclua esta biblioteca em seu código usando: #include <LCD_MSS.h>          *
*  Defina todos os pinos do PORTD como saida                                  *
*  Defina os pinos RC0 e RC1 como saida                                       *
*                                                                             *
*  Funções:                                                                   *
*  -> configura_lcd();//configura de forma básica o LCD                       *
*  -> caracter_lcd(caracter);//envia um caracter                              *
*  -> comando_lcd();//passa um comando para configurar o LCD (vide datasheet) *
*  -> inicio_lcd();//coloca o cursor no inicio, não limpa o LCD               *
*  -> limpa_lcd();//limpa todo conteudo do LCD                                *
*  -> linha_1_lcd(posicao);//coloca o cursor em uma posição na linha 1 max 16 *
*  -> linha_2_lcd(posicao);//coloca o cursor em uma posição na linha 2 max 16 *
*                                                                             *
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
*******************************************************************************/

#byte PORTD = 0x08//endereço fisico do PORTD

#byte LCD = PORTD //Os D4 ao D7 do LCD dever ser conectados aos RD4 a RD7 do PORTD

#bit RS = PORTD.3 //O pinos RS deve ser ligado ao RD3
#bit EN = PORTD.2 //O pino EN deve ser ligado ao RD2
//O pino R/W deverá ser ligado ao pino terra (GND)
//Os únicos pinos livres do PORTD são RD1 e RD2, você poderá usa-los como desejar

void comando_lcd(unsigned char);//passa um comando para configurar o LCD (vide datasheet)
void quatro_bit_lcd();//Inicializa o LCD para comunicar com 4 bits
void caracter_lcd(unsigned char);//envia um caracter 
void limpa_lcd(void);//limpa todo conteudo do LCD 
void inicio_lcd(void);//coloca o cursor no inicio, não limpa o LCD
void configura_lcd(void);//configura de forma básica o LCD 
void linha_1_lcd(unsigned char);//coloca o cursor em uma posição na linha 1 max 16
void linha_2_lcd(unsigned char);//coloca o cursor em uma posição na linha 2 max 16

void linha_1_lcd(posicao)
   {
   if(posicao >16){posicao = 16;}//como a ultima posição é 16, não deixa ser maior
   else if (posicao == 0){posicao = 1;}//faz sempre posição ser no minimo 1
   comando_lcd((0b10000000 + posicao)-1);//vai para a segunda linha
   }

void linha_2_lcd(posicao)
   {
   if(posicao >16){posicao = 16;}//como a ultima posição é 16, não deixa ser maior
   else if (posicao == 0){posicao = 1;}//faz sempre posição ser no minimo 1
   comando_lcd((0b11000000  + posicao)-1);//vai para a segunda linha
   }

void configura_lcd(void)
   {
   quatro_bit_lcd();//Chama a rotina que inicializa a comunicação com o LCD a 4 bits
   comando_lcd(0b00101000);//LCD 4 bits(4), 2 linhas(3), caracter 5*7(2)
   comando_lcd(0b00001100);//Display ligado(2), cursor desligado(1), sem cursor(0)
   comando_lcd(0b00010100);//Cursor movimenta(3), Cursor movimenta para a direita a cada caracter(2) - irrelevante, pois o cursor esta desligado
   }

void inicio_lcd(void)//rotina que coloca o cursor do display no inicio, mas não limpa o display
   {
   comando_lcd(0b00000010);//Cursor no inicio(1)
   }

void limpa_lcd(void)//rotina que envia o comando para limpar todos os dados do LCD
   {
   comando_lcd(0b00000001);//limpa display (0)
   }

void caracter_lcd(caracter)//Rotina para enviar um caracter para o LCD
   {
   unsigned char caracter_temp = 0;//Armazena o caracter temporariamente
   RS = 1;//Coloca o LCD para receber um caracter
   EN = 0;//Confirma que esta desabilitado
   
   caracter_temp = caracter;//Salva o caracter original
   
   bit_clear(LCD,7);//Limpa os pinos do PORTD (LCD) de D4 a D7
   bit_clear(LCD,6);
   bit_clear(LCD,5);
   bit_clear(LCD,4);
   
   bit_clear(caracter,0);//Limpa os bits menos significativos do caracter
   bit_clear(caracter,1);
   bit_clear(caracter,2);
   bit_clear(caracter,3);
   
   LCD = LCD + caracter;//Envia os bits mais significativos para o LCD sem alterar os outros pinos do PORTD
   EN = 1;//Informa para o LCD que os dados estão no barramento
   
   delay_ms(2);//aguarda o tempo de execução, em média 2ms
   EN = 0;
  
   bit_clear(LCD,7);//Limpa os pinos do PORTD (LCD) de D4 a D7
   bit_clear(LCD,6);
   bit_clear(LCD,5);
   bit_clear(LCD,4);
   
   swap(caracter_temp);//Troca os Bits mais significativos pelos menos significativos
   
   bit_clear(caracter_temp,0);//Limpa os bits menos significativos do caracter_temp
   bit_clear(caracter_temp,1);
   bit_clear(caracter_temp,2);
   bit_clear(caracter_temp,3);
   
   LCD = LCD + caracter_temp;//Envia os bits mais significativos para o LCD sem alterar os outros pinos do PORTD
   EN = 1;//Informa para o LCD que os dados estão no barramento
   
   delay_ms(2);//aguarda o tempo de execução, em média 2ms
   EN = 0;
   RS = 0;   
   }

void comando_lcd(comando)//Rotina para enviar um comando para o LCD
   {
   unsigned char com_temp = 0;//Variável para salvar o valor original do comando
   RS = 0;//Coloca o LCD para receber um comando
   EN = 0;//Confirma que esta desabilitado
   
   com_temp = comando;//Salva uma cópia do comando
   
   bit_clear(LCD,7);//Limpa os pinos do PORTD (LCD) de D4 a D7
   bit_clear(LCD,6);
   bit_clear(LCD,5);
   bit_clear(LCD,4);
   
   bit_clear(comando,0);//Limpa os bits menos significativos do comando
   bit_clear(comando,1);
   bit_clear(comando,2);
   bit_clear(comando,3);
   
   LCD = LCD + comando;//Envia os bits mais significativos para o LCD sem alterar os outros pinos do PORTD
   EN = 1;//Informa para o LCD que os dados estão no barramento
   
   delay_ms(2);//aguarda o tempo de execução, em média 2ms
   EN = 0;

   bit_clear(LCD,7);//Limpa os pinos do PORTD (LCD) de D4 a D7
   bit_clear(LCD,6);
   bit_clear(LCD,5);
   bit_clear(LCD,4);


   swap(com_temp);//Troca os Bits mais significativos pelos menos significativos

   bit_clear(com_temp,0);//Limpa os bits menos significativos do com_temp
   bit_clear(com_temp,1);
   bit_clear(com_temp,2);
   bit_clear(com_temp,3);
   
   LCD = LCD + com_temp;//passa o comando para o barramento de dados do LCD
   EN = 1;//Informa para o LCD que os dados estão no barramento
   
   delay_ms(2);//aguarda o tempo de execução, em média 2ms
   EN = 0;
   }
   
void quatro_bit_lcd()//Rotina para configurar o LCD para trabalhar a 4 bits
   {
   RS = 0;//Coloca o LCD para receber um comando
   EN = 0;//Confirma que esta desabilitado

   bit_clear(LCD,7);//Limpa os pinos do PORTD (LCD) de D4 a D7
   bit_clear(LCD,6);
   bit_clear(LCD,5);
   bit_clear(LCD,4);
   
   LCD = LCD + 0b00100000;//Envia o comando para o LCD trabalhar a 4 bits sem alterar os outros bits do PORTD
   EN = 1;//Informa para o LCD que os dados estão no barramento
   
   delay_ms(2);//aguarda o tempo de execução, em média 2ms
   EN = 0;
   }
