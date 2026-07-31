import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeeds } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };
  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
