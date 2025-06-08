# TP4_AEDS3 💻

## 👨‍🎓 Alunos integrantes da equipe

* Davi Cândido de Almeida
* Letícia da Silva Rocha
* Rayssa Mell de Souza Silva

## 👨‍🏫 Professor responsável

* Marcos André Silveira Kutova
 
## 🎯 O que o trabalho faz?

Este projeto é uma aplicação web desenvolvida com HTML, CSS, JavaScript, TypeScript e com auxílio de bibliotecas como React através do framework Next. O projeto simula o funcionamento de uma Tabela Hash Extensível (ou Hashing Extensível) de forma visual e interativa. A aplicação permite ao usuário inserir e remover registros, demonstrando dinamicamente como os dados são distribuídos entre os blocos (buckets) da tabela à medida que o diretório se expande ou se reorganiza. Também é possível definir quantos elementos o cesto comportará. A visualização é voltada para fins educacionais e tem como objetivo auxiliar no entendimento do comportamento interno dessa estrutura de dados, especialmente em relação ao funcionamento dos diretórios, profundidade global e local, e colisões. O sistema representa visualmente os blocos, seus conteúdos e a lógica de redirecionamento com base no cálculo do hash, facilitando a compreensão dos processos de inserção e divisão de blocos.

## 📁 Classes criadas e Metódos Principais

```
📁Project
   └── 📁tabela_hash_extensivel
   	└── 📁 src
             └── 📁 app
	          └── 📁 _Components
	              └── 📁 Cesto
	                  └── Cesto.module.css
			  └── Cesto.tsx
	              └── 📁 Diretorio
	       		  └── Diretorio.module.css
			  └── Diretorio.tsx
	          └── 📁 _TabelaHash
            	  	 └── hashExtensivel.ts
				└── class HashExtensivel
				    └── constructor
				    └── hash
				    └── inserir
				    └── dividirCesto
				    └── buscar
				    └── remover
				    └── imprimir

                               └── class Diretorio
				    └── constructor
				    └── dobra
				    └── getCestoIndice

                               └── class Cesto
                                    └── constructor
                                    └── insert
                                    └── contains
                                    └── delete
				    └── isFull
				    └── toString
            	 └── favicon.ico
                 └── globals.css
                 └── layout.tsx
                 └── page.tsx
```


## 🗎 Relato de experiências:

```
Todos os requisitos foram implementados ?  
 - Sim

Houve alguma operação mais difícil? 
 - Sim. A principal dificuldade foi entender como funcionavam as operações implementadas na versão Java e
adaptá-las para que se encaixassem corretamente na estrutura do nosso projeto em JavaScript. Isso exigiu
bastante atenção para manter a lógica da tabela hash extensível e garantir que a adaptação fosse fiel ao
funcionamento original.

Vocês enfrentaram algum desafio na implementação? 
 - Sim, um dos principais desafios foi adaptar a lógica da tabela hash extensível ao contexto da aplicação web. 

Os resultados foram alcançados? 
 - Sim
```


### 📋 Checklist :

```
A visualização interativa da Tabela Hash Extensível foi criada?
sim
Há um vídeo de até 2 minutos demonstrando o uso da visualização?
sim
O trabalho está funcionando corretamente?
sim
O trabalho está completo?
sim
O trabalho é original e não a cópia de um trabalho de um colega?
sim

```

### 🌐 Link e QR Code para Visualização

- Para visualizar acesse o link: https://tp-4-aeds-3.vercel.app/
- Ou utilize o QR Code abaixo:
  
![image](https://github.com/user-attachments/assets/7555055c-5bf2-4011-8f74-6ae252805c23)


### 🚀 Como Executar

1. Clone o repositório.
2. Instale as dependências com o Node. (- npm intall)
3. Execute o servidor localmente (Na raiz do projeto, pasta 'tabela_hash_extensivel', execute: npm run dev)
4. Seu projeto estara disponivel em: http://localhost:3000/ 
  

## 📄 Licença
Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.


