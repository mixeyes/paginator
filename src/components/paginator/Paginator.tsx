import { FC, useEffect, useMemo, useState } from 'react';
import cs from 'classnames';
import './style.css';
import { debounce } from '../../utils/debounce';
import { KEYS } from '../../constants/keys';

interface IPaginator {
  totalCount: number;
  setPage: (pageNumber: number) => void;
  itemsPerPage: number;
  currentPage: number;
  siblingsCount?: number;
}

/**
 * Paginator
 */
export const Paginator: FC<IPaginator> = ({ itemsPerPage, setPage, totalCount, currentPage, siblingsCount = 1 }) => {
  const [pageNum, setPageNum] = useState<number>(NaN);
  const pagesCount = useMemo(() => Math.ceil(totalCount / itemsPerPage), [itemsPerPage, totalCount]);

  const pagesArray = useMemo(() => {
    return pagesCount ? [...Array(pagesCount + 1).keys()].slice(1) : [];
  }, [pagesCount]);

  const handleDebounceKeyPress = debounce((arg: number) => {
    if (!isNaN(arg)) setPage(arg);
    setPageNum(() => NaN);
  });

  const handleOnClick = async (event: KeyboardEvent) => {
    if (!isNaN(parseInt(event.key))) {
      const currentPage = parseInt(`${isNaN(pageNum) ? '' : pageNum}${event.key}`);
      await setPageNum(() => currentPage);
      handleDebounceKeyPress(currentPage);
      console.log(currentPage);
    }
    else if (event.key === KEYS.Left){
      setPage(currentPage - 1);
    } else if (event.key === KEYS.Right) {
      setPage(currentPage + 1);
    } else if (event.key === KEYS.Up) {
      setPage(pagesCount);
    } else if (event.key === KEYS.Down) {
      setPage(1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnClick);
    return () => {
      document.removeEventListener('keydown', handleOnClick);
    };
  });

  const renderButtons = () => {
    if (siblingsCount >= pagesCount) {
      return pagesArray.map((item) => (
        <button key={item} className={cs({ active: item === currentPage })} onClick={() => setPage(item)}>
          {item}
        </button>
      ));
    }
    if (currentPage <= siblingsCount + 1) {
      return (
        <>
          {pagesArray.slice(0, siblingsCount + 2).map((item) => (
            <button key={item} className={cs({ active: item === currentPage })} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
          <span>...</span>
        </>
      );
    }
    if (currentPage <= pagesCount - siblingsCount) {
      return (
        <>
          <span>...</span>
          {pagesArray.slice(currentPage - siblingsCount / 2, currentPage + siblingsCount / 2).map((item) => (
            <button key={item} className={cs({ active: item === currentPage })} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
          <span>...</span>
        </>
      );
    }
    if (currentPage >= pagesCount - siblingsCount) {
      return (
        <>
          <span>...</span>
          {pagesArray.slice(pagesCount - siblingsCount - 1, pagesCount).map((item) => (
            <button key={item} className={cs({ active: item === currentPage })} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
        </>
      );
    }

    return pagesArray.map((item) => (
      <button key={item} onClick={() => setPage(item)}>
        {item}
      </button>
    ));
  };

  return (
    <div className='paginator-container'>
      {currentPage > 1 && (
        <>
          <button onClick={() => setPage(1)}>first</button>
          <button onClick={() => setPage(--currentPage)}>prev</button>
        </>
      )}
      {renderButtons()}
      {(pagesCount - siblingsCount <= currentPage || currentPage <= pagesCount) && (
        <>
          <button onClick={() => setPage(++currentPage)}>next</button>
          <button onClick={() => setPage(pagesCount)}>last</button>
        </>
      )}
    </div>
  );
};
