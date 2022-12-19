import s from './Loader.module.css';

const Dna = () => {
  return (
    <div className={s.Loader}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      ;
    </div>
  );
};

export default Dna;
