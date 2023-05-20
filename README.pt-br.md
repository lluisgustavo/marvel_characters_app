# Marvel Characters App 

Este projeto é um teste prático para uma posição de desenvolvimento front-end React na Oystr Robôs. O objetivo desta aplicação é criar um aplicativo web responsivo que liste e permita a busca de personagens da Marvel usando a Marvel API.

## Table of Contents
- [Objetivos do Projeto](#objetivos-do-projeto)
- [Diretivas](#diretivas)
- [Tecnologias](#tecnologias)
- [Configuração/Como Começar](#configuraçãocomo-começar)

## Objetivos do Projeto
O objetivo deste projeto é avaliar as habilidades em desenvolvimento React.js, criando uma aplicação responsiva que interaja com a Marvel API. A aplicação deve permitir aos usuários listar e buscar personagens da Marvel e visualizar seus detalhes. A tarefa é implementar a funcionalidade de listagem de personagens com paginação e recursos de busca, bem como a visualização dos detalhes do personagem. O projeto deve demonstrar proficiência em React.js, incluindo busca de dados em uma API, manipulação de interações do usuário e design de layouts responsivos, seguindo as melhores práticas no desenvolvimento React.js.

## Diretivas
1. Listagem:
### GET /v1/public/characters

  - Utilize este endpoint para listar os personagens.
  - A listagem deve exibir pelo menos 10 itens por página.
  - Implemente a funcionalidade de paginação e busca para a listagem.
  - Cada item do personagem deve permitir exibir mais detalhes.
  - Ao selecionar um personagem, mostrar informações adicionais sobre ele na seção "Detalhes".
  - Você tem liberdade para projetar o layout desta tela.

2. Detalhes:
### GET /v1/public/characters/{characterId}

  - Utilize este endpoint para mostrar os detalhes de um personagem.
  - Exibir os detalhes do personagem selecionado.
  - Além das informações fornecidas pelo endpoint acima, tente incluir pelo menos mais uma informação sobre o personagem. Consulte a documentação da API para obter as informações disponíveis relacionadas a um personagem.
  - Você tem liberdade para projetar o layout desta tela.

## Tecnologias   
- [Next.js](https://nextjs.org/): Um framework popular para construir aplicações React com renderização do lado do servidor, geração de site estático e muito mais.
- [React](https://react.dev/): Uma biblioteca JavaScript para construir interfaces de usuário.
- [Tailwind CSS](https://tailwindcss.com/): Um framework CSS altamente personalizável que fornece classes utilitárias para construir rapidamente componentes de IU.
- [Axios](https://axios-http.com/): Um framework CSS altamente personalizável que fornece classes utilitárias para construir rapidamente componentes de IU.
- [MD5](https://github.com/pvorb/node-md5): Uma biblioteca JavaScript para gerar hashes MD5, frequentemente usada para criptografia e checksums.
- [React Slick](https://react-slick.neostack.com/): Um componente de carrossel para aplicações React, usado para criar sliders e carrosséis de imagens.

## Configuração/Como Começar
Para criar o aplicativo, utilizaremos a Marvel API. Siga as etapas abaixo para configurar seu ambiente de desenvolvimento:

1. Crie uma conta de desenvolvedor em Marvel Developer Portal.
2. Renomeie o arquivo .env.example para .env.
3. Obtenha as chaves de API necessárias para acessar a Marvel API.
4. Substitua NEXT_PUBLIC_MARVEL_PUBLIC_KEY e NEXT_PUBLIC_MARVEL_PRIVATE_KEY pelas chaves fornecidas pelo portal de desenvolvedores da Marvel.
5. Clone este repositório em sua máquina local.
6. Instale as dependências necessárias executando o seguinte comando:

```
npm install
```

7. Você pode executar o projeto executando:

```
npm start
```

8. Você também pode executar o servidor de desenvolvimento executando:


```
npm run dev
```

9. Acesse o aplicativo em [http://localhost:3000](http://localhost:3000).
 