// Importa funções necessárias do React: createContext para criar o contexto,
// useContext para consumir o contexto e useState para gerenciar o estado.
import { createContext, useContext, useState } from "react";

// Cria o contexto de Favoritos e define um nome de exibição para ele (útil para depuração).
export const FavoritosContext = createContext();
FavoritosContext.displayName = "Favoritos";

// Componente que será o "Provider" do contexto de Favoritos.
export default function FavoritosProvider({ children }) {
  // Cria o estado 'favorito' com valor inicial de um array vazio e 'setFavorito' para atualizar esse estado.
  const [favorito, setFavorito] = useState([]);

  // Retorna o contexto fornecendo o valor atual de 'favorito' e a função 'setFavorito' para atualizar a lista.
  return (
    <FavoritosContext.Provider value={{ favorito, setFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

// Hook personalizado que permite consumir o contexto de Favoritos sem a necessidade de usar useContext diretamente.
// Isso simplifica o código em outros componentes.
export function useFavoritoContext() {
  // Utiliza useContext para acessar o valor atual do contexto de Favoritos (favorito e setFavorito).
  const { favorito, setFavorito } = useContext(FavoritosContext);

  // Função que adiciona ou remove um item da lista de favoritos.
  function adicionarFavorito(novoFavorito) {
    // Verifica se o item já está na lista de favoritos.
    const favoritoRepetido = favorito.some(item => item.id === novoFavorito.id);

    // Cria uma nova lista copiando a lista atual de favoritos, adicionando o favorito no final.
    let novaLista = [...favorito];

    // Se o item não estiver na lista de favoritos, ele é adicionado.
    if (!favoritoRepetido) {
      novaLista.push(novoFavorito);
      // Atualiza o estado com a nova lista e encerra a função.
      return setFavorito(novaLista);
    }

    // Se o item já estiver na lista, ele é removido. A variável novaLista será sobrescrita para uma lista com somente os favoritos que não possuiam o id igual ao que estavamos tentando desfavoritar.
    novaLista = favorito.filter((fav) => fav.id !== novoFavorito.id);
    // Atualiza o estado com a lista modificada.
    return setFavorito(novaLista);
  }

  // Retorna o estado atual de favoritos e a função para adicionar/remover favoritos.
  return {
    favorito,
    adicionarFavorito,
  };
}
