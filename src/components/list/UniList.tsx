import { FC } from 'react';
import { IUni } from '../../types/uni';
import './style.css';
import { UniItem } from './UniItem';

interface IUniList {
  data: IUni[];
}

export const UniList: FC<IUniList> = ({ data }) => {
  return (
    <div className='collection'>
      {data.map((item, index) => (
        <UniItem key={index} item={item} />
      ))}
    </div>
  );
};
