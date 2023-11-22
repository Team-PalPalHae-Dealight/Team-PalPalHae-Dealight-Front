'use client';

import notification from '../../../../../../_assets/images/notification.png';
import { useState } from 'react';
import OrderListDropDown from '../order-list-dropdown/OrderListDropDown';
import fetchOrderList from '../../fetchOrderList';
import OrderListModal from '../order-list-modal/OrderListModal';
import Image from 'next/image';
import InfiniteScrollList from '@/app/_components/infinite-scroll/InfiniteScrollList';
import OrderListCard from '../order-list-card/OrderListCard';
import StoreFooter from '@/app/_components/Footer/StoreFooter';

const OrderList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickOrderList = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <main className="rounded-t-lg bg-gray px-5">
        <div className="sticky top-0 my-3 flex h-14 items-center justify-between bg-gray">
          <div className="flex items-center gap-1" onClick={onClickOrderList}>
            <label className="text-xl	font-semibold text-black">주문 내역</label>
            <Image src={notification} className="h-4 w-4" alt="notification" />
          </div>
          <div>
            <OrderListDropDown />
          </div>
        </div>
        <InfiniteScrollList
          fetchData={fetchOrderList}
          emptyWord={'주문 내역이 없습니다.'}
        >
          <OrderListCard />
        </InfiniteScrollList>
      </main>
      <StoreFooter />
      {isOpen && <OrderListModal onClose={onClickOrderList} />}
    </>
  );
};

export default OrderList;
