import { useFavoritoContext } from 'context/Favoritos';
import styles from './Card.module.css';
import iconeFavoritado from './favorite.png';
import iconeDesfavoritado from "./desfavoritado.png";

function Card({ id, titulo, capa }) {
  const { favorito, adicionarFavorito } = useFavoritoContext();
  const ehFavorito = favorito.some((fav) => fav.id === id);
  const icone = ehFavorito ? iconeFavoritado : iconeDesfavoritado;
  return (
    <div className={styles.container}>
      <img src={capa} alt={titulo} className={styles.capa} />
      <h2>{titulo}</h2>
      <img src={icone}
        alt="Favoritar filme"
        className={styles.favoritar}
        onClick={() => {
          adicionarFavorito({ id, titulo, capa });
        }} />
    </div>

  )
}

export default Card;