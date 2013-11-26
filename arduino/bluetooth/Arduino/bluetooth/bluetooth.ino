/******************************************************************************************************
*  Programa exemplo para uso do Módulo Bluetooth - MSS Eletrônica                                     *
*  Produto: Módulos bluetooth escravo/Slave (http://www.msseletronica.com/loja/detalhes.php?urlid=)   *
*  Produtos relacionados:                                                                             *
*  Desenvolvedor: Misael                                                                              *
*  Data: 03/11/2012                                                                                   *
*                                                                                                     *
*  Objetivo: Usar um módulo Bluetooth para comunicar com o Arduino, acinando um LED e mostrar o       * 
* comando em um LCD 16x2                                                                              *
*  Bibliotecas usadas:                                                                                *
*   LiquidCrystal.h - http://arduino.cc/en/Reference/LiquidCrystal                                    *
*                                                                                                     *
*  Contatos:                                                                                          *
*                                                                                                     *
*  E-mail: msseletronica@hotmail.com.br    site: http://www.msseletronica.com                         *
*******************************************************************************************************/

/******************************************************************************************************
*  Informação sobre o programa:                                                                       *
*                                                                                                     *
*  Pinos usados para o LCD:                                                                           *
*    2 -> RS do LCD                                                                                   *
*    4 -> EN do LCD                                                                                   *
*    7 -> D4 do LCD                                                                                   *
*    8 -> D5 do LCD                                                                                   *
*    12 -> D6 do LCD                                                                                  *
*    13 -> D7 do LCD                                                                                  *
*    Você deve alimentar o LCD                                                                        *
*    Ligar um Potenciômetro/trimpot ao pino VO do LCD para controlar o contraste                      *
*    Ligar o R/W do LCD ao GND                                                                        *
*    Ligar os pinos D0, D1, D2, D3 do LCD ao GND                                                      *
*                                                                                                     *
*  Pinos usados para o Módulo Bluetooth:                                                              *
*    1(TX) -> RXD do bluetooth  (Desconectar o bluetooth do arduino quando for fazer o upload)        *
*    0(RX) -> TXD do bluetooth  (Desconectar o bluetooth do arduino quando for fazer o upload)        *
*    Você deve alimentar o módulo bluetooth: Ligue VCC ao Pino 5V e o GND ao GND                      *
*                                                                                                     *
*  Pinos usados para os LED´s                                                                         *
*    5 -> Conectar ao LED vermelho                                                                    *
*    6 -> Conectar ao LED verde                                                                       *
*******************************************************************************************************/
//Para melhores informações sobre o módulo bluetooth, consulte o datasheet

//Para informações sobre a Biblioteca LiquidCrystal.h, vá na guia Help/Reference/Libraries/LiquidCrystal
#include <LiquidCrystal.h> //Incluindo a biblioteca para acionamento do LCD 16x2

LiquidCrystal lcd(2, 4, 7, 8, 12, 13);//Configurando os pinos que estão conectados ao LCD
//2 -> RS do LCD, 4 -> EN do LCD, 7 -> D4 do LCD, 8 -> D5 do LCD, 12 -> D6 do LCD, 13 -> D7 do LCD

int vermelho = 5;//Pino que será ligado o LED vermelho
int verde = 6;//Pino que será ligado o LED verde
int dado = 0;//Variável para armazenar o dado recebido via bluetooth (Pela porta serial)

//Rotina de configurações iniciais do programa
void setup() {
  
  pinMode(vermelho, OUTPUT);//Configurando o pino que será conectado ao LED vermelho como saida
  pinMode(verde, OUTPUT);//Configurando o pino que será conectado ao LED verde como saida
  lcd.begin(16, 2);//Inicializa a biblioteca para trabalhar com display de 16 caracteres por 2 linhas (16x2)
  Serial.begin(9600);//Inicializando a comunicação serial com velocidade de 9600 baud rate (Velocidade padrão do módulo bluetooth escravo/Slave)
  
  lcd.setCursor(0, 0);//Aponta para o primeiro caracter da primeira linha
  lcd.print("CARACTER: ");//Escreve o texto
  lcd.setCursor(1, 1);//Vai para o segundo caracter na segunda linha
  lcd.print("MSS ELETRONICA");//Escreve o texto
  delay(2000);//Aguarda 2 segundos
 }

// Rotina que será executada infinitamente
void loop() {
 
    while (Serial.available() > 0)//Enquanto estiver recebendo dados pela porta serial(Dados recebidos do módulo bluetooth) fica em loop
      {
       dado = Serial.read();//Lê o dado recebido
       
       if (dado == '1')//Testa se o dado é o caracter "1"
         {
         digitalWrite(vermelho,HIGH);//Se for, liga o LED vermelho
         }
         
       if (dado == '2')//Testa se o dado é o caracter "2"
         {
         digitalWrite(vermelho,LOW);//Se for desliga o LED vermelho
         }
       
       if (dado == '3')//Testa se o dado é o caracter "3"
         {
         digitalWrite(verde,HIGH);//Se for liga o LED verde
         }
         
       if (dado == '4')//Testa se o dado é o caracter "4"
         {
         digitalWrite(verde,LOW);//Se for desliga o LED verde
         }
         
       lcd.setCursor(10, 0);//Coloca o display na Primeira linha e no caracter de Nº 11 (Começa a contar em zero)
       lcd.write(dado);//Exibe o caracter recebido
      
      }
}

