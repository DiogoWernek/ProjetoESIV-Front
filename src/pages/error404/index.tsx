import deididi from '../../assets/deidid.jpg'

const NotFound = () => {
  return (
    <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1>404 - Página não encontrada</h1>
      <p>Ops, parece que a página que você está procurando não existe.</p>
      <p>Ou o Deividy esqueceu msm. (burro)</p>
      <img src={deididi} style={{ width: "30rem" }} />
    </div>
  );
};

export default NotFound;
