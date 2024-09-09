import { createContext, ReactNode, FC, useState, useMemo, useContext, Context, useCallback } from 'react';
import { IUni } from '../types/uni';
import { getUni } from '../api/uni';

interface IUniContext {
  uniList: IUni[];
  data: IUni[];
  getData: VoidFunction;
  setCurrentPage: (page: number) => void;
  country: string;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const UniContext: Context<IUniContext> = createContext<IUniContext>({} as IUniContext);

export const UniProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IUni[]>([]);
  const [country, setCountry] = useState('United States');
  const [totalCount, setCount] = useState(data.length);
  const [currentPage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [uniList, setUniList] = useState<IUni[]>([]);

  const getData = useCallback(async () => {
    const response = await getUni(country);
    setData(response.data);
    setCount(response.data.length);
    setUniList(() => response.data.slice(0, itemsPerPage));
  }, [country, itemsPerPage]);

  const setCurrentPage = useCallback(
    (page: number) => {
      setPage(() => page);
      setUniList(() => data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    },
    [data, itemsPerPage],
  );

  const value = useMemo(
    () => ({
      data,
      uniList,
      getData,
      country,
      setCountry,
      totalCount,
      setCount,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
    }),
    [
      data,
      getData,
      country,
      setCountry,
      totalCount,
      setCount,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
    ],
  );

  return <UniContext.Provider value={value}>{children}</UniContext.Provider>;
};

UniContext.displayName = 'UniContext';

export const useUniContext = () => useContext(UniContext);
