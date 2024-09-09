import { FC } from 'react';
import { IUni } from '../../types/uni';

interface IUniItemProps {
  item: IUni;
}

export const UniItem: FC<IUniItemProps> = ({ item }) => {
  return <div className='item'>{item.name}</div>;
};
