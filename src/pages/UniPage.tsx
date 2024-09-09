import { FC, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

import { UniList } from '../components/list/UniList';
import { Paginator } from '../components/paginator/Paginator';
import { useUniContext } from '../context/uniContext';

export const UniPage: FC = () => {
  const { getData, setCurrentPage, uniList, itemsPerPage, totalCount, currentPage } = useUniContext();

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>US universities</h1>
      <div className='card'>{uniList.length ? <UniList data={uniList} /> : <p>Loading...</p>}</div>
      <Paginator
        itemsPerPage={itemsPerPage}
        setPage={handlePageChange}
        totalCount={totalCount}
        currentPage={currentPage}
        siblingsCount={5}
      />
    </>
  );
};
